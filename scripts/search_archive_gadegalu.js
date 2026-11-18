async function searchArchiveGadegalu() {
  console.log('Searching Archive.org for specific Kannada proverbs audio...');
  const queries = [
    'title:"gadegalu" OR description:"gadegalu"',
    'title:"gaadegalu" OR description:"gaadegalu"',
    'title:"kannada proverbs" mediatype:audio',
    'subject:"kannada proverbs" mediatype:audio'
  ];

  for (const q of queries) {
    const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(q)}&fl[]=identifier,title,mediatype,creator,year&rows=20&output=json`;
    const res = await fetch(url, { headers: { 'User-Agent': 'GaadheKoshaBot/1.0' } });
    const data = await res.json();
    console.log(`Query: ${q} => Found ${data.response?.docs?.length || 0} items`);
    for (const d of (data.response?.docs || [])) {
      console.log(` - [${d.identifier}] "${d.title}" (${d.mediatype})`);
    }
  }
}

searchArchiveGadegalu().catch(console.error);
