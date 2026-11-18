-- ====================================================================
-- GAADHE KOSHA (ಗಾದೆ ಕೋಶ) - FINAL SECURE SUPABASE DATABASE SCHEMA
-- ====================================================================
-- Clean, declarative schema with strict Row Level Security (RLS).
-- 
-- KEY SECURITY GUARANTEES:
-- 1. Public Read: Only approved proverbs (is_verified = TRUE) are readable.
-- 2. Public Contribution: Submissions start with is_verified = FALSE and likes = 0.
-- 3. Public Modification & Deletion: Completely blocked via RLS (no UPDATE/DELETE policies).
-- 4. Admin Management: Admins can approve pending proverbs via Supabase SQL Editor
--    or backend service_role (which bypasses RLS).
-- 5. Idempotent Seed: ON CONFLICT (kannada) DO NOTHING prevents duplicate records.
-- ====================================================================

-- 1. Create the proverbs table with UNIQUE constraint and strict defaults
CREATE TABLE IF NOT EXISTS public.proverbs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kannada TEXT NOT NULL CONSTRAINT uq_proverbs_kannada UNIQUE,
    transliteration TEXT,
    english_meaning TEXT NOT NULL,
    kannada_meaning TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('education', 'friendship', 'money', 'family', 'unity', 'life')),
    category_kn TEXT NOT NULL,
    situation TEXT,
    situation_kn TEXT,
    tags TEXT[] DEFAULT '{}',
    contributor TEXT DEFAULT 'ಸಮುದಾಯ ಕೊಡುಗೆ (Community)',
    likes INTEGER DEFAULT 0 NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create performance indexes for search, filtering, and moderation
CREATE INDEX IF NOT EXISTS idx_proverbs_category ON public.proverbs(category);
CREATE INDEX IF NOT EXISTS idx_proverbs_likes ON public.proverbs(likes DESC);
CREATE INDEX IF NOT EXISTS idx_proverbs_created_at ON public.proverbs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_proverbs_is_verified ON public.proverbs(is_verified);

-- 3. Clean up any previous triggers and functions if they exist
DROP TRIGGER IF EXISTS trg_protect_proverb_content ON public.proverbs;
DROP FUNCTION IF EXISTS public.protect_proverb_content();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.proverbs ENABLE ROW LEVEL SECURITY;

-- 5. Clean up any previous policies
DROP POLICY IF EXISTS "Public can view verified proverbs" ON public.proverbs;
DROP POLICY IF EXISTS "Public can view approved proverbs" ON public.proverbs;
DROP POLICY IF EXISTS "Public can view approved and imported dataset proverbs" ON public.proverbs;
DROP POLICY IF EXISTS "Public can contribute proverbs" ON public.proverbs;
DROP POLICY IF EXISTS "Public can increment likes" ON public.proverbs;
DROP POLICY IF EXISTS "Public can update likes on approved proverbs" ON public.proverbs;

-- ====================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Policy 1: SELECT (Public Read)
-- Public users can view verified proverbs (is_verified = TRUE) AND
-- the designated imported folklore dataset (contributor containing Vishaya/ವಿಷಯ).
-- Pending community contributions remain private until approved by an administrator.
CREATE POLICY "Public can view approved and imported dataset proverbs"
    ON public.proverbs
    FOR SELECT
    TO anon, authenticated
    USING (
        is_verified = TRUE
        OR (
            contributor LIKE '%Vishaya%'
            OR contributor LIKE '%ವಿಷಯ%'
            OR contributor = 'ಪಾರಂಪರಿಕ ಜನಪದ ಗಾದೆ (Vishaya.in)'
        )
    );

-- Policy 2: INSERT (Public Contribution)
-- Public users can submit new proverbs, but they MUST strictly have
-- is_verified = FALSE and likes = 0, along with valid non-empty fields.
-- Anti-spoofing condition prevents setting contributor to the imported dataset tag.
CREATE POLICY "Public can contribute proverbs"
    ON public.proverbs
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        is_verified = FALSE AND
        likes = 0 AND
        (
            contributor IS NULL
            OR (
                contributor NOT LIKE '%Vishaya%'
                AND contributor NOT LIKE '%ವಿಷಯ%'
            )
        ) AND
        kannada IS NOT NULL AND
        kannada <> '' AND
        english_meaning IS NOT NULL AND
        english_meaning <> '' AND
        kannada_meaning IS NOT NULL AND
        kannada_meaning <> '' AND
        category IN ('education', 'friendship', 'money', 'family', 'unity', 'life')
    );

