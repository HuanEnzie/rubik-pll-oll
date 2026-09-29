/**
 * Dựng AlgorithmCase từ định nghĩa gọn (số/tên + danh sách công thức).
 * Hình 2D (ollPattern / pllPattern) được TÍNH từ công thức đầu tiên (công thức chuẩn) bằng mô phỏng,
 * nên không bao giờ lệch với công thức.
 */
import { AlgorithmCase, AlgorithmVariant, PLLPattern } from '../types';
import { caseStateFromAlgorithm, edgeGroupOf, ollPatternFromState, pllPatternFromState } from './caseAnalysis';
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

function toVariants(prefix: string, algs: string[]): AlgorithmVariant[] {
  return algs.map((notation, i) => ({
    id: `${prefix}-${i + 1}`,
    notation,
    description: i === 0 ? `Công thức chuẩn · ${describeAlgorithm(notation)}` : `Biến thể · ${describeAlgorithm(notation)}`,
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
