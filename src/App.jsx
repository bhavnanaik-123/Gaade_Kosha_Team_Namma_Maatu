import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProverbCard } from './components/ProverbCard';
import { SituationFinder } from './components/SituationFinder';
import { ContributeModal } from './components/ContributeModal';
import { ProverbDetailModal } from './components/ProverbDetailModal';
import { DatabaseStatusModal } from './components/DatabaseStatusModal';
import { Footer } from './components/Footer';
import { fetchAllProverbs, createProverb, incrementLike } from './services/proverbService';
import { initialProverbs } from './data/initialProverbs';
import { BookOpen, Sparkles, Filter, RefreshCw, AlertCircle } from 'lucide-react';

export function App() {
  const { lang, t } = useLanguage();

  const [proverbs, setProverbs] = useState(initialProverbs);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState('local');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'situation'
  const [visibleLimit, setVisibleLimit] = useState(36);

  useEffect(() => {
    setVisibleLimit(36);
  }, [selectedCategory, searchQuery]);

  // Modals state
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);
  const [activeProverbDetail, setActiveProverbDetail] = useState(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Load proverbs on mount
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        setLoading(true);
        const { data, source } = await fetchAllProverbs();
        if (isMounted && data) {
          setProverbs(data);
          setDataSource(source);
        }
      } catch (err) {
        console.error('Error fetching proverbs:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, []);

  // Featured Proverb of the Day
  const featuredProverb = useMemo(() => {
    if (!proverbs || proverbs.length === 0) return null;
    // Choose a consistent proverb based on date or default to first
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const index = dayOfYear % proverbs.length;
    return proverbs[index] || proverbs[0];
  }, [proverbs]);

  // Dynamic count map per category
  const proverbsCountMap = useMemo(() => {
    const counts = { all: proverbs.length };
    proverbs.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [proverbs]);

  // Filtered proverbs based on category and search query
  const filteredProverbs = useMemo(() => {
    return proverbs.filter(p => {
      // 1. Category match
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // 2. Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const isPending = !p.is_verified || p.english_meaning?.startsWith('[Translation');

        const searchableTerms = [
          p.kannada,
          p.transliteration || '',
          p.category || '',
          p.category_kn || '',
          ...(p.tags || []),
          // Only search English meaning & situation if not a boilerplate placeholder
          (!isPending ? (p.english_meaning || '') : ''),
          (!isPending ? (p.kannada_meaning || '') : ''),
          (!isPending ? (p.situation || '') : ''),
          (!isPending ? (p.situation_kn || '') : '')
        ];

        const searchableText = searchableTerms.filter(Boolean).join(' ').toLowerCase();
        return searchableText.includes(query);
      }

      return true;
    });
  }, [proverbs, selectedCategory, searchQuery]);

  // Handle Like
  const handleLike = async (id, currentLikes) => {
    try {
      const { newLikeCount } = await incrementLike(id, currentLikes);
      setProverbs(prev => prev.map(p => p.id === id ? { ...p, likes: newLikeCount } : p));
      if (activeProverbDetail?.id === id) {
        setActiveProverbDetail(prev => ({ ...prev, likes: newLikeCount }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Handle new proverb contribution
  const handleProverbAdded = async (newProverbPayload) => {
    const { data } = await createProverb(newProverbPayload);
    if (data) {
      setProverbs(prev => [data, ...prev]);
      showToast(t.successMsg);
    }
  };

  const handleQuickFilter = (query) => {
    setActiveTab('browse');
    setSearchQuery(query);
    setSelectedCategory('all');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-brown-950 font-sans selection:bg-kred-100 selection:text-kred-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-brown-900 text-cream-50 px-4 py-2.5 rounded-xl shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 border border-brown-700 animate-bounce">
          <Sparkles className="w-4 h-4 text-kgold-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar
        onOpenContribute={() => setIsContributeOpen(true)}
        onOpenDbModal={() => setIsDbModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCloudConnected={dataSource === 'supabase'}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero
          featuredProverb={featuredProverb}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onProverbClick={(p) => setActiveProverbDetail(p)}
          onQuickFilter={handleQuickFilter}
        />

        {/* Tab 1: Browse Proverbs View */}
        {activeTab === 'browse' && (
          <div>
            {/* Category Filter Chips */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => setSelectedCategory(catId)}
              proverbsCountMap={proverbsCountMap}
            />

            {/* Results Grid Header */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-brown-950 font-serif">
                  {selectedCategory === 'all' 
                    ? t.allCategories 
                    : proverbs.find(p => p.category === selectedCategory)?.category_kn || selectedCategory}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cream-200 text-brown-700 font-sans font-medium">
                  {filteredProverbs.length} {lang === 'kn' ? 'ಗಾದೆಗಳು' : 'proverbs'}
                </span>
              </div>

              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-xs text-kred-700 hover:text-kred-900 font-semibold hover:underline"
                >
                  {lang === 'kn' ? 'ಫಿಲ್ಟರ್ ತೆಗೆದುಹಾಕಿ' : 'Reset filters'}
                </button>
              )}
            </div>

            {/* Proverbs Cards Grid */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {filteredProverbs.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProverbs.slice(0, visibleLimit).map((proverb) => (
                      <ProverbCard
                        key={proverb.id}
                        proverb={proverb}
                        onLike={handleLike}
                        onClick={(p) => setActiveProverbDetail(p)}
                      />
                    ))}
                  </div>

                  {/* Load More Pagination */}
                  {filteredProverbs.length > visibleLimit && (
                    <div className="text-center mt-10 mb-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => setVisibleLimit(prev => prev + 36)}
                        className="px-6 py-3 rounded-xl bg-brown-900 hover:bg-brown-950 text-cream-50 font-bold text-sm shadow-md transition-all active:scale-95"
                      >
                        {lang === 'kn'
                          ? `ಇನ್ನಷ್ಟು ಗಾದೆಗಳನ್ನು ತೋರಿಸಿ (+36)`
                          : `Load More Proverbs (+36)`}
                      </button>
                      <button
                        onClick={() => setVisibleLimit(filteredProverbs.length)}
                        className="px-4 py-3 rounded-xl bg-cream-200 hover:bg-cream-300 text-brown-900 font-semibold text-xs transition-colors"
                      >
                        {lang === 'kn'
                          ? `ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ (${filteredProverbs.length})`
                          : `Show All (${filteredProverbs.length})`}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 parchment-card rounded-2xl border border-cream-200 my-4 max-w-2xl mx-auto">
                  <AlertCircle className="w-12 h-12 text-brown-400 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-brown-900 mb-1">{t.noResults}</h4>
                  <p className="text-xs sm:text-sm text-brown-600 mb-4 max-w-sm mx-auto">
                    {t.noResultsSub}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-kred-700 text-cream-50 text-xs font-bold hover:bg-kred-800 transition-colors"
                  >
                    {lang === 'kn' ? 'ಎಲ್ಲಾ ಗಾದೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ' : 'View All Proverbs'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Situation-Based Recommender View */}
        {activeTab === 'situation' && (
          <SituationFinder
            allProverbs={proverbs}
            onLike={handleLike}
            onProverbClick={(p) => setActiveProverbDetail(p)}
          />
        )}

      </main>

      {/* Modals */}
      <ContributeModal
        isOpen={isContributeOpen}
        onClose={() => setIsContributeOpen(false)}
        onProverbAdded={handleProverbAdded}
      />

      <ProverbDetailModal
        proverb={activeProverbDetail}
        isOpen={!!activeProverbDetail}
        onClose={() => setActiveProverbDetail(null)}
        onLike={handleLike}
      />

      <DatabaseStatusModal
        isOpen={isDbModalOpen}
        onClose={() => setIsDbModalOpen(false)}
        isCloudConnected={dataSource === 'supabase'}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        onOpenContribute={() => setIsContributeOpen(true)}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}
