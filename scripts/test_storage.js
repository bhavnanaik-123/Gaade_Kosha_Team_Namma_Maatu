import { createClient } from '@supabase/supabase-js';

const url = 'https://byeisaehrjzysezmcwmd.supabase.co';
const key = 'sb_publishable_P8ykg6E83aAdeN2UuG6fXA_NpBXg4dS';

const supabase = createClient(url, key);

async function testStorage() {
  console.log('Testing Supabase storage buckets...');
  const { data, error } = await supabase.storage.listBuckets();
  console.log('Buckets:', { data, error });
}

testStorage().catch(console.error);
