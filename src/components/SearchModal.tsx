import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { searchCases } from '../data';
import { AlgorithmCase, CaseType } from '../types';
import { CubeSvg } from './CubeSvg';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCase: (caseData: AlgorithmCase) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCase,
  favorites,
  onToggleFavorite,
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<CaseType | 'ALL'>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && !isOpen) {
        // don't trigger if already in input
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault();
          // handled by parent
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = searchCases(
    query,
    filterType === 'ALL' ? undefined : filterType
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 pt-12 sm:pt-20"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Box */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-900 sticky top-0">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tìm theo số (21), tên (Sune, T-perm), công thức (R U R')..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-base outline-none font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-white text-xs font-medium"
          >
            Đóng
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800/80 bg-slate-950/40 text-xs">
          <span className="text-slate-500">Lọc:</span>
          {(['ALL', 'OLL', 'PLL'] as const).map(type => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className={`px-2.5 py-1 rounded-full font-medium transition ${
                filterType === type
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {type === 'ALL' ? 'Tất cả (78)' : type === 'OLL' ? 'OLL (57)' : 'PLL (21)'}
            </button>
          ))}
          <span className="ml-auto text-slate-500 font-mono">
            {results.length} kết quả
          </span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-slate-800/60 p-2">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm font-medium">Không tìm thấy case nào phù hợp với "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">
                Thử tìm: "21", "T perm", "Sune", "H perm", hoặc "R U R'"
              </p>
            </div>
          ) : (
            results.map(c => {
              const isFav = favorites.includes(c.id);
              const preferredAlgo =
                c.algorithms.find(a => a.isPreferred) || c.algorithms[0];

              return (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectCase(c);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/70 transition cursor-pointer group"
                >
                  {/* Pattern Visualizer Preview */}
                  <div className="w-12 h-12 shrink-0 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center p-1">
                    <CubeSvg caseData={c} size={42} showArrows={false} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          c.type === 'OLL'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {c.type}
                      </span>
                      <span className="font-bold text-slate-200 text-sm">
                        {c.name}
                      </span>
                      {c.aka && c.aka.length > 0 && (
                        <span className="text-xs text-slate-400 truncate">
                          ({c.aka[0]})
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-xs text-amber-400/90 truncate mt-0.5">
                      {preferredAlgo.notation}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={e => onToggleFavorite(c.id, e)}
                      className={`p-2 rounded-lg transition ${
                        isFav
                          ? 'text-amber-400'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                      aria-label="Yêu thích"
                    >
                      <Star
                        className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`}
                      />
                    </button>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
