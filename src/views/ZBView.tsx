import React, { useMemo, useState } from 'react';
import { Search, Info, Cpu } from 'lucide-react';
import { AlgorithmCase } from '../types';
import { AlgorithmCard } from '../components/AlgorithmCard';
import { ViewModeToggle } from '../components/ViewModeToggle';
import { ZBLL_SETS, ZBLL_SET_VI, ZBLS_LOCS, ZBLS_LOC_VI } from '../utils/caseBuilder';

export type ZBKind = 'ZBLS' | 'ZBLL';

interface ZBViewProps {
  zblsCases: AlgorithmCase[];
  zbllCases: AlgorithmCase[];
  kind: ZBKind;
  onKindChange: (kind: ZBKind) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectCase: (caseData: AlgorithmCase) => void;
}

const FAV = 'Favorites';

export const ZBView: React.FC<ZBViewProps> = ({
  zblsCases,
  zbllCases,
  kind,
  onKindChange,
  favorites,
  onToggleFavorite,
  onSelectCase,
}) => {
  const [zbllFilter, setZbllFilter] = useState<string>('T');
  const [zblsFilter, setZblsFilter] = useState<string>('both-u');
  const [searchQuery, setSearchQuery] = useState('');

  const cases = kind === 'ZBLL' ? zbllCases : zblsCases;
  const filter = kind === 'ZBLL' ? zbllFilter : zblsFilter;
  const setFilter = kind === 'ZBLL' ? setZbllFilter : setZblsFilter;

  const filterTabs = useMemo(() => {
    const count = (cat: string) => cases.filter(c => c.category === cat).length;
    const tabs =
      kind === 'ZBLL'
        ? ZBLL_SETS.map(s => ({ id: s as string, label: `${ZBLL_SET_VI[s]} · ${count(s)}` }))
        : ZBLS_LOCS.map(l => ({ id: l as string, label: `${ZBLS_LOC_VI[l]} · ${count(l)}` }));
    return [...tabs, { id: FAV, label: '⭐ Yêu thích' }];
  }, [cases, kind]);

  // Có từ khoá thì tìm trên toàn bộ ZBLL/ZBLS, bỏ qua bộ lọc nhóm
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return cases.filter(c => {
      if (q) {
        return (
          c.name.toLowerCase().includes(q) ||
          c.groupNameVi.toLowerCase().includes(q) ||
          c.tags.some(t => t.includes(q)) ||
          c.algorithms.some(a => a.notation.toLowerCase().includes(q))
        );
      }
      if (filter === FAV) return favorites.includes(c.id);
      return c.category === filter;
    });
  }, [cases, filter, searchQuery, favorites]);

  // Gom theo tập con (COLL với ZBLL, thế cặp với ZBLS) để dễ học theo cụm
  const groups = useMemo(() => {
    const map = new Map<string, AlgorithmCase[]>();
    for (const c of filtered) {
      if (!map.has(c.groupNameVi)) map.set(c.groupNameVi, []);
      map.get(c.groupNameVi)!.push(c);
    }
    return [...map.entries()];
  }, [filtered]);

  const accent = kind === 'ZBLL' ? 'violet' : 'teal';

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 pb-24 space-y-4 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${kind === 'ZBLL' ? 'bg-violet-400' : 'bg-teal-400'}`}></span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-100">ZB nâng cao</h1>
            <span
              className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                kind === 'ZBLL' ? 'bg-violet-500/20 text-violet-300' : 'bg-teal-500/20 text-teal-300'
              }`}
            >
              {kind} · {cases.length}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {kind === 'ZBLS'
              ? 'ZB Last Slot — vào cặp F2L cuối và định hướng 4 cạnh tầng trên cùng lúc'
              : 'ZB Last Layer — giải xong tầng cuối trong 1 công thức khi 4 cạnh đã đúng hướng'}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {kind === 'ZBLL' && <ViewModeToggle />}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={kind === 'ZBLL' ? 'Lọc T12, COLL 3, R U R\'...' : 'Lọc ZBLS 15, thế cặp 4...'}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-slate-600"
            />
          </div>
        </div>
      </div>

      {/* ZBLS / ZBLL switch */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
        {(['ZBLS', 'ZBLL'] as const).map(k => (
          <button
            key={k}
            type="button"
            onClick={() => onKindChange(k)}
            className={`py-2 rounded-xl text-sm font-bold transition ${
              kind === k
                ? k === 'ZBLL'
                  ? 'bg-violet-600 text-white shadow'
                  : 'bg-teal-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {k === 'ZBLS' ? `Bước 1 · ZBLS (${zblsCases.length})` : `Bước 2 · ZBLL (${zbllCases.length})`}
          </button>
        ))}
      </div>

      {/* Giải thích */}
      <div className="flex gap-3 p-3 bg-slate-900/60 border border-slate-800 rounded-2xl text-[11px] text-slate-400 leading-relaxed">
        <Info className={`w-4 h-4 shrink-0 mt-0.5 ${kind === 'ZBLL' ? 'text-violet-300' : 'text-teal-300'}`} />
        <div className="space-y-1">
          {kind === 'ZBLS' ? (
            <p>
              Khi còn đúng 1 cặp F2L (khe <b className="text-slate-200">FR</b> — trước-phải), dùng ZBLS thay cho F2L thường:
              cặp vào khe <b className="text-slate-200">và</b> cả 4 cạnh tầng trên có mặt vàng hướng lên (thành chữ thập vàng).
              Nhờ vậy tầng cuối luôn là một case ZBLL. Hình 3D: sticker xám là phần không ảnh hưởng tới công thức.
            </p>
          ) : (
            <p>
              Khi tầng cuối đã có chữ thập vàng (thường nhờ ZBLS), ZBLL giải cả hướng góc và hoán vị trong một công thức
              (thay cho OCLL + PLL). Học theo nhóm hướng góc → tập con COLL (cùng cách đổi chỗ góc) → 12 case trong tập.
            </p>
          )}
          <p className="flex items-center gap-1.5 text-slate-500">
            <Cpu className="w-3.5 h-3.5" />
            Công thức được máy tìm trong nhóm nước R, U, F (ngắn nhất, ưu tiên dễ bấm) và kiểm bằng mô phỏng — có thể khác
            công thức phổ biến trong cộng đồng; tên/số thứ tự là cách đánh số riêng của app.
          </p>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setFilter(tab.id);
              setSearchQuery('');
            }}
            className={`whitespace-nowrap px-3 py-1.5 rounded-xl font-semibold transition ${
              filter === tab.id && !searchQuery
                ? accent === 'violet'
                  ? 'bg-violet-500 text-white font-bold shadow-sm'
                  : 'bg-teal-500 text-white font-bold shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid theo nhóm */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-sm font-medium text-slate-400">Không có case nào với bộ lọc hiện tại.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {groups.map(([title, list]) => (
            <section key={title} className="space-y-2">
              <h2 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                {title}
                <span className="text-slate-500 font-mono font-medium">{list.length}</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {list.map(c => (
                  <AlgorithmCard
                    key={c.id}
                    caseData={c}
                    isFavorite={favorites.includes(c.id)}
                    onToggleFavorite={onToggleFavorite}
                    onSelect={onSelectCase}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};
