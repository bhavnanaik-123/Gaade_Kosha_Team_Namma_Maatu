import fs from 'fs';
import path from 'path';

const dataFilePath = path.join('data', 'kannada_proverbs_master.json');
const records = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

const outDir = path.join('supabase', 'seed_chunks');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function sqlEscape(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (typeof val === 'number') return String(val);
  if (Array.isArray(val)) {
    const items = val.map(v => `"${String(v).replace(/"/g, '\\"')}"`).join(',');
    return `'${items.replace(/'/g, "''")}'::text[]`;
  }
  return `'${String(val).replace(/'/g, "''")}'`;
}

const chunkSize = 500;
let fileIndex = 1;

for (let i = 0; i < records.length; i += chunkSize) {
  const chunk = records.slice(i, i + chunkSize);
  const sqlLines = [];

  sqlLines.push(`-- ====================================================================`);
  sqlLines.push(`-- GAADHE KOSHA (ಗಾದೆ ಕೋಶ) - PROVERB SEED BATCH ${fileIndex}`);
  sqlLines.push(`-- Records: ${i + 1} to ${Math.min(i + chunkSize, records.length)} of ${records.length}`);
  sqlLines.push(`-- ====================================================================`);
  sqlLines.push(``);
  sqlLines.push(`INSERT INTO public.proverbs (`);
  sqlLines.push(`    kannada, transliteration, english_meaning, kannada_meaning,`);
  sqlLines.push(`    category, category_kn, situation, situation_kn, tags, contributor, likes, is_verified`);
  sqlLines.push(`) VALUES`);

  const valueRows = chunk.map(r => {
    return `    (${sqlEscape(r.kannada)}, ${sqlEscape(r.transliteration)}, ${sqlEscape(r.english_meaning)}, ${sqlEscape(r.kannada_meaning || r.kannada_explanation)}, ${sqlEscape(r.category)}, ${sqlEscape(r.category_kn)}, ${sqlEscape(r.situation)}, ${sqlEscape(r.situation_kn)}, ${sqlEscape(r.tags || r.keywords || [])}, ${sqlEscape(r.contributor || r.attribution || 'ಪಾರಂಪರಿಕ ಜನಪದ ಗಾದೆ')}, ${sqlEscape(r.likes || 0)}, ${sqlEscape(r.is_verified || false)})`;
  });

  sqlLines.push(valueRows.join(',\n'));
  sqlLines.push(`ON CONFLICT (kannada) DO NOTHING;`);
  sqlLines.push(``);

  const fileName = `batch_${String(fileIndex).padStart(2, '0')}.sql`;
  fs.writeFileSync(path.join(outDir, fileName), sqlLines.join('\n'), 'utf8');
  console.log(`Generated ${fileName} (${chunk.length} records)`);
  fileIndex++;
}

console.log(`Successfully generated ${fileIndex - 1} SQL batch files in ${outDir}`);
