import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { playKannadaAudio, stopAllAudio } from '../utils/audioPlayer';
import { Search, Sparkles, BookOpen, Quote, Volume2, VolumeX, Check, Copy } from 'lucide-react';

export const Hero = ({ 
  featuredProverb, 
  searchQuery, 
  setSearchQuery, 
  onProverbClick,
  onQuickFilter 
}) => {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCopy = (e, text) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speakProverb = (e, text, audioUrl) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopAllAudio();
      setIsSpeaking(false);
      return;
    }

    playKannadaAudio({
      text,
      audioUrl,
      rate: 0.85,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream-100 to-cream-50 border-b border-cream-200">
      
      {/* Subtle traditional background motifs */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-kred-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-kgold-100/50 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Sanskrit/Kannada Heritage Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-200/80 border border-cream-300 text-brown-800 text-xs sm:text-sm font-medium mb-6 shadow-sm">
          <Quote className="w-3.5 h-3.5 text-kred-700" />
          <span>{lang === 'kn' ? 'ವೇದ ಸುಳ್ಳಾದರೂ ಗಾದೆ ಸುಳ್ಳಾಗದು' : 'Ancestral Wisdom Through Generations'}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-brown-950 tracking-tight font-serif mb-4 leading-tight">
          {lang === 'kn' ? (
            <>
              ಕನ್ನಡದ ನುಡಿಮುತ್ತುಗಳು <br className="hidden sm:block" />
              <span className="text-kred-700 font-kannada">ನಿಮ್ಮ ಬದುಕಿನ ದಾರಿದೀಪ</span>
            </>
          ) : (
            <>
              Explore the Timeless Wisdom of <br className="hidden sm:block" />
              <span className="text-kred-700">Kannada Proverbs</span>
            </>
          )}
        </h1>

        <p className="text-base sm:text-lg text-brown-700 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          {lang === 'kn'
            ? 'ಶಿಕ್ಷಣ, ಸ್ನೇಹ, ಹಣ, ಕುಟುಂಬ, ಒಗ್ಗಟ್ಟು ಮತ್ತು ಜೀವನದ ಸತ್ಯಗಳನ್ನು ಸಾರುವ ಗಾದೆಗಳ ಅರ್ಥ, ಉದಾಹರಣೆ ಮತ್ತು ಸೂಕ್ತ ಸಂದರ್ಭಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.'
            : 'Discover deep folk philosophy across education, friendship, wealth, family, unity and daily life with meanings and situational recommendations.'}
        </p>

        {/* Global Search Box */}
        <div className="max-w-2xl mx-auto relative mb-6">
          <div className="relative flex items-center">
            <Search className="absolute left-4.5 w-5 h-5 text-brown-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl bg-white border-2 border-cream-300 focus:border-kred-600 focus:ring-4 focus:ring-kred-100 text-brown-900 placeholder-brown-400 text-sm sm:text-base font-medium shadow-warm outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 text-xs bg-cream-200 text-brown-700 hover:bg-cream-300 px-2 py-1 rounded-full font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Quick Search Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-brown-700 mb-10">
          <span className="font-semibold text-brown-900">{lang === 'kn' ? 'ತ್ವರಿತ ಹುಡುಕಾಟ:' : 'Quick search:'}</span>
          {[
            { label: lang === 'kn' ? 'ಹಾಸಿಗೆ / Money' : 'Living within means', query: 'ಹಾಸಿಗೆ' },
            { label: lang === 'kn' ? 'ಸ್ನೇಹ / Friends' : 'True Friendship', query: 'ಸ್ನೇಹ' },
            { label: lang === 'kn' ? 'ಕಠಿಣ ಪರಿಶ್ರಮ / Work' : 'Hard work', query: 'ಕೆಸರಾದರೆ' },
            { label: lang === 'kn' ? 'ಒಗ್ಗಟ್ಟು / Unity' : 'Unity & Team', query: 'ಒಗ್ಗಟ್ಟಿನಲ್ಲಿ' },
            { label: lang === 'kn' ? 'ತಾಯಿ / Mother' : 'Mother & Family', query: 'ತಾಯಿಗಿಂತ' }
          ].map((tag, idx) => (
            <button
              key={idx}
              onClick={() => onQuickFilter(tag.query)}
              className="px-2.5 py-1 rounded-lg bg-cream-200/90 hover:bg-cream-300 text-brown-800 border border-cream-300 font-medium transition-colors"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Featured Proverb Card ("ದಿನದ ಗಾದೆ") */}
        {featuredProverb && (
          <div 
            onClick={() => onProverbClick(featuredProverb)}
            className="text-left max-w-2xl mx-auto rounded-2xl parchment-card p-5 sm:p-6 shadow-warm-lg cursor-pointer transform hover:-translate-y-0.5 transition-all relative overflow-hidden group"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-kgold-100 text-kgold-700 text-xs font-bold border border-kgold-200">
                <Sparkles className="w-3.5 h-3.5" />
                {t.featuredTitle}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={(e) => speakProverb(e, featuredProverb.kannada, featuredProverb.audio_url)}
                  title={isSpeaking ? (lang === 'kn' ? 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ' : 'Stop Audio') : t.listenLabel}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isSpeaking 
                      ? 'bg-kred-100 text-kred-700 animate-pulse' 
                      : 'bg-cream-200/60 hover:bg-cream-300 text-brown-700'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4 text-kred-700" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={(e) => handleCopy(e, `${featuredProverb.kannada} - ${featuredProverb.english_meaning}`)}
                  title={t.copyLabel}
                  className="p-1.5 rounded-lg bg-cream-200/60 hover:bg-cream-300 text-brown-700 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Proverb Kannada Text */}
            <h3 className="font-kannada text-xl sm:text-2xl font-bold text-brown-950 mb-1.5 leading-snug group-hover:text-kred-800 transition-colors">
              "{featuredProverb.kannada}"
            </h3>

            {/* Transliteration */}
            <p className="text-xs sm:text-sm italic text-brown-600 mb-2 font-serif">
              {featuredProverb.transliteration}
            </p>

            {/* Meaning */}
            <p className="text-xs sm:text-sm text-brown-800 line-clamp-2">
              <strong className="text-kred-800">{lang === 'kn' ? 'ಅರ್ಥ: ' : 'Meaning: '}</strong>
              {lang === 'kn' ? featuredProverb.kannada_meaning : featuredProverb.english_meaning}
            </p>

            {/* Situation snippet */}
            <div className="mt-3 pt-3 border-t border-cream-200/80 flex items-center justify-between text-xs text-brown-600">
              <span className="truncate max-w-[80%]">
                <span className="font-medium text-brown-900">{t.situationLabel}:</span> {lang === 'kn' ? featuredProverb.situation_kn : featuredProverb.situation}
              </span>
              <span className="font-semibold text-kred-700 shrink-0 ml-2 group-hover:underline">
                {lang === 'kn' ? 'ವಿವರ ನೋಡಿ →' : 'Details →'}
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
