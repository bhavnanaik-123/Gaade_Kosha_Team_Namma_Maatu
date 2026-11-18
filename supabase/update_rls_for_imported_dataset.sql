-- ====================================================================
-- GAADHE KOSHA (ಗಾದೆ ಕೋಶ) - RLS UPDATE FOR IMPORTED DATASET
-- ====================================================================
-- PURPOSE:
-- Safely exposes both approved proverbs (22 curated) and the imported dataset
-- (2,846 records) to public Browse and Search, while keeping pending community
-- submissions strictly private until approved by an administrator.
--
-- VERIFIED COLUMNS:
-- - is_verified (boolean)
-- - contributor (text)
-- - likes (integer)
-- - kannada (text)
-- - english_meaning (text)
-- - kannada_meaning (text)
-- - category (text)
-- ====================================================================

-- 1. Drop existing public SELECT policies
DROP POLICY IF EXISTS "Public can view approved proverbs" ON public.proverbs;
DROP POLICY IF EXISTS "Public can view approved and imported dataset proverbs" ON public.proverbs;

-- 2. Create the unified public SELECT policy
-- Public and anonymous users can view approved proverbs (is_verified = TRUE)
-- AND the designated imported folklore dataset (contributor containing Vishaya/ವಿಷಯ).
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

-- 3. Update public INSERT policy with anti-spoofing check
DROP POLICY IF EXISTS "Public can contribute proverbs" ON public.proverbs;

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
