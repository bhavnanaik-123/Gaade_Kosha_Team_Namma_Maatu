import fs from 'fs';
import { initialProverbs } from '../src/data/initialProverbs.js';

console.log('Initial curated proverbs count:', initialProverbs.length);

// Read unique proverbs from analyze_vishaya_all
// Let's run a test to see how many of initialProverbs match
