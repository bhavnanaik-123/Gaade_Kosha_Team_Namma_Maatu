const url = 'https://api.supabase.com/v1/projects/byeisaehrjzysezmcwmd/database/query';
const key = 'sb_publishable_P8ykg6E83aAdeN2UuG6fXA_NpBXg4dS';

async function testApi() {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: 'SELECT 1;' })
  });
  console.log('Status:', res.status, res.statusText);
  const text = await res.text();
  console.log('Response:', text);
}

testApi().catch(console.error);
