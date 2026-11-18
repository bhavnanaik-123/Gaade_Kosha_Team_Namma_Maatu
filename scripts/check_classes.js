import fs from 'fs';

const html = fs.readFileSync('scripts/vishaya_raw.html', 'utf8');

// Match class containing content or post
const classes = [...html.matchAll(/class="([^"]+)"/g)].map(m => m[1]);
const contentClasses = classes.filter(c => c.includes('content') || c.includes('post') || c.includes('article') || c.includes('entry'));
console.log('Unique content classes:', [...new Set(contentClasses)].slice(0, 20));
