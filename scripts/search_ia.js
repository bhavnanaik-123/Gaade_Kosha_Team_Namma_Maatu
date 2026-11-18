async function searchInternetArchive() {
  const q = 'kannada proverbs OR "canarese proverbs" OR "katha sangraha"';
  const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(q)}&fl[]=identifier,title,creator,year,mediatype,description&rows=20&output=json`;
  console.log('Searching Archive.org...');
  const res = await fetch(url, { headers: { 'User-Agent': 'GaadheKoshaBot/1.0' } });
  const data = await res.json();
  const docs = data.response?.docs || [];
  console.log('Found docs:', docs.length);
  for (const d of docs) {
    console.log(`- [${d.identifier}] "${d.title}" (${d.creator}, ${d.year})`);
  }
}

searchInternetArchive().catch(console.error);
