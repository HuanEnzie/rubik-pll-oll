/**
 * Kiểm tra công thức ZBLL / ZBLS bằng MÔ PHỎNG trên engine facelet của app (chạy: npm run verify).
 * Cố ý KHÔNG dùng code của bộ giải (scripts/lib) để đây là một phép kiểm độc lập.
 *
 * ZBLL: token hợp lệ; thế case giữ nguyên F2L, 4 cạnh tầng trên đã đúng hướng, chưa phải PLL;
 *       chạy công thức thì khối giải xong; mọi công thức của 1 case cùng case; 472 case đôi một khác nhau;
 *       nhóm (T/U/L/H/Pi/S/AS) đúng với hình OLL; mọi thế ZBLL ngẫu nhiên đều có trong bảng.
 * ZBLS: thế case chỉ lệch khe FR; sau công thức F2L xong + 4 cạnh đúng hướng, KỂ CẢ khi tầng trên bị xáo
 *       ngẫu nhiên trước; mọi công thức của 1 case cùng case; các case đôi một khác nhau;
 *       mọi thế "còn 1 khe" ngẫu nhiên đều có trong bảng.
 */
import { ZBLL_CASES } from '../src/data/zbllCases';
import { ZBLS_CASES } from '../src/data/zblsCases';
import { REF_OLL } from './reference-algs';
import {
  caseStateFromAlgorithm, isF2LExceptFRSolved, isF2LSolved, isFullySolved, llEdgesOriented, ollClassKey, ollPatternFromState,
} from '../src/utils/caseAnalysis';
import { CubeState, applyAlgorithm, invertAlgorithm, isValidMove, parseAlgorithmMoves } from '../src/utils/cubeState';
import { FACELET_POS } from '../src/utils/cubeGeometry';

const errors: string[] = [];
const FACES = ['U', 'D', 'F', 'B', 'L', 'R'] as const;
const AUF = ['', 'U', 'U2', "U'"];

/** Thế khối sau khi làm chuỗi `word` từ khối đã giải. */
const stateOfWord = (word: string) => caseStateFromAlgorithm(invertAlgorithm(word));

const serialize = (s: CubeState, mask?: (s: CubeState) => string[]) =>
  mask ? mask(s).join('') : FACES.map(f => s[f].flat().join('')).join('');

/** Khoá case của thế `solved · word`, bất biến với AUF trước và sau. */
function keyOfWord(word: string, mask?: (s: CubeState) => string[]): string {
  let best = '';
  for (const a of AUF) for (const b of AUF) {
    const k = serialize(stateOfWord(`${a} ${word} ${b}`), mask);
    if (best === '' || k < best) best = k;
  }
  return best;
}
const keyOfAlg = (alg: string, mask?: (s: CubeState) => string[]) => keyOfWord(invertAlgorithm(alg), mask);

// sticker theo từng viên (cubie)
const CUBIES: { face: (typeof FACES)[number]; r: number; c: number }[][] = (() => {
  const m = new Map<string, { face: (typeof FACES)[number]; r: number; c: number }[]>();
  for (const face of FACES) for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
    const k = FACELET_POS[face](r, c).pos.join(',');
    if (!m.has(k)) m.set(k, []);
    m.get(k)!.push({ face, r, c });
  }
  return [...m.values()];
})();
const ORDER = FACES.flatMap(face => [0, 1, 2].flatMap(r => [0, 1, 2].map(c => `${face}${r}${c}`)));

/** ZBLS chỉ quan tâm cặp FR + hướng cạnh tầng trên: góc có sticker vàng -> '*', cạnh có vàng -> 'Y'/'e'. */
function zblsMask(s: CubeState): string[] {
  const out = new Map<string, string>();
  for (const cubie of CUBIES) {
    const hasYellow = cubie.some(st => s[st.face][st.r][st.c] === 0);
    for (const st of cubie) {
      const v = s[st.face][st.r][st.c];
      out.set(`${st.face}${st.r}${st.c}`, !hasYellow ? String(v) : cubie.length === 3 ? '*' : cubie.length === 2 ? (v === 0 ? 'Y' : 'e') : String(v));
    }
  }
  return ORDER.map(k => out.get(k)!);
}

const validTokens = (alg: string) => parseAlgorithmMoves(alg).every(isValidMove);
const allYellowTop = (s: CubeState) => s.U.every(row => row.every(v => v === 0));

// Từ điển các công thức tầng cuối "đã biết" để xáo ngẫu nhiên (giữ F2L, giữ hướng cạnh)
const LL_WORDS = [
  "R U R' U R U2 R'", "R U2 R' U' R U' R'", "R U R' U' R' F R2 U' R' U' R U R' F'",
  "M2 U M U2 M' U M2", "R U R' F' R U R' U' R' F R2 U' R'", "F R U' R' U' R U R' F' R U R' U' R' F R F'",
  "R2 U R' U R' U' R U' R2 U' D R' U R D'", "U", "U2", "U'",
];
const rand = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
const randomWord = (words: string[], n: number) => Array.from({ length: n }, () => rand(words)).join(' ');

/* ------------------------------- ZBLL ------------------------------- */

const SET_OLL: Record<string, number> = { H: 21, Pi: 22, U: 23, T: 24, L: 25, AS: 26, S: 27 };
const SET_SIZE: Record<string, number> = { T: 72, U: 72, L: 72, H: 40, Pi: 72, S: 72, AS: 72 };
const ollRefKey: Record<string, string> = {};
for (const [set, n] of Object.entries(SET_OLL)) ollRefKey[set] = ollClassKey(ollPatternFromState(caseStateFromAlgorithm(REF_OLL[n])));

