import fs from 'fs';
import path from 'path';

// Load master dataset
const masterPath = 'data/kannada_proverbs_master.json';
const masterData = JSON.parse(fs.readFileSync(masterPath, 'utf8'));

// Curated dictionary of authentic traditional Kannada proverbs with rich cultural meanings
const DICTIONARY = {
  // === 1. Classic Folk Wisdom & Life ===
  "ಹಲ್ಲಿದ್ದವನಿಗೆ ಕಡಲೆ ಇಲ್ಲ": {
    en: "He who has teeth has no chickpeas to eat; he who has chickpeas has no teeth to chew them. (Opportunities and the physical capacity to enjoy them rarely arrive together in life).",
    kn: "ಸಾಮರ್ಥ್ಯವಿರುವಾಗ ಅವಕಾಶವಿರುವುದಿಲ್ಲ, ಅವಕಾಶ ಸಿಕ್ಕಾಗ ಅನುಭವಿಸುವ ಶಕ್ತಿಯಿರುವುದಿಲ್ಲ ಎಂಬ ಜೀವನದ ಅಸಹಾಯಕ ಸತ್ಯ.",
    sit: "When someone receives an opportunity or wealth late in life after their youthful health or energy has declined.",
    sit_kn: "ವಯಸ್ಸಾದ ಮೇಲೆ ಸೌಲಭ್ಯಗಳು ಸಿಕ್ಕಾಗ ಅಥವಾ ಹರೆಯದಲ್ಲಿ ಕೊರತೆ ಅನುಭವಿಸಿದ ಸಂದರ್ಭದಲ್ಲಿ ಹೇಳುವ ಮಾತು."
  },
  "ಭಲೆ ಜಟ್ಟಿ ಅಂದ್ರೆ": {
    en: "Praise a wrestler by shouting 'Bravo champion!' and he will fall flat on the red dirt. (Excessive flattery leads to overconfidence and sudden, humiliating failure).",
    kn: "ಅತಿಯಾದ ಹೊಗಳಿಕೆಗೆ ಮರುಳಾಗಿ ಮೈಮರೆತರೆ ಅವಮಾನ ಮತ್ತು ಸೋಲು ತಪ್ಪಿದ್ದಲ್ಲ.",
    sit: "When false praise or flattery makes someone complacent, leading to an embarrassing blunder.",
    sit_kn: "ಅತಿಯಾಗಿ ಹೊಗಳಿದಾಗ ವ್ಯಕ್ತಿ ಆತ್ಮವಿಶ್ವಾಸ ಅತಿಯಾಗಿ ತಪ್ಪೆಸಗುವ ಸನ್ನಿವೇಶ."
  },
  "ನಾಯಿ ಬೊಗಳಿದರೆ ದೇವಲೋಕ": {
    en: "If a stray dog barks at the sky, does it ruin the celestial heaven? (Petty criticism, jealousy, or malicious gossip from unworthy people cannot diminish the stature of the noble).",
    kn: "ಕೀಳು ಜನರ ಅಸೂಯೆಯ ಮಾತುಗಳಿಂದ ಸಜ್ಜನರ ಅಥವಾ ಸತ್ಯದ ಘನತೆಗೆ ಯಾವುದೇ ಕುಂದು ಬರುವುದಿಲ್ಲ.",
    sit: "When facing baseless rumors, online trolls, or petty backbiting that should simply be ignored.",
    sit_kn: "ಅಯೋಗ್ಯರು ಉತ್ತಮರನ್ನು ಹೀಯಾಳಿಸಿದಾಗ ಅದನ್ನು ಉಪೇಕ್ಷಿಸಲು ಹೇಳುವ ಗಾದೆ."
  },
  "ಕದ್ದು ತಿಂದ ಹಣ್ಣು": {
    en: "Stolen fruit and food from a neighbor's kitchen always seem far more delicious. (Forbidden things and what belongs to others always appear unnaturally appealing).",
    kn: "ತನ್ನ ಬಳಿ ಇರುವುದಕ್ಕಿಂತ ಇತರರ ವಸ್ತು ಅಥವಾ ನಿಷೇಧಿತ ವಿಷಯಗಳೇ ಹೆಚ್ಚು ಆಕರ್ಷಕವಾಗಿ ಕಾಣುವುದು ಮಾನವ ಸಹಜ ದೌರ್ಬಲ್ಯ.",
    sit: "When someone covets what others have or chases forbidden temptations while ignoring their own blessings.",
    sit_kn: "ತನ್ನ ಬಳಿ ಇರುವುದನ್ನು ಕಡೆಗಣಿಸಿ ಬೇರೆಯವರ ವಸ್ತುವಿಗೆ ಆಸೆಪಡುವ ಸಂದರ್ಭ."
  },
  "ಹಂಗಿನ ಅರಮನೆಗಿಂತಾ": {
    en: "A humble independent hut of one's own is far better than living in someone else's palace of suffocating obligation. (Self-reliance, freedom, and self-respect outweigh dependent luxury).",
    kn: "ಬೇರೆಯವರ ಹಂಗಿನಲ್ಲಿ ಶ್ರೀಮಂತಿಕೆಯಿಂದ ಬದುಕುವುದಕ್ಕಿಂತ ಸ್ವತಂತ್ರವಾಗಿ ಬಡತನದಲ್ಲಿ ಸ್ವಾಭಿಮಾನದಿಂದ ಇರುವುದೇ ಶ್ರೇಷ್ಠ.",
    sit: "Choosing dignity, financial independence, and peace of mind over dependent comfort with condescending relatives.",
    sit_kn: "ಸ್ವಾಭಿಮಾನ ಬಿಟ್ಟು ಪರಾವಲಂಬಿಯಾಗುವುದಕ್ಕಿಂತ ಕಷ್ಟದಲ್ಲೂ ಸ್ವಾವಲಂಬಿಯಾಗಿರಲು ಬಯಸುವ ಸಂದರ್ಭ."
  },
  "ತಾ ಕಳ್ಳೆ ಪರರ ನಂಬಳು": {
    en: "A thief trusts no one, and an unfaithful spouse never trusts their partner. (Guilty, dishonest minds inevitably project their own deception onto everyone around them).",
    kn: "ತಾನು ಕಪಟಿಯಾಗಿದ್ದವನು ಪ್ರಪಂಚದ ಎಲ್ಲರನ್ನೂ ಶಂಕೆಯಿಂದಲೇ ನೋಡುತ್ತಾನೆ.",
    sit: "When a deceptive or corrupt person constantly suspects others of cheating them.",
    sit_kn: "ತನ್ನಲ್ಲಿಯೇ ದೋಷವಿರುವ ವ್ಯಕ್ತಿ ಇತರರ ಪ್ರಾಮಾಣಿಕತೆಯನ್ನು ನಂಬದಿದ್ದಾಗ."
  },
  "ಅಡಿಕೆಗೆ ಹೋದ ಮಾನ": {
    en: "Honor lost for the price of a betel nut will not be restored even if an entire elephant is offered. (A hard-earned reputation destroyed by petty carelessness or small misdeeds cannot be bought back at any cost).",
    kn: "ಚಿಕ್ಕ ತಪ್ಪಿನಿಂದ ಅಥವಾ ಕ್ಷುಲ್ಲಕ ಕಾರಣಕ್ಕೆ ಕಳೆದುಹೋದ ಮಾನ-ಮರ್ಯಾದೆಗಳನ್ನು ಅಪಾರ ಸಂಪತ್ತು ನೀಡಿದರೂ ಮರಳಿ ಪಡೆಯಲಾಗದು.",
    sit: "Warning someone against taking petty bribes, telling petty lies, or compromising integrity for short-term gain.",
    sit_kn: "ಸಣ್ಣ ಆಸೆಗೆ ಬಿದ್ದು ಗೌರವ ಕಳೆದುಕೊಳ್ಳದಂತೆ ಎಚ್ಚರಿಸುವ ಸನ್ನಿವೇಶ."
  },
  "ಕಾಲಕ್ಕೆ ತಕ್ಕಂತೆ ನಡಿಯಬೇಕು": {
    en: "Walk according to the times, dance according to the musical beat. (One must adapt pragmatically and flexibly to changing circumstances and environments).",
    kn: "ಕಾಲ ಮತ್ತು ಪರಿಸ್ಥಿತಿಯ ಬದಲಾವಣೆಗೆ ತಕ್ಕಂತೆ ನಮ್ಮ ಆಚಾರ-ವಿಚಾರಗಳನ್ನು ಹೊಂದಿಸಿಕೊಂಡು ಮುನ್ನಡೆಯಬೇಕು.",
    sit: "Navigating career shifts, cultural changes, or evolving technological trends with adaptability.",
    sit_kn: "ಪರಿಸ್ಥಿತಿಗೆ ತಕ್ಕಂತೆ ಜಾಣ್ಮೆಯಿಂದ ಹೊಂದಿಕೊಂಡು ಹೋಗಬೇಕಾದ ಸಂದರ್ಭ."
  },
  "ರಾವಣನ ಹೊಟ್ಟೆಗೆ ಅರೆಕಾಸಿನ": {
    en: "A half-penny worth of buttermilk poured into Ravana's gigantic stomach. (A laughably inadequate, tiny remedy for an enormous problem; a mere drop in the ocean).",
    kn: "ಬಹಳ ದೊಡ್ಡ ಸಮಸ್ಯೆಗೆ ತೀರಾ ಅತ್ಯಲ್ಪ ಅಥವಾ ಪ್ರಯೋಜನಕ್ಕೆ ಬಾರದ ಅರೆಬರೆ ಪರಿಹಾರ ನೀಡಿದಾಗ.",
    sit: "When an offered relief or budget allocation is drastically smaller than the massive need.",
    sit_kn: "ದೊಡ್ಡ ಕೊರತೆ ಅಥವಾ ಹಸಿವಿಗೆ ಅತ್ಯಲ್ಪ ಸಹಾಯ ಒದಗಿಸಿದಾಗ."
  },
  "ಉಂಬಾಗ ಉಡುವಾಗ ಊರೆಲ್ಲ": {
    en: "When dining lavishly and dressing in fine silks, the entire town claims to be your kin; in poverty, nobody is to be seen. (Fair-weather companions flock around prosperity but vanish during hardship).",
    kn: "ಸಂಪತ್ತು ಮತ್ತು ವೈಭವ ಇರುವಾಗ ಎಲ್ಲರೂ ಆಪ್ತರಂತೆ ಬರುತ್ತಾರೆ, ಆದರೆ ಕಷ್ಟದ ಸಮಯದಲ್ಲಿ ಯಾರೂ ಹತ್ತಿರ ಸುಳಿಯುವುದಿಲ್ಲ.",
    sit: "Discovering who true friends are during financial distress or career setbacks.",
    sit_kn: "ಅಧಿಕಾರ ಅಥವಾ ಸಿರಿವಂತಿಕೆ ಇದ್ದಾಗ ಮಾತ್ರ ಜತೆಯಾಗುವ ನಕಲಿ ಮಿತ್ರರನ್ನು ಗುರುತಿಸುವಾಗ."
  },
  "ಹೊಟ್ಟೆ ತುಂಬಿದ ಮೇಲೆ ಹುಗ್ಗಿ": {
    en: "Once the belly is stuffed, even rich festive sweet pongal feels prickly as a thorn. (Excess satiety breeds ingratitude; when people have too much, they begin to disdain even the finest blessings).",
    kn: "ತೃಪ್ತಿಯಾದ ಮೇಲೆ ಅಥವಾ ಅತಿಯಾದಾಗ ಅತ್ಯಂತ ಶ್ರೇಷ್ಠ ವಸ್ತುವೂ ಕೂಡ ಬೇಡವೆನಿಸುತ್ತದೆ ಅಥವಾ ಅಸಡ್ಡೆ ಮೂಡಿಸುತ್ತದೆ.",
    sit: "When pampered individuals complain about abundant food, comfort, or gifts.",
    sit_kn: "ಅತಿಯಾದ ಸುಖ ಸಿಕ್ಕಾಗ ಅಹಂಕಾರ ಅಥವಾ ಜಿಗುಪ್ಸೆ ತೋರುವ ಸನ್ನಿವೇಶ."
  },
  "ಊರೇ ಕೊಳ್ಳೆ ಹೊಡೆದ ಮೇಲೆ": {
    en: "Locking the fortress gates tightly after the entire town has already been plundered. (Taking safety measures or precautions far too late; shutting the stable door after the horse has bolted).",
    kn: "ಎಲ್ಲವೂ ನಷ್ಟವಾಗಿ ಅನಾಹುತ ಸಂಭವಿಸಿದ ನಂತರ ಎಚ್ಚೆತ್ತುಕೊಂಡು ರಕ್ಷಣೆಯ ನಾಟಕವಾಡುವುದು.",
    sit: "Implementing security rules or taking insurance only after suffering an irreparable loss.",
    sit_kn: "ಹಾನಿಯಾದ ನಂತರ ವ್ಯರ್ಥವಾಗಿ ಮುಂಜಾಗ್ರತಾ ಕ್ರಮ ಕೈಗೊಳ್ಳುವ ಸಂದರ್ಭ."
  },
  "ಹಸಿದ ಹೊಟ್ಟೆ ತೋರಿಸಿದರೆ": {
    en: "When one showed a starving stomach pleading for bread, they were shown a sharpened sword. (Seeking sympathy or mercy from cruel, unfeeling people only invites greater exploitation and harm).",
    kn: "ಕರುಣೆ ಬಯಸಿ ಕಷ್ಟ ಹೇಳಿಕೊಂಡಾಗ ಸಾಂತ್ವನ ನೀಡುವ ಬದಲು ಮತ್ತಷ್ಟು ನೋವು ಅಥವಾ ಕ್ರೌರ್ಯ ತೋರಿಸುವ ಕಟು ಸನ್ನಿವೇಶ.",
    sit: "Vulnerable individuals being exploited or threatened by ruthless authorities when seeking help.",
    sit_kn: "ಕಷ್ಟದಲ್ಲಿರುವವರಿಗೆ ಸಹಾಯ ಮಾಡುವ ಬದಲು ಉಪದ್ರವ ಕೊಡುವವರನ್ನು ವರ್ಣಿಸುವಾಗ."
  },
  "ದೂರದ ಬೆಟ್ಟ ಕಣ್ಣಿಗೆ": {
    en: "Distant hills always appear soft, green, and smooth to the eye. (Things always look deceptively attractive, easy, and flawless from a distance; familiarity reveals the hidden ruggedness).",
    kn: "ದೂರದಿಂದ ನೋಡುವಾಗ ಎಲ್ಲವೂ ಸುಲಭ ಮತ್ತು ಆಕರ್ಷಕವಾಗಿ ಕಂಡರೂ ಹತ್ತಿರ ಹೋದಾಗಲೇ ವಾಸ್ತವದ ಕಷ್ಟಗಳು ತಿಳಿಯುವುದು.",
    sit: "Envying another person's job, foreign life, or lifestyle without seeing their daily struggles.",
    sit_kn: "ಇತರರ ಬದುಕನ್ನು ಸುಲಭವೆಂದು ಭ್ರಮಿಸಿ ಕಣ್ಣು ಕುಕ್ಕುವವರಿಗೆ ವಾಸ್ತವ ತಿಳಿಸಲು."
  },
  "ಛತ್ರದಲ್ಲಿ ಊಟ ಮಠದಲ್ಲಿ": {
    en: "Dining at the charity soup kitchen and sleeping at the religious monastery. (Living as an irresponsible freeloader completely off public charity without doing a single day of honest labor).",
    kn: "ಯಾವುದೇ ಜವಾಬ್ದಾರಿ ಅಥವಾ ದುಡಿಮೆಯಿಲ್ಲದೆ ಇತರರ ದಾನ-ಧರ್ಮಗಳ ಮೇಲೆ ಉಚಿತವಾಗಿ ಬದುಕುವ ಸೋಮಾರಿ ತನ.",
    sit: "Calling out someone capable of working who chooses to sponge off parents, friends, or welfare.",
    sit_kn: "ಸ್ವಂತ ದುಡಿಮೆಯಿಲ್ಲದೆ ಪರರ ಅನ್ನ ತಿಂದು ಕಾಲ ಕಳೆಯುವ ವ್ಯಕ್ತಿಯನ್ನು ವಿವರಿಸುವಾಗ."
  },
  "ಊಟ ಬಲ್ಲವನಿಗೆ ರೋಗವಿಲ್ಲ": {
    en: "One who knows how and what to eat suffers no illness; one who knows how and when to speak provokes no quarrel. (Dietary moderation protects the body; diplomatic, thoughtful speech preserves peace).",
    kn: "ಮಿತವಾದ ಮತ್ತು ಹಿತವಾದ ಆಹಾರ ಸೇವನೆಯಿಂದ ಆರೋಗ್ಯ ಕಾಪಾಡಿಕೊಳ್ಳಬಹುದು, ವಿವೇಕಯುತ ಮಾತುಗಳಿಂದ ವೈಮನಸ್ಸು ತಪ್ಪಿಸಬಹುದು.",
    sit: "Health advice emphasizing balanced eating, and interpersonal guidance emphasizing polite, calm communication.",
    sit_kn: "ಆರೋಗ್ಯ ಮತ್ತು ಸಾಮಾಜಿಕ ಶಾಂತಿ ಕಾಪಾಡಿಕೊಳ್ಳಲು ಸೂಕ್ತ ಮಾರ್ಗದರ್ಶನ."
  },
  "ಹನುಮಂತಾನೆ ಬಾಲ ಕಡಿತಿರುವಾಗ": {
    en: "When Hanuman's own tail is on fire, some fool asks for cooked vermicelli noodles! (Making absurd, petty, self-serving demands in the middle of a grave crisis).",
    kn: "ದೊಡ್ಡ ವಿಪತ್ತು ಅಥವಾ ತುರ್ತು ಪರಿಸ್ಥಿತಿ ಇರುವಾಗ ಕ್ಷುಲ್ಲಕ ಮತ್ತು ಸ್ವಾರ್ಥ ಬೇಡಿಕೆಗಳನ್ನು ಇಡುವುದು.",
    sit: "Asking trivial personal favors during emergency company turnarounds or serious family crises.",
    sit_kn: "ತುರ್ತು ಪರಿಸ್ಥಿತಿಯ ಗಂಭೀರತೆ ಅರಿಯದೆ ಹಾಸ್ಯಾಸ್ಪದ ಬೇಡಿಕೆ ಇಡುವಾಗ."
  },
  "ಸಂತೆ ಕಟ್ಟೋಕು ಮೊದಲೇ": {
    en: "The pickpockets gathered even before the weekly marketplace was set up. (Greedy opportunists waiting to exploit an enterprise before it has even commenced).",
    kn: "ಯಾವುದೇ ಕಾರ್ಯ ಅಥವಾ ಯೋಜನೆ ಆರಂಭವಾಗುವುದಕ್ಕಿಂತ ಮುಂಚೆಯೇ ಸ್ವಾರ್ಥಿಗಳು ಲಾಭ ಬಾಚಲು ಜಮಾಯಿಸುವುದು.",
    sit: "Scammers hovering around a newly announced government project or company budget.",
    sit_kn: "ಆರಂಭದಲ್ಲೇ ಯೋಜನೆಗಳನ್ನು ಹಾಳುಮಾಡಲು ಕಾಯುವ ಸ್ವಾರ್ಥಿಗಳನ್ನು ಕುರಿತು."
  },
  "ಹನಿಹನಿಗೂಡಿದರೆ ಹಳ್ಳ": {
    en: "Many small raindrops join to form a gushing river; many individual ears of grain accumulate to fill a massive granary. (Small, consistent savings and persistent efforts accumulate over time into immense achievement).",
    kn: "ಚಿಕ್ಕ ಚಿಕ್ಕ ಉಳಿತಾಯ ಮತ್ತು ಸತತ ಪ್ರಯತ್ನಗಳು ಕಾಲಕ್ರಮೇಣ ಮಹತ್ತರ ಫಲವನ್ನು ತಂದುಕೊಡುತ್ತವೆ.",
    sit: "Encouraging regular daily study, recurring financial savings, or small acts of persistent community service.",
    sit_kn: "ಚಿಕ್ಕ ಉಳಿತಾಯ ಅಥವಾ ಸಣ್ಣ ಪ್ರಯತ್ನದ ಮಹತ್ವವನ್ನು ತಿಳಿಸುವ ಸನ್ನಿವೇಶ."
  },
  "ಅನುಕೂಲ ಸಿಂಧು": {
    en: "Convenient virtue when abundant; renunciation only due to lack of resources. (False asceticism born not out of true devotion, but out of the sheer inability to afford indulgence).",
    kn: "ಅವಕಾಶ ಸಿಗದಿರುವಾಗ ಮಾತ್ರ ಬಲವಂತವಾಗಿ ವೈರಾಗ್ಯ ಅಥವಾ ಸದ್ಗುಣವನ್ನು ಪ್ರದರ್ಶಿಸುವುದು.",
    sit: "When someone boasts of being simple and detached only because they cannot afford luxuries.",
    sit_kn: "ಗತಿಯಿಲ್ಲದೆ ತಪಸ್ವಿಯಂತೆ ನಟಿಸುವವರ ಡೋಂಗಿತನವನ್ನು ಬಯಲು ಮಾಡಲು."
  },
  "ಆರು ಕೊಟ್ಟರೆ ಅತ್ತೆ": {
    en: "Offer six coins and he takes the mother-in-law's side; offer three coins and he turns to the daughter-in-law. (An unprincipled mediator or corrupt judge swayed purely by whoever offers the higher bribe).",
    kn: "ಯಾವುದೇ ತತ್ವ ಅಥವಾ ನ್ಯಾಯವಿಲ್ಲದೆ, ಕೇವಲ ಹಣ ಮತ್ತು ಸ್ವಾರ್ಥಕ್ಕಾಗಿ ಯಾರ ಪರವಾಗಿಯಾದರೂ ವಾದಿಸುವ ಭ್ರಷ್ಟ ಮನಸ್ಥಿತಿ.",
    sit: "Exposing biased arbitrators, corrupt officials, or mercenary advisors who have no moral compass.",
    sit_kn: "ನ್ಯಾಯ-ನೀತಿ ನೋಡದೆ ಸ್ವಾರ್ಥಕ್ಕಾಗಿ ಬಣ್ಣ ಬದಲಿಸುವ ಮಧ್ಯಸ್ಥಿಕೆದಾರರ ಬಗ್ಗೆ."
  },
  "ನೆಂಟರಿಗೆ ದೂರ; ನೀರಿಗೆ": {
    en: "Far from demanding relatives, but close to the water source. (A prudent household location avoiding family politics while securing daily essentials).",
    kn: "ಅನಗತ್ಯ ಸಂಬಂಧಿಕರ ಜಗಳದಿಂದ ದೂರವಿದ್ದು, ಜೀವನಾವಶ್ಯಕ ಸೌಲಭ್ಯಗಳಿಗೆ ಹತ್ತಿರವಾಗಿ ಶಾಂತಿಯಿಂದ ಬದುಕುವುದು.",
    sit: "Setting healthy interpersonal boundaries with intrusive relatives while securing basic needs.",
    sit_kn: "ನೆಮ್ಮದಿಯ ಬದುಕಿಗೆ ಆವಶ್ಯಕವಾದ ಪರಿಸರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿಕೊಳ್ಳುವಾಗ."
  },
  "ತಾಗದೆ ಬಾಗದು ಬಿಸಿಯಾಗದೆ": {
    en: "Metal will not bend without being struck; butter will not melt without being heated. (Progress, transformation, and character require effort, pressure, and the warmth of discipline).",
    kn: "ಶ್ರಮ ಮತ್ತು ಒತ್ತಡವಿಲ್ಲದೆ ಯಾವುದೇ ಪರಿವರ್ತನೆ ಅಥವಾ ಸಾಧನೆ ಸಾಧ್ಯವಿಲ್ಲ.",
    sit: "Coaching athletes or students on enduring grueling training to build resilience.",
    sit_kn: "ಕಠಿಣ ಪರಿಶ್ರಮ ಮತ್ತು ಶಿಕ್ಷಣವಿಲ್ಲದೆ ಪರಿವರ್ತನೆ ಸಾಧ್ಯವಿಲ್ಲವೆಂದು ತಿಳಿಸಲು."
  },
  "ಓದಿ ಓದಿ ಮರುಳಾದ": {
    en: "The scholar Koochu Bhatta read and studied endlessly until he lost all common sense. (Excessive book learning without practical experience and emotional intelligence produces impractical folly).",
    kn: "ಕೇವಲ ಪುಸ್ತಕದ ಬದನೆಕಾಯಿಯಂತೆ ಓದಿದರೂ ಲೌಕಿಕ ಜ್ಞಾನ ಮತ್ತು ವಿವೇಕವಿಲ್ಲದಿದ್ದರೆ ವಿದ್ವಾಂಸನೂ ಮೂರ್ಖನಾಗುತ್ತಾನೆ.",
    sit: "When an over-educated theorist fails miserably at simple practical real-world tasks.",
    sit_kn: "ಕೇವಲ ಸೈದ್ಧಾಂತಿಕ ಶಿಕ್ಷಣವಿದ್ದು ಪ್ರಾಯೋಗಿಕ ಅನುಭವವಿಲ್ಲದವರನ್ನು ಎಚ್ಚರಿಸಲು."
  },
  "ರೊಟ್ಟಿ ಜಾರಿ ತುಪ್ಪಕ್ಕೆ": {
    en: "Like dry bread accidentally slipping from one's fingers and falling straight into a bowl of rich ghee. (An unexpected stroke of extraordinary good fortune or a double benefit beyond expectations).",
    kn: "ಅನಿರೀಕ್ಷಿತವಾಗಿ ಅತ್ಯಂತ ಹೆಚ್ಚಿನ ಲಾಭ ಅಥವಾ ಸುವರ್ಣಾವಕಾಶ ಒದಗಿ ಬಂದ ಸಂದರ್ಭ.",
    sit: "Getting promoted while also receiving a bonus, or having an awkward meeting turn into a dream partnership.",
    sit_kn: "ಅನುಕೂಲದ ಮೇಲೆ ಮತ್ತಷ್ಟು ದೊಡ್ಡ ಅದೃಷ್ಟ ಒಲಿದು ಬಂದಾಗ."
  },
  "ಹತ್ತು ಮಂದಿ ಹುಲ್ಲು ಕಡ್ಡಿ": {
    en: "A single stalk of dry straw weighs nothing to ten people, but gathered together it becomes a crushing burden on one person's head. (Burden-sharing and teamwork make difficult tasks light, whereas burdening a single person causes breakdown).",
    kn: "ಹಲವರು ಜತೆಯಾಗಿ ಹಂಚಿಕೊಂಡರೆ ಕಷ್ಟದ ಕೆಲಸವೂ ಹಗುರವಾಗುತ್ತದೆ; ಅದೇ ಕೆಲಸ ಒಬ್ಬನೇ ಮಾಡಿದರೆ ಅಸಾಧ್ಯ ಭಾರವೆನಿಸುತ್ತದೆ.",
    sit: "Encouraging a family or project team to divide household chores or heavy office deliverables equitably.",
    sit_kn: "ಸಾಮೂಹಿಕ ಸಹಕಾರ ಮತ್ತು ಕೆಲಸದ ಸಮಾನ ಹಂಚಿಕೆಯ ಮಹತ್ವ ತಿಳಿಸುವಾಗ."
  },
  "ವಿನಯದಿಂದ ವಿಶ್ವವನ್ನು": {
    en: "Conquer the world with genuine humility; defaming others is a profound sin. (Humility earns universal respect, while slandering others poisons one's own soul).",
    kn: "ವಿನಯದಿಂದ ಜಗತ್ತಿನ ಜನರ ಮನಸ್ಸನ್ನು ಗೆಲ್ಲಬಹುದು; ಇತರರನ್ನು ನಿಂದಿಸುವುದು ಮಹಾಪಾಪ.",
    sit: "Advising leaders to practice humble servant leadership rather than arrogant coercion.",
    sit_kn: "ವಿನಮ್ರತೆಯ ಶಕ್ತಿ ಮತ್ತು ಪರನಿಂದನೆಯ ಅಪಾಯವನ್ನು ಎಚ್ಚರಿಸಲು."
  },
  "ಅಳಿಯನ ಕುರುಡು ಬೆಳಗಾದರೆ": {
    en: "The son-in-law's hidden blindness will become obvious as soon as dawn breaks. (Deceit or physical shortcomings concealed in the dark cannot remain hidden once the light of scrutiny shines).",
    kn: "ಎಷ್ಟೇ ಬಚ್ಚಿಟ್ಟರೂ ಸತ್ಯ ಮತ್ತು ದೋಷಗಳು ಕಾಲಕ್ರಮೇಣ ಎಲ್ಲರ ಎದುರು ಬಹಿರಂಗವಾಗುತ್ತವೆ.",
    sit: "When deceptive accounting or hidden defects are inevitably uncovered during audits.",
    sit_kn: "ಮೋಸ ಅಥವಾ ದೌರ್ಬಲ್ಯ ಹೆಚ್ಚು ಕಾಲ ಮುಚ್ಚಿಡಲು ಸಾಧ್ಯವಿಲ್ಲವೆಂದು ತಿಳಿಸಲು."
  },
  "ಕೂಳಿಗೆ ಕೇಡು ಭೂಮಿಗೆ": {
    en: "A waste of good grain and a useless burden upon the face of the earth. (A totally unproductive, lazy person who contributes nothing to society and merely consumes resources).",
    kn: "ಯಾವುದೇ ದುಡಿಮೆಯಿಲ್ಲದೆ ಇತರರ ಮೇಲೆ ಹೊರೆಯಾಗಿ ಬದುಕುವ ಸೋಮಾರಿ ವ್ಯಕ್ತಿಯ ವ್ಯರ್ಥ ಜೀವನವನ್ನು ಸೂಚಿಸುವ ಮಾತು.",
    sit: "A sharp reprimand for someone who refuses to study or work and squanders their youth in laziness.",
    sit_kn: "ಕೆಲಸ ಮಾಡದೆ ಜವಾಬ್ದಾರಿಯಿಂದ ನುಣುಚಿಕೊಳ್ಳುವ ಸೋಮಾರಿಗಳನ್ನು ಎಚ್ಚರಿಸಲು."
  },
  "ಬಂದ ದಾರಿಗೆ ಸುಂಕವಿಲ್ಲ": {
    en: "There is no toll tax levied on the road by which you came. (A sharp, blunt dismissal telling an unwelcome intruder to turn back immediately without achieving their selfish objective).",
    kn: "ನಿಮ್ಮಿಂದ ಯಾವುದೇ ಪ್ರಯೋಜನವಿಲ್ಲ ಅಥವಾ ನಿಮ್ಮ ಬೇಡಿಕೆ ಈಡೇರುವುದಿಲ್ಲ, ತಕ್ಷಣ ಬಂದ ದಾರಿಯಲ್ಲೇ ಹಿಂತಿರುಗಿ ಎಂದು ಹೇಳುವುದು.",
    sit: "Dismissing an unwanted scammer, corrupt solicitor, or meddlesome instigator politely but firmly.",
    sit_kn: "ಅನಪೇಕ್ಷಿತ ವ್ಯಕ್ತಿಯನ್ನು ಮರ್ಯಾದೆಯಿಂದ ತೊಲಗಿಸಲು ಹೇಳುವ ನಾಣ್ಣುಡಿ."
  },
  "ಮಾತು ಮನೆ ಮುರಿತು": {
    en: "Indiscreet words break apart an entire home, just as a small crack ruins a clay cooking hearth. (Careless speech, gossip, and harsh words destroy sacred family bonds and harmonious relationships).",
    kn: "ಅವಿವೇಕದ ಮಾತು ಮತ್ತು ಚಾಡಿಗಳು ನೆಮ್ಮದಿಯ ಸಂಸಾರವನ್ನೇ ಒಡೆದುಹಾಕುತ್ತವೆ.",
    sit: "Advising family members to guard their tongue and avoid carrying malicious gossip between relatives.",
    sit_kn: "ಮಾತಿನ ನಿಯಂತ್ರಣ ತಪ್ಪಿ ಕುಟುಂಬದಲ್ಲಿ ಕಲಹ ಉಂಟಾದಾಗ ಬುದ್ಧಿ ಹೇಳಲು."
  },
  "ಮಾತು ಬೆಳ್ಳಿ, ಮೌನ": {
    en: "Speech is silver, silence is golden. (Thoughtful restraint and silence are far more precious than endless chatter).",
    kn: "ಮಾತನಾಡುವುದಕ್ಕಿಂತ ಮೌನವಾಗಿರುವುದು ಅನೇಕ ವೇಳೆ ಹೆಚ್ಚು ವಿವೇಕಯುತ ಮತ್ತು ಶ್ರೇಷ್ಠ.",
    sit: "Remaining silent during emotional arguments to avoid escalating conflict.",
    sit_kn: "ಅನಗತ್ಯ ಮಾತುಗಳನ್ನು ಬಿಟ್ಟು ಮೌನದ ಮಹತ್ವ ತಿಳಿಯಲು."
  },
  "ಬೆರಳು ತೋರಿಸಿದರೆ ಹಸ್ತ": {
    en: "Show a finger, and they swallow your entire hand. (Give an inch and they take a mile; opportunistic exploitation of kindness).",
    kn: "ಸ್ವಲ್ಪ ಸಹಾಯ ಅಥವಾ ಸಲುಗೆ ನೀಡಿದರೆ ಅದನ್ನೇ ದುರುಪಯೋಗಪಡಿಸಿಕೊಂಡು ಇಡೀ ಹಕ್ಕನ್ನೇ ಕಬಳಿಸುವುದು.",
    sit: "Setting firm boundaries against greedy acquaintances who abuse gentle generosity.",
    sit_kn: "ಔದಾರ್ಯವನ್ನು ದುರುಪಯೋಗಪಡಿಸಿಕೊಳ್ಳುವ ಸ್ವಾರ್ಥಿಗಳನ್ನು ಎಚ್ಚರಿಸಲು."
  },
  "ಸಾಯೋ ಮುಂದೆ ಸಕ್ಕರೆ": {
    en: "Feeding sugar and ghee to someone on their deathbed. (Useless comforts or flatteries offered when it is far too late to matter).",
    kn: "ಅವಕಾಶ ಅಥವಾ ಸಮಯ ಮಿಂಚಿ ಹೋದ ಮೇಲೆ ನೀಡುವ ಸಹಾಯ ಅಥವಾ ಪ್ರೀತಿ ವ್ಯರ್ಥ.",
    sit: "Rushing to praise someone or offer resources after the critical venture has already failed.",
    sit_kn: "ಸಮಯ ಮೀರಿದ ಮೇಲೆ ತೋರುವ ಕಾಳಜಿಯ ನಿಷ್ಪ್ರಯೋಜಕತೆ."
  },
  "ಖೀರು ಕುಡಿದವ ಓಡಿಹೋದ": {
    en: "The one who drank the rich pudding ran away, while the one who drank plain water was caught and blamed. (The real culprit escapes scot-free, while the innocent bystander takes the blame).",
    kn: "ಲಾಭ ಪಡೆದ ಅಸಲಿ ಅಪರಾಧಿ ಪಾರಾಗುವುದು, ಮುಗ್ಧ ವ್ಯಕ್ತಿ ಸಿಕ್ಕಿಬಿದ್ದು ಶಿಕ್ಷೆ ಅನುಭವಿಸುವುದು.",
    sit: "When whistleblowers or junior clerks get blamed for corporate scams executed by bosses.",
    sit_kn: "ಅನ್ಯಾಯವಾಗಿ ಮುಗ್ಧರಿಗೆ ಶಿಕ್ಷೆಯಾಗುವ ವಿಪರ್ಯಾಸ ಸನ್ನಿವೇಶ."
  },
  "ಆಕಳು ದಾನಕ್ಕೆ ಕೊಟ್ರೆ": {
    en: "When a cow was gifted in charity, they inspected its teeth to complain about its age. (Looking a gift horse in the mouth; ungrateful nitpicking over free generosity).",
    kn: "ಉಚಿತವಾಗಿ ದೊರೆತ ಸಹಾಯ ಅಥವಾ ಉಡುಗೊರೆಯಲ್ಲಿ ಲೋಪದೋಷಗಳನ್ನು ಹುಡುಕುವ ಕೃತಘ್ನ ಮನಸ್ಥಿತಿ.",
    sit: "When someone receiving free financial aid or pro-bono help complains about the packaging.",
    sit_kn: "ದಾನವಾಗಿ ಸಿಕ್ಕ ವಸ್ತುವಿನಲ್ಲಿ ತಪ್ಪು ಹುಡುಕುವವರನ್ನು ತಿದ್ದಲು."
  },
  "ಕೆಲಸವಿಲ್ಲದ ಬಡಗಿ ಮಗುವಿನ": {
    en: "An idle carpenter with no work began carving the bottom of an innocent baby. (Mischief, disruption, and unnecessary conflict caused by idle, bored minds).",
    kn: "ಯಾವುದೇ ಸಾರ್ಥಕ ಕೆಲಸವಿಲ್ಲದ ಸೋಮಾರಿಗಳು ಅನಗತ್ಯ ತಂಟೆ ಅಥವಾ ಹಾನಿಯನ್ನು ಉಂಟುಮಾಡುವುದು.",
    sit: "Warning against allowing bored staff or relatives to interfere in smoothly running operations.",
    sit_kn: "ಸೋಮಾರಿತನದಿಂದ ವಿಧ್ವಂಸಕ ಕೃತ್ಯಗಳಲ್ಲಿ ತೊಡಗುವವರ ಬಗ್ಗೆ."
  },
  "ದುಷ್ಟರ ಕಂಡರೆ ದೂರ": {
    en: "When you see evil or malicious people, keep a safe distance. (Avoid conflict and entanglement with toxic, wicked individuals).",
    kn: "ಕೆಟ್ಟ ನಡತೆಯುಳ್ಳ ಮತ್ತು ದುಷ್ಟ ಜನರಿಂದ ಸದಾ ದೂರವಿರುವುದೇ ಸುರಕ್ಷಿತ.",
    sit: "Declining to enter into business deals or social entanglements with known fraudsters.",
    sit_kn: "ದುರ್ಜನರ ಸಹವಾಸದಿಂದ ದೂರವಿರಲು ಎಚ್ಚರಿಸುವ ಸನ್ನಿವೇಶ."
  },
  "ಚೇಳಿಗೆ ಪಾರುಪತ್ಯ ಕೊಟ್ಟ": {
    en: "Handing over the administrative rulership of a village to a venomous scorpion. (Entrusting authority and power to a fundamentally malicious, harmful person).",
    kn: "ಕ್ರೂರಿ ಅಥವಾ ಸ್ವಭಾವತಃ ಹಿಂಸಕನಾದ ವ್ಯಕ್ತಿಗೆ ಅಧಿಕಾರ ನೀಡಿದರೆ ಜನರಿಗೆ ಕೇಡು ತಪ್ಪಿದ್ದಲ್ಲ.",
    sit: "Appointing a toxic, petty tyrant to head a human resources department.",
    sit_kn: "ಅಯೋಗ್ಯ ಮತ್ತು ಕ್ರೂರಿಗೆ ಅಧಿಕಾರ ವಹಿಸುವುದರ ಅಪಾಯ ತಿಳಿಸಲು."
  },
  "ಸದಾಚಾರಣೆಯ ಉದಾಹರಣೆಯೇ": {
    en: "Leading by righteous personal example is the highest form of advice. (Actions and moral conduct speak far louder than verbal preaching).",
    kn: "ಕೇವಲ ಬಾಯಲ್ಲಿ ಉಪದೇಶ ಮಾಡುವುದಕ್ಕಿಂತ ಸನ್ನಡತೆಯ ಮೂಲಕ ಮಾದರಿಯಾಗಿ ಬದುಕುವುದು ಶ್ರೇಷ್ಠ.",
    sit: "Mentoring children and junior team members through personal integrity rather than lectures.",
    sit_kn: "ಸ್ವಂತ ಆಚರಣೆಯ ಮೂಲಕ ಜಗತ್ತಿಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುವ ಮಹತ್ವ."
  },
  "ಅರವತ್ತಕ್ಕೆ ಅರಳು ಮರಳು": {
    en: "At sixty years of age comes second childhood and forgetfulness. (The natural mental decline, innocence, and whims of old age).",
    kn: "ವೃದ್ಧಾಪ್ಯದಲ್ಲಿ ಮನುಷ್ಯನಿಗೆ ಮರೆವು ಮತ್ತು ಮಕ್ಕಳಂಥ ಮುಗ್ಧ ಹಠ ಬರುವುದು ಸಹಜ.",
    sit: "Treating aging grandparents with gentle patience and understanding their eccentricities.",
    sit_kn: "ವೃದ್ಧರ ಮಾನಸಿಕ ಬದಲಾವಣೆಗಳನ್ನು ಪ್ರೀತಿಯಿಂದ ಸಹಿಸಿಕೊಳ್ಳಲು."
  },
  "ಹೊತ್ತಿರುವಾಗಲೇ ಗೊತ್ತು ಸೇರಬೇಕು": {
    en: "Reach your destination while daylight still remains. (Accomplish your goals and secure your livelihood before youth and opportunity slip away).",
    kn: "ವಯಸ್ಸು ಮತ್ತು ಶಕ್ತಿ ಇರುವಾಗಲೇ ಜೀವನದ ಗುರಿಯನ್ನು ತಲುಪಿ ಭದ್ರತೆ ಸಾಧಿಸಿಕೊಳ್ಳಬೇಕು.",
    sit: "Financial planning and skill acquisition during one's twenties and thirties.",
    sit_kn: "ಸಮಯ ಮತ್ತು ಶಕ್ತಿ ಇರುವಾಗಲೇ ಭವಿಷ್ಯವನ್ನು ರೂಪಿಸಿಕೊಳ್ಳುವಂತೆ ಎಚ್ಚರಿಸಲು."
  },
  "ಕಾಲಿಗೆ ಬಿದ್ದು ಕಾಲುಂಗರ": {
    en: "Pretending to bow at one's feet in reverence while slyly stealing the toe ring. (Feigned humility and subservience concealing calculated theft and deception).",
    kn: "ಮೇಲ್ನೋಟಕ್ಕೆ ಭಕ್ತಿ-ಗೌರವ ತೋರುತ್ತಲೇ ಒಳಗೊಳಗೆ ನಯವಂಚಕತನದಿಂದ ದ್ರೋಹ ಬಗೆಯುವುದು.",
    sit: "Guarding against sycophantic flatterers who shower praise while stealing clients or credit.",
    sit_kn: "ವಿನಯದ ಮುಖವಾಡ ತೊಟ್ಟು ವಂಚಿಸುವವರ ಬಗ್ಗೆ ಎಚ್ಚರ ವಹಿಸಲು."
  },
  "ಅಂಗೈ ಹುಣ್ಣಿಗೆ ಕನ್ನಡಿ": {
    en: "Why does a sore on the palm of your hand need a mirror to be seen? (Self-evident truths need no complex proof or elaborate demonstration).",
    kn: "ಪ್ರತ್ಯಕ್ಷವಾಗಿ ಕಣ್ಣಿಗೆ ಕಾಣುತ್ತಿರುವ ಸತ್ಯಕ್ಕೆ ಯಾವುದೇ ಪ್ರತ್ಯೇಕ ಸಾಕ್ಷಿ ಅಥವಾ ಪುರಾವೆ ಬೇಕಿಲ್ಲ.",
    sit: "When obvious factual evidence renders prolonged academic or legal debates redundant.",
    sit_kn: "ಸ್ಪಷ್ಟವಾಗಿ ಗೋಚರಿಸುವ ಸತ್ಯವನ್ನು ಸಾಬೀತುಪಡಿಸಲು ಆಡಂಬರ ಬೇಡವೆಂದು ಹೇಳಲು."
  },
  "ನವಿಲನ್ನು ನೋಡಿ ಕೆಂಬೂತ": {
    en: "Seeing the majestic peacock dance, the crow-pheasant puffed up its rough feathers in imitation. (Shallow, awkward imitation of natural nobility and genius).",
    kn: "ಇತರರ ಸ್ವಾಭಾವಿಕ ಪ್ರತಿಭೆ ಅಥವಾ ವೈಭವವನ್ನು ನೋಡಿ ತನಗಿಲ್ಲದ ಯೋಗ್ಯತೆಯನ್ನು ಅನುಕರಿಸಿ ನಗೆಪಾಟಲಾಗುವುದು.",
    sit: "Amateur copycats trying to replicate seasoned masters without understanding the discipline.",
    sit_kn: "ಅಂಧಾನುಕರಣೆಯಿಂದ ಅಪಹಾಸ್ಯಕ್ಕೀಡಾಗುವವರನ್ನು ತಿದ್ದಲು."
  },
  "ಮಂತ್ರಕ್ಕಿಂತ ಉಗುಳೇ ಜಾಸ್ತಿ": {
    en: "More spit than actual sacred mantra. (Loud, blustering promises with zero substance or efficacy; all talk and no substance).",
    kn: "ಕೆಲಸಕ್ಕಿಂತ ಬಡಾಯಿ ಮತ್ತು ಆಡಂಬರದ ಮಾತುಗಳೇ ಹೆಚ್ಚಾಗಿರುವ ಸನ್ನಿವೇಶ.",
    sit: "Politicians or marketers who launch massive promotional campaigns with zero real results.",
    sit_kn: "ಮಾತಿನ ಆರ್ಭಟವಿದ್ದು ಕೆಲಸ ಶೂನ್ಯವಾಗಿರುವವರನ್ನು ವ್ಯಂಗ್ಯವಾಡಲು."
  },
  "ಪಾಲಿಗೆ ಬಂದದ್ದೆ ಪರಮಾನ್ನ": {
    en: "Whatever comes to one's lot is supreme nectar. (Contentment with what fate or honest effort provides; embracing one's lot in life).",
    kn: "ತಮಗೆ ದೊರೆತ ಪಾಲು ಅಥವಾ ಫಲವನ್ನು ಸಂತೋಷದಿಂದ ಸ್ವೀಕರಿಸಿ ತೃಪ್ತಿ ಪಡಬೇಕು.",
    sit: "Coping with modest beginnings with gratitude rather than bitter envy.",
    sit_kn: "ಸಿಕ್ಕಿದ್ದರಲ್ಲಿ ತೃಪ್ತಿ ಕಂಡು ನೆಮ್ಮದಿಯಿಂದ ಬದುಕುವ ಸದ್ಗುಣ."
  },
  "ಊರಿಗೆ ದೊರೆ ಆದರೂ ತಾಯಿಗೆ": {
    en: "Even if he is emperor of the realm, to his mother he is always just her son. (Unconditional maternal love sees the child beyond worldly power and pomp).",
    kn: "ಎಷ್ಟೇ ಉನ್ನತ ಪದವಿ ಅಥವಾ ಅಧಿಕಾರ ಪಡೆದರೂ ತಾಯಿಯ ಪ್ರೀತಿಗೆ ಮಗು ಸದಾ ಮಗುವೇ.",
    sit: "Reminding powerful leaders to remain humble and grounded when visiting parents.",
    sit_kn: "ಮಾತೃಪ್ರೇಮದ ಅನನ್ಯತೆ ಮತ್ತು ನಿಷ್ಕಲ್ಮಶತೆಯನ್ನು ಕೊಂಡಾಡುವಾಗ."
  },
  "ಆಸೆಗೆ ಕೊನೆಯಿಲ್ಲ": {
    en: "There is no final end to human desire. (Material greed can never be quenched by indulgence; contentment is the only true wealth).",
    kn: "ಮಾನವನ ಆಸೆಗಳಿಗೆ ಯಾವುದೇ ಮಿತಿ ಇರುವುದಿಲ್ಲ, ಒಂದರ ನಂತರ ಮತ್ತೊಂದು ಹುಟ್ಟುತ್ತಲೇ ಇರುತ್ತದೆ.",
    sit: "Reflecting on why billionaire lifestyle creep fails to deliver lasting happiness.",
    sit_kn: "ದುರಾಸೆಯ ಅಂತ್ಯವಿಲ್ಲದ ಚಕ್ರವನ್ನು ನಿಯಂತ್ರಿಸಲು ಬುದ್ಧಿ ಹೇಳುವಾಗ."
  },
  "ಹಿತ್ತಿಲ ಗಿಡ ಮದ್ದಲ್ಲ": {
    en: "The healing medicinal plant in one's own backyard is never valued as medicine. (Familiarity breeds neglect; we fail to appreciate the immense worth of what is readily available to us).",
    kn: "ತನ್ನ ಮನೆಯಲ್ಲೇ ಇರುವ ಶ್ರೇಷ್ಠ ವಸ್ತು ಅಥವಾ ಪ್ರತಿಭೆಯನ್ನು ಕಡೆಗಣಿಸಿ ದೂರದವರನ್ನು ಬೆಂಬಲಿಸುವುದು.",
    sit: "Neglecting local home-grown talent or traditional family remedies in favor of hyped foreign alternatives.",
    sit_kn: "ತನ್ನ ಬಳಿ ಇರುವ ಅಮೂಲ್ಯ ಸಂಪತ್ತನ್ನು ಗುರುತಿಸದ ಅಜ್ಞಾನವನ್ನು ಸೂಚಿಸಲು."
  },
  "ಕೈಗೆ ಬಂದ ತುತ್ತು ಬಾಯಿಗೆ": {
    en: "The morsel that reached the hand failed to reach the mouth. (A near-miss disappointment where success slips away at the very final moment; slip 'twixt the cup and the lip).",
    kn: "ಕೈಗೆಟುಕುವಷ್ಟು ಹತ್ತಿರ ಬಂದ ಫಲ ಅಥವಾ ಅವಕಾಶವು ಕೊನೆಯ ಕ್ಷಣದಲ್ಲಿ ಕೈತಪ್ಪಿ ಹೋಗುವುದು.",
    sit: "Losing a game in the final minute or having a closed deal fall through at signing.",
    sit_kn: "ಕೊನೆಯ ಕ್ಷಣದಲ್ಲಿ ಅವಕಾಶ ನಷ್ಟವಾದಾಗ ಉಂಟಾಗುವ ನಿರಾಶೆ."
  },
  "ಒಲ್ಲದ ಗಂಡನಿಗೆ ಮೊಸರಲ್ಲೂ": {
    en: "To a displeased, fault-finding husband, even smooth soft curds seem full of stones. (A person who dislikes you will find fault even in your most perfect deeds).",
    kn: "ಮನಸ್ಸಿಗೆ ಇಷ್ಟವಿಲ್ಲದ ವ್ಯಕ್ತಿಯು ಎಷ್ಟೇ ಒಳ್ಳೆಯ ಕೆಲಸ ಮಾಡಿದರೂ ಅದರಲ್ಲಿ ದೋಷಗಳನ್ನೇ ಹುಡುಕುವ ಪೂರ್ವಾಗ್ರಹ.",
    sit: "Dealing with a hostile boss or critic who rejects flawless work out of personal animosity.",
    sit_kn: "ದ್ವೇಷ ಅಥವಾ ಅಸಮಾಧಾನದಿಂದ ಸದ್ಗುಣದಲ್ಲೂ ತಪ್ಪು ಹುಡುಕುವವರ ಬಗ್ಗೆ."
  },
  "ಅಳಿವುದೇ ಕಾಯ ಉಳಿವುದೇ": {
    en: "The physical body perishes; only noble fame and virtue endure forever. (Flesh is mortal, but good deeds and legacy outlive generations).",
    kn: "ದೇಹವು ನಶ್ವರ, ಆದರೆ ನಾವು ಮಾಡಿದ ಒಳ್ಳೆಯ ಕಾರ್ಯಗಳು ಮತ್ತು ಗಳಿಸಿದ ಸತ್ಕೀರ್ತಿ ಸದಾ ಶಾಶ್ವತ.",
    sit: "Inspiring philanthropy and ethical courage over petty material accumulation.",
    sit_kn: "ಶಾಶ್ವತ ಕೀರ್ತಿ ಮತ್ತು ಸತ್ಕಾರ್ಯಗಳ ಮಹತ್ವವನ್ನು ನೆನಪಿಸಲು."
  },
  "ಎಣ್ಣೆ ಬಂದಾಗ ಕಣ್ಣು": {
    en: "Closing one's eyes tightly when blessed fragrant oil is offered. (Turning away or sleeping through life's golden opportunities).",
    kn: "ಒಳ್ಳೆಯ ಅವಕಾಶ ಒಲಿದು ಬಂದಾಗ ಅಜ್ಞಾನ ಅಥವಾ ಆಲಸ್ಯದಿಂದ ಅದನ್ನು ಬಳಸಿಕೊಳ್ಳದೆ ತಿರಸ್ಕರಿಸುವುದು.",
    sit: "Turning down a prestigious scholarship or mentorship out of sheer lethargy.",
    sit_kn: "ಬಂದ ಸುಯೋಗವನ್ನು ಕಳೆದುಕೊಳ್ಳುವ ಅವಿವೇಕವನ್ನು ಎಚ್ಚರಿಸಲು."
  },
  "ಬಳ್ಳಿಗೆ ಕಾಯಿ ಭಾರವೇ": {
    en: "Is the fruit ever a heavy burden to the vine that bears it? (A parent never feels their own children to be an unbearable burden).",
    kn: "ಹೆತ್ತ ತಾಯಿಗೆ ತನ್ನ ಮಕ್ಕಳನ್ನು ಸಾಕುವುದು ಎಂದಿಗೂ ಹೊರೆಯೆನಿಸುವುದಿಲ್ಲ.",
    sit: "Celebrating sacrificial parental love during hard times.",
    sit_kn: "ಮಕ್ಕಳ ರಕ್ಷಣೆಯಲ್ಲಿ ಹೆತ್ತವರ ವಾತ್ಸಲ್ಯವನ್ನು ಬಣ್ಣಿಸುವಾಗ."
  },
  "ಕೃತಿ ಇಲ್ಲದ ಮಾತು ಕಸ": {
    en: "Words without righteous action are like a weed-infested garden. (Hypocritical speech devoid of deeds produces nothing useful).",
    kn: "ಆಚರಣೆಯಿಲ್ಲದ ಬರೀ ಬಾಯಿಮಾತು ಕಸದಂತೆ ನಿಷ್ಪ್ರಯೋಜಕ.",
    sit: "Calling out politicians or intellectuals who preach reform but refuse to act.",
    sit_kn: "ಮಾತಿಗಿಂತ ಕೃತಿಯೇ ಲೇಸು ಎಂದು ಬೋಧಿಸುವ ಸನ್ನಿವೇಶ."
  },
  "ಅರಮನೆಯ ಮುಂದಿರಬೇಡ, ಕುದರೆಯ": {
    en: "Never stand directly in front of the royal palace, and never stand directly behind a horse. (Stay away from capricious rulers and unpredictable dangers).",
    kn: "ಅಧಿಕಾರಿಗಳ ಕೋಪಕ್ಕೆ ಮತ್ತು ಅನಿರೀಕ್ಷಿತ ಅಪಾಯಗಳಿಗೆ ತುತ್ತಾಗದಂತೆ ಎಚ್ಚರಿಕೆಯಿಂದ ದೂರವಿರಬೇಕು.",
    sit: "Prudent risk management advising employees not to get entangled in boardroom politics.",
    sit_kn: "ಅಧಿಕಾರಶಾಹಿ ಮತ್ತು ಅಪಾಯಕಾರಿ ಸಂದರ್ಭಗಳಿಂದ ಸುರಕ್ಷಿತ ಅಂತರ ಕಾಪಾಡಿಕೊಳ್ಳಲು."
  },
  "ನಾಳೆ ಎಂದವನಿಗೆ ಹಾಳು": {
    en: "He who says 'tomorrow' faces ruin; he who says 'today' never suffers a ruined life. (The disaster of procrastination versus the power of prompt, decisive action).",
    kn: "ಕೆಲಸವನ್ನು ಮುಂದೂಡುವವನಿಗೆ ಸೋಲು ಖಚಿತ; ಇಂದೇ ಮುಗಿಸುವವನ ಬದುಕು ಸದಾ ಉಜ್ವಲ.",
    sit: "Overcoming study or project procrastination with immediate disciplined focus.",
    sit_kn: "ಆಲಸ್ಯ ತೊರೆದು ಇಂದಿನ ಕೆಲಸವನ್ನು ಇಂದೇ ಮಾಡುವಂತೆ ಪ್ರೇರೇಪಿಸಲು."
  },
  "ಕೋಣನ ಮುಂದೆ ಕಿನ್ನರಿ": {
    en: "Playing a delicate lute before a water buffalo. (Wasting subtle art, philosophy, or cultured conversation on an uncultured, unresponsive brute).",
    kn: "ಸೌಂದರ್ಯ ಅಥವಾ ಜ್ಞಾನದ ಬೆಲೆ ತಿಳಿಯದ ಮೂರ್ಖನಿಗೆ ಅತ್ಯುನ್ನತ ಮೌಲ್ಯಗಳನ್ನು ಬೋಧಿಸುವುದು ವ್ಯರ್ಥ.",
    sit: "Attempting to explain nuanced design ethics to someone who only values cheap shortcuts.",
    sit_kn: "ರಸಹೀನ ಮತ್ತು ವಿವೇಕಹೀನರಿಗೆ ಬುದ್ಧಿವಾದ ಹೇಳಿ ವ್ಯರ್ಥ ಶ್ರಮ ಪಡುವಾಗ."
  },
  "ಕೋಳಿಕಾಲಿಗೆ ಗೆಜ್ಜೆ ಕಟ್ಟಿದರೆ": {
    en: "If you tie musical anklet bells to a chicken's legs, will it stop scratching through the garbage dump? (Inherently vulgar or base habits cannot be transformed merely by superficial ornaments).",
    kn: "ಬಾಹ್ಯವಾಗಿ ಅಲಂಕಾರ ಮಾಡಿದರೂ ಹುಟ್ಟಿನಿಂದ ಬಂದ ಕೀಳು ಗುಣ ಬದಲಾಗುವುದಿಲ್ಲ.",
    sit: "When corrupt individuals put on expensive designer clothes while continuing unethical scams.",
    sit_kn: "ಮೇಲ್ನೋಟದ ಆಡಂಬರದಿಂದ ಆಂತರಿಕ ಕೀಳುತನ ಮರೆಯಾಗದು ಎಂದು ತಿಳಿಸಲು."
  },
  "ಊರು ಹೋಗು ಅನ್ನುತ್ತೆ, ಕಾಡು": {
    en: "The town says 'go away', while the forest cemetery whispers 'come'. (The advanced infirmity of old age nearing the end of mortal life).",
    kn: "ವಯಸ್ಸಾಗಿ ಜೀವನದ ಅಂತ್ಯಕಾಲ ಸಮೀಪಿಸಿದಾಗ ಉಂಟಾಗುವ ವೈರಾಗ್ಯ ಮತ್ತು ದೈಹಿಕ ಅಸಹಾಯಕತೆ.",
    sit: "Reflecting on mortality and preparing for peace in the twilight years.",
    sit_kn: "ವೃದ್ಧಾಪ್ಯ ಮತ್ತು ಜೀವನದ ಅನಿವಾರ್ಯ ಅಂತ್ಯವನ್ನು ನೆನಪಿಸುವಾಗ."
  },
  "ಅಕ್ಕಿ ಉಂಡವ ಹಕ್ಕಿ, ಜೋಳ": {
    en: "He who eats rice is agile like a bird; he who eats sorghum millet is sturdy like a wolf. (Dietary folklore: millet builds raw physical stamina, while rice promotes lightness).",
    kn: "ಆಹಾರ ಪದ್ಧತಿಯು ವ್ಯಕ್ತಿಯ ಶಕ್ತಿ ಮತ್ತು ಸ್ವಭಾವದ ಮೇಲೆ ನೇರ ಪ್ರಭಾವ ಬೀರುತ್ತದೆ.",
    sit: "Promoting healthy traditional millet grains for athletic and physical vitality.",
    sit_kn: "ದೇಸಿ ಆಹಾರ ಧಾನ್ಯಗಳ ಪೌಷ್ಟಿಕತೆಯನ್ನು ಶ್ಲಾಘಿಸುವಾಗ."
  },
  "ಒಕ್ಕಣ್ಣನ ರಾಜ್ಯದಲ್ಲಿ ಒಂದು": {
    en: "In the kingdom of the one-eyed, walk with one eye closed. (When in Rome, do as the Romans do; adapt sensibly to the customs of the community).",
    kn: "ವಿಚಿತ್ರ ಅಥವಾ ವಿಭಿನ್ನ ಜನರ ಮಧ್ಯೆ ಇರುವಾಗ ಅವರ ಆಚಾರ-ವಿಚಾರಗಳಿಗೆ ತಕ್ಕಂತೆ ಹೊಂದಿಕೊಂಡು ಹೋಗುವುದು ಕ್ಷೇಮ.",
    sit: "Adapting to local customs when relocating to an unfamiliar foreign country.",
    sit_kn: "ಪರಿಸರಕ್ಕೆ ತಕ್ಕಂತೆ ಹೊಂದಿಕೊಳ್ಳುವ ಜಾಣ್ಮೆಯನ್ನು ಬೋಧಿಸುವಾಗ."
  },
  "ಕೀಲು ಸಣ್ಣದಾದರೂ ಗಾಲಿ": {
    en: "Even though the axle pin is tiny, it drives the massive cart wheel. (Small, seemingly insignificant elements or humble people often hold gigantic systems together).",
    kn: "ವಸ್ತು ಅಥವಾ ವ್ಯಕ್ತಿ ಚಿಕ್ಕದಾಗಿದ್ದರೂ ಅವರ ಪಾತ್ರ ಮತ್ತು ಜವಾಬ್ದಾರಿ ಅತ್ಯಂತ ಮಹತ್ವದ್ದಾಗಿರುತ್ತದೆ.",
    sit: "Recognizing the essential contributions of junior maintenance staff, nurses, and technicians.",
    sit_kn: "ಸಣ್ಣ ಸಂಗತಿಗಳ ಮಹತ್ತರ ಶಕ್ತಿಯನ್ನು ಕಡೆಗಣಿಸಬಾರದೆಂದು ಹೇಳಲು."
  },
  "ಅಹಂಕಾರಕ್ಕೆ ಉದಾಸೀನವೇ ಮದ್ದು": {
    en: "Indifference and cold neglect are the supreme medicine for arrogance. (Do not engage or argue with arrogant egomaniacs; ignoring them deflates their vanity).",
    kn: "ಗರ್ವ ತೋರುವವರನ್ನು ಎದುರಿಸಿ ವಾದಿಸುವ ಬದಲು ನಿರ್ಲಕ್ಷ್ಯ ತೋರುವುದೇ ಅವರಿಗೆ ಸರಿಯಾದ ಪಾಠ.",
    sit: "Dealing with boastful bullies by simply paying them no attention.",
    sit_kn: "ದುರಹಂಕಾರವನ್ನು ಅಡಗಿಸಲು ಉಪೇಕ್ಷೆ ಅತ್ಯುತ್ತಮ ಅಸ್ತ್ರವೆಂದು ತಿಳಿಸಲು."
  },
  "ನೂಲಿನಂತೆ ಸೀರೆ; ತಾಯಿಯಂತೆ": {
    en: "As the yarn, so the saree; as the mother, so the daughter. (Family upbringing, lineage, and character are reflected in the children).",
    kn: "ನೂಲಿನ ಗುಣಮಟ್ಟ ಸೀರೆಯಲ್ಲಿ ಕಾಣುವಂತೆ, ತಾಯಿಯ ಸಂಸ್ಕಾರ ಮಗಳಲ್ಲಿ ಪ್ರತಿಫಲಿಸುತ್ತದೆ.",
    sit: "Emphasizing maternal modeling in raising principled, confident children.",
    sit_kn: "ಸಂಸ್ಕಾರ ಮತ್ತು ತಾಯಿಯ ಪ್ರಭಾವವನ್ನು ಕೊಂಡಾಡುವಾಗ."
  },
  "ಹೆಸರಿಗೆ ಹೊನ್ನ ಹೆಗ್ಗಡೆ, ಎಸರಿಗೆ": {
    en: "His name is 'Golden Landlord', but there is not a single grain of rice for cooking in his pot! (Grand, pompous titles masking absolute poverty and emptiness).",
    kn: "ಹೆಸರಿಗೆ ಮಾತ್ರ ಶ್ರೀಮಂತಿಕೆ ಅಥವಾ ಗತ್ತು ಇದ್ದು, ವಾಸ್ತವದಲ್ಲಿ ಬಡತನ ಅಥವಾ ಶೂನ್ಯತೆ ಇರುವುದು.",
    sit: "Exposing hollow pretenders who talk about millions while drowning in unpaid utility bills.",
    sit_kn: "ಡೋಂಗಿ ಆಡಂಬರ ಮತ್ತು ಟೊಳ್ಳು ಪ್ರತಿಷ್ಠೆಯನ್ನು ಅಣಕಿಸಲು."
  },
  "ಉಂಬೋಕೆ ಉಡೋಕೆ ಅಣ್ಣಪ್ಪ": {
    en: "First in line for feasting and fine clothing as 'Annappa', but vanishes as 'No, sir' when it's time to work. (A freeloader who is eager to consume but completely absent when labor is required).",
    kn: "ಸುಖ ಅನುಭವಿಸಲು ಸದಾ ಮುಂದೆ, ಆದರೆ ಕೆಲಸ-ಕಾರ್ಯಗಳಲ್ಲಿ ಭಾಗವಹಿಸಲು ಹಿಂದೇಟು ಹಾಕುವ ಸೋಮಾರಿ ತನ.",
    sit: "Reprimanding family members or colleagues who show up only for parties but skip prep work.",
    sit_kn: "ಸ್ವಾರ್ಥಿ ಮತ್ತು ಸೋಮಾರಿಗಳ ಮನಸ್ಥಿತಿಯನ್ನು ಬಯಲು ಮಾಡಲು."
  },
  "ಹೂವಿನ ಜೊತೆ ದಾರ ಮುಡಿಯೇರಿತು": {
    en: "Along with fragrant flowers, even plain cotton thread ascends to adorn the queen's braid. (Associating with noble, virtuous company elevates even a humble person).",
    kn: "ಸಜ್ಜನರ ಮತ್ತು ಶ್ರೇಷ್ಠರ ಸಹವಾಸದಿಂದ ಸಾಮಾನ್ಯ ವ್ಯಕ್ತಿಯೂ ಉನ್ನತ ಸ್ಥಾನ ಮತ್ತು ಗೌರವ ಪಡೆಯುತ್ತಾನೆ.",
    sit: "Encouraging students to choose inspiring, disciplined friends who lift them up.",
    sit_kn: "ಸತ್ಸಂಗ ಮತ್ತು ಒಳ್ಳೆಯವರ ಸಹವಾಸದ ಮಹಿಮೆಯನ್ನು ತಿಳಿಸುವಾಗ."
  },
  "ಕೊಟ್ಟಿದ್ದು ತನಗೆ; ಬಚ್ಚಿಟ್ಟದ್ದು": {
    en: "What you give away in selfless charity becomes your true eternal wealth; what you hoard is left behind for strangers to divide. (Generosity enriches the soul, while miserly hoarding ends in losing everything).",
    kn: "ದಾನ ಮಾಡಿದ ಪುಣ್ಯ ನಮ್ಮ ಜತೆಗೆ ಬರುತ್ತದೆ; ಕೂಡಿಟ್ಟ ಸಂಪತ್ತು ನಾವು ಸತ್ತ ಮೇಲೆ ಅನ್ಯರ ಪಾಲಾಗುತ್ತದೆ.",
    sit: "Encouraging charitable giving and warning wealthy misers about the impermanence of worldly possessions.",
    sit_kn: "ಪರೋಪಕಾರ ಮತ್ತು ದಾನ ಧರ್ಮದ ಶ್ರೇಷ್ಠತೆಯನ್ನು ಬೋಧಿಸುವಾಗ."
  },
  "ಅಕ್ಕ ಸತ್ತರೆ ಅಮಾವಾಸ್ಯೆ": {
    en: "If one's elder sister dies, does the natural new moon cease to occur? (Life and natural laws halt for no personal bereavement; the world moves inexorably on).",
    kn: "ವೈಯಕ್ತಿಕ ನಷ್ಟ ಅಥವಾ ದುಃಖಕ್ಕಾಗಿ ಜಗತ್ತಿನ ನಿಯಮಗಳು ಮತ್ತು ದೈನಂದಿನ ಕಾರ್ಯಗಳು ನಿಲ್ಲುವುದಿಲ್ಲ.",
    sit: "Gathering courage to resume responsibilities after personal grief.",
    sit_kn: "ಕಾಲ ಮತ್ತು ಪ್ರಕೃತಿಯ ಅನಿವಾರ್ಯ ಮುನ್ನಡೆಯನ್ನು ಸಾರುವ ಗಾದೆ."
  },
  "ಮನಸ್ಸಿದ್ದರೆ ಮಾರ್ಗ": {
    en: "Where there is genuine willpower and sincere intention, a way forward will always be found. (Strong determination overcomes seemingly impossible obstacles).",
    kn: "ದೃಢವಾದ ಇಚ್ಛಾಶಕ್ತಿ ಮತ್ತು ಪ್ರಯತ್ನವಿದ್ದರೆ ಎಂತಹ ಕಷ್ಟಕರ ಪರಿಸ್ಥಿತಿಯಲ್ಲೂ ಪರಿಹಾರ ಕಂಡುಕೊಳ್ಳಬಹುದು.",
    sit: "Motivating someone who is feeling defeated by lack of resources or institutional hurdles.",
    sit_kn: "ಛಲ ಮತ್ತು ಇಚ್ಛಾಶಕ್ತಿಯಿಂದ ಕಷ್ಟವನ್ನು ಮೆಟ್ಟಿ ನಿಲ್ಲುವ ಸಂದರ್ಭದಲ್ಲಿ."
  },
  "ಹುಲ್ಲಿನ ಬಣವೇಲಿ ಸೂಜಿ": {
    en: "Searching for a tiny needle inside a massive haystack. (An almost impossible, futile, or infinitely tedious search without clues).",
    kn: "ಅಸಾಧ್ಯವಾದ ಅಥವಾ ಆಧಾರವಿಲ್ಲದ ಹುಡುಕಾಟದಲ್ಲಿ ಸಮಯ ವ್ಯರ್ಥ ಮಾಡುವುದು.",
    sit: "Debugging untracked software bugs without logging, or searching for lost files blindly.",
    sit_kn: "ವ್ಯರ್ಥ ಶ್ರಮದ ಅಸಾಧ್ಯ ಪ್ರಯತ್ನವನ್ನು ವರ್ಣಿಸುವಾಗ."
  },
  "ಸಾವಿರ ಉಳಿ ಪೆಟ್ಟು,ಒಂದು": {
    en: "A thousand painful chisel strikes produce one beautiful sculpted masterpiece. (Great art, mastery, and success require enduring repeated trials, critiques, and painful shaping).",
    kn: "ಕಠಿಣ ಸಂಕಷ್ಟಗಳು ಮತ್ತು ಸತತ ಪರಿಶ್ರಮವನ್ನು ಸಹಿಸಿಕೊಂಡಾಗ ಮಾತ್ರ ಜೀವನದಲ್ಲಿ ಭವ್ಯ ಸಾಧನೆ ಸಾಧ್ಯ.",
    sit: "Encouraging a young artist, athlete, or scholar undergoing rigorous, demanding training.",
    sit_kn: "ಸಂಕಷ್ಟಗಳನ್ನು ಸಹಿಸಿಕೊಂಡು ಸಾಧಕರಾಗುವ ಪ್ರಕ್ರಿಯೆಯನ್ನು ತಿಳಿಸಲು."
  },
  "ಅನ್ನ ಹಾಕಿದ ಮನೆಗೆ ಕನ್ನ": {
    en: "Never dig a burglar's tunnel into the very home that fed you bread. (Never betray, sabotage, or bite the hand that nurtured and fed you; avoid treacherous ingratitude).",
    kn: "ತಮಗೆ ಆಶ್ರಯ ನೀಡಿ ಉಪಕಾರ ಮಾಡಿದವರಿಗೆ ಎಂದಿಗೂ ದ್ರೋಹ ಅಥವಾ ಮೋಸ ಬಗೆಯಬಾರದು.",
    sit: "Condemning corporate espionage or personal betrayal against trusted mentors and benefactors.",
    sit_kn: "ಕೃತಘ್ನತೆ ಮತ್ತು ನಂಬಿಕದ್ರೋಹದ ಮಹಾಪಾಪವನ್ನು ಎಚ್ಚರಿಸಲು."
  },
  "ಹೊಳೆಯುವುದೆಲ್ಲಾ ಚಿನ್ನವಲ್ಲ": {
    en: "All that glitters is not gold. (Superficial sparkle and glamorous facades often conceal base, worthless reality).",
    kn: "ಮೇಲ್ನೋಟಕ್ಕೆ ಆಕರ್ಷಕವಾಗಿ ಹೊಳೆಯುವ ಎಲ್ಲವೂ ಶ್ರೇಷ್ಠವಾಗಿರಬೇಕಿಲ್ಲ; ಒಳಮೌಲ್ಯ ಮುಖ್ಯ.",
    sit: "Investigating flashy investment pitches or charismatic frauds before parting with money.",
    sit_kn: "ಬಾಹ್ಯ ಆಕರ್ಷಣೆಗೆ ಮರುಳಾಗದೆ ವಾಸ್ತವ ಅರಿಯುವಂತೆ ಬುದ್ಧಿ ಹೇಳಲು."
  },
  "ಕೆಟ್ಟು ಪಟ್ಟಣ ಸೇರು": {
    en: "When ruined in the village, head to the bustling city. (When circumstances collapse in a small sphere, relocate to a larger arena of diverse opportunity).",
    kn: "ಹುಟ್ಟೂರಿನಲ್ಲಿ ಆರ್ಥಿಕವಾಗಿ ನಷ್ಟವಾದಾಗ ಹೊಸ ಅವಕಾಶಗಳ ಹುಡುಕಾಟದಲ್ಲಿ ನಗರಕ್ಕೆ ಹೋಗಿ ಬದುಕು ಕಟ್ಟಿಕೊಳ್ಳುವುದು.",
    sit: "Migrating to new markets or tech hubs after experiencing local business bankruptcy.",
    sit_kn: "ಸೋಲಿನಿಂದ ಕಂಗೆಡದೆ ಹೊಸ ದಾರಿ ಹುಡುಕುವ ಧೈರ್ಯ ತುಂಬಲು."
  },
  "ಉಂಡ ಮನೆ ಜಂತೆ ಎಣಿಸಬಾರದು": {
    en: "Do not count the rafters of the house where you have just dined. (Never scrutinize or criticize the domestic flaws of a hospitable host; honor hospitality with loyalty).",
    kn: "ಊಟ ಹಾಕಿದ ಮನೆಯಲ್ಲಿಯೇ ತಪ್ಪು ಹುಡುಕುವ ಅಥವಾ ಅವರಿಗೆ ಕೇಡು ಬಯಸುವ ಕೃತಘ್ನತೆ ಸಲ್ಲದು.",
    sit: "Reminding guests to respect host privacy and refrain from gossiping about household quirks.",
    sit_kn: "ಆತಿಥ್ಯ ನೀಡಿದವರ ಬಗ್ಗೆ ಗೌರವದಿಂದಿರಲು ಬುದ್ಧಿ ಹೇಳುವಾಗ."
  },
  "ತಾಯಿನ್ನ ನೋಡಿ ಮಗಳನ್ನ ತಕ್ಕೋ": {
    en: "Look at the mother before marrying the daughter; look at the milk yield before buying the buffalo. (Evaluate familial background, character, and track record before making lifelong commitments).",
    kn: "ಮನೆತನದ ಹಿನ್ನೆಲೆ, ಸಂಸ್ಕಾರ ಮತ್ತು ತಾಯಿಯ ಗುಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಸಂಬಂಧ ಬೆಳೆಸುವುದು ಸೂಕ್ತ.",
    sit: "Vetting business partners or marriage alliances based on established family integrity.",
    sit_kn: "ಸಂಬಂಧ ಬೆಳೆಸುವಾಗ ಹಿನ್ನೆಲೆ ಮತ್ತು ಸಂಸ್ಕಾರವನ್ನು ಪರಿಶೀಲಿಸುವ ಅಗತ್ಯ ತಿಳಿಸಲು."
  },
  "ಬೆಕ್ಕಿಗೆ ಚೆಲ್ಲಾಟ ಇಲಿಗೆ": {
    en: "What is mere sport to the cat is mortal agony to the mouse. (Cruel amusement for the powerful is a matter of life and death for the vulnerable).",
    kn: "ಬಲಿಷ್ಠರಿಗೆ ತಮಾಷೆಯಾಗಿರುವ ಸಂಗತಿಯು ದುರ್ಬಲರಿಗೆ ಪ್ರಾಣಾಂತಿಕ ಸಂಕಟವಾಗಿರುತ್ತದೆ.",
    sit: "Calling out office bullying, cyber harassment, or thoughtless hazing rituals.",
    sit_kn: "ಇತರರ ನೋವನ್ನು ನೋಡಿ ಸಂತೋಷಪಡುವ ಕ್ರೂರ ಮನಸ್ಥಿತಿಯನ್ನು ಖಂಡಿಸಲು."
  },
  "ಹೇಳೋರು ಹೆಡ್ಡರಾದರೆ,ಕೇಳೋರು": {
    en: "Even if the speaker is a fool, are the listeners deaf? (Audience members must exercise common sense and critical discernment rather than blindly swallowing foolish falsehoods).",
    kn: "ಹೇಳುವವನು ಅವಿವೇಕಿಯಾಗಿದ್ದರೂ, ಕೇಳುವವರು ತಮ್ಮ ಸ್ವಂತ ಬುದ್ಧಿ ಉಪಯೋಗಿಸಿ ಸತ್ಯಾಸತ್ಯತೆ ನಿರ್ಧರಿಸಬೇಕು.",
    sit: "Encouraging voters and news consumers to think critically about sensational political claims.",
    sit_kn: "ಸುಳ್ಳು ಸುದ್ದಿಗಳನ್ನು ಕುರುಡಾಗಿ ನಂಬದೆ ವಿವೇಚನೆ ಬಳಸುವಂತೆ ಎಚ್ಚರಿಸಲು."
  },
  "ಆನೆಯಂಥದೂ ಮುಗ್ಗರಿಸ್ತದೆ": {
    en: "Even a mighty creature like an elephant stumbles. (Even the greatest experts, wealthiest individuals, and strongest leaders can make mistakes; nobody is infallible).",
    kn: "ಎಂತಹ ಮಹಾನ್ ವ್ಯಕ್ತಿ ಅಥವಾ ಬಲಿಷ್ಠನಿಗೂ ತಪ್ಪು ಅಥವಾ ಸೋಲು ಸಂಭವಿಸುವುದು ಸಹಜ.",
    sit: "Consoling a seasoned veteran who made a rare error, reminding them of human fallibility.",
    sit_kn: "ಸಾಧಕರೂ ಮುಗ್ಗರಿಸುವುದು ಸಹಜವೆಂದು ಧೈರ್ಯ ತುಂಬುವಾಗ."
  },
  "ಬೆಕ್ಕು ಕಣ್ಮುಚ್ಚಿ ಹಾಳು ಕುಡಿದರೆ": {
    en: "If a cat closes its eyes while drinking milk, does it think the whole world cannot see it? (Deceiving oneself into believing that clandestine wrongdoing remains invisible to everyone else).",
    kn: "ತಾನು ಕಣ್ಣು ಮುಚ್ಚಿಕೊಂಡರೆ ಜಗತ್ತಿಗೇನೂ ಕಾಣುವುದಿಲ್ಲವೆಂದು ಭ್ರಮಿಸಿ ಕದ್ದು ತಪ್ಪು ಮಾಡುವ ಮೂರ್ಖತನ.",
    sit: "Catching an employee or child in an obvious lie that they thought was undetectable.",
    sit_kn: "ಗುಟ್ಟಾಗಿ ತಪ್ಪು ಮಾಡಿ ಸಿಕ್ಕಿಬೀಳುವವರ ಆತ್ಮವಂಚನೆಯನ್ನು ಬಯಲು ಮಾಡಲು."
  },
  "ರಾಮೆಶ್ವರಕ್ಕೆ ಹೋದ್ರೂ ಶನೀಶ್ವರನ": {
    en: "Even after making pilgrimage all the way to sacred Rameswaram, the torment of Saturn's curse was not escaped. (You cannot run away from your internal demons or accumulated karma simply by changing geography).",
    kn: "ಸ್ಥಳ ಬದಲಾಯಿಸಿದ ಮಾತ್ರಕ್ಕೆ ಕರ್ಮಫಲ ಅಥವಾ ಆಂತರಿಕ ಸಮಸ್ಯೆಗಳಿಂದ ತಪ್ಪಿಸಿಕೊಳ್ಳಲು ಸಾಧ್ಯವಿಲ್ಲ.",
    sit: "When someone moves across cities hoping to escape personal relationship problems without changing their own behavior.",
    sit_kn: "ಸ್ಥಳಾಂತರದಿಂದ ಸ್ವಭಾವ ಅಥವಾ ಕರ್ಮ ಬದಲಾಗದು ಎಂದು ತಿಳಿಸಲು."
  },
  "ತನ್ನೂರಲಿ ರಂಗ, ಪರೂರಲಿ": {
    en: "In his home village he postures as a mighty hero 'Ranga', but in an outside town he cowers like an awkward monkey. (Local bullies who act all-powerful among meek neighbors but have zero courage in the wider world).",
    kn: "ತನ್ನವರ ಮುಂದೆ ಮಾತ್ರ ಶೌರ್ಯ ಪ್ರದರ್ಶಿಸಿ, ಹೊರಗಿನ ಸವಾಲುಗಳನ್ನು ಎದುರಿಸಲು ಧೈರ್ಯವಿಲ್ಲದ ಹೇಡಿತನ.",
    sit: "Calling out keyboard warriors and local braggarts who shrink when facing real competition.",
    sit_kn: "ತನ್ನ ಪರಿಸರದಲ್ಲಿ ಮಾತ್ರ ಗತ್ತು ತೋರುವವರ ನಕಲಿ ಪೌರುಷವನ್ನು ವ್ಯಂಗ್ಯವಾಡಲು."
  },
  "ತಾಮ್ರದ ಕಾಸು ತಾಯಿ ಮಕ್ಕಳನ್ನು": {
    en: "A petty copper coin will divide even a mother and her children. (Greed for money poisons and tears apart the most sacred, intimate family relationships).",
    kn: "ಹಣದ ವ್ಯಾಮೋಹವು ಅಂತಿಮವಾಗಿ ಅತ್ಯಂತ ಪವಿತ್ರವಾದ ರಕ್ತಸಂಬಂಧಗಳನ್ನೇ ಒಡೆದುಹಾಕುತ್ತದೆ.",
    sit: "Family estate disputes where siblings drag aging parents into bitter court battles.",
    sit_kn: "ಹಣದಾಸೆಯಿಂದ ಕುಟುಂಬ ಸಂಬಂಧಗಳು ಹಾಳಾಗುವ ಕಟು ಸತ್ಯವನ್ನು ಎಚ್ಚರಿಸಲು."
  }
};

let enriched = 0;

for (const p of masterData) {
  // Preserve gold standard records
  if (p.is_verified === true) continue;

  for (const [pattern, item] of Object.entries(DICTIONARY)) {
    if (p.kannada.includes(pattern)) {
      p.english_meaning = item.en;
      p.kannada_explanation = item.kn;
      p.kannada_meaning = item.kn;
      p.situation = item.sit;
      p.situation_kn = item.sit_kn;
      p.needs_review = true;
      p.verification_status = 'pending_review';
      enriched++;
      break;
    }
  }
}

console.log(`Directly matched and enriched ${enriched} classic proverbs.`);

// Save back to both data/kannada_proverbs_master.json and src/data/masterProverbs.json
fs.writeFileSync(masterPath, JSON.stringify(masterData, null, 2), 'utf8');
fs.writeFileSync('src/data/masterProverbs.json', JSON.stringify(masterData, null, 2), 'utf8');

console.log('Saved successfully!');
