import React, { useState, useMemo } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { AlgorithmCase, OLLCategory } from '../types';
import { AlgorithmCard } from '../components/AlgorithmCard';

interface OLLViewProps {
  cases: AlgorithmCase[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectCase: (caseData: AlgorithmCase) => void;
}

type FilterOption = 'All' | 'Dot' | 'Line' | 'L' | 'Cross' | 'Favorites';

export const OLLView: React.FC<OLLViewProps> = ({
  cases,
  favorites,
  onToggleFavorite,
  onSelectCase,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs: { id: FilterOption; label: string; count?: number }[] = [
    { id: 'All', label: 'Tất cả (57)' },
    { id: 'Dot', label: 'Dấu chấm (Dot)' },
    { id: 'Line', label: 'Đường thẳng (Line)' },
    { id: 'L', label: 'Chữ L (L-Shape)' },
    { id: 'Cross', label: 'Chữ thập (Cross)' },
    { id: 'Favorites', label: '⭐ Yêu thích' },
  ];

  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      // Filter by category
      if (activeFilter === 'Favorites') {
        if (!favorites.includes(c.id)) return false;
      } else if (activeFilter !== 'All') {
        if (c.category !== activeFilter) return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesNum = c.number.toString() === q || `oll ${c.number}` === q;
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesAka = c.aka?.some(a => a.toLowerCase().includes(q));
        const matchesAlgo = c.algorithms.some(a => a.notation.toLowerCase().includes(q));
        return matchesNum || matchesName || matchesAka || matchesAlgo;
      }

      return true;
    });
  }, [cases, activeFilter, searchQuery, favorites]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 pb-24 space-y-4 animate-in fade-in duration-150">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-100">
              OLL Library
            </h1>
            <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-mono font-bold">
              57 cases
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Orientation of the Last Layer — Lật toàn bộ mặt vàng lên trên
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Lọc số (21), tên,..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-amber-400/60"
          />
        </div>
      </div>

      {/* Filter Tabs (Horizontal Scrollable on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-xl font-semibold transition ${
              activeFilter === tab.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cases Grid */}
      {filteredCases.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-sm font-medium text-slate-400">
            Không tìm thấy OLL case nào với bộ lọc hiện tại.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredCases.map(c => (
            <AlgorithmCard
              key={c.id}
              caseData={c}
              isFavorite={favorites.includes(c.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectCase}
            />
          ))}
        </div>
      )}
    </div>
  );
};
