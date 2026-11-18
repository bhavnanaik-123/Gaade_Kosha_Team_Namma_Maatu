import fs from 'fs';
import path from 'path';

const PARTS = [
  { part: 1, url: 'https://vishaya.in/gaade/kannada-proverbs-gaadegalu/' },
  { part: 2, url: 'https://vishaya.in/gaade/1001-kannada-proverbs-gaade/' },
  { part: 3, url: 'https://vishaya.in/gaade/kannada-proverb-gaade-maatu/' },
  { part: 4, url: 'https://vishaya.in/gaade/thousand-kannada-proverb/' },
  { part: 5, url: 'https://vishaya.in/gaade/kannada-wisdom-words-gaade/' },
  { part: 6, url: 'https://vishaya.in/gaade/proverb-collection-kannada/' },
  { part: 7, url: 'https://vishaya.in/gaade/kannada-proverb-collection/' },
  { part: 8, url: 'https://vishaya.in/gaade/wisdom-words-kannada/' },
  { part: 9, url: 'https://vishaya.in/gaade/kannada-famous-proverbs/' },
  { part: 10, url: 'https://vishaya.in/gaade/wisdom-proverbs-kannada/' },
  { part: 11, url: 'https://vishaya.in/gaade/kannada-janapriya-gaadegalu/' }
];

const cacheDir = 'scripts/cache';
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

// Copy already downloaded part 1 & part 2 if exist
if (fs.existsSync('scripts/vishaya_raw.html') && !fs.existsSync(path.join(cacheDir, 'part_1.html'))) {
  fs.copyFileSync('scripts/vishaya_raw.html', path.join(cacheDir, 'part_1.html'));
}
if (fs.existsSync('scripts/vishaya_part2.html') && !fs.existsSync(path.join(cacheDir, 'part_2.html'))) {
  fs.copyFileSync('scripts/vishaya_part2.html', path.join(cacheDir, 'part_2.html'));
}

async function fetchAll() {
  for (const item of PARTS) {
    const filePath = path.join(cacheDir, `part_${item.part}.html`);
    if (fs.existsSync(filePath)) {
      console.log(`Part ${item.part} already cached.`);
      continue;
    }
    console.log(`Fetching Part ${item.part}: ${item.url}...`);
    try {
      const res = await fetch(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) {
        console.error(`Failed to fetch Part ${item.part}: HTTP ${res.status}`);
        continue;
      }
      const html = await res.text();
      fs.writeFileSync(filePath, html, 'utf8');
      console.log(`Saved Part ${item.part} (${html.length} bytes).`);
      // Sleep 1 second between requests to be polite
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error(`Error fetching Part ${item.part}:`, err.message);
    }
  }
}

fetchAll().catch(console.error);
