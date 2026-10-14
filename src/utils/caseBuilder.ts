/**
 * Dựng AlgorithmCase từ định nghĩa gọn (số/tên + danh sách công thức).
 * Hình 2D (ollPattern / pllPattern) được TÍNH từ công thức đầu tiên (công thức chuẩn) bằng mô phỏng,
 * nên không bao giờ lệch với công thức.
 */
import { AlgorithmCase, AlgorithmVariant, PLLPattern } from '../types';
import { caseStateFromAlgorithm, edgeGroupOf, llPatternFromState, ollPatternFromState, pllPatternFromState } from './caseAnalysis';
import { decomposeMove, parseAlgorithmMoves } from './cubeState';

export type OllFamily =
  | 'Dot' | 'Square' | 'Lightning' | 'Fish' | 'Knight' | 'Cross' | 'Corners'
  | 'Awkward' | 'P' | 'T' | 'C' | 'W' | 'L' | 'Line';

const FAMILY_VI: Record<OllFamily, string> = {
  Dot: 'Dấu chấm (Dot)',
  Square: 'Hình vuông (Square)',
  Lightning: 'Tia sét (Lightning)',
  Fish: 'Con cá (Fish)',
  Knight: 'Nước mã (Knight)',
  Cross: 'Chữ thập (Cross)',
  Corners: 'Chỉ lệch cạnh (Corners)',
  Awkward: 'Khó nhằn (Awkward)',
  P: 'Chữ P (P-Shape)',
  T: 'Chữ T (T-Shape)',
  C: 'Chữ C (C-Shape)',
  W: 'Chữ W (W-Shape)',
  L: 'Chữ L (L-Shape)',
  Line: 'Đường thẳng (Line)',
};

const EDGE_GROUP_VI = {
  Dot: 'Dấu chấm (Dot)',
  Line: 'Đường thẳng (Line)',
  L: 'Chữ L (L-Shape)',
  Cross: 'Chữ thập (Cross)',
} as const;

/** Mô tả ngắn, tính từ chính công thức (đúng sự thật, không bịa nhãn "nguồn"). */
export function describeAlgorithm(notation: string): string {
  const toks = parseAlgorithmMoves(notation);
  const bases = toks.map(t => decomposeMove(t)?.base ?? '');
  const n = toks.filter(t => !/^[xyz]/.test(t)).length;
  const feats: string[] = [];
  if (bases.some(b => b === 'x' || b === 'y' || b === 'z')) feats.push('có xoay cả khối');
  if (bases.some(b => 'MES'.includes(b) && b)) feats.push('dùng lớp giữa');
  if (bases.some(b => 'rludfb'.includes(b) && b)) feats.push('dùng 2 lớp (r/l/u/d/f/b)');
  if (bases.some(b => b === 'D')) feats.push('dùng D');
  if (bases.some(b => b === 'F' || b === 'B') && !feats.length) feats.push('dùng F/B');
  if (!feats.length && bases.every(b => b === 'R' || b === 'U')) feats.push('chỉ R và U');
  return `${n} nước${feats.length ? ' · ' + feats.join(', ') : ''}`;
}

function toVariants(prefix: string, algs: string[], firstLabel = 'Công thức chuẩn'): AlgorithmVariant[] {
  return algs.map((notation, i) => ({
    id: `${prefix}-${i + 1}`,
    notation,
    description: i === 0 ? `${firstLabel} · ${describeAlgorithm(notation)}` : `Biến thể · ${describeAlgorithm(notation)}`,
    isPreferred: i === 0,
  }));
}

export interface OllDef {
  number: number;
  family: OllFamily;
  aka?: string[];
  algs: string[];
}

export function buildOllCase(def: OllDef): AlgorithmCase {
  const state = caseStateFromAlgorithm(def.algs[0]);
  const ollPattern = ollPatternFromState(state);
  const edgeGroup = edgeGroupOf(ollPattern.top);
  const aka = def.aka ?? [def.family];
  return {
    id: `oll-${def.number}`,
    type: 'OLL',
    number: def.number,
    name: `OLL ${def.number}`,
    aka,
    category: edgeGroup,
    groupNameVi: `${FAMILY_VI[def.family]}`,
    ollPattern,
    algorithms: toVariants(`oll${def.number}`, def.algs),
    tags: [def.family.toLowerCase(), edgeGroup.toLowerCase(), `oll ${def.number}`, EDGE_GROUP_VI[edgeGroup].toLowerCase()],
  };
}

