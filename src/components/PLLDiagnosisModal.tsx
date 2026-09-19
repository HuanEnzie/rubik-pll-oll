import React, { useState } from 'react';
import { X, HelpCircle, AlertTriangle, CheckCircle2, ChevronRight, Sparkles, RefreshCw } from 'lucide-react';
import { AlgorithmCase } from '../types';
import { CubeSvg } from './CubeSvg';

interface PLLDiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  cases: AlgorithmCase[];
  onSelectCase: (caseData: AlgorithmCase) => void;
}

export const PLLDiagnosisModal: React.FC<PLLDiagnosisModalProps> = ({
  isOpen,
  onClose,
  cases,
  onSelectCase,
}) => {
  const [selectedIssue, setSelectedIssue] = useState<'4x4_parity' | '3x3_pop' | 'recognition' | null>('4x4_parity');
  const [headlightFilter, setHeadlightFilter] = useState<'any' | '0' | '1' | '4'>('any');
  const [hasBarFilter, setHasBarFilter] = useState<'any' | 'yes' | 'no'>('any');

  if (!isOpen) return null;

  // Find Parity cases
  const parityOpp = cases.find(c => c.id === 'pll-parity-opp');
  const parityAdj = cases.find(c => c.id === 'pll-parity-adj');

  // Filter cases for the interactive finder
  const matchedCases = cases.filter(c => {
    if (c.category === 'Parity') return false;
    
    // Headlights count logic
    if (headlightFilter === '4') {
      // 4 headlights = Edges-only (Ua, Ub, H, Z)
      if (c.category !== 'Edges') return false;
    } else if (headlightFilter === '1') {
      // 1 headlight = T, F, Ja, Jb, Ra, Rb, Aa, Ab, G-perms
      const is1Headlight = ['pll-t', 'pll-f', 'pll-ja', 'pll-jb', 'pll-ra', 'pll-rb', 'pll-aa', 'pll-ab', 'pll-ga', 'pll-gb', 'pll-gc', 'pll-gd'].includes(c.id);
      if (!is1Headlight) return false;
    } else if (headlightFilter === '0') {
      // 0 headlights = E, V, Y, Na, Nb
      const is0Headlight = ['pll-e', 'pll-v', 'pll-y', 'pll-na', 'pll-nb'].includes(c.id);
      if (!is0Headlight) return false;
    }

    // Has Bar 1x1x3 logic
    if (hasBarFilter === 'yes') {
      const withBar = ['pll-ua', 'pll-ub', 'pll-ja', 'pll-jb', 'pll-f', 'pll-ra', 'pll-rb'];
      if (!withBar.includes(c.id)) return false;
    } else if (hasBarFilter === 'no') {
      const withBar = ['pll-ua', 'pll-ub', 'pll-ja', 'pll-jb', 'pll-f', 'pll-ra', 'pll-rb'];
      if (withBar.includes(c.id)) return false;
    }

    return true;
  });

  return (
    <div
      id="pll-diagnosis-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="pll-diagnosis-modal-content"
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                Chẩn đoán trường hợp PLL
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Trợ lý Cuber
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Giải đáp khi bạn gặp trường hợp tưởng chừng như "không có trong danh sách"
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector for Diagnosis */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 p-1.5 gap-1 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setSelectedIssue('4x4_parity')}
            className={`flex-1 min-w-[140px] py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition ${
              selectedIssue === '4x4_parity'
                ? 'bg-blue-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span>Chỉ đổi 2 cạnh (4x4 Parity)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedIssue('3x3_pop')}
            className={`flex-1 min-w-[140px] py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition ${
              selectedIssue === '3x3_pop'
                ? 'bg-blue-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
            <span>Rubik 3x3 bị lắp sai</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedIssue('recognition')}
            className={`flex-1 min-w-[140px] py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition ${
              selectedIssue === 'recognition'
                ? 'bg-blue-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Bộ nhận diện nhanh PLL</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* SCENARIO 1: 4X4 PARITY */}
          {selectedIssue === '4x4_parity' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
                <p className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Bạn đang xoay Rubik 4x4x4, 6x6x6 hoặc khối chẵn?
                </p>
                Trên Rubik 4x4x4, sau khi hoàn thành OLL, bạn có <strong>50% xác suất</strong> gặp hiện tượng <strong>PLL Parity</strong> — nơi mà mọi viên đã đúng vị trí, nhưng <strong>chỉ có đúng 2 cạnh bị tráo</strong> cho nhau. Đây là đặc tính cơ học của các khối chẵn không có tâm cố định, và <em>không tồn tại trên Rubik 3x3 tiêu chuẩn</em>.
              </div>

              <h3 className="font-bold text-slate-200 text-sm">
                2 Công thức giải PLL Parity chuẩn WCA:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Opposite Parity Card */}
                {parityOpp && (
                  <div
                    onClick={() => {
                      onClose();
                      onSelectCase(parityOpp);
                    }}
                    className="p-3.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition hover:border-blue-400 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-100 text-xs">
                        1. Đổi 2 Cạnh Đối Diện
                      </span>
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-bold">
                        Phổ biến nhất
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-slate-950 rounded-lg flex items-center justify-center p-1 shrink-0 border border-slate-800">
                        <CubeSvg caseData={parityOpp} size={56} />
                      </div>
                      <div className="space-y-1 overflow-hidden">
                        <p className="text-[11px] font-mono font-bold text-amber-300 truncate">
                          r2 U2 r2 Uw2 r2 u2
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Xoay 2 lớp trong trục R và U để hoán vị 2 cạnh đối diện.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Adjacent Parity Card */}
                {parityAdj && (
                  <div
                    onClick={() => {
                      onClose();
                      onSelectCase(parityAdj);
                    }}
                    className="p-3.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition hover:border-blue-400 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-100 text-xs">
                        2. Đổi 2 Cạnh Kề Nhau
                      </span>
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-bold">
                        Parity + T-Perm
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-slate-950 rounded-lg flex items-center justify-center p-1 shrink-0 border border-slate-800">
                        <CubeSvg caseData={parityAdj} size={56} />
                      </div>
                      <div className="space-y-1 overflow-hidden">
                        <p className="text-[11px] font-mono font-bold text-indigo-300 truncate">
                          (r2 U2 r2 Uw2 r2 u2) + T
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Thực hiện Parity đối rồi giải bằng 1 công thức T-Perm quen thuộc.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs text-slate-400 space-y-1">
                <span className="font-bold text-slate-300">💡 Lưu ý ký hiệu 4x4:</span>
                <p>• <strong>r (hoặc 2R)</strong>: Xoay lớp thứ 2 bên phải tính từ ngoài vào.</p>
                <p>• <strong>Uw (hoặc u)</strong>: Xoay cùng lúc 2 lớp trên (Lớp U và lớp ngay dưới nó).</p>
              </div>
            </div>
          )}

          {/* SCENARIO 2: 3X3 UNREACHABLE STATE */}
          {selectedIssue === '3x3_pop' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs leading-relaxed">
                <p className="font-bold text-rose-300 mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Bạn đang xoay Rubik 3x3 và chỉ có 2 viên bị đổi chỗ?
                </p>
                Theo <strong>Lý thuyết nhóm toán học (Group Theory)</strong> chứng minh cấu trúc Rubik 3x3: Một khối Rubik tiêu chuẩn <strong>KHÔNG THỂ CHỈ HOÁN VỊ 2 VIÊN</strong> (hoán vị lẻ) mà giữ nguyên các viên còn lại.
              </div>

              <div className="space-y-2.5">
                <h4 className="font-bold text-slate-200 text-xs sm:text-sm">
                  Các dấu hiệu cho thấy khối 3x3 của bạn bị lỗi lắp ráp:
                </h4>
                
                <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    1. Chỉ có đúng 2 viên cạnh bị hoán đổi (Các viên khác đều đúng)
                  </div>
                  <p className="text-slate-400 text-xs pl-3.5">
                    Khối đã từng bị rơi tung viên (pop) hoặc có người tháo ra lắp nhầm cạnh.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    2. Chỉ có 1 viên góc bị xoay hướng (Corner Twist)
                  </div>
                  <p className="text-slate-400 text-xs pl-3.5">
                    Lúc xoay nhanh bị vặn góc vô ý (corner twist khi cắt góc mạnh).
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 space-y-1">
                <span className="font-bold text-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Cách khắc phục đơn giản:
                </span>
                <p>1. Xoay tầng trên (U) một góc <strong>45 độ</strong>.</p>
                <p>2. Dùng ngón cái nhẹ nhàng nạy một viên cạnh ra khỏi rãnh.</p>
                <p>3. Tráo đúng vị trí 2 viên cạnh bị nhầm, hoặc xoay đúng góc rồi gắn lại.</p>
                <p>4. Sau khi lắp lại, khối Rubik của bạn sẽ luôn giải được bình thường 100%!</p>
              </div>
            </div>
          )}

          {/* SCENARIO 3: RECOGNITION GUIDE */}
          {selectedIssue === 'recognition' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <p className="text-xs text-slate-300">
                Hãy quan sát 4 mặt bên của tầng cuối (U) để nhận diện chính xác trường hợp PLL của bạn:
              </p>

              {/* Interactive Quick Finder */}
              <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    1. Có bao nhiêu mặt có "Headlights" (2 góc cùng màu)?
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'any', label: 'Tất cả' },
                      { id: '4', label: '4 mặt (Góc xong)' },
                      { id: '1', label: 'Chỉ 1 mặt' },
                      { id: '0', label: '0 mặt (Chéo)' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setHeadlightFilter(opt.id as any)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition ${
                          headlightFilter === opt.id
                            ? 'bg-blue-600 border-blue-500 text-white font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    2. Có thanh 1x1x3 (3 viên cùng một màu ở 1 mặt) không?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'any', label: 'Tất cả' },
                      { id: 'yes', label: 'Có (Solved Bar)' },
                      { id: 'no', label: 'Không có bar' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setHasBarFilter(opt.id as any)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition ${
                          hasBarFilter === opt.id
                            ? 'bg-blue-600 border-blue-500 text-white font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Matched cases count */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Trường hợp phù hợp: <strong>{matchedCases.length}</strong></span>
                  {(headlightFilter !== 'any' || hasBarFilter !== 'any') && (
                    <button
                      type="button"
                      onClick={() => {
                        setHeadlightFilter('any');
                        setHasBarFilter('any');
                      }}
                      className="text-blue-400 hover:underline"
                    >
                      Đặt lại bộ lọc
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                  {matchedCases.map(c => (
                    <div
                      key={c.id}
                      onClick={() => {
                        onClose();
                        onSelectCase(c);
                      }}
                      className="p-2 bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-blue-400 rounded-lg cursor-pointer transition flex items-center gap-2"
                    >
                      <div className="w-9 h-9 bg-slate-950 rounded p-0.5 shrink-0 flex items-center justify-center">
                        <CubeSvg caseData={c} size={32} />
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-bold text-slate-100 text-xs truncate">
                          {c.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {c.aka?.[0] || c.category}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition"
          >
            Đã hiểu, quay lại thư viện
          </button>
        </div>
      </div>
    </div>
  );
};
