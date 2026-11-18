async function searchCommonsOgg() {
  console.log('Querying Commons audio files starting with Kn- ...');
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&list=allimages&aifrom=Kn-&aimime=audio/ogg&ailimit=100&format=json';
  const res = await fetch(url, { headers: { 'User-Agent': 'GaadheKoshaBot/1.0' } });
  const data = await res.json();
  const images = data.query?.allimages || [];
  console.log('Found Kn- audio/ogg files in Commons:', images.length);
  for (const img of images.slice(0, 20)) {
    console.log(`- ${img.name}: ${img.url}`);
  }
}

searchCommonsOgg().catch(console.error);
