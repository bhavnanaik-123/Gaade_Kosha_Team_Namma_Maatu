import fs from 'fs';

async function probeDeep() {
  console.log('--- 1. Sanchaya Deep Probe ---');
  try {
    const res = await fetch('https://pustaka.sanchaya.net/', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await res.text();
    console.log('Sanchaya homepage title/snippet:', html.slice(0, 500));
    
    // Test search query format
    const searchRes = await fetch('https://pustaka.sanchaya.net/api/v1/search?query=%E0%B2%97%E0%B2%BE%E0%B2%A6%E0%B3%86', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    console.log('Sanchaya API status:', searchRes.status);
    if (searchRes.ok) {
      const data = await searchRes.text();
      console.log('Sanchaya API text length:', data.length);
    }
  } catch (e) {
    console.error('Sanchaya error:', e.message);
  }

  console.log('\n--- 2. Internet Archive Search ---');
  try {
    const queries = [
      'Kanarese+proverbs',
      'Kannada+proverbs',
      'Kittel+proverbs',
      'Katha+sangraha+Canarese'
    ];
    for (const q of queries) {
      const url = `https://archive.org/advancedsearch.php?q=${q}&fl[]=identifier,title,creator,year,description&rows=10&page=1&output=json`;
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const data = await res.json();
      console.log(`IA Query: ${q} -> ${data.response.numFound} items`);
      for (const doc of data.response.docs) {
        console.log(`  * [${doc.identifier}] "${doc.title}" (${doc.year || 'n/d'}) by ${doc.creator || 'Unknown'}`);
      }
    }
  } catch (e) {
    console.error('Internet Archive error:', e.message);
  }

  console.log('\n--- 3. Wikisource "Katha sangraha or Canarese selections: PROSE: Part VI. Proverbs" ---');
  try {
    const pageTitle = encodeURIComponent('Katha sangraha or Canarese selections: PROSE: Part VI. Proverbs');
    const url = `https://kn.wikisource.org/w/api.php?action=parse&page=${pageTitle}&prop=wikitext&format=json`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await res.json();
    if (data.parse && data.parse.wikitext) {
      const text = data.parse.wikitext['*'];
      console.log('Wikisource page wikitext length:', text.length);
      const lines = text.split('\n').filter(l => l.trim().length > 0);
      console.log('Wikisource line count:', lines.length);
      console.log('Sample 10 lines:');
      console.log(lines.slice(0, 10));
    }
  } catch (e) {
    console.error('Wikisource page error:', e.message);
  }
}

probeDeep();
