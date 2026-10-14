/**
 * Bộ giải IDA* trong nhóm nước <R, U, F> (góc DBL và 3 cạnh DL/DB/BL không bao giờ bị động tới).
 * Dùng để SINH công thức ZBLL / ZBLS; mọi kết quả sau đó đều được kiểm lại bằng engine facelet của app.
 *
 * Mô hình cubie được suy ra trực tiếp từ engine facelet (src/utils/cubeState.ts) + toạ độ sticker
 * (src/utils/cubeGeometry.ts), nên không có quy ước nào nhập tay có thể lệch với app.
 *
 * Toạ độ tìm kiếm: hoán vị 7 góc (7! = 5040) × hướng góc (3^6 = 729),
 *                  hoán vị 9 cạnh (9! = 362880) × hướng cạnh (2^8 = 256).
 * Heuristic = max(khoảng cách phần góc, khoảng cách phần cạnh) tới TẬP đích (BFS chính xác).
 */
import { applyMove, CubeState, FaceIndex } from '../../src/utils/cubeState';
import { FACELET_POS, FaceLetter } from '../../src/utils/cubeGeometry';

const FACES: FaceLetter[] = ['U', 'D', 'F', 'B', 'L', 'R'];
type Vec = [number, number, number];

/* ---------------------------- facelet <-> cubie ---------------------------- */

export interface Facelet { face: FaceLetter; r: number; c: number; pos: Vec; nor: Vec }
export const FACELETS: Facelet[] = [];
for (const face of FACES) for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
  const { pos, nor } = FACELET_POS[face](r, c);
  FACELETS.push({ face, r, c, pos, nor });
}
const fIdx = (face: FaceLetter, r: number, c: number) => FACES.indexOf(face) * 9 + r * 3 + c;

/** Hoán vị facelet của một nước: sau nước đi, ô p chứa sticker trước đó ở ô perm[p]. */
function faceletPerm(move: string): number[] {
  const cube = {} as CubeState;
  for (const face of FACES) {
    cube[face] = [0, 1, 2].map(r => [0, 1, 2].map(c => fIdx(face, r, c) as FaceIndex));
  }
  const out = applyMove(cube, move);
  const perm: number[] = [];
  for (const face of FACES) for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) perm[fIdx(face, r, c)] = out[face][r][c];
  return perm;
}

const keyOf = (p: Vec) => p.join(',');
const cubieFacelets = new Map<string, number[]>();
FACELETS.forEach((f, i) => {
  const k = keyOf(f.pos);
  if (!cubieFacelets.has(k)) cubieFacelets.set(k, []);
  cubieFacelets.get(k)!.push(i);
});

const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: Vec, b: Vec): Vec => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

/** Sắp facelet của một cubie: [facelet tham chiếu, ...] theo cùng một chiều xoay cho mọi góc. */
function orderedFacelets(ids: number[]): number[] {
  const isUD = (i: number) => FACELETS[i].nor[1] !== 0;
  const isFB = (i: number) => FACELETS[i].nor[2] !== 0;
  const ref = ids.find(isUD) ?? ids.find(isFB)!;
  const rest = ids.filter(i => i !== ref);
  if (rest.length === 2) {
    const [a, b] = rest;
    const t = dot(FACELETS[ref].nor, cross(FACELETS[a].nor, FACELETS[b].nor));
    return t > 0 ? [ref, a, b] : [ref, b, a];
  }
  return [ref, ...rest];
}

const name = (ids: number[]) => ids.map(i => FACELETS[i].face).join('');

// Các vị trí (slot) mà <R,U,F> làm động tới
const CORNER_NAMES = ['UFR', 'UFL', 'UBL', 'UBR', 'DFR', 'DFL', 'DBR'];
const EDGE_NAMES = ['UF', 'UL', 'UB', 'UR', 'FR', 'FL', 'BR', 'DF', 'DR'];

function findCubie(n: string): number[] {
  for (const ids of cubieFacelets.values()) {
    const faces = ids.map(i => FACELETS[i].face).sort().join('');
    if (faces === n.split('').sort().join('')) return orderedFacelets(ids);
  }
  throw new Error('cubie ' + n);
}
export const CORNERS = CORNER_NAMES.map(findCubie);
export const EDGES = EDGE_NAMES.map(findCubie);
export { CORNER_NAMES, EDGE_NAMES };

const NC = 7, NE = 9;