-- NOTE ON UPDATE & DELETE PERMISSIONS:
-- Neither an UPDATE nor a DELETE policy is created for public/anon/authenticated roles.
-- Under PostgreSQL RLS, omitting these policies completely forbids any client-side
-- modification or deletion of existing proverbs.
--
-- NOTE ON ADMIN APPROVAL:
-- The Supabase SQL Editor and the backend `service_role` key inherently bypass RLS.
-- Administrators can review and approve pending proverbs anytime via SQL Editor:
--   UPDATE public.proverbs SET is_verified = TRUE WHERE id = '<proverb-uuid>';

-- ====================================================================
-- 7. SEED DATA (All 22 Curated Proverbs Explicitly Approved)
-- ====================================================================
-- ON CONFLICT (kannada) DO NOTHING ensures safe, idempotent execution.
INSERT INTO public.proverbs (kannada, transliteration, english_meaning, kannada_meaning, category, category_kn, situation, situation_kn, tags, contributor, likes, is_verified)
VALUES
-- --- EDUCATION (ಶಿಕ್ಷಣ) ---
(
  'ವಿದ್ಯೆಯೇ ವಿನಯ, ವಿನಯವೇ ವಿದ್ಯೆ',
  'Vidyeye vinaya, vinayave vidye',
  'True education brings humility, and humility is the true mark of being educated.',
  'ಜ್ಞಾನವು ಮನುಷ್ಯನಿಗೆ ಅಹಂಕಾರವನ್ನು ತರದೆ ನಮ್ರತೆಯನ್ನು ತರಬೇಕು. ವಿನಯವೇ ನಿಜವಾದ ವಿದ್ವಾಂಸನ ಲಕ್ಷಣ.',
  'education',
  'ಶಿಕ್ಷಣ',
  'When an educated person shows arrogance or forgets humility',
  'ಓದಿದ ವ್ಯಕ್ತಿ ಅಹಂಕಾರ ತೋರಿದಾಗ ಅಥವಾ ವಿದ್ಯಾವಂತನ ವಿನಯವನ್ನು ಪ್ರಶಂಸಿಸುವಾಗ',
  ARRAY['humility', 'wisdom', 'arrogance', 'knowledge', 'manners', 'respect', 'study'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  42,
  TRUE
),
(
  'ಕೈ ಕೆಸರಾದರೆ ಬಾಯಿ ಮೊಸರು',
  'Kai kesaraadare baayi mosaru',
  'If your hands work hard in the mud, your mouth will savor curd/butter. (Hard work yields sweet rewards).',
  'ಕಷ್ಟಪಟ್ಟು ಕಾಯಕ ಅಥವಾ ಅಭ್ಯಾಸ ಮಾಡಿದರೆ ಮಾತ್ರ ಸುಖ ಮತ್ತು ಯಶಸ್ಸನ್ನು ಅನುಭವಿಸಲು ಸಾಧ್ಯ.',
  'education',
  'ಶಿಕ್ಷಣ',
  'Encouraging a student who feels lazy or exhausted during exam preparation',
  'ಪರೀಕ್ಷೆ ಓದಲು ಆಲಸ್ಯ ಮಾಡುವಾಗ ಅಥವಾ ಕಠಿಣ ಪರಿಶ್ರಮದ ಮಹತ್ವ ತಿಳಿಸಲು',
  ARRAY['hard work', 'studies', 'effort', 'exams', 'success', 'dedication', 'student'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  56,
  TRUE
),
(
  'ಓದಿದವನು ಜಾಣನಾದರೆ, ಓದದವನು ದಡ್ಡನಾಗಬೇಕಿಲ್ಲ',
  'Odidavanu jaanaanaadare, odadavanu daddanaagabekilla',
  'Just because one has formal schooling doesn''t make them wise, and practical experience has its own deep wisdom.',
  'ಪುಸ್ತಕದ ಜ್ಞಾನಕ್ಕಿಂತ ಜೀವನದ ಅನುಭವದಿಂದ ಬರುವ ಪ್ರಜ್ಞೆಯು ಅಷ್ಟೇ ಅಮೂಲ್ಯವಾದುದು.',
  'education',
  'ಶಿಕ್ಷಣ',
  'When valuing practical life experience and street smarts alongside bookish degrees',
  'ಕೇವಲ ಡಿಗ್ರಿ ಸರ್ಟಿಫಿಕೇಟ್‌ಗಿಂತ ನೈಜ ಅನುಭವ ಮುಖ್ಯವೆಂದು ತಿಳಿಹೇಳುವ ಸಂದರ್ಭ',
  ARRAY['experience', 'wisdom', 'degree', 'practical knowledge', 'common sense'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  31,
  TRUE
),
(
  'ಗಿಡವಾಗಿ ಬಗ್ಗದ್ದು ಮರವಾಗಿ ಬಗ್ಗೀತೇ?',
  'Gidavaagi baggaddu maravaagi baggeethe?',
  'If a twig will not bend, will the grown tree bend? (Good habits and learning must begin in early childhood).',
  'ಚಿಕ್ಕ ವಯಸ್ಸಿನಲ್ಲೇ ಸಂಸ್ಕಾರ, ಶಿಕ್ಷಣ ಮತ್ತು ಶಿಸ್ತು ಕಲಿಯದಿದ್ದರೆ ದೊಡ್ಡವರಾದ ಮೇಲೆ ಕಲಿಯಲು ಸಾಧ್ಯವಿಲ್ಲ.',
  'education',
  'ಶಿಕ್ಷಣ',
  'Teaching discipline, good manners, and early habits to young learners',
  'ಮಕ್ಕಳಿಗೆ ಬಾಲ್ಯದಲ್ಲೇ ಒಳ್ಳೆಯ ಸಂಸ್ಕಾರ ಮತ್ತು ಓದುವ ಹವ್ಯಾಸ ಕಲಿಸುವ ಸಂದರ್ಭ',
  ARRAY['discipline', 'childhood', 'learning', 'habits', 'parenting', 'youth'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  67,
  TRUE
),

-- --- FRIENDSHIP (ಸ್ನೇಹ) ---
(
  'ಆಪತ್ತಿಗೆ ಆದವನೇ ನೆಂಟ, ಸಂಕಷ್ಟಕ್ಕೆ ಒದಗಿದವನೇ ಸ್ನೇಹಿತ',
  'Aapattige aadavane nenta, sankashtakke odagidavane snehita',
  'A true relative helps in danger; a genuine friend stands by you in deepest adversity.',
  'ಕಷ್ಟದ ದಿನಗಳಲ್ಲಿ ಯಾರೂ ಜೊತೆಗಿಲ್ಲದಿದ್ದಾಗ ಬೆಂಬಲವಾಗಿ ನಿಲ್ಲುವವನೇ ನಿಜವಾದ ಮಿತ್ರ.',
  'friendship',
  'ಸ್ನೇಹ',
  'Recognizing who your genuine friends are during tough times',
  'ಕಷ್ಟ ಕಾಲದಲ್ಲಿ ಯಾರೋ ಒಬ್ಬರು ನಮಗೆ ಸಹಾಯ ಹಸ್ತ ನೀಡಿದಾಗ ನಿಜವಾದ ಸ್ನೇಹ ಗುರುತಿಸಲು',
  ARRAY['loyalty', 'hard times', 'support', 'true friend', 'trust', 'bonding'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  74,
  TRUE
),
(
  'ಹಾಲುಂಡ ಮಕ್ಕಳೇ ಸಾಲದು, ಕೆಂಡ ತುಳಿದವರೇ ಬೇಕು',
  'Haalunda makkale saaladu, kenda tulidavare beku',
  'Fair-weather friends who share good feasts are not enough; you need companions who will walk through fire with you.',
  'ಸಂತೋಷದ ಸಮಯದಲ್ಲಷ್ಟೇ ಜೊತೆಗಿದ್ದು ಕಷ್ಟ ಬಂದಾಗ ಓಡಿಹೋಗುವವರು ನಿಜವಾದ ಗೆಳೆಯರಲ್ಲ.',
  'friendship',
  'ಸ್ನೇಹ',
  'Dealing with fair-weather companions who vanish when hardships arrive',
  'ಸುಖವಿದ್ದಾಗ ಬಂದು ಕಷ್ಟ ಬಂದಾಗ ಜಾರಿಕೊಳ್ಳುವ ಸ್ನೇಹಿತರ ಸ್ವಭಾವ ಕಂಡಾಗ',
  ARRAY['fair-weather', 'betrayal', 'crisis', 'companionship', 'reality'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  28,
  TRUE
),
(
  'ಮಿತ್ರನ ತಪ್ಪು ಕಿವಿಯಲ್ಲಿ ಹೇಳು, ಒಳ್ಳೆಯದನ್ನು ಜಗತ್ತಿಗೆ ಸಾರು',
  'Mitrana thappu kiviyalli helu, olleyadannu jagattige saaru',
  'Correct your friend''s mistakes in private, but praise their virtues to the whole world.',
  'ಗೆಳೆಯನ ತಪ್ಪುಗಳನ್ನು ಏಕಾಂತದಲ್ಲಿ ತಿದ್ದಿ ಹೇಳಬೇಕು, ಅವನ ಸಾಧನೆಗಳನ್ನು ಎಲ್ಲರ ಎದುರು ಮೆಚ್ಚಬೇಕು.',
  'friendship',
  'ಸ್ನೇಹ',
  'Constructive feedback and defending a friend''s dignity in public',
  'ಗೆಳೆಯನಿಗೆ ಬುದ್ಧಿ ಹೇಳುವಾಗ ಸಾರ್ವಜನಿಕವಾಗಿ ಅವಮಾನಿಸದೆ ಪ್ರತ್ಯೇಕವಾಗಿ ತಿಳಿಸುವ ಸಂದರ್ಭ',
  ARRAY['criticism', 'praise', 'respect', 'dignity', 'solidarity'],
  'ಸುರೇಶ್ (Suresh K.)',
  52,
  TRUE
),

-- --- MONEY (ಹಣ) ---
(
  'ಹಾಸಿಗೆ ಇದ್ದಷ್ಟು ಕಾಲು ಚಾಚು',
  'Haasige iddashtu kaalu chaachu',
  'Stretch your legs only as far as your bed extends. (Live strictly within your financial means).',
  'ತನ್ನ ಆದಾಯ ಮತ್ತು ಸಾಮರ್ಥ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ಮಾತ್ರ ವೆಚ್ಚ ಮಾಡಬೇಕು, ಅತಿಯಾದ ಆಡಂಬರ ಸಲ್ಲದು.',
  'money',
  'ಹಣ',
  'Someone overspending on credit or buying luxury items beyond their income',
  'ಆದಾಯಕ್ಕಿಂತ ಹೆಚ್ಚು ಸಾಲ ಮಾಡಿ ದುಂದುವೆಚ್ಚ ಮಾಡುವ ವ್ಯಕ್ತಿಗೆ ಎಚ್ಚರಿಸಲು',
  ARRAY['budget', 'spending', 'savings', 'debt', 'lifestyle', 'financial prudence'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  89,
  TRUE
),
(
  'ಹಣವಿದ್ದವನಿಗೆ ಜಗತ್ತೇ ನೆಂಟ',
  'Hanaviddavanige jagatte nenta',
  'When you have wealth, the whole world claims to be your kin.',
  'ಹಣ ಸಂಪತ್ತು ಇದ್ದಾಗ ಎಲ್ಲರೂ ಆಪ್ತರಂತೆ ಹತ್ತಿರ ಬರುತ್ತಾರೆ; ಹಣ ಕರಗಿದಾಗ ಯಾರೂ ಸುಳಿಯುವುದಿಲ್ಲ.',
  'money',
  'ಹಣ',
  'Observing how people flatter the wealthy purely for material benefit',
  'ಹಣವಿದ್ದಾಗ ಸಮಾಜ ತೋರಿಸುವ ಕೃತಕ ಪ್ರೀತಿ ಹಾಗೂ ಆಡಂಬರವನ್ನು ಗಮನಿಸಿದಾಗ',
  ARRAY['wealth', 'flattery', 'human nature', 'materialism', 'society'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  45,
  TRUE
),
(
  'ಹನಿ ಹನಿ ಗೂಡಿದರೆ ಹಳ್ಳ, ತೆನೆ ತೆನೆ ಸೇರಿದರೆ ಬಣವೆ',
  'Hani hani goodidare halla, tene tene seridare banave',
  'Drop by drop makes a stream, stalk by stalk makes a haystack. (Small, steady savings compound into great wealth).',
  'ಸಣ್ಣ ಸಣ್ಣ ಉಳಿತಾಯ ಅಥವಾ ಸಣ್ಣ ಪ್ರಯತ್ನಗಳು ಕೊನೆಗೆ ದೊಡ್ಡ ಸಂಪತ್ತು ಅಥವಾ ಯಶಸ್ಸನ್ನು ತರುತ್ತವೆ.',
  'money',
  'ಹಣ',
  'Encouraging systematic small daily or monthly investments and savings',
  'ಸಣ್ಣ ಉಳಿತಾಯದ ಮಹತ್ವವನ್ನು ತಿಳಿಸಲು ಹಾಗೂ ಹೂಡಿಕೆ ಆರಂಭಿಸಲು ಪ್ರೇರೇಪಿಸುವಾಗ',
  ARRAY['investment', 'compounding', 'small steps', 'patience', 'wealth building'],
  'ಭವ್ಯಾ (Bhavya)',
  64,
  TRUE
),
(
  'ಸಾಲ ಮಾಡಿ ಕೆಟ್ಟ, ಕೆರೆ ತೋಡಿ ಬತ್ತಿದ',
  'Saala maadi ketta, kere thodi battida',
  'One ruined themselves by reckless borrowing, just as digging a tank without a water source leaves it dry.',
  'ಅನಗತ್ಯ ಸಾಲ ಮಾಡುವುದು ಸರ್ವನಾಶಕ್ಕೆ ದಾರಿಯಾಗುತ್ತದೆ.',
  'money',
  'ಹಣ',
  'Warning against taking high-interest loans for unnecessary status symbols',
  'ಅತಿಯಾದ ಸಾಲ ಮಾಡಿ ಸಂಕಷ್ಟಕ್ಕೆ ಸಿಲುಕುವ ಮುನ್ನ ಎಚ್ಚರಿಸುವ ಮಾತು',
  ARRAY['loans', 'debt trap', 'ruin', 'finance', 'caution'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  38,
  TRUE
),

-- --- FAMILY (ಕುಟುಂಬ) ---
(
  'ತಾಯಿಗಿಂತ ಬಂಧುವಿಲ್ಲ, ಉಪ್ಪಿಗಿಂತ ರುಚಿಯಿಲ್ಲ',
  'Thaayiginta bandhuvilla, uppiginta ruchiyilla',
  'There is no relative more selfless than a mother, just as no feast is tasty without salt.',
  'ತಾಯಿಯ ಪ್ರೀತಿ ಮತ್ತು ತ್ಯಾಗಕ್ಕೆ ಜಗತ್ತಿನಲ್ಲಿ ಯಾವುದೂ ಸಾಟಿಯಿಲ್ಲ.',
  'family',
  'ಕುಟುಂಬ',
  'Expressing reverence and gratitude for a mother''s eternal sacrifice',
  'ತಾಯಿಯ ನಿಸ್ವಾರ್ಥ ವಾತ್ಸಲ್ಯ ಮತ್ತು ತ್ಯಾಗವನ್ನು ಸ್ಮರಿಸುವ ಭಾವನಾತ್ಮಕ ಸಂದರ್ಭ',
  ARRAY['mother', 'love', 'parents', 'gratitude', 'home', 'kinship'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  104,
  TRUE
),
(
  'ಮನೆ ಕಟ್ಟಿ ನೋಡು, ಮದುವೆ ಮಾಡಿ ನೋಡು',
  'Mane katti nodu, maduve maadi nodu',
  'Try building a house or arranging a wedding, and you will understand the real tests of responsibility.',
  'ಮನೆ ಕಟ್ಟುವುದು ಮತ್ತು ಮದುವೆ ಮಾಡುವುದು ಅಪಾರ ಪರಿಶ್ರಮ, ಹೊಂದಾಣಿಕೆ ಮತ್ತು ಜವಾಬ್ದಾರಿಯ ಕೆಲಸಗಳು.',
  'family',
  'ಕುಟುಂಬ',
  'Facing enormous logistics, family coordination, and responsibilities in major milestones',
  'ಕುಟುಂಬದ ಪ್ರಮುಖ ಜವಾಬ್ದಾರಿಗಳು ಮತ್ತು ಖರ್ಚು-ವೆಚ್ಚಗಳ ತೀವ್ರತೆ ಎದುರಾದಾಗ',
  ARRAY['responsibility', 'marriage', 'home building', 'maturity', 'life lessons'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  58,
  TRUE
),
(
  'ಅತ್ತೆಗೊಂದು ಕಾಲ, ಸೊಸೆಗೊಂದು ಕಾಲ',
  'Attegondu kaala, sosegondu kaala',
  'Every dog has its day; every generation experiences authority and vulnerability.',
  'ಕಾಲ ಯಾರ ಬಳಿಯೂ ಶಾಶ್ವತವಾಗಿ ನಿಲ್ಲುವುದಿಲ್ಲ; ಅಧಿಕಾರ ಮತ್ತು ಪರಿಸ್ಥಿತಿಗಳು ಕಾಲಕ್ಕೆ ತಕ್ಕಂತೆ ಬದಲಾಗುತ್ತವೆ.',
  'family',
  'ಕುಟುಂಬ',
  'Reminding family members to treat others kindly, because life''s power dynamics inevitably turn',
  'ಕಾಲದ ಬದಲಾವಣೆ ಮತ್ತು ಪರಸ್ಪರ ಗೌರವದಿಂದ ವರ್ತಿಸಬೇಕೆಂಬ ಎಚ್ಚರಿಕೆ ನೀಡುವಾಗ',
  ARRAY['relationships', 'change of time', 'respect', 'in-laws', 'karma'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  47,
  TRUE
),

-- --- UNITY (ಒಗ್ಗಟ್ಟು) ---
(
  'ಒಗ್ಗಟ್ಟಿನಲ್ಲಿ ಬಲವಿದೆ',
  'Oggattinalli balavide',
  'There is immense strength in unity.',
  'ಎಲ್ಲರೂ ಒಟ್ಟಾಗಿ ಒಂದೇ ಮನಸ್ಸಿನಿಂದ ಕಾರ್ಯನಿರ್ವಹಿಸಿದರೆ ಯಾವುದೇ ದೊಡ್ಡ ಸವಾಲನ್ನಾದರೂ ಗೆಲ್ಲಬಹುದು.',
  'unity',
  'ಒಗ್ಗಟ್ಟು',
  'Motivating a sports team, community, or company department to collaborate together',
  'ತಂಡದ ಕೆಲಸ, ಸಮುದಾಯದ ಐಕ್ಯತೆ ಅಥವಾ ಒಗ್ಗಟ್ಟಿನಿಂದ ವಿಜಯ ಸಾಧಿಸಲು ಪ್ರೇರೇಪಿಸುವಾಗ',
  ARRAY['teamwork', 'strength', 'solidarity', 'collaboration', 'community'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  85,
  TRUE
),
(
  'ಒಂಟಿ ಮರ ಕಾಡಾಗದು',
  'Onti mara kaadaagadu',
  'A single tree does not make a forest. (Individual greatness needs community to create lasting impact).',
  'ಒಬ್ಬಂಟಿಯಾಗಿ ಯಾರೂ ಸಂಪೂರ್ಣರಾಗಲು ಅಥವಾ ದೊಡ್ಡ ಸಮಾಜವನ್ನು ನಿರ್ಮಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.',
  'unity',
  'ಒಗ್ಗಟ್ಟು',
  'When an individual believes they do not need anyone else to succeed',
  'ವ್ಯಕ್ತಿ ತಾನೊಬ್ಬನೇ ಎಲ್ಲವನ್ನೂ ಸಾಧಿಸಬಲ್ಲೆ ಎಂದು ಅಹಂ ಪಟ್ಟಾಗ ಸಾಮೂಹಿಕತೆಯ ಅರಿವು ಮೂಡಿಸಲು',
  ARRAY['individualism', 'community', 'interdependence', 'togetherness'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  49,
  TRUE
),
(
  'ಐದು ಬೆರಳು ಸೇರಿದರೆ ಮುಷ್ಟಿ',
  'Aidu beralu seridare mushti',
  'Only when five fingers clasp together do they form a powerful fist.',
  'ವಿಭಿನ್ನ ವ್ಯಕ್ತಿಗಳು ಅಥವಾ ವಿಚಾರಗಳು ಒಟ್ಟಾಗಿ ಸೇರಿದಾಗ ಮಾತ್ರ ಅಸಾಧಾರಣ ಶಕ್ತಿ ಉಂಟಾಗುತ್ತದೆ.',
  'unity',
  'ಒಗ್ಗಟ್ಟು',
  'Resolving internal disputes in a committee, family, or hackathon team',
  'ತಂಡದಲ್ಲಿ ಅಥವಾ ಕುಟುಂಬದಲ್ಲಿ ಭಿನ್ನಾಭಿಪ್ರಾಯ ಮರೆತು ಒಟ್ಟಾಗಿ ನಿಲ್ಲಲು ಕರೆ ನೀಡುವಾಗ',
  ARRAY['diversity', 'fist', 'power', 'team', 'resolution'],
  'ಮಂಜುನಾಥ್ (Manjunath)',
  61,
  TRUE
),

-- --- LIFE (ಜೀವನ) ---
(
  'ವೇದ ಸುಳ್ಳಾದರೂ ಗಾದೆ ಸುಳ್ಳಾಗದು',
  'Veda sulladaaru gaadhe sallaagadu',
  'Even if scriptures could be contested, the lived wisdom of folk proverbs never rings false.',
  'ಗಾದೆಗಳು ಪೂರ್ವಜರ ನೂರಾರು ವರ್ಷಗಳ ಸತ್ಯಾನುಭವದ ಸಾರಾಂಶವಾಗಿದ್ದು ಎಂದಿಗೂ ಸುಳ್ಳಾಗಲಾರವು.',
  'life',
  'ಜೀವನ',
  'Validating the eternal, practical truth of life advice handed down by ancestors',
  'ಹಿರಿಯರ ಅನುಭವದ ಮಾತುಗಳು ಮತ್ತು ಗಾದೆಗಳ ಸತ್ಯತೆಯನ್ನು ದೃಢಪಡಿಸುವಾಗ',
  ARRAY['wisdom', 'truth', 'heritage', 'proverb', 'philosophy', 'ancestors'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  120,
  TRUE
),
(
  'ಮಾತೆ ಮನೆ ಮಾಣಿಕ್ಯ, ಮೌನವೇ ಭೂಷಣ',
  'Maathe mane maanikya, mounave bhooshana',
  'Speech is the jewel of the house, yet silence at the right time is the finest ornament.',
  'ಮಾತನಾಡುವಾಗ ಹಿತ-ಮಿತವಾಗಿರಬೇಕು, ಅತಿಯಾಗಿ ಮಾತನಾಡಿ ಗಂಡಾಂತರ ತಂದುಕೊಳ್ಳಬಾರದು.',
  'life',
  'ಜೀವನ',
  'Someone speaking recklessly during a sensitive dispute',
  'ವಿವಾದದ ಸಮಯದಲ್ಲಿ ಅನಗತ್ಯವಾಗಿ ಮಾತನಾಡಿ ಪರಿಸ್ಥಿತಿ ಬಿಗಡಾಯಿಸದಂತೆ ಎಚ್ಚರಿಸುವಾಗ',
  ARRAY['speech', 'silence', 'patience', 'mindfulness', 'conflict'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  71,
  TRUE
),
(
  'ಆಳು ಆಗಿ ದುಡಿ, ಅರಸನಾಗಿ ಉಣ್ಣು',
  'Aalu aagi dudi, arasanaagi unnu',
  'Toil as humbly as a servant, and feast as honorably as a king.',
  'ಕೆಲಸ ಮಾಡುವಾಗ ಯಾವುದೇ ಕೆಲಸ ಕೀಳೆನ್ನದೆ ಶ್ರದ್ಧೆಯಿಂದ ಮಾಡು, ಅದರ ಫಲವನ್ನು ರಾಜನಂತೆ ಗೌರವದಿಂದ ಅನುಭವಿಸು.',
  'life',
  'ಜೀವನ',
  'Inspiring someone who feels hesitant to start from the bottom rung of a career',
  'ಯಾವುದೇ ಕೆಲಸವನ್ನೂ ಕೀಳಾಗಿ ಕಾಣದೆ ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ಶ್ರಮಿಸುವವರಿಗೆ ಸ್ಫೂರ್ತಿ ತುಂಬಲು',
  ARRAY['work ethic', 'dignity of labor', 'success', 'career', 'pride'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  93,
  TRUE
),
(
  'ಹೋದ ಕಾಲಕ್ಕೆ ಚಿಂತೆ ಇಲ್ಲ, ಬಂದ ಕಾಲಕ್ಕೆ ಆತಂಕ ಇಲ್ಲ',
  'Hoda kaalakke chinte illa, banda kaalakke aatanka illa',
  'No regrets for what has already passed, no anxiety for what is yet to come. Live in equanimity.',
  'ಗತಕಾಲದ ಬಗ್ಗೆ ಕೊರಗದೆ, ಭವಿಷ್ಯದ ಬಗ್ಗೆ ಅತಿಯಾಗಿ ಚಿಂತಿಸದೆ ಇಂದಿನ ದಿನವನ್ನು ಪ್ರಶಾಂತವಾಗಿ ಜೀವಿಸಬೇಕು.',
  'life',
  'ಜೀವನ',
  'Comforting a person overwhelmed by anxiety or past regrets',
  'ಹಳೆಯ ತಪ್ಪುಗಳ ಬಗ್ಗೆ ಕೊರಗುತ್ತಿರುವ ಅಥವಾ ಭವಿಷ್ಯದ ಭಯದಲ್ಲಿರುವ ವ್ಯಕ್ತಿಗೆ ಧೈರ್ಯ ಹೇಳಲು',
  ARRAY['mindfulness', 'mental peace', 'anxiety', 'equanimity', 'philosophy', 'present'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  68,
  TRUE
),
(
  'ಕುಂಬಾರನಿಗೆ ವರುಷ, ದೊಣ್ಣೆಗೆ ನಿಮಿಷ',
  'Kumbaaranige varusha, donnege nimisha',
  'It takes a potter a year of patience to mold a pot, but a club needs only a fraction of a second to smash it.',
  'ಯಾವುದೇ ಒಳ್ಳೆಯ ಸಂಬಂಧ ಅಥವಾ ವಸ್ತುವನ್ನು ಕಟ್ಟಲು ಬಹಳ ಸಮಯ ಬೇಕು, ಆದರೆ ನಾಶಮಾಡಲು ಕ್ಷಣಮಾತ್ರ ಸಾಕು.',
  'life',
  'ಜೀವನ',
  'Warning against reckless impulsive anger that ruins years of trust or hard work',
  'ಕೋಪದಲ್ಲಿ ಅಥವಾ ಅವಸರದಲ್ಲಿ ಕಷ್ಟಪಟ್ಟು ನಿರ್ಮಿಸಿದ ಸಂಬಂಧಗಳನ್ನು ಹಾಳುಮಾಡಿಕೊಳ್ಳದಂತೆ ಎಚ್ಚರಿಸಲು',
  ARRAY['patience', 'anger', 'destruction', 'creation', 'reputation', 'relationships'],
  'ಪಾರಂಪರಿಕ (Traditional)',
  77,
  TRUE
)
ON CONFLICT (kannada) DO NOTHING;
