import fs from 'fs';

async function fetchPage11229() {
  const url = 'https://kn.wikisource.org/w/api.php?action=query&prop=revisions&rvprop=content&pageids=11229&rvslots=main&format=json';
  const res = await fetch(url, { headers: { 'User-Agent': 'GaadheKoshaBot/1.0' } });
  const data = await res.json();
  const page = data.query.pages['11229'];
  const text = page.revisions[0].slots.main['*'];
  console.log('Page 11229 text length:', text.length);
  fs.writeFileSync('scripts/cache/wikisource_11229.txt', text, 'utf8');
}

fetchPage11229().catch(console.error);
