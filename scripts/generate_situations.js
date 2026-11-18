import fs from 'fs';
import path from 'path';

// Define the comprehensive list of 400+ distinct real-life situations
// Spanning 8 everyday life domains

const RAW_SITUATIONS = [
  // =========================================================================
  // 1. EDUCATION & LEARNING (ಶಿಕ್ಷಣ ಮತ್ತು ಕಲಿಕೆ) - 55 Scenarios
  // =========================================================================
  {
    category: 'education',
    category_kn: 'ಶಿಕ್ಷಣ',
    title_en: 'Postponing studies until exam eve',
    title_kn: 'ಪರೀಕ್ಷೆಯ ಹಿಂದಿನ ದಿನದವರೆಗೂ ಓದುವುದನ್ನು ಮುಂದೂಡುವುದು',
    situation_en: 'A student avoids opening textbooks all semester and suddenly panics the night before the final examination.',
    situation_kn: 'ಸೆಮಿಸ್ಟರ್ ಪೂರ್ತಿ ಪುಸ್ತಕ ಮುಟ್ಟದೆ ಕಾಲಕಳೆದು, ಪರೀಕ್ಷೆಯ ಹಿಂದಿನ ರಾತ್ರಿ ಭಯದಿಂದ ಗಾಬರಿಯಾಗುವ ವಿದ್ಯಾರ್ಥಿಯ ಪರಿಸ್ಥಿತಿ.',
    tags: ['procrastination', 'exams', 'study', 'discipline', 'time management']
  },
  {
    category: 'education',
    category_kn: 'ಶಿಕ್ಷಣ',
    title_en: 'Arrogance after getting a degree',
    title_kn: 'ಪದವಿ ಪಡೆದ ಮೇಲೆ ಹಿರಿಯರನ್ನು ಕಡೆಗಣಿಸುವ ಅಹಂಕಾರ',
    situation_en: 'A young graduate speaks dismissively to uneducated village elders who possess vast practical wisdom.',
    situation_kn: 'ಕಾಲೇಜು ಡಿಗ್ರಿ ಸಿಕ್ಕ ತಕ್ಷಣ ಕೃಷಿ ಮತ್ತು ಜೀವನಾನುಭವ ಹೊಂದಿದ ಹಿರಿಯರನ್ನು ಕೀಳಾಗಿ ಕಾಣುವ ಯುವಕನ ವರ್ತನೆ.',
    tags: ['humility', 'degree', 'wisdom', 'arrogance', 'elders']
  },
  {
    category: 'education',
    category_kn: 'ಶಿಕ್ಷಣ',
    title_en: 'Struggling with a difficult subject through daily practice',
    title_kn: 'ಕಠಿಣ ವಿಷಯವನ್ನು ನಿರಂತರ ಪರಿಶ್ರಮದಿಂದ ಕರಗತ ಮಾಡಿಕೊಳ್ಳುವುದು',
    situation_en: 'A student who is initially weak in mathematics practices daily math problems until they excel.',
    situation_kn: 'ಲೆಕ್ಕದಲ್ಲಿ ದುರ್ಬಲನಾಗಿದ್ದ ವಿದ್ಯಾರ್ಥಿ ಪ್ರತಿದಿನ ಹಠಬಿಡದೆ ಅಭ್ಯಾಸ ಮಾಡಿ ಪ್ರಥಮ ಶ್ರೇಣಿ ಪಡೆಯುವ ಸನ್ನಿವೇಶ.',
    tags: ['practice', 'hard work', 'mathematics', 'perseverance', 'success']
  },
  {
    category: 'education',
    category_kn: 'ಶಿಕ್ಷಣ',
    title_en: 'Teaching good habits in early childhood',
    title_kn: 'ಬಾಲ್ಯದಲ್ಲೇ ಮಕ್ಕಳಿಗೆ ಉತ್ತಮ ಶಿಸ್ತು ಸಂಸ್ಕಾರ ಕಲಿಸುವುದು',
    situation_en: 'A parent wondering whether it is too early to teach their young child discipline and honesty.',
    situation_kn: 'ಚಿಕ್ಕ ವಯಸ್ಸಿನಲ್ಲೇ ಮಕ್ಕಳಿಗೆ ಸತ್ಯ, ಶಿಸ್ತು ಮತ್ತು ಒಳ್ಳೆ ನಡತೆಯನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿಸುವ ಪ್ರಾಮುಖ್ಯತೆ.',
    tags: ['childhood', 'habits', 'discipline', 'parenting', 'learning']
  },
  {
    category: 'education',
    category_kn: 'ಶಿಕ್ಷಣ',
    title_en: 'Bookish knowledge without street smartness',
    title_kn: 'ಕೇವಲ ಪುಸ್ತಕದ ಜ್ಞಾನವಿದ್ದು ವ್ಯವಹಾರ ಜ್ಞಾನವಿಲ್ಲದಿರುವುದು',
    situation_en: 'A top rank student struggles to negotiate a simple vegetable purchase in the local market.',
    situation_kn: 'ಕ್ಲಾಸ್‌ನಲ್ಲಿ ಫಸ್ಟ್ ಬಂದರೂ ಸಂತೆ ಅಥವಾ ಬಸ್ ನಿಲ್ದಾಣದಲ್ಲಿ ದೈನಂದಿನ ವ್ಯವಹಾರ ನಡೆಸಲು ತಡವರಿಸುವ ಸ್ಥಿತಿ.',
    tags: ['common sense', 'practical knowledge', 'experience', 'street smart']
  },
  {
    category: 'education',
    category_kn: 'ಶಿಕ್ಷಣ',
    title_en: 'Ignoring teacher guidance and regretting later',
    title_kn: 'ಗುರುಗಳ ಮಾರ್ಗದರ್ಶನ ಧಿಕ್ಕರಿಸಿ ನಂತರ ಪರಿತಪಿಸುವುದು',
    situation_en: 'An apprentice ignores master craftsman instructions, ruining the raw materials.',
    situation_kn: 'ಹಿರಿಯ ಶಿಕ್ಷಕರು ಹೇಳಿದ ಎಚ್ಚರಿಕೆಯನ್ನು ನಿರ್ಲಕ್ಷಿಸಿ ಕೆಲಸ ಕೆಡಿಸಿಕೊಂಡು ಕಣ್ಣೀರು ಹಾಕುವ ಸಂದರ್ಭ.',
    tags: ['mentor', 'teacher', 'guidance', 'regret', 'respect']
  },
  {
    category: 'education',
    category_kn: 'ಶಿಕ್ಷಣ',
    title_en: 'Cheating in an examination instead of studying',
    title_kn: 'ಓದುವ ಬದಲು ಪರೀಕ್ಷೆಯಲ್ಲಿ ನಕಲು ಮಾಡಿ ಸಿಕ್ಕಿಬೀಳುವುದು',
    situation_en: 'A candidate tries to copy from a cheat sheet and gets debarred for three years.',
    situation_kn: 'ಪ್ರಾಮಾಣಿಕವಾಗಿ ಓದುವ ಬದಲು ಅಡ್ಡದಾರಿ ಹಿಡಿದು ಕಾಪಿ ಮಾಡಿ ಪರೀಕ್ಷೆಯಿಂದ ಡಿಬಾರ್ ಆಗುವ ಪರಿಸ್ಥಿತಿ.',
    tags: ['cheating', 'honesty', 'exams', 'integrity', 'consequences']
  },
  {
    category: 'education',
    category_kn: 'ಶಿಕ್ಷಣ',
    title_en: 'Learning a new skill at an advanced age',
    title_kn: 'ವಯಸ್ಸಾದ ಮೇಲೆ ಹೊಸ ವಿದ್ಯೆ ಕಲಿಯಲು ಹಿಂಜರಿಯುವುದು',
    situation_en: 'A 60-year-old grandfather hesitating to learn smartphone apps thinking it is too late.',
    situation_kn: 'ಅರವತ್ತು ವರ್ಷದ ಹಿರಿಯರು ಹೊಸ ತಂತ್ರಜ್ಞಾನ ಕಲಿಯಲು ತಮಗೆ ವಯಸ್ಸಾಯಿತೆಂದು ಹಿಂಜರಿಯುವ ಸನ್ನಿವೇಶ.',
    tags: ['lifelong learning', 'skills', 'technology', 'age', 'confidence']
  },
  {
    category: 'education',
    category_kn: 'ಶಿಕ್ಷಣ',
    title_en: 'Blaming the pen for bad handwriting',
    title_kn: 'ತನ್ನ ಅಸಾಮರ್ಥ್ಯ ಮುಚ್ಚಿಕೊಳ್ಳಲು ಸಲಕರಣೆಗಳನ್ನು ದೂಷಿಸುವುದು',
    situation_en: 'An unprepared student blames the examination paper quality and invigilator for poor marks.',
    situation_kn: 'ತಾನು ಸರಿಯಾಗಿ ಓದದೆ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಕಡಿಮೆ ಅಂಕ ಬಂದಾಗ ಪೆನ್ನು ಹಾಗೂ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಯನ್ನು ದೂಷಿಸುವುದು.',
    tags: ['excuses', 'blame', 'accountability', 'handwriting', 'truth']
  },
  {
    category: 'education',
    category_kn: 'ಶಿಕ್ಷಣ',
    title_en: 'Sacrificing leisure for competitive exam prep',
    title_kn: 'ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆಗಾಗಿ ನಿದ್ದೆ-ಆಟ ಬಿಟ್ಟು ಶ್ರಮಿಸುವುದು',
    situation_en: 'An IAS aspirant giving up cinema and social media to study 10 hours daily.',
    situation_kn: 'ಉನ್ನತ ಹುದ್ದೆಯ ಕನಸು ಹೊತ್ತು ಮೋಜು-ಮಸ್ತಿ ಬದಿಗೊತ್ತಿ ವರ್ಷಗಟ್ಟಲೆ ಶ್ರಮಪಡುವ ಆಕಾಂಕ್ಷಿಯ ಸ್ಥಿತಿ.',
    tags: ['sacrifice', 'dedication', 'competitive exams', 'focus', 'future']
  }
];

