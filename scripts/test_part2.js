import fs from 'fs';

async function testPart2() {
  const url = 'https://vishaya.in/gaade/1001-kannada-proverbs-gaade/';
  console.log('Fetching Part 2:', url);
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  console.log('Received length:', html.length);
  fs.writeFileSync('scripts/vishaya_part2.html', html, 'utf8');

  // Let's count numbered lines
  const lines = html.replace(/<script[\s\S]*?<\/script>/gi, '')
                    .replace(/<style[\s\S]*?<\/style>/gi, '')
                    .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, '\n')
                    .replace(/<br\s*\/?>/gi, '\n')
                    .replace(/<[^>]*>/g, '')
                    .split('\n')
                    .map(s => s.trim())
                    .filter(Boolean);

  const regexNum = /^([0-9೦-೯]+)[\.\-\s\)]+(.+)$/;
  const proverbs = [];
  for (const line of lines) {
    const match = line.match(regexNum);
    if (match) {
      const text = match[2].trim();
      if (/[\u0C80-\u0CFF]/.test(text) && text.length > 5 && !text.includes('ಭಾಗ')) {
        proverbs.push({ num: match[1], text });
      }
    }
  }
  console.log('Extracted proverbs from Part 2:', proverbs.length);
  if (proverbs.length > 0) {
    console.log('First 3:', proverbs.slice(0, 3));
    console.log('Last 3:', proverbs.slice(-3));
  }
}

testPart2().catch(console.error);
