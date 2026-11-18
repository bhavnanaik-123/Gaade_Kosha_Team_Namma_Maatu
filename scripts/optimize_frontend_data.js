import fs from 'fs';
import path from 'path';

const raw = JSON.parse(fs.readFileSync('data/kannada_proverbs_master.json', 'utf8'));

const optimized = raw.map(r => ({
  id: r.id,
  kannada: r.kannada,
  transliteration: r.transliteration,
  english_meaning: r.english_meaning,
  kannada_meaning: r.kannada_meaning || r.kannada_explanation,
  category: r.category,
  category_kn: r.category_kn,
  situation: r.situation || '',
  situation_kn: r.situation_kn || '',
  tags: r.tags || r.keywords || [],
  contributor: r.contributor || 'ವಿಷಯ ಜನಪ್ರಿಯ ಗಾದೆಗಳು (Vishaya.in)',
  likes: r.likes || 0,
  is_verified: r.is_verified || false
}));

const str = JSON.stringify(optimized);
console.log('Optimized JSON size (chars):', str.length);
fs.writeFileSync('src/data/masterProverbs.json', str, 'utf8');
console.log('Saved src/data/masterProverbs.json');
