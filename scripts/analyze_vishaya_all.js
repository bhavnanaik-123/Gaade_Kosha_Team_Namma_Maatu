import fs from 'fs';
import path from 'path';

const cacheDir = 'scripts/cache';

// Helper to decode HTML entities
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

// Clean and normalize Kannada text
function cleanProverb(text) {
  let cleaned = decodeHtml(text);
  // Remove HTML tags if any remain
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  // Remove numbering like "1.", "೧.", "100 -", "100)"
  cleaned = cleaned.replace(/^[0-9೦-೯]+[\.\-\s\)]+/, '');
  // Remove tags like "ಕನ್ನಡ ಗಾದೆ - ", "ಗಾದೆ - ", "ಗಾದೆಮಾತು : "
  cleaned = cleaned.replace(/^(ಕನ್ನಡ\s+)?ಗಾದೆ(\s*ಮಾತು)?\s*[\-–:]\s*/i, '');
  // Remove trailing site watermarks like "- ಕನ್ನಡ ಗಾದೆ", "– ವಿಷಯ"
  cleaned = cleaned.replace(/[\-–]\s*(ಕನ್ನಡ\s+)?ಗಾದೆ$/i, '');
  cleaned = cleaned.replace(/[\-–]\s*ವಿಷಯ$/i, '');
  // Normalize whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  // Strip trailing full stops or dashes
  cleaned = cleaned.replace(/[\.\-–\s]+$/, '').trim();
  return cleaned;
}

const allExtracted = [];
const sourceCounts = {};
const uniqueMap = new Map(); // normalized -> { original, sources: [] }

for (let part = 1; part <= 11; part++) {
  const filePath = path.join(cacheDir, `part_${part}.html`);
  if (!fs.existsSync(filePath)) continue;

  const html = fs.readFileSync(filePath, 'utf8');

  // Find post content boundary
  const startIdx = html.indexOf('id="post-');
  let body = html;
  if (startIdx !== -1) {
    const endIdx = html.indexOf('</article>', startIdx);
    body = html.slice(startIdx, endIdx > startIdx ? endIdx : undefined);
  }

  // Remove scripts & styles
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '')
             .replace(/<style[\s\S]*?<\/style>/gi, '');

  // Extract paragraphs, list items, headings, breaks
  const rawLines = body
    .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean);

  let partCount = 0;
  for (const rawLine of rawLines) {
    // Must contain Kannada Unicode
    if (!/[\u0C80-\u0CFF]/.test(rawLine)) continue;
    // Skip common boilerplate
    if (rawLine.includes('ಭಾಗ') && (rawLine.includes('ಸಂಗ್ರಹ') || rawLine.includes('ಗಾದೆಗಳು'))) continue;
    if (rawLine.includes('Posted On') || rawLine.includes('Posted By') || rawLine.includes('Comments:')) continue;
    if (rawLine.includes('ಕ್ಲಿಕ್ ಮಾಡಿ') || rawLine.includes('ಇಲ್ಲಿ ಕ್ಲಿಕ್')) continue;
    if (rawLine.includes('Popular Proverbs') || rawLine.includes('ವಿಷಯ ತಂಡಕ್ಕೆ ಸೇರಿದ್ದು')) continue;
    if (rawLine.includes('ಕೃತಿಸ್ವಾಮ್ಯ') || rawLine.includes('ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ')) continue;

    const cleaned = cleanProverb(rawLine);
    // Sanity checks for a valid proverb: at least 2 words, length >= 8 and <= 200, contains Kannada
    if (cleaned.length < 8 || cleaned.length > 200) continue;
    if (!cleaned.includes(' ')) continue; // Proverb must have at least two words

    partCount++;
    allExtracted.push({ part, raw: rawLine, cleaned });

    // Key for deduplication (normalize spaces, remove punctuation)
    const normKey = cleaned.replace(/[\s\.,\?!–—'""`]/g, '');
    if (!uniqueMap.has(normKey)) {
      uniqueMap.set(normKey, { cleaned, sources: [`Vishaya Part ${part}`] });
    } else {
      uniqueMap.get(normKey).sources.push(`Vishaya Part ${part}`);
    }
  }

  sourceCounts[`Vishaya Part ${part}`] = partCount;
}

console.log('=== VISHAYA PROVERB EXTRACTION REPORT ===');
console.log('Total raw proverb occurrences extracted:', allExtracted.length);
console.log('Total unique proverbs found:', uniqueMap.size);
console.log('Source breakdown:');
for (const [s, count] of Object.entries(sourceCounts)) {
  console.log(`  ${s}: ${count} records`);
}

// Sample of 10 unique proverbs
console.log('\nSample 10 unique proverbs:');
const sampleKeys = Array.from(uniqueMap.keys()).slice(100, 110);
for (const k of sampleKeys) {
  const item = uniqueMap.get(k);
  console.log(`- "${item.cleaned}" (Found in: ${item.sources.join(', ')})`);
}
