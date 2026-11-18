import { createClient } from '@supabase/supabase-js';

const url = 'https://byeisaehrjzysezmcwmd.supabase.co';
const key = 'sb_publishable_P8ykg6E83aAdeN2UuG6fXA_NpBXg4dS';

const supabase = createClient(url, key);

async function verifyAll() {
  console.log('====================================================');
  console.log(' SUPABASE LIVE INTEGRATION & RLS VERIFICATION');
  console.log('====================================================');
  console.log('Target URL:', url);
  console.log('Role Tested: Anonymous Public Client (anon key)\n');

  // Test 1: Fetch total count via public API
  console.log('--- TEST 1: Total Publicly Fetchable Proverbs ---');
  let allRows = [];
  let from = 0;
  const pageSize = 1000;

  while (true) {
    const { data, count, error } = await supabase
      .from('proverbs')
      .select('id, kannada, category, contributor, is_verified', { count: 'exact' })
      .range(from, from + pageSize - 1)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch error:', error.message);
      break;
    }
    if (!data || data.length === 0) break;
    allRows.push(...data);
    if (data.length < pageSize) break;
    from += pageSize;
  }

  console.log(`Total proverbs returned via anonymous public API: ${allRows.length}`);
  const verifiedCount = allRows.filter(r => r.is_verified).length;
  const unverifiedImported = allRows.filter(r => !r.is_verified).length;
  console.log(` - Curated / Verified (is_verified = true): ${verifiedCount}`);
  console.log(` - Imported Dataset (is_verified = false): ${unverifiedImported}`);

  // Test 2: Community Submission Privacy Check
  console.log('\n--- TEST 2: Community Submission Privacy Check ---');
  const dummyCommunityKannada = `ಪರೀಕ್ಷಾ ಸಮುದಾಯ ಗಾದೆ - ${Date.now()}`;
  const dummySubmission = {
    kannada: dummyCommunityKannada,
    transliteration: 'Pariksha samudaya gaadhe',
    english_meaning: 'Test community proverb to verify privacy.',
    kannada_meaning: 'ಗೌಪ್ಯತೆ ಪರೀಕ್ಷೆಗಾಗಿ ಸಮುದಾಯ ಗಾದೆ.',
    category: 'life',
    category_kn: 'ಜೀವನ',
    contributor: 'ಪರೀಕ್ಷಾರ್ಥಿ (Test Contributor)',
    likes: 0,
    is_verified: false
  };

  // 2a. Insert via public contribution policy
  const { error: insertErr } = await supabase
    .from('proverbs')
    .insert([dummySubmission]);

  if (insertErr) {
    console.log('Insert test result:', insertErr.message);
  } else {
    console.log('Successfully inserted test community submission with contributor = "ಪರೀಕ್ಷಾರ್ಥಿ" and is_verified = false.');
  }

  // 2b. Attempt to SELECT the pending community submission as an anonymous user
  const { data: privacyCheck, error: selectErr } = await supabase
    .from('proverbs')
    .select('*')
    .eq('kannada', dummyCommunityKannada);

  if (privacyCheck && privacyCheck.length === 0) {
    console.log('PASS: Community submission is 100% PRIVATE and INVISIBLE to public SELECT!');
  } else {
    console.error('FAIL: Community submission was visible to public SELECT!', privacyCheck);
  }

  console.log('====================================================\n');
  return { total: allRows.length, verifiedCount, unverifiedImported };
}

verifyAll().catch(console.error);
