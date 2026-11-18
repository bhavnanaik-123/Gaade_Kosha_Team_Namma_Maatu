import fs from 'fs';

async function fetchPage3327() {
  const url = 'https://kn.wikisource.org/w/api.php?action=query&prop=revisions&rvprop=content&pageids=3327&rvslots=main&format=json';
  const res = await fetch(url, { headers: { 'User-Agent': 'GaadheKoshaBot/1.0' } });
  const data = await res.json();
  const page = data.query.pages['3327'];
  const text = page.revisions[0].slots.main['*'];
  console.log('Page 3327 text length:', text.length);
  fs.writeFileSync('scripts/cache/wikisource_3327.txt', text, 'utf8');
}

fetchPage3327().catch(console.error);
