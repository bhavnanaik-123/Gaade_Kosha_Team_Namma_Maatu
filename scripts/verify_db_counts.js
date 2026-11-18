import { createClient } from '@supabase/supabase-js';

const url = 'https://byeisaehrjzysezmcwmd.supabase.co';
const key = 'sb_publishable_P8ykg6E83aAdeN2UuG6fXA_NpBXg4dS';

const supabase = createClient(url, key);

async function verify() {
  console.log('Querying Supabase database...');
  
  // 1. Total verified proverbs queryable by anon
  const { data: verified, error: vErr } = await supabase
    .from('proverbs')
    .select('id, kannada, category, is_verified, contributor', { count: 'exact' })
    .eq('is_verified', true);

  console.log(`Curated / Verified proverbs visible: ${verified?.length || 0}`);
  if (verified && verified.length > 0) {
    console.log('Sample verified proverb:', verified[0]);
  }

  // 2. Query proverbs with contributor matching imported dataset
  const { data: imported, count, error: iErr } = await supabase
    .from('proverbs')
    .select('id, kannada, category, is_verified, contributor', { count: 'exact' })
    .ilike('contributor', '%Vishaya%');

  console.log(`Imported dataset proverbs visible under current RLS: ${imported?.length || 0}`);
}

verify().catch(console.error);
