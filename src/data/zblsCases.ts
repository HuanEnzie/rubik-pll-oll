/**
 * ZBLS (ZBF2L) — ghép cặp F2L cuối vào khe FR đồng thời định hướng 4 cạnh tầng trên (để vào thẳng ZBLL).
 * Công thức nằm ở zblsAlgs.ts (sinh bởi scripts/gen-zbls.ts). Chạy `npm run verify` sau khi sửa.
 */
import { AlgorithmCase } from '../types';
import { buildZblsCase } from '../utils/caseBuilder';
import { ZBLS_DEFS } from './zblsAlgs';

export const ZBLS_CASES: AlgorithmCase[] = ZBLS_DEFS.map(buildZblsCase);
