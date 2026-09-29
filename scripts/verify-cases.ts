/**
 * Kiểm tra dữ liệu công thức trong app bằng MÔ PHỎNG (chạy: npm run verify).
 *  - mọi token hợp lệ; chạy công thức từ thế case thì khối giải xong hoàn toàn
 *  - giữ nguyên 2 tầng dưới; PLL còn giữ mặt vàng
 *  - mọi công thức của một case thuộc CÙNG case với công thức tham chiếu chuẩn (scripts/reference-algs.ts)
 *  - 57 OLL + 21 PLL đôi một khác nhau
 */
import { OLL_CASES } from '../src/data/ollCases';
import { PLL_CASES } from '../src/data/pllCases';
import { REF_OLL, REF_PLL } from './reference-algs';
import {
  caseStateFromAlgorithm, isF2LSolved, isFullySolved, ollClassKey, ollPatternFromState, pllClassKey,
} from '../src/utils/caseAnalysis';
import { applyAlgorithm, isValidMove, parseAlgorithmMoves } from '../src/utils/cubeState';

const errors: string[] = [];
const seenOll = new Map<string, number>();
const seenPll = new Map<string, string>();
let checked = 0;

for (const c of OLL_CASES) {
  const refKey = ollClassKey(ollPatternFromState(caseStateFromAlgorithm(REF_OLL[c.number])));
  if (seenOll.has(refKey)) errors.push(`OLL ${c.number} trùng OLL ${seenOll.get(refKey)}`);
  seenOll.set(refKey, c.number);
  for (const a of c.algorithms) {
    checked++;
    const where = `OLL ${c.number} "${a.notation}"`;
    if (!parseAlgorithmMoves(a.notation).every(isValidMove)) { errors.push(`${where}: token không hợp lệ`); continue; }
    const s = caseStateFromAlgorithm(a.notation);
    if (!isFullySolved(applyAlgorithm(s, a.notation))) errors.push(`${where}: chạy từ thế case không ra khối đã giải`);
    if (!isF2LSolved(s)) errors.push(`${where}: làm hỏng 2 tầng dưới`);
    else if (ollClassKey(ollPatternFromState(s)) !== refKey) errors.push(`${where}: là case OLL khác`);
  }
}
for (const c of PLL_CASES) {
  if (c.simulatable === false) continue;
  const name = c.name.replace('PLL ', '');
  const refState = caseStateFromAlgorithm(REF_PLL[name]);
  const refKey = pllClassKey(refState)!;
  if (seenPll.has(refKey)) errors.push(`PLL ${name} trùng PLL ${seenPll.get(refKey)}`);
  seenPll.set(refKey, name);
  for (const a of c.algorithms) {
    checked++;
    const where = `PLL ${name} "${a.notation}"`;
    if (!parseAlgorithmMoves(a.notation).every(isValidMove)) { errors.push(`${where}: token không hợp lệ`); continue; }
    const s = caseStateFromAlgorithm(a.notation);
    if (!isFullySolved(applyAlgorithm(s, a.notation))) errors.push(`${where}: chạy từ thế case không ra khối đã giải`);
    if (!isF2LSolved(s) || pllClassKey(s) !== refKey) errors.push(`${where}: không phải PLL ${name}`);
  }
}

console.log(`Đã kiểm ${checked} công thức / ${OLL_CASES.length} OLL + ${PLL_CASES.length} PLL.`);
if (errors.length) { console.log(errors.join('\n')); process.exit(1); }
console.log('Tất cả công thức ĐÚNG case và giữ nguyên 2 tầng dưới ✔');
