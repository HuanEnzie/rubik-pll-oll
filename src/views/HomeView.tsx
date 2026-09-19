import React from 'react';
import { Search, Star, History, Target, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { AlgorithmCase } from '../types';
import { AlgorithmCard } from '../components/AlgorithmCard';
import { WeakCaseItem } from '../utils/storage';
import { getCaseById } from '../data';
import { CubeSvg } from '../components/CubeSvg';

interface HomeViewProps {
  onSelectOLL: () => void;
  onSelectPLL: () => void;
  onSelectPractice: (practiceMode?: 'weak' | 'all') => void;
  onOpenSearch: () => void;
  recentCases: AlgorithmCase[];
  favoriteCases: AlgorithmCase[];
  weakCases: WeakCaseItem[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectCase: (caseData: AlgorithmCase) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectOLL,
  onSelectPLL,
  onSelectPractice,
  onOpenSearch,
  recentCases,
  favoriteCases,
  weakCases,
  favorites,
  onToggleFavorite,
  onSelectCase,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 pb-24 space-y-8 animate-in fade-in duration-200">
      {/* --- HERO SECTION --- */}
      <div className="text-center pt-2 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
          <Zap className="w-3.5 h-3.5" />
          <span>Tra cứu siêu tốc khi đang cầm Rubik</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-100 mb-2">
          Cube<span className="text-amber-400">Quick</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
          Find your algorithm in seconds. Nhìn hình → Nhận diện → Giải ngay.
        </p>
      </div>

      {/* --- TWO GIANT PRIMARY BUTTONS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* OLL Button */}
        <button
          type="button"
          onClick={onSelectOLL}
          className="group relative flex items-center justify-between p-5 bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900 border-2 border-amber-500/30 hover:border-amber-400/80 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-200 text-left active:scale-[0.99] cursor-pointer"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400"></span>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Orientation Last Layer
              </span>
            </div>
            <div className="text-2xl font-black text-slate-100 group-hover:text-amber-400 transition">
              OLL — 57 cases
            </div>
            <p className="text-xs text-slate-400">
              Lật vàng mặt trên (Dấu chấm, Đường thẳng, Chữ L, Chữ thập)
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:translate-x-1 transition shrink-0 ml-3">
            <ArrowRight className="w-6 h-6" />
          </div>
        </button>

        {/* PLL Button */}
        <button
          type="button"
          onClick={onSelectPLL}
          className="group relative flex items-center justify-between p-5 bg-gradient-to-br from-blue-500/15 via-slate-900 to-slate-900 border-2 border-blue-500/30 hover:border-blue-400/80 rounded-2xl shadow-lg hover:shadow-blue-500/10 transition-all duration-200 text-left active:scale-[0.99] cursor-pointer"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-400 shadow-sm shadow-blue-400"></span>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Permutation Last Layer
              </span>
            </div>
            <div className="text-2xl font-black text-slate-100 group-hover:text-blue-400 transition">
              PLL — 21 cases
            </div>
            <p className="text-xs text-slate-400">
              Hoán vị tầng cuối (Hoán vị góc, Cạnh, G-Perms, T, J, Y, V...)
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:translate-x-1 transition shrink-0 ml-3">
            <ArrowRight className="w-6 h-6" />
          </div>
        </button>
      </div>

      {/* --- QUICK SEARCH BAR --- */}
      <div
        onClick={onOpenSearch}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onOpenSearch()}
        className="flex items-center justify-between p-4 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl cursor-pointer transition shadow-sm"
      >
        <div className="flex items-center gap-3 text-slate-400">
          <Search className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-medium text-slate-300">
            Tìm nhanh công thức (OLL 21, T-Perm, Sune, notation...)
          </span>
        </div>
        <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs bg-slate-800 text-slate-400 rounded font-mono border border-slate-700">
          Phím /
        </kbd>
      </div>

      {/* --- WEAK CASES PRACTICE SHORTCUT CARD --- */}
      {weakCases.length > 0 && (
        <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-900/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Case bạn hay quên
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {weakCases.slice(0, 3).map(w => {
                const c = getCaseById(w.caseId);
                if (!c) return null;
                return (
                  <span
                    key={w.caseId}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-200"
                  >
                    <span className="font-bold">{c.name}</span>
                    <span className="text-rose-400">({w.accuracy}% đúng)</span>
                  </span>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectPractice('weak')}
            className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0"
          >
            <span>Luyện case yếu ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* --- RECENTLY VIEWED (Nếu có) --- */}
      {recentCases.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-400" />
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                Đã xem gần đây ({recentCases.length})
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {recentCases.slice(0, 4).map(c => (
              <AlgorithmCard
                key={c.id}
                caseData={c}
                isFavorite={favorites.includes(c.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelectCase}
              />
            ))}
          </div>
        </div>
      )}

      {/* --- FAVORITES (Yêu thích) --- */}
      {favoriteCases.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                Case yêu thích ({favoriteCases.length})
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {favoriteCases.slice(0, 8).map(c => (
              <AlgorithmCard
                key={c.id}
                caseData={c}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelectCase}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
