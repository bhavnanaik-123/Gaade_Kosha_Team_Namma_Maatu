async function checkFiles() {
  const id = '2015.489071-a-handbook-of-kannada-proverbs';
  const url = `https://archive.org/metadata/${id}/files`;
  const res = await fetch(url, { headers: { 'User-Agent': 'GaadheKoshaBot/1.0' } });
  const data = await res.json();
  const files = data.result || [];
  console.log('Total files:', files.length);
  for (const f of files) {
    if (f.name.endsWith('.txt') || f.name.endsWith('.djvu') || f.name.endsWith('.xml')) {
      console.log(`- ${f.name} (size: ${f.size})`);
    }
  }
}

checkFiles().catch(console.error);
