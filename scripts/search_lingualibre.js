async function searchLinguaLibre() {
  console.log('Searching Lingua Libre for Kannada recordings...');
  // Lingua Libre SPARQL endpoint or MediaWiki API
  const url = 'https://lingualibre.org/api.php?action=query&list=allimages&aifrom=Kn-&ailimit=50&format=json';
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'GaadheKoshaBot/1.0' } });
    const data = await res.json();
    const images = data.query?.allimages || [];
    console.log('Found Lingua Libre images:', images.length);
    for (const img of images.slice(0, 15)) {
      console.log(`- ${img.name}: ${img.url}`);
    }
  } catch (e) {
    console.error('Error fetching Lingua Libre:', e.message);
  }
}

searchLinguaLibre().catch(console.error);
