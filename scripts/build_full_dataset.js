import fs from 'fs';
import path from 'path';
import { initialProverbs } from '../src/data/initialProverbs.js';
import { transliterateKannada } from './test_transliterator.js';

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

// Fix font artifacts and clean raw text
function fixKannadaFontArtifacts(text) {
  let cleaned = decodeHtml(text);
  // Replace Kannada digit zero (೦) used as anusvara (ಂ)
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
  // Fix punctuation spacing
  text = text.replace(/\s+([,\.?!;])/g, '$1');
  // Remove leading/trailing punctuation and quotes
  text = text.replace(/^[\s"'\.,\-–—:;!?()\[\]{}]+/, '');
  text = text.replace(/[\s"'\.,\-–—:;!?()\[\]{}]+$/, '');
  // Collapse whitespace
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

function getDedupeKey(text) {
  return text
    .replace(/[\u0C80-\u0CFF]\u0CE6/g, '$1\u0C82')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[,\.?!;:\-–—'"\(\)\[\]\{\}`\/\\*]/g, '')
    .replace(/\s+/g, '')
    .replace(/್/g, '')
    .toLowerCase();
}

const CATEGORY_RULES = {
  education: [
    'ವಿದ್ಯೆ', 'ಶಿಕ್ಷಣ', 'ಓದು', 'ಬರೆ', 'ಪಾಠ', 'ಶಾಲೆ', 'ಜ್ಞಾನ', 'ಬುದ್ಧಿ', 'ಜಾಣ', 'ದಡ್ಡ',
    'ಗುರು', 'ಶಿಷ್ಯ', 'ಕಲಿಕೆ', 'ಕಲಿ', 'ಪುಸ್ತಕ', 'ಅಕ್ಷರ', 'ವಿವೇಕ', 'ಕಾಯಕ', 'ಅಭ್ಯಾಸ',
    'ತಿಳಿ', 'ವಿದ್ಯಾವಂತ', 'ಕಾವ್ಯ', 'ಶಾಸ್ತ್ರ', 'ತಿಳುವಳಿಕೆ', 'ಕಲಿತ', 'ಓದಿದ'
  ],
  friendship: [
    'ಸ್ನೇಹ', 'ಗೆಳೆಯ', 'ಗೆಳತಿ', 'ಮಿತ್ರ', 'ದೋಸ್ತಿ', 'ಸಹಪಾಠಿ', 'ಹಿತೈಷಿ', 'ಬೆಸುಗೆ',
    'ವಿಶ್ವಾಸ', 'ನಂಬಿಕೆ', 'ದ್ರೋಹ', 'ಶತ್ರು', 'ಸ್ನೇಹಿತ', 'ನೆಂಟಸ್ತಿಕೆ', 'ಆಪ್ತ'
  ],
  money: [
    'ಹಣ', 'ದುಡ್ಡು', 'ಕಾಸು', 'ಚಿನ್ನ', 'ಬೆಳ್ಳಿ', 'ಸಾಲ', 'ಬಡ್ಡಿ', 'ಆಸ್ತಿ', 'ವ್ಯಾಪಾರ',
    'ಲಾಭ', 'ನಷ್ಟ', 'ವೆಚ್ಚ', 'ಖರ್ಚು', 'ಬಡವ', 'ಶ್ರೀಮಂತ', 'ದಾನ', 'ಐಶ್ವರ್ಯ', 'ಆದಾಯ',
    'ಕೊಳ್ಳು', 'ಮಾರು', 'ರೂಪಾಯಿ', 'ಬಡತನ', 'ಸಿರಿವಂತ', 'ಧನ', 'ಕಂತೆ', 'ಬಂಗಾರ'
  ],
  family: [
    'ತಾಯಿ', 'ಅಮ್ಮ', 'ತಂದೆ', 'ಅಪ್ಪ', 'ಮಗ', 'ಮಗಳು', 'ಹೆಂಡತಿ', 'ಗಂಡ', 'ಅತ್ತೆ', 'ಸೊಸೆ',
    'ಮಾವ', 'ಅಳಿಯ', 'ಅಣ್ಣ', 'ತಮ್ಮ', 'ಅಕ್ಕ', 'ತಂಗಿ', 'ಮನೆ', 'ಸಂಸಾರ', 'ಕುಟುಂಬ',
    'ತೊಟ್ಟಿಲು', 'ಮದುವೆ', 'ತವರು', 'ಮಕ್ಕಳು', 'ಬಾಣಂತಿ', 'ಹೆತ್ತವರು', 'ದಂಪತಿ'
  ],
  unity: [
    'ಒಗ್ಗಟ್ಟು', 'ಸಂಘಟನೆ', 'ಕೂಡು', 'ಸಮೂಹ', 'ಐಕ್ಯತೆ', 'ಜೊತೆಯಾಗಿ', 'ಹಂಚಿ',
    'ಕೈಜೋಡಿಸು', 'ಸಹಕಾರ', 'ಗುಂಪು', 'ಒಗ್ಗಟ್ಟಿನಲ್ಲಿ', 'ಹಲವರು'
  ]
};

const CATEGORY_KN = {
  education: 'ಶಿಕ್ಷಣ',
  friendship: 'ಸ್ನೇಹ',
  money: 'ಹಣಕಾಸು',
  family: 'ಕುಟುಂಬ',
  unity: 'ಒಗ್ಗಟ್ಟು',
  life: 'ಜೀವನ'
};

function classify(text) {
  for (const [cat, keywords] of Object.entries(CATEGORY_RULES)) {
    for (const kw of keywords) {
      if (text.includes(kw)) {
        return cat;
      }
    }
  }
  return 'life';
}

function extractKeywords(text, category) {
  const words = text
    .replace(/[,\.?!;:\-–—'"\(\)\[\]\{\}`]/g, '')
    .split(/\s+/)
    .filter(w => w.length >= 3 && /[\u0C80-\u0CFF]/.test(w));
  const uniqueWords = [...new Set(words)];
  const tags = uniqueWords.slice(0, 5);
  tags.push(CATEGORY_KN[category] || category);
  return tags;
}

// Master map to store records
const masterMap = new Map(); // dedupeKey -> record
const sourceStats = {};

// 1. First, seed with the 22 curated records to preserve them 100%
console.log('Loading existing curated records...');
for (const p of initialProverbs) {
  const key = getDedupeKey(p.kannada);
  masterMap.set(key, {
    id: p.id,
    kannada: p.kannada,
    transliteration: p.transliteration,
    english_meaning: p.english_meaning,
    kannada_explanation: p.kannada_meaning,
    kannada_meaning: p.kannada_meaning,
    category: p.category,
    category_kn: p.category_kn,
    situation: p.situation,
    situation_kn: p.situation_kn,
    keywords: p.tags,
    tags: p.tags,
    source: 'Gaadhe Kosha Curated Heritage Collection',
    attribution: p.contributor || 'ಪಾರಂಪರಿಕ (Traditional)',
    contributor: p.contributor || 'ಪಾರಂಪರಿಕ (Traditional)',
    likes: p.likes || 0,
    is_verified: true,
    verification_status: 'verified'
  });
}
sourceStats['Curated Seed (initialProverbs.js)'] = initialProverbs.length;

// 2. Extract from Vishaya Parts 1 to 11
const excludePhrases = [
  'ಭಾಗ', 'ಸಂಗ್ರಹ', 'ವಿಷಯ ತಂಡ', 'ಕೃತಿಸ್ವಾಮ್ಯ', 'ಹಕ್ಕುಗಳನ್ನು',
  'ಕ್ಲಿಕ್ ಮಾಡಿ', 'Posted On', 'Posted By', 'Comments',
  'Kannada Language', 'Kannada 1000 Proverbs', 'Specialties', 'Wisdom'
];

let vishayaExtractedCount = 0;
let newProverbsFromVishaya = 0;

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

  let partCount = 0;
  for (const line of lines) {
    if (!/[\u0C80-\u0CFF]/.test(line)) continue;
    if (excludePhrases.some(p => line.includes(p))) continue;

    const cleaned = cleanProverbText(line);
    if (cleaned.length < 7 || cleaned.length > 200) continue;
    if (!cleaned.includes(' ')) continue;

    partCount++;
    vishayaExtractedCount++;

    const key = getDedupeKey(cleaned);
    if (!masterMap.has(key)) {
      newProverbsFromVishaya++;
      const cat = classify(cleaned);
      const catKn = CATEGORY_KN[cat];
      const translit = transliterateKannada(cleaned);
      const tags = extractKeywords(cleaned, cat);

      masterMap.set(key, {
        id: `vishaya-p${part}-${String(partCount).padStart(4, '0')}`,
        kannada: cleaned,
        transliteration: translit,
        english_meaning: `[Translation in progress] Traditional folk wisdom: "${cleaned}". Context: Guidance on ${cat} and ethical living.`,
        kannada_explanation: `ಸಾಂಪ್ರದಾಯಿಕ ಜನಪದ ಗಾದೆ: "${cleaned}". ಇದು ${catKn} ಹಾಗೂ ಜೀವನಾನುಭವದ ಮೌಲ್ಯವನ್ನು ತಿಳಿಸುತ್ತದೆ.`,
        kannada_meaning: `ಸಾಂಪ್ರದಾಯಿಕ ಜನಪದ ಗಾದೆ: "${cleaned}". ಇದು ${catKn} ಹಾಗೂ ಜೀವನಾನುಭವದ ಮೌಲ್ಯವನ್ನು ತಿಳಿಸುತ್ತದೆ.`,
        category: cat,
        category_kn: catKn,
        situation: `Used in daily conversations to illustrate ${cat} principles and life lessons.`,
        situation_kn: `${catKn} ಹಾಗೂ ದೈನಂದಿನ ಜೀವನದ ಸಂದರ್ಭಗಳಲ್ಲಿ ಹಿರಿಯರು ಬಳಸುವ ನಾಣ್ಣುಡಿ.`,
        keywords: tags,
        tags: tags,
        source: `Vishaya.in (Part ${part})`,
        attribution: 'ಪಾರಂಪರಿಕ ಜನಪದ ಗಾದೆ (Vishaya.in)',
        contributor: 'ವಿಷಯ ಜನಪ್ರಿಯ ಗಾದೆಗಳು (Vishaya.in)',
        likes: 0,
        is_verified: false,
        verification_status: 'pending_review'
      });
    } else {
      // Append source if already known
      const existing = masterMap.get(key);
      if (!existing.source.includes(`Part ${part}`)) {
        existing.source += `, Part ${part}`;
      }
    }
  }
  sourceStats[`Vishaya Part ${part}`] = partCount;
}

console.log('=== DATASET CREATION SUMMARY ===');
console.log('Total raw occurrences processed from Vishaya:', vishayaExtractedCount);
console.log('New unique proverbs added from Vishaya:', newProverbsFromVishaya);
console.log('TOTAL UNIQUE RECORDS IN MASTER DATASET:', masterMap.size);

// Save to data directory
const outDir = 'data';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const records = Array.from(masterMap.values());

// 1. Save JSON
fs.writeFileSync(path.join(outDir, 'kannada_proverbs_master.json'), JSON.stringify(records, null, 2), 'utf8');

// 2. Save JSONL
const jsonlContent = records.map(r => JSON.stringify(r)).join('\n');
fs.writeFileSync(path.join(outDir, 'kannada_proverbs_master.jsonl'), jsonlContent, 'utf8');

// 3. Save CSV
function escapeCsv(val) {
  if (val === null || val === undefined) return '';
  if (Array.isArray(val)) {
    return `"${val.join('; ').replace(/"/g, '""')}"`;
  }
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const csvHeader = [
  'id', 'kannada', 'transliteration', 'english_meaning', 'kannada_explanation',
  'category', 'category_kn', 'situation', 'situation_kn', 'keywords',
  'source', 'attribution', 'verification_status', 'likes'
];

const csvRows = [csvHeader.join(',')];
for (const r of records) {
  csvRows.push([
    escapeCsv(r.id),
    escapeCsv(r.kannada),
    escapeCsv(r.transliteration),
    escapeCsv(r.english_meaning),
    escapeCsv(r.kannada_explanation),
    escapeCsv(r.category),
    escapeCsv(r.category_kn),
    escapeCsv(r.situation),
    escapeCsv(r.situation_kn),
    escapeCsv(r.keywords),
    escapeCsv(r.source),
    escapeCsv(r.attribution),
    escapeCsv(r.verification_status),
    escapeCsv(r.likes)
  ].join(','));
}

fs.writeFileSync(path.join(outDir, 'kannada_proverbs_master.csv'), csvRows.join('\n'), 'utf8');

console.log(`Saved ${records.length} records to:`);
console.log(' - data/kannada_proverbs_master.json');
console.log(' - data/kannada_proverbs_master.jsonl');
console.log(' - data/kannada_proverbs_master.csv');
