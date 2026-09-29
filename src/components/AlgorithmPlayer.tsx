import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { parseAlgorithmMoves, applyMove, invertMove, CubeState } from '../utils/cubeState';
import { describeMove } from '../utils/notation';
import { CubeTransition } from './Cube3D';

interface AlgorithmPlayerProps {
  algorithm: string;
  /** Thế bài bắt đầu (case). Chạy hết công thức thì khối được giải. */
  startState: CubeState;
  onStepChange?: (info: { step: number; move: string; state: CubeState; transition: CubeTransition | null }) => void;
  className?: string;
}

export const AlgorithmPlayer: React.FC<AlgorithmPlayerProps> = ({
  algorithm,
  startState,
  onStepChange,
  className = '',
}) => {
  const moves = useMemo(() => parseAlgorithmMoves(algorithm), [algorithm]);
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1 = thế bắt đầu
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const prevStepRef = useRef<number>(-1);
  const keyRef = useRef(0);
  const onStepChangeRef = useRef(onStepChange);
  onStepChangeRef.current = onStepChange;

  // states[k+1] = trạng thái sau nước thứ k; states[0] = thế bắt đầu
  const states = useMemo(() => {
    const out: CubeState[] = [startState];
    let s = startState;
    for (const m of moves) {
      s = applyMove(s, m);
      out.push(s);
    }
    return out;
  }, [moves, startState]);

  const stepDurationMs = Math.round(900 / speed);

  // đổi công thức / thế bắt đầu -> về đầu
  useEffect(() => {
    setCurrentStep(-1);
    setIsPlaying(false);
    prevStepRef.current = -1;
  }, [algorithm, startState]);

  // tự chạy
  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      setCurrentStep(prev => {
        if (prev + 1 >= moves.length) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, stepDurationMs);
    return () => window.clearInterval(id);
  }, [isPlaying, stepDurationMs, moves.length]);

  // báo cho cha (kèm thông tin animate nếu nhảy đúng 1 bước)
  useEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = currentStep;
    const state = states[Math.max(0, Math.min(currentStep + 1, states.length - 1))];
    let transition: CubeTransition | null = null;
    const durationMs = Math.round(stepDurationMs * 0.75);
    if (currentStep === prev + 1 && currentStep >= 0) {
      transition = { key: ++keyRef.current, move: moves[currentStep], from: states[currentStep], durationMs };
    } else if (currentStep === prev - 1 && prev >= 0) {
      transition = { key: ++keyRef.current, move: invertMove(moves[prev]), from: states[prev + 1], durationMs };
    }
    onStepChangeRef.current?.({
      step: currentStep,
      move: currentStep >= 0 ? moves[currentStep] : '',
      state,
      transition,
    });
  }, [currentStep, states, moves, stepDurationMs]);

  const handlePlayToggle = useCallback(() => {
    if (currentStep >= moves.length - 1) {
      setCurrentStep(-1);
      setIsPlaying(true);
    } else {
      setIsPlaying(p => !p);
    }
  }, [currentStep, moves.length]);

  const stop = () => setIsPlaying(false);
  const handlePrev = () => { stop(); setCurrentStep(p => Math.max(-1, p - 1)); };
  const handleNext = () => { stop(); setCurrentStep(p => Math.min(moves.length - 1, p + 1)); };
  const handleReset = () => { stop(); setCurrentStep(-1); };
  const handleStepClick = (i: number) => { stop(); setCurrentStep(i); };

  const info = currentStep >= 0 ? describeMove(moves[currentStep]) : null;
  const nextInfo = currentStep + 1 < moves.length ? describeMove(moves[currentStep + 1]) : null;
  const finished = currentStep >= moves.length - 1 && moves.length > 0;

  return (
    <div className={`flex flex-col gap-3 bg-slate-900 border border-slate-800 rounded-xl p-4 ${className}`}>
      {/* Thẻ giải thích nước đi hiện tại */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-3 py-2.5 min-h-[76px]">
        {info ? (
          <div className="flex items-start gap-3">
            <div className="shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20">
              <span className="text-2xl font-black font-mono leading-none">{info.token}</span>
              <span className="text-xl leading-none mt-0.5">{info.arrow}</span>
            </div>
            <div className="text-xs leading-relaxed min-w-0">
              <div className="font-bold text-amber-300 text-sm">{info.title}</div>
              <div className="text-slate-200">{info.detail}</div>
              {info.modifier && <div className="text-slate-400 mt-0.5">{info.modifier}</div>}
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-300 leading-relaxed">
            {finished ? (
              <span className="text-green-400 font-bold">✔ Khối đã được giải xong.</span>
            ) : (
              <>
                <span className="font-bold text-amber-300">Thế bắt đầu của case.</span> Bấm ▶ hoặc "Bước sau" để xem từng nước.
                {nextInfo && (
                  <span className="block text-slate-400 mt-0.5">
                    Nước đầu tiên: <b className="text-slate-200 font-mono">{nextInfo.token}</b> {nextInfo.arrow} — {nextInfo.detail}
                  </span>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Dòng ký hiệu, mỗi nước có mũi tên hướng để khỏi phải nhớ */}
      <div className="flex flex-wrap gap-1.5 items-stretch justify-center p-2 bg-slate-950/60 rounded-lg border border-slate-800/80">
        {moves.map((move, idx) => {
          const d = describeMove(move);
          const isActive = idx === currentStep;
          const isPassed = idx < currentStep;
          return (
            <button
              key={`${move}-${idx}`}
              type="button"
              onClick={() => handleStepClick(idx)}
              className={`flex flex-col items-center min-w-[2.4rem] px-1.5 py-1 rounded-md font-mono transition-all duration-150 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 ring-2 ring-amber-300 scale-105'
                  : isPassed
                  ? 'text-slate-500 bg-slate-800/50 hover:text-slate-200'
                  : 'text-slate-200 bg-slate-800/80 hover:bg-slate-700'
              }`}
              title={d ? `${d.title}\n${d.detail}${d.modifier ? '\n' + d.modifier : ''}` : move}
            >
              <span className="text-sm sm:text-base font-bold leading-tight">{move}</span>
              <span className={`text-xs leading-none ${isActive ? 'text-slate-800' : 'text-amber-400/80'}`}>{d?.arrow ?? ''}</span>
            </button>
          );
        })}
      </div>

      {/* Tiến độ */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Bước: <span className="text-amber-400 font-mono font-semibold">{currentStep + 1}</span> / {moves.length}
        </span>
        <div className="w-28 bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-amber-400 h-full transition-all duration-150"
            style={{ width: `${moves.length > 0 ? ((currentStep + 1) / moves.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Điều khiển */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-1 border-t border-slate-800/60">
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          {[0.5, 1, 2].map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setSpeed(s)}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                speed === s ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            disabled={currentStep === -1}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition disabled:opacity-40"
            title="Về thế bắt đầu"
            aria-label="Về thế bắt đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep <= -1}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition disabled:opacity-40"
            title="Bước trước"
            aria-label="Bước trước"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handlePlayToggle}
            className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20 active:scale-95 transition"
            title={isPlaying ? 'Tạm dừng' : 'Chạy'}
            aria-label={isPlaying ? 'Tạm dừng' : 'Chạy animation'}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentStep >= moves.length - 1}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition disabled:opacity-40"
            title="Bước sau"
            aria-label="Bước sau"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs text-slate-500 font-mono hidden sm:block">{moves.length} nước</div>
      </div>
    </div>
  );
};
