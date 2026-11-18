import { createClient } from '@supabase/supabase-js';

const url = 'https://byeisaehrjzysezmcwmd.supabase.co';
const key = 'sb_publishable_P8ykg6E83aAdeN2UuG6fXA_NpBXg4dS';

const supabase = createClient(url, key);

async function testUpsert() {
  // Test with one of the 22 existing proverbs to verify ignoreDuplicates works
  const existingProverb = {
    kannada: 'ವಿದ್ಯೆಯೇ ವಿನಯ, ವಿನಯವೇ ವಿದ್ಯೆ',
    transliteration: 'Vidyeye vinaya, vinayave vidye',
    english_meaning: 'Dummy test meaning',
    kannada_meaning: 'Dummy test meaning',
    category: 'education',
    category_kn: 'ಶಿಕ್ಷಣ',
    situation: 'Dummy',
    situation_kn: 'Dummy',
    tags: ['test'],
    contributor: 'Test',
    likes: 0,
    is_verified: false
  };

  console.log('Testing upsert on existing proverb with ignoreDuplicates: true...');
  const { data, error } = await supabase
    .from('proverbs')
    .upsert([existingProverb], { onConflict: 'kannada', ignoreDuplicates: true });

  console.log('Result for existing proverb:', { data, error });

  // Now verify that the original proverb in DB was NOT changed
  const { data: checkData } = await supabase
    .from('proverbs')
    .select('*')
    .eq('kannada', 'ವಿದ್ಯೆಯೇ ವಿನಯ, ವಿನಯವೇ ವಿದ್ಯೆ');

  console.log('Original proverb in DB after test:', {
    is_verified: checkData?.[0]?.is_verified,
    english_meaning: checkData?.[0]?.english_meaning?.slice(0, 30),
    contributor: checkData?.[0]?.contributor
  });
}

testUpsert().catch(console.error);
