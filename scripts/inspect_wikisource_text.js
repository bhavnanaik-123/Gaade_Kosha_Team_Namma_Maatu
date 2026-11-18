import fs from 'fs';

for (const id of ['3327', '11229']) {
  const p = `scripts/cache/wikisource_${id}.txt`;
  if (fs.existsSync(p)) {
    const text = fs.readFileSync(p, 'utf8');
    console.log(`=== Wikisource ${id} (chars: ${text.length}) ===`);
    // Find lines that look like proverbs (e.g. quotes or lists)
    const lines = text.split('\n').map(s => s.trim()).filter(Boolean);
    console.log(`Total lines: ${lines.length}`);
    const quotes = lines.filter(l => l.includes('’') || l.includes('\'') || l.includes('"') || l.startsWith('*') || l.startsWith('#'));
    console.log(`Candidate list/quote lines: ${quotes.length}`);
    console.log('Sample lines:', quotes.slice(0, 10));
  }
}
