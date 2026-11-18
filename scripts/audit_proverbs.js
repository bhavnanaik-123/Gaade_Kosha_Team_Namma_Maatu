import fs from 'fs';
import path from 'path';

const cacheDir = 'scripts/cache';

function decodeHtml(str) {
  return str
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function cleanProverb(text) {
  let cleaned = decodeHtml(text);
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  cleaned = cleaned.replace(/^[0-9೦-೯]+[\.\-\s\)]+/, '');
  cleaned = cleaned.replace(/^(ಕನ್ನಡ\s+)?ಗಾದೆ(\s*ಮಾತು)?\s*[\-–:]\s*/i, '');
  cleaned = cleaned.replace(/[\-–]\s*(ಕನ್ನಡ\s+)?ಗಾದೆ$/i, '');
  cleaned = cleaned.replace(/[\-–]\s*ವಿಷಯ$/i, '');
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  cleaned = cleaned.replace(/[\.\-–\s]+$/, '').trim();
  return cleaned;
}

const rawList = [];
for (let part = 1; part <= 11; part++) {
  const filePath = path.join(cacheDir, `part_${part}.html`);
  if (!fs.existsSync(filePath)) continue;

  const html = fs.readFileSync(filePath, 'utf8');
  const startIdx = html.indexOf('id="post-');
  let body = html;
  if (startIdx !== -1) {
    const endIdx = html.indexOf('</article>', startIdx);
    body = html.slice(startIdx, endIdx > startIdx ? endIdx : undefined);
  }

  body = body.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');

  const lines = body.replace(/<\/(p|div|li|h[1-6]|tr)>/gi, '\n')
                    .replace(/<br\s*\/?>/gi, '\n')
                    .replace(/<[^>]*>/g, '')
                    .split('\n')
                    .map(s => s.trim())
                    .filter(Boolean);

  for (const line of lines) {
    if (!/[\u0C80-\u0CFF]/.test(line)) continue;
    if (line.includes('ಭಾಗ') && (line.includes('ಸಂಗ್ರಹ') || line.includes('ಗಾದೆಗಳು'))) continue;
    if (line.includes('Posted On') || line.includes('Posted By') || line.includes('Comments:')) continue;
    if (line.includes('ಕ್ಲಿಕ್ ಮಾಡಿ') || line.includes('ಇಲ್ಲಿ ಕ್ಲಿಕ್')) continue;
    if (line.includes('Popular Proverbs') || line.includes('ವಿಷಯ ತಂಡಕ್ಕೆ ಸೇರಿದ್ದು')) continue;
    if (line.includes('ಕೃತಿಸ್ವಾಮ್ಯ') || line.includes('ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ')) continue;

    const cleaned = cleanProverb(line);
    if (cleaned.length < 8 || cleaned.length > 250) continue;
    if (!cleaned.includes(' ')) continue;

    rawList.push({ part, text: cleaned });
  }
}

// Deduplicate using Kannada text normalization
// 1. Remove zero-width chars, normalize anusvara/halant if needed, remove all punctuation
function normalizeForDedupe(str) {
  return str
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[,\.?!;:—–\-\(\)\[\]"'`\/\\*]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const map = new Map();
for (const item of rawList) {
  const key = normalizeForDedupe(item.text);
  if (!map.has(key)) {
    map.set(key, { text: item.text, parts: [item.part] });
  } else {
    const existing = map.get(key);
    if (!existing.parts.includes(item.part)) {
      existing.parts.push(item.part);
    }
  }
}

console.log('Total extracted raw occurrences:', rawList.length);
console.log('Total unique proverbs after strict deduplication:', map.size);

// Shortest and longest proverbs
const proverbs = Array.from(map.values()).map(v => v.text);
proverbs.sort((a, b) => a.length - b.length);
console.log('\n5 Shortest proverbs:');
console.log(proverbs.slice(0, 5));
console.log('\n5 Longest proverbs:');
console.log(proverbs.slice(-5));

// Check if any contain english or odd characters
const odd = proverbs.filter(p => /[A-Za-z0-9]/.test(p));
console.log('\nProverbs containing alphanumeric ASCII chars:', odd.length);
if (odd.length > 0) {
  console.log('Sample odd:', odd.slice(0, 10));
}
