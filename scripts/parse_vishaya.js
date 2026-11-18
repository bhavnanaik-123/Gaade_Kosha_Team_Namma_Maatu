import fs from 'fs';

async function parseVishaya() {
  const res = await fetch('https://vishaya.in/gaade/kannada-proverbs-gaadegalu/', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await res.text();
  
  // Save raw HTML for analysis
  fs.writeFileSync('scripts/vishaya_raw.html', html, 'utf8');
  console.log('Saved raw HTML, size:', html.length);

  // Extract all paragraphs and lines
  const lines = html.replace(/<script[\s\S]*?<\/script>/gi, '')
                    .replace(/<style[\s\S]*?<\/style>/gi, '')
                    .replace(/<\/(p|div|li|h[1-6])>/gi, '\n')
                    .replace(/<[^>]*>/g, '')
                    .split('\n')
                    .map(s => s.trim())
                    .filter(Boolean);

  const candidates = [];
  const regexNum = /^([0-9೦-೯]+)[\.\-\s\)]+(.+)$/;

  for (const line of lines) {
    const match = line.match(regexNum);
    if (match) {
      const num = match[1];
      const text = match[2].trim();
      if (/[\u0C80-\u0CFF]/.test(text) && text.length > 5) {
        candidates.push({ num, text });
      }
    }
  }

  console.log('Numbered proverbs matched on Vishaya:', candidates.length);
  if (candidates.length > 0) {
    console.log('First 5:', candidates.slice(0, 5));
    console.log('Last 5:', candidates.slice(-5));
  }
}

parseVishaya();
