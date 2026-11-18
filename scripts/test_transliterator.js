const VOWELS = {
  '\u0C85': 'a', '\u0C86': 'aa', '\u0C87': 'i', '\u0C88': 'ee', '\u0C89': 'u',
  '\u0C8A': 'oo', '\u0C8B': 'ru', '\u0C8E': 'e', '\u0C8F': 'ee', '\u0C90': 'ai',
  '\u0C92': 'o', '\u0C93': 'oo', '\u0C94': 'au'
};

const VOWEL_SIGNS = {
  '\u0CBE': 'aa', '\u0CBF': 'i', '\u0CC0': 'ee', '\u0CC1': 'u', '\u0CC2': 'oo',
  '\u0CC3': 'ru', '\u0CC6': 'e', '\u0CC7': 'ee', '\u0CC8': 'ai', '\u0CCA': 'o',
  '\u0CCB': 'oo', '\u0CCC': 'au'
};

const CONSONANTS = {
  '\u0C95': 'k', '\u0C96': 'kh', '\u0C97': 'g', '\u0C98': 'gh', '\u0C99': 'ng',
  '\u0C9A': 'ch', '\u0C9B': 'chh', '\u0C9C': 'j', '\u0C9D': 'jh', '\u0C9E': 'ny',
  '\u0C9F': 't', '\u0CA0': 'th', '\u0CA1': 'd', '\u0CA2': 'dh', '\u0CA3': 'n',
  '\u0CA4': 't', '\u0CA5': 'th', '\u0CA6': 'd', '\u0CA7': 'dh', '\u0CA8': 'n',
  '\u0CAA': 'p', '\u0CAB': 'ph', '\u0CAC': 'b', '\u0CAD': 'bh', '\u0CAE': 'm',
  '\u0CAF': 'y', '\u0CB0': 'r', '\u0CB1': 'r', '\u0CB2': 'l', '\u0CB3': 'l',
  '\u0CB5': 'v', '\u0CB6': 'sh', '\u0CB7': 'sh', '\u0CB8': 's', '\u0CB9': 'h'
};

const VIRAMA = '\u0CCD';
const ANUSVARA = '\u0C82';
const VISARGA = '\u0C83';

export function transliterateKannada(text) {
  let result = '';
  const len = text.length;

  for (let i = 0; i < len; i++) {
    const ch = text[i];

    if (VOWELS[ch]) {
      result += VOWELS[ch];
    } else if (CONSONANTS[ch]) {
      const base = CONSONANTS[ch];
      const next = i + 1 < len ? text[i + 1] : '';

      if (next === VIRAMA) {
        result += base;
        i++; // skip virama
      } else if (VOWEL_SIGNS[next]) {
        result += base + VOWEL_SIGNS[next];
        i++; // skip vowel sign
      } else {
        result += base + 'a';
      }
    } else if (ch === ANUSVARA) {
      result += 'm';
    } else if (ch === VISARGA) {
      result += 'h';
    } else {
      result += ch;
    }
  }

  // Capitalize first letter of each sentence or line
  return result.charAt(0).toUpperCase() + result.slice(1);
}

// Test
const samples = [
  'ಕೈ ಕೆಸರಾದರೆ ಬಾಯಿ ಮೊಸರು',
  'ಹಾಸಿಗೆ ಇದ್ದಷ್ಟು ಕಾಲು ಚಾಚು',
  'ವಿದ್ಯೆಯೇ ವಿನಯ, ವಿನಯವೇ ವಿದ್ಯೆ',
  'ಗಿಡವಾಗಿ ಬಗ್ಗದ್ದು ಮರವಾಗಿ ಬಗ್ಗೀತೇ?',
  'ಮಾಡಿದ ಪಾಪ ದಾನದಿಂದ ಹೋದೀತೆ'
];

for (const s of samples) {
  console.log(`KN: "${s}"\nTL: "${transliterateKannada(s)}"\n`);
}
