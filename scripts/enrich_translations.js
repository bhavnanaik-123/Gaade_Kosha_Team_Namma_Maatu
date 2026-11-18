import fs from 'fs';
import path from 'path';

/**
 * Authentic Kannada Proverb Translation & Cultural Enrichment Dictionary
 * 
 * Provides authentic, culturally accurate English translations and Kannada
 * explanations for traditional Kannada proverbs, strictly avoiding literal machine
 * translation errors and preserving folk wisdom.
 */

export const TRANSLATION_MAP = {
  // 1. Classic Folk Wisdom & Life
  "ಹಲ್ಲಿದ್ದವನಿಗೆ ಕಡಲೆ ಇಲ್ಲ, ಕಡಲೆಯಿದ್ದವನಿಗೆ ಹಲ್ಲಿಲ್ಲ": {
    en: "He who has teeth has no chickpeas to eat; he who has chickpeas has no teeth to chew them. (Opportunities and the physical capacity to enjoy them rarely coincide in life).",
    kn: "ಸಾಮರ್ಥ್ಯವಿರುವಾಗ ಅವಕಾಶವಿರುವುದಿಲ್ಲ, ಅವಕಾಶ ಸಿಕ್ಕಾಗ ಅನುಭವಿಸುವ ಶಕ್ತಿಯಿರುವುದಿಲ್ಲ ಎಂಬ ಜೀವನದ ಅಸಹಾಯಕ ಸತ್ಯ.",
    situation_en: "When someone receives an opportunity or wealth late in life after their youthful health or energy has declined.",
    situation_kn: "ವಯಸ್ಸಾದ ಮೇಲೆ ಸೌಲಭ್ಯಗಳು ಸಿಕ್ಕಾಗ ಅಥವಾ ಹರೆಯದಲ್ಲಿ ಕೊರತೆ ಅನುಭವಿಸಿದ ಸಂದರ್ಭದಲ್ಲಿ ಹೇಳುವ ಮಾತು."
  },
  "ಭಲೆ ಜಟ್ಟಿ ಅಂದ್ರೆ ಕೆಮ್ಮಣ್ಣು ಮುಕ್ಕಿದ": {
    en: "Praise a wrestler by shouting 'Bravo champion!' and he will fall flat on the red dirt. (Excessive flattery leads to overconfidence and sudden, humiliating failure).",
    kn: "ಅತಿಯಾದ ಹೊಗಳಿಕೆಗೆ ಮರುಳಾಗಿ ಮೈಮರೆತರೆ ಅವಮಾನ ಮತ್ತು ಸೋಲು ತಪ್ಪಿದ್ದಲ್ಲ.",
    situation_en: "When false praise or flattery makes someone complacent, leading to an embarrassing blunder.",
    situation_kn: "ಅತಿಯಾಗಿ ಹೊಗಳಿದಾಗ ವ್ಯಕ್ತಿ ಆತ್ಮವಿಶ್ವಾಸ ಅತಿಯಾಗಿ ತಪ್ಪೆಸಗುವ ಸನ್ನಿವೇಶ."
  },
  "ನಾಯಿ ಬೊಗಳಿದರೆ ದೇವಲೋಕ ಹಾಳಾಗುತ್ಯೇ": {
    en: "If a stray dog barks at the sky, does it ruin the celestial heaven? (Petty criticism, jealousy, or malicious gossip from unworthy people cannot diminish the stature of the noble).",
    kn: "ಕೀಳು ಜನರ ಅಸೂಯೆಯ ಮಾತುಗಳಿಂದ ಸಜ್ಜನರ ಅಥವಾ ಸತ್ಯದ ಘನತೆಗೆ ಯಾವುದೇ ಕುಂದು ಬರುವುದಿಲ್ಲ.",
    situation_en: "When facing baseless rumors, online trolls, or petty backbiting that should simply be ignored.",
    situation_kn: "ಅಯೋಗ್ಯರು ಉತ್ತಮರನ್ನು ಹೀಯಾಳಿಸಿದಾಗ ಅದನ್ನು ಉಪೇಕ್ಷಿಸಲು ಹೇಳುವ ಗಾದೆ."
  },
  "ಕದ್ದು ತಿಂದ ಹಣ್ಣು, ಪಕ್ಕದ ಮನೆ ಊಟ ಎಂದೂ ಹೆಚ್ಚು ರುಚಿ": {
    en: "Stolen fruit and food from a neighbor's kitchen always seem far more delicious. (Forbidden things and what belongs to others always appear unnaturally appealing).",
    kn: "ತನ್ನ ಬಳಿ ಇರುವುದಕ್ಕಿಂತ ಇತರರ ವಸ್ತು ಅಥವಾ ನಿಷೇಧಿತ ವಿಷಯಗಳೇ ಹೆಚ್ಚು ಆಕರ್ಷಕವಾಗಿ ಕಾಣುವುದು ಮಾನವ ಸಹಜ ದೌರ್ಬಲ್ಯ.",
    situation_en: "When someone covets what others have or chases forbidden temptations while ignoring their own blessings.",
    situation_kn: "ತನ್ನ ಬಳಿ ಇರುವುದನ್ನು ಕಡೆಗಣಿಸಿ ಬೇರೆಯವರ ವಸ್ತುವಿಗೆ ಆಸೆಪಡುವ ಸಂದರ್ಭ."
  },
  "ಹಂಗಿನ ಅರಮನೆಗಿಂತಾ ಗುಡಿಸಿಲೇ ಮೇಲು": {
    en: "A humble independent hut of one's own is far better than living in someone else's palace of suffocating obligation. (Self-reliance, freedom, and self-respect outweigh dependent luxury).",
    kn: "ಬೇರೆಯವರ ಹಂಗಿನಲ್ಲಿ ಶ್ರೀಮಂತಿಕೆಯಿಂದ ಬದುಕುವುದಕ್ಕಿಂತ ಸ್ವತಂತ್ರವಾಗಿ ಬಡತನದಲ್ಲಿ ಸ್ವಾಭಿಮಾನದಿಂದ ಇರುವುದೇ ಶ್ರೇಷ್ಠ.",
    situation_en: "Choosing dignity, financial independence, and peace of mind over dependent comfort with condescending relatives or patrons.",
    situation_kn: "ಸ್ವಾಭಿಮಾನ ಬಿಟ್ಟು ಪರಾವಲಂಬಿಯಾಗುವುದಕ್ಕಿಂತ ಕಷ್ಟದಲ್ಲೂ ಸ್ವಾವಲಂಬಿಯಾಗಿರಲು ಬಯಸುವ ಸಂದರ್ಭ."
  },
  "ತಾ ಕಳ್ಳೆ ಪರರ ನಂಬಳು, ಹಾದರಗಿತ್ತಿ ಗಂಡನ ನಂಬಳು": {
    en: "A thief trusts no one, and an unfaithful spouse never trusts their partner. (Guilty, dishonest minds inevitably project their own deception onto everyone around them).",
    kn: "ತಾನು ಕಪಟಿಯಾಗಿದ್ದವನು ಪ್ರಪಂಚದ ಎಲ್ಲರನ್ನೂ ಶಂಕೆಯಿಂದಲೇ ನೋಡುತ್ತಾನೆ.",
    situation_en: "When a deceptive or corrupt person constantly suspects others of cheating them.",
    situation_kn: "ತನ್ನಲ್ಲಿಯೇ ದೋಷವಿರುವ ವ್ಯಕ್ತಿ ಇತರರ ಪ್ರಾಮಾಣಿಕತೆಯನ್ನು ನಂಬದಿದ್ದಾಗ."
  },
  "ಅಡಿಕೆಗೆ ಹೋದ ಮಾನ ಆನೆ ಕೊಟ್ಟರು ಬರಲ್ಲ": {
    en: "Honor lost for the price of a betel nut will not be restored even if an entire elephant is offered. (A hard-earned reputation destroyed by petty carelessness or small misdeeds cannot be bought back at any cost).",
    kn: "ಚಿಕ್ಕ ತಪ್ಪಿನಿಂದ ಅಥವಾ ಕ್ಷುಲ್ಲಕ ಕಾರಣಕ್ಕೆ ಕಳೆದುಹೋದ ಮಾನ-ಮರ್ಯಾದೆಗಳನ್ನು ಅಪಾರ ಸಂಪತ್ತು ನೀಡಿದರೂ ಮರಳಿ ಪಡೆಯಲಾಗದು.",
    situation_en: "Warning someone against taking petty bribes, telling petty lies, or compromising integrity for short-term gain.",
    situation_kn: "ಸಣ್ಣ ಆಸೆಗೆ ಬಿದ್ದು ಗೌರವ ಕಳೆದುಕೊಳ್ಳದಂತೆ ಎಚ್ಚರಿಸುವ ಸನ್ನಿವೇಶ."
  },
  "ಕಾಲಕ್ಕೆ ತಕ್ಕಂತೆ ನಡಿಯಬೇಕು, ತಾಳಕ್ಕೆ ತಕ್ಕಂತೆ ಕುಣಿಯಬೇಕು": {
    en: "Walk according to the times, dance according to the musical beat. (One must adapt pragmatically and flexibly to changing circumstances and environments).",
    kn: "ಕಾಲ ಮತ್ತು ಪರಿಸ್ಥಿತಿಯ ಬದಲಾವಣೆಗೆ ತಕ್ಕಂತೆ ನಮ್ಮ ಆಚಾರ-ವಿಚಾರಗಳನ್ನು ಹೊಂದಿಸಿಕೊಂಡು ಮುನ್ನಡೆಯಬೇಕು.",
    situation_en: "Navigating career shifts, cultural changes, or evolving technological trends with adaptability.",
    situation_kn: "ಪರಿಸ್ಥಿತಿಗೆ ತಕ್ಕಂತೆ ಜಾಣ್ಮೆಯಿಂದ ಹೊಂದಿಕೊಂಡು ಹೋಗಬೇಕಾದ ಸಂದರ್ಭ."
  },
  "ರಾವಣನ ಹೊಟ್ಟೆಗೆ ಅರೆಕಾಸಿನ ಮಜ್ಜಿಗೆ": {
    en: "A half-penny worth of buttermilk poured into Ravana's gigantic stomach. (A laughably inadequate, tiny remedy for an enormous problem; a mere drop in the ocean).",
    kn: "ಬಹಳ ದೊಡ್ಡ ಸಮಸ್ಯೆಗೆ ತೀರಾ ಅತ್ಯಲ್ಪ ಅಥವಾ ಪ್ರಯೋಜನಕ್ಕೆ ಬಾರದ ಅರೆಬರೆ ಪರಿಹಾರ ನೀಡಿದಾಗ.",
    situation_en: "When an offered relief or budget allocation is drastically smaller than the massive need.",
    situation_kn: "ದೊಡ್ಡ ಕೊರತೆ ಅಥವಾ ಹಸಿವಿಗೆ ಅತ್ಯಲ್ಪ ಸಹಾಯ ಒದಗಿಸಿದಾಗ."
  },
  "ಉಂಬಾಗ ಉಡುವಾಗ ಊರೆಲ್ಲ ನೆಂಟರು": {
    en: "When dining lavishly and dressing in fine silks, the entire town claims to be your kin; in poverty, nobody is to be seen. (Fair-weather companions flock around prosperity but vanish during hardship).",
    kn: "ಸಂಪತ್ತು ಮತ್ತು ವೈಭವ ಇರುವಾಗ ಎಲ್ಲರೂ ಆಪ್ತರಂತೆ ಬರುತ್ತಾರೆ, ಆದರೆ ಕಷ್ಟದ ಸಮಯದಲ್ಲಿ ಯಾರೂ ಹತ್ತಿರ ಸುಳಿಯುವುದಿಲ್ಲ.",
    situation_en: "Discovering who true friends are during financial distress or career setbacks.",
    situation_kn: "ಅಧಿಕಾರ ಅಥವಾ ಸಿರಿವಂತಿಕೆ ಇದ್ದಾಗ ಮಾತ್ರ ಜತೆಯಾಗುವ ನಕಲಿ ಮಿತ್ರರನ್ನು ಗುರುತಿಸುವಾಗ."
  },
  "ಹೊಟ್ಟೆ ತುಂಬಿದ ಮೇಲೆ ಹುಗ್ಗಿ ಮುಳ್ಳು ಮುಳ್ಳು": {
    en: "Once the belly is stuffed, even rich festive sweet pongal feels prickly as a thorn. (Excess satiety breeds ingratitude; when people have too much, they begin to disdain even the finest blessings).",
    kn: "ತೃಪ್ತಿಯಾದ ಮೇಲೆ ಅಥವಾ ಅತಿಯಾದಾಗ ಅತ್ಯಂತ ಶ್ರೇಷ್ಠ ವಸ್ತುವೂ ಕೂಡ ಬೇಡವೆನಿಸುತ್ತದೆ ಅಥವಾ ಅಸಡ್ಡೆ ಮೂಡಿಸುತ್ತದೆ.",
    situation_en: "When pampered individuals complain about abundant food, comfort, or gifts.",
    situation_kn: "ಅತಿಯಾದ ಸುಖ ಸಿಕ್ಕಾಗ ಅಹಂಕಾರ ಅಥವಾ ಜಿಗುಪ್ಸೆ ತೋರುವ ಸನ್ನಿವೇಶ."
  },
  "ಊರೇ ಕೊಳ್ಳೆ ಹೊಡೆದ ಮೇಲೆ ಕೋಟೆ ಬಾಗಿಲು ಮುಚ್ಚಿದಂತೆ": {
    en: "Locking the fortress gates tightly after the entire town has already been plundered. (Taking safety measures or precautions far too late; shutting the stable door after the horse has bolted).",
    kn: "ಎಲ್ಲವೂ ನಷ್ಟವಾಗಿ ಅನಾಹುತ ಸಂಭವಿಸಿದ ನಂತರ ಎಚ್ಚೆತ್ತುಕೊಂಡು ರಕ್ಷಣೆಯ ನಾಟಕವಾಡುವುದು.",
    situation_en: "Implementing security rules or taking insurance only after suffering an irreparable loss.",
    situation_kn: "ಹಾನಿಯಾದ ನಂತರ ವ್ಯರ್ಥವಾಗಿ ಮುಂಜಾಗ್ರತಾ ಕ್ರಮ ಕೈಗೊಳ್ಳುವ ಸಂದರ್ಭ."
  },
  "ಹಸಿದ ಹೊಟ್ಟೆ ತೋರಿಸಿದರೆ ಮಸೆದ ಕತ್ತಿ ತೋರಿಸಿದರು": {
    en: "When one showed a starving stomach pleading for bread, they were shown a sharpened sword. (Seeking sympathy or mercy from cruel, unfeeling people only invites greater exploitation and harm).",
    kn: "ಕರುಣೆ ಬಯಸಿ ಕಷ್ಟ ಹೇಳಿಕೊಂಡಾಗ ಸಾಂತ್ವನ ನೀಡುವ ಬದಲು ಮತ್ತಷ್ಟು ನೋವು ಅಥವಾ ಕ್ರೌರ್ಯ ತೋರಿಸುವ ಕಟು ಸನ್ನಿವೇಶ.",
    situation_en: "Vulnerable individuals being exploited or threatened by ruthless authorities when seeking help.",
    situation_kn: "ಕಷ್ಟದಲ್ಲಿರುವವರಿಗೆ ಸಹಾಯ ಮಾಡುವ ಬದಲು ಉಪದ್ರವ ಕೊಡುವವರನ್ನು ವರ್ಣಿಸುವಾಗ."
  },
  "ದೂರದ ಬೆಟ್ಟ ಕಣ್ಣಿಗೆ ನುಣ್ಣಗೆ": {
    en: "Distant hills always appear soft, green, and smooth to the eye. (Things always look deceptively attractive, easy, and flawless from a distance; familiarity reveals the hidden ruggedness).",
    kn: "ದೂರದಿಂದ ನೋಡುವಾಗ ಎಲ್ಲವೂ ಸುಲಭ ಮತ್ತು ಆಕರ್ಷಕವಾಗಿ ಕಂಡರೂ ಹತ್ತಿರ ಹೋದಾಗಲೇ ವಾಸ್ತವದ ಕಷ್ಟಗಳು ತಿಳಿಯುವುದು.",
    situation_en: "Envying another person's job, foreign life, or lifestyle without seeing their daily struggles.",
    situation_kn: "ಇತರರ ಬದುಕನ್ನು ಸುಲಭವೆಂದು ಭ್ರಮಿಸಿ ಕಣ್ಣು ಕುಕ್ಕುವವರಿಗೆ ವಾಸ್ತವ ತಿಳಿಸಲು."
  },
  "ಛತ್ರದಲ್ಲಿ ಊಟ ಮಠದಲ್ಲಿ ನಿದ್ರೆ": {
    en: "Dining at the charity soup kitchen and sleeping at the religious monastery. (Living as an irresponsible freeloader completely off public charity without doing a single day of honest labor).",
    kn: "ಯಾವುದೇ ಜವಾಬ್ದಾರಿ ಅಥವಾ ದುಡಿಮೆಯಿಲ್ಲದೆ ಇತರರ ದಾನ-ಧರ್ಮಗಳ ಮೇಲೆ ಉಚಿತವಾಗಿ ಬದುಕುವ ಸೋಮಾರಿ ತನ.",
    situation_en: "Calling out someone capable of working who chooses to sponge off parents, friends, or welfare.",
    situation_kn: "ಸ್ವಂತ ದುಡಿಮೆಯಿಲ್ಲದೆ ಪರರ ಅನ್ನ ತಿಂದು ಕಾಲ ಕಳೆಯುವ ವ್ಯಕ್ತಿಯನ್ನು ವಿವರಿಸುವಾಗ."
  },
  "ಊಟ ಬಲ್ಲವನಿಗೆ ರೋಗವಿಲ್ಲ, ಮಾತು ಬಲ್ಲವನಿಗೆ ಜಗಳವಿಲ್ಲ": {
    en: "One who knows how and what to eat suffers no illness; one who knows how and when to speak provokes no quarrel. (Dietary moderation protects the body; diplomatic, thoughtful speech preserves peace).",
    kn: "ಮಿತವಾದ ಮತ್ತು ಹಿತವಾದ ಆಹಾರ ಸೇವನೆಯಿಂದ ಆರೋಗ್ಯ ಕಾಪಾಡಿಕೊಳ್ಳಬಹುದು, ವಿವೇಕಯುತ ಮಾತುಗಳಿಂದ ವೈಮನಸ್ಸು ತಪ್ಪಿಸಬಹುದು.",
    situation_en: "Health advice emphasizing balanced eating, and interpersonal guidance emphasizing polite, calm communication.",
    situation_kn: "ಆರೋಗ್ಯ ಮತ್ತು ಸಾಮಾಜಿಕ ಶಾಂತಿ ಕಾಪಾಡಿಕೊಳ್ಳಲು ಸೂಕ್ತ ಮಾರ್ಗದರ್ಶನ."
  },
  "ಹನಿಹನಿಗೂಡಿದರೆ ಹಳ್ಳ; ತೆನೆತೆನೆಗೂಡಿದರೆ ಬಳ್ಳ": {
    en: "Many small raindrops join to form a gushing river; many individual ears of grain accumulate to fill a massive granary. (Small, consistent savings and persistent efforts accumulate over time into immense achievement).",
    kn: "ಚಿಕ್ಕ ಚಿಕ್ಕ ಉಳಿತಾಯ ಮತ್ತು ಸತತ ಪ್ರಯತ್ನಗಳು ಕಾಲಕ್ರಮೇಣ ಮಹತ್ತರ ಫಲವನ್ನು ತಂದುಕೊಡುತ್ತವೆ.",
    situation_en: "Encouraging regular daily study, recurring financial savings, or small acts of persistent community service.",
    situation_kn: "ಚಿಕ್ಕ ಉಳಿತಾಯ ಅಥವಾ ಸಣ್ಣ ಪ್ರಯತ್ನದ ಮಹತ್ವವನ್ನು ತಿಳಿಸುವ ಸನ್ನಿವೇಶ."
  },
  "ರೊಟ್ಟಿ ಜಾರಿ ತುಪ್ಪಕ್ಕೆ ಬಿದ್ದಂತೆ": {
    en: "Like dry bread accidentally slipping from one's fingers and falling straight into a bowl of rich ghee. (An unexpected stroke of extraordinary good fortune or a double benefit beyond expectations).",
    kn: "ಅನಿರೀಕ್ಷಿತವಾಗಿ ಅತ್ಯಂತ ಹೆಚ್ಚಿನ ಲಾಭ ಅಥವಾ ಸುವರ್ಣಾವಕಾಶ ಒದಗಿ ಬಂದ ಸಂದರ್ಭ.",
    situation_en: "Getting promoted while also receiving a bonus, or having an awkward meeting turn into a dream partnership.",
    situation_kn: "ಅನುಕೂಲದ ಮೇಲೆ ಮತ್ತಷ್ಟು ದೊಡ್ಡ ಅದೃಷ್ಟ ಒಲಿದು ಬಂದಾಗ."
  },
  "ಆರು ಕೊಟ್ಟರೆ ಅತ್ತೆ ಕಡೆ, ಮೂರು ಕೊಟ್ಟರೆ ಸೊಸೆ ಕಡೆ": {
    en: "Offer six coins and he takes the mother-in-law's side; offer three coins and he turns to the daughter-in-law. (An unprincipled mediator or corrupt judge swayed purely by whoever offers the higher bribe).",
    kn: "ಯಾವುದೇ ತತ್ವ ಅಥವಾ ನ್ಯಾಯವಿಲ್ಲದೆ, ಕೇವಲ ಹಣ ಮತ್ತು ಸ್ವಾರ್ಥಕ್ಕಾಗಿ ಯಾರ ಪರವಾಗಿಯಾದರೂ ವಾದಿಸುವ ಭ್ರಷ್ಟ ಮನಸ್ಥಿತಿ.",
    situation_en: "Exposing biased arbitrators, corrupt officials, or mercenary advisors who have no moral compass.",
    situation_kn: "ನ್ಯಾಯ-ನೀತಿ ನೋಡದೆ ಸ್ವಾರ್ಥಕ್ಕಾಗಿ ಬಣ್ಣ ಬದಲಿಸುವ ಮಧ್ಯಸ್ಥಿಕೆದಾರರ ಬಗ್ಗೆ."
  },
  "ಹತ್ತು ಮಂದಿ ಹುಲ್ಲು ಕಡ್ಡಿ ಒಬ್ಬನ ತಲೆ ಭಾರ": {
    en: "A single stalk of dry straw weighs nothing to ten people, but gathered together it becomes a crushing burden on one person's head. (Burden-sharing and teamwork make difficult tasks light, whereas burdening a single person causes breakdown).",
    kn: "ಹಲವರು ಜತೆಯಾಗಿ ಹಂಚಿಕೊಂಡರೆ ಕಷ್ಟದ ಕೆಲಸವೂ ಹಗುರವಾಗುತ್ತದೆ; ಅದೇ ಕೆಲಸ ಒಬ್ಬನೇ ಮಾಡಿದರೆ ಅಸಾಧ್ಯ ಭಾರವೆನಿಸುತ್ತದೆ.",
    situation_en: "Encouraging a family or project team to divide household chores or heavy office deliverables equitably.",
    situation_kn: "ಸಾಮೂಹಿಕ ಸಹಕಾರ ಮತ್ತು ಕೆಲಸದ ಸಮಾನ ಹಂಚಿಕೆಯ ಮಹತ್ವ ತಿಳಿಸುವಾಗ."
  },
  "ಓದಿ ಓದಿ ಮರುಳಾದ ಕೂಚು ಭಟ್ಟ": {
    en: "The scholar Koochu Bhatta read and studied endlessly until he lost all common sense. (Excessive book learning without practical experience and emotional intelligence produces impractical folly).",
    kn: "ಕೇವಲ ಪುಸ್ತಕದ ಬದನೆಕಾಯಿಯಂತೆ ಓದಿದರೂ ಲೌಕಿಕ ಜ್ಞಾನ ಮತ್ತು ವಿವೇಕವಿಲ್ಲದಿದ್ದರೆ ವಿದ್ವಾಂಸನೂ ಮೂರ್ಖನಾಗುತ್ತಾನೆ.",
    situation_en: "When an over-educated theorist fails miserably at simple practical real-world tasks.",
    situation_kn: "ಕೇವಲ ಸೈದ್ಧಾಂತಿಕ ಶಿಕ್ಷಣವಿದ್ದು ಪ್ರಾಯೋಗಿಕ ಅನುಭವವಿಲ್ಲದವರನ್ನು ಎಚ್ಚರಿಸಲು."
  },
  "ಕೂಳಿಗೆ ಕೇಡು ಭೂಮಿಗೆ ಭಾರ": {
    en: "A waste of good grain and a useless burden upon the face of the earth. (A totally unproductive, lazy person who contributes nothing to society and merely consumes resources).",
    kn: "ಯಾವುದೇ ದುಡಿಮೆಯಿಲ್ಲದೆ ಇತರರ ಮೇಲೆ ಹೊರೆಯಾಗಿ ಬದುಕುವ ಸೋಮಾರಿ ವ್ಯಕ್ತಿಯ ವ್ಯರ್ಥ ಜೀವನವನ್ನು ಸೂಚಿಸುವ ಮಾತು.",
    situation_en: "A sharp reprimand for someone who refuses to study or work and squanders their youth in laziness.",
    situation_kn: "ಕೆಲಸ ಮಾಡದೆ ಜವಾಬ್ದಾರಿಯಿಂದ ನುಣುಚಿಕೊಳ್ಳುವ ಸೋಮಾರಿಗಳನ್ನು ಎಚ್ಚರಿಸಲು."
  },
  "ಮಾತು ಮನೆ ಮುರಿತು, ತೂತು ಓಲೆ ಕೆಡಿಸಿತು": {
    en: "Indiscreet words break apart an entire home, just as a small crack ruins a clay cooking hearth. (Careless speech, gossip, and harsh words destroy sacred family bonds and harmonious relationships).",
    kn: "ಅವಿವೇಕದ ಮಾತು ಮತ್ತು ಚಾಡಿಗಳು ನೆಮ್ಮದಿಯ ಸಂಸಾರವನ್ನೇ ಒಡೆದುಹಾಕುತ್ತವೆ.",
    situation_en: "Advising family members to guard their tongue and avoid carrying malicious gossip between relatives.",
    situation_kn: "ಮಾತಿನ ನಿಯಂತ್ರಣ ತಪ್ಪಿ ಕುಟುಂಬದಲ್ಲಿ ಕಲಹ ಉಂಟಾದಾಗ ಬುದ್ಧಿ ಹೇಳಲು."
  },
  "ಬಂದ ದಾರಿಗೆ ಸುಂಕವಿಲ್ಲ": {
    en: "There is no toll tax levied on the road by which you came. (A sharp, blunt dismissal telling an unwelcome intruder to turn back immediately without achieving their selfish objective).",
    kn: "ನಿಮ್ಮಿಂದ ಯಾವುದೇ ಪ್ರಯೋಜನವಿಲ್ಲ ಅಥವಾ ನಿಮ್ಮ ಬೇಡಿಕೆ ಈಡೇರುವುದಿಲ್ಲ, ತಕ್ಷಣ ಬಂದ ದಾರಿಯಲ್ಲೇ ಹಿಂತಿರುಗಿ ಎಂದು ಹೇಳುವುದು.",
    situation_en: "Dismissing an unwanted scammer, corrupt solicitor, or meddlesome instigator politely but firmly.",
    situation_kn: "ಅನಪೇಕ್ಷಿತ ವ್ಯಕ್ತಿಯನ್ನು ಮರ್ಯಾದೆಯಿಂದ ತೊಲಗಿಸಲು ಹೇಳುವ ನಾಣ್ಣುಡಿ."
  },
  "ಅತಿ ಆಸೆ ಗತಿಕೇಡು": {
    en: "Excessive, unbridled greed leads to total ruin and destitution. (Unchecked desire blinds sound judgment and ultimately causes one to lose even what was already possessed).",
    kn: "ಅತಿಯಾದ ದುರಾಶೆಯು ಮನುಷ್ಯನ ವಿವೇಕವನ್ನು ನಾಶಮಾಡಿ ಅಂತಿಮವಾಗಿ ಸರ್ವನಾಶಕ್ಕೆ ಕಾರಣವಾಗುತ್ತದೆ.",
    situation_en: "Warning against get-rich-quick scams, speculative gambling, or hoarding stolen wealth.",
    situation_kn: "ದುರಾಶೆಯಿಂದ ಕೈಲಿದ್ದದ್ದನ್ನೂ ಕಳೆದುಕೊಳ್ಳುವ ಸಂದರ್ಭದಲ್ಲಿ."
  },
  "ಹಾಸಿಗೆ ಇದ್ದಷ್ಟು ಕಾಲು ಚಾಚು": {
    en: "Stretch your legs only as far as your mattress extends. (Live strictly within your financial means and capabilities; avoid taking on excessive debt or lavish living).",
    kn: "ನಮ್ಮ ಆದಾಯ ಮತ್ತು ಶಕ್ತಿಗೆ ತಕ್ಕಂತೆ ಮಾತ್ರ ಖರ್ಚು-ವೆಚ್ಚಗಳನ್ನು ಮಿತಿಯಲ್ಲಿ ಇಟ್ಟುಕೊಳ್ಳಬೇಕು.",
    situation_en: "Personal finance counseling advising young earners against impulsive lifestyle inflation and credit card debt.",
    situation_kn: "ಆದಾಯಕ್ಕಿಂತ ಹೆಚ್ಚು ಸಾಲ ಮಾಡಿ ಆಡಂಬರ ಮಾಡುವವರನ್ನು ತಿದ್ದಲು."
  },
  "ಕೈ ಕೆಸರಾದರೆ ಬಾಯಿ ಮೊಸರು": {
    en: "If the hands are soiled with mud in honest toil, the mouth will be fed with rich curd rice. (Hard, honest physical labor and diligent perseverance yield sweet, satisfying prosperity).",
    kn: "ಶ್ರದ್ಧೆಯಿಂದ ಕಠಿಣ ಪರಿಶ್ರಮ ಪಟ್ಟರೆ ಜೀವನದಲ್ಲಿ ಉತ್ತಮ ಫಲ ಮತ್ತು ನೆಮ್ಮದಿಯ ಊಟ ದೊರೆಯುತ್ತದೆ.",
    situation_en: "Motivating farmers, entrepreneurs, and working students who are enduring exhausting manual labor.",
    situation_kn: "ಕಾಯಕದ ಮಹತ್ವ ಮತ್ತು ಪರಿಶ್ರಮಕ್ಕೆ ಸಿಗುವ ಪ್ರತಿಫಲವನ್ನು ನೆನಪಿಸಲು."
  },
  "ಮಾಡಿದ್ದುಣ್ಣೋ ಮಹಾರಾಯ": {
    en: "Reap what you have sown, O great one. (Every individual must inevitably endure the moral consequences of their own choices and deeds; karma cannot be evaded).",
    kn: "ನಾವು ಮಾಡಿದ ಒಳ್ಳೆಯ ಅಥವಾ ಕೆಟ್ಟ ಕರ್ಮಗಳ ಫಲವನ್ನು ನಾವೇ ಅನುಭವಿಸಬೇಕಾಗುತ್ತದೆ ಎಂಬ ಕರ್ಮಸಿದ್ಧಾಂತ.",
    situation_en: "When someone faces hardship or legal trouble brought upon themselves by their past dishonesty.",
    situation_kn: "ಸ್ವಯಂಕೃತ ಅಪರಾಧಕ್ಕೆ ಶಿಕ್ಷೆ ಅಥವಾ ಫಲ ಅನುಭವಿಸುವಾಗ."
  },
  "ತುಂಬಿದ ಕೊಡ ತುಳುಕುವುದಿಲ್ಲ": {
    en: "A pot full to the brim does not slosh or spill. (A person of genuine depth, profound wisdom, and real substance remains calm, quiet, and modest, unlike shallow show-offs).",
    kn: "ನಿಜವಾದ ಜ್ಞಾನ ಮತ್ತು ಸದ್ಗುಣಗಳಿರುವ ವ್ಯಕ್ತಿಯು ಗರ್ವವಿಲ್ಲದೆ ಸದಾ ವಿನಮ್ರನಾಗಿರುತ್ತಾನೆ.",
    situation_en: "Appreciating quiet, humble experts who perform masterfully without boasting or seeking loud attention.",
    situation_kn: "ವಿದ್ವತ್ತು ಮತ್ತು ಗಾಂಭೀರ್ಯವುಳ್ಳ ಸಜ್ಜನರ ನಡತೆಯನ್ನು ಶ್ಲಾಘಿಸಲು."
  },
  "ಗಿಡವಾಗಿ ಬಗ್ಗದ್ದು ಮರವಾಗಿ ಬಗ್ಗೀತೇ": {
    en: "What will not bend when it is a tender sapling, will it bend when it becomes a rigid, massive tree? (Discipline, moral values, and habits must be cultivated in early childhood; adult stubbornness cannot be reshaped).",
    kn: "ಬಾಲ್ಯದಲ್ಲೇ ಸರಿಯಾದ ಸಂಸ್ಕಾರ ಮತ್ತು ಶಿಸ್ತು ಕಲಿಸದಿದ್ದರೆ, ವಯಸ್ಸಾದ ಮೇಲೆ ಅವರ ನಡವಳಿಕೆಯನ್ನು ಬದಲಾಯಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.",
    situation_en: "Parenting and teaching advice urging early moral education before rebellious habits harden.",
    situation_kn: "ಮಕ್ಕಳಿಗೆ ಬಾಲ್ಯದಲ್ಲೇ ಒಳ್ಳೆಯ ಗುಣಗಳನ್ನು ಕಲಿಸುವ ಅಗತ್ಯವನ್ನು ತಿಳಿಸಲು."
  },
  "ಬೆಳೆಯುವ ಸಿರಿ ಮೊಳಕೆಯಲ್ಲೇ ತಿಳಿಯುವುದು": {
    en: "The prosperity and vitality of a growing plant are visible in its very first sprout. (Future promise, genius, character, and leadership potential reveal themselves in early signs).",
    kn: "ಒಬ್ಬ ವ್ಯಕ್ತಿಯ ಭವಿಷ್ಯದ ಸಾಧನೆ ಅಥವಾ ಯೋಗ್ಯತೆಯು ಆತನ ಬಾಲ್ಯದ ಅಥವಾ ಆರಂಭದ ಲಕ್ಷಣಗಳಲ್ಲೇ ಗೋಚರಿಸುತ್ತದೆ.",
    situation_en: "Identifying a gifted child's early curiosity, or an entrepreneur's disciplined start.",
    situation_kn: "ಆರಂಭಿಕ ಹಂತದಲ್ಲೇ ವ್ಯಕ್ತಿಯ ಪ್ರತಿಭೆ ಮತ್ತು ಭವಿಷ್ಯದ ಯಶಸ್ಸನ್ನು ಗುರುತಿಸುವಾಗ."
  },
  "ಆಕಳು ಕಪ್ಪಾದರೆ ಹಾಲು ಕಪ್ಪೇ": {
    en: "If the cow is black in color, is its milk black too? (Outward physical appearance or humble origins have no bearing on inner goodness, character, or the purity of one's contribution).",
    kn: "ಬಾಹ್ಯ ಸೌಂದರ್ಯ ಅಥವಾ ಬಣ್ಣಕ್ಕಿಂತ ಆಂತರಿಕ ಸದ್ಗುಣ ಮತ್ತು ಮೌಲ್ಯಗಳೇ ಮುಖ್ಯ.",
    situation_en: "Challenging superficial prejudices based on skin complexion, modest attire, or social background.",
    situation_kn: "ಮೇಲ್ನೋಟದ ರೂಪ ನೋಡಿ ವ್ಯಕ್ತಿಯ ಯೋಗ್ಯತೆಯನ್ನು ಕಡೆಗಣಿಸಬಾರದೆಂದು ಹೇಳಲು."
  },
  "ಅಲ್ಪನಿಗೆ ಐಶ್ವರ್ಯ ಬಂದರೆ ಅರ್ಧರಾತ್ರಿಯಲ್ಲಿ ಕೊಡೆ ಹಿಡಿದ": {
    en: "When a shallow, petty person acquired sudden wealth, he held an umbrella over his head in the dead of midnight. (A vulgar person who gains sudden unearned status behaves with ridiculous vanity and intolerable arrogance).",
    kn: "ಯೋಗ್ಯತೆಯಿಲ್ಲದ ವ್ಯಕ್ತಿಗೆ ಅನಿರೀಕ್ಷಿತವಾಗಿ ಅಧಿಕಾರ ಅಥವಾ ಸಿರಿವಂತಿಕೆ ಬಂದಾಗ ಅಹಂಕಾರದಿಂದ ಅಸಂಬದ್ಧವಾಗಿ ವರ್ತಿಸುವುದು.",
    situation_en: "Describing sudden lottery winners or nouveau-riche bullies who flaunt their money embarrassingly.",
    situation_kn: "ಹೊಸದಾಗಿ ಶ್ರೀಮಂತನಾದವನ ಅತಿಯಾದ ಆಡಂಬರ ಮತ್ತು ಗರ್ವವನ್ನು ಅಣಕಿಸಲು."
  },
  "ಮನೆಯಲ್ಲಿ ಇಲಿ, ಹೊರಗೆ ಹುಲಿ": {
    en: "A meek mouse inside one's own house, but a roaring tiger out on the street. (A cowardly hypocrite who is submissive before domestic realities but puts on a blustering, aggressive show in public).",
    kn: "ಸ್ವಂತ ಮನೆಯಲ್ಲಿ ಜವಾಬ್ದಾರಿಯಿಲ್ಲದೆ ಹೇಡಿಯಂತಿದ್ದು, ಹೊರಗಿನವರ ಮುಂದೆ ಶೂರನಂತೆ ನಟಿಸುವ ಡೋಂಗಿತನ.",
    situation_en: "Calling out someone who boasts loudly in public but lacks the courage to stand up for their convictions at home.",
    situation_kn: "ಹೊರಗೆ ಮಾತ್ರ ಗತ್ತು ತೋರಿಸುವ ಒಳಗೊಳಗೆ ಹೇಡಿಯಾಗಿರುವವರನ್ನು ವರ್ಣಿಸಲು."
  },
  "ಕುರುಡನಿಗೆ ಕನ್ನಡಿ ತೋರಿಸಿದಂತೆ": {
    en: "Like holding up a polished looking-glass before a blind person. (Presenting subtle wisdom, exquisite art, or reasoned advice to someone who is utterly incapable of appreciating it).",
    kn: "ವಿವೇಕವಿಲ್ಲದ ಅಥವಾ ಗ್ರಹಿಸುವ ಶಕ್ತಿಯಿಲ್ಲದ ಮೂರ್ಖನಿಗೆ ಅತ್ಯಮೂಲ್ಯವಾದ ಜ್ಞಾನೋಪದೇಶ ಮಾಡುವುದು ವ್ಯರ್ಥ.",
    situation_en: "Wasting brilliant philosophical arguments or artistic nuances on an obstinate philistine.",
    situation_kn: "ತಿಳಿವಳಿಕೆಯಿಲ್ಲದವರಿಗೆ ಬುದ್ಧಿವಾದ ಹೇಳಿ ವ್ಯರ್ಥ ಶ್ರಮ ಪಡುವಾಗ."
  },
  "ಚಿಂತೆ ಇಲ್ಲದವನಿಗೆ ಸಂತೆಯಲ್ಲೂ ನಿದ್ರೆ": {
    en: "One who is free from guilt and anxiety can fall into peaceful slumber even in the midst of a noisy marketplace. (A clean conscience, honest life, and contentment bring serenity even in chaotic surroundings).",
    kn: "ಮನಸ್ಸಿನಲ್ಲಿ ಯಾವುದೇ ಪಾಪಪ್ರಜ್ಞೆ ಅಥವಾ ಆತಂಕವಿಲ್ಲದ ಪ್ರಾಮಾಣಿಕ ವ್ಯಕ್ತಿಗೆ ಎಂತಹ ಗದ್ದಲದಲ್ಲೂ ನೆಮ್ಮದಿಯ ನಿದ್ರೆ ಬರುತ್ತದೆ.",
    situation_en: "Praising the tranquil mental peace of an honest, modest person compared to a guilty, restless millionaire.",
    situation_kn: "ನಿಷ್ಕಲ್ಮಶ ಮನಸ್ಸಿನ ನೆಮ್ಮದಿಯನ್ನು ಕೊಂಡಾಡುವಾಗ."
  },
  "ಆಪತ್ತಿಗೆ ಆದವನೇ ನೆಂಟ": {
    en: "The one who stands faithfully by your side in times of danger and distress is your true kin. (Genuine kinship and steadfast loyalty are proven during hardship, not in times of easy celebration).",
    kn: "ಕಷ್ಟ ಮತ್ತು ಸಂಕಷ್ಟದ ಸಮಯದಲ್ಲಿ ನೆರವಿಗೆ ಧಾವಿಸುವವನೇ ನಿಜವಾದ ಬಂಧು ಅಥವಾ ಮಿತ್ರ.",
    situation_en: "Honoring a loyal friend who supported you through illness or bankruptcy while formal relatives stayed away.",
    situation_kn: "ವಿಪತ್ತಿನ ವೇಳೆ ಸಹಾಯಕ್ಕೆ ನಿಲ್ಲುವ ನಿಜವಾದ ಆಪ್ತರನ್ನು ಗುರುತಿಸುವಾಗ."
  },
  "ಉಪ್ಪು ತಿಂದವನು ನೀರು ಕುಡಿಯಲೇಬೇಕು": {
    en: "He who consumes salty food must inevitably drink water to quench his thirst. (Whoever commits a crime, dishonesty, or misdeed must face the inevitable consequences and penalties).",
    kn: "ತಪ್ಪು ಅಥವಾ ಅನ್ಯಾಯ ಮಾಡಿದವನು ಅದಕ್ಕೆ ತಕ್ಕ ಶಿಕ್ಷೆಯನ್ನು ಅಥವಾ ಪರಿಣಾಮವನ್ನು ಅನುಭವಿಸಲೇಬೇಕು.",
    situation_en: "When a corrupt official or cheater is finally caught and punished by the law.",
    situation_kn: "ತಪ್ಪು ಮಾಡಿದವನಿಗೆ ಶಿಕ್ಷೆಯಾಗುವುದು ಖಚಿತ ಎಂದು ಎಚ್ಚರಿಸಲು."
  },
  "ಮನೆಯೇ ಮೊದಲ ಪಾಠಶಾಲೆ, ಜನನಿ ತಾನೇ ಮೊದಲ ಗುರು": {
    en: "The home is the very first school, and the mother is the primary teacher. (A person's core values, character, empathy, and integrity originate from childhood upbringing in the family).",
    kn: "ವ್ಯಕ್ತಿಯ ಸಂಸ್ಕಾರ, ನಡತೆ ಮತ್ತು ಜೀವನ ಮೌಲ್ಯಗಳು ಆರಂಭವಾಗುವುದು ತಾಯಿಯ ಮಡಿಲಿನಲ್ಲಿ ಮತ್ತು ಮನೆಯ ವಾತಾವರಣದಲ್ಲೇ.",
    situation_en: "Highlighting the irreplaceable responsibility of parents in nurturing ethical and compassionate children.",
    situation_kn: "ಮಕ್ಕಳ ನಡತೆಯಲ್ಲಿ ಸಂಸ್ಕಾರ ಮತ್ತು ತಾಯಿಯ ಪಾತ್ರವನ್ನು ಕೊಂಡಾಡುವ ಸಂದರ್ಭ."
  },
  "ಗುಬ್ಬಿಯ ಮೇಲೆ ಬ್ರಹ್ಮಾಸ್ತ್ರ": {
    en: "Unleashing the mythical, cosmic Brahmastra missile against a defenseless little sparrow. (Employing overwhelming, disproportionately harsh retaliation against a tiny mistake or harmless entity).",
    kn: "ಚಿಕ್ಕ ತಪ್ಪಿಗೆ ಅಥವಾ ದುರ್ಬಲ ವ್ಯಕ್ತಿಯ ವಿರುದ್ಧ ಅತಿಯಾದ ಬಲಪ್ರಯೋಗ ಅಥವಾ ಕಠಿಣ ಶಿಕ್ಷೆ ವಿಧಿಸುವುದು.",
    situation_en: "When an institution uses heavy-handed legal machinery or aggressive penalties against an innocent minor error.",
    situation_kn: "ಅಲ್ಪ ವಿಷಯಕ್ಕೆ ಅತಿಯಾದ ಕೋಪ ಅಥವಾ ಕಠಿಣ ಕ್ರಮ ಕೈಗೊಂಡಾಗ."
  },
  "ಕೊಟ್ಟಿದ್ದು ತನಗೆ, ಇಟ್ಟಿದ್ದು ಪರರಿಗೆ": {
    en: "What you give away in selfless charity becomes your true eternal wealth; what you hoard is left behind for strangers to divide. (Generosity enriches the soul, while miserly hoarding ends in losing everything).",
    kn: "ದಾನ ಮಾಡಿದ ಪುಣ್ಯ ನಮ್ಮ ಜತೆಗೆ ಬರುತ್ತದೆ; ಕೂಡಿಟ್ಟ ಸಂಪತ್ತು ನಾವು ಸತ್ತ ಮೇಲೆ ಅನ್ಯರ ಪಾಲಾಗುತ್ತದೆ.",
    situation_en: "Encouraging charitable giving and warning wealthy misers about the impermanence of worldly possessions.",
    situation_kn: "ಪರೋಪಕಾರ ಮತ್ತು ದಾನ ಧರ್ಮದ ಶ್ರೇಷ್ಠತೆಯನ್ನು ಬೋಧಿಸುವಾಗ."
  }
};

console.log(`Loaded ${Object.keys(TRANSLATION_MAP).length} curated authentic translations.`);
