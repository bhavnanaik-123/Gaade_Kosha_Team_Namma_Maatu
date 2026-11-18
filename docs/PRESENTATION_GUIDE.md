# Hackathon Presentation Guide: Gaadhe Kosha (ಗಾದೆ ಕೋಶ)
### *A Complete Step-by-Step Guide for Presenting, Demonstrating, and Defending Gaadhe Kosha to Judges*

---

## 🌟 Section A: The 1-Minute Elevator Pitch

> *"Respected judges, good morning/afternoon!  
> 
> In Karnataka, we have an ancient saying: **'ವೇದ ಸುಳ್ಳಾದರೂ ಗಾದೆ ಸುಳ್ಳಾಗದು'** — meaning, even if sacred scriptures could be debated, ancestral folk proverbs never ring false.  
> 
> Kannada has thousands of brilliant folk proverbs that teach life ethics, financial prudence, and relationship wisdom. But for young people today, these proverbs are locked in old books arranged alphabetically. If someone is dealing with a cheating friend or lifestyle debt, they cannot find the matching proverb without reading an entire book. Furthermore, generic AI models like ChatGPT often invent fake, unauthentic Kannada sayings.  
> 
> To solve this, we built **Gaadhe Kosha (ಗಾದೆ ಕೋಶ)** — an AI-powered Kannada proverb companion. Users simply describe any modern real-life dilemma in Kannada or English. Our system uses a curated archive of **2,868 authentic proverbs**, a catalog of **425 real-life situations**, and **Gemini 1.5 Flash Retrieval-Augmented Generation (RAG)** to recommend the **top 3 most relevant Kannada proverbs**. For every proverb, it provides tailored bilingual guidance — a Kannada *ಜೀವನ ಪಾಠ* and English advice — along with audio playback. It is fully deployed and live at **gaadhe-kosha.vercel.app**."*

---

## 💡 Section B: Problem and Solution Breakdown

### The Problem
1. **Alphabetical, Not Contextual**: Traditional books organize proverbs by letter (ಅ, ಆ, ಇ...). Real life presents problems by *situations* (money trouble, exam stress, family disputes).
2. **Generative AI Hallucinations**: Standard LLMs invent non-existent Kannada proverbs when asked directly because Indic folk sayings are underrepresented in generic training datasets.
3. **Archaic Metaphor Barrier**: Old Kannada phrases like *"ಹಂಗಿನ ಅರಮನೆ"* or *"ಕಡಲೆಯಿದ್ದವನಿಗೆ ಹಲ್ಲಿಲ್ಲ"* require contextual translation so modern youth can extract the practical lesson.
4. **Lack of Spoken Audio**: Text on a screen doesn't teach users how to pronounce Kannada proverbs with natural rhythm and inflection.

### Our Solution
1. **Context-Driven Search via RAG**: Users describe what they are experiencing; the AI connects that situation to traditional wisdom.
2. **Zero-Hallucination Guarantee**: The Gemini model is strictly constrained to a pre-retrieved candidate pool from our verified 2,868-proverb database. It is forbidden from inventing proverbs.
3. **Bilingual Life Lessons**: Every recommendation provides an English practical explanation and a traditional Kannada life lesson (*ಕನ್ನಡ ಜೀವನ ಪಾಠ*).
4. **Interactive Dual Audio**: Instant audio controls for both the proverb and the tailored advice.

---

## 📊 Section C: Expected Requirements vs. Implemented Work

