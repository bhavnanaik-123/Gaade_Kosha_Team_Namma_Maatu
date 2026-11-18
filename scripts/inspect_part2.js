import fs from 'fs';

const html = fs.readFileSync('scripts/vishaya_part2.html', 'utf8');
const lines = html.split('\n');
console.log('Total lines:', lines.length);

// Look for where the main article content is
const postIdx = html.indexOf('post-');
console.log('post- index:', postIdx);
const articleSnippet = html.slice(postIdx, postIdx + 5000);
console.log('Snippet:\n', articleSnippet.slice(0, 1500));