let checked = 0;
const zbllKeys = new Map<string, string>();
const perSet: Record<string, number> = {};
for (const c of ZBLL_CASES) {
  perSet[c.category] = (perSet[c.category] || 0) + 1;
  let caseKey = '';
  for (const a of c.algorithms) {
    checked++;
    const where = `${c.name} "${a.notation}"`;
    if (!validTokens(a.notation)) { errors.push(`${where}: token không hợp lệ`); continue; }
    const s = caseStateFromAlgorithm(a.notation);
    if (!isFullySolved(applyAlgorithm(s, a.notation))) errors.push(`${where}: chạy từ thế case không ra khối đã giải`);
    if (!isF2LSolved(s)) errors.push(`${where}: làm hỏng 2 tầng dưới`);
    if (!llEdgesOriented(s)) errors.push(`${where}: thế case có cạnh chưa định hướng (không phải ZBLL)`);
    if (allYellowTop(s)) errors.push(`${where}: thế case là PLL, không phải ZBLL`);
    if (ollClassKey(ollPatternFromState(s)) !== ollRefKey[c.category]) errors.push(`${where}: không thuộc nhóm ${c.category}`);
    const k = keyOfAlg(a.notation);
    if (!caseKey) caseKey = k;
    else if (k !== caseKey) errors.push(`${where}: khác case với công thức đầu của ${c.name}`);
  }
  if (zbllKeys.has(caseKey)) errors.push(`${c.name} trùng ${zbllKeys.get(caseKey)}`);
  zbllKeys.set(caseKey, c.name);
}
if (ZBLL_CASES.length !== 472) errors.push(`ZBLL có ${ZBLL_CASES.length} case, cần 472`);
for (const [set, n] of Object.entries(SET_SIZE)) if (perSet[set] !== n) errors.push(`ZBLL nhóm ${set}: ${perSet[set]} case, cần ${n}`);

// Độ phủ: thế ZBLL ngẫu nhiên phải có trong bảng
let zbllHit = 0;
for (let i = 0; i < 400; i++) {
  const w = randomWord(LL_WORDS, 8);
  const s = stateOfWord(w);
  if (allYellowTop(s)) continue;
  zbllHit++;
  if (!zbllKeys.has(keyOfWord(w))) errors.push(`ZBLL thiếu case của thế "${w}"`);
}

/* ------------------------------- ZBLS ------------------------------- */

const zblsKeys = new Map<string, string>();
for (const c of ZBLS_CASES) {
  let caseKey = '';
  for (const a of c.algorithms) {
    checked++;
    const where = `${c.name} "${a.notation}"`;
    if (!validTokens(a.notation)) { errors.push(`${where}: token không hợp lệ`); continue; }
    const s = caseStateFromAlgorithm(a.notation);
    if (!isF2LExceptFRSolved(s)) errors.push(`${where}: thế case làm hỏng phần F2L ngoài khe FR`);
    if (isF2LSolved(s) && llEdgesOriented(s)) errors.push(`${where}: thế case đã xong sẵn`);
    const after = applyAlgorithm(s, a.notation);
    if (!isF2LSolved(after) || !llEdgesOriented(after)) errors.push(`${where}: không vào xong khe + định hướng cạnh`);
    // tầng trên bị xáo tuỳ ý (giữ hướng cạnh) thì công thức vẫn phải đúng
    for (let t = 0; t < 3; t++) {
      const scrambled = stateOfWord(`${randomWord(LL_WORDS, 4)} ${invertAlgorithm(a.notation)}`);
      const done = applyAlgorithm(scrambled, a.notation);
      if (!isF2LSolved(done) || !llEdgesOriented(done)) { errors.push(`${where}: sai khi tầng trên khác đi`); break; }
    }
    const k = keyOfAlg(a.notation, zblsMask);
    if (!caseKey) caseKey = k;
    else if (k !== caseKey) errors.push(`${where}: khác case với công thức đầu của ${c.name}`);
  }
  if (zblsKeys.has(caseKey)) errors.push(`${c.name} trùng ${zblsKeys.get(caseKey)}`);
  zblsKeys.set(caseKey, c.name);
}

// Độ phủ: mọi thế "còn khe FR" ngẫu nhiên phải có trong bảng (trừ thế đã xong)
const SLOT_WORDS = ["R U R'", "R U' R'", "R U2 R'", "F' U F", "F' U' F", "F' U2 F", "F R U R' U' F'", "U", "U2", "U'"];
const goalKey = keyOfWord('', zblsMask);
const hitZbls = new Set<string>();
let zblsSamples = 0;
for (let i = 0; i < 1500; i++) {
  const w = randomWord(SLOT_WORDS, 7);
  const s = stateOfWord(w);
  if (!isF2LExceptFRSolved(s)) continue;
  const k = keyOfWord(w, zblsMask);
  if (k === goalKey) continue;
  zblsSamples++;
  if (!zblsKeys.has(k)) errors.push(`ZBLS thiếu case của thế "${w}"`);
  else hitZbls.add(k);
}

console.log(`Đã kiểm ${checked} công thức / ${ZBLL_CASES.length} ZBLL + ${ZBLS_CASES.length} ZBLS.`);
console.log(`Độ phủ: ${zbllHit} thế ZBLL ngẫu nhiên, ${zblsSamples} thế ZBLS ngẫu nhiên (trúng ${hitZbls.size}/${ZBLS_CASES.length} case ZBLS).`);
if (errors.length) { console.log(errors.slice(0, 50).join('\n')); console.log(`... tổng ${errors.length} lỗi`); process.exit(1); }
console.log('Tất cả công thức ZBLL/ZBLS ĐÚNG case ✔');