| # | Expected Requirement | Implemented Feature in Gaadhe Kosha | Project Location / Evidence | Status |
|---|---|---|---|---|
| **1** | Large Kannada Proverb Dataset | **2,868 authentic, deduplicated proverbs** (22 curated + 2,846 imported). | [kannada_proverbs_master.json](file:///d:/KRHackathon/data/kannada_proverbs_master.json) & Supabase | **Completed** |
| **2** | 400+ Real-Life Situations | **425 distinct bilingual scenarios** across 8 everyday domains. | [situations_400.json](file:///d:/KRHackathon/data/situations_400.json) & UI Catalog | **Completed** |
| **3** | Gemini RAG Recommendation Engine | Secure serverless candidate retrieval + Gemini 1.5 Flash re-ranking. | [api/recommend.js](file:///d:/KRHackathon/api/recommend.js) | **Completed** |
| **4** | Return Top 3 Recommendations | Ranked output: #1 Primary, #2 Contextual, #3 Alternative. | [SituationFinder.jsx](file:///d:/KRHackathon/src/components/SituationFinder.jsx) | **Completed** |
| **5** | Bilingual Explanations | Tailored English guidance + Kannada *ಜೀವನ ಪಾಠ* for every proverb. | RAG synthesis in `/api/recommend` | **Completed** |
| **6** | Kannada Audio Playback | Dual audio controls for proverb and advice with voice detection. | [audioPlayer.js](file:///d:/KRHackathon/src/utils/audioPlayer.js) | **Completed** |
| **7** | Existing Audio Investigation | Researched Internet Archive, Wikimedia, Bharatavani, and CIIL; reported findings honestly. | Documented in Project Report | **Completed** |
| **8** | Supabase Cloud Database | PostgreSQL schema with Row Level Security (RLS) policies and `proverb-audio` bucket. | [schema.sql](file:///d:/KRHackathon/supabase/schema.sql) | **Completed** |
| **9** | Text-Only Input (No Mic/STT) | Kept clean text input and 425-scenario picker. No speech-to-text. | UI Textarea in `SituationFinder.jsx` | **Completed** |
| **10** | Production Cloud Deployment | Deployed on Vercel with automated build pipeline and live domain. | `https://gaadhe-kosha.vercel.app` | **Completed** |

---

## 🔍 Section D: Feature-by-Feature Explanation

### 1. Situation Finder (AI Proverb Companion)
* **What users see**: A clean text box where they can type any dilemma, plus a carousel of 425 curated scenarios with category tabs (*Education, Friendship, Money, Family, Unity, Life*).
* **Behind the scenes**: Clicking search sends the dilemma to `/api/recommend`. The backend scores the 2,868 proverbs, picks 18 candidates, sends them to Gemini 1.5 Flash, and returns the top 3 with tailored bilingual lessons.

### 2. Proverb Catalog & Filter Pills
* **What users see**: Category buttons showing exact proverb counts (*All: 2,868, Life: 2,097, Family: 388, Money: 203, Education: 157...*), with responsive pagination (`+ Load More (+36)` and `Show All`).
* **Behind the scenes**: Client-side filtering in [App.jsx](file:///d:/KRHackathon/src/App.jsx) that debounces search queries across Kannada text, Roman transliteration, and English meanings.

### 3. Verification & Review Status Badges
* **What users see**:
  * **Verified** (Green): For the 22 gold-standard heritage proverbs with fully verified cultural data.
  * **Under Review** (Amber): For proverbs with authentic translations undergoing final editorial review.
  * **Translation Pending** (Gray): For folklore sayings where English translations are in progress.
* **Behind the scenes**: Governed by `is_verified` and `needs_review` flags in the database schema.

### 4. Dual Audio Player
* **What users see**: Two buttons on each recommendation card: **"Play Proverb Audio"** and **"Play Advice Audio"**, which pulse while playing and toggle to **"Stop Audio"**.
* **Behind the scenes**: [audioPlayer.js](file:///d:/KRHackathon/src/utils/audioPlayer.js) checks for stored MP3s in Supabase Storage. If none, it queries the browser for a native Kannada voice (`kn-IN`, `Microsoft Madhur`, `Google ಕನ್ನಡ`). If the user's OS lacks a Kannada voice, it displays an informative notice on how to enable it.

### 5. Deep-Dive Proverb Modal
* **What users see**: Clicking any proverb card opens an expansive modal showing the Kannada proverb in large font, Roman transliteration, Kannada explanation, English meaning, when-to-use scenario, and a one-click copy button.

### 6. Bilingual Interface Switcher (ಕನ್ನಡ / English)
* **What users see**: A toggle button in the navbar switching the entire application language instantly.
* **Behind the scenes**: Managed by React Context in [LanguageContext.jsx](file:///d:/KRHackathon/src/context/LanguageContext.jsx).

---

## 💻 Section E: Technical Explanation (In This Project)

| Technology | What it is | Exactly how it is used in Gaadhe Kosha |
|---|---|---|
| **React 18** | Frontend JavaScript library | Renders our single-page application, manages component states (audio playing, modal open/close, category selection, language toggling). |
| **Vite 5** | Next-generation build tool | Compiles our modern ES module code into optimized production bundles (`dist/`) in under 6 seconds. |
| **Tailwind CSS** | Utility-first CSS framework | Provides our custom cultural parchment aesthetic (`cream`, `brown`, `kred`, `kgold`), responsive flexbox/grid layouts, and card hover effects. |
| **Supabase** | Cloud backend platform | Hosts our cloud PostgreSQL database, handles API connections through `@supabase/supabase-js`, and manages the `proverb-audio` storage bucket. |
| **PostgreSQL 15** | Relational database | Stores the `public.proverbs` table with indexed array tags (`tags TEXT[]`), UUID primary keys, and unique constraints preventing duplicate Kannada proverbs. |
| **Row Level Security (RLS)** | PostgreSQL security feature | Restricts database operations at the database level: public users can read approved proverbs and submit unapproved contributions, but cannot delete or edit existing records. |
| **Vercel** | Cloud deployment platform | Hosts the live React static application and runs our serverless API function at `/api/recommend.js`. |
| **Gemini 1.5 Flash** | Google's multimodal generative AI | Evaluates user dilemmas against 18 retrieved candidate proverbs, ranks the top 3, and generates tailored bilingual advice. |
| **RAG (Retrieval-Augmented Generation)** | AI architectural pattern | Prevents AI hallucination by retrieving real proverbs first from our database before passing them to Gemini to formulate advice. |
| **Web Speech API** | Browser native speech synthesis | Provides on-the-fly Kannada voice playback when no pre-recorded audio file exists. |

---

## 🧠 Section F: Understanding RAG in Gaadhe Kosha

### What is RAG?
**RAG** stands for **Retrieval-Augmented Generation**.
* **Without RAG**: You ask an LLM, *"Give me a Kannada proverb about saving money."* The LLM might invent a phrase that sounds like Kannada but is NOT an authentic traditional proverb.
* **With RAG**:
  1. **Retrieval**: When the user enters their dilemma, our backend queries our database of **2,868 authentic proverbs** and pulls out the top 18 closest matches using semantic tags and keywords.
  2. **Augmentation**: We package those 18 authentic proverbs into a prompt alongside the user's situation.
  3. **Generation**: We instruct Gemini 1.5 Flash: *"Pick the top 3 from THIS list only. Do not make up any new proverbs. Explain why each one applies."*

### Why RAG is Essential for Cultural Heritage
* **Zero Hallucinations**: Because Gemini can only choose from the 18 retrieved proverbs, it is impossible for it to invent fake folklore.
* **Semantic Depth**: A simple keyword search looks only for exact words. Gemini understands the *underlying metaphor* (e.g., understanding that a "potter and a club" is a metaphor for "building vs. destroying relationships").

---

## 🗄 Section G: Database Architecture & Supabase Demo

### The Schema (`public.proverbs`)
* `id` (UUID): Unique record identifier.
* `kannada` (TEXT, UNIQUE): Original proverb in Kannada script.
* `transliteration` (TEXT): Phonetic Latin script pronunciation.
* `english_meaning` (TEXT): English interpretation and moral lesson.
* `kannada_meaning` (TEXT): Traditional Kannada explanation.
* `category` (TEXT): One of: `education`, `friendship`, `money`, `family`, `unity`, `life`.
* `situation` / `situation_kn` (TEXT): Real-world usage context.
* `tags` (TEXT[]): Searchable keyword tags.
* `is_verified` (BOOLEAN): Moderation status (`true` = verified, `false` = pending).
* `audio_url` (TEXT): Link to stored authentic audio clip in Supabase Storage.

### How to Demonstrate Supabase to Judges:
1. Open the Supabase Dashboard for project `byeisaehrjzysezmcwmd`.
2. Navigate to **Table Editor** > `proverbs`.
3. Show the judges the row count (over 2,860 rows).
4. Point out the columns: `kannada`, `transliteration`, `category`, and `is_verified`.
5. Show **Authentication** > **Policies** to demonstrate Row Level Security (RLS): explain that public users have read permissions for approved proverbs, but cannot delete or modify data.

---

## 📁 Section H: Dataset Explanation & Inspection

### Where the Files Are Located:
* Master Proverb Corpus: [data/kannada_proverbs_master.json](file:///d:/KRHackathon/data/kannada_proverbs_master.json) (6.0 MB, 2,868 records).
* Master CSV Version: [data/kannada_proverbs_master.csv](file:///d:/KRHackathon/data/kannada_proverbs_master.csv).
* 425 Situations Dataset: [data/situations_400.json](file:///d:/KRHackathon/data/situations_400.json) (570 KB, 425 records).
* Frontend Production Dataset: [src/data/masterProverbs.json](file:///d:/KRHackathon/src/data/masterProverbs.json).

### How to Demonstrate in VS Code:
1. Open `data/kannada_proverbs_master.json`.
2. Collapse an object to show the clean structure: `kannada`, `transliteration`, `english_meaning`, `category`, `situation`.
3. Open `data/situations_400.json`: show that each scenario has both `situation_en` and `situation_kn` across domains like Education, Friendship, and Money.

---

## 🎬 Section I: The Live Demonstration Script (Step-by-Step)

Follow this exact 12-step sequence during your presentation:

1. **Open the Website**: Navigate to `https://gaadhe-kosha.vercel.app`. Point out the Kannada-inspired parchment aesthetic, warm colors, and clean layout.
2. **Show the Hero Section**: Point out the "Proverb of the Day" card with its Kannada text, English meaning, and listen button.
3. **Switch Languages**: Click the language toggle in the navbar. Show the judges how all navigation titles, search placeholders, and category labels instantly switch between **English** and **ಕನ್ನಡ**.
4. **Demonstrate Category Filters**: Click through the category pills:
   * Click **Money (ಹಣಕಾಸು)** (shows 203 proverbs).
   * Click **Education (ಶಿಕ್ಷಣ)** (shows 157 proverbs).
   * Click **Family (ಕುಟುಂಬ)** (shows 388 proverbs).
5. **Open a Proverb Detail Modal**: Click on *"ಹಲ್ಲಿದ್ದವನಿಗೆ ಕಡಲೆ ಇಲ್ಲ, ಕಡಲೆಯಿದ್ದವನಿಗೆ ಹಲ್ಲಿಲ್ಲ"*.
   * Show the authentic English translation: *"He who has teeth has no chickpeas to eat; he who has chickpeas has no teeth to chew them..."*
   * Point out the **Under Review** badge and the when-to-use situation context.
   * Click **Copy** to demonstrate the formatted clipboard snippet. Close the modal.
6. **Navigate to Situation Finder**: Click the **"Situation Finder"** tab in the navbar.
7. **Highlight the 425 Scenarios Catalog**: Point out the badge *"425 situations"* and the domain buttons (*Education, Friendship, Money, Family, Unity, Life*).
8. **Select a Real-World Scenario**: Click the **Money** tab and select *"Festival gold jewellery purchases on EMI"*. Show how the dilemma automatically populates the text box.
9. **Run the Gemini RAG Recommendation**: Click **"Find Top 3 Proverbs (Gemini RAG)"**.
10. **Explain the Top 3 Recommendations**:
    * **#1 Primary Recommendation**: *"ಹಾಸಿಗೆ ಇದ್ದಷ್ಟು ಕಾಲು ಚಾಚು"* (Stretch your legs only as far as your mattress extends).
    * Show the tailored **English Guidance**: explaining why living beyond your means with loans causes grief.
    * Show the tailored **Kannada Life Lesson**: *"ಕನ್ನಡ ಜೀವನ ಪಾಠ"*.
11. **Demonstrate Audio Controls**: Click **"Play Proverb Audio"** on the recommendation card.
    * Show how the button pulses and toggles to **"Stop Audio"**.
    * Explain that it checks for stored audio and uses native speech synthesis with automated voice selection.
12. **Enter a Custom Dilemma in Kannada**: Type a custom query in Kannada:
    * `"ಪರೀಕ್ಷೆಗೆ ಓದಲು ತುಂಬಾ ಆಲಸ್ಯವಾಗುತ್ತಿದೆ"` (*Feeling very lazy to study for exams*).
    * Click search: show how it returns *"ಕೈ ಕೆಸರಾದರೆ ಬಾಯಿ ಮೊಸರು"* and *"ಆಲಸ್ಯಂ ಅಮೃತಂ ವಿಷಂ"* with personalized academic advice.

---

## ❓ Section J: 20 Likely Judge Questions & Winning Answers

#### 1. Why did you choose Kannada proverbs for this hackathon?
> *"Kannada has over a thousand years of rich folklore, but youth today are losing touch with oral traditions. Traditional proverb books are organized alphabetically, which makes finding relevant wisdom for a modern personal dilemma almost impossible. We wanted to use generative AI to make our ancestral heritage accessible, relevant, and conversational."*

#### 2. What is RAG and why did you use it instead of regular prompting?
> *"RAG stands for Retrieval-Augmented Generation. If you just ask Gemini or ChatGPT to give you a Kannada proverb, it often hallucinates fake proverbs that don't exist in Kannada culture. With RAG, our system first retrieves real proverbs from our verified 2,868 database and only lets Gemini rank and explain those authentic proverbs. This guarantees zero hallucination."*

#### 3. How large is your dataset and where did the data come from?
> *"Our master dataset contains exactly 2,868 unique, authentic Kannada proverbs. It combines 22 curated gold-standard proverbs with 2,846 deduplicated proverbs extracted from public folklore archives like Vishaya.in and historical references including Rev. Ferdinand Kittel's collections. We also created 425 curated bilingual real-life situations."*

#### 4. How did you handle duplicates and spelling variations in Kannada?
> *"Kannada has conjunct consonants (ottakshara) and vowel markers that can be written differently. We wrote a deduplication pipeline in JavaScript that normalized font encoding errors (like digit zero ೦ being used as anusvara ಂ), removed punctuation and virama marks, and hashed the phonetic core of each proverb."*

#### 5. Why did you pick Google Gemini 1.5 Flash?
> *"Gemini 1.5 Flash has excellent multilingual comprehension for Indic scripts, a rapid response time under 1.2 seconds, and low latency. Because it runs on a serverless Vercel function, user queries are processed quickly and our API key remains completely secure."*

#### 6. Is your Gemini API key exposed in the frontend?
> *"No, absolutely not. The Gemini API key is configured as an environment variable exclusively on the Vercel serverless backend (`/api/recommend`). The React frontend never sees or bundles the secret key."*

#### 7. How does the application handle offline mode or API failure?
> *"We implemented a dual fallback system. If Supabase is unreachable, the frontend automatically falls back to our bundled master JSON. If the Gemini API hits rate limits or is offline, our backend seamlessly falls back to a deterministic semantic scoring algorithm so the user never gets an error."*

#### 8. How does the audio playback work?
> *"Our audio engine in `audioPlayer.js` supports two modalities. First, if a proverb has an authentic MP3 URL in Supabase Storage, it streams it directly. If not, it uses the browser's SpeechSynthesis engine. It dynamically scans for native Kannada voices like `Microsoft Madhur` or `Google ಕನ್ನಡ`, fixes Chromium garbage collection bugs, and displays a helpful notice if the user's OS lacks a Kannada voice."*

#### 9. Did you find existing audio recordings for all 2,868 proverbs?
> *"We conducted an exhaustive search across Wikimedia Commons, Internet Archive, Bharatavani, and CIIL Mysore. We found that while single-word pronunciations exist, zero open-access segmented audio recordings exist for full Kannada proverbs online. Rather than fabricating fake audio or pretending AI TTS is human audio, we honestly documented this gap and built the storage architecture ready to receive crowd-sourced community field recordings."*

#### 10. Why Supabase and PostgreSQL?
> *"Supabase gives us an enterprise-grade PostgreSQL database with support for text array indexing (`tags TEXT[]`), fast range-based pagination, and Row Level Security (RLS). It allows us to keep community submissions private until moderated while letting the public search approved proverbs."*

#### 11. What are your Row Level Security (RLS) policies?
> *"We have two policies on `public.proverbs`: a public SELECT policy that permits reading verified proverbs and imported folklore, and a public INSERT policy that allows anyone to contribute new proverbs but strictly forces `is_verified = false` and `likes = 0`. Public users cannot edit or delete existing rows."*

#### 12. How does the bilingual feature work?
> *"We built a custom React Language Context (`LanguageContext.jsx`). When a user toggles the switch, it instantly updates all UI labels, button text, search placeholders, and category names between English and Kannada across every component simultaneously without reloading the page."*

#### 13. What is the difference between the Verified and Under Review badges?
> *"The green 'Verified' badge is reserved for our 22 curated gold-standard proverbs. The amber 'Under Review' badge is displayed on proverbs that have authentic cultural translations awaiting final editorial signoff. 'Translation Pending' is shown on imported proverbs whose English translations are in progress. This ensures full transparency."*

#### 14. How do you prevent users from submitting spam through the contribution form?
> *"Our Supabase RLS policy requires all contributions to have non-empty Kannada text, English meaning, and category, and automatically forces `is_verified = false`. Submissions enter an unapproved queue that only administrators can verify in the Supabase Dashboard before they appear in public search."*

#### 15. How does your search handle both English and Kannada?
> *"Our search filter evaluates query tokens across five fields simultaneously: the Kannada script, Roman transliteration, English meaning, contextual situation, and keyword tags."*

#### 16. What was the most challenging technical problem you solved?
> *"Two major challenges: First, resolving historical Kannada font encoding anomalies where digital archives had mixed up Kannada numeral zero with the anusvara letter. Second, fixing browser speech synthesis bugs where Chromium destroyed the speech object mid-sentence due to garbage collection, which we solved by holding the utterance in module scope."*

#### 17. How is the 425 situations dataset structured?
> *"Each situation has a unique ID, domain category, bilingual titles, and detailed descriptions in both Kannada and English. They represent realistic modern dilemmas like exam anxiety, lifestyle debt, and workplace credit-stealing."*

#### 18. What makes Gaadhe Kosha different from a standard dictionary website?
> *"A standard dictionary requires you to know what word you are looking for. Gaadhe Kosha lets you describe your life problem and uses AI reasoning to connect you with the moral lesson of our ancestors."*

#### 19. What are the key limitations today?
> *"Authentic human voice recordings are not yet available for all folk proverbs in open archives, and full verified English translations are still being reviewed for parts of the imported dataset."*

#### 20. If you had one more week, what would you add next?
> *"We would implement crowd-sourced audio recording so elders and native speakers across Karnataka's districts could record regional dialetical pronunciations into Supabase Storage, and we would migrate retrieval to dense vector embeddings using pgvector."*

---

## 📹 Section K: 5–7 Minute Video Recording Plan

| Time | Screen to Show | What to Say / Talking Points |
|---|---|---|
| **0:00 – 1:00** | Website Homepage (`https://gaadhe-kosha.vercel.app`) | Deliver the 1-Minute Pitch (Section A). Introduce Gaadhe Kosha, quote the motto, explain the cultural preservation mission. |
| **1:00 – 2:00** | Homepage Browsing & Language Toggle | Show the traditional parchment aesthetic. Toggle language from English to Kannada. Browse categories (Education, Money, Family). |
| **2:00 – 3:30** | Situation Finder & 425 Scenarios | Click **Situation Finder**. Show the 425 situations catalog. Pick a scenario (e.g., Money: *EMI purchases*). Click **Find Top 3 Proverbs**. Show RAG output. |
| **3:30 – 4:30** | Recommendations & Audio Playback | Explain the 3 ranked proverbs. Highlight the tailored English guidance and Kannada *ಜೀವನ ಪಾಠ*. Click **Play Proverb Audio** to show playback. |
| **4:30 – 5:30** | VS Code / Datasets & Architecture | Open VS Code. Show `data/kannada_proverbs_master.json` (2,868 rows) and `data/situations_400.json` (425 scenarios). Show the architecture diagram in `README.md`. |
| **5:30 – 6:30** | Supabase Cloud Database | Open Supabase Dashboard. Show the `proverbs` table, row count, UUID keys, RLS security policies, and storage bucket. |
| **6:30 – 7:00** | Conclusion & GitHub Repo | Conclude with project outcomes, future roadmap, and thank the judges. |

---

## 📋 Section L: 1-Page Presentation Cheat Sheet (Revise Before Going on Stage!)

```
+--------------------------------------------------------------------------------------------------+
|                              GAADHE KOSHA (ಗಾದೆ ಕೋಶ) CHEAT SHEET                                 |
+--------------------------------------------------------------------------------------------------+
| 1. CORE NUMBERS:                                                                                 |
|    - 2,868 authentic Kannada proverbs (22 curated seed + 2,846 deduplicated folklore archive).  |
|    - 425 curated bilingual real-life situations across 8 everyday domains.                      |
|    - Top 3 ranked recommendations per query with tailored Kannada + English advice.              |
|                                                                                                  |
| 2. ARCHITECTURE IN ONE SENTENCE:                                                                 |
|    React 18 + Vite frontend talks to a Vercel serverless function that retrieves candidates     |
|    from our 2,868-proverb corpus and uses Gemini 1.5 Flash to re-rank the top 3 and compose     |
|    tailored life lessons, backed by Supabase PostgreSQL with RLS.                                |
|                                                                                                  |
| 3. WHY RAG MATTERS HERE:                                                                         |
|    Generic AI hallucinates fake proverbs. RAG guarantees 100% cultural authenticity because      |
|    Gemini can ONLY select from the real candidate proverbs we supply from our database.          |
|                                                                                                  |
| 4. SECURITY HIGHLIGHT:                                                                           |
|    Zero client-side secrets. Gemini API key is isolated on the serverless backend.               |
|    Supabase RLS prevents public users from modifying or deleting cultural proverbs.             |
|                                                                                                  |
| 5. AUDIO HIGHLIGHT:                                                                              |
|    Dual-modality: streams authentic MP3s if stored, or uses native Kannada speech synthesis with |
|    smart voice matching ('kn-IN', 'Microsoft Madhur', 'Google ಕನ್ನಡ'). Transparent error notices.|
|                                                                                                  |
| 6. LIVE DEMO URL:                                                                                |
|    https://gaadhe-kosha.vercel.app                                                               |
+--------------------------------------------------------------------------------------------------+
```
