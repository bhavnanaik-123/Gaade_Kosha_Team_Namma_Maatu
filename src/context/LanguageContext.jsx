import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  kn: {
    appTitle: "ಗಾದೆ ಕೋಶ",
    appSubtitle: "ಕನ್ನಡ ಗಾದೆಗಳ ಜ್ಞಾನ ಭಂಡಾರ",
    tagline: "ಹಿರಿಯರ ಅನುಭವ, ಬದುಕಿಗೆ ದಾರಿದೀಪ",
    searchPlaceholder: "ಗಾದೆ, ಅರ್ಥ, ಅಥವಾ ಸಂದರ್ಭವನ್ನು ಹುಡುಕಿ... (ಉದಾ: ಹಾಸಿಗೆ, ಸ್ನೇಹ, ಹಣ)",
    allCategories: "ಎಲ್ಲಾ ಗಾದೆಗಳು",
    categoriesTitle: "ವಿಭಾಗಗಳು",
    featuredTitle: "ದಿನದ ಗಾದೆ ಮಾತು",
    meaningLabel: "ಅರ್ಥ & ವಿವರಣೆ",
    situationLabel: "ಬಳಕೆಯ ಸಂದರ್ಭ",
    transliterationLabel: "ಉಚ್ಚಾರಣೆ",
    tagsLabel: "ಸಂಬಂಧಿತ ವಿಷಯಗಳು",
    contributorLabel: "ಕೊಡುಗೆದಾರರು",
    likeLabel: "ಇಷ್ಟ",
    copiedToast: "ಗಾದೆಯನ್ನು ನಕಲಿಸಲಾಗಿದೆ!",
    situationFinderTitle: "ಸಂದರ್ಭ ಆಧಾರಿತ ಗಾದೆ ಶಿಫಾರಸು",
    situationFinderDesc: "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿ ಅಥವಾ ಸಮಸ್ಯೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ; ನಮ್ಮ ಪೂರ್ವಜರ ಸೂಕ್ತ ಗಾದೆಯನ್ನು ತಿಳಿಯಿರಿ.",
    situationInputPlaceholder: "ಉದಾಹರಣೆಗೆ: ಪರೀಕ್ಷೆಗೆ ಓದಲು ಆಲಸ್ಯವಾಗುತ್ತಿದೆ, ಅಥವಾ ಸ್ನೇಹಿತ ಕಷ್ಟದಲ್ಲಿ ಕೈಬಿಟ್ಟ...",
    findButton: "ಗಾದೆ ಶಿಫಾರಸು ಪಡೆಯಿರಿ",
    commonSituations: "ಸಾಮಾನ್ಯ ಸಂದರ್ಭಗಳು:",
    contributeButton: "ಹೊಸ ಗಾದೆ ಸೇರಿಸಿ",
    contributeModalTitle: "ಹೊಸ ಗಾದೆ ಕೊಡುಗೆ ನೀಡಿ",
    contributeModalDesc: "ನಿಮಗೆ ತಿಳಿದಿರುವ ಸಾಂಪ್ರದಾಯಿಕ ಕನ್ನಡ ಗಾದೆಯನ್ನು ಇಲ್ಲಿ ದಾಖಲಿಸಿ, ಮುಂದಿನ ಪೀಳಿಗೆಗೆ ಉಳಿಸಿ.",
    formKannada: "ಕನ್ನಡದಲ್ಲಿ ಗಾದೆ",
    formTransliteration: "ಇಂಗ್ಲಿಷ್ ಲಿಪಿಯಲ್ಲಿ (Transliteration)",
    formEnglishMeaning: "ಇಂಗ್ಲಿಷ್ ಅರ್ಥ (English Meaning)",
    formKannadaMeaning: "ಕನ್ನಡ ವಿವರಣೆ",
    formCategory: "ವಿಭಾಗ ಆಯ್ಕೆಮಾಡಿ",
    formSituation: "ಯಾವ ಸಂದರ್ಭದಲ್ಲಿ ಬಳಸುತ್ತಾರೆ?",
    formTags: "ಟ್ಯಾಗ್‌ಗಳು (ವಿರಾಮಚಿಹ್ನೆಯಿಂದ ಬೇರ್ಪಡಿಸಿ)",
    formContributor: "ನಿಮ್ಮ ಹೆಸರು / ಕೊಡುಗೆದಾರರ ಹೆಸರು",
    submitButton: "ಸಲ್ಲಿಸಿ (Submit Proverb)",
    submitting: "ದಾಖಲಾಗುತ್ತಿದೆ...",
    cancelButton: "ರದ್ದುಮಾಡಿ",
    successMsg: "ಗಾದೆ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಯಿತು!",
    noResults: "ಯಾವುದೇ ಗಾದೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    noResultsSub: "ಬೇರೆ ಪದ ಅಥವಾ ವಿಭಾಗವನ್ನು ಬಳಸಿ ಹುಡುಕಿ ನೋಡಿ.",
    dbStatusLocal: "ಸ್ಥಳೀಯ ಸಂಗ್ರಹ (Local Mode)",
    dbStatusCloud: "ಕ್ಲೌಡ್ ಡೇಟಾಬೇಸ್ (Supabase Live)",
    dbConnectGuide: "Supabase ಜೋಡಣೆ",
    footerText: "ವೇದ ಸುಳ್ಳಾದರೂ ಗಾದೆ ಸುಳ್ಳಾಗದು — ಕನ್ನಡದ ಶ್ರೀಮಂತ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯನ್ನು ಗೌರವಿಸುವ ಉಪಕ್ರಮ.",
    listenLabel: "ಕೇಳಿ (Listen)",
    copyLabel: "ನಕಲಿಸಿ (Copy)"
  },
  en: {
    appTitle: "Gaadhe Kosha",
    appSubtitle: "Kannada Proverb Companion",
    tagline: "Timeless Ancestral Wisdom for Modern Life",
    searchPlaceholder: "Search proverbs, meanings, or life situations... (e.g. money, friendship, exams)",
    allCategories: "All Proverbs",
    categoriesTitle: "Categories",
    featuredTitle: "Proverb of the Day",
    meaningLabel: "Meaning & Wisdom",
    situationLabel: "When to Use",
    transliterationLabel: "Transliteration",
    tagsLabel: "Related Themes",
    contributorLabel: "Contributed By",
    likeLabel: "Like",
    copiedToast: "Proverb copied to clipboard!",
    situationFinderTitle: "Situation-Based Proverb Finder",
    situationFinderDesc: "Describe your current dilemma or situation, and discover the exact traditional Kannada proverb that illuminates it.",
    situationInputPlaceholder: "e.g., Stressed about exam preparation, or a friend disappeared in tough times...",
    findButton: "Find Matching Proverb",
    commonSituations: "Common Dilemmas:",
    contributeButton: "Contribute Proverb",
    contributeModalTitle: "Contribute a Kannada Proverb",
    contributeModalDesc: "Help preserve Karnataka's rich oral wisdom for future generations.",
    formKannada: "Proverb in Kannada Script",
    formTransliteration: "Roman Transliteration",
    formEnglishMeaning: "English Meaning / Explanation",
    formKannadaMeaning: "Kannada Meaning / Explanation",
    formCategory: "Select Category",
    formSituation: "Real-Life Situation / Context",
    formTags: "Tags (comma-separated, e.g. budget, savings)",
    formContributor: "Your Name / Contributor Name",
    submitButton: "Submit Proverb",
    submitting: "Submitting...",
    cancelButton: "Cancel",
    successMsg: "Proverb added successfully!",
    noResults: "No proverbs found",
    noResultsSub: "Try adjusting your search query or switching categories.",
    dbStatusLocal: "Local Mode (Sample Data)",
    dbStatusCloud: "Supabase Connected (Live DB)",
    dbConnectGuide: "Supabase Setup",
    footerText: "Veda sulladaaru gaadhe sallaagadu — Honoring Karnataka's profound cultural wisdom.",
    listenLabel: "Listen",
    copyLabel: "Copy"
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('gaadhe_kosha_lang') || 'kn';
  });

  const toggleLanguage = () => {
    setLang(prev => {
      const next = prev === 'kn' ? 'en' : 'kn';
      localStorage.setItem('gaadhe_kosha_lang', next);
      return next;
    });
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
