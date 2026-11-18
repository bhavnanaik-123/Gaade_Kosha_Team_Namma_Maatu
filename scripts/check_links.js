import fs from 'fs';

const html = fs.readFileSync('scripts/vishaya_raw.html', 'utf8');
const startIdx = html.indexOf('post-1486');
const endIdx = html.indexOf('id="comments"', startIdx);
const articleHtml = html.slice(startIdx, endIdx > startIdx ? endIdx : undefined);

const links = [...articleHtml.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
console.log('Total links in article:', links.length);
for (const l of links) {
  const text = l[2].replace(/<[^>]*>/g, '').trim();
  if (text.includes('ಭಾಗ') || text.includes('ಗಾದೆ')) {
    console.log(`- [${text}]: ${l[1]}`);
  }
}