/** Trạng thái cubie: cp[slot] = viên ở slot, co[slot] = độ xoắn; tương tự cho cạnh. */
export interface Cubies { cp: number[]; co: number[]; ep: number[]; eo: number[] }

/** Mảng facelet (54 phần tử, giá trị = id sticker gốc) -> cubie. */
export function decode(fl: number[]): Cubies {
  const cp: number[] = [], co: number[] = [], ep: number[] = [], eo: number[] = [];
  const pieceOf = (groups: number[][], sticker: number) => {
    for (let p = 0; p < groups.length; p++) {
      const k = groups[p].indexOf(sticker);
      if (k >= 0) return [p, k];
    }
    throw new Error('sticker ngoài nhóm <R,U,F>');
  };
  CORNERS.forEach((slot, s) => {
    const [p] = pieceOf(CORNERS, fl[slot[0]]);
    // độ xoắn = sticker tham chiếu của viên đang nằm ở vị trí thứ mấy của slot
    const k = slot.findIndex(pos => fl[pos] === CORNERS[p][0]);
    cp[s] = p; co[s] = k;
  });
  EDGES.forEach((slot, s) => {
    const [p] = pieceOf(EDGES, fl[slot[0]]);
    const k = slot.findIndex(pos => fl[pos] === EDGES[p][0]);
    ep[s] = p; eo[s] = k;
  });
  return { cp, co, ep, eo };
}

/** Cubie -> mảng facelet (các sticker ngoài nhóm giữ nguyên). */
export function encode(cb: Cubies): number[] {
  const fl = FACELETS.map((_, i) => i);
  CORNERS.forEach((slot, s) => {
    const piece = CORNERS[cb.cp[s]];
    for (let j = 0; j < 3; j++) fl[slot[(j + cb.co[s]) % 3]] = piece[j];
  });
  EDGES.forEach((slot, s) => {
    const piece = EDGES[cb.ep[s]];
    for (let j = 0; j < 2; j++) fl[slot[(j + cb.eo[s]) % 2]] = piece[j];
  });
  return fl;
}

export function faceletsToCube(fl: number[]): CubeState {
  const cube = {} as CubeState;
  for (const face of FACES) {
    cube[face] = [0, 1, 2].map(r => [0, 1, 2].map(c => FACES.indexOf(FACELETS[fl[fIdx(face, r, c)]].face) as FaceIndex));
  }
  return cube;
}

export function applyFaceletMove(fl: number[], perm: number[]): number[] {
  return perm.map(src => fl[src]);
}

/* ------------------------------ toạ độ ------------------------------ */

const FACT = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880];

function rankPerm(p: number[]): number {
  const n = p.length;
  let r = 0;
  for (let i = 0; i < n; i++) {
    let smaller = 0;
    for (let j = i + 1; j < n; j++) if (p[j] < p[i]) smaller++;
    r += smaller * FACT[n - 1 - i];
  }
  return r;
}
function unrankPerm(r: number, n: number): number[] {
  const avail = Array.from({ length: n }, (_, i) => i);
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const f = FACT[n - 1 - i];
    const k = Math.floor(r / f);
    r %= f;
    out.push(avail.splice(k, 1)[0]);
  }
  return out;
}
function rankOri(o: number[], base: number): number {
  let r = 0;
  for (let i = 0; i < o.length - 1; i++) r = r * base + o[i];
  return r;
}
function unrankOri(r: number, n: number, base: number): number[] {
  const o = new Array(n).fill(0);
  let sum = 0;
  for (let i = n - 2; i >= 0; i--) { o[i] = r % base; r = Math.floor(r / base); sum += o[i]; }
  o[n - 1] = (base - (sum % base)) % base;
  return o;
}

export const N_CP = FACT[NC], N_CO = 3 ** (NC - 1), N_EP = FACT[NE], N_EO = 2 ** (NE - 1);

export interface Coord { cp: number; co: number; ep: number; eo: number }
export const toCoord = (c: Cubies): Coord => ({ cp: rankPerm(c.cp), co: rankOri(c.co, 3), ep: rankPerm(c.ep), eo: rankOri(c.eo, 2) });
export const fromCoord = (k: Coord): Cubies => ({
  cp: unrankPerm(k.cp, NC), co: unrankOri(k.co, NC, 3), ep: unrankPerm(k.ep, NE), eo: unrankOri(k.eo, NE, 2),
});

/* ---------------------------- bảng nước đi ---------------------------- */

