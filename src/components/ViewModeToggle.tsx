import React from 'react';
import { Eye, Box } from 'lucide-react';
import { setCardViewMode, useCardViewMode } from '../utils/viewMode';

export const ViewModeToggle: React.FC = () => {
  const mode = useCardViewMode();
  const btn = (id: '2d' | '3d', label: string, icon: React.ReactNode) => (
    <button
      type="button"
      onClick={() => setCardViewMode(id)}
      aria-pressed={mode === id}
      className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition ${
        mode === id ? 'bg-slate-700 text-amber-300 shadow-sm' : 'text-slate-400 hover:text-slate-200'
      }`}
    >
      {icon}
      {label}
    </button>
  );
  return (
    <div
      className="flex items-center gap-0.5 bg-slate-900 p-0.5 rounded-lg border border-slate-800 shrink-0"
      role="group"
      aria-label="Chế độ hiển thị"
    >
      {btn('2d', '2D', <Eye className="w-3.5 h-3.5" />)}
      {btn('3d', '3D', <Box className="w-3.5 h-3.5" />)}
    </div>
  );
};
