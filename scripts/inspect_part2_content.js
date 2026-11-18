import fs from 'fs';

const html = fs.readFileSync('scripts/vishaya_part2.html', 'utf8');

const entryIdx = html.indexOf('entry-content');
console.log('entry-content index:', entryIdx);
if (entryIdx !== -1) {
  const content = html.slice(entryIdx, entryIdx + 4000);
  console.log('Content snippet:\n', content);
}
