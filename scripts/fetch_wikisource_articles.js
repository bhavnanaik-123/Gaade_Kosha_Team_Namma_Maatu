import fs from 'fs';
import path from 'path';

const cacheDir = 'scripts/cache';
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

async function fetchWikisourcePages() {
  const url = 'https://kn.wikisource.org/w/api.php?action=query&prop=extracts&pageids=3327|11229&explaintext=1&format=json';
  console.log('Fetching Wikisource pages 3327 and 11229...');
  const res = await fetch(url, { headers: { 'User-Agent': 'GaadheKoshaBot/1.0' } });
  const data = await res.json();
  
  if (data.query && data.query.pages) {
    for (const [id, page] of Object.entries(data.query.pages)) {
      const outPath = path.join(cacheDir, `wikisource_${id}.json`);
      fs.writeFileSync(outPath, JSON.stringify(page, null, 2), 'utf8');
      console.log(`Saved Wikisource page ${id} ("${page.title}", length: ${page.extract?.length || 0})`);
    }
  }
}

fetchWikisourcePages().catch(console.error);
