import { PracticeRecord, TimerSolve } from '../types';

const STORAGE_KEYS = {
  FAVORITES: 'cubequick_favorites_v1',
  RECENT: 'cubequick_recent_v1',
  PRACTICE: 'cubequick_practice_v1',
  TIMER: 'cubequick_timer_v1',
  THEME: 'cubequick_theme_v1',
};

// Default initial state
export function getFavorites(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : ['oll-21', 'oll-27', 'pll-t', 'pll-jb'];
  } catch {
    return ['oll-21', 'oll-27', 'pll-t', 'pll-jb'];
  }
}

export function toggleFavorite(caseId: string): boolean {
  const current = getFavorites();
  const exists = current.includes(caseId);
  const updated = exists ? current.filter(id => id !== caseId) : [caseId, ...current];
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save favorites', e);
  }
  return !exists;
}

export function isFavorite(caseId: string): boolean {
  return getFavorites().includes(caseId);
}

export function getRecent(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RECENT);
    return data ? JSON.parse(data) : ['oll-21', 'pll-t', 'oll-27', 'pll-jb'];
  } catch {
    return ['oll-21', 'pll-t', 'oll-27', 'pll-jb'];
  }
}

export function addRecent(caseId: string): void {
  try {
    const current = getRecent().filter(id => id !== caseId);
    const updated = [caseId, ...current].slice(0, 20); // Keep max 20
    localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update recent', e);
  }
}

export function getPracticeStats(): Record<string, PracticeRecord> {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRACTICE);
    if (!data) {
      // Seed some starter practice records so weak cases widget has realistic demo data initially
      const starter: Record<string, PracticeRecord> = {
        'oll-33': { caseId: 'oll-33', correct: 5, wrong: 7, lastPracticed: Date.now() - 3600000 },
        'oll-41': { caseId: 'oll-41', correct: 4, wrong: 4, lastPracticed: Date.now() - 7200000 },
        'pll-v': { caseId: 'pll-v', correct: 7, wrong: 5, lastPracticed: Date.now() - 1800000 },
      };
      return starter;
    }
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export function recordPracticeResult(caseId: string, isCorrect: boolean): PracticeRecord {
  const allStats = getPracticeStats();
  const existing = allStats[caseId] || {
    caseId,
    correct: 0,
    wrong: 0,
    lastPracticed: Date.now(),
  };

  const updated: PracticeRecord = {
    caseId,
    correct: existing.correct + (isCorrect ? 1 : 0),
    wrong: existing.wrong + (isCorrect ? 0 : 1),
    lastPracticed: Date.now(),
  };

  allStats[caseId] = updated;
  try {
    localStorage.setItem(STORAGE_KEYS.PRACTICE, JSON.stringify(allStats));
  } catch (e) {
    console.error('Failed to save practice stats', e);
  }
  return updated;
}

export interface WeakCaseItem {
  caseId: string;
  accuracy: number; // 0 to 100
  totalAttempts: number;
  wrongCount: number;
}

export function getWeakCases(): WeakCaseItem[] {
  const stats = getPracticeStats();
  const items: WeakCaseItem[] = [];

  for (const [caseId, record] of Object.entries(stats)) {
    const total = record.correct + record.wrong;
    if (total >= 2) {
      const accuracy = Math.round((record.correct / total) * 100);
      if (accuracy < 80) {
        items.push({
          caseId,
          accuracy,
          totalAttempts: total,
          wrongCount: record.wrong,
        });
      }
    }
  }

  // Sort lowest accuracy first, then highest wrong count
  return items.sort((a, b) => a.accuracy - b.accuracy || b.wrongCount - a.wrongCount);
}

// Timer solves
export function getTimerSolves(): TimerSolve[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TIMER);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveTimerSolve(solve: TimerSolve): TimerSolve[] {
  const current = getTimerSolves();
  const updated = [solve, ...current].slice(0, 100);
  try {
    localStorage.setItem(STORAGE_KEYS.TIMER, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save timer solve', e);
  }
  return updated;
}

export function clearTimerSolves(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.TIMER);
  } catch (e) {
    console.error('Failed to clear timer', e);
  }
}

export function calculateAverage(solves: TimerSolve[], count: number): number | null {
  if (solves.length < count) return null;
  const subset = solves.slice(0, count);
  // check for DNF
  const dnfCount = subset.filter(s => s.penalty === 'dnf').length;
  if (dnfCount > 1) return null; // DNF for avg

  const times = subset.map(s => {
    if (s.penalty === 'dnf') return Infinity;
    return s.timeMs + (s.penalty === '+2' ? 2000 : 0);
  });

  // WCA rule: trim fastest and slowest, average the remaining count - 2
  times.sort((a, b) => a - b);
  const trimmed = times.slice(1, -1);
  if (trimmed.some(t => !isFinite(t))) return null;

  const sum = trimmed.reduce((acc, v) => acc + v, 0);
  return Math.round(sum / trimmed.length);
}
