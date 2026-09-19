import React, { useState, useMemo } from 'react';
import { Search, Star, HelpCircle, ChevronRight, AlertTriangle } from 'lucide-react';
import { AlgorithmCase, PLLCategory } from '../types';
import { AlgorithmCard } from '../components/AlgorithmCard';
import { PLLDiagnosisModal } from '../components/PLLDiagnosisModal';

interface PLLViewProps {
  cases: AlgorithmCase[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectCase: (caseData: AlgorithmCase) => void;
}

type FilterOption = 'All' | 'Corners' | 'Edges' | 'G Perms' | 'Other' | 'Parity' | 'Favorites';

export const PLLView: React.FC<PLLViewProps> = ({
  cases,
  favorites,
  onToggleFavorite,
  onSelectCase,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDiagnosisOpen, setIsDiagnosisOpen] = useState(false);

  const filterTabs: { id: FilterOption; label: string }[] = [
    { id: 'All', label: `Tất cả (${cases.length})` },
    { id: 'Edges', label: 'Hoán vị cạnh (Edges - 4)' },
    { id: 'Corners', label: 'Hoán vị góc (Corners - 3)' },
    { id: 'G Perms', label: 'G-Permutations (4)' },
    { id: 'Other', label: 'Liền kề / Chéo (T, J, Y...)' },
    { id: 'Parity', label: '⚡ Parity (4x4)' },
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
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesAka = c.aka?.some(a => a.toLowerCase().includes(q));
        const matchesAlgo = c.algorithms.some(a => a.notation.toLowerCase().includes(q));
        return matchesName || matchesAka || matchesAlgo;
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
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-100">
              PLL Library
            </h1>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-mono font-bold">
              21 + 2 Parity
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Permutation of the Last Layer — Hoán đổi vị trí các viên tầng cuối & Lỗi Parity
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Lọc T-perm, Jb, Parity..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-blue-400/60"
          />
        </div>
      </div>

      {/* Smart Diagnosis Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-3.5 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-500/30 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0 border border-blue-500/30">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-2">
              Bạn đang xoay nhưng gặp trường hợp lạ không có trong danh sách?
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Kiểm tra ngay Parity Rubik 4x4 (chỉ đổi 2 cạnh), lỗi lắp sai 3x3 hoặc mở bộ nhận diện góc nhìn
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsDiagnosisOpen(true)}
          className="w-full sm:w-auto px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shrink-0 shadow-sm shadow-blue-500/20 cursor-pointer"
        >
          <span>Chẩn đoán trường hợp</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-xl font-semibold transition ${
              activeFilter === tab.id
                ? 'bg-blue-500 text-white font-bold shadow-sm shadow-blue-500/20'
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
            Không tìm thấy PLL case nào với bộ lọc hiện tại.
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

      {/* Diagnosis Modal */}
      <PLLDiagnosisModal
        isOpen={isDiagnosisOpen}
        onClose={() => setIsDiagnosisOpen(false)}
        cases={cases}
        onSelectCase={onSelectCase}
      />
    </div>
  );
};
