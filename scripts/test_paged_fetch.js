import { createClient } from '@supabase/supabase-js';

const url = 'https://byeisaehrjzysezmcwmd.supabase.co';
const key = 'sb_publishable_P8ykg6E83aAdeN2UuG6fXA_NpBXg4dS';

const supabase = createClient(url, key);

async function testPagedFetch() {
  console.log('Testing paged fetch on Supabase with anon key...');
  let allRows = [];
  let from = 0;
  const pageSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from('proverbs')
      .select('*')
      .range(from, from + pageSize - 1)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch error:', error.message);
      break;
    }
    if (!data || data.length === 0) break;
    allRows.push(...data);
    console.log(`Fetched page from ${from} to ${from + data.length - 1} (${data.length} records)`);
    if (data.length < pageSize) break;
    from += pageSize;
  }

  console.log(`Total rows currently visible to anon key: ${allRows.length}`);
}

testPagedFetch().catch(console.error);
