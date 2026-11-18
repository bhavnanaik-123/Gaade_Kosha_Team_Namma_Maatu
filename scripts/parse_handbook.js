import fs from 'fs';

const text = fs.readFileSync('scripts/cache/ia_handbook_of_proverbs.txt', 'utf8');
const lines = text.split('\n').map(s => s.trim()).filter(Boolean);

console.log('Total lines in Handbook:', lines.length);

// In this book, Kannada proverbs are printed in Kannada script, followed by English translations and notes
const knLines = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Check if line contains predominantly Kannada script
  const knChars = (line.match(/[\u0C80-\u0CFF]/g) || []).length;
  if (knChars > 8 && line.length >= 10 && !line.includes('1912') && !line.includes('1988')) {
    // See if next line has English translation
    let english = '';
    for (let j = 1; j <= 4 && (i + j) < lines.length; j++) {
      const next = lines[i + j];
      const enChars = (next.match(/[a-zA-Z]/g) || []).length;
      if (enChars > 10 && !next.match(/[\u0C80-\u0CFF]/)) {
        english += (english ? ' ' : '') + next;
      } else if (next.match(/[\u0C80-\u0CFF]/)) {
        break;
      }
    }
    knLines.push({ kannada: line, english });
  }
}

console.log('Candidate proverbs in Handbook:', knLines.length);
console.log('Sample 5:');
for (const p of knLines.slice(10, 15)) {
  console.log(`- KN: "${p.kannada}"`);
  console.log(`  EN: "${p.english}"`);
}
