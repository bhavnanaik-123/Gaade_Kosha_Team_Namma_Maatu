import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES } from '../data/initialProverbs';
import { Heart, Sparkles, BookOpen, Quote } from 'lucide-react';

export const Footer = ({ onSelectCategory, onOpenContribute, setActiveTab }) => {
  const { lang, t } = useLanguage();

  return (
    <footer className="mt-16 bg-cream-100 border-t border-cream-300/80 text-brown-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-kred-700 flex items-center justify-center text-cream-50 font-bold shadow-md shadow-kred-900/15">
                <span className="font-kannada text-xl font-bold">ಗಾ</span>
              </div>
              <span className="text-xl font-bold text-brown-950 font-serif">
                {lang === 'kn' ? 'ಗಾದೆ ಕೋಶ' : 'Gaadhe Kosha'}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-brown-700 leading-relaxed max-w-sm">
              {lang === 'kn'
                ? 'ಕನ್ನಡ ಗಾದೆಗಳು ಕೇವಲ ಮಾತುಗಳಲ್ಲ, ನಮ್ಮ ಹಿರಿಯರ ಸಹಸ್ರಾರು ವರ್ಷಗಳ ಬದುಕಿನ ಅನುಭವ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಜ್ಞಾನದ ಅಮೃತಬಿಂದುಗಳು.'
                : 'A modern companion preserving and celebrating timeless Kannada proverbs, folk wisdom, and cultural heritage for the digital age.'}
            </p>

            <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-cream-200/80 border border-cream-300 text-xs text-brown-900 font-serif">
              <Quote className="w-3.5 h-3.5 text-kred-700 shrink-0" />
              <span>{lang === 'kn' ? 'ವೇದ ಸುಳ್ಳಾದರೂ ಗಾದೆ ಸುಳ್ಳಾಗದು' : 'Scriptures may falter, but folk proverbs never fail.'}</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-brown-950 mb-3 font-serif">
              {lang === 'kn' ? 'ವಿಭಾಗಗಳು' : 'Categories'}
            </h4>
            <ul className="space-y-1.5 text-xs text-brown-700">
              {CATEGORIES.slice(1).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setActiveTab('browse');
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className="hover:text-kred-700 transition-colors"
                  >
                    {lang === 'kn' ? cat.label_kn : cat.label_en}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Engagement */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-brown-950 mb-3 font-serif">
              {lang === 'kn' ? 'ಅನ್ವೇಷಿಸಿ' : 'Explore'}
            </h4>
            <ul className="space-y-2 text-xs text-brown-700">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('browse');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-kred-700 transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-brown-500" />
                  <span>{lang === 'kn' ? 'ಎಲ್ಲಾ ಗಾದೆಗಳು' : 'All Proverbs'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('situation');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-kred-700 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-kgold-600" />
                  <span>{lang === 'kn' ? 'ಸಂದರ್ಭ ಶಿಫಾರಸು' : 'Situation Recommender'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContribute}
                  className="hover:text-kred-700 transition-colors flex items-center gap-1.5 font-semibold text-kred-800"
                >
                  <Heart className="w-3.5 h-3.5 fill-kred-700 text-kred-700" />
                  <span>{t.contributeButton}</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-cream-300 text-center text-xs text-brown-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Gaadhe Kosha (ಗಾದೆ ಕೋಶ) — Built for Karnataka & Kannada Lovers</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-kred-600 fill-kred-600 inline" />
            <span>for Kannada Folk Heritage</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
