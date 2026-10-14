/**
 * Liệt kê trạng thái tầng cuối / ô F2L cuối + khoá phân loại case (bất biến với AUF trước/sau).
 * Dùng chung cho script sinh công thức và script kiểm tra.
 */
import { FACELETS, PERMS, MOVES, applyFaceletMove } from './rufSolver';

export type FL = number[];
const ID: FL = FACELETS.map((_, i) => i);
const U1 = PERMS[MOVES.indexOf('U')];

/** fl của U^k (từ khối đã giải). */
export const UK: FL[] = [ID];
for (let k = 1; k < 4; k++) UK.push(applyFaceletMove(UK[k - 1], U1));

/** Hợp hai trạng thái: làm A rồi làm B. */
export const compose = (a: FL, b: FL): FL => b.map(x => a[x]);

/** Khoá case: nhỏ nhất trên mọi U^a · S · U^b, sau khi `mask` đổi các sticker không quan trọng thành -1. */
export function classKey(s: FL, mask: (fl: FL) => (number | string)[] = x => x): string {
  let best = '';
  for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) {
    const k = mask(compose(compose(UK[a], s), UK[b])).join(',');
    if (best === '' || k < best) best = k;
  }
  return best;
}