export interface PllDef {
  key: string; // 'Ua'
  number: number;
  aka: string[];
  category: string;
  groupNameVi: string;
  algs: string[];
}

export function buildPllCase(def: PllDef): AlgorithmCase {
  const state = caseStateFromAlgorithm(def.algs[0]);
  const pllPattern: PLLPattern = pllPatternFromState(state);
  return {
    id: `pll-${def.key.toLowerCase()}`,
    type: 'PLL',
    number: def.number,
    name: `PLL ${def.key}`,
    aka: def.aka,
    category: def.category,
    groupNameVi: def.groupNameVi,
    pllPattern,
    algorithms: toVariants(def.key.toLowerCase(), def.algs),
    tags: [def.category.toLowerCase(), def.key.toLowerCase(), `${def.key.toLowerCase()} perm`],
  };
}

/* ------------------------------ ZBLL ------------------------------ */

export const ZBLL_SETS = ['T', 'U', 'L', 'H', 'Pi', 'S', 'AS'] as const;

export const ZBLL_SET_VI: Record<string, string> = {
  T: 'T (Chameleon · OLL 24)',
  U: 'U (Headlights · OLL 23)',
  L: 'L (Bowtie · OLL 25)',
  H: 'H (OLL 21)',
  Pi: 'Pi (OLL 22)',
  S: 'S (Sune · OLL 27)',
  AS: 'AS (Anti-Sune · OLL 26)',
};

const ZBLL_CP_VI: Record<string, string> = {
  solved: 'góc đúng chỗ',
  diag: 'đổi 2 góc chéo',
  adj: 'đổi 2 góc kề',
};

export interface ZbllDefLike { set: string; n: number; sub: number; cp: string; algs: string[] }

export function buildZbllCase(def: ZbllDefLike): AlgorithmCase {
  const state = caseStateFromAlgorithm(def.algs[0]);
  const id = `zbll-${def.set.toLowerCase()}-${def.n}`;
  return {
    id,
    type: 'ZBLL',
    number: def.n,
    name: `ZBLL ${def.set}${def.n}`,
    aka: [`${def.set} · COLL ${def.sub}`, ZBLL_CP_VI[def.cp]],
    category: def.set,
    groupNameVi: `Nhóm ${def.set} · tập COLL ${def.sub} (${ZBLL_CP_VI[def.cp]})`,
    llPattern: llPatternFromState(state),
    algorithms: toVariants(id, def.algs, 'Công thức đề xuất'),
    tags: ['zbll', def.set.toLowerCase(), `${def.set.toLowerCase()}${def.n}`, `coll ${def.sub}`, ZBLL_CP_VI[def.cp]],
  };
}

/* ------------------------------ ZBLS ------------------------------ */

export const ZBLS_LOCS = ['both-u', 'corner-slot', 'edge-slot', 'both-slot'] as const;

export const ZBLS_LOC_VI: Record<string, string> = {
  'both-u': 'Góc & cạnh ở tầng trên',
  'corner-slot': 'Góc trong khe, cạnh ở trên',
  'edge-slot': 'Cạnh trong khe, góc ở trên',
  'both-slot': 'Cả cặp trong khe',
};

export interface ZblsDefLike { n: number; loc: string; f2l: number; algs: string[] }

export function buildZblsCase(def: ZblsDefLike): AlgorithmCase {
  const id = `zbls-${def.n}`;
  return {
    id,
    type: 'ZBLS',
    number: def.n,
    name: `ZBLS ${def.n}`,
    aka: [ZBLS_LOC_VI[def.loc]],
    category: def.loc,
    groupNameVi: `${ZBLS_LOC_VI[def.loc]} · thế cặp ${def.f2l}`,
    algorithms: toVariants(id, def.algs, 'Công thức đề xuất'),
    tags: ['zbls', 'zbf2l', def.loc, `thế cặp ${def.f2l}`],
  };
}
