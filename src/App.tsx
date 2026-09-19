/**
 * CubeQuick - Ứng dụng tra cứu và luyện tập công thức OLL & PLL 3x3 siêu tốc
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { NavTab, Navbar } from './components/Navbar';
import { HomeView } from './views/HomeView';
import { OLLView } from './views/OLLView';
import { PLLView } from './views/PLLView';
import { PracticeView } from './views/PracticeView';
import { AlgorithmDetailModal } from './components/AlgorithmDetailModal';
import { SearchModal } from './components/SearchModal';
import { AlgorithmCase } from './types';
import { OLL_CASES, PLL_CASES, ALL_CASES, getCaseById } from './data';
import {
  getFavorites,
  toggleFavorite as toggleFavoriteStorage,
  getRecent,
  addRecent as addRecentStorage,
  getWeakCases,
  WeakCaseItem,
} from './utils/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedCase, setSelectedCase] = useState<AlgorithmCase | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [weakCases, setWeakCases] = useState<WeakCaseItem[]>([]);
  const [practiceInitialMode, setPracticeInitialMode] = useState<'weak' | 'all'>('all');

  // Load stored state on mount
  useEffect(() => {
    setFavorites(getFavorites());
    setRecentIds(getRecent());
    setWeakCases(getWeakCases());
  }, []);

  // Global keyboard shortcuts (e.g. '/' or Ctrl+K opens search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) &&
        !isSearchOpen &&
        (e.target as HTMLElement)?.tagName !== 'INPUT'
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Handle case selection -> also registers to recent
  const handleSelectCase = useCallback((caseData: AlgorithmCase) => {
    setSelectedCase(caseData);
    addRecentStorage(caseData.id);
    setRecentIds(getRecent());
  }, []);

  // Toggle favorite
  const handleToggleFavorite = useCallback(
    (caseId: string, e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation();
      }
      toggleFavoriteStorage(caseId);
      setFavorites(getFavorites());
    },
    []
  );

  // Navigate prev/next case in detail modal
  const handleNavigateCase = useCallback(
    (direction: 'prev' | 'next') => {
      if (!selectedCase) return;
      const list = selectedCase.type === 'OLL' ? OLL_CASES : PLL_CASES;
      const currentIndex = list.findIndex(c => c.id === selectedCase.id);
      if (currentIndex === -1) return;

      let nextIndex =
        direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex < 0) nextIndex = list.length - 1;
      if (nextIndex >= list.length) nextIndex = 0;

      handleSelectCase(list[nextIndex]);
    },
    [selectedCase, handleSelectCase]
  );

  // Derive recent and favorite cases lists
  const recentCases = useMemo(() => {
    return recentIds
      .map(id => getCaseById(id))
      .filter((c): c is AlgorithmCase => Boolean(c));
  }, [recentIds]);

  const favoriteCases = useMemo(() => {
    return favorites
      .map(id => getCaseById(id))
      .filter((c): c is AlgorithmCase => Boolean(c));
  }, [favorites]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation (Desktop Header + Mobile Bottom Nav) */}
      <Navbar
        currentTab={currentTab}
        onTabChange={tab => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        favoritesCount={favorites.length}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full flex flex-col">
        {currentTab === 'home' && (
          <HomeView
            onSelectOLL={() => setCurrentTab('oll')}
            onSelectPLL={() => setCurrentTab('pll')}
            onSelectPractice={mode => {
              setPracticeInitialMode(mode || 'all');
              setCurrentTab('practice');
            }}
            onOpenSearch={() => setIsSearchOpen(true)}
            recentCases={recentCases}
            favoriteCases={favoriteCases}
            weakCases={weakCases}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectCase={handleSelectCase}
          />
        )}

        {currentTab === 'oll' && (
          <OLLView
            cases={OLL_CASES}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectCase={handleSelectCase}
          />
        )}

        {currentTab === 'pll' && (
          <PLLView
            cases={PLL_CASES}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectCase={handleSelectCase}
          />
        )}

        {currentTab === 'practice' && (
          <PracticeView
            ollCases={OLL_CASES}
            pllCases={PLL_CASES}
            initialMode={practiceInitialMode}
            onOpenDetail={handleSelectCase}
          />
        )}
      </main>

      {/* Algorithm Detail Modal */}
      <AlgorithmDetailModal
        caseData={selectedCase}
        onClose={() => setSelectedCase(null)}
        isFavorite={selectedCase ? favorites.includes(selectedCase.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onNavigateCase={handleNavigateCase}
      />

      {/* Fast Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCase={handleSelectCase}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
