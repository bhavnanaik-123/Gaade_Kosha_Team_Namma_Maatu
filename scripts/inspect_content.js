import fs from 'fs';

const html = fs.readFileSync('scripts/vishaya_raw.html', 'utf8');

// Find all text inside <ol>, <ul>, <p>, or headings
const regexP = /<p[^>]*>([\s\S]*?)<\/p>/gi;
const paragraphs = [];
let match;
while ((match = regexP.exec(html)) !== null) {
  const clean = match[1].replace(/<[^>]*>/g, '').trim();
  if (clean) paragraphs.push(clean);
}

console.log('Total paragraphs found:', paragraphs.length);
console.log('\n--- First 30 paragraphs ---');
paragraphs.slice(0, 30).forEach((p, i) => console.log(`${i + 1}: ${p}`));

console.log('\n--- Paragraphs 31 to 60 ---');
paragraphs.slice(30, 60).forEach((p, i) => console.log(`${i + 31}: ${p}`));