export const MOVES = ['R', 'R2', "R'", 'U', 'U2', "U'", 'F', 'F2', "F'"];
export const MOVE_FACE = MOVES.map(m => m[0]);
const NM = MOVES.length;
const PERMS = MOVES.map(faceletPerm);

/** Tác động của một nước lên cubie (suy từ facelet): slot s nhận viên từ src[s], cộng thêm độ xoắn d[s]. */
function cubieMove(perm: number[]) {
  const id = decode(FACELETS.map((_, i) => i));
  const after = decode(applyFaceletMove(FACELETS.map((_, i) => i), perm));
  void id;
  return after; // vì trạng thái đầu là đã giải: after.cp[s] = slot nguồn, after.co[s] = độ xoắn thêm vào
}
const CM = PERMS.map(cubieMove);

function applyCubieMove(c: Cubies, m: number): Cubies {
  const t = CM[m];
  const cp: number[] = [], co: number[] = [], ep: number[] = [], eo: number[] = [];
  for (let s = 0; s < NC; s++) { cp[s] = c.cp[t.cp[s]]; co[s] = (c.co[t.cp[s]] + t.co[s]) % 3; }
  for (let s = 0; s < NE; s++) { ep[s] = c.ep[t.ep[s]]; eo[s] = (c.eo[t.ep[s]] + t.eo[s]) % 2; }
  return { cp, co, ep, eo };
}

function buildTable(n: number, apply: (x: number, m: number) => number): Int32Array {
  const t = new Int32Array(n * NM);
  for (let x = 0; x < n; x++) for (let m = 0; m < NM; m++) t[x * NM + m] = apply(x, m);
  return t;
}

const ZERO7 = new Array(NC).fill(0), ID7 = [...Array(NC).keys()];
const ZERO9 = new Array(NE).fill(0), ID9 = [...Array(NE).keys()];

export const T_CP = buildTable(N_CP, (x, m) => rankPerm(applyCubieMove({ cp: unrankPerm(x, NC), co: ZERO7, ep: ID9, eo: ZERO9 }, m).cp));
export const T_CO = buildTable(N_CO, (x, m) => rankOri(applyCubieMove({ cp: ID7, co: unrankOri(x, NC, 3), ep: ID9, eo: ZERO9 }, m).co, 3));
export const T_EP = buildTable(N_EP, (x, m) => rankPerm(applyCubieMove({ cp: ID7, co: ZERO7, ep: unrankPerm(x, NE), eo: ZERO9 }, m).ep));
export const T_EO = buildTable(N_EO, (x, m) => rankOri(applyCubieMove({ cp: ID7, co: ZERO7, ep: ID9, eo: unrankOri(x, NE, 2) }, m).eo, 2));

/** Kiểm tra chéo: bảng toạ độ khớp với engine facelet trên chuỗi ngẫu nhiên. */
export function selfTest(trials = 200) {
  for (let t = 0; t < trials; t++) {
    let fl = FACELETS.map((_, i) => i);
    let k = toCoord(decode(fl));
    for (let i = 0; i < 25; i++) {
      const m = Math.floor(Math.random() * NM);
      fl = applyFaceletMove(fl, PERMS[m]);
      k = { cp: T_CP[k.cp * NM + m], co: T_CO[k.co * NM + m], ep: T_EP[k.ep * NM + m], eo: T_EO[k.eo * NM + m] };
    }
    const real = toCoord(decode(fl));
    if (real.cp !== k.cp || real.co !== k.co || real.ep !== k.ep || real.eo !== k.eo) throw new Error('selfTest lệch');
    const back = encode(fromCoord(real));
    if (back.some((v, i) => v !== fl[i])) throw new Error('encode/decode lệch');
  }
}

/* --------------------------- bảng cắt tỉa (BFS) --------------------------- */

function bfs(n: number, nOri: number, tPerm: Int32Array, tOri: Int32Array, seeds: number[]): Uint8Array {
  const dist = new Uint8Array(n * nOri).fill(255);
  for (const s of seeds) dist[s] = 0;
  let depth = 0, filled = seeds.length;
  const total = n * nOri;
  while (filled < total) {
    let added = 0;
    for (let x = 0; x < total; x++) {
      if (dist[x] !== depth) continue;
      const p = (x / nOri) | 0, o = x - p * nOri;
      for (let m = 0; m < NM; m++) {
        const y = tPerm[p * NM + m] * nOri + tOri[o * NM + m];
        if (dist[y] === 255) { dist[y] = depth + 1; added++; }
      }
    }
    if (!added) break;
    filled += added;
    depth++;
  }
  return dist;
}

