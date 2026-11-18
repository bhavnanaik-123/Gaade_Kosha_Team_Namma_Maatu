import fs from 'fs';

const html = fs.readFileSync('scripts/vishaya_part2.html', 'utf8');

const postIdx = html.indexOf('id="post-1491"');
const endIdx = html.indexOf('</article>', postIdx);
console.log('post-1491 found at:', postIdx, 'end at:', endIdx);

const body = html.slice(postIdx, endIdx);
console.log('Body length:', body.length);

// Let's see some samples of the text inside body
const plain = body.replace(/<script[\s\S]*?<\/script>/gi, '')
                  .replace(/<style[\s\S]*?<\/style>/gi, '')
                  .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, '\n')
                  .replace(/<br\s*\/?>/gi, '\n')
                  .replace(/<[^>]*>/g, '');

const lines = plain.split('\n').map(s => s.trim()).filter(Boolean);
console.log('Total non-empty lines:', lines.length);
console.log('First 20 lines:\n', lines.slice(0, 20));
