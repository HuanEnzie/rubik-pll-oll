/**
 * ZBLL — 472 case, chia 7 nhóm theo hướng góc (T, U, L, H, Pi, S, AS) và 40 tập con COLL.
 * Công thức nằm ở zbllAlgs.ts (sinh bởi scripts/gen-zbll.ts). Chạy `npm run verify` sau khi sửa.
 */
import { AlgorithmCase } from '../types';
import { buildZbllCase } from '../utils/caseBuilder';
import { ZBLL_DEFS } from './zbllAlgs';

export const ZBLL_CASES: AlgorithmCase[] = ZBLL_DEFS.map(buildZbllCase);
