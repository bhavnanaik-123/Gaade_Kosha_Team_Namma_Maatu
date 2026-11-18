import fs from 'fs';

async function checkSanchaya() {
  const url = 'https://pustaka.sanchaya.net/books/index?search=' + encodeURIComponent('ಗಾದೆ');
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  fs.writeFileSync('scripts/sanchaya_search.html', html, 'utf8');
  console.log('Sanchaya HTML length:', html.length);

  // Look for book titles, covers, links
  const links = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  console.log('Sample links from Sanchaya:', links.filter(l => l.includes('book')).slice(0, 15));

  // Check text content
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
  console.log('Snippet of Sanchaya search page text:');
  console.log(text.slice(0, 1000));
}

checkSanchaya();
