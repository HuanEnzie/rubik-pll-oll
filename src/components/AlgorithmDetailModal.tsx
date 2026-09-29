import React, { useState, useEffect, useMemo } from 'react';
import { X, Star, Copy, Check, Eye, Box, ArrowLeft, ArrowRight, RefreshCw, BookOpen } from 'lucide-react';
import { AlgorithmCase, AlgorithmVariant } from '../types';
import { CubeSvg } from './CubeSvg';
import { Cube3D, CubeTransition } from './Cube3D';
import { AlgorithmPlayer } from './AlgorithmPlayer';
import { NotationModal } from './NotationLegend';
import { CubeState, decomposeMove, invertAlgorithm } from '../utils/cubeState';
import { caseStateFromAlgorithm } from '../utils/caseAnalysis';
import { describeMove, uniqueMoveTokens } from '../utils/notation';

interface AlgorithmDetailModalProps {
  caseData: AlgorithmCase | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onNavigateCase?: (direction: 'prev' | 'next') => void;
}

export const AlgorithmDetailModal: React.FC<AlgorithmDetailModalProps> = props => {
  if (!props.caseData) return null;
  return <ModalBody {...props} caseData={props.caseData} />;
};

const ModalBody: React.FC<AlgorithmDetailModalProps & { caseData: AlgorithmCase }> = ({
  caseData,
  onClose,
  isFavorite,
  onToggleFavorite,
  onNavigateCase,
}) => {
  const simulatable = caseData.simulatable !== false;
  const [selectedAlgoId, setSelectedAlgoId] = useState<string>(
    caseData.algorithms[0]?.id || ''
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>(simulatable ? '3d' : '2d');
  const [currentCubeState, setCurrentCubeState] = useState<CubeState | null>(null);
  const [transition, setTransition] = useState<CubeTransition | null>(null);
  const [aufAngle, setAufAngle] = useState<number>(0);
  const [notationOpen, setNotationOpen] = useState<boolean>(false);

  // Reset selected algorithm when case changes
  useEffect(() => {
    setSelectedAlgoId(
      caseData.algorithms.find(a => a.isPreferred)?.id || caseData.algorithms[0]?.id || ''
    );
    setTransition(null);
    setAufAngle(0);
    setViewMode(caseData.simulatable === false ? '2d' : '3d');
  }, [caseData.id]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onNavigateCase) onNavigateCase('prev');
      if (e.key === 'ArrowRight' && onNavigateCase) onNavigateCase('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigateCase]);

  const currentAlgo: AlgorithmVariant =
    caseData.algorithms.find(a => a.id === selectedAlgoId) || caseData.algorithms[0];

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(currentAlgo.notation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const setupMove = invertAlgorithm(currentAlgo.notation);

  // Thế bắt đầu = thế bài của case (chạy công thức ngược từ khối đã giải)
  const startState = useMemo(
    () => (simulatable ? caseStateFromAlgorithm(currentAlgo.notation) : null),
    [currentAlgo.notation, simulatable]
  );
  const usedTokens = useMemo(() => uniqueMoveTokens(currentAlgo.notation), [currentAlgo.notation]);
  const usedBases = useMemo(
    () => Array.from(new Set(usedTokens.map(t => decomposeMove(t)?.base ?? ''))),
    [usedTokens]
  );
  const hasRotation = usedBases.some(b => 'xyz'.includes(b) && b);
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-case-title"
    >
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded ${
                caseData.type === 'OLL'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}
            >
              {caseData.type}
            </span>
            <h2 id="modal-case-title" className="text-lg font-bold text-slate-100">
              {caseData.name}
            </h2>
            {caseData.aka && caseData.aka.length > 0 && (
              <span className="text-xs text-slate-400 hidden sm:inline">
                ({caseData.aka.join(', ')})
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Prev / Next navigation buttons */}
            {onNavigateCase && (
              <>
                <button
                  type="button"
                  onClick={() => onNavigateCase('prev')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  title="Case trước (Phím mũi tên trái)"
                  aria-label="Case trước"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateCase('next')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  title="Case sau (Phím mũi tên phải)"
                  aria-label="Case sau"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Favorite toggle */}
            <button
              type="button"
              onClick={() => onToggleFavorite(caseData.id)}
              className={`p-1.5 rounded-lg transition ${
                isFavorite
                  ? 'text-amber-400 hover:text-amber-300'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title={isFavorite ? 'Bỏ yêu thích' : 'Lưu yêu thích'}
              aria-label={isFavorite ? 'Bỏ yêu thích' : 'Lưu yêu thích'}
            >
              <Star className={`w-5 h-5 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition ml-1"
              aria-label="Đóng chi tiết"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-4 py-4 space-y-5">
          {/* Rubik Visualizer Section */}
          <div className="flex flex-col items-center bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 gap-3">
            {/* View Mode Switcher */}
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium">
                {caseData.groupNameVi}
              </span>

              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('2d')}
                  className={`flex items-center gap-1 px-2 py-1 rounded font-medium transition ${
                    viewMode === '2d'
                      ? 'bg-slate-800 text-amber-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>2D Nhìn từ trên</span>
                </button>
                <button
                  type="button"
                  disabled={!simulatable}
                  onClick={() => setViewMode('3d')}
                  className={`flex items-center gap-1 px-2 py-1 rounded font-medium transition ${
                    viewMode === '3d'
                      ? 'bg-slate-800 text-amber-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D Khối xoay</span>
                </button>
              </div>
            </div>

            {/* Visual Display */}
            <div className="py-2 flex flex-col items-center justify-center min-h-[160px] w-full">
              {viewMode === '2d' ? (
                <>
                  {/* AUF Quick Orientation Selector for matching physical cube */}
                  <div className="flex items-center gap-1.5 mb-2.5 bg-slate-900/80 px-2 py-1 rounded-xl border border-slate-800 text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 text-blue-400" />
                      Xoay góc AUF:
                    </span>
                    {[
                      { deg: 0, label: '0°' },
                      { deg: 90, label: 'U (90°)' },
                      { deg: 180, label: 'U2 (180°)' },
                      { deg: 270, label: "U' (270°)" },
                    ].map(item => (
                      <button
                        key={item.deg}
                        type="button"
                        onClick={() => setAufAngle(item.deg)}
                        className={`px-2 py-0.5 rounded-md font-medium transition ${
                          aufAngle === item.deg
                            ? 'bg-blue-600 text-white font-bold shadow'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div
                    className="transition-transform duration-200 flex items-center justify-center"
                    style={{ transform: `rotate(${aufAngle}deg)` }}
                  >
                    <CubeSvg caseData={caseData} size={210} showLabels />
                  </div>
                </>
              ) : (
                currentCubeState && <Cube3D cubeState={currentCubeState} transition={transition} size={280} />
              )}
            </div>

            <div className="text-[11px] text-slate-400 text-center mt-1 flex flex-col gap-0.5">
              <span>
                {viewMode === '2d'
                  ? 'Nhìn từ trên xuống: F (mặt trước) ở phía dưới. Dùng "Xoay góc AUF" để khớp hướng khối bạn đang cầm.'
                  : 'Đây là thế bài của case. Bấm ▶ ở bộ mô phỏng bên dưới: từng lớp sẽ xoay thật cho đến khi khối được giải.'}
              </span>
            </div>

              {/* Step-by-Step Animation Player */}
            {simulatable && startState ? (
              <div className="w-full">
                <h3 className="sr-only">
                  Mô phỏng từng bước
                </h3>
                <AlgorithmPlayer
                  algorithm={currentAlgo.notation}
                  startState={startState}
                  onStepChange={({ state, transition: t }) => {
                    setCurrentCubeState(state);
                    setTransition(t);
                  }}
                />
              </div>
            ) : (
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3 text-xs text-slate-400 leading-relaxed">
                Case này chỉ có trên Rubik 4x4 (lớp trong / "Uw", "Rw"), nên không mô phỏng được trên khối 3x3.
              </div>
            )}

          </div>

          {/* Special recognition note for cases with Mirror/Reverse like T-Perm */}
          {caseData.id === 'pll-t' && (
            <div className="bg-blue-950/30 border border-blue-500/30 rounded-xl p-3 text-xs text-blue-200 space-y-1">
              <span className="font-bold text-blue-300 flex items-center gap-1.5">
                💡 Bạn gặp T-Perm bị ngược (Headlights ở bên phải)?
              </span>
              <p className="text-slate-300 leading-relaxed">
                • <strong>Cách 1 (Khuyên dùng):</strong> Xoay tầng trên <code>U2</code> (hoặc quay cả khối <code>y2</code>) để đưa 2 đèn pha sang bên <strong>Trái</strong>, sau đó thực hiện công thức chuẩn.
              </p>
              <p className="text-slate-300 leading-relaxed">
                • <strong>Cách 2:</strong> Dùng công thức phản chiếu <strong>Lefty T-Perm (tay trái)</strong> có sẵn trong danh sách công thức thay thế bên dưới!
              </p>
            </div>
          )}

          {/* Primary Highlighted Algorithm Box */}
          <div className="bg-slate-950 border-2 border-amber-500/30 rounded-xl p-4 shadow-lg relative group">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-amber-400 uppercase tracking-wider text-[11px]">
                Công thức chuẩn (Algorithm)
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition text-xs"
                title="Sao chép công thức"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400 font-medium">Đã chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-lg sm:text-2xl font-mono font-bold text-slate-50 tracking-wide text-center py-2 select-all leading-relaxed">
              {currentAlgo.notation}
            </div>

            {currentAlgo.description && (
              <div className="text-xs text-slate-400 text-center mt-1">
                Ghi chú: {currentAlgo.description}
              </div>
            )}
          </div>

          {/* Ký hiệu dùng trong công thức */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Ký hiệu trong công thức này
              </h3>
              <button
                type="button"
                onClick={() => setNotationOpen(true)}
                className="flex items-center gap-1 text-xs text-amber-400 hover:underline"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Bảng ký hiệu đầy đủ
              </button>
            </div>
            <div className="grid gap-1.5">
              {usedTokens.map(tok => {
                const d = describeMove(tok);
                if (!d) return null;
                return (
                  <div key={tok} className="flex items-start gap-2.5 rounded-lg border border-slate-800 bg-slate-950/50 px-2.5 py-2">
                    <span className="shrink-0 flex items-center justify-center gap-1 min-w-[3.4rem] px-2 py-1 rounded-md bg-slate-800 text-amber-400 font-mono font-black text-sm">
                      {d.token}
                      <span className="text-base leading-none">{d.arrow}</span>
                    </span>
                    <div className="text-xs leading-relaxed text-slate-300">
                      <div className="font-semibold text-slate-200">{d.title.split(' — ')[1]}</div>
                      <div className="text-slate-400">{d.detail}</div>
                      {d.modifier && <div className="text-slate-500">{d.modifier}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
            {hasRotation && (
              <p className="text-[11px] text-slate-500 mt-1.5">
                x / y / z chỉ là xoay cả khối để đổi cách cầm — các viên không đổi chỗ so với nhau.
              </p>
            )}
          </div>

          {/* Alternative Algorithms (if available) */}
          {caseData.algorithms.length > 1 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Công thức thay thế ({caseData.algorithms.length})
              </h3>
              <div className="space-y-2">
                {caseData.algorithms.map(algo => (
                  <button
                    key={algo.id}
                    type="button"
                    onClick={() => setSelectedAlgoId(algo.id)}
                    className={`w-full text-left p-3 rounded-xl border transition ${
                      selectedAlgoId === algo.id
                        ? 'bg-slate-800/90 border-amber-500/50 text-slate-100'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-300">
                        {algo.description || 'Biến thể'}
                      </span>
                      {algo.isPreferred && (
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold">
                          Khuyên dùng
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-sm sm:text-base font-semibold text-amber-400/90">
                      {algo.notation}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Scramble Setup Move info for cubers */}
          <div className="bg-slate-950/50 border border-slate-850 rounded-xl p-3 text-xs text-slate-400">
            <div className="font-semibold text-slate-300 mb-1 flex items-center justify-between">
              <span>Công thức tạo thế (Setup Scramble):</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(setupMove);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="text-amber-400 hover:underline flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                <span>Chép setup</span>
              </button>
            </div>
            <p className="font-mono text-slate-300 select-all">{setupMove}</p>
            <p className="text-[11px] text-slate-500 mt-1">
              (Thực hiện công thức này từ khối đã giải để tạo đúng thế bài {caseData.name})
            </p>
          </div>
        </div>
      </div>
      <NotationModal open={notationOpen} onClose={() => setNotationOpen(false)} highlightBases={usedBases} />
    </div>
  );
};
