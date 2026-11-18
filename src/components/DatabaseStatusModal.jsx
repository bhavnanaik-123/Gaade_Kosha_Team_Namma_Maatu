import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { isSupabaseConfigured } from '../services/supabaseClient';
import { X, Database, CheckCircle2, ShieldCheck, Terminal, Copy, Check, ExternalLink } from 'lucide-react';

export const DatabaseStatusModal = ({ isOpen, onClose, isCloudConnected = false }) => {
  const { lang } = useLanguage();
  const hasSupabase = isCloudConnected;
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sqlSetupSnippet = `-- 1. Run supabase/schema.sql in your Supabase SQL Editor
-- 2. Add to your .env.local:
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-publishable-key`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(sqlSetupSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brown-950/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-lg bg-cream-50 rounded-3xl shadow-2xl border border-cream-300 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-cream-200 bg-cream-100">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${
              hasSupabase ? 'bg-emerald-600' : 'bg-amber-600'
            }`}>
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-brown-950 font-serif">
                {lang === 'kn' ? 'ಡೇಟಾಬೇಸ್ ಸ್ಥಿತಿ & Supabase ವಿವರ' : 'Database Status & Supabase Info'}
              </h3>
              <p className="text-xs text-brown-600">
                {hasSupabase 
                  ? (lang === 'kn' ? 'Supabase ಕ್ಲೌಡ್ ಡೇಟಾಬೇಸ್ ಸಕ್ರಿಯವಾಗಿದೆ' : 'Supabase Cloud Database is Active') 
                  : (lang === 'kn' ? 'ಪ್ರಸ್ತುತ ಸ್ಥಳೀಯ ಮಾದರಿಯಲ್ಲಿ ಚಾಲನೆಯಲ್ಲಿದೆ' : 'Currently Running in Local Offline Mode')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brown-500 hover:text-brown-900 hover:bg-cream-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm text-brown-800">
          
          {/* Current Status Box */}
          <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
            hasSupabase 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${hasSupabase ? 'text-emerald-600' : 'text-amber-600'}`} />
            <div>
              <p className="font-bold text-sm">
                {hasSupabase 
                  ? (lang === 'kn' ? 'ಲೈವ್ Supabase ಡೇಟಾಬೇಸ್ ಸಂಪರ್ಕಗೊಂಡಿದೆ' : 'Live Supabase Cloud Database Connected') 
                  : (lang === 'kn' ? 'ಸ್ಥಳೀಯ ಮಾದರಿ (Local Mode - Safe & Ready)' : 'Local Mode Active (Safe & Ready)')}
              </p>
              <p className="text-xs mt-1 leading-relaxed opacity-90">
                {hasSupabase
                  ? (lang === 'kn' ? 'ಎಲ್ಲಾ ಗಾದೆಗಳು ಮತ್ತು ಹೊಸ ಕೊಡುಗೆಗಳು ನೇರವಾಗಿ ಕ್ಲೌಡ್ ಡೇಟಾಬೇಸ್‌ನೊಂದಿಗೆ ಸಿಂಕ್ ಆಗುತ್ತಿವೆ.' : 'All proverbs, likes and contributions are syncing live with your Supabase cloud PostgreSQL instance.')
                  : (lang === 'kn' ? 'ಅಪ್ಲಿಕೇಶನ್ ಸ್ಥಳೀಯ JSON ಮಾದರಿಯೊಂದಿಗೆ ಸಂಪೂರ್ಣವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ. ಹೊಸ ಗಾದೆಗಳು ಮತ್ತು ಲೈಕ್‌ಗಳು ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹವಾಗುತ್ತವೆ.' : 'The app is fully functioning with the curated Kannada dataset. Contributed proverbs and likes are preserved in local storage.')}
              </p>
            </div>
          </div>

          {/* Setup Guide */}
          <div>
            <h4 className="font-bold text-brown-950 text-xs uppercase tracking-wider mb-2">
              {lang === 'kn' ? 'Supabase ಕ್ಲೌಡ್ ಜೋಡಣೆ ಹೇಗೆ?' : 'How to Connect Supabase Later'}
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-xs text-brown-700 leading-relaxed bg-cream-100 p-4 rounded-xl border border-cream-200">
              <li>
                <strong>{lang === 'kn' ? 'ಯೋಜನೆ ರಚಿಸಿ: ' : 'Create Project: '}</strong> 
                {lang === 'kn' ? 'supabase.com ನಲ್ಲಿ ಉಚಿತ ಖಾತೆಯಲ್ಲಿ ಪ್ರಾಜೆಕ್ಟ್ ತೆರೆಯಿರಿ.' : 'Sign in to supabase.com and create a project.'}
              </li>
              <li>
                <strong>{lang === 'kn' ? 'ಸ್ಕೀಮಾ ರನ್ ಮಾಡಿ: ' : 'Run SQL Schema: '}</strong> 
                {lang === 'kn' ? 'ಪ್ರಾಜೆಕ್ಟ್‌ನ `supabase/schema.sql` ಫೈಲ್ ಅನ್ನು SQL Editor ನಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ ರನ್ ಮಾಡಿ.' : 'Run the generated `supabase/schema.sql` in Supabase SQL Editor.'}
              </li>
              <li>
                <strong>{lang === 'kn' ? 'ಕೀಗಳನ್ನು ಒದಗಿಸಿ: ' : 'Provide Credentials: '}</strong> 
                {lang === 'kn' ? 'ನಿಮ್ಮ Project URL ಮತ್ತು Publishable Key ಅನ್ನು ಒದಗಿಸಿದಾಗ ಅಪ್ಲಿಕೇಶನ್ ತಕ್ಷಣ ಲೈವ್ ಆಗುತ್ತದೆ.' : 'Share the Project URL and Anon/Publishable Key when requested to go live!'}
              </li>
            </ol>
          </div>

          {/* Quick Code Snippet */}
          <div className="relative bg-brown-950 text-cream-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto">
            <button
              onClick={handleCopySnippet}
              className="absolute top-2.5 right-2.5 p-1 rounded bg-brown-800 hover:bg-brown-700 text-cream-100 transition-colors"
              title="Copy snippet"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <pre className="pr-8">{sqlSetupSnippet}</pre>
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-brown-900 text-cream-50 font-bold text-xs hover:bg-brown-950 transition-colors"
            >
              {lang === 'kn' ? 'ಸರಿ, ಮುಚ್ಚಿ' : 'Got it, Close'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
