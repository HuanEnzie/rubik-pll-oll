import React from 'react';
import { Home, Target, Search, Bookmark, Zap } from 'lucide-react';

export type NavTab = 'home' | 'oll' | 'pll' | 'practice';

interface NavbarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenSearch: () => void;
  favoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenSearch,
  favoritesCount,
}) => {
  return (
    <>
      {/* --- DESKTOP / TABLET HEADER (Hidden on mobile) --- */}
      <header className="hidden md:flex sticky top-0 z-40 w-full items-center justify-between px-6 py-3 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => onTabChange('home')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-base shadow-sm">
              CQ
            </div>
            <div>
              <span className="font-bold text-slate-100 text-lg tracking-tight">
                CubeQuick
              </span>
              <span className="text-[10px] text-amber-400/80 block font-mono -mt-1">
                SPEEDCUBING 3x3
              </span>
            </div>
          </button>

          <nav className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onTabChange('home')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                currentTab === 'home'
                  ? 'bg-slate-800 text-amber-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              Trang chủ
            </button>
            <button
              type="button"
              onClick={() => onTabChange('oll')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                currentTab === 'oll'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>OLL (57)</span>
            </button>
            <button
              type="button"
              onClick={() => onTabChange('pll')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                currentTab === 'pll'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>PLL (21)</span>
            </button>
            <button
              type="button"
              onClick={() => onTabChange('practice')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                currentTab === 'practice'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Luyện tập & Timer</span>
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Search Bar Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 text-xs transition w-48 justify-between"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Tìm OLL, PLL, case...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded font-mono border border-slate-700">
              /
            </kbd>
          </button>
        </div>
      </header>

      {/* --- MOBILE BOTTOM NAVIGATION (Fixed at bottom on small screens) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 flex items-center justify-around safe-bottom">
        <button
          type="button"
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
            currentTab === 'home'
              ? 'text-amber-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('oll')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition relative ${
            currentTab === 'oll'
              ? 'text-amber-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <div className="w-5 h-5 rounded-md border-2 border-amber-400 bg-amber-400/20 flex items-center justify-center font-bold text-[10px] text-amber-300">
              O
            </div>
          </div>
          <span className="text-[10px] font-medium mt-0.5">OLL (57)</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('pll')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition relative ${
            currentTab === 'pll'
              ? 'text-blue-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <div className="w-5 h-5 rounded-md border-2 border-blue-400 bg-blue-400/20 flex items-center justify-center font-bold text-[10px] text-blue-300">
              P
            </div>
          </div>
          <span className="text-[10px] font-medium mt-0.5">PLL (21)</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('practice')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
            currentTab === 'practice'
              ? 'text-emerald-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Target className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Luyện tập</span>
        </button>

        <button
          type="button"
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-400 hover:text-slate-200"
          aria-label="Tìm kiếm công thức"
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Tìm</span>
        </button>
      </nav>
    </>
  );
};
