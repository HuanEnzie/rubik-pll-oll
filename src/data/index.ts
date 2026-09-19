import { AlgorithmCase, CaseType } from '../types';
import { OLL_CASES } from './ollCases';
import { PLL_CASES } from './pllCases';

export { OLL_CASES } from './ollCases';
export { PLL_CASES } from './pllCases';

export const ALL_CASES: AlgorithmCase[] = [...OLL_CASES, ...PLL_CASES];

const CASES_BY_ID = new Map<string, AlgorithmCase>();
for (const c of ALL_CASES) {
  CASES_BY_ID.set(c.id, c);
}

export function getCaseById(id: string): AlgorithmCase | undefined {
  return CASES_BY_ID.get(id);
}

export function getOLLCases(): AlgorithmCase[] {
  return OLL_CASES;
}

export function getPLLCases(): AlgorithmCase[] {
  return PLL_CASES;
}

function normalizeSearchText(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .trim();
}

export function searchCases(query: string, type?: CaseType): AlgorithmCase[] {
  const rawQ = query.trim();
  if (!rawQ) {
    if (type === 'OLL') return OLL_CASES;
    if (type === 'PLL') return PLL_CASES;
    return ALL_CASES;
  }

  const normQ = normalizeSearchText(rawQ);
  const qTokens = normQ.split(/\s+/).filter(Boolean);

  let pool = ALL_CASES;
  if (type) {
    pool = pool.filter(c => c.type === type);
  }

  return pool.filter(c => {
    // Check direct ID or number
    if (c.number.toString() === rawQ) return true;
    if (c.id === rawQ.toLowerCase()) return true;

    // Check searchable string: name + aka + category + tags + groupNameVi + algorithms
    const combinedStr = [
      c.name,
      ...(c.aka || []),
      c.category,
      c.groupNameVi,
      ...c.tags,
      ...c.algorithms.map(a => a.notation),
    ].join(' ');

    const normCombined = normalizeSearchText(combinedStr);

    // All search tokens must appear in combined text
    return qTokens.every(token => normCombined.includes(token));
  });
}

/**
 * Architecture hook for future Camera Recognition:
 * Takes top-face and side-color sticker readings and maps them to an OLL/PLL case.
 */
export function identifyCaseFromVision(
  _topLayerStickers: string[],
  _targetType: CaseType = 'OLL'
): AlgorithmCase | null {
  // Prepared hook for Camera / OpenCV.js / ML module in future version
  return null;
}
