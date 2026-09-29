import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { LEGEND_GROUPS, describeMove } from '../utils/notation';

interface LegendProps {
  /** các chữ cái ký hiệu đang dùng trong công thức, để tô nổi bật */
  highlightBases?: string[];
}

export const NotationLegend: React.FC<LegendProps> = ({ highlightBases = [] }) => (
  <div className="space-y-4 text-xs">
    <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3 text-slate-300 leading-relaxed">
      <b className="text-amber-300">Cách cầm khối:</b> mặt <b className="text-yellow-300">vàng (U)</b> ở trên, mặt{' '}
      <b className="text-green-400">xanh lá (F)</b> hướng về phía bạn. Trái/phải tính theo góc nhìn của bạn.
      <ul className="mt-1.5 space-y-0.5 text-slate-400">
        <li>
          • Không có dấu = quay <b className="text-slate-200">90° thuận</b> chiều kim đồng hồ (khi nhìn thẳng vào mặt đó).
        </li>
        <li>
          • Dấu <b className="text-slate-200 font-mono">'</b> (ví dụ <span className="font-mono">R'</span>) = quay <b className="text-slate-200">ngược lại</b>.
        </li>
        <li>
          • Số <b className="text-slate-200 font-mono">2</b> (ví dụ <span className="font-mono">R2</span>) = quay <b className="text-slate-200">180°</b>.
        </li>
      </ul>
    </div>

    {LEGEND_GROUPS.map(group => (
      <div key={group.title}>
        <div className="flex items-baseline justify-between gap-2 mb-1.5">
          <h4 className="font-bold text-slate-200 text-[13px]">{group.title}</h4>
          <span className="text-[11px] text-slate-500 text-right">{group.hint}</span>
        </div>
        <div className="grid gap-1.5">
          {group.bases.map(base => {
            const normal = describeMove(base)!;
            const prime = describeMove(`${base}'`)!;
            const used = highlightBases.includes(base);
            return (
              <div
                key={base}
                className={`rounded-lg border px-2.5 py-2 ${
                  used ? 'border-amber-500/50 bg-amber-500/5' : 'border-slate-800 bg-slate-950/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-black text-base text-amber-400 w-6 text-center">{base}</span>
                  <span className="text-slate-300 font-semibold">{normal.title.split(' — ')[1]}</span>
                  {used && <span className="ml-auto text-[10px] font-bold text-amber-300">dùng trong công thức này</span>}
                </div>
                <div className="grid sm:grid-cols-2 gap-x-3 gap-y-0.5 text-slate-400">
                  <div>
                    <span className="font-mono font-bold text-slate-200">
                      {base} {normal.arrow}
                    </span>{' '}
                    {normal.detail}
                  </div>
                  <div>
                    <span className="font-mono font-bold text-slate-200">
                      {base}' {prime.arrow}
                    </span>{' '}
                    {prime.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
);

interface ModalProps {
  open: boolean;
  onClose: () => void;
  highlightBases?: string[];
}

export const NotationModal: React.FC<ModalProps> = ({ open, onClose, highlightBases }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Bảng ký hiệu xoay"
    >
      <div className="w-full max-w-xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-800 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
          <h2 className="text-base font-bold text-slate-100">Bảng ký hiệu xoay (R, U, M', x…)</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-4">
          <NotationLegend highlightBases={highlightBases} />
        </div>
      </div>
    </div>
  );
};
