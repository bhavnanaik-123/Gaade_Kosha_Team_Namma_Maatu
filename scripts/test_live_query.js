import { createClient } from '@supabase/supabase-js';

const url = 'https://byeisaehrjzysezmcwmd.supabase.co';
const key = 'sb_publishable_P8ykg6E83aAdeN2UuG6fXA_NpBXg4dS';

const supabase = createClient(url, key);

async function testQuery() {
  console.log('Testing live query on public.proverbs...');
  const { data, count, error } = await supabase
    .from('proverbs')
    .select('*', { count: 'exact' });

  if (error) {
    console.error('Query error:', error.message);
  } else {
    console.log(`Successfully fetched records! Total visible to anon: ${data?.length || 0}`);
    if (data && data.length > 0) {
      console.log('Sample record (first):', {
        id: data[0].id,
        kannada: data[0].kannada,
        category: data[0].category,
        is_verified: data[0].is_verified,
        contributor: data[0].contributor
      });
    }
  }
}

testQuery().catch(console.error);
