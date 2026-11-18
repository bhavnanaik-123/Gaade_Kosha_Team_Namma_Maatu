import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const url = 'https://byeisaehrjzysezmcwmd.supabase.co';
const key = 'sb_publishable_P8ykg6E83aAdeN2UuG6fXA_NpBXg4dS';

const supabase = createClient(url, key);

// Load master dataset
const records = JSON.parse(fs.readFileSync('data/kannada_proverbs_master.json', 'utf8'));
// Pick 5 new records (not curated ones)
const newRecords = records.filter(r => r.is_verified === false).slice(0, 5);

async function testBatch() {
  const payload = newRecords.map(r => ({
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

  console.log(`Testing batch insert of ${payload.length} rows...`);
  const { data, error } = await supabase
    .from('proverbs')
    .insert(payload);

  console.log('Batch insert result:', { data, error });
}

testBatch().catch(console.error);
