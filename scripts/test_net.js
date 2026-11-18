import https from 'https';

https.get('https://www.google.com', (res) => {
  console.log('Google status:', res.statusCode);
}).on('error', (e) => {
  console.error('Google error:', e.message);
});
