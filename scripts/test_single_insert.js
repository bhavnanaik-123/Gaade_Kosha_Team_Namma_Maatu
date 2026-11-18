import { createClient } from '@supabase/supabase-js';

const url = 'https://byeisaehrjzysezmcwmd.supabase.co';
const key = 'sb_publishable_P8ykg6E83aAdeN2UuG6fXA_NpBXg4dS';

const supabase = createClient(url, key);

async function testInsert() {
  const testRow = {
    kannada: 'ಟೆಸ್ಟ್ ಗಾದೆ: ಅಂಬಲಿ ಕುಡಿಯುವವನಿಗೆ ಮೀಸೆ ತಿಕ್ಕುವವನೊಬ್ಬ',
    transliteration: 'Ambali kudiyuvavanige meese thikkuvavanobba',
    english_meaning: '[Translation in progress] Traditional folk wisdom: One who drinks porridge having someone to twirl his mustache.',
    kannada_meaning: 'ಸಾಂಪ್ರದಾಯಿಕ ಜನಪದ ಗಾದೆ: ಅಂಬಲಿ ಕುಡಿಯುವವನಿಗೆ ಮೀಸೆ ತಿಕ್ಕುವವನೊಬ್ಬ.',
    category: 'life',
    category_kn: 'ಜೀವನ',
    situation: 'Used when someone has unnecessary pretensions beyond their modest means.',
    situation_kn: 'ಸರಳ ಬದುಕಿನಲ್ಲೂ ಅನಗತ್ಯ ಆಡಂಬರ ತೋರುವ ಸಂದರ್ಭ.',
    tags: ['ಆಡಂಬರ', 'ಮೀಸೆ', 'ಜೀವನ'],
    contributor: 'ವಿಷಯ ಜನಪ್ರಿಯ ಗಾದೆಗಳು (Vishaya.in)',
    likes: 0,
    is_verified: false
  };

  console.log('Testing insert of 1 row via anon key...');
  const { data, error } = await supabase
    .from('proverbs')
    .insert([testRow]);

  console.log('Insert result:', { data, error });
}

testInsert().catch(console.error);
