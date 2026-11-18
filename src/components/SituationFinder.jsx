import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import situationsCatalog from '../data/situations_400.json';
import { findProverbsForSituation } from '../services/proverbService';
import { playKannadaAudio, stopAllAudio } from '../utils/audioPlayer';
import { 
  Sparkles, HelpCircle, ArrowRight, Lightbulb, Search, 
  Volume2, VolumeX, BookOpen, Compass, Check, Copy, Heart, RefreshCw, AlertCircle 
} from 'lucide-react';
import { getLocalLikes } from '../services/proverbService';

export const SituationFinder = ({ allProverbs, onLike, onProverbClick }) => {
  const { lang, t } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [scenarioFilter, setScenarioFilter] = useState('');
  const [activeScenarioId, setActiveScenarioId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [ragSource, setRagSource] = useState(null);

  // Audio Playback state & Error notice
  const [playingAudio, setPlayingAudio] = useState(null); // { id, type: 'proverb' | 'explanation', source: 'stored' | 'synthesis' }
  const [audioError, setAudioError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const localLikes = getLocalLikes();

  // Filter 425 situations by selected category and search query
  const filteredScenarios = useMemo(() => {
    return situationsCatalog.filter(sit => {
      if (selectedCategory !== 'all' && sit.category !== selectedCategory) return false;
      if (scenarioFilter.trim()) {
        const q = scenarioFilter.toLowerCase();
        const text = [
          sit.title_en,
          sit.title_kn,
          sit.situation_en,
          sit.situation_kn,
          ...(sit.tags || [])
        ].join(' ').toLowerCase();
        return text.includes(q);
      }
      return true;
    });
  }, [selectedCategory, scenarioFilter]);

  // Execute Gemini RAG Recommendation
  const handleSearch = async (queryText) => {
    const textToSearch = (queryText || inputText).trim();
    if (!textToSearch) return;

    setLoading(true);
    setHasSearched(true);
    stopAudio();

    try {
      // Call secure serverless Gemini RAG endpoint
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSearch })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.proverbs && data.proverbs.length > 0) {
          setResults(data.proverbs.slice(0, 3));
          setRagSource(data.source || 'gemini-rag');
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('API recommendation error, falling back to local corpus matching:', err);
    }

    // Graceful Client Fallback if API is offline
    const matched = findProverbsForSituation(allProverbs, textToSearch);
    const top3 = matched.slice(0, 3).map((p, idx) => ({
      ...p,
      recommendation_explanation_en: p.situation 
        ? `This proverb is relevant because: ${p.situation}. Lesson: ${p.english_meaning}`
        : `Cultural guidance: ${p.english_meaning}`,
      recommendation_explanation_kn: p.situation_kn 
        ? `ನಿಮ್ಮ ಸನ್ನಿವೇಶಕ್ಕೆ ಇದು ಸೂಕ್ತವಾಗಿದೆ: ${p.situation_kn}. ಜೀವನ ಪಾಠ: ${p.kannada_meaning || p.kannada_explanation}`
        : `ಸಾಂಪ್ರದಾಯಿಕ ಮಾರ್ಗದರ್ಶನ: ${p.kannada_meaning || p.kannada_explanation}`
    }));
    setResults(top3);
    setRagSource('local-rag');
    setLoading(false);
  };

  const handleSelectScenario = (sit) => {
    setActiveScenarioId(sit.id);
    const query = lang === 'kn' ? sit.situation_kn : sit.situation_en;
    setInputText(query);
    handleSearch(query);
  };

  const handleReset = () => {
    setInputText('');
    setActiveScenarioId(null);
    setResults([]);
    setHasSearched(false);
    setRagSource(null);
    stopAudio();
  };

  // Audio Playback with voice detection and error handling
  const stopAudio = () => {
    stopAllAudio();
    setPlayingAudio(null);
  };

  const handlePlayProverbAudio = (proverb) => {
    if (playingAudio?.id === proverb.id && playingAudio?.type === 'proverb') {
      stopAudio();
      return;
    }
    stopAudio();
    setAudioError(null);

    playKannadaAudio({
      text: proverb.kannada,
      audioUrl: proverb.audio_url,
      rate: 0.85,
      onStart: ({ source, voice }) => {
        setPlayingAudio({ id: proverb.id, type: 'proverb', source, voice });
      },
      onEnd: () => setPlayingAudio(null),
      onError: (err) => {
        setPlayingAudio(null);
        setAudioError(err);
      }
    });
  };

  const handlePlayExplanationAudio = (proverb) => {
    if (playingAudio?.id === proverb.id && playingAudio?.type === 'explanation') {
      stopAudio();
      return;
    }
    stopAudio();
    setAudioError(null);

    const textToSpeak = proverb.recommendation_explanation_kn || proverb.kannada_meaning || proverb.kannada_explanation || proverb.kannada;

    playKannadaAudio({
      text: textToSpeak,
      rate: 0.88,
      onStart: ({ source, voice }) => {
        setPlayingAudio({ id: proverb.id, type: 'explanation', source, voice });
      },
      onEnd: () => setPlayingAudio(null),
      onError: (err) => {
        setPlayingAudio(null);
        setAudioError(err);
      }
    });
  };

  const handleCopy = (proverb) => {
    const textToCopy = `"${proverb.kannada}"\n(${proverb.transliteration})\n\nContextual Advice: ${proverb.recommendation_explanation_en || proverb.english_meaning}\nಕನ್ನಡ ವಿವರಣೆ: ${proverb.recommendation_explanation_kn || proverb.kannada_meaning}\n\nVia Gaadhe Kosha (AI Proverb Companion)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(proverb.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kgold-100 border border-kgold-300 text-kgold-900 text-xs font-bold mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-kgold-700 animate-pulse" />
          <span>{lang === 'kn' ? 'ಜೆಮಿನಿ AI ಆಧಾರಿತ ಗಾದೆ ಶಿಫಾರಸು ಎಂಜಿನ್ (RAG)' : 'Gemini AI-Powered Proverb Companion (RAG)'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-brown-950 font-serif mb-2">
          {t.situationFinderTitle}
        </h2>
        <p className="text-sm sm:text-base text-brown-700 max-w-2xl mx-auto">
          {lang === 'kn' 
            ? 'ನಿಮ್ಮ ಯಾವುದೇ ದೈನಂದಿನ ಸಮಸ್ಯೆ, ಸಂದಿಗ್ಧ ಅಥವಾ ಪರಿಸ್ಥಿತಿಯನ್ನು ವಿವರಿಸಿ. ನಮ್ಮ AI ವ್ಯವಸ್ಥೆಯು 2,868 ಪ್ರಾಚೀನ ಗಾದೆಗಳಿಂದ ಅತ್ಯಂತ ಸೂಕ್ತವಾದ 3 ಗಾದೆಗಳನ್ನು ಆಯ್ದು ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ.'
            : 'Describe any dilemma or everyday situation in English or Kannada. Our AI retrieves the top 3 best matching proverbs from our authentic 2,868 archive and provides tailored life lessons.'}
        </p>
      </div>

      {/* Main Interactive Input Card */}
      <div className="parchment-card rounded-2xl p-5 sm:p-7 shadow-warm mb-8 border border-cream-200">
        
        <label className="block text-sm font-bold text-brown-950 mb-2 flex items-center justify-between">
          <span>{lang === 'kn' ? 'ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿ ಅಥವಾ ಸಂದಿಗ್ಧತೆಯನ್ನು ವಿವರಿಸಿ:' : 'Describe your dilemma or real-life situation:'}</span>
          <span className="text-xs font-normal text-brown-600">
            {lang === 'kn' ? 'ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ' : 'Type in Kannada or English'}
          </span>
        </label>
        
        <div className="relative mb-4">
          <textarea
            rows="3"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setActiveScenarioId(null);
            }}
            placeholder={lang === 'kn' 
              ? 'ಉದಾಹರಣೆಗೆ: "ಸ್ನೇಹಿತನಿಗೆ ಸಾಲ ಕೊಟ್ಟೆ, ಈಗ ಕೇಳಿದರೆ ಜಗಳವಾಡುತ್ತಿದ್ದಾನೆ..." ಅಥವಾ "ಪರೀಕ್ಷೆ ಹತ್ತಿರ ಬಂತು, ಓದಲು ಆಲಸ್ಯವೆನಿಸುತ್ತಿದೆ..."' 
              : 'e.g. "I loaned money to a good friend and now he avoids my calls..." or "Feeling lazy and distracted before final exams..."'}
            className="w-full p-4 rounded-xl border border-cream-300 bg-white text-brown-900 placeholder-brown-400 focus:border-kred-600 focus:ring-4 focus:ring-kred-100 text-sm sm:text-base outline-none resize-none shadow-sm leading-relaxed"
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <button
            onClick={() => handleSearch(inputText)}
            disabled={!inputText.trim() || loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-kred-700 hover:bg-kred-800 disabled:opacity-50 disabled:cursor-not-allowed text-cream-50 font-bold text-sm shadow-md transition-all active:scale-95"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-kgold-200" />
                <span>{lang === 'kn' ? 'ಗಾದೆಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...' : 'Finding Proverbs...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-kgold-200" />
                <span>{lang === 'kn' ? 'ಉತ್ತಮ 3 ಗಾದೆಗಳನ್ನು ಹುಡುಕಿ (Gemini RAG)' : 'Find Top 3 Proverbs (Gemini RAG)'}</span>
              </>
            )}
          </button>

          {(inputText || hasSearched) && (
            <button
              onClick={handleReset}
              className="text-xs text-brown-600 hover:text-brown-900 underline font-medium"
            >
              {lang === 'kn' ? 'ಮರುಹೊಂದಿಸಿ (Clear)' : 'Clear and start over'}
            </button>
          )}
        </div>

        {/* 400+ Real-Life Situations Catalog Selector */}
        <div className="pt-4 border-t border-cream-200">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-brown-900">
              <Lightbulb className="w-4 h-4 text-kgold-600" />
              <span>
                {lang === 'kn' 
                  ? 'ಅಥವಾ 425+ ನೈಜ ಜೀವನದ ಸಂದರ್ಭಗಳಿಂದ ಆರಿಸಿ:' 
                  : 'Or choose from 425+ Curated Real-Life Scenarios:'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cream-200 text-brown-700 font-mono">
                {situationsCatalog.length} situations
              </span>
            </div>

            {/* Scenario Category Filter Tabs */}
            <div className="flex items-center gap-1 text-[11px] overflow-x-auto pb-1">
              {[
                { id: 'all', label: lang === 'kn' ? 'ಎಲ್ಲವೂ' : 'All' },
                { id: 'education', label: lang === 'kn' ? 'ಶಿಕ್ಷಣ' : 'Education' },
                { id: 'friendship', label: lang === 'kn' ? 'ಸ್ನೇಹ' : 'Friendship' },
                { id: 'money', label: lang === 'kn' ? 'ಹಣಕಾಸು' : 'Money' },
                { id: 'family', label: lang === 'kn' ? 'ಕುಟುಂಬ' : 'Family' },
                { id: 'unity', label: lang === 'kn' ? 'ಒಗ್ಗಟ್ಟು' : 'Unity' },
                { id: 'life', label: lang === 'kn' ? 'ಜೀವನ' : 'Life' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-md transition-colors font-medium whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-brown-900 text-cream-50'
                      : 'bg-white text-brown-700 hover:bg-cream-200 border border-cream-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Scenario Pills (Show 8 most relevant from the filtered 425 set) */}
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
            {filteredScenarios.slice(0, 10).map((sit) => (
              <button
                key={sit.id}
                onClick={() => handleSelectScenario(sit)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all text-left flex items-center gap-1.5 ${
                  activeScenarioId === sit.id
                    ? 'bg-kred-800 text-cream-50 border-kred-800 font-semibold shadow-sm'
                    : 'bg-white hover:bg-cream-100 text-brown-800 border-cream-300 hover:border-cream-400 font-medium'
                }`}
                title={lang === 'kn' ? sit.situation_kn : sit.situation_en}
              >
                <ArrowRight className="w-3 h-3 text-kgold-600 shrink-0" />
                <span className="line-clamp-1">
                  {lang === 'kn' ? sit.title_kn : sit.title_en}
                </span>
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="py-12 text-center parchment-card rounded-2xl border border-cream-200">
          <RefreshCw className="w-10 h-10 text-kred-700 animate-spin mx-auto mb-3" />
          <h4 className="text-base font-bold text-brown-950 font-serif">
            {lang === 'kn' ? 'ಜೆಮಿನಿ RAG ಮೂಲಕ ಗಾದೆಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...' : 'Gemini RAG is analyzing your situation...'}
          </h4>
          <p className="text-xs sm:text-sm text-brown-600 max-w-sm mx-auto mt-1">
            {lang === 'kn' 
              ? '2,868 ಪ್ರಾಚೀನ ಗಾದೆಗಳಿಂದ ಅತ್ಯಂತ ಪ್ರಸ್ತುತ 3 ಗಾದೆಗಳನ್ನು ಶೋಧಿಸಿ ವಿವರಣೆ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ.'
              : 'Scanning 2,868 traditional Kannada proverbs to select the 3 most profound life lessons.'}
          </p>
        </div>
      )}

      {/* Top 3 Recommendations Results Section */}
      {!loading && hasSearched && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between border-b border-cream-200 pb-3 gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-brown-950 font-serif flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-kgold-600" />
                <span>{lang === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಲಾದ ಅತ್ಯುತ್ತಮ 3 ಗಾದೆಗಳು' : 'Top 3 Recommended Kannada Proverbs'}</span>
              </h3>
              <p className="text-xs text-brown-600 mt-0.5">
                {ragSource === 'gemini-rag' ? (
                  <span className="text-emerald-700 font-medium">✓ Powered by Gemini 1.5 Flash RAG</span>
                ) : (
                  <span className="text-brown-500">Corpus Semantic Match</span>
                )}
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-kred-100 text-kred-800">
              {results.length} {lang === 'kn' ? 'ಗಾದೆಗಳು' : 'proverbs selected'}
            </span>
          </div>

          {/* Audio Unavailable or Notice Banner */}
          {audioError && (
            <div className="mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5 shadow-sm">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="font-bold text-amber-900">
                  {lang === 'kn' ? 'ಧ್ವನಿ ಲಭ್ಯತೆಯ ಮಾಹಿತಿ (Audio Notice):' : 'Audio Availability Notice:'}
                </p>
                <p className="text-amber-800 leading-relaxed">
                  {lang === 'kn' ? audioError.message_kn : audioError.message_en}
                </p>
              </div>
              <button 
                onClick={() => setAudioError(null)} 
                className="p-1 rounded-lg text-amber-700 hover:text-amber-950 hover:bg-amber-200/60 font-bold"
              >
                ×
              </button>
            </div>
          )}

          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 pt-2">
              {results.map((proverb, idx) => {
                const isLiked = !!localLikes[proverb.id];
                const isProverbPlaying = playingAudio?.id === proverb.id && playingAudio?.type === 'proverb';
                const isExplPlaying = playingAudio?.id === proverb.id && playingAudio?.type === 'explanation';

                const rankLabels = [
                  { en: '#1 Primary Recommendation', kn: '#೧ ಪ್ರಮುಖ ಗಾದೆ ಶಿಫಾರಸು', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
                  { en: '#2 Contextual Wisdom', kn: '#೨ ಪೂರಕ ನಾಣ್ಣುಡಿ', color: 'bg-blue-100 text-blue-800 border-blue-300' },
                  { en: '#3 Alternative Perspective', kn: '#೩ ಪರ್ಯಾಯ ಜೀವನ ಪಾಠ', color: 'bg-purple-100 text-purple-800 border-purple-300' }
                ];
                const rankMeta = rankLabels[idx] || rankLabels[0];

                return (
                  <div
                    key={proverb.id || idx}
                    className="parchment-card rounded-2xl p-6 sm:p-7 shadow-warm border-2 border-cream-300 hover:border-kred-300 transition-all"
                  >
                    {/* Top Row: Rank Pill, Category & Quick Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-cream-200">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${rankMeta.color}`}>
                          {lang === 'kn' ? rankMeta.kn : rankMeta.en}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cream-200 text-brown-800 border border-cream-300">
                          {lang === 'kn' ? proverb.category_kn : proverb.category?.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(proverb)}
                          title="Copy Proverb & Advice"
                          className="p-1.5 rounded-lg text-brown-600 hover:text-brown-950 hover:bg-cream-200 transition-colors"
                        >
                          {copiedId === proverb.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => onLike && onLike(proverb.id, proverb.likes || 0)}
                          title="Like this proverb"
                          className={`p-1.5 rounded-lg flex items-center gap-1 text-xs font-semibold transition-colors ${
                            isLiked ? 'text-kred-700 bg-kred-50' : 'text-brown-500 hover:text-kred-700 hover:bg-cream-200'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-kred-600 text-kred-600' : ''}`} />
                          <span>{proverb.likes || 0}</span>
                        </button>
                      </div>
                    </div>

                    {/* Proverb Kannada Heading */}
                    <div className="mb-3">
                      <h4 className="font-kannada text-2xl sm:text-3xl font-extrabold text-brown-950 leading-snug mb-1">
                        "{proverb.kannada}"
                      </h4>
                      {proverb.transliteration && (
                        <p className="text-sm sm:text-base text-brown-600 italic font-serif">
                          {proverb.transliteration}
                        </p>
                      )}
                    </div>

                    {/* Tailored Bilingual Recommendations Box */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 p-4 rounded-xl bg-white border border-cream-200 shadow-sm">
                      {/* Kannada Tailored Advice */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-kred-800">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>ಕನ್ನಡ ಜೀವನ ಪಾಠ (Life Lesson):</span>
                        </div>
                        <p className="font-kannada text-sm text-brown-900 leading-relaxed">
                          {proverb.recommendation_explanation_kn || proverb.kannada_meaning || proverb.kannada_explanation}
                        </p>
                      </div>

                      {/* English Tailored Advice */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-kgold-800">
                          <Compass className="w-3.5 h-3.5" />
                          <span>Why this applies (English Guidance):</span>
                        </div>
                        <p className="text-xs sm:text-sm text-brown-800 leading-relaxed font-sans">
                          {proverb.recommendation_explanation_en || proverb.english_meaning}
                        </p>
                      </div>
                    </div>

                    {/* Dual Audio Playback Controls */}
                    <div className="pt-3 border-t border-cream-200 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* 1. Play Proverb Audio */}
                        <button
                          onClick={() => handlePlayProverbAudio(proverb)}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                            isProverbPlaying
                              ? 'bg-kred-700 text-cream-50 ring-2 ring-kred-400'
                              : 'bg-cream-200/90 hover:bg-cream-300 text-brown-900 border border-cream-300'
                          }`}
                        >
                          {isProverbPlaying ? (
                            <>
                              <VolumeX className="w-4 h-4 text-kgold-200 animate-pulse" />
                              <span>{lang === 'kn' ? 'ನಿಲ್ಲಿಸಿ' : 'Stop Audio'}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-4 h-4 text-kred-700" />
                              <span>
                                {proverb.audio_url 
                                  ? (lang === 'kn' ? 'ಗಾದೆ ಆಲಿಸಿ (ದಾಖಲಿತ ಧ್ವನಿ)' : 'Play Proverb (Recorded Audio)')
                                  : (lang === 'kn' ? 'ಗಾದೆ ಆಲಿಸಿ (ಕನ್ನಡ ಧ್ವನಿ)' : 'Play Proverb Audio')}
                              </span>
                            </>
                          )}
                        </button>

                        {/* 2. Play Explanation Audio */}
                        <button
                          onClick={() => handlePlayExplanationAudio(proverb)}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                            isExplPlaying
                              ? 'bg-brown-900 text-cream-50 ring-2 ring-brown-400'
                              : 'bg-white hover:bg-cream-100 text-brown-900 border border-cream-300'
                          }`}
                        >
                          {isExplPlaying ? (
                            <>
                              <VolumeX className="w-4 h-4 text-kgold-200 animate-pulse" />
                              <span>{lang === 'kn' ? 'ನಿಲ್ಲಿಸಿ' : 'Stop Audio'}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-4 h-4 text-kgold-700" />
                              <span>{lang === 'kn' ? 'ವಿವರಣೆ ಆಲಿಸಿ (ಕನ್ನಡ ಧ್ವನಿ)' : 'Play Advice Audio'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Active Audio State & Source Distinction */}
                      <div className="flex items-center gap-2">
                        {(isProverbPlaying || isExplPlaying) && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-kred-800 bg-kred-50 px-2.5 py-0.5 rounded-full border border-kred-200 animate-pulse">
                            {playingAudio?.source === 'stored' ? '🎙️ Authentic Stored Recording' : '🔊 Kannada Voice Assistant'}
                          </span>
                        )}

                        {/* Source tag */}
                        <span className="text-[11px] text-brown-500 italic">
                          {proverb.source ? `Source: ${proverb.source.slice(0, 30)}` : 'Traditional Folklore'}
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 parchment-card rounded-2xl border border-cream-200">
              <HelpCircle className="w-12 h-12 text-brown-400 mx-auto mb-3" />
              <p className="text-base font-bold text-brown-900 mb-1">{t.noResults}</p>
              <p className="text-xs sm:text-sm text-brown-600 max-w-sm mx-auto">
                {lang === 'kn'
                  ? 'ದಯವಿಟ್ಟು ಬೇರೆ ವಿವರಣೆಯನ್ನು ನೀಡಿ ಅಥವಾ ಮೇಲಿನ ನೈಜ ಸನ್ನಿವೇಶಗಳಿಂದ ಆಯ್ಕೆಮಾಡಿ.'
                  : 'Please describe the dilemma in different words or pick from our curated situations above.'}
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