export interface Goal {
  /** các toạ độ (góc, cạnh) của TẬP đích */
  corner: Set<number>;
  edge: Set<number>;
  /** đích là tích (góc, cạnh) độc lập hay chỉ các cặp cụ thể */
  pairs?: Set<string>;
}

export interface Pruning { goal: Goal; pc: Uint8Array; pe: Uint8Array }

export function buildPruning(goal: Goal): Pruning {
  const pc = bfs(N_CP, N_CO, T_CP, T_CO, [...goal.corner]);
  const pe = bfs(N_EP, N_EO, T_EP, T_EO, [...goal.edge]);
  return { goal, pc, pe };
}

/* --------------------------------- IDA* --------------------------------- */

export interface SearchOptions {
  maxSolutions?: number;
  /** cấm nước đầu tiên thuộc mặt này (vd. 'U' vì hướng nhìn đã được thử riêng) */
  forbidFirstFace?: string;
  /** cấm nước cuối cùng thuộc mặt này */
  forbidLastFace?: string;
  /** chỉ dùng các nước này (chỉ số trong MOVES); mặc định cả 9 */
  allowed?: number[];
  /** giới hạn số nút duyệt (tránh treo); hết ngân sách thì trả về những gì đã có */
  nodeBudget?: number;
}

/** Độ dài lời giải ngắn nhất (giới hạn maxDepth); -1 nếu không tìm thấy. */
export function optimalLength(pr: Pruning, start: Coord, maxDepth: number, opts: SearchOptions = {}): number {
  for (let d = 0; d <= maxDepth; d++) {
    if (search(pr, start, d, { ...opts, maxSolutions: 1 }).length) return d;
  }
  return -1;
}

/** Mọi lời giải có độ dài ĐÚNG bằng depth. */
export function search(pr: Pruning, start: Coord, depth: number, opts: SearchOptions = {}): number[][] {
  const out: number[][] = [];
  const max = opts.maxSolutions ?? Infinity;
  const path: number[] = [];
  const { pc, pe, goal } = pr;
  const isGoal = (cp: number, co: number, ep: number, eo: number) => {
    const c = cp * N_CO + co, e = ep * N_EO + eo;
    if (!goal.corner.has(c) || !goal.edge.has(e)) return false;
    return !goal.pairs || goal.pairs.has(c + ':' + e);
  };
  const allowed = opts.allowed ?? [...Array(NM).keys()];
  let budget = opts.nodeBudget ?? Infinity;
  const rec = (cp: number, co: number, ep: number, eo: number, left: number, lastFace: string) => {
    if (out.length >= max || --budget < 0) return;
    const h = Math.max(pc[cp * N_CO + co], pe[ep * N_EO + eo]);
    if (h > left) return;
    if (left === 0) {
      if (isGoal(cp, co, ep, eo)) out.push([...path]);
      return;
    }
    for (const m of allowed) {
      const f = MOVE_FACE[m];
      if (f === lastFace) continue;
      if (path.length === 0 && f === opts.forbidFirstFace) continue;
      if (left === 1 && f === opts.forbidLastFace) continue;
      path.push(m);
      rec(T_CP[cp * NM + m], T_CO[co * NM + m], T_EP[ep * NM + m], T_EO[eo * NM + m], left - 1, f);
      path.pop();
      if (out.length >= max) return;
    }
  };
  rec(start.cp, start.co, start.ep, start.eo, depth, '');
  return out;
}

export const movesToString = (ms: number[]) => ms.map(m => MOVES[m]).join(' ');

/** Áp chuỗi nước lên toạ độ. */
export function applyMovesCoord(k: Coord, ms: number[]): Coord {
  let { cp, co, ep, eo } = k;
  for (const m of ms) { cp = T_CP[cp * NM + m]; co = T_CO[co * NM + m]; ep = T_EP[ep * NM + m]; eo = T_EO[eo * NM + m]; }
  return { cp, co, ep, eo };
}

export const SOLVED: Coord = toCoord(decode(FACELETS.map((_, i) => i)));
export const moveIndex = (m: string) => MOVES.indexOf(m);
export const cornerKey = (k: Coord) => k.cp * N_CO + k.co;
export const edgeKey = (k: Coord) => k.ep * N_EO + k.eo;
export { fIdx, PERMS, applyCubieMove };
