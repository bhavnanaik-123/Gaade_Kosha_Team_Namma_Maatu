import fs from 'fs';

const html = fs.readFileSync('scripts/sanchaya_search.html', 'utf8');

// Find book cards
const cardRegex = /<div class="card[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi;
const matches = [...html.matchAll(/<h5[^>]*>([\s\S]*?)<\/h5>/gi)];
console.log('Book titles found (h5):');
for (const m of matches) {
  console.log('-', m[1].replace(/<[^>]*>/g, '').trim());
}

// Find all external / internal links
const links = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
for (const l of links) {
  const text = l[2].replace(/<[^>]*>/g, '').trim();
  if (text && !text.includes('Sign') && !text.includes('Login')) {
    console.log(`Link: [${text}] -> ${l[1]}`);
  }
}
