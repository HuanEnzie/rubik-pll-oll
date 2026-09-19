export type CaseType = 'OLL' | 'PLL';

export type OLLCategory = 'Dot' | 'Line' | 'L' | 'Cross' | 'Corners';
export type PLLCategory = 'Corners' | 'Edges' | 'G Perms' | 'Other' | 'Parity';

export interface AlgorithmVariant {
  id: string;
  notation: string;
  description?: string;
  isPreferred?: boolean;
  fingerTrickNotes?: string;
}

/**
 * 2D representation of top layer for OLL:
 * top: 3x3 array where true means yellow on top face, false means side color.
 * sides: [N, E, S, W] where each is a 3-element array of booleans indicating yellow sticker facing that direction.
 */
export interface OLLPattern {
  top: boolean[][]; // 3x3 [row 0..2][col 0..2] - true if yellow on U face
  // side stickers facing outward [top/North (3), right/East (3), bottom/South (3), left/West (3)]
  sides: {
    N: [boolean, boolean, boolean];
    E: [boolean, boolean, boolean];
    S: [boolean, boolean, boolean];
    W: [boolean, boolean, boolean];
  };
}

/**
 * PLL representation:
 * top face is all yellow, side stickers around the U layer show the permutation of colors.
 * Standard colors: 0: Green (Front), 1: Red (Right), 2: Blue (Back), 3: Orange (Left)
 * sides: [N(Back), E(Right), S(Front), W(Left)] each with 3 color indices or arrow swaps
 */
export interface PLLPattern {
  arrows?: { from: [number, number]; to: [number, number]; twoWay?: boolean }[];
  sideColors: {
    N: [number, number, number]; // Back face top layer
    E: [number, number, number]; // Right face top layer
    S: [number, number, number]; // Front face top layer
    W: [number, number, number]; // Left face top layer
  };
}

export interface AlgorithmCase {
  id: string; // e.g. "oll-1", "pll-t"
  type: CaseType;
  number: number; // 1-57 for OLL, 1-21 for PLL
  name: string; // e.g. "OLL 21" or "T Perm"
  aka?: string[]; // e.g. ["H", "Double Sune"]
  category: string; // "Cross", "Dot", "Line", "L", "Corners", "Edges", "G Perms", "Other"
  groupNameVi: string; // Vietnamese category name e.g. "Chữ thập (Cross)", "Dấu chấm (Dot)"
  ollPattern?: OLLPattern;
  pllPattern?: PLLPattern;
  algorithms: AlgorithmVariant[];
  tags: string[];
  setupMove?: string; // Move to scramble cube to this case state from solved
}

export interface PracticeRecord {
  caseId: string;
  correct: number;
  wrong: number;
  lastPracticed: number;
}

export interface TimerSolve {
  id: string;
  timeMs: number;
  date: number;
  penalty?: 'none' | '+2' | 'dnf';
  caseTag?: string;
}

export interface UserStats {
  favorites: string[]; // case ids
  recent: string[]; // case ids
  practiceHistory: Record<string, PracticeRecord>;
  timerHistory: TimerSolve[];
}
