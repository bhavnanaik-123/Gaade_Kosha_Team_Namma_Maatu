import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalLikes } from '../services/proverbService';
import { playKannadaAudio, stopAllAudio } from '../utils/audioPlayer';
import { Heart, Volume2, VolumeX, Copy, Check, Tag, Compass, Sparkles, AlertCircle } from 'lucide-react';

export const ProverbCard = ({ proverb, onLike, onClick }) => {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioToast, setAudioToast] = useState(null);

  const localLikes = getLocalLikes();
  const isLiked = !!localLikes[proverb.id];

  // Determine whether an authentic, non-placeholder English translation exists
  const hasAuthenticTranslation = Boolean(
    proverb.english_meaning && 
    !proverb.english_meaning.startsWith('[Translation') && 
    proverb.english_meaning.trim().length > 0
  );
  
  const isPendingTranslation = !hasAuthenticTranslation;
  const displayEnglishMeaning = hasAuthenticTranslation
    ? proverb.english_meaning
    : 'English translation pending editorial review. Traditional Kannada folk wisdom.';
  
  const displayKannadaMeaning = proverb.kannada_meaning || proverb.kannada_explanation;

  const handleCopy = (e) => {
    e.stopPropagation();
    const textToCopy = `"${proverb.kannada}"\n(${proverb.transliteration})\nMeaning: ${displayEnglishMeaning}\n- Gaadhe Kosha`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = (e) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopAllAudio();
      setIsSpeaking(false);
      return;
    }

    playKannadaAudio({
      text: proverb.kannada,
      audioUrl: proverb.audio_url,
      rate: 0.85,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: (err) => {
        setIsSpeaking(false);
        setAudioToast(lang === 'kn' ? err.message_kn : err.message_en);
        setTimeout(() => setAudioToast(null), 5000);
      }
    });
  };

  const handleLike = (e) => {
    e.stopPropagation();
    onLike(proverb.id, proverb.likes || 0);
  };

  return (
    <div
      onClick={() => onClick(proverb)}
      className="group relative flex flex-col justify-between parchment-card rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-warm-lg cursor-pointer border border-cream-200"
    >
      {/* Top Meta Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Category & Status Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-kred-50 text-kred-800 border border-kred-200">
              {lang === 'kn' ? proverb.category_kn : (proverb.category?.toUpperCase() || 'GENERAL')}
            </span>
            
            {proverb.is_verified ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
                {lang === 'kn' ? 'ಪರಿಶೀಲಿತ' : 'Verified'}
              </span>
            ) : hasAuthenticTranslation ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-300" title="Translation under review">
                {lang === 'kn' ? 'ಪರಿಶೀಲನೆ ಬಾಕಿ' : 'Under Review'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-700 border border-stone-300">
                {lang === 'kn' ? 'ಅನುವಾದ ಬಾಕಿ' : 'Translation Pending'}
              </span>
            )}

            {proverb.audio_url && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-800 border border-blue-200">
                🎙️ {lang === 'kn' ? 'ದಾಖಲಿತ ಧ್ವನಿ' : 'Audio'}
              </span>
            )}
          </div>

          {/* Quick Actions (Audio, Copy, Like) */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleSpeak}
              title={isSpeaking ? (lang === 'kn' ? 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ' : 'Stop Audio') : t.listenLabel}
              className={`p-1.5 rounded-lg transition-colors ${
                isSpeaking 
                  ? 'text-kred-700 bg-kred-100 animate-pulse' 
                  : 'text-brown-600 hover:text-brown-950 hover:bg-cream-200/80'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-kred-700" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleCopy}
              title={t.copyLabel}
              className="p-1.5 rounded-lg text-brown-600 hover:text-brown-950 hover:bg-cream-200/80 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={handleLike}
              title={t.likeLabel}
              className={`p-1.5 rounded-lg flex items-center gap-1 text-xs font-semibold transition-colors ${
                isLiked 
                  ? 'text-kred-700 bg-kred-50 hover:bg-kred-100' 
                  : 'text-brown-500 hover:text-kred-700 hover:bg-cream-200/80'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-kred-600 text-kred-600' : ''}`} />
              <span>{proverb.likes || 0}</span>
            </button>
          </div>
        </div>

        {/* Audio Unavailable Toast if triggered */}
        {audioToast && (
          <div className="mb-2 p-2 rounded-lg bg-amber-100 border border-amber-300 text-[11px] text-amber-900 flex items-start gap-1.5 leading-snug">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
            <span>{audioToast}</span>
          </div>
        )}

        {/* Proverb Kannada Heading */}
        <h3 className="font-kannada text-xl sm:text-2xl font-bold text-brown-950 mb-1.5 leading-snug group-hover:text-kred-800 transition-colors">
          "{proverb.kannada}"
        </h3>

        {/* Transliteration */}
        {proverb.transliteration && (
          <p className="text-xs sm:text-sm text-brown-600 italic font-serif mb-3">
            {proverb.transliteration}
          </p>
        )}

        {/* Meaning Section */}
        <div className="space-y-1.5 mb-4 text-xs sm:text-sm">
          {lang === 'kn' ? (
            <p className="text-brown-800 leading-relaxed">
              <strong className="text-brown-950 font-semibold">
                ಕನ್ನಡ ತಾತ್ಪರ್ಯ: 
              </strong>
              {displayKannadaMeaning}
            </p>
          ) : (
            <div>
              <p className="text-brown-800 leading-relaxed">
                <strong className="text-brown-950 font-semibold">
                  English Meaning: 
                </strong>
                {isPendingTranslation ? (
                  <span className="text-brown-600 italic">
                    English translation pending editorial review. Traditional Kannada folk wisdom.
                  </span>
                ) : (
                  <span>{displayEnglishMeaning}</span>
                )}
              </p>
              {displayKannadaMeaning && (
                <p className="text-xs text-brown-600 font-kannada mt-1">
                  <strong>Kannada: </strong> {displayKannadaMeaning}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer: Situation Context & Tags */}
      <div className="pt-3 border-t border-cream-200/90 space-y-2">
        {/* Situation / Context recommendation - displayed for all records with situation text */}
        {proverb.situation && (
          <div className="flex items-start gap-1.5 text-xs text-brown-700 bg-cream-100/80 p-2 rounded-lg border border-cream-200">
            <Compass className="w-3.5 h-3.5 text-kred-700 shrink-0 mt-0.5" />
            <span className="line-clamp-2">
              <strong className="text-brown-900">{t.situationLabel}: </strong>
              {lang === 'kn' ? (proverb.situation_kn || proverb.situation) : (proverb.situation || proverb.situation_kn)}
            </span>
          </div>
        )}

        {/* Tags */}
        {proverb.tags && proverb.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 pt-1">
            {proverb.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-cream-200/80 text-brown-700 font-medium">
                #{tag}
              </span>
            ))}
            {proverb.tags.length > 3 && (
              <span className="text-[10px] text-brown-500 font-medium">
                +{proverb.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
