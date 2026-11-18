async function searchP443() {
  console.log('Querying Wikidata for any item with Kannada audio (P443)...');
  const sparql = `
    SELECT ?item ?itemLabel ?audio WHERE {
      ?item wdt:P443 ?audio .
      FILTER(CONTAINS(STR(?audio), "kn-") || CONTAINS(STR(?audio), "Kn-") || CONTAINS(STR(?audio), "Kannada"))
      SERVICE wikibase:label { bd:serviceParam wikibase:language "kn,en". }
    } LIMIT 100
  `;
  const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparql)}&format=json`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'GaadheKoshaBot/1.0' }
    });
    const data = await res.json();
    const bindings = data.results?.bindings || [];
    console.log('Found Wikidata items with Kannada audio:', bindings.length);
    for (const b of bindings.slice(0, 10)) {
      console.log(`- ${b.itemLabel?.value}: ${b.audio?.value}`);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

searchP443().catch(console.error);
