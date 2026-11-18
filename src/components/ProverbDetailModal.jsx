import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalLikes } from '../services/proverbService';
import { playKannadaAudio, stopAllAudio } from '../utils/audioPlayer';
import { X, Volume2, VolumeX, Copy, Check, Heart, Compass, Tag, User, BookOpen, Share2, AlertCircle } from 'lucide-react';

export const ProverbDetailModal = ({ proverb, isOpen, onClose, onLike }) => {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioToast, setAudioToast] = useState(null);

  if (!isOpen || !proverb) return null;

  const localLikes = getLocalLikes();
  const isLiked = !!localLikes[proverb.id];

  const hasAuthenticTranslation = Boolean(
    proverb.english_meaning && 
    !proverb.english_meaning.startsWith('[Translation') && 
    proverb.english_meaning.trim().length > 0
  );

  const isPendingTranslation = !hasAuthenticTranslation;

  const handleCopy = () => {
    const textToCopy = `"${proverb.kannada}"\n(${proverb.transliteration})\n\nMeaning (English): ${hasAuthenticTranslation ? proverb.english_meaning : 'Pending editorial review'}\nMeaning (Kannada): ${proverb.kannada_meaning || proverb.kannada_explanation}\n\nWhen to use: ${proverb.situation || ''}\n\nVia Gaadhe Kosha – Kannada Proverb Companion`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brown-950/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-cream-50 rounded-3xl shadow-2xl border border-cream-300 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with category and close */}
        <div className="flex items-center justify-between p-5 border-b border-cream-200 bg-cream-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-kred-100 text-kred-800 border border-kred-200">
              {lang === 'kn' ? proverb.category_kn : proverb.category?.toUpperCase()}
            </span>
            
            {proverb.is_verified ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
                {lang === 'kn' ? 'ಪರಿಶೀಲಿತ' : 'Verified'}
              </span>
            ) : hasAuthenticTranslation ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300" title="Translation under review">
                {lang === 'kn' ? 'ಪರಿಶೀಲನೆ ಬಾಕಿ' : 'Under Review'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-300">
                {lang === 'kn' ? 'ಅನುವಾದ ಬಾಕಿ' : 'Translation Pending'}
              </span>
            )}

            {proverb.audio_url && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200">
                🎙️ {lang === 'kn' ? 'ದಾಖಲಿತ ಧ್ವನಿ' : 'Stored Audio'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeak}
              title={isSpeaking ? (lang === 'kn' ? 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ' : 'Stop Audio') : t.listenLabel}
              className={`p-2 rounded-xl transition-colors ${
                isSpeaking 
                  ? 'bg-kred-100 text-kred-700 animate-pulse' 
                  : 'bg-cream-200 hover:bg-cream-300 text-brown-800'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-kred-700" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleCopy}
              title={t.copyLabel}
              className="p-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-brown-800 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-brown-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Audio Unavailable Toast if triggered */}
          {audioToast && (
            <div className="p-3 rounded-xl bg-amber-100 border border-amber-300 text-xs text-amber-900 flex items-start gap-2 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>{audioToast}</span>
            </div>
          )}

          {/* Main Kannada Proverb */}
          <div className="text-center sm:text-left">
            <h2 className="font-kannada text-2xl sm:text-3xl font-extrabold text-brown-950 leading-tight mb-2">
              "{proverb.kannada}"
            </h2>
            {proverb.transliteration && (
              <p className="text-sm sm:text-base text-brown-600 italic font-serif">
                {proverb.transliteration}
              </p>
            )}
          </div>

          {/* Meaning Cards */}
          <div className="grid grid-cols-1 gap-4">
            
            {/* Kannada Meaning */}
            {(proverb.kannada_meaning || proverb.kannada_explanation) && (
              <div className="p-4 rounded-2xl bg-cream-100/90 border border-cream-200">
                <div className="flex items-center gap-2 mb-1.5">
                  <BookOpen className="w-4 h-4 text-kred-700" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brown-900 font-sans">
                    ಕನ್ನಡ ತಾತ್ಪರ್ಯ (Kannada Explanation)
                  </h4>
                </div>
                <p className="font-kannada text-sm sm:text-base text-brown-900 leading-relaxed">
                  {proverb.kannada_meaning || proverb.kannada_explanation}
                </p>
              </div>
            )}

            {/* English Meaning */}
            <div className="p-4 rounded-2xl bg-white border border-cream-200 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <BookOpen className="w-4 h-4 text-kgold-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-brown-900 font-sans">
                  English Meaning & Moral
                </h4>
              </div>
              {isPendingTranslation ? (
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs sm:text-sm text-brown-800 space-y-1">
                  <p className="font-semibold text-amber-900">
                    English translation pending editorial review.
                  </p>
                  <p className="text-brown-700 italic">
                    This authentic Kannada folk adage is part of our comprehensive cultural archive. Community and editorial translations are underway.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm sm:text-base text-brown-800 leading-relaxed font-sans">
                    {proverb.english_meaning}
                  </p>
                  {!proverb.is_verified && (
                    <p className="text-[11px] text-amber-800 italic mt-2 pt-2 border-t border-cream-200">
                      ⚠️ Note: This cultural translation is currently under editorial review.
                    </p>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Real-Life Situation */}
          {(proverb.situation || proverb.situation_kn) && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center gap-2 mb-1.5">
                <Compass className="w-4 h-4 text-amber-700" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  {t.situationLabel}
                </h4>
              </div>
              <p className="text-sm text-brown-900 leading-relaxed">
                {lang === 'kn' ? (proverb.situation_kn || proverb.situation) : (proverb.situation || proverb.situation_kn)}
              </p>
            </div>
          )}

          {/* Tags & Contributor Metadata */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-cream-200 text-xs text-brown-600">
            {proverb.tags && proverb.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-brown-500" />
                {proverb.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-cream-200 text-brown-800 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {proverb.contributor && (
              <div className="flex items-center gap-1.5 text-brown-700">
                <User className="w-3.5 h-3.5 text-kred-700" />
                <span>{proverb.contributor}</span>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-4 flex items-center justify-between border-t border-cream-200">
            <button
              onClick={() => onLike(proverb.id, proverb.likes || 0)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isLiked
                  ? 'bg-kred-100 text-kred-800 border border-kred-300'
                  : 'bg-cream-200 hover:bg-cream-300 text-brown-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-kred-600 text-kred-600' : ''}`} />
              <span>{isLiked ? 'ಇಷ್ಟಪಟ್ಟಿದ್ದೀರಿ (Liked)' : 'ಇಷ್ಟಪಡಿ (Like)'} ({proverb.likes || 0})</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-kred-700 hover:bg-kred-800 text-cream-50 text-xs font-bold transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? t.copiedToast : t.copyLabel}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
