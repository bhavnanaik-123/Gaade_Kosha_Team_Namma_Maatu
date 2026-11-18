async function searchWikidataAudio() {
  console.log('Querying Wikidata SPARQL endpoint for Kannada audio pronunciations...');
  // SPARQL query for Kannada audio in Wikidata Lexemes
  const sparql = `
    SELECT ?lemma ?audio WHERE {
      ?lexeme dct:language wd:Q33625 ; # Kannada
              wikibase:lemma ?lemma ;
              wdt:P443 ?audio .        # pronunciation audio
    } LIMIT 250
  `;
  const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparql)}&format=json`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'GaadheKoshaBot/1.0 (https://gaadhe-kosha.vercel.app; akshay@example.com)'
      }
    });
    if (!res.ok) {
      console.log('SPARQL request failed with status:', res.status);
      return;
    }
    const data = await res.json();
    const bindings = data.results?.bindings || [];
    console.log('Total Kannada Lexeme audio recordings found in Wikidata:', bindings.length);
    for (const b of bindings.slice(0, 15)) {
      console.log(`- Word/Phrase: "${b.lemma?.value}" => Audio: ${b.audio?.value}`);
    }
  } catch (err) {
    console.error('SPARQL query error:', err.message);
  }
}

searchWikidataAudio().catch(console.error);
