import fs from 'fs';

async function fetchHandbookText() {
  const url = 'https://archive.org/download/2015.489071-a-handbook-of-kannada-proverbs/2015.489071%20A%20Handbook%20of%20Kannada%20Proverbs_djvu.txt';
  console.log('Downloading Handbook of Kannada Proverbs djvu.txt...');
  const res = await fetch(url, { headers: { 'User-Agent': 'GaadheKoshaBot/1.0' } });
  const text = await res.text();
  console.log('Downloaded length:', text.length);
  fs.writeFileSync('scripts/cache/ia_handbook_of_proverbs.txt', text, 'utf8');
  console.log('Sample text (first 1000 chars):\n', text.slice(0, 1000));
}

fetchHandbookText().catch(console.error);
