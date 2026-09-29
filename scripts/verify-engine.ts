/**
 * Kiểm tra engine facelet (src/utils/cubeState.ts) với một mô hình HÌNH HỌC độc lập:
 * 54 sticker có toạ độ 3D, mỗi nước đi là phép quay ma trận thật.
 * Nếu engine và mô hình hình học ra cùng kết quả cho mọi nước đi + chuỗi ngẫu nhiên => engine đúng.
 */
import { createSolvedCube, applyMove, CubeState, FaceIndex } from '../src/utils/cubeState';
import { FACELET_POS, MOVE_GEOMETRY, faceletKey } from '../src/utils/cubeGeometry';

type Vec = [number, number, number];
interface Sticker { pos: Vec; nor: Vec; color: FaceIndex }

const FACES = ['U', 'D', 'F', 'B', 'L', 'R'] as const;
const FACE_IDX: Record<string, FaceIndex> = { U: 0, D: 1, F: 2, B: 3, L: 4, R: 5 };

function initial(): Sticker[] {
  const out: Sticker[] = [];
  for (const f of FACES) {
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      const { pos, nor } = FACELET_POS[f](r, c);
      out.push({ pos: [...pos] as Vec, nor: [...nor] as Vec, color: FACE_IDX[f] });
    }
  }
  return out;
}

// Quay quanh trục (theo quy tắc bàn tay phải) góc quarter * 90°
function rot(v: Vec, axis: 0 | 1 | 2, quarter: number): Vec {
  let [x, y, z] = v;
  const q = ((quarter % 4) + 4) % 4;
  for (let i = 0; i < q; i++) {
    if (axis === 0) [y, z] = [-z, y];
    else if (axis === 1) [x, z] = [z, -x];
    else [x, y] = [-y, x];
  }
  return [x, y, z];
}

// axis, layers, quarters (quarter dương = +90° bàn tay phải quanh trục +)
const BASE: Record<string, { axis: 0 | 1 | 2; layers: number[]; q: number }> = {
  R: { axis: 0, layers: [1], q: -1 }, L: { axis: 0, layers: [-1], q: 1 }, M: { axis: 0, layers: [0], q: 1 },
  U: { axis: 1, layers: [1], q: -1 }, D: { axis: 1, layers: [-1], q: 1 }, E: { axis: 1, layers: [0], q: 1 },
  F: { axis: 2, layers: [1], q: -1 }, B: { axis: 2, layers: [-1], q: 1 }, S: { axis: 2, layers: [0], q: -1 },
  r: { axis: 0, layers: [0, 1], q: -1 }, l: { axis: 0, layers: [-1, 0], q: 1 },
  u: { axis: 1, layers: [0, 1], q: -1 }, d: { axis: 1, layers: [-1, 0], q: 1 },
  f: { axis: 2, layers: [0, 1], q: -1 }, b: { axis: 2, layers: [-1, 0], q: 1 },
  x: { axis: 0, layers: [-1, 0, 1], q: -1 }, y: { axis: 1, layers: [-1, 0, 1], q: -1 }, z: { axis: 2, layers: [-1, 0, 1], q: -1 },
};

function geoMove(st: Sticker[], move: string): Sticker[] {
  const base = move[0];
  const def = BASE[base];
  const mod = move.slice(1);
  const times = mod.includes('2') ? 2 : 1;
  const dir = mod.includes("'") ? -1 : 1;
  const quarter = def.q * dir * times;
  return st.map(s => {
    if (!def.layers.includes(s.pos[def.axis])) return s;
    return { ...s, pos: rot(s.pos, def.axis, quarter), nor: rot(s.nor, def.axis, quarter) };
  });
}

function geoToState(st: Sticker[]): CubeState {
  const cube = createSolvedCube();
  const map = new Map<string, FaceIndex>();
  for (const s of st) map.set(`${s.pos.join(',')}|${s.nor.join(',')}`, s.color);
  for (const f of FACES) {
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      const { pos, nor } = FACELET_POS[f](r, c);
      const col = map.get(`${pos.join(',')}|${nor.join(',')}`);
      if (col === undefined) throw new Error('missing sticker ' + faceletKey(f, r, c));
      cube[f][r][c] = col;
    }
  }
  return cube;
}

const eq = (a: CubeState, b: CubeState) => FACES.every(f => JSON.stringify(a[f]) === JSON.stringify(b[f]));

const MOVES = Object.keys(BASE);
if (JSON.stringify(BASE) !== JSON.stringify(MOVE_GEOMETRY)) {
  console.log('MOVE_GEOMETRY (dùng cho animation 3D) khác bảng kiểm tra độc lập');
  process.exit(1);
}
let bad = 0;

for (const m of MOVES) {
  for (const suffix of ['', "'", '2']) {
    const mv = m + suffix;
    const a = applyMove(createSolvedCube(), mv);
    const b = geoToState(geoMove(initial(), mv));
    if (!eq(a, b)) { bad++; console.log('MISMATCH single move', mv); }
  }
}

// Chuỗi ngẫu nhiên
let seed = 12345;
const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
for (let t = 0; t < 300; t++) {
  let a = createSolvedCube();
  let g = initial();
  const seq: string[] = [];
  for (let i = 0; i < 25; i++) {
    const mv = MOVES[Math.floor(rnd() * MOVES.length)] + ['', "'", '2'][Math.floor(rnd() * 3)];
    seq.push(mv);
    a = applyMove(a, mv);
    g = geoMove(g, mv);
  }
  if (!eq(a, geoToState(g))) { bad++; console.log('MISMATCH sequence', seq.join(' ')); if (bad > 5) break; }
}

console.log(bad === 0 ? 'ENGINE OK: engine khớp mô hình hình học ✔' : `ENGINE có ${bad} lỗi ✘`);
process.exit(bad === 0 ? 0 : 1);
