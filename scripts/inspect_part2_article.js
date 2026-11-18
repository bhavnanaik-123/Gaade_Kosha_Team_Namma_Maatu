import fs from 'fs';

const html = fs.readFileSync('scripts/vishaya_part2.html', 'utf8');

const matches = [...html.matchAll(/<article[^>]*id="([^"]+)"[^>]*>/gi)];
console.log('Articles:', matches.map(m => m[0]));

const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
console.log('H1:', h1 ? h1[0] : 'None');

// Find where Kannada text begins
const firstKn = html.search(/[\u0C80-\u0CFF]/);
console.log('First Kannada char index:', firstKn);
if (firstKn !== -1) {
  console.log('Snippet around first Kannada char:\n', html.slice(firstKn, firstKn + 1000));
}
