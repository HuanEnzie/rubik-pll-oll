import React from 'react';
import { Star } from 'lucide-react';
import { AlgorithmCase } from '../types';
import { CubeSvg } from './CubeSvg';

interface AlgorithmCardProps {
  caseData: AlgorithmCase;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelect: (caseData: AlgorithmCase) => void;
  className?: string;
}

export const AlgorithmCard: React.FC<AlgorithmCardProps> = ({
  caseData,
  isFavorite,
  onToggleFavorite,
  onSelect,
  className = '',
}) => {
  const preferredAlgo = caseData.algorithms.find(a => a.isPreferred) || caseData.algorithms[0];
  const isOLL = caseData.type === 'OLL';

  return (
    <div
      onClick={() => onSelect(caseData)}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(caseData);
        }
      }}
      className={`group relative flex flex-col items-center bg-slate-900 hover:bg-slate-850 active:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-left select-none ${className}`}
    >
      {/* Header: Type/Number & Favorite Button */}
      <div className="w-full flex items-center justify-between gap-1 mb-2">
        <div className="flex items-center gap-1.5">
          <span
            className={`text-xs font-bold px-1.5 py-0.5 rounded ${
              isOLL
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
            }`}
          >
            {caseData.type}
          </span>
          <span className="font-bold text-slate-100 text-sm tracking-tight">
            {caseData.name}
          </span>
        </div>

        <button
          type="button"
          onClick={e => onToggleFavorite(caseData.id, e)}
          className={`p-1.5 rounded-lg transition-colors ${
            isFavorite
              ? 'text-amber-400 hover:text-amber-300'
              : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
          }`}
          aria-label={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
        >
          <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
        </button>
      </div>

      {/* Pattern Visualizer (2D top view) */}
      <div className="my-1.5 flex items-center justify-center p-2 rounded-lg bg-slate-950/60 border border-slate-850 w-full max-w-[120px] aspect-square">
        <CubeSvg caseData={caseData} size={78} />
      </div>

      {/* Case AKA / Category */}
      <div className="w-full mt-2 text-center">
        <div className="text-xs text-slate-400 truncate font-medium">
          {caseData.aka && caseData.aka.length > 0 ? caseData.aka[0] : caseData.groupNameVi}
        </div>
      </div>

      {/* Notation Preview */}
      <div className="w-full mt-1.5 pt-1.5 border-t border-slate-800/80">
        <p className="text-[11px] font-mono text-slate-400 group-hover:text-amber-300/90 truncate text-center">
          {preferredAlgo.notation}
        </p>
      </div>
    </div>
  );
};
