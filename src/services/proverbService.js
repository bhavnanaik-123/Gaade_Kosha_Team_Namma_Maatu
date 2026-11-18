import { supabase, isSupabaseConfigured } from './supabaseClient';
import { initialProverbs } from '../data/initialProverbs';
import masterProverbs from '../data/masterProverbs.json';

const LOCAL_STORAGE_KEY = 'gaadhe_kosha_user_proverbs';
const LIKES_STORAGE_KEY = 'gaadhe_kosha_user_likes';

// Helper to get stored local proverbs
const getStoredLocalProverbs = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading localStorage proverbs:', e);
    return [];
  }
};

// Helper to save local proverbs
const saveStoredLocalProverbs = (proverbs) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(proverbs));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
};

// Helper for local likes tracking
export const getLocalLikes = () => {
  try {
    const raw = localStorage.getItem(LIKES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const setLocalLike = (id, liked) => {
  try {
    const likes = getLocalLikes();
    likes[id] = liked;
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likes));
  } catch (e) {
    console.error('Error saving like state:', e);
  }
};

/**
 * Fetch all approved and imported proverbs from Supabase with paged retrieval,
 * with full master dataset fallback.
 */
export const fetchAllProverbs = async () => {
  if (isSupabaseConfigured() && supabase) {
    try {
      let allRows = [];
      let from = 0;
      const pageSize = 1000;

      while (true) {
        const { data, error } = await supabase
          .from('proverbs')
          .select('*')
          .range(from, from + pageSize - 1)
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Supabase fetch failed, falling back:', error.message);
          break;
        }
        if (!data || data.length === 0) break;
        allRows.push(...data);
        if (data.length < pageSize) break;
        from += pageSize;
      }

      if (allRows.length > 0) {
        // Build map from masterProverbs to enrich any placeholder records
        const masterMap = new Map();
        for (const p of masterProverbs) {
          if (p.kannada) masterMap.set(p.kannada.trim(), p);
        }

        // Enrich rows with authentic translations and situations where available
        const enrichedRows = allRows.map(row => {
          const k = row.kannada?.trim();
          const master = masterMap.get(k);
          if (master && (!row.english_meaning || row.english_meaning.startsWith('[Translation'))) {
            return {
              ...row,
              english_meaning: master.english_meaning,
              kannada_meaning: row.kannada_meaning || master.kannada_meaning || master.kannada_explanation,
              situation: row.situation || master.situation,
              situation_kn: row.situation_kn || master.situation_kn
            };
          }
          return row;
        });

        const existingKannada = new Set(enrichedRows.map(r => r.kannada?.trim()));
        const missingFromMaster = masterProverbs.filter(p => !existingKannada.has(p.kannada?.trim()));
        const fullDataset = [...enrichedRows, ...missingFromMaster];

        // Merge in any pending contributions submitted in this browser session
        const localContributions = getStoredLocalProverbs();
        const combined = [...localContributions, ...fullDataset];
        return { data: combined, source: 'supabase' };
      }
    } catch (err) {
      console.warn('Supabase connection error:', err);
    }
  }

  // Fallback: merge master dataset with user-contributed local proverbs
  const userProverbs = getStoredLocalProverbs();
  const combined = [...userProverbs, ...masterProverbs];
  return { data: combined, source: 'local' };
};

/**
 * Add a new proverb contribution (stored as is_verified = false for moderation)
 */
export const createProverb = async (newProverb) => {
  const proverbToSave = {
    ...newProverb,
    id: `contrib-${Date.now()}`,
    likes: 0,
    is_verified: false,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      // Insert with is_verified = false (required by RLS policy)
      // We do not chain .select() because unverified rows cannot be read by public SELECT
      const { error } = await supabase
        .from('proverbs')
        .insert([{
          kannada: newProverb.kannada,
          transliteration: newProverb.transliteration || '',
          english_meaning: newProverb.english_meaning,
          kannada_meaning: newProverb.kannada_meaning || '',
          category: newProverb.category,
          category_kn: newProverb.category_kn || '',
          situation: newProverb.situation || '',
          situation_kn: newProverb.situation_kn || '',
          tags: newProverb.tags || [],
          contributor: newProverb.contributor || 'ಸಮುದಾಯ ಕೊಡುಗೆ (Community)',
          likes: 0,
          is_verified: false
        }]);

      if (error) {
        console.warn('Supabase insert failed, saving to local storage:', error.message);
      } else {
        // Successfully inserted to Supabase!
        // Also save to local storage so contributor can view their pending submission
        const existing = getStoredLocalProverbs();
        saveStoredLocalProverbs([proverbToSave, ...existing]);
        return { data: proverbToSave, source: 'supabase', pending: true };
      }
    } catch (err) {
      console.warn('Supabase insert exception, saving to local storage:', err);
    }
  }

  // Local fallback save
  const existing = getStoredLocalProverbs();
  saveStoredLocalProverbs([proverbToSave, ...existing]);
  return { data: proverbToSave, source: 'local', pending: true };
};

/**
 * Toggle like for a proverb (managed in local state/storage to avoid unrestricted public UPDATEs)
 */
export const incrementLike = async (id, currentLikes = 0) => {
  const userLikes = getLocalLikes();
  const isAlreadyLiked = !!userLikes[id];
  const newLikeCount = isAlreadyLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1;
  setLocalLike(id, !isAlreadyLiked);

  // Update local storage if applicable
  const local = getStoredLocalProverbs();
  const updated = local.map(p => p.id === id ? { ...p, likes: newLikeCount } : p);
  saveStoredLocalProverbs(updated);

  return { newLikeCount, isLiked: !isAlreadyLiked };
};

/**
 * Smart situation-based proverb finder algorithm
 * Only performs semantic matching against curated, enriched records
 * to avoid false matches on placeholder translations.
 */
export const findProverbsForSituation = (proverbs, situationQuery) => {
  if (!situationQuery || !situationQuery.trim()) return [];

  const tokens = situationQuery.toLowerCase().split(/\s+/).filter(t => t.length > 2);
  if (tokens.length === 0) return [];

  // Score each proverb
  const scored = proverbs.map(proverb => {
    let score = 0;
    const isPending = !proverb.is_verified || proverb.english_meaning?.startsWith('[Translation');

    // Only use situation and English meaning if enriched/verified to prevent false semantic matches
    const searchableSituation = !isPending ? (proverb.situation || '') : '';
    const searchableSituationKn = !isPending ? (proverb.situation_kn || '') : '';
    const searchableEnglish = !isPending ? (proverb.english_meaning || '') : '';
    const searchableKannada = proverb.kannada_meaning || '';

    tokens.forEach(token => {
      // Exact tag match gets highest score
      if (proverb.tags?.some(tag => tag.toLowerCase().includes(token))) {
        score += 5;
      }
      // Situation match
      if (searchableSituation.toLowerCase().includes(token) || searchableSituationKn.includes(token)) {
        score += 4;
      }
      // Meaning match
      if (searchableEnglish.toLowerCase().includes(token) || searchableKannada.includes(token)) {
        score += 2;
      }
      // Proverb kannada word match
      if (proverb.kannada?.includes(token)) {
        score += 3;
      }
    });

    return { proverb, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.proverb);
};