// Helper to generate the full 400+ matrix deterministically across domains
const DOMAIN_SEEDS = [
  {
    domain: 'education',
    domain_kn: 'ಶಿಕ್ಷಣ',
    count: 55,
    patterns: [
      { en: 'Student facing exam stress in', kn: 'ಪರೀಕ್ಷೆಯ ಒತ್ತಡದಲ್ಲಿ ಸಿಲುಕಿದಾಗ', tag: 'exams' },
      { en: 'Teacher advising unmotivated student about', kn: 'ಆಸಕ್ತಿಯಿಲ್ಲದ ವಿದ್ಯಾರ್ಥಿಗೆ ಗುರುಗಳು ತಿಳಿಹೇಳುವಾಗ', tag: 'learning' },
      { en: 'Overcoming fear of failure while learning', kn: 'ಹೊಸ ವಿದ್ಯೆ ಕಲಿಯುವಾಗ ಸೋಲಿನ ಭಯ ಮೆಟ್ಟಿ ನಿಲ್ಲುವುದು', tag: 'courage' },
      { en: 'Relying on false shortcuts instead of deep study for', kn: 'ಆಳವಾದ ಅಧ್ಯಯನದ ಬದಲು ಅಡ್ಡದಾರಿ ನಂಬಿದಾಗ', tag: 'integrity' },
      { en: 'Value of silent observation in mastering', kn: 'ಮೌನವಾಗಿ ಗಮನಿಸಿ ಕೌಶಲ ಕಲಿಯುವ ಮಹತ್ವ', tag: 'observation' }
    ],
    topics: [
      ['Coding and algorithmic thinking', 'ಕಂಪ್ಯೂಟರ್ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಮತ್ತು ತಂತ್ರಜ್ಞಾನ'],
      ['Classical music and vocal practice', 'ಶಾಸ್ತ್ರೀಯ ಸಂಗೀತ ಮತ್ತು ರಿಯಾಜ್ ಅಭ್ಯಾಸ'],
      ['Medical entrance preparation', 'ವೈದ್ಯಕೀಯ ಪ್ರವೇಶ ಪರೀಕ್ಷೆಯ ಸಿದ್ಧತೆ'],
      ['Carpentry and manual craftwork', 'ಬಡಗಿ ಕೆಲಸ ಮತ್ತು ಕುಶಲ ಕಲೆ'],
      ['Spoken English and communication confidence', 'ಇಂಗ್ಲಿಷ್ ಸಂಭಾಷಣೆ ಮತ್ತು ಆತ್ಮವಿಶ್ವಾಸ'],
      ['Agricultural techniques and soil testing', 'ನವೀನ ಕೃಷಿ ಪದ್ಧತಿ ಮತ್ತು ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ'],
      ['Debating and public speaking skills', 'ಭಾಷಣ ಕಲೆ ಮತ್ತು ಚರ್ಚಾ ಸ್ಪರ್ಧೆ'],
      ['History and learning from civilizational mistakes', 'ಇತಿಹಾಸದ ಪಾಠಗಳು ಮತ್ತು ಗತಕಾಲದ ತಪ್ಪುಗಳು'],
      ['Financial literacy and investment basics', 'ಆರ್ಥಿಕ ಸಾಕ್ಷರತೆ ಮತ್ತು ಹಣಕಾಸು ನಿಯಮಗಳು'],
      ['Scientific experimentation and lab patience', 'ವಿಜ್ಞಾನ ಪ್ರಯೋಗ ಮತ್ತು ಸಂಶೋಧನಾ ತಾಳ್ಮೆ'],
      ['Civil services essay writing', 'ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆಯ ಪ್ರಬಂಧ ರಚನೆ']
    ]
  },
  {
    domain: 'friendship',
    domain_kn: 'ಸ್ನೇಹ',
    count: 50,
    patterns: [
      { en: 'Friend disappearing immediately when you fall into financial trouble with', kn: 'ಕಷ್ಟ ಬಂದ ತಕ್ಷಣ ಮುಖ ತಿರುಗಿಸಿ ಓಡಿಹೋಗುವ ಗೆಳೆಯ', tag: 'fair-weather' },
      { en: 'Childhood companion standing by you during a grave crisis involving', kn: 'ಆಪತ್ಕಾಲದಲ್ಲಿ ಬೆನ್ನೆಲುಬಾಗಿ ನಿಲ್ಲುವ ಬಾಲ್ಯದ ಗೆಳೆಯ', tag: 'loyalty' },
      { en: 'Gossiping about a close confidant behind their back regarding', kn: 'ಆಪ್ತ ಸ್ನೇಹಿತನ ರಹಸ್ಯವನ್ನು ಇತರರ ಮುಂದೆ ಹರಡಿ ದ್ರೋಹ ಬಗೆಯುವುದು', tag: 'betrayal' },
      { en: 'Reconciling after a petty misunderstanding over', kn: 'ಸಣ್ಣ ಮನಸ್ತಾಪ ಮರೆತು ಮತ್ತೆ ಒಂದಾಗುವ ಸ್ನೇಹಿತರು', tag: 'forgiveness' },
      { en: 'Choosing wise companions instead of reckless peers for', kn: 'ಕೆಟ್ಟ ಸಹವಾಸ ಬಿಟ್ಟು ಜಾಣರ ಸ್ನೇಹ ಮಾಡುವುದು', tag: 'company' }
    ],
    topics: [
      ['Starting a joint restaurant business', 'ಜೊತೆಯಾಗಿ ಹೋಟೆಲ್ ವ್ಯಾಪಾರ ಆರಂಭಿಸಿದಾಗ'],
      ['College hostel roommates sharing limited money', 'ಹಾಸ್ಟೆಲ್ ಕೋಣೆಯಲ್ಲಿ ಹಣದ ಕೊರತೆ ಹಂಚಿಕೊಂಡಾಗ'],
      ['Legal property dispute mediation', 'ಆಸ್ತಿ ವಿವಾದದಲ್ಲಿ ಮಧ್ಯಸ್ಥಿಕೆ ವಹಿಸಿದಾಗ'],
      ['Emergency medical surgery in family', 'ಕುಟುಂಬದ ತುರ್ತು ಶಸ್ತ್ರಚಿಕಿತ್ಸೆಯ ಸಂದರ್ಭ'],
      ['Traveling on a dangerous mountain trek', 'ಅಪಾಯಕಾರಿ ಗಿರಿಪಯಣದ ಸನ್ನಿವೇಶ'],
      ['Competitive sports rivalry between best friends', 'ಆಟದ ಮೈದಾನದಲ್ಲಿ ಗೆಳೆಯರ ನಡುವಿನ ಸ್ಪರ್ಧೆ'],
      ['Lending expensive electronic gadgets', 'ಬೆಲೆಬಾಳುವ ಗ್ಯಾಜೆಟ್‌ಗಳನ್ನು ಸಾಲವಾಗಿ ನೀಡಿದಾಗ'],
      ['Job recommendation at a corporate firm', 'ಕಂಪನಿಯಲ್ಲಿ ಉದ್ಯೋಗಕ್ಕೆ ಶಿಫಾರಸು ಮಾಡಿದಾಗ'],
      ['Wedding preparations and stressful arrangements', 'ಮದುವೆ ಸಮಾರಂಭದ ಒತ್ತಡದ ಸಿದ್ಧತೆಗಳು'],
      ['Supporting a friend through emotional heartbreak', 'ಗೆಳೆಯನ ಮನಸ್ಸಿಗೆ ಆದ ಆಘಾತಕ್ಕೆ ಸಾಂತ್ವನ ಹೇಳುವಾಗ']
    ]
  },
  {
    domain: 'money',
    domain_kn: 'ಹಣಕಾಸು',
    count: 55,
    patterns: [
      { en: 'Spending lavishly on luxury cars beyond one\'s monthly budget for', kn: 'ಆದಾಯಕ್ಕಿಂತ ಹೆಚ್ಚು ಸಾಲ ಮಾಡಿ ಕಾರು ಕೊಳ್ಳುವ ಆಡಂಬರ', tag: 'budget' },
      { en: 'Falling prey to an easy money doubling scheme in', kn: 'ಕ್ಷಣಾರ್ಧದಲ್ಲಿ ದುಡ್ಡು ಡಬಲ್ ಮಾಡುವ ಆಸೆಗೆ ಬಿದ್ದು ಮೋಸಹೋಗುವುದು', tag: 'greed' },
      { en: 'Miser refusing to spend on basic nutrition despite wealth in', kn: 'ಕೋಟಿ ರೂಪಾಯಿ ಇದ್ದರೂ ಹಸಿದು ಒಣರೊಟ್ಟಿ ತಿನ್ನುವ ಜಿಪುಣತನ', tag: 'miser' },
      { en: 'Accumulating steady wealth through small daily savings for', kn: 'ದಿನಕ್ಕೆ ಸ್ವಲ್ಪದಂತೆ ಶೇಖರಿಸಿ ದೊಡ್ಡ ಆಸ್ತಿ ಕಟ್ಟುವ ಜಾಣ್ಮೆ', tag: 'compounding' },
      { en: 'Borrowing heavy interest from private moneylenders for', kn: 'ಮೀಟರ್ ಬಡ್ಡಿಗೆ ಸಾಲ ಪಡೆದು ಊರು ಬಿಟ್ಟು ಓಡುವ ಸ್ಥಿತಿ', tag: 'debt' }
    ],
    topics: [
      ['Festival gold jewellery purchases on EMI', 'ಹಬ್ಬದ ಬಂಗಾರದ ಒಡವೆಗಳನ್ನು ಇಎಂಐ ಮೂಲಕ ಖರೀದಿಸುವುದು'],
      ['Speculative crypto trading without knowledge', 'ತಿಳುವಳಿಕೆಯಿಲ್ಲದೆ ಆನ್‌ಲೈನ್ ಜೂಜು ಮತ್ತು ಕ್ರಿಪ್ಟೋ ಹೂಡಿಕೆ'],
      ['Constructing a three-story mansion with unpaid bank loans', 'ಸಾಲ ತೀರಿಸಲಾಗದೆ ಅರಮನೆಯಂತಹ ಬಂಗಲೆ ಕಟ್ಟಿದಾಗ'],
      ['Agricultural crop sale price collapse in market', 'ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಬೆಳೆ ಬೆಲೆ ಕುಸಿದು ಕಂಗಾಲಾದ ರೈತ'],
      ['Children wedding celebrations exceeding family means', 'ತಾಕತ್ತಿಗಿಂತ ಮೀರಿ ವೈಭವದ ಮದುವೆ ಮಾಡಿ ಸಾಲಗಾರನಾಗುವುದು'],
      ['Medical emergency draining entire life savings', 'ಅನಿರೀಕ್ಷಿತ ಅನಾರೋಗ್ಯಕ್ಕೆ ಇಡೀ ಉಳಿತಾಯ ಖಾಲಿಯಾದಾಗ'],
      ['Partnership business dispute over unaccounted cash', 'ಲೆಕ್ಕವಿಲ್ಲದ ನಗದು ಹಣಕ್ಕಾಗಿ ಪಾಲುದಾರರ ಜಗಳ'],
      ['Buying lottery tickets hoping for an overnight miracle', 'ಶ್ರಮ ಪಡದೆ ಲಾಟರಿ ಹೊಡೆಯುವುದೆಂದು ಕಾಯುವ ಮೂರ್ಖತನ'],
      ['Giving collateral-free loans to distant acquaintances', 'ಪರಿಚಯವಿಲ್ಲದವರಿಗೆ ಜಾಮೀನಿಲ್ಲದೆ ಕೈಸಾಲ ಕೊಟ್ಟಾಗ'],
      ['Planning retirement fund during youthful employment', 'ಯೌವನದಲ್ಲೇ ನಿವೃತ್ತಿ ಜೀವನಕ್ಕಾಗಿ ಯೋಜನೆ ರೂಪಿಸುವುದು'],
      ['Sharing joint ancestral property among heirs', 'ಪೂರ್ವಜರ ಆಸ್ತಿಯನ್ನು ಸಮನಾಗಿ ಭಾಗ ಮಾಡಿಕೊಳ್ಳುವುದು']
    ]
  },
  {
    domain: 'family',
    domain_kn: 'ಕುಟುಂಬ',
    count: 55,
    patterns: [
      { en: 'Brothers arguing bitter over boundary fencing of', kn: 'ಒಂದಿಂಚು ಜಾಗಕ್ಕಾಗಿ ಕಿತ್ತಾಡುವ ಒಡಹುಟ್ಟಿದ ಅಣ್ಣತಮ್ಮಂದಿರು', tag: 'sibling-rivalry' },
      { en: 'Mother silently sacrificing her own meals for', kn: 'ಮಕ್ಕಳ ಹಸಿವು ನೀಗಿಸಲು ತಾನು ಉಪವಾಸ ಮಲಗುವ ತಾಯಿಯ ಪ್ರೇಮ', tag: 'maternal-love' },
      { en: 'Spoiling an only child with excessive luxury leading to', kn: 'ಅತಿಯಾದ ಮುದ್ದಿನಿಂದ ಮಗನನ್ನು ಸೋಮಾರಿಯನ್ನಾಗಿ ಮಾಡಿದಾಗ', tag: 'pampering' },
      { en: 'In-law friction disturbing peaceful household peace in', kn: 'ಅತ್ತೆ-ಸೊಸೆಯ ಸಣ್ಣ ಜಗಳದಿಂದ ಇಡೀ ಮನೆ ನರಕವಾಗುವ ಸನ್ನಿವೇಶ', tag: 'domestic-friction' },
      { en: 'Respecting aged parents in their twilight years during', kn: 'ಮುಪ್ಪಿನ ಕಾಲದಲ್ಲಿ ತಂದೆ-ತಾಯಿಯನ್ನು ಪ್ರೀತಿಯಿಂದ ಸಾಕುವುದು', tag: 'respect-elders' }
    ],
    topics: [
      ['Ancestral farmland partition after father\'s demise', 'ತಂದೆಯ ಮರಣದ ನಂತರ ಹೊಲ-ಗದ್ದೆ ಪಾಲು ಮಾಡಿಕೊಳ್ಳುವುದು'],
      ['Choosing career against traditional family profession', 'ಕುಲಕಸುಬು ಬಿಟ್ಟು ಹೊಸ ರಂಗಕ್ಕೆ ಕಾಲಿಡುವ ಮಗನ ಹಠ'],
      ['Joint family kitchen versus separate micro households', 'ಅವಿಭಕ್ತ ಕುಟುಂಬ ಒಡೆದು ಪ್ರತ್ಯೇಕ ಮನೆ ಮಾಡುವ ಕಾಲ'],
      ['Caring for bedridden grandparent at home', 'ಮನೆಯಲ್ಲಿ ಹಾಸಿಗೆ ಹಿಡಿದ ಅಜ್ಜಿಯ ಸೇವೆ ಮಾಡುವ ಸನ್ನಿವೇಶ'],
      ['Festive homecoming bringing estranged relatives together', 'ದೀಪಾವಳಿ ಹಬ್ಬಕ್ಕೆ ಮುನಿಸು ಮರೆತು ಮನೆಗೆ ಬಂದ ನೆಂಟರು'],
      ['Arranging inter-caste marriage against orthodox objections', 'ಸಂಪ್ರದಾಯವಾದಿ ವಿರೋಧದ ನಡುವೆ ಮದುವೆಯ ಸಮಾಲೋಚನೆ'],
      ['Distribution of mother\'s traditional heirloom jewelry', 'ತಾಯಿಯ ಒಡವೆಗಳನ್ನು ಹೆಣ್ಣುಮಕ್ಕಳು ಹಂಚಿಕೊಳ್ಳುವ ಸಮಯ'],
      ['Educating daughter while community prefers early marriage', 'ಹೆಣ್ಣುಮಗುವಿಗೆ ಉನ್ನತ ಶಿಕ್ಷಣ ಕೊಡಿಸಲು ಊರಿನವರ ವಿರೋಧ ಎದುರಿಸುವುದು'],
      ['Disciplining teenage son after reckless driving complaint', 'ಬೈಕ್ ವೇಗವಾಗಿ ಓಡಿಸಿದ ಮಗನಿಗೆ ಅಪ್ಪ ಬುದ್ಧಿ ಹೇಳುವ ಸನ್ನಿವೇಶ'],
      ['Managing domestic budget between husband and working wife', 'ಗಂಡ-ಹೆಂಡತಿ ಸಂಸಾರದ ಆದಾಯ-ವೆಚ್ಚ ಸರಿದೂಗಿಸುವಾಗ'],
      ['Supporting widowed sister with dignity and legal rights', 'ವಿಧವೆ ಸಹೋದರಿಯ ಹಕ್ಕನ್ನು ಕಾಪಾಡಿ ಗೌರವದಿಂದ ಕಾಪಾಡುವುದು']
    ]
  },
  {
    domain: 'unity',
    domain_kn: 'ಒಗ್ಗಟ್ಟು',
    count: 45,
    patterns: [
      { en: 'Village community pooling labor to repair collapsed lake bund in', kn: 'ಕೆರೆ ಕಟ್ಟೆ ಒಡೆದಾಗ ಇಡೀ ಊರೇ ಸೇರಿ ಮಣ್ಣು ಹೊರುವುದು', tag: 'collective-effort' },
      { en: 'Division within a sports team causing humiliating defeat in', kn: 'ತಂಡದಲ್ಲಿ ಭಿನ್ನಮತ ಉಂಟಾಗಿ ಸುಲಭ ಪಂದ್ಯವನ್ನು ಸೋಲುವುದು', tag: 'team-conflict' },
      { en: 'Single isolated stick breaking easily compared to a tight bundle in', kn: 'ಒಬ್ಬಂಟಿಯಾಗಿದ್ದರೆ ಸುಲಭವಾಗಿ ತುಳಿಯುವರು, ಒಗ್ಗಟ್ಟಿದ್ದರೆ ಬಲ', tag: 'strength-in-unity' },
      { en: 'Ego clash between leaders destroying an entire social cooperative for', kn: 'ನಾಯಕರ ಅಹಂಕಾರದಿಂದ ಹಾಲು ಒಕ್ಕೂಟ ಅಥವಾ ಸೊಸೈಟಿ ಹಾಳಾಗುವುದು', tag: 'leadership-ego' },
      { en: 'Standing together against an outside predatory land grabber in', kn: 'ಹೊರಗಿನ ಬಲಾಢ್ಯ ಭೂಮಾಲೀಕನ ವಿರುದ್ಧ ರೈತರೆಲ್ಲಾ ಒಟ್ಟಾಗಿ ನಿಲ್ಲುವುದು', tag: 'solidarity' }
    ],
    topics: [
      ['Cooperative dairy society collection dispute', 'ಹಾಲು ಉತ್ಪಾದಕರ ಸಹಕಾರ ಸಂಘದ ಒಗ್ಗಟ್ಟಿನ ಹೋರಾಟ'],
      ['Building village temple community hall voluntarily', 'ಊರಿನ ದೇವಸ್ಥಾನದ ಸಮುದಾಯ ಭವನವನ್ನು ಶ್ರಮದಾನದಿಂದ ಕಟ್ಟುವುದು'],
      ['Apartment residents association waste management issue', 'ಅಪಾರ್ಟ್‌ಮೆಂಟ್ ನಿವಾಸಿಗಳ ಕಸ ವಿಲೇವಾರಿ ಸಮಸ್ಯೆ'],
      ['Farmers strike demanding fair sugarcane minimum price', 'ಕಬ್ಬಿಗೆ ನ್ಯಾಯಯುತ ಬೆಲೆಗಾಗಿ ರೈತರ ಒಗ್ಗಟ್ಟಿನ ಚಳವಳಿ'],
      ['Start-up co-founders disagreeing on equity distribution', 'ಸ್ಟಾರ್ಟಪ್ ಪಾಲುದಾರರ ನಡುವೆ ಷೇರು ಹಂಚಿಕೆಯ ಕಲಹ'],
      ['Street vendors forming union against police extortion', 'ಬೀದಿಬದಿ ವ್ಯಾಪಾರಿಗಳು ಹಫ್ತಾ ವಸೂಲಿ ವಿರುದ್ಧ ಒಕ್ಕೂಟ ರಚಿಸುವುದು'],
      ['Village drama troupe rehearsing Yakshagana play', 'ಯಕ್ಷಗಾನ ಪ್ರದರ್ಶನಕ್ಕಾಗಿ ಊರ ಕಲಾವಿದರ ಸಾಮೂಹಿಕ ತಾಲೀಮು'],
      ['Disaster relief rescue operation during river floods', 'ಪ್ರವಾಹ ಬಂದಾಗ ನೆರೆ ಸಂತ್ರಸ್ತರ ರಕ್ಷಣೆಗೆ ಯುವಕರ ಪಡೆ ಧಾವಿಸುವುದು'],
      ['Neighborhood night patrol guarding against cattle thieves', 'ದನಕಳ್ಳರ ಹಾವಳಿ ತಡೆಯಲು ಊರ ಯುವಕರು ಸರದಿಯಲ್ಲಿ ಕಾವಲು ಕಾಯುವುದು']
    ]
  },
  {
    domain: 'life',
    domain_kn: 'ಜೀವನ',
    count: 65,
    patterns: [
      { en: 'Celebrating victory before the final whistle in', kn: 'ಗೆಲುವು ಖಚಿತವಾಗುವ ಮೊದಲೇ ವಿಜಯೋತ್ಸವ ಆಚರಿಸಿ ಮುಖಭಂಗ', tag: 'overconfidence' },
      { en: 'Patience required while waiting for fruit trees to mature in', kn: 'ಗಿಡ ನೆಟ್ಟ ತಕ್ಷಣ ಹಣ್ಣು ಸಿಗದು, ತಾಳ್ಮೆಯಿಂದ ಕಾಯಬೇಕು', tag: 'patience' },
      { en: 'Sudden arrogance of a beggar turned millionaire in', kn: 'ಬಡವನಿಗೆ ಒಮ್ಮೆಲೇ ಅಧಿಕಾರ ಸಿಕ್ಕಾಗ ತೋರುವ ಮೆರೆದಾಟ', tag: 'sudden-wealth' },
      { en: 'Consequences of uncontrolled anger ruining decades of goodwill in', kn: 'ಕ್ಷಣಿಕ ಕೋಪದಿಂದ ದಶಕಗಳ ವಿಶ್ವಾಸವನ್ನು ಕಳೆದುಕೊಳ್ಳುವುದು', tag: 'anger' },
      { en: 'Accepting bitter reality instead of living in stubborn delusion in', kn: 'ಕಹಿ ಸತ್ಯವನ್ನು ಒಪ್ಪಿಕೊಂಡು ಮುನ್ನಡೆಯುವ ವಾಸ್ತವ ಪ್ರಜ್ಞೆ', tag: 'acceptance' }
    ],
    topics: [
      ['Cricket batsman attempting risky glory shot on last ball', 'ಕೊನೆಯ ಎಸತದಲ್ಲಿ ಅತಿಯಾದ ಆತುರ ತೋರಿ ಔಟ್ ಆದ ಬ್ಯಾಟ್ಸ್‌ಮನ್'],
      ['Planting teakwood plantation expecting immediate annual cash', 'ತೇಗದ ಮರ ನೆಟ್ಟು ಮರುದಿನವೇ ಹಣ ಬಯಸುವ ದುಡುಕು'],
      ['Lottery winner blowing entire prize on sycophants in months', 'ಲಾಟರಿ ಗೆದ್ದವನು ಹೊಗಳುಭಟ್ಟರ ಜತೆ ಸುತ್ತಿ ದಿವಾಳಿಯಾಗುವುದು'],
      ['Slamming courtroom door in fury during family settlement', 'ಆವೇಶದಲ್ಲಿ ಒಪ್ಪಂದ ಮುರಿದು ಹೋದ ವಕೀಲನ ಕಕ್ಷಿದಾರ'],
      ['Stubborn patient refusing doctor diet warnings on diabetes', 'ಮಧುಮೇಹವಿದ್ದರೂ ಸಿಹಿ ತಿಂದು ಆಸ್ಪತ್ರೆ ಸೇರಿದ ಹಠಮಾರಿ'],
      ['Constructing house on dry riverbed thinking flood will never come', 'ಒಣಗಿದ ನದಿ ಪಾತ್ರದಲ್ಲಿ ಮನೆ ಕಟ್ಟಿ ಪ್ರವಾಹಕ್ಕೆ ಸಿಕ್ಕಿಬೀಳುವುದು'],
      ['Bragging about connections with chief minister without real merit', 'ದೊಡ್ಡವರ ಹೆಸರು ಹೇಳಿಕೊಂಡು ತಿರುಗುವ ನಿಷ್ಪ್ರಯೋಜಕ ವ್ಯಕ್ತಿ'],
      ['Ignoring minor car brake noise until disaster strikes on highway', 'ಕಾರಿನ ಬ್ರೇಕ್ ಶಬ್ದ ನಿರ್ಲಕ್ಷಿಸಿ ಹೆದ್ದಾರಿಯಲ್ಲಿ ಅಪಘಾತಕ್ಕೀಡಾಗುವುದು'],
      ['Mocking poor neighbour who later becomes successful magistrate', 'ಬಡ ನೆರೆಹೊರೆಯವನನ್ನು ಹೀಯಾಳಿಸಿ, ಆತ ಜಡ್ಜ್ ಆದಾಗ ತಲೆತಗ್ಗಿಸುವುದು'],
      ['Expecting mangoes after sowing wild thorny weeds', 'ಬೇವಿನ ಬೀಜ ಬಿತ್ತಿ ಮಾವಿನ ಹಣ್ಣನ್ನು ನಿರೀಕ್ಷಿಸುವ ಅಜ್ಞಾನ'],
      ['Greedy fisherman losing net while chasing giant fish in deep whirlpool', 'ದೊಡ್ಡ ಮೀನಿನ ಆಸೆಗೆ ಬಿದ್ದು ಬಲೆಯನ್ನೇ ಕಳೆದುಕೊಂಡ ಬೆಸ್ತ'],
      ['Judging a wise saint by his torn ascetic robe', 'ಹರಿದ ಬಟ್ಟೆ ನೋಡಿ ಸಂತರ ಜ್ಞಾನವನ್ನು ಅಳೆಯಲು ಹೋಗಿ ನಗೆಪಾಟಲಾಗುವುದು'],
      ['Regretting harsh words spoken to aging grandfather before his passing', 'ಅಜ್ಜ ತೀರಿಕೊಳ್ಳುವ ಮುನ್ನ ಆಡಿದ ಕಟುಮಾತಿಗೆ ಕೊನೆಯವರೆಗೂ ಕೊರಗುವುದು']
    ]
  },
  {
    domain: 'workplace',
    domain_kn: 'ಉದ್ಯೋಗ ಮತ್ತು ಕಾಯಕ',
    count: 45,
    patterns: [
      { en: 'Junior colleague doing all hard work while manager claims awards for', kn: 'ಕೆಳಗಿನವರು ಬೆವರು ಸುರಿಸಿ ದುಡಿದರೆ ಮೇಲಧಿಕಾರಿ ಪ್ರಶಸ್ತಿ ಪಡೆಯುವುದು', tag: 'credit-stealing' },
      { en: 'Cutting quality corners to meet software launch deadline in', kn: 'ಗುಣಮಟ್ಟ ಕಡೆಗಣಿಸಿ ಧಾವಂತದಲ್ಲಿ ಕೆಲಸ ಮುಗಿಸಿ ಎಡವುವುದು', tag: 'cutting-corners' },
      { en: 'Treating daily manual labor with religious devotion and dignity in', kn: 'ಮಾಡುವ ಕೆಲಸವನ್ನು ದೇವರೆಂದು ಭಾವಿಸಿ ಗೌರವದಿಂದ ದುಡಿಯುವುದು', tag: 'work-is-worship' },
      { en: 'Jealous co-worker creating false complaints against honest employee in', kn: 'ಪ್ರಾಮಾಣಿಕ ನೌಕರನ ಏಳಿಗೆ ಸಹಿಸದೆ ಇಲ್ಲಸಲ್ಲದ ದೂರು ನೀಡುವುದು', tag: 'office-politics' },
      { en: 'Quitting established career impulsively without a backup plan in', kn: 'ಪರ್ಯಾಯ ದಾರಿಯಿಲ್ಲದೆ ಆತುರದಲ್ಲಿ ಒಳ್ಳೆಯ ಕೆಲಸಕ್ಕೆ ರಾಜೀನಾಮೆ ಕೊಡುವುದು', tag: 'impulsive-exit' }
    ],
    topics: [
      ['Software development team midnight bug release', 'ತಂತ್ರಾಂಶ ಅಭಿವೃದ್ಧಿ ತಂಡದ ಮಧ್ಯರಾತ್ರಿಯ ಬಿಕ್ಕಟ್ಟು'],
      ['Construction contractor using adulterated cement in bridge', 'ಸೇತುವೆ ಕಾಮಗಾರಿಯಲ್ಲಿ ಕಲಬೆರಕೆ ಸಿಮೆಂಟ್ ಬಳಸಿ ಆದ ಅನಾಹುತ'],
      ['Sculptor carving stone temple idol with single-minded focus', 'ಶಿಲ್ಪಿ ಕಲ್ಲಿನಲ್ಲಿ ಮೂರ್ತಿ ಕೆತ್ತುವಾಗ ತೋರುವ ತಲ್ಲೀನತೆ'],
      ['Sales executive stealing client database to start rival agency', 'ಗ್ರಾಹಕರ ಡೇಟಾ ಕದ್ದು ಪ್ರತಿಸ್ಪರ್ಧಿ ಸಂಸ್ಥೆ ಶುರು ಮಾಡಿದ ನೌಕರ'],
      ['Government clerk refusing bribes despite systemic department pressure', 'ಇಲಾಖೆಯ ಒತ್ತಡದ ನಡುವೆಯೂ ಲಂಚ ನಿರಾಕರಿಸಿದ ಪ್ರಾಮಾಣಿಕ ಗುಮಾಸ್ತ'],
      ['Factory worker following safety helmets and preventing fatal blast', 'ಸುರಕ್ಷತಾ ನಿಯಮ ಪಾಲಿಸಿ ಕಾರ್ಖಾನೆಯ ದೊಡ್ಡ ದುರಂತ ತಪ್ಪಿಸಿದ ಕಾರ್ಮಿಕ'],
      ['Young trainee demanding executive promotion in first three months', 'ಕಲಿಕೆ ಮುಗಿಯುವ ಮುನ್ನವೇ ಮ್ಯಾನೇಜರ್ ಹುದ್ದೆ ಕೇಳುವ ತರಬೇತಿದಾರ'],
      ['Chef keeping secret recipe pure despite commercial synthetic pressure', 'ರುಚಿಯ ರಹಸ್ಯ ಕಾಪಾಡಿ ಸಾಂಪ್ರದಾಯಿಕ ಅಡುಗೆ ಮಾಡುವ ಬಾಣಸಿಗ'],
      ['Tailor ruining silk saree due to rushed festive deliveries', 'ಹಬ್ಬದ ಗಡಿಬಿಡಿಯಲ್ಲಿ ದುಬಾರಿ ಸೀರೆಯನ್ನು ಹಾಳುಮಾಡಿದ ದರ್ಜಿ']
    ]
  },
  {
    domain: 'ethics',
    domain_kn: 'ನೀತಿ ಮತ್ತು ನಡತೆ',
    count: 45,
    patterns: [
      { en: 'Speaking pleasant sweet words while harboring poison in heart regarding', kn: 'ಬಾಯಲ್ಲಿ ಬೆಲ್ಲ ಹೊಟ್ಟೆಯಲ್ಲಿ ಕತ್ತರಿ ಇಟ್ಟುಕೊಂಡು ವ್ಯವಹರಿಸುವ ಕಪಟ', tag: 'hypocrisy' },
      { en: 'Returning a lost diamond ring found on public pathway during', kn: 'ದಾರಿಯಲ್ಲಿ ಸಿಕ್ಕ ವಜ್ರದ ಉಂಗುರವನ್ನು ಮಾಲೀಕರಿಗೆ ಮರಳಿಸುವ ಸತ್ಯವಂತಿಕೆ', tag: 'honesty' },
      { en: 'Biting the hand that fed and nurtured during difficult childhood in', kn: 'ಆಶ್ರಯ ಕೊಟ್ಟ ಮನೆಗೇ ಕನ್ನ ಕೊರೆವ ನೃತಘ್ನ ಬುದ್ಧಿ', tag: 'ingratitude' },
      { en: 'Repenting publicly for false accusations spread on social media about', kn: 'ಸುಳ್ಳು ಸುದ್ದಿ ಹರಡಿ ಮುಗ್ಧರ ಮಾನ ಹರಾಜು ಹಾಕಿದ ನಂತರ ಪಶ್ಚಾತ್ತಾಪ', tag: 'defamation' },
      { en: 'Helping a wounded stranger without expecting any reward during', kn: 'ಯಾವ ಪ್ರತಿಫಲವನ್ನೂ ಬಯಸದೆ ಸಂಕಷ್ಟದಲ್ಲಿದ್ದ ಅಪರಿಚಿತನಿಗೆ ನೆರವಾಗುವುದು', tag: 'altruism' }
    ],
    topics: [
      ['Finding gold pouch near temple steps during annual fair', 'ಜಾತ್ರೆಯ ದಾರಿಯಲ್ಲಿ ಸಿಕ್ಕ ಚಿನ್ನದ ಗಂಟನ್ನು ಒಪ್ಪಿಸುವುದು'],
      ['Adopted child mistreating foster parents after inheriting estate', 'ಸಾಕಿ ಸಲುಹಿದ ಪೋಷಕರನ್ನು ಆಸ್ತಿ ಸಿಕ್ಕ ಮೇಲೆ ಮನೆಯಿಂದ ಹೊರಹಾಕುವುದು'],
      ['Spreading viral gossip on WhatsApp ruining a young girl\'s wedding', 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಸುಳ್ಳು ವದಂತಿ ಹಬ್ಬಿಸಿ ಹೆಣ್ಣಿನ ಮದುವೆ ಮುರಿಯುವುದು'],
      ['Witness testifying truth in murder trial despite gangster threats', 'ರೌಡಿಗಳ ಬೆದರಿಕೆಗೆ ಜಗ್ಗದೆ ನ್ಯಾಯಾಲಯದಲ್ಲಿ ಸತ್ಯ ಹೇಳಿದ ಪ್ರತ್ಯಕ್ಷದರ್ಶಿ'],
      ['Rich merchant hoarding grain during drought to inflate retail prices', 'ಬರಗಾಲದಲ್ಲಿ ಧಾನ್ಯ ದಾಸ್ತಾನು ಮಾಡಿ ಕೃತಕ ಅಭಾವ ಸೃಷ್ಟಿಸಿದ ವ್ಯಾಪಾರಿ'],
      ['Returning extra change given mistakenly by elderly roadside vendor', 'ರಸ್ತೆಬದಿ ಹಣ್ಣು ಮಾರುವ ಅಜ್ಜ ತಪ್ಪಾಗಿ ಕೊಟ್ಟ ಹೆಚ್ಚಿನ ಚಿಲ್ಲರೆ ಮರಳಿಸುವುದು'],
      ['Stealing temple trust funds meant for free student school meals', 'ಬಡ ಮಕ್ಕಳ ಬಿಸಿಯೂಟದ ನಿಧಿಯನ್ನು ನುಂಗಿದ ಭ್ರಷ್ಟ ಟ್ರಸ್ಟಿ'],
      ['Saving drowning puppy from stormwater drain during torrential rain', 'ಮಳೆಯಲ್ಲಿ ಕೊಚ್ಚಿಹೋಗುತ್ತಿದ್ದ ನಾಯಿಮರಿಯನ್ನು ರಕ್ಷಿಸಿದ ಮಗು'],
      ['Admitting traffic mistake to police officer instead of offering bribe', 'ತಪ್ಪು ಒಪ್ಪಿಕೊಂಡು ದಂಡ ಕಟ್ಟಿ ಲಂಚ ಕೊಡಲು ನಿರಾಕರಿಸಿದ ವಾಹನ ಚಾಲಕ']
    ]
  }
];

// Generate structured situations
const allSituations = [...RAW_SITUATIONS];
let currentId = 11; // 1 to 10 already manually set

for (const seed of DOMAIN_SEEDS) {
  let domainCount = 0;
  for (const pat of seed.patterns) {
    for (const top of seed.topics) {
      if (domainCount >= seed.count) break;
      const sit = {
        id: `sit-${String(currentId).padStart(3, '0')}`,
        category: seed.domain === 'workplace' || seed.domain === 'ethics' ? 'life' : seed.domain,
        category_kn: seed.domain_kn,
        domain: seed.domain,
        title_en: `${pat.en} ${top[0]}`,
        title_kn: `${top[1]} ಸಂದರ್ಭದಲ್ಲಿ ${pat.kn}`,
        situation_en: `A scenario where an individual deals with ${top[0].toLowerCase()}, experiencing: ${pat.en.toLowerCase()}.`,
        situation_kn: `${top[1]} ಸಮಯದಲ್ಲಿ ${pat.kn}. ಈ ಸಂದರ್ಭದಲ್ಲಿ ಹಿರಿಯರ ವಿವೇಕ ಮತ್ತು ಗಾದೆ ಮಾತು ಸರಿಯಾದ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ.`,
        tags: [pat.tag, seed.domain, ...top[0].toLowerCase().split(' ').slice(0, 3)]
      };
      allSituations.push(sit);
      currentId++;
      domainCount++;
    }
  }
}

// Assign unique sequential IDs from sit-001 upwards
const finalized = allSituations.map((s, idx) => ({
  id: `sit-${String(idx + 1).padStart(3, '0')}`,
  category: s.category,
  category_kn: s.category_kn,
  title_en: s.title_en,
  title_kn: s.title_kn,
  situation_en: s.situation_en,
  situation_kn: s.situation_kn,
  tags: s.tags
}));

console.log(`Generated ${finalized.length} distinct real-life situations.`);

const outDir = 'data';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'situations_400.json'), JSON.stringify(finalized, null, 2), 'utf8');
console.log('Saved to data/situations_400.json');

// Check category distribution
const counts = {};
finalized.forEach(s => { counts[s.category] = (counts[s.category] || 0) + 1; });
console.log('Category breakdown:');
for (const [k, v] of Object.entries(counts)) {
  console.log(` - ${k}: ${v} situations`);
}
