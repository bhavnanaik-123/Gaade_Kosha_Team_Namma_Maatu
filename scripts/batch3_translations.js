import fs from 'fs';

const masterPath = 'data/kannada_proverbs_master.json';
const masterData = JSON.parse(fs.readFileSync(masterPath, 'utf8'));

const BATCH3 = {
  "ಆಲಸ್ಯಂ ಅಮೃತಂ ವಿಷಂ": {
    en: "Laziness turns even the divine nectar of life into deadly poison. (Indolence and procrastination ruin even the finest innate talents and golden opportunities).",
    kn: "ಆಲಸ್ಯ ಮತ್ತು ಸೋಮಾರಿತನವು ಅತ್ಯಂತ ಶ್ರೇಷ್ಠ ಅಮೃತೋಪಮ ಅವಕಾಶಗಳನ್ನೂ ವಿಷವನ್ನಾಗಿಸಿ ನಾಶಮಾಡುತ್ತದೆ.",
    sit: "Counseling students or professionals who procrastinate and miss career-defining opportunities.",
    sit_kn: "ಆಲಸ್ಯದಿಂದ ಅಮೂಲ್ಯ ಸಮಯ ಮತ್ತು ಪ್ರತಿಭೆ ಹಾಳಾಗುವುದನ್ನು ಎಚ್ಚರಿಸಲು."
  },
  "ದರಿದ್ರ ಏಳಗೊಡುವುದಿಲ್ಲ": {
    en: "Poverty does not allow one to rise, while laziness does not allow one to dine. (Poverty restricts worldly advancement, but laziness starves even basic daily sustenance).",
    kn: "ಬಡತನವು ಮೇಲೇಳಲು ಬಿಡದಿದ್ದರೂ, ಸೋಮಾರಿತನವು ಊಟಕ್ಕೂ ಗತಿ ಇಲ್ಲದಂತೆ ಮಾಡುತ್ತದೆ; ಕಾಯಕವೇ ಏಕೈಕ ದಾರಿ.",
    sit: "Inspiring someone living in hardship to work with unwavering dedication to break the cycle of poverty.",
    sit_kn: "ಬಡತನವನ್ನು ಮೆಟ್ಟಿ ನಿಲ್ಲಲು ಕಾಯಕ ಮತ್ತು ಆಲಸ್ಯ ತ್ಯಾಗದ ಅಗತ್ಯ ತಿಳಿಸಲು."
  },
  "ವಿದ್ಯೆಯೇ ಕಣ್ಣು": {
    en: "Education and knowledge are the true eyes of a human being. (Without learning, a person walks blindly through the world; true vision comes through wisdom).",
    kn: "ವಿದ್ಯೆಯು ವ್ಯಕ್ತಿಯ ಜೀವನಕ್ಕೆ ಜ್ಞಾನದ ದಿವ್ಯದೃಷ್ಟಿಯನ್ನು ನೀಡುತ್ತದೆ.",
    sit: "Promoting literacy, schooling, and lifelong learning for underprivileged children.",
    sit_kn: "ವಿದ್ಯೆಯ ಮಹತ್ವ ಮತ್ತು ಅಜ್ಞಾನದ ಅಂಧಕಾರವನ್ನು ನಿವಾರಿಸುವ ಶಕ್ತಿಯನ್ನು ಸಾರಲು."
  },
  "ಗುರುವಿಲ್ಲದ ವಿದ್ಯೆ": {
    en: "Knowledge acquired without a mentor or master lacks direction and foundation. (A wise mentor imparts not just technical facts, but ethical discernment and balance).",
    kn: "ಗುರುವಿನ ಮಾರ್ಗದರ್ಶನವಿಲ್ಲದೆ ಕಲಿತ ವಿದ್ಯೆಗೆ ಪರಿಪೂರ್ಣತೆ ಮತ್ತು ಸಂಸ್ಕಾರವಿರುವುದಿಲ್ಲ.",
    sit: "Seeking guidance from experienced teachers and industry veterans rather than learning only in isolation.",
    sit_kn: "ಗುರು ಮತ್ತು ಹಿರಿಯ ಮಾರ್ಗದರ್ಶಕರ ಉಪಸ್ಥಿತಿಯ ಅಗತ್ಯ ತಿಳಿಸಲು."
  },
  "ಅಕ್ಷರ ಕಲಿತವನು": {
    en: "One who has mastered letters and learning is adorned with the highest jewelry. (Scholarly wisdom is an ornament that never tarnishes or fades).",
    kn: "ಜ್ಞಾನ ಮತ್ತು ಶಿಕ್ಷಣವು ವ್ಯಕ್ತಿಗೆ ನೀಡುವ ಗೌರವ ಯಾವುದೇ ಭೌತಿಕ ಆಭರಣಗಳಿಗಿಂತ ಶ್ರೇಷ್ಠ.",
    sit: "Celebrating academic graduation and intellectual achievements over material displays.",
    sit_kn: "ವಿದ್ಯಾವಂತನ ನಿಜವಾದ ಸೌಂದರ್ಯ ಮತ್ತು ಘನತೆಯನ್ನು ಶ್ಲಾಘಿಸಲು."
  }
};

let count = 0;
for (const p of masterData) {
  if (p.is_verified === true) continue;

  for (const [pattern, item] of Object.entries(BATCH3)) {
    if (p.kannada.includes(pattern)) {
      p.english_meaning = item.en;
      p.kannada_explanation = item.kn;
      p.kannada_meaning = item.kn;
      p.situation = item.sit;
      p.situation_kn = item.sit_kn;
      p.needs_review = true;
      p.verification_status = 'pending_review';
      count++;
      break;
    }
  }
}

console.log(`Batch 3 matched ${count} additional proverbs.`);

fs.writeFileSync(masterPath, JSON.stringify(masterData, null, 2), 'utf8');
fs.writeFileSync('src/data/masterProverbs.json', JSON.stringify(masterData, null, 2), 'utf8');
console.log('Saved Batch 3!');
