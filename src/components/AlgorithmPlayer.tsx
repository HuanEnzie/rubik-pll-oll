import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { parseAlgorithmMoves, createSolvedCube, applyMove, CubeState } from '../utils/cubeState';

interface AlgorithmPlayerProps {
  algorithm: string;
  onStepChange?: (stepIndex: number, move: string, cubeState: CubeState) => void;
  className?: string;
}

export const AlgorithmPlayer: React.FC<AlgorithmPlayerProps> = ({
  algorithm,
  onStepChange,
  className = '',
}) => {
  const moves = parseAlgorithmMoves(algorithm);
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1 = start (ready/initial)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 0.5, 1, 2
  const timerRef = useRef<number | null>(null);

  // Precompute cube state at each step:
  // Step -1: initial state
  // Step 0: after move[0]
  // Step k: after move[k]
  const stepStates = useRef<CubeState[]>([]);

  useEffect(() => {
    // Generate states
    const states: CubeState[] = [];
    let state = createSolvedCube();
    // initial state
    states.push(state);

    for (const m of moves) {
      state = applyMove(state, m);
      states.push(state);
    }
    stepStates.current = states;
    setCurrentStep(-1);
    setIsPlaying(false);

    if (onStepChange) {
      onStepChange(-1, '', states[0]);
    }
  }, [algorithm]);

  // Handle animation timer
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const intervalMs = Math.round(900 / speed);

    timerRef.current = window.setInterval(() => {
      setCurrentStep(prev => {
        const next = prev + 1;
        if (next >= moves.length) {
          setIsPlaying(false);
          return prev;
        }
        return next;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, speed, moves.length]);

  // Notify parent on step change
  useEffect(() => {
    if (onStepChange && stepStates.current.length > 0) {
      const stateIdx = currentStep + 1;
      const safeIdx = Math.max(0, Math.min(stateIdx, stepStates.current.length - 1));
      const activeMove = currentStep >= 0 && currentStep < moves.length ? moves[currentStep] : '';
      onStepChange(currentStep, activeMove, stepStates.current[safeIdx]);
    }
  }, [currentStep]);

  const handlePlayToggle = () => {
    if (currentStep >= moves.length - 1) {
      // restart if at end
      setCurrentStep(-1);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStep(prev => Math.max(-1, prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep(prev => Math.min(moves.length - 1, prev + 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(-1);
  };

  const handleStepClick = (index: number) => {
    setIsPlaying(false);
    setCurrentStep(index);
  };

  return (
    <div className={`flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4 ${className}`}>
      {/* Algorithm Token Stream with highlight */}
      <div className="flex flex-wrap gap-2 items-center justify-center min-h-[52px] p-2 bg-slate-950/60 rounded-lg border border-slate-800/80">
        {moves.map((move, idx) => {
          const isActive = idx === currentStep;
          const isPassed = idx < currentStep;

          return (
            <button
              key={`${move}-${idx}`}
              type="button"
              onClick={() => handleStepClick(idx)}
              className={`px-2.5 py-1 rounded text-sm sm:text-base font-mono font-bold transition-all duration-150 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 scale-110 ring-2 ring-amber-400 z-10'
                  : isPassed
                  ? 'text-slate-400 hover:text-slate-200 bg-slate-800/60'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
              title={`Nhảy tới bước ${idx + 1}: ${move}`}
            >
              {move}
            </button>
          );
        })}
      </div>

      {/* Progress & Step Counter */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Bước: <span className="text-amber-400 font-mono font-semibold">{currentStep + 1}</span> / {moves.length}
        </span>
        {currentStep >= 0 && currentStep < moves.length && (
          <span className="text-slate-300 font-mono">
            Đang thực hiện: <span className="text-amber-400 font-bold text-sm">{moves[currentStep]}</span>
          </span>
        )}
        <div className="w-24 bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-amber-400 h-full transition-all duration-150"
            style={{
              width: `${moves.length > 0 ? ((currentStep + 1) / moves.length) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* Playback Controls & Speed Selectors */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-1 border-t border-slate-800/60">
        {/* Speed Buttons */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          {[0.5, 1, 2].map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setSpeed(s)}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                speed === s
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Center Control Group */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            disabled={currentStep === -1}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition disabled:opacity-40"
            title="Bắt đầu lại (Reset)"
            aria-label="Bắt đầu lại"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep <= -1}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition disabled:opacity-40"
            title="Bước trước (Previous)"
            aria-label="Bước trước"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handlePlayToggle}
            className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20 active:scale-95 transition"
            title={isPlaying ? 'Tạm dừng (Pause)' : 'Chạy (Play)'}
            aria-label={isPlaying ? 'Tạm dừng' : 'Chạy animation'}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentStep >= moves.length - 1}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition disabled:opacity-40"
            title="Bước sau (Next)"
            aria-label="Bước sau"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Info */}
        <div className="text-xs text-slate-500 font-mono hidden sm:block">
          {moves.length} moves
        </div>
      </div>
    </div>
  );
};
