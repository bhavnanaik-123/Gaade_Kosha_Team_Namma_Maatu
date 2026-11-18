import { createClient } from '@supabase/supabase-js';

const url = 'https://byeisaehrjzysezmcwmd.supabase.co';
const key = 'sb_publishable_P8ykg6E83aAdeN2UuG6fXA_NpBXg4dS';

const supabase = createClient(url, key);

async function testRpc() {
  const { data, error } = await supabase.rpc('exec_sql', {
    sql: 'SELECT 1;'
  });
  console.log('rpc exec_sql result:', { data, error });
}

testRpc().catch(console.error);
