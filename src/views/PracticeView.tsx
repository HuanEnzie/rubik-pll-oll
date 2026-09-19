import React, { useState, useEffect, useRef } from 'react';
import { Target, Timer as TimerIcon, Trophy, RotateCcw, ArrowRight, CheckCircle2, XCircle, AlertCircle, Play, Eye } from 'lucide-react';
import { AlgorithmCase, CaseType, TimerSolve } from '../types';
import { CubeSvg } from '../components/CubeSvg';
import {
  getPracticeStats,
  recordPracticeResult,
  getWeakCases,
  WeakCaseItem,
  getTimerSolves,
  saveTimerSolve,
  clearTimerSolves,
  calculateAverage,
} from '../utils/storage';
import { getCaseById } from '../data';

interface PracticeViewProps {
  ollCases: AlgorithmCase[];
  pllCases: AlgorithmCase[];
  initialMode?: 'weak' | 'all';
  onOpenDetail: (caseData: AlgorithmCase) => void;
}

type QuizPoolType = 'OLL' | 'PLL' | 'BOTH' | 'WEAK';

export const PracticeView: React.FC<PracticeViewProps> = ({
  ollCases,
  pllCases,
  initialMode = 'all',
  onOpenDetail,
}) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'timer' | 'weak'>('quiz');
  const [poolType, setPoolType] = useState<QuizPoolType>(
    initialMode === 'weak' ? 'WEAK' : 'BOTH'
  );

  // Quiz State
  const [currentCase, setCurrentCase] = useState<AlgorithmCase | null>(null);
  const [options, setOptions] = useState<AlgorithmCase[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [sessionCorrect, setSessionCorrect] = useState<number>(0);
  const [sessionTotal, setSessionTotal] = useState<number>(0);
  const [weakList, setWeakList] = useState<WeakCaseItem[]>([]);

  // Timer State
  const [timerStatus, setTimerStatus] = useState<'idle' | 'ready' | 'timing' | 'stopped'>('idle');
  const [timeMs, setTimeMs] = useState<number>(0);
  const [solves, setSolves] = useState<TimerSolve[]>([]);
  const timerStartRef = useRef<number>(0);
  const timerIntervalRef = useRef<number | null>(null);

  // Load weak cases & timer history on mount
  useEffect(() => {
    setWeakList(getWeakCases());
    setSolves(getTimerSolves());
  }, []);

  // Pick a new random quiz case
  const pickNewCase = (type: QuizPoolType = poolType) => {
    let pool: AlgorithmCase[] = [];
    if (type === 'OLL') pool = ollCases;
    else if (type === 'PLL') pool = pllCases;
    else if (type === 'BOTH') pool = [...ollCases, ...pllCases];
    else if (type === 'WEAK') {
      const weaks = getWeakCases();
      pool = weaks
        .map(w => getCaseById(w.caseId))
        .filter((c): c is AlgorithmCase => Boolean(c));
      if (pool.length === 0) {
        pool = [...ollCases, ...pllCases];
      }
    }

    if (pool.length === 0) return;

    const chosen = pool[Math.floor(Math.random() * pool.length)];
    setCurrentCase(chosen);
    setSelectedOptionId(null);
    setIsAnswered(false);

    // Generate 4 multi-choice options (1 correct, 3 distractors of same type if possible)
    const sameTypePool = (chosen.type === 'OLL' ? ollCases : pllCases).filter(
      c => c.id !== chosen.id
    );
    // Shuffle distractors
    const shuffledDistractors = [...sameTypePool].sort(() => 0.5 - Math.random());
    const distractors = shuffledDistractors.slice(0, 3);
    const opts = [chosen, ...distractors].sort(() => 0.5 - Math.random());
    setOptions(opts);
  };

  useEffect(() => {
    pickNewCase(poolType);
  }, [poolType]);

  const handleSelectOption = (opt: AlgorithmCase) => {
    if (isAnswered || !currentCase) return;

    setSelectedOptionId(opt.id);
    setIsAnswered(true);
    const correct = opt.id === currentCase.id;

    // Record stats
    recordPracticeResult(currentCase.id, correct);
    setWeakList(getWeakCases());

    setSessionTotal(prev => prev + 1);
    if (correct) {
      setSessionCorrect(prev => prev + 1);
    }
  };

  // --- TIMER LOGIC ---
  const handleTouchDown = () => {
    if (timerStatus === 'timing') {
      // Stop timer
      stopTimer();
    } else if (timerStatus === 'idle' || timerStatus === 'stopped') {
      // Touch and hold to get ready
      setTimerStatus('ready');
    }
  };

  const handleTouchUp = () => {
    if (timerStatus === 'ready') {
      // Released -> start timing
      startTimer();
    }
  };

  const startTimer = () => {
    setTimerStatus('timing');
    setTimeMs(0);
    timerStartRef.current = performance.now();
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = window.setInterval(() => {
      setTimeMs(Math.round(performance.now() - timerStartRef.current));
    }, 10);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    const finalTime = Math.round(performance.now() - timerStartRef.current);
    setTimeMs(finalTime);
    setTimerStatus('stopped');

    // Save solve
    const newSolve: TimerSolve = {
      id: Date.now().toString(),
      timeMs: finalTime,
      date: Date.now(),
      caseTag: currentCase ? currentCase.name : undefined,
    };
    const updated = saveTimerSolve(newSolve);
    setSolves(updated);
  };

  const formatTime = (ms: number): string => {
    const totalSec = ms / 1000;
    if (totalSec < 60) {
      return totalSec.toFixed(2);
    }
    const mins = Math.floor(totalSec / 60);
    const secs = (totalSec % 60).toFixed(2);
    return `${mins}:${Number(secs) < 10 ? '0' : ''}${secs}`;
  };

  const bestTime = solves.length > 0 ? Math.min(...solves.map(s => s.timeMs)) : null;
  const ao5 = calculateAverage(solves, 5);
  const ao12 = calculateAverage(solves, 12);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 pb-24 space-y-6 animate-in fade-in duration-150">
      {/* Top Header & Mode Switcher */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            <span>Luyện tập & Bấm giờ</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Phản xạ nhận diện hình ảnh case và đo tốc độ thực hiện
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'quiz'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Nhận diện
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('weak')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'weak'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Case yếu ({weakList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('timer')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'timer'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TimerIcon className="w-3.5 h-3.5" />
            <span>Timer</span>
          </button>
        </div>
      </div>

      {/* ================= QUIZ MODE ================= */}
      {activeTab === 'quiz' && (
        <div className="space-y-4">
          {/* Practice Pool Selector */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 mr-1">Bộ luyện:</span>
              {(['BOTH', 'OLL', 'PLL', 'WEAK'] as const).map(pt => (
                <button
                  key={pt}
                  type="button"
                  onClick={() => setPoolType(pt)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    poolType === pt
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 font-bold'
                      : 'bg-slate-950/60 border border-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {pt === 'BOTH'
                    ? 'OLL + PLL'
                    : pt === 'OLL'
                    ? 'OLL (57)'
                    : pt === 'PLL'
                    ? 'PLL (21)'
                    : 'Case yếu'}
                </button>
              ))}
            </div>

            {/* Session Stats */}
            <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span>
                Đúng: <strong className="text-emerald-400">{sessionCorrect}</strong>/
                {sessionTotal}
              </span>
              {sessionTotal > 0 && (
                <span className="text-slate-500">
                  ({Math.round((sessionCorrect / sessionTotal) * 100)}%)
                </span>
              )}
            </div>
          </div>

          {/* Quiz Card */}
          {currentCase && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-5 shadow-lg">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Nhìn thế cube — Đây là case nào?
                </span>
                <p className="text-sm text-slate-300 font-medium">
                  {currentCase.type} ({currentCase.groupNameVi})
                </p>
              </div>

              {/* Central Pattern */}
              <div className="flex items-center justify-center p-4 bg-slate-950 rounded-xl border border-slate-800/80 max-w-[220px] mx-auto aspect-square">
                <CubeSvg caseData={currentCase} size={150} />
              </div>

              {/* 4 Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                {options.map(opt => {
                  const isSelected = selectedOptionId === opt.id;
                  const isCorrect = opt.id === currentCase.id;

                  let btnStyle =
                    'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850';

                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle =
                        'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40';
                    } else if (isSelected && !isCorrect) {
                      btnStyle =
                        'bg-rose-950/60 border-rose-500 text-rose-200 ring-2 ring-rose-500/40';
                    } else {
                      btnStyle = 'opacity-40 border-slate-800 text-slate-500';
                    }
                  }

                  const preferredAlgo =
                    opt.algorithms.find(a => a.isPreferred) || opt.algorithms[0];

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between gap-1 select-none active:scale-[0.99] ${btnStyle}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-base">{opt.name}</span>
                        {opt.aka && opt.aka.length > 0 && (
                          <span className="text-xs text-slate-400">
                            {opt.aka[0]}
                          </span>
                        )}
                        {isAnswered && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400" />
                        )}
                      </div>
                      <div className="text-xs font-mono text-slate-400 truncate">
                        {preferredAlgo.notation}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Actions when answered */}
              {isAnswered && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    {selectedOptionId === currentCase.id ? (
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Chính xác! Rất nhanh!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-rose-400 font-bold">
                        <XCircle className="w-5 h-5" />
                        <span>Chưa đúng! Đáp án là {currentCase.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => onOpenDetail(currentCase)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem công thức</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => pickNewCase()}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-md shadow-emerald-500/20"
                    >
                      <span>Case tiếp theo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ================= WEAK CASES TRACKER ================= */}
      {activeTab === 'weak' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-200">
              Các case có tỷ lệ trả lời sai cao nhất
            </h2>
            <button
              type="button"
              onClick={() => {
                setPoolType('WEAK');
                setActiveTab('quiz');
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/30 transition flex items-center gap-1"
            >
              <span>Luyện các case này</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {weakList.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-200">
                Chưa ghi nhận case yếu nào!
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Hãy làm bài quiz ở tab "Nhận diện", hệ thống sẽ tự động tổng hợp các case bạn hay nhầm.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {weakList.map(item => {
                const c = getCaseById(item.caseId);
                if (!c) return null;
                const preferredAlgo =
                  c.algorithms.find(a => a.isPreferred) || c.algorithms[0];

                return (
                  <div
                    key={item.caseId}
                    onClick={() => onOpenDetail(c)}
                    className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition cursor-pointer flex items-center gap-3"
                  >
                    <div className="w-12 h-12 bg-slate-950 rounded-lg border border-slate-850 flex items-center justify-center p-1 shrink-0">
                      <CubeSvg caseData={c} size={42} showArrows={false} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200 text-sm">
                          {c.name}
                        </span>
                        <span className="text-xs font-bold text-rose-400 font-mono">
                          {item.accuracy}% đúng ({item.wrongCount} lần sai)
                        </span>
                      </div>
                      <div className="font-mono text-xs text-amber-400/90 truncate mt-0.5">
                        {preferredAlgo.notation}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ================= SPEEDCUBING TIMER ================= */}
      {activeTab === 'timer' && (
        <div className="space-y-6">
          {/* Stats Header Bar */}
          <div className="grid grid-cols-3 gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                Best
              </div>
              <div className="text-sm sm:text-base font-mono font-bold text-emerald-400">
                {bestTime ? formatTime(bestTime) : '--'}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                Ao5
              </div>
              <div className="text-sm sm:text-base font-mono font-bold text-amber-400">
                {ao5 ? formatTime(ao5) : '--'}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                Ao12
              </div>
              <div className="text-sm sm:text-base font-mono font-bold text-blue-400">
                {ao12 ? formatTime(ao12) : '--'}
              </div>
            </div>
          </div>

          {/* Interactive StackMat Touch Area */}
          <div
            onPointerDown={handleTouchDown}
            onPointerUp={handleTouchUp}
            className={`min-h-[220px] sm:min-h-[260px] rounded-2xl flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-150 p-6 border-2 ${
              timerStatus === 'ready'
                ? 'bg-emerald-950/40 border-emerald-500 shadow-xl shadow-emerald-500/20'
                : timerStatus === 'timing'
                ? 'bg-slate-950 border-amber-500/80 shadow-xl shadow-amber-500/20'
                : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div
              className={`text-5xl sm:text-7xl font-mono font-black tracking-tight ${
                timerStatus === 'ready'
                  ? 'text-emerald-400 scale-105'
                  : timerStatus === 'timing'
                  ? 'text-amber-400'
                  : 'text-slate-100'
              }`}
            >
              {formatTime(timeMs)}
            </div>

            <p className="text-xs text-slate-400 mt-3 font-medium">
              {timerStatus === 'ready'
                ? '🟢 Thả tay ra để BẮT ĐẦU!'
                : timerStatus === 'timing'
                ? '🟡 Chạm bất kỳ đâu để DỪNG'
                : 'Chạm & giữ để sẵn sàng → Thả tay để tính giờ'}
            </p>
          </div>

          {/* Solves History */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider">
                Lịch sử lần giải ({solves.length})
              </span>
              {solves.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    clearTimerSolves();
                    setSolves([]);
                  }}
                  className="text-slate-500 hover:text-rose-400 transition"
                >
                  Xóa lịch sử
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {solves.slice(0, 15).map((s, idx) => (
                <span
                  key={s.id}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                >
                  #{solves.length - idx}: <strong className="text-slate-100">{formatTime(s.timeMs)}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
