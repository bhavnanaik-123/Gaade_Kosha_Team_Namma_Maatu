import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES } from '../data/initialProverbs';
import { 
  Sparkles, 
  GraduationCap, 
  Users, 
  Coins, 
  Home, 
  HeartHandshake, 
  Compass 
} from 'lucide-react';

const iconMap = {
  Sparkles,
  GraduationCap,
  Users,
  Coins,
  Home,
  HeartHandshake,
  Compass
};

export const CategoryFilter = ({ selectedCategory, onSelectCategory, proverbsCountMap }) => {
  const { lang, t } = useLanguage();

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-brown-950 font-serif flex items-center gap-2">
          <span>{t.categoriesTitle}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-cream-200 text-brown-700 font-sans font-medium">
            {CATEGORIES.length - 1} {lang === 'kn' ? 'ವಿಭಾಗಗಳು' : 'Themes'}
          </span>
        </h2>
      </div>

      {/* Responsive Horizontal Scrollable Category Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon] || Sparkles;
          const isSelected = selectedCategory === cat.id;
          const count = proverbsCountMap[cat.id] ?? cat.count;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
                isSelected
                  ? 'bg-kred-800 text-cream-50 border-kred-900 shadow-md shadow-kred-900/10 scale-102'
                  : 'bg-white/80 hover:bg-white text-brown-800 border-cream-300 hover:border-cream-400 hover:shadow-sm'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-cream-100' : 'text-kred-700'}`} />
              <span>{lang === 'kn' ? cat.label_kn : cat.label_en}</span>
              {count !== undefined && (
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-kred-900/50 text-cream-100' : 'bg-cream-200 text-brown-700'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
