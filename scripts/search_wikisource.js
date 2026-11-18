import fs from 'fs';

async function searchWikisourcePages() {
  const url = 'https://kn.wikisource.org/w/api.php?action=query&generator=search&gsrsearch=%E0%B2%97%E0%B2%BE%E0%B2%A6%E0%B3%86&gsrlimit=50&prop=info|extracts&exintro=1&explaintext=1&format=json';
  const res = await fetch(url, { headers: { 'User-Agent': 'GaadheKoshaBot/1.0' } });
  const data = await res.json();
  
  if (data.query && data.query.pages) {
    const pages = Object.values(data.query.pages);
    console.log('Total Wikisource pages found for ಗಾದೆ:', pages.length);
    for (const p of pages) {
      console.log(`- [${p.pageid}] "${p.title}" (length: ${p.length})`);
    }
  } else {
    console.log('No pages found');
  }
}

searchWikisourcePages();
