import fs from 'fs';

async function probe() {
  console.log('--- 1. Probing Vishaya ---');
  try {
    const res = await fetch('https://vishaya.in/gaade/kannada-proverbs-gaadegalu/', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await res.text();
    // Extract text blocks
    const lines = html.replace(/<script[\s\S]*?<\/script>/gi, '')
                      .replace(/<style[\s\S]*?<\/style>/gi, '')
                      .replace(/<[^>]*>/g, '\n')
                      .split('\n')
                      .map(s => s.trim())
                      .filter(Boolean);
    
    // Find lines that look like proverbs (e.g. numbered items or lines with Kannada characters)
    const kannadaLines = lines.filter(l => /[\u0C80-\u0CFF]/.test(l) && l.length > 5 && l.length < 150);
    console.log('Vishaya Kannada lines count:', kannadaLines.length);
    console.log('Vishaya sample lines (15):', kannadaLines.slice(20, 35));
  } catch (e) {
    console.error('Vishaya error:', e.message);
  }

  console.log('\n--- 2. Probing Sanchaya Pustaka ---');
  try {
    const url = 'https://pustaka.sanchaya.net/books/index?search=%E0%B2%97%E0%B2%BE%E0%B2%A6%E0%B3%86';
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const bookMatches = [...html.matchAll(/<a[^>]+href="(\/books\/show\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
    console.log('Sanchaya book links found:', bookMatches.length);
    for (const b of bookMatches.slice(0, 10)) {
      const cleanTitle = b[2].replace(/<[^>]*>/g, '').trim();
      if (cleanTitle) {
        console.log(`- ${cleanTitle}: https://pustaka.sanchaya.net${b[1]}`);
      }
    }
  } catch (e) {
    console.error('Sanchaya error:', e.message);
  }

  console.log('\n--- 3. Probing Kannada Wikisource ---');
  try {
    const apiRes = await fetch('https://kn.wikisource.org/w/api.php?action=query&list=search&srsearch=%E0%B2%97%E0%B2%BE%E0%B2%A6%E0%B3%86%E0%B2%97%E0%B2%B3%E0%B3%81&srlimit=20&format=json', {
      headers: { 'User-Agent': 'GaadheKoshaBot/1.0 (academic research)' }
    });
    const data = await apiRes.json();
    console.log('Wikisource search results:');
    for (const item of data.query.search) {
      console.log(`- ${item.title} (wordcount: ${item.wordcount})`);
    }
  } catch (e) {
    console.error('Wikisource error:', e.message);
  }
}

probe();
