import fs from 'fs';
import path from 'path';

// Load proverb dataset once in serverless memory
let proverbsCorpus = null;

function getProverbsCorpus() {
  if (!proverbsCorpus) {
    try {
      const p = path.join(process.cwd(), 'data', 'kannada_proverbs_master.json');
      if (fs.existsSync(p)) {
        proverbsCorpus = JSON.parse(fs.readFileSync(p, 'utf8'));
      }
    } catch (e) {
      console.error('Error loading master dataset in API:', e);
      proverbsCorpus = [];
    }
  }
  return proverbsCorpus || [];
}

/**
 * Stage 1: Retrieval (Filter candidate pool based on query tokens & semantic tags)
 */
function retrieveCandidates(query, corpus, limit = 20) {
  if (!query || !query.trim()) return corpus.slice(0, limit);

  const tokens = query.toLowerCase()
    .replace(/[,\.?!;:\-–—'"\(\)\[\]\{\}`]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 2);

  const scored = corpus.map(p => {
    let score = 0;
    const isCurated = p.is_verified === true;
    // Boost curated gold standard records
    if (isCurated) score += 3;

    const searchable = [
      p.kannada,
      p.transliteration || '',
      p.category || '',
      p.category_kn || '',
      p.situation || '',
      p.situation_kn || '',
      p.english_meaning?.startsWith('[Translation') ? '' : (p.english_meaning || ''),
      p.kannada_meaning || '',
      ...(p.tags || [])
    ].join(' ').toLowerCase();

    for (const t of tokens) {
      if (p.tags?.some(tag => tag.toLowerCase().includes(t))) score += 8;
      if (p.kannada?.includes(t)) score += 6;
      if (p.situation?.toLowerCase().includes(t) || p.situation_kn?.includes(t)) score += 5;
      if (searchable.includes(t)) score += 2;
    }

    return { proverb: p, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.proverb);
}

export default async function handler(req, res) {
  // Allow POST requests only
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  const { query, category } = req.body || {};
  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({ error: 'Query parameter is required.' });
  }

  const cleanQuery = query.trim();
  const corpus = getProverbsCorpus();
  const candidates = retrieveCandidates(cleanQuery, corpus, 18);

  const apiKey = process.env.GEMINI_API_KEY;

  // If Gemini API Key is available, execute LLM re-ranking & bilingual advice generation
  if (apiKey) {
    try {
      const candidatesPrompt = candidates.map((c, i) => 
        `[ID: ${c.id}] "${c.kannada}" (${c.transliteration}) | Category: ${c.category} | Meaning: ${c.english_meaning?.slice(0, 100)}`
      ).join('\n');

      const systemPrompt = `You are a cultural Kannada scholar and wise counselor for the "Gaadhe Kosha" application.
The user has described a real-life situation/dilemma.
You are given a list of candidate authentic Kannada proverbs.

YOUR TASK:
1. Select EXACTLY the TOP 3 most fitting proverbs from the candidate list that offer the best guidance for this user's situation.
2. For each of the 3 chosen proverbs:
   - Provide a 2-sentence tailored explanation in English explaining why this proverb applies and the moral lesson it provides for their dilemma.
   - Provide a 2-sentence tailored explanation in Kannada (ಕನ್ನಡ ವಿವರಣೆ ಮತ್ತು ಸಂದರ್ಭೋಚಿತ ಮಾರ್ಗದರ್ಶನ).
3. DO NOT invent or fabricate new proverbs. ONLY pick from the candidate list provided.

Return STRICT JSON format:
{
  "recommendations": [
    {
      "proverb_id": "string (matching candidate ID)",
      "explanation_en": "string",
      "explanation_kn": "string"
    }
  ]
}`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              { text: `${systemPrompt}\n\nUSER SITUATION:\n"${cleanQuery}"\n\nCANDIDATE PROVERBS POOL:\n${candidatesPrompt}` }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.3
        }
      };

      const geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (geminiRes.ok) {
        const geminiData = await geminiRes.json();
        const rawJsonText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJsonText) {
          const parsed = JSON.parse(rawJsonText);
          const topRecs = (parsed.recommendations || []).slice(0, 3);

          // Map back to the full proverb object
          const finalProverbs = topRecs.map(rec => {
            const found = candidates.find(c => c.id === rec.proverb_id) || candidates[0];
            return {
              ...found,
              recommendation_explanation_en: rec.explanation_en,
              recommendation_explanation_kn: rec.explanation_kn
            };
          }).filter(Boolean);

          if (finalProverbs.length > 0) {
            return res.status(200).json({
              source: 'gemini-rag',
              query: cleanQuery,
              proverbs: finalProverbs
            });
          }
        }
      } else {
        console.warn('Gemini API call failed with status:', geminiRes.status);
      }
    } catch (err) {
      console.error('Gemini RAG processing error:', err.message);
    }
  }

  // Graceful Fallback: Return top 3 candidates with verified explanations
  const fallbackTop3 = candidates.slice(0, 3).map(p => ({
    ...p,
    recommendation_explanation_en: p.situation 
      ? `This traditional proverb applies to your situation: ${p.situation}. It advises: ${p.english_meaning}`
      : `Traditional folk guidance: ${p.english_meaning}`,
    recommendation_explanation_kn: p.situation_kn
      ? `ನಿಮ್ಮ ಸನ್ನಿವೇಶಕ್ಕೆ ಈ ಗಾದೆ ಅತ್ಯಂತ ಸೂಕ್ತವಾಗಿದೆ: ${p.situation_kn}. ಜೀವನ ಪಾಠ: ${p.kannada_meaning || p.kannada_explanation}`
      : `ಸಾಂಪ್ರದಾಯಿಕ ಜನಪದ ಮಾರ್ಗದರ್ಶನ: ${p.kannada_meaning || p.kannada_explanation}`
  }));

  return res.status(200).json({
    source: apiKey ? 'deterministic-fallback' : 'local-rag',
    query: cleanQuery,
    proverbs: fallbackTop3
  });
}
