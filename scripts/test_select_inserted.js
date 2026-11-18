import { createClient } from '@supabase/supabase-js';

const url = 'https://byeisaehrjzysezmcwmd.supabase.co';
const key = 'sb_publishable_P8ykg6E83aAdeN2UuG6fXA_NpBXg4dS';

const supabase = createClient(url, key);

async function testSelect() {
  const { data, error } = await supabase
    .from('proverbs')
    .select('*')
    .eq('kannada', 'ಟೆಸ್ಟ್ ಗಾದೆ: ಅಂಬಲಿ ಕುಡಿಯುವವನಿಗೆ ಮೀಸೆ ತಿಕ್ಕುವವನೊಬ್ಬ');

  console.log('Select result:', { count: data?.length, data, error });
}

testSelect().catch(console.error);
