async function searchCommonsAudio() {
  console.log('Searching Wikimedia Commons for Kannada proverb / spoken recordings...');
  // Search Commons for audio files in Kannada
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=filetype:audio+kannada&gsrlimit=50&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json';
  const res = await fetch(url, { headers: { 'User-Agent': 'GaadheKoshaAudioResearch/1.0' } });
  const data = await res.json();
  const pages = Object.values(data.query?.pages || {});
  console.log('Found Commons audio files:', pages.length);
  for (const p of pages.slice(0, 15)) {
    const info = p.imageinfo?.[0] || {};
    console.log(`- "${p.title}" | URL: ${info.url} | Mime: ${info.mime}`);
  }
}

searchCommonsAudio().catch(console.error);
