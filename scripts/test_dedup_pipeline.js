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

// Fix font artifacts and clean raw text
function fixKannadaFontArtifacts(text) {
  let cleaned = decodeHtml(text);
  // Replace Kannada digit zero (೦) used as anusvara (ಂ) between or after Kannada characters
  cleaned = cleaned.replace(/([\u0C80-\u0CFF])\u0CE6/g, '$1\u0C82');
  cleaned = cleaned.replace(/\u0CE6([\u0C80-\u0CFF])/g, '\u0C82$1');
  // Strip zero-width chars
  cleaned = cleaned.replace(/[\u200B-\u200D\uFEFF]/g, '');
  return cleaned;
}

function cleanProverbText(raw) {
  let text = fixKannadaFontArtifacts(raw);
  text = text.replace(/<[^>]*>/g, '');
  // Remove numbering like "1.", "1 -", "೧.", "೧೦೦)"
  text = text.replace(/^[0-9೦-೯]+[\.\-\s\)]+/, '');
  // Remove prefixes like "ಕನ್ನಡ ಗಾದೆ - ", "ಗಾದೆ - ", "ಗಾದೆಮಾತು : "
  text = text.replace(/^(ಕನ್ನಡ\s+)?ಗಾದೆ(\s*ಮಾತು)?\s*[\-–:]\s*/i, '');
  // Remove suffixes like "- ಕನ್ನಡ ಗಾದೆ", "– ವಿಷಯ"
  text = text.replace(/[\-–]\s*(ಕನ್ನಡ\s+)?ಗಾದೆ$/i, '');
  text = text.replace(/[\-–]\s*ವಿಷಯ$/i, '');
  // Fix punctuation spacing: "ಹಾಗೆ ." -> "ಹಾಗೆ."
  text = text.replace(/\s+([,\.?!;])/g, '$1');
  // Remove leading/trailing punctuation and quotes
  text = text.replace(/^[\s"'\.,\-–—:;!?()\[\]{}]+/, '');
  text = text.replace(/[\s"'\.,\-–—:;!?()\[\]{}]+$/, '');
  // Collapse whitespace
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

// Normalization key for strict deduplication
function getDedupeKey(text) {
  return text
    .replace(/[\u0C80-\u0CFF]\u0CE6/g, '$1\u0C82')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[,\.?!;:\-–—'"\(\)\[\]\{\}`\/\\*]/g, '')
    .replace(/\s+/g, '')
    // Normalize long vowels vs short vowels in colloquial endings (eg. ತೆ vs ತೇ)
    .replace(/್/g, '')
    .toLowerCase();
}

const rawOccurrences = [];
const sourceCounts = {};
const proverbMap = new Map(); // key -> { kannada, sources: Set, rawForms: Set }

const excludePhrases = [
  'ಭಾಗ', 'ಸಂಗ್ರಹ', 'ವಿಷಯ ತಂಡ', 'ಕೃತಿಸ್ವಾಮ್ಯ', 'ಹಕ್ಕುಗಳನ್ನು',
  'ಕ್ಲಿಕ್ ಮಾಡಿ', 'Posted On', 'Posted By', 'Comments',
  'Kannada Language', 'Kannada 1000 Proverbs', 'Specialties', 'Wisdom'
];

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

  let partValid = 0;
  for (const line of lines) {
    if (!/[\u0C80-\u0CFF]/.test(line)) continue;
    if (excludePhrases.some(p => line.includes(p))) continue;

    const cleaned = cleanProverbText(line);
    // Sanity checks: length between 7 and 200, must have spaces (at least 2 words)
    if (cleaned.length < 7 || cleaned.length > 200) continue;
    if (!cleaned.includes(' ')) continue;

    partValid++;
    rawOccurrences.push({ part, raw: line, cleaned });

    const key = getDedupeKey(cleaned);
    if (!proverbMap.has(key)) {
      proverbMap.set(key, {
        kannada: cleaned,
        sources: new Set([`Vishaya.in (Part ${part})`]),
        rawForms: new Set([line])
      });
    } else {
      const entry = proverbMap.get(key);
      entry.sources.add(`Vishaya.in (Part ${part})`);
      entry.rawForms.add(line);
      // Prefer cleaner / punctuated form if available
      if (cleaned.length > entry.kannada.length && !entry.kannada.includes(',')) {
        entry.kannada = cleaned;
      }
    }
  }
  sourceCounts[`Vishaya Part ${part}`] = partValid;
}

console.log('=== DEDUPLICATION & NORMALIZATION SUMMARY ===');
console.log('Total raw valid proverb occurrences:', rawOccurrences.length);
console.log('Total UNIQUE proverbs after deduplication:', proverbMap.size);
console.log('\nPer-part counts:');
for (const [s, c] of Object.entries(sourceCounts)) {
  console.log(`  ${s}: ${c}`);
}

// Distribution of frequencies
let singleSource = 0;
let multiSource = 0;
for (const v of proverbMap.values()) {
  if (v.sources.size === 1) singleSource++;
  else multiSource++;
}
console.log(`\nFrequency breakdown:\n  Found in only 1 part: ${singleSource}\n  Repeated across 2+ parts: ${multiSource}`);
