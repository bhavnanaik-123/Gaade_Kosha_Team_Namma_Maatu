async function searchCategory() {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Kannada_pronunciation&cmlimit=100&cmtype=file&format=json';
  const res = await fetch(url, { headers: { 'User-Agent': 'GaadheKoshaBot/1.0' } });
  const data = await res.json();
  const members = data.query?.categorymembers || [];
  console.log('Category:Kannada_pronunciation files:', members.length);
  for (const m of members.slice(0, 10)) {
    console.log(`- ${m.title}`);
  }

  // Also check subcategories
  const urlSub = 'https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Audio_files_in_Kannada&cmlimit=50&format=json';
  const resSub = await fetch(urlSub, { headers: { 'User-Agent': 'GaadheKoshaBot/1.0' } });
  const dataSub = await resSub.json();
  console.log('Category:Audio_files_in_Kannada members:', dataSub.query?.categorymembers?.length);
  for (const m of (dataSub.query?.categorymembers || []).slice(0, 10)) {
    console.log(` - [${m.type}] ${m.title}`);
  }
}

searchCategory().catch(console.error);
