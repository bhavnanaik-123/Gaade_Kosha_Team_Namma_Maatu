import fs from 'fs';
import path from 'path';

const cacheDir = 'scripts/cache';

for (let part = 1; part <= 11; part++) {
  const filePath = path.join(cacheDir, `part_${part}.html`);
  if (!fs.existsSync(filePath)) {
    console.log(`Part ${part} not found`);
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');

  // Find article content
  const startIdx = html.indexOf('id="post-');
  let body = html;
  if (startIdx !== -1) {
    const endIdx = html.indexOf('</article>', startIdx);
    body = html.slice(startIdx, endIdx > startIdx ? endIdx : undefined);
  }

  // Convert HTML to clean lines
  const plain = body.replace(/<script[\s\S]*?<\/script>/gi, '')
                    .replace(/<style[\s\S]*?<\/style>/gi, '')
                    .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, '\n')
                    .replace(/<br\s*\/?>/gi, '\n')
                    .replace(/<[^>]*>/g, '');

  const lines = plain.split('\n')
                     .map(s => s.trim())
                     .filter(Boolean);

  const proverbs = [];
  const regexNum = /^([0-9೦-೯]+)[\.\-\s\)]+(.+)$/;

  for (const line of lines) {
    // Check if line has Kannada characters
    if (!/[\u0C80-\u0CFF]/.test(line)) continue;
    // Skip boilerplate headers or navigation lines
    if (line.includes('ಭಾಗ') && (line.includes('ಸಂಗ್ರಹ') || line.includes('ಗಾದೆಗಳು'))) continue;
    if (line.includes('Posted On') || line.includes('Posted By') || line.includes('Comments:')) continue;
    if (line.includes('ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ') || line.includes('ಕ್ಲಿಕ್ ಮಾಡಿ')) continue;
    if (line.includes('ಕನ್ನಡ ಜನಪ್ರಿಯ ಗಾದೆಗಳು |') || line.includes('Kannada Popular Proverbs')) continue;
    if (line.length < 5 || line.length > 250) continue;

    const match = line.match(regexNum);
    let text = match ? match[2].trim() : line;
    // Clean leading punctuation or spaces
    text = text.replace(/^[-\.\s\)]+/, '').trim();
    if (text.length >= 6) {
      proverbs.push(text);
    }
  }

  console.log(`Part ${part}: extracted ${proverbs.length} proverbs. (First: "${proverbs[0]}", Last: "${proverbs[proverbs.length - 1]}")`);
}
