import fs from 'fs';

const html = fs.readFileSync('scripts/cache/part_1.html', 'utf8');
const countDigitZero = (html.match(/[\u0C80-\u0CFF]\u0CE6[\u0C80-\u0CFF]/g) || []).length;
console.log('Occurrences of Kannada digit 0 between Kannada characters:', countDigitZero);

// Example: "ಮ೦ತ್ರ" -> "ಮ" + '\u0CE6' + "ತ್ರ"
console.log('Sample match:', html.match(/[\u0C80-\u0CFF]\u0CE6[\u0C80-\u0CFF]/g)?.slice(0, 10));
