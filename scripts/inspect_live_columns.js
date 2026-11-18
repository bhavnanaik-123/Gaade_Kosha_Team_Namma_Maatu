import { createClient } from '@supabase/supabase-js';

const url = 'https://byeisaehrjzysezmcwmd.supabase.co';
const key = 'sb_publishable_P8ykg6E83aAdeN2UuG6fXA_NpBXg4dS';

const supabase = createClient(url, key);

async function inspectColumns() {
  console.log('Inspecting actual columns of public.proverbs on Supabase...');
  const { data, error } = await supabase
    .from('proverbs')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error fetching sample row:', error.message);
    return;
  }

  if (data && data.length > 0) {
    const row = data[0];
    console.log('Available columns in public.proverbs:');
    for (const [col, val] of Object.entries(row)) {
      console.log(` - ${col}: (type: ${typeof val}, sample: ${JSON.stringify(val).slice(0, 40)})`);
    }
  } else {
    console.log('No rows returned.');
  }
}

inspectColumns().catch(console.error);
