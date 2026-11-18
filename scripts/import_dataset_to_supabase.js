import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Read credentials
let supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
let supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl && fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('VITE_SUPABASE_URL=')) {
      supabaseUrl = trimmed.split('=')[1]?.trim();
    }
    if (trimmed.startsWith('VITE_SUPABASE_ANON_KEY=') && !supabaseKey) {
      supabaseKey = trimmed.split('=')[1]?.trim();
    }
    if (trimmed.startsWith('VITE_SUPABASE_PUBLISHABLE_KEY=') && !supabaseKey) {
      supabaseKey = trimmed.split('=')[1]?.trim();
    }
  }
}

const dataFilePath = path.join('data', 'kannada_proverbs_master.json');
if (!fs.existsSync(dataFilePath)) {
  console.error('Master dataset file not found at:', dataFilePath);
  process.exit(1);
}

const records = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

console.log('====================================================');
console.log(' GAADHE KOSHA - SUPABASE BATCH IMPORTER');
console.log('====================================================');
console.log('Supabase URL:', supabaseUrl || 'MISSING');
console.log('Loaded Master Records:', records.length);
console.log(' - Curated (is_verified = true):', records.filter(r => r.is_verified).length);
console.log(' - Imported Dataset (is_verified = false):', records.filter(r => !r.is_verified).length);

async function runImporter({ dryRun = true, batchSize = 50 } = {}) {
  if (dryRun) {
    console.log('\n[DRY-RUN MODE ACTIVE]');
    console.log('Validating data format and schema compatibility...');
    
    // Validate each record
    let validCount = 0;
    let invalidCount = 0;
    const categories = new Set(['education', 'friendship', 'money', 'family', 'unity', 'life']);
    
    for (const r of records) {
      if (!r.kannada || typeof r.kannada !== 'string') {
        invalidCount++;
        continue;
      }
      if (!r.category || !categories.has(r.category)) {
        invalidCount++;
        continue;
      }
      if (!r.english_meaning || !r.kannada_explanation) {
        invalidCount++;
        continue;
      }
      validCount++;
    }

    console.log(`Validation results: ${validCount} valid records, ${invalidCount} invalid records.`);
    console.log(`Batches required: ${Math.ceil(records.length / batchSize)} batches of up to ${batchSize} records.`);
    console.log('\nDry run completed successfully. No changes made to database.');
    console.log('To execute real import, run: node scripts/import_dataset_to_supabase.js --execute');
    return;
  }

  // --- LIVE EXECUTION ---
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or Key is missing.');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  console.log('\n[LIVE IMPORT EXECUTION STARTED]');

  // 1. Fetch existing proverbs from DB (verified records) to protect them from duplicate insertion
  console.log('Checking existing records in database to ensure protection...');
  const { data: existingRows, error: fetchErr } = await supabase
    .from('proverbs')
    .select('kannada, is_verified');

  const existingKannadaSet = new Set((existingRows || []).map(r => r.kannada.trim()));
  console.log(`Found ${existingKannadaSet.size} existing records in database.`);

  // 2. Filter records to import:
  // Only import unverified new records that are NOT already in existingKannadaSet
  const candidatesToInsert = records.filter(r => !existingKannadaSet.has(r.kannada.trim()));
  const skippedExisting = records.length - candidatesToInsert.length;

  console.log(`Records already in database (skipped to prevent duplicates): ${skippedExisting}`);
  console.log(`New records queued for insertion: ${candidatesToInsert.length}`);

  let insertedCount = 0;
  let duplicateCount = skippedExisting;
  let failedCount = 0;

  for (let i = 0; i < candidatesToInsert.length; i += batchSize) {
    const chunk = candidatesToInsert.slice(i, i + batchSize).map(r => ({
      kannada: r.kannada,
      transliteration: r.transliteration,
      english_meaning: r.english_meaning,
      kannada_meaning: r.kannada_meaning || r.kannada_explanation,
      category: r.category,
      category_kn: r.category_kn,
      situation: r.situation,
      situation_kn: r.situation_kn,
      tags: r.tags || r.keywords || [],
      contributor: r.contributor || 'ವಿಷಯ ಜನಪ್ರಿಯ ಗಾದೆಗಳು (Vishaya.in)',
      likes: 0,
      is_verified: false
    }));

    // Try batch insertion
    const { error } = await supabase.from('proverbs').insert(chunk);

    if (!error) {
      insertedCount += chunk.length;
    } else if (error.code === '23505') {
      // Batch contained at least one duplicate: fallback to item-by-item insertion
      for (const item of chunk) {
        const { error: singleErr } = await supabase.from('proverbs').insert([item]);
        if (!singleErr) {
          insertedCount++;
        } else if (singleErr.code === '23505') {
          duplicateCount++;
        } else {
          console.error(`Row error on "${item.kannada}":`, singleErr.message);
          failedCount++;
        }
      }
    } else {
      console.error(`Batch ${Math.floor(i / batchSize) + 1} error:`, error.message);
      failedCount += chunk.length;
    }

    const currentTotal = Math.min(i + batchSize, candidatesToInsert.length);
    process.stdout.write(`Progress: ${currentTotal} / ${candidatesToInsert.length} records processed (Inserted: ${insertedCount}, Duplicates: ${duplicateCount}, Failed: ${failedCount})\r`);
  }

  console.log('\n\n====================================================');
  console.log(' IMPORT COMPLETE - FINAL REPORT');
  console.log('====================================================');
  console.log(`Total Master Records:     ${records.length}`);
  console.log(`Successfully Inserted:    ${insertedCount}`);
  console.log(`Duplicates Skipped:       ${duplicateCount}`);
  console.log(`Failed / Errors:          ${failedCount}`);
  console.log('====================================================');
}

const isExecute = process.argv.includes('--execute');
runImporter({ dryRun: !isExecute, batchSize: 50 }).catch(console.error);
