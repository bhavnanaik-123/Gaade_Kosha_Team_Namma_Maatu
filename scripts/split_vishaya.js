import fs from 'fs';

const html = fs.readFileSync('scripts/vishaya_raw.html', 'utf8');

// Find start of post-1486
const startIdx = html.indexOf('post-1486');
const endIdx = html.indexOf('id="comments"', startIdx);

console.log('Post indices:', startIdx, endIdx);
const articleHtml = html.slice(startIdx, endIdx > startIdx ? endIdx : undefined);

const textWithBreaks = articleHtml
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<(br|p|div|li|tr|h[1-6])[^>]*>/gi, '\n')
  .replace(/<\/(p|div|li|tr|h[1-6])>/gi, '\n')
  .replace(/&nbsp;/g, ' ')
  .replace(/&#8211;/g, '-')
  .replace(/<[^>]*>/g, '');

const lines = textWithBreaks
  .split('\n')
  .map(l => l.trim())
  .filter(l => {
    if (l.length < 5 || l.length > 150) return false;
    if (!/[\u0C80-\u0CFF]/.test(l)) return false;
    if (l.includes('ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ') || l.includes('ಸಂಗ್ರಹ') && l.includes('ಭಾಗ') || l.includes('ಕೃತಿಸ್ವಾಮ್ಯ') || l.includes('ಜಾಲತಾಣ') || l.includes('ಕನ್ನಡ ಗಾದೆಗಳು') || l.includes('ಇತ್ತೀಚಿನ')) return false;
    return true;
  });

console.log('Total proverbs from Vishaya article:', lines.length);
console.log('Sample 10 proverbs:');
lines.slice(0, 10).forEach((l, i) => console.log(`${i+1}: ${l}`));
console.log('Last 10 proverbs:');
lines.slice(-10).forEach((l, i) => console.log(`${i+1}: ${l}`));
