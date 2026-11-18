import fs from 'fs';
import path from 'path';
import { initialProverbs } from '../src/data/initialProverbs.js';

// We import the dedupe key function
function getDedupeKey(text) {
  return text
    .replace(/[\u0C80-\u0CFF]\u0CE6/g, '$1\u0C82')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[,\.?!;:\-–—'"\(\)\[\]\{\}`\/\\*]/g, '')
    .replace(/\s+/g, '')
    .replace(/್/g, '')
    .toLowerCase();
}

console.log('Initial seed proverbs count:', initialProverbs.length);

// Let's check how many initial proverbs match the dedupe key
const initialKeys = new Set(initialProverbs.map(p => getDedupeKey(p.kannada)));
console.log('Unique keys in initialProverbs:', initialKeys.size);
