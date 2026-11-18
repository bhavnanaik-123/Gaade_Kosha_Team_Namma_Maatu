async function searchArchiveAudio() {
  console.log('Searching Internet Archive for Kannada audio recordings...');
  const q = 'mediatype:audio AND (kannada OR "kannada proverbs" OR "gadegalu" OR "janapada")';
  const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(q)}&fl[]=identifier,title,description,creator,year&rows=50&output=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'GaadheKoshaBot/1.0' } });
  const data = await res.json();
  const docs = data.response?.docs || [];
  console.log('Found Archive.org audio items:', docs.length);
  for (const d of docs.slice(0, 20)) {
    console.log(`- [${d.identifier}] "${d.title}" (${d.creator || 'Unknown'})`);
  }
}

searchArchiveAudio().catch(console.error);
