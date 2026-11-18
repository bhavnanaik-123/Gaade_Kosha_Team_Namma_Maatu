async function searchProverbAudio() {
  const q = 'ಗಾದೆ OR gaade OR proverb';
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}+incategory:"Audio files in Kannada"&gsrlimit=50&prop=info|imageinfo&iiprop=url&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'GaadheKoshaBot/1.0' } });
  const data = await res.json();
  const pages = Object.values(data.query?.pages || {});
  console.log('Found proverb audio in Commons:', pages.length);
  for (const p of pages) {
    console.log(`- ${p.title}: ${p.imageinfo?.[0]?.url}`);
  }
}

searchProverbAudio().catch(console.error);
