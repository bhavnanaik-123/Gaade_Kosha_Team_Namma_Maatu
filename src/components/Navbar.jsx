import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { isSupabaseConfigured } from '../services/supabaseClient';
import { BookOpen, Languages, PlusCircle, Sparkles, Database, ExternalLink } from 'lucide-react';

export const Navbar = ({ 
  onOpenContribute, 
  onOpenDbModal, 
  onSelectSituationView, 
  activeTab, 
  setActiveTab,
  isCloudConnected = false 
}) => {
  const { lang, toggleLanguage, t } = useLanguage();
  const hasSupabase = isCloudConnected;

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md border-b border-cream-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => { setActiveTab('browse'); }}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-kred-700 flex items-center justify-center text-cream-50 font-bold shadow-md shadow-kred-900/15 group-hover:bg-kred-800 transition-colors">
              <span className="font-kannada text-2xl font-bold">ಗಾ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-brown-900 font-serif">
                  {lang === 'kn' ? 'ಗಾದೆ ಕೋಶ' : 'Gaadhe Kosha'}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase bg-kred-100 text-kred-800 rounded-full border border-kred-200">
                  {lang === 'kn' ? 'ಕನ್ನಡ' : 'Kannada'}
                </span>
              </div>
              <p className="text-xs text-brown-600 font-medium hidden sm:block">
                {lang === 'kn' ? 'ಕನ್ನಡ ಗಾದೆಗಳ ಜ್ಞಾನ ಭಂಡಾರ' : 'Kannada Proverb Companion'}
              </p>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-cream-100/90 p-1.5 rounded-full border border-cream-200">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'browse'
                  ? 'bg-brown-900 text-cream-50 shadow-sm'
                  : 'text-brown-700 hover:text-brown-950 hover:bg-cream-200/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{lang === 'kn' ? 'ಗಾದೆಗಳು' : 'Browse'}</span>
            </button>

            <button
              onClick={() => setActiveTab('situation')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'situation'
                  ? 'bg-brown-900 text-cream-50 shadow-sm'
                  : 'text-brown-700 hover:text-brown-950 hover:bg-cream-200/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-kgold-500" />
              <span>{lang === 'kn' ? 'ಸಂದರ್ಭ ಶಿಫಾರಸು' : 'Situation Finder'}</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Supabase Status Pill */}
            <button
              onClick={onOpenDbModal}
              title={hasSupabase ? "Supabase Cloud Database Connected" : "Local Mode Active - Click for Supabase Setup"}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                hasSupabase 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
              }`}
            >
              <Database className={`w-3.5 h-3.5 ${hasSupabase ? 'text-emerald-600' : 'text-amber-600'}`} />
              <span className="hidden lg:inline">
                {hasSupabase ? (lang === 'kn' ? 'ಕ್ಲೌಡ್ DB' : 'Cloud DB') : (lang === 'kn' ? 'ಸ್ಥಳೀಯ ಸಂಗ್ರಹ' : 'Local Mode')}
              </span>
              <span className={`w-2 h-2 rounded-full ${hasSupabase ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            </button>

            {/* Language Switch Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-200/70 hover:bg-cream-300/80 border border-cream-300/80 text-brown-900 text-xs sm:text-sm font-semibold transition-colors"
              title="Switch language between Kannada and English"
            >
              <Languages className="w-4 h-4 text-kred-700" />
              <span>{lang === 'kn' ? 'EN' : 'ಕನ್ನಡ'}</span>
            </button>

            {/* Contribute Proverb Button */}
            <button
              onClick={onOpenContribute}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-kred-700 hover:bg-kred-800 active:scale-95 text-cream-50 text-xs sm:text-sm font-semibold shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t.contributeButton}</span>
              <span className="sm:hidden">{lang === 'kn' ? 'ಸೇರಿಸಿ' : 'Add'}</span>
            </button>

          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden items-center justify-around border-t border-cream-200 py-2">
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
              activeTab === 'browse'
                ? 'bg-brown-900 text-cream-50'
                : 'text-brown-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'kn' ? 'ಗಾದೆಗಳು' : 'Browse'}</span>
          </button>
          <button
            onClick={() => setActiveTab('situation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
              activeTab === 'situation'
                ? 'bg-brown-900 text-cream-50'
                : 'text-brown-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-kgold-500" />
            <span>{lang === 'kn' ? 'ಸಂದರ್ಭ ಶಿಫಾರಸು' : 'Situation Finder'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
