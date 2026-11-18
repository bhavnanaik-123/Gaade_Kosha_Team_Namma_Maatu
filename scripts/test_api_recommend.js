import handler from '../api/recommend.js';

async function testApi() {
  console.log('Testing /api/recommend with English query...');
  const reqEn = {
    method: 'POST',
    body: { query: 'My friend disappeared when I had a financial emergency and needed help' }
  };
  let resultEn = null;
  const resEn = {
    status: (code) => ({
      json: (data) => { resultEn = { code, data }; }
    }),
    setHeader: () => {}
  };

  await handler(reqEn, resEn);
  console.log('Result EN status:', resultEn.code, 'Source:', resultEn.data.source);
  console.log('Returned proverbs count:', resultEn.data.proverbs?.length);
  resultEn.data.proverbs?.forEach((p, idx) => {
    console.log(`\n#${idx + 1}: "${p.kannada}" (${p.transliteration})`);
    console.log(`  EN Advice: ${p.recommendation_explanation_en}`);
    console.log(`  KN Advice: ${p.recommendation_explanation_kn}`);
  });

  console.log('\n------------------------------------------------');
  console.log('Testing /api/recommend with Kannada query...');
  const reqKn = {
    method: 'POST',
    body: { query: 'ಪರೀಕ್ಷೆ ಓದಲು ಆಲಸ್ಯ ಮತ್ತು ಕಷ್ಟವೆನಿಸುತ್ತಿದೆ' }
  };
  let resultKn = null;
  const resKn = {
    status: (code) => ({
      json: (data) => { resultKn = { code, data }; }
    }),
    setHeader: () => {}
  };

  await handler(reqKn, resKn);
  console.log('Result KN status:', resultKn.code, 'Source:', resultKn.data.source);
  console.log('Returned proverbs count:', resultKn.data.proverbs?.length);
  resultKn.data.proverbs?.forEach((p, idx) => {
    console.log(`\n#${idx + 1}: "${p.kannada}" (${p.transliteration})`);
    console.log(`  EN Advice: ${p.recommendation_explanation_en}`);
    console.log(`  KN Advice: ${p.recommendation_explanation_kn}`);
  });
}

testApi().catch(console.error);
