import fs from 'fs';

const masterPath = 'data/kannada_proverbs_master.json';
const masterData = JSON.parse(fs.readFileSync(masterPath, 'utf8'));

const BATCH2 = {
  "ಮೂಗು ಹಿಡಿದರೆ ಬಾಯಿ": {
    en: "Pinch the nose tightly, and the mouth opens automatically on its own. (When gentle persuasion fails, applying appropriate leverage or authority compels cooperation).",
    kn: "ನೇರ ಮಾತಿಗೆ ಒಪ್ಪದಿದ್ದಾಗ ಸೂಕ್ತವಾದ ಒತ್ತಡ ಅಥವಾ ಉಪಾಯ ಪ್ರಯೋಗಿಸಿ ಕೆಲಸ ಸಾಧಿಸಿಕೊಳ್ಳುವುದು.",
    sit: "Using institutional rules or contractual escrow to enforce delayed compliance from an uncooperative partner.",
    sit_kn: "ನೇರವಾಗಿ ಒಪ್ಪದವರನ್ನು ಉಪಾಯದಿಂದ ದಾರಿಗೆ ತರುವ ಸಂದರ್ಭ."
  },
  "ಮುಳ್ಳನ್ನು ಮುಳ್ಳಿನಿಂದಲೇ": {
    en: "A thorn embedded in the foot must be removed using another sharp thorn. (Tackling cunning adversaries or intricate dilemmas requires using subtle, corresponding tactics; fighting fire with fire).",
    kn: "ಕುತಂತ್ರಿಗಳನ್ನು ಎದುರಿಸಲು ಅವರದೇ ರೀತಿಯ ಜಾಣತನ ಮತ್ತು ತಂತ್ರಗಳನ್ನು ಬಳಸಬೇಕಾಗುತ್ತದೆ.",
    sit: "Deploying white-hat ethical hackers to combat malicious cyber criminals.",
    sit_kn: "ದುಷ್ಟರನ್ನು ಸೋಲಿಸಲು ಅವರದೇ ತಂತ್ರಗಾರಿಕೆಯನ್ನು ಪ್ರಯೋಗಿಸುವಾಗ."
  },
  "ಕೆರೆಯ ನೀರ ಕೆರೆಗೆ": {
    en: "Dipping water from the sacred lake and pouring it right back into the lake to seek blessings. (Offering to God, parents, or society what ultimately originated from them in the first place).",
    kn: "ದೇವರಿಂದ ಅಥವಾ ಸಮಾಜದಿಂದ ನಮಗೆ ದೊರೆತ ಸಂಪತ್ತನ್ನೇ ಮತ್ತೆ ಅವರ ಸೇವೆಗೆ ವಿನಿಯೋಗಿಸಿ ಧನ್ಯತೆ ಪಡೆಯುವುದು.",
    sit: "Using company profits to fund employee scholarships, or giving back to the alma mater that educated you.",
    sit_kn: "ಸಮಾಜದಿಂದ ಪಡೆದದ್ದನ್ನು ಸಮಾಜದ ಒಳಿತಿಗೇ ಮರಳಿ ಸಮರ್ಪಿಸುವ ಕೃತಜ್ಞತಾ ಭಾವ."
  },
  "ಪಂಜರದಲ್ಲಿ ಕಾಗೆ ಇಟ್ಟರೆ": {
    en: "If you keep a wild crow in a golden cage, will it sing in the celestial musical scale? (An inherently coarse or uncultured person will not produce refined sweetness merely by living in luxury).",
    kn: "ಬಾಹ್ಯವಾಗಿ ಎಷ್ಟೇ ಅನುಕೂಲ ಕಲ್ಪಿಸಿದರೂ ಮೂಲತಃ ಕೀಳು ಸ್ವಭಾವವುಳ್ಳ ವ್ಯಕ್ತಿ ಸಜ್ಜನನಾಗಲಾರ.",
    sit: "When lavish privileges given to an incorrigible troublemaker fail to reform their behavior.",
    sit_kn: "ಅಯೋಗ್ಯನಿಗೆ ಎಷ್ಟೇ ಉನ್ನತ ಸ್ಥಾನ ನೀಡಿದರೂ ಆತನ ಕೀಳು ಗುಣ ಬದಲಾಗದು ಎಂದು ತಿಳಿಸಲು."
  },
  "ಕುಂತು ತಿಂದರೆ, ಕುಡಿಕೆ": {
    en: "If you only sit and eat without working, even a pot filled with pure gold will run dry. (No fortune, however massive, can withstand idle consumption without ongoing income).",
    kn: "ದುಡಿಮೆಯಿಲ್ಲದೆ ಕೇವಲ ಕುಳಿತು ಉಣ್ಣುತ್ತಿದ್ದರೆ ಎಷ್ಟೇ ದೊಡ್ಡ ಪಿತ್ರಾರ್ಜಿತ ಸಂಪತ್ತಿದ್ದರೂ ಬೇಗನೆ ಕರಗಿಹೋಗುತ್ತದೆ.",
    sit: "Warning heirs of great family fortunes against complacency and squandering capital.",
    sit_kn: "ದುಡಿಮೆಯಿಲ್ಲದ ಸೋಮಾರಿತನದಿಂದ ಸಂಪತ್ತು ನಾಶವಾಗುವುದನ್ನು ಎಚ್ಚರಿಸಲು."
  },
  "ಗಂಟೂ ಹೋಯ್ತು;ನಂಟೂ": {
    en: "Both the money was lost, and the kinship was severed. (Lending money to friends or relatives without clear boundaries often results in losing both your capital and the relationship).",
    kn: "ಸಂಬಂಧಿಕರಿಗೆ ಅಥವಾ ಸ್ನೇಹಿತರಿಗೆ ಸಾಲ ನೀಡಿ ಹಣವನ್ನೂ ಕಳೆದುಕೊಂಡು, ಅವರ ಜತೆಗಿನ ಸ್ನೇಹ-ಸಂಬಂಧವನ್ನೂ ಕಳೆದುಕೊಳ್ಳುವ ದುರಂತ.",
    sit: "Personal finance dilemma of loaning substantial savings to casual friends who default.",
    sit_kn: "ಸಾಲದಿಂದ ಹಣ ಮತ್ತು ಪ್ರೀತಿ ಎರಡನ್ನೂ ಕಳೆದುಕೊಳ್ಳುವ ಸಂದರ್ಭ."
  },
  "ಕೇಡು ಬರೋ ಕಾಲಕ್ಕೆ": {
    en: "When ruin approaches, one's own intellect goes astray. (Pride, anger, or moral blindness leads a person to make fatal errors right before their downfall; whom the gods would destroy, they first make mad).",
    kn: "ವ್ಯಕ್ತಿಗೆ ವಿನಾಶದ ಕಾಲ ಸಮೀಪಿಸಿದಾಗ ಆತನ ಬುದ್ಧಿಯು ಭ್ರಷ್ಟವಾಗಿ ಕೆಟ್ಟ ನಿರ್ಧಾರಗಳನ್ನು ಕೈಗೊಳ್ಳುತ್ತಾನೆ.",
    sit: "When an arrogant executive ignores all sound warnings and drives their company into disaster.",
    sit_kn: "ವಿನಾಶಕಾಲೇ ವಿಪರೀತ ಬುದ್ಧಿ ಎಂಬಂತೆ ತಪ್ಪು ನಿರ್ಧಾರಗಳಿಂದ ತಾವೇ ಹಾಳಾಗುವಾಗ."
  },
  "ಬೆಳ್ಳಗಿರೋದೆಲ್ಲ ಹಾಲಲ್ಲ": {
    en: "Everything that is white is not milk; all that glitters is not gold. (Superficial visual appearance is not proof of purity, value, or virtue).",
    kn: "ಮೇಲ್ನೋಟಕ್ಕೆ ಶುಭ್ರವಾಗಿ ಕಂಡಿದ್ದೆಲ್ಲವೂ ಪವಿತ್ರ ಅಥವಾ ಶ್ರೇಷ್ಠವಾಗಿರಬೇಕಿಲ್ಲ; ಒಳತಿರುಳನ್ನು ಪರೀಕ್ಷಿಸಬೇಕು.",
    sit: "Vetting sweet-talking salesmen or checking financial contracts before investing.",
    sit_kn: "ಬಾಹ್ಯ ಸೌಂದರ್ಯಕ್ಕೆ ಮರುಳಾಗದೆ ಗುಣವನ್ನು ಪರೀಕ್ಷಿಸುವಂತೆ ಎಚ್ಚರಿಸಲು."
  },
  "ಹೊಳೆಯಲ್ಲಿ ಹುಣಿಸೇ ಹಣ್ಣು": {
    en: "Like squeezing tart tamarind pulp into a flowing river. (A completely wasted, futile effort that leaves zero lasting trace or benefit; squandering resources).",
    kn: "ಯಾವುದೇ ಫಲಿತಾಂಶ ನೀಡದ ವ್ಯರ್ಥ ಪ್ರಯತ್ನದಲ್ಲಿ ಸಮಯ, ಹಣ ಮತ್ತು ಶ್ರಮವನ್ನು ಪೋಲು ಮಾಡುವುದು.",
    sit: "Pumping capital into a dead business model without addressing foundational product flaws.",
    sit_kn: "ನಿಷ್ಪ್ರಯೋಜಕ ಕಾರ್ಯದಲ್ಲಿ ಶ್ರಮ ಹಾಳುಮಾಡುವ ಮೂರ್ಖತನವನ್ನು ವರ್ಣಿಸಲು."
  },
  "ಹುತ್ತ ಬಡಿದರೆ ಹಾವು": {
    en: "Will thrashing the outside of the anthill kill the venomous serpent hidden deep within? (Attacking surface symptoms does not destroy the root cause of an evil).",
    kn: "ಮೂಲ ಸಮಸ್ಯೆಯನ್ನು ಪರಿಹರಿಸದೆ ಕೇವಲ ಬಾಹ್ಯ ಲಕ್ಷಣಗಳನ್ನು ಸರಿಪಡಿಸಲು ಯತ್ನಿಸುವುದು ವ್ಯರ್ಥ.",
    sit: "Addressing symptoms like employee turnover without fixing toxic leadership at the top.",
    sit_kn: "ಸಮಸ್ಯೆಯ ಮೂಲ ಕಾರಣವನ್ನು ನಿವಾರಿಸದೆ ಮೇಲ್ನೋಟದ ಕ್ರಮ ಕೈಗೊಳ್ಳುವಾಗ."
  },
  "ಶಿವಾ ಅರಿಯದ ಸಾವು": {
    en: "There is no death unknown to God; there is no sin unknown to one's own inner conscience. (A person's inner conscience always witnesses and knows their secret sins, even if hidden from the world).",
    kn: "ಜಗತ್ತಿನ ಕಣ್ಣು ತಪ್ಪಿಸಿದರೂ ನಮ್ಮ ಅಂತರಾತ್ಮ ಮತ್ತು ಭಗವಂತನಿಗೆ ನಾವು ಮಾಡಿದ ಪಾಪ ತಿಳಿದೇ ಇರುತ್ತದೆ.",
    sit: "Conscience-awakening reflection urging honesty even in total anonymity.",
    sit_kn: "ಅಂತರಾತ್ಮದ ಸಾಕ್ಷಿಗೆ ದ್ರೋಹ ಬಗೆಯಬಾರದೆಂದು ಎಚ್ಚರಿಸುವ ನಾಣ್ಣುಡಿ."
  },
  "ಮಕ ನೋಡಿ ಮಾರು ಹೋದ": {
    en: "Captivated by the charming face, but repelled by the toxic character. (Superficial beauty creates attraction, but rotten character destroys the relationship).",
    kn: "ರೂಪವನ್ನು ನೋಡಿ ಮೋಹಗೊಂಡರೂ, ಅವರ ಕೆಟ್ಟ ಗುಣ ಮತ್ತು ನಡತೆ ತಿಳಿದ ಮೇಲೆ ಅಸಹ್ಯಪಟ್ಟು ದೂರ ಸರಿಯುವುದು.",
    sit: "Realizing that a charismatic colleague or partner is manipulative and cruel behind closed doors.",
    sit_kn: "ಸೌಂದರ್ಯಕ್ಕಿಂತ ಸದ್ಗುಣವೇ ಶಾಶ್ವತ ಪ್ರೀತಿಯ ಅಡಿಪಾಯವೆಂದು ತಿಳಿಸಲು."
  },
  "ಕನ್ನಡಿ ಒಳಗಿನ ಗಂಟು": {
    en: "Can you grab and hold the reflected bundle of coins inside a mirror? (Chasing illusory mirages and phantom wealth that look enticing but have no tangible reality).",
    kn: "ಕಣ್ಣಿಗೆ ಕಂಡರೂ ಕೈಗೆ ಸಿಗದ ಮಾಯಾ ಸಂಪತ್ತು ಅಥವಾ ಅಸಾಧ್ಯವಾದ ಕಲ್ಪನೆಗಳ ಬೆನ್ನತ್ತಿ ಭ್ರಮನಿರಸನಗೊಳ್ಳುವುದು.",
    sit: "Speculative crypto schemes or pyramid scams that promise millions that can never be withdrawn.",
    sit_kn: "ಭ್ರಮೆಯ ಬೆನ್ನತ್ತಿ ವಾಸ್ತವವನ್ನು ಕಳೆದುಕೊಳ್ಳುವವರನ್ನು ಎಚ್ಚರಿಸಲು."
  },
  "ಯಾರದ್ದೋ ದುಡ್ಡು ಎಲ್ಲಮ್ಮನ": {
    en: "Spending someone else's money lavishly to celebrate Yellamma's festive fair! (Careless, extravagant spending of public or other people's money with zero accountability).",
    kn: "ತನ್ನ ಸ್ವಂತ ದುಡಿಮೆಯಿಲ್ಲದೆ ಇತರರ ಅಥವಾ ಸಾರ್ವಜನಿಕರ ಹಣವನ್ನು ಮನಬಂದಂತೆ ಪೋಲು ಮಾಡುವ ಬೇಜವಾಬ್ದಾರಿತನ.",
    sit: "Calling out corrupt politicians hosting lavish banquets using taxpayer relief funds.",
    sit_kn: "ಪರರ ಹಣದಲ್ಲಿ ಮೋಜು-ಮಸ್ತಿ ಮಾಡುವವರನ್ನು ಅಣಕಿಸಲು."
  },
  "ಎತ್ತಿಗೆ ಜ್ವರ ಬಂದರೆ": {
    en: "When the ox developed a fever, they branded the innocent buffalo with hot iron! (Punishing the wrong person or applying the wrong remedy to an unrelated problem).",
    kn: "ಒಬ್ಬರು ಮಾಡಿದ ತಪ್ಪಿಗೆ ಇನ್ನೊಬ್ಬರಿಗೆ ಶಿಕ್ಷೆ ವಿಧಿಸುವುದು ಅಥವಾ ಸಮಸ್ಯೆಗೆ ಅಸಂಬದ್ಧ ಪರಿಹಾರ ಹುಡುಕುವುದು.",
    sit: "Firing frontline customer support agents for structural software outages caused by leadership.",
    sit_kn: "ಸಂಬಂಧವಿಲ್ಲದವರಿಗೆ ಅನ್ಯಾಯವಾಗಿ ದಂಡ ವಿಧಿಸುವ ವಿಪರ್ಯಾಸ."
  },
  "ಕೊಂಕಣ ಸುತ್ತಿ ಮೈಲಾರಕ್ಕೆ": {
    en: "Taking a massive detour circling all through the coastal Konkan region just to reach neighboring Mailara. (Taking an unnecessarily convoluted, round-about route to accomplish a simple task).",
    kn: "ನೇರವಾಗಿ ಸುಲಭವಾಗಿ ಮಾಡಬಹುದಾದ ಕೆಲಸವನ್ನು ಅನಗತ್ಯವಾಗಿ ಸುತ್ತಿಬಳಸಿ ಕಷ್ಟಕರವಾಗಿಸಿಕೊಳ್ಳುವುದು.",
    sit: "Over-engineering a simple software script into twenty abstract layers, causing delays.",
    sit_kn: "ನೇರವಾದ ದಾರಿ ಬಿಟ್ಟು ಸುತ್ತಿಬಳಸಿ ಶ್ರಮ ಪಡುವವರನ್ನು ತಿದ್ದಲು."
  },
  "ಹಿರಿಯಕ್ಕನ ಚಾಳಿ": {
    en: "The bad habits of the eldest sister are copied by everyone in the household. (Flaws and misconduct of family elders or organization leaders trickle down to corrupt juniors).",
    kn: "ಮನೆಯ ಹಿರಿಯರು ಅಥವಾ ಮುಖಂಡರು ಕೆಟ್ಟ ಮಾರ್ಗ ಹಿಡಿದರೆ ಕಿರಿಯರೂ ಅದನ್ನೇ ಅನುಕರಿಸಿ ಹಾಳಾಗುತ್ತಾರೆ.",
    sit: "Executive teams setting bad cultural precedents like expense fraud that employees then copy.",
    sit_kn: "ಹಿರಿಯರು ಮಾದರಿಯಾಗಿರಬೇಕಾದ ಜವಾಬ್ದಾರಿಯನ್ನು ನೆನಪಿಸಲು."
  },
  "ಕೋತಿ ಮೊಸರು ಕುಡಿದು": {
    en: "The monkey drank the curds and slyly wiped the leftover on the innocent goat's mouth! (Framing an innocent person for one's own cunning misdeeds; scapegoating).",
    kn: "ತಾನು ಮಾಡಿದ ಅಪರಾಧ ಅಥವಾ ತಪ್ಪು ಕೆಲಸವನ್ನು ಮುಗ್ಧರ ತಲೆಗೆ ಕಟ್ಟಿ ತಾನು ಜಾಣತನದಿಂದ ಪಾರಾಗುವುದು.",
    sit: "A corrupt manager blaming junior interns for an unauthorized budget overrun.",
    sit_kn: "ಮುಗ್ಧರ ಮೇಲೆ ಅಪವಾದ ಹೊರಿಸಿ ತಪ್ಪಿಸಿಕೊಳ್ಳುವ ಕುತಂತ್ರವನ್ನು ಬಯಲು ಮಾಡಲು."
  },
  "ಅಡ್ಡಗೋಡೆ ಮೇಲೆ ದೀಪ": {
    en: "Like placing a flickering lamp on a dividing wall between two houses. (An ambiguous, indecisive stance that sits on the fence without committing to either side).",
    kn: "ಯಾವುದೇ ಸ್ಪಷ್ಟ ನಿಲುವು ತೆಗೆದುಕೊಳ್ಳದೆ ಎರಡೂ ಕಡೆಗೂ ಒಪ್ಪುವಂತೆ ಸಂದಿಗ್ಧವಾಗಿ ವರ್ತಿಸುವುದು.",
    sit: "Politicians who dodge giving clear answers on crucial ethical votes.",
    sit_kn: "ಸ್ಪಷ್ಟ ನಿಲುವಿಲ್ಲದ ತಟಸ್ಥ ಧೋರಣೆಯನ್ನು ವ್ಯಂಗ್ಯವಾಡಲು."
  },
  "ಸೇರಿಗೆ ಸವ್ವಾ ಸೇರು": {
    en: "For every measure of one 'seer', there is a greater measure of one-and-a-quarter 'seer'. (No matter how clever, arrogant, or strong someone thinks they are, there is always someone greater who will humble them; diamond cuts diamond).",
    kn: "ತಾನೇ ಸರ್ವಶ್ರೇಷ್ಠ ಅಥವಾ ಚಾಲಾಕಿ ಎಂದು ಬೀಗುವವನಿಗೆ ಆತನನ್ನೂ ಮೀರಿದ ಪ್ರತಿಭೆ ಅಥವಾ ಬುದ್ಧಿವಂತ ಎದುರಾಗುವುದು ಖಚಿತ.",
    sit: "When a haughty monopoly finds itself disrupted by a smarter, faster young startup.",
    sit_kn: "ಅಹಂಕಾರ ಪಡುವವರಿಗೆ ತಮಗಿಂತ ಶ್ರೇಷ್ಠರೂ ಇದ್ದಾರೆ ಎಂದು ಎಚ್ಚರಿಸಲು."
  },
  "ಅರ್ಧ ಕಲಿತವನ ಆಬ್ಬರ": {
    en: "One who has learned only half-baked knowledge makes the loudest noise. (A little learning is a dangerous thing; shallow amateurs boast far louder than genuine masters).",
    kn: "ಅರೆಬರೆ ತಿಳಿದುಕೊಂಡ ಅಲ್ಪಜ್ಞಾನಿಯು ವಿದ್ವಾಂಸನಿಗಿಂತ ಹೆಚ್ಚಾಗಿ ಗರ್ವದಿಂದ ಆರ್ಭಟಿಸುತ್ತಾನೆ.",
    sit: "Internet commentators speaking authoritatively on complex medicine after reading one headline.",
    sit_kn: "ಅಲ್ಪಜ್ಞಾನಿಗಳ ಅತಿಯಾದ ಬಡಾಯಿಯನ್ನು ಖಂಡಿಸಲು."
  },
  "ಕಲ್ಲು ಇದ್ದಾಗ ನಾಯಿ": {
    en: "When there is a stone on the ground there is no barking dog; when the angry dog attacks, there is no stone to throw! (Missing the right tool or resource when it is urgently needed, and finding it only when the danger has passed).",
    kn: "ಅಗತ್ಯವಿದ್ದಾಗ ಸೌಲಭ್ಯ ಸಿಗದಿರುವುದು, ಅಗತ್ಯವಿಲ್ಲದಿದ್ದಾಗ ಎಲ್ಲವೂ ಕೈಗೆಟುಕುವುದು ಎಂಬ ವಿಚಿತ್ರ ವಿಪರ್ಯಾಸ.",
    sit: "Having umbrellas on sunny days but forgetting them at home during a sudden downpour.",
    sit_kn: "ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಸಾಧನ ಅಥವಾ ಅವಕಾಶ ಒದಗಿಬಾರದ ಪರಿಸ್ಥಿತಿ."
  },
  "ಐದು ಕುರುಡರು ಆನೆಯನ್ನು": {
    en: "Like five blind men attempting to describe an elephant. (Fragmented, narrow perspectives mistaking a single part for the vast truth).",
    kn: "ಸಂಪೂರ್ಣ ಸತ್ಯವನ್ನು ಗ್ರಹಿಸದೆ ಕೇವಲ ಒಂದು ಭಾಗವನ್ನು ನೋಡಿ ತಮಗೆ ತಿಳಿದದ್ದೇ ಅಂತಿಮ ಸತ್ಯವೆಂದು ವಾದಿಸುವುದು.",
    sit: "Different departments arguing about customer experience without looking at the whole journey.",
    sit_kn: "ಅಪೂರ್ಣ ದೃಷ್ಟಿಕೋನದಿಂದ ತೀರ್ಮಾನಕ್ಕೆ ಬರುವ ಸಂಕುಚಿತತೆಯನ್ನು ತಿಳಿಸಲು."
  },
  "ಸಜ್ಜನರ ಸಂಗ ಹೆಜ್ಜೇನು": {
    en: "Association with the noble and righteous is like tasting pure honeycomb. (The companionship of wise, virtuous souls nourishes the heart with lasting sweetness).",
    kn: "ಸದಾಚಾರಿಗಳ ಮತ್ತು ಸಂತರ ಸಹವಾಸವು ಜೀವನದಲ್ಲಿ ಪರಮಾನಂದ ಮತ್ತು ಸದ್ಗುಣಗಳನ್ನು ನೀಡುತ್ತದೆ.",
    sit: "Cultivating friendships with inspiring, ethical colleagues who encourage personal growth.",
    sit_kn: "ಸತ್ಸಂಗದ ಮಾಧುರ್ಯ ಮತ್ತು ಶ್ರೇಷ್ಠತೆಯನ್ನು ವರ್ಣಿಸುವಾಗ."
  },
  "ಒಗ್ಗಟ್ಟಿಲ್ಲದ ಊರಲ್ಲಿ ಒಪ್ಪತ್ತೂ": {
    en: "Do not remain even for a single meal in a town devoid of unity and plagued by discord. (Avoid toxic, divided environments where internal strife ruins life).",
    kn: "ಕಲಹ ಮತ್ತು ದ್ವೇಷವಿರುವ ಅಶಾಂತ ವಾತಾವರಣದಲ್ಲಿ ಕ್ಷಣಮಾತ್ರವೂ ಇರಬಾರದು; ಶಾಂತಿ ಇರುವಲ್ಲಿ ನೆಲೆಯೂರಬೇಕು.",
    sit: "Resigning from toxic workplaces where department wars make productive work impossible.",
    sit_kn: "ಕಲಹಮಯ ಪರಿಸರದಿಂದ ದೂರವಿರಲು ಬೋಧಿಸುವ ಗಾದೆ."
  },
  "ಒಲಿದರೆ ನಾರಿ ಮುನಿದರೆ": {
    en: "If pleased, she is a nurturing woman; if angered, she transforms into the fierce goddess Maari. (The supreme power of a woman: boundless grace when respected, but formidable wrath when wronged).",
    kn: "ಮಹಿಳೆಯನ್ನು ಗೌರವಿಸಿದರೆ ಪ್ರೀತಿಯ ತಾಯಿಯಾಗುತ್ತಾಳೆ, ಅವಮಾನಿಸಿದರೆ ಸಂಹಾರಕ ಶಕ್ತಿಯಾಗಿ ಪರಿಣಮಿಸುತ್ತಾಳೆ.",
    sit: "Treating women with deep respect and dignity in family, society, and workplaces.",
    sit_kn: "ಸ್ತ್ರೀಶಕ್ತಿಯ ಉದಾತ್ತತೆ ಮತ್ತು ಗೌರವದ ಆವಶ್ಯಕತೆಯನ್ನು ಸಾರಲು."
  },
  "ಮುತ್ತು ಒಡೆದರೆ ಹೋಯ್ತು": {
    en: "A pearl once shattered is gone; a spoken word once uttered cannot be recalled. (Words once released can never be taken back; speak with eternal care).",
    kn: "ಒಡೆದ ಮುತ್ತನ್ನು ಮತ್ತೆ ಜೋಡಿಸಲಾಗದು, ಆಡಿದ ಕೆಟ್ಟ ಮಾತನ್ನು ಎಂದಿಗೂ ಹಿಂಪಡೆಯಲಾಗದು.",
    sit: "Warning against sending angry emails or making spiteful verbal attacks in the heat of passion.",
    sit_kn: "ಮಾತಿನ ತೂಕ ಮತ್ತು ಎಚ್ಚರಿಕೆಯ ಮಹತ್ವವನ್ನು ಮನದಟ್ಟು ಮಾಡಲು."
  },
  "ಬರಗಾಲದಲ್ಲಿ ಅಧಿಕ ಮಾಸ": {
    en: "An extra leap month falling during a devastating famine! (Misfortunes never come singly; adding extra hardship to an already dire calamity).",
    kn: "ಈಗಾಗಲೇ ತೀವ್ರ ಸಂಕಷ್ಟದಲ್ಲಿರುವಾಗ ಮತ್ತಷ್ಟು ಹೊಸ ತೊಂದರೆಗಳು ಬಂದು ಅಪ್ಪಳಿಸುವುದು.",
    sit: "Facing major medical bills right after experiencing sudden unemployment.",
    sit_kn: "ಕಷ್ಟದ ಮೇಲೆ ಕಷ್ಟ ಬಂದೆರಗುವ ಸನ್ನಿವೇಶದಲ್ಲಿ."
  },
  "ನಾಯಿನ ಕರೆದುಕೊಂಡು ಹೋಗಿ ಸಿಂಹಾಸಾನದ": {
    en: "Like taking a street dog and seating it upon a golden royal throne. (Bestowing high honor or sensitive leadership upon an ungrateful, base person who knows not how to conduct themselves).",
    kn: "ಯೋಗ್ಯತೆ ಮತ್ತು ಸಂಸ್ಕಾರವಿಲ್ಲದ ವ್ಯಕ್ತಿಗೆ ಉನ್ನತ ಸ್ಥಾನಮಾನ ನೀಡಿದರೆ ಆತ ಅದಕ್ಕೆ ತಕ್ಕಂತೆ ಘನತೆಯಿಂದ ವರ್ತಿಸಲಾರ.",
    sit: "Appointing an unprincipled charlatan to a revered judgeship or advisory board.",
    sit_kn: "ಅಯೋಗ್ಯರಿಗೆ ಗೌರವ ನೀಡಿದಾಗ ಉಂಟಾಗುವ ಅನಾಹುತವನ್ನು ಎಚ್ಚರಿಸಲು."
  },
  "ಸಾವಿರ ಸುಳ್ಳು ಹೇಳಿ": {
    en: "Even if you have to utter a thousand white lies, unite a couple in marriage. (Traditional pragmatic adage: minor domestic compromises or exaggerations are permissible for the noble goal of bringing two families together in sacred matrimony).",
    kn: "ಎರಡು ಕುಟುಂಬಗಳನ್ನು ಒಂದುಗೂಡಿಸಿ ಕಲ್ಯಾಣ ಮಾಡಲು ಸಣ್ಣಪುಟ್ಟ ಹೊಂದಾಣಿಕೆಗಳನ್ನು ಮಾಡಿಕೊಳ್ಳುವುದು ತಪ್ಪಲ್ಲ.",
    sit: "Smoothing over minor frictions to unite two loving families in marriage.",
    sit_kn: "ಮಂಗಳಕಾರ್ಯಕ್ಕಾಗಿ ಮಾಡುವ ಸಣ್ಣ ತ್ಯಾಗ ಮತ್ತು ಹೊಂದಾಣಿಕೆಯನ್ನು ಸಮರ್ಥಿಸಲು."
  },
  "ಹೌದಪ್ಪನ ಚಾವಡಿಯಲ್ಲಿ ಅಲ್ಲಪ್ಪನನ್ನು": {
    en: "In the council hall of 'Yes-men', who will listen to someone who says 'No'? (In an echo-chamber of sycophants, the voice of principled dissent and truth is silenced).",
    kn: "ಎಲ್ಲರೂ ಸಮ್ಮತಿಸುವ ಹೊಗಳುಭಟರ ಸಭೆಯಲ್ಲಿ ಸತ್ಯ ಮತ್ತು ವಿವೇಕದ ಭಿನ್ನಾಭಿಪ್ರಾಯಕ್ಕೆ ಬೆಲೆ ಸಿಗುವುದಿಲ್ಲ.",
    sit: "Speaking truth to power in corporate boardrooms dominated by yes-men.",
    sit_kn: "ಚಮಚಾಗಿರಿ ಮತ್ತು ಭಟ್ಟಂಗಿಗಳ ನಡುವೆ ಪ್ರಾಮಾಣಿಕತೆಗೆ ಮನ್ನಣೆ ಇಲ್ಲದಿರುವಾಗ."
  },
  "ಕಳ್ಳನ ಹೆಂಡತಿ ಎಂದಿದ್ದರೂ": {
    en: "A thief's wife is always on the verge of widowhood. (Those who tie their destiny to crime live in constant insecurity and inevitable ruin).",
    kn: "ಅನ್ಯಾಯ ಮತ್ತು ಅಪರಾಧದ ಹಾದಿ ಹಿಡಿದವರ ಕುಟುಂಬಕ್ಕೆ ಸದಾ ಅಭದ್ರತೆ ಮತ್ತು ದುರಂತದ ಭೀತಿ ತಪ್ಪಿದ್ದಲ್ಲ.",
    sit: "Warning youngsters against entering gangs or romantic entanglements with criminals.",
    sit_kn: "ಅಪರಾಧದ ಬದುಕು ತರುವ ಶಾಶ್ವತ ಅಭದ್ರತೆಯನ್ನು ಎಚ್ಚರಿಸಲು."
  },
  "ಒಂದು ಕಣ್ಣಿಗೆ ಬೆಣ್ಣೆ": {
    en: "Butter smeared on one eye, and caustic lime applied to the other! (Blatant, unfair discrimination and favoritism between children, employees, or citizens).",
    kn: "ಇಬ್ಬರ ನಡುವೆ ಸಮಾನತೆ ಕಾಪಾಡದೆ ಒಬ್ಬರಿಗೆ ಅತಿಯಾದ ಪಕ್ಷಪಾತ, ಇನ್ನೊಬ್ಬರಿಗೆ ತಾರತಮ್ಯ ಮತ್ತು ಅನ್ಯಾಯ ಮಾಡುವುದು.",
    sit: "Managers granting bonuses to favorites while penalizing hard-working quiet employees.",
    sit_kn: "ಪಕ್ಷಪಾತ ಮತ್ತು ಅನ್ಯಾಯದ ತಾರತಮ್ಯವನ್ನು ಖಂಡಿಸಲು."
  }
};

let count = 0;
for (const p of masterData) {
  if (p.is_verified === true) continue;

  for (const [pattern, item] of Object.entries(BATCH2)) {
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

console.log(`Batch 2 matched and enriched ${count} additional proverbs.`);

fs.writeFileSync(masterPath, JSON.stringify(masterData, null, 2), 'utf8');
fs.writeFileSync('src/data/masterProverbs.json', JSON.stringify(masterData, null, 2), 'utf8');
console.log('Datasets updated with Batch 2!');
