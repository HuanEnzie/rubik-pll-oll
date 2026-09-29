/**
 * Phân tích một công thức -> thế bài (case) mà nó giải, rồi rút ra hình 2D / phân loại.
 * Toàn bộ hình ảnh OLL/PLL được SUY RA từ công thức bằng mô phỏng, nên hình và công thức không thể lệch nhau.
 */
import { OLLPattern, PLLPattern } from '../types';
import {
  CubeState,
  FaceIndex,
  applyAlgorithm,
  createSolvedCube,
  invertAlgorithm,
  netRotationIsIdentity,
} from './cubeState';

/**
 * Thế bài mà công thức `alg` giải: bắt đầu từ khối đã giải, chạy công thức ngược.
 * Nếu công thức có xoay cả khối (x/y/z) không triệt tiêu, các tâm sẽ lệch chỗ; khi đó ta đổi nhãn màu
 * để tâm về đúng vị trí chuẩn (tương đương với việc người chơi cầm khối theo hướng chuẩn lúc bắt đầu).
 */
export function caseStateFromAlgorithm(alg: string): CubeState {
  const raw = applyAlgorithm(createSolvedCube(), invertAlgorithm(alg));
  const faces = ['U', 'D', 'F', 'B', 'L', 'R'] as const;
  const relabel: number[] = [];
  faces.forEach((f, i) => {
    relabel[raw[f][1][1]] = i;
  });
  const out = createSolvedCube();
  for (const f of faces) {
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) out[f][r][c] = relabel[raw[f][r][c]] as FaceIndex;
  }
  return out;
}

/** Hai tầng dưới (F2L) còn nguyên: mặt D trắng, các hàng 1-2 của 4 mặt bên đúng màu tâm. */
export function isF2LSolved(s: CubeState): boolean {
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) if (s.D[r][c] !== s.D[1][1]) return false;
  for (const f of ['F', 'B', 'L', 'R'] as const) {
    for (const r of [1, 2]) for (let c = 0; c < 3; c++) if (s[f][r][c] !== s[f][1][1]) return false;
  }
  return true;
}

export function isFullySolved(s: CubeState): boolean {
  return (['U', 'D', 'F', 'B', 'L', 'R'] as const).every(f =>
    s[f].every(row => row.every(v => v === s[f][1][1]))
  );
}

export { netRotationIsIdentity };

/* ------------------------------ OLL ------------------------------ */

export function ollPatternFromState(s: CubeState): OLLPattern {
  const y = (v: number) => v === 0;
  return {
    top: s.U.map(row => row.map(y)),
    sides: {
      N: [y(s.B[0][2]), y(s.B[0][1]), y(s.B[0][0])],
      E: [y(s.R[0][2]), y(s.R[0][1]), y(s.R[0][0])],
      S: [y(s.F[0][0]), y(s.F[0][1]), y(s.F[0][2])],
      W: [y(s.L[0][0]), y(s.L[0][1]), y(s.L[0][2])],
    },
  };
}

/** Vòng 12 sticker bên + 8 sticker trên theo chiều kim đồng hồ để so sánh case bất kể hướng nhìn. */
function ollRing(p: OLLPattern): string[] {
  const t = p.top;
  const b = (v: boolean) => (v ? '1' : '0');
  // 4 hướng: mỗi hướng gồm [góc trái của cạnh, cạnh giữa, góc phải] của top + 3 sticker bên
  const dirs = [
    { top: [t[0][0], t[0][1], t[0][2]], side: p.sides.N },
    { top: [t[0][2], t[1][2], t[2][2]], side: p.sides.E },
    { top: [t[2][2], t[2][1], t[2][0]], side: [...p.sides.S].reverse() },
    { top: [t[2][0], t[1][0], t[0][0]], side: [...p.sides.W].reverse() },
  ];
  return dirs.map(d => d.top.map(b).join('') + d.side.map(b).join(''));
}

/** Chữ ký case OLL, không phụ thuộc xoay quanh trục U (đã gồm cả AUF trước công thức). */
export function ollClassKey(p: OLLPattern): string {
  const ring = ollRing(p);
  let best = '';
  for (let k = 0; k < 4; k++) {
    const key = [...ring.slice(k), ...ring.slice(0, k)].join('|');
    if (best === '' || key < best) best = key;
  }
  return best;
}

export type EdgeGroup = 'Dot' | 'Line' | 'L' | 'Cross';

/** Nhóm theo số cạnh vàng đã hướng lên: 0 = Dot, 2 đối = Line, 2 kề = L, 4 = Cross. */
export function edgeGroupOf(top: boolean[][]): EdgeGroup {
  const n = top[0][1], e = top[1][2], s = top[2][1], w = top[1][0];
  const count = [n, e, s, w].filter(Boolean).length;
  if (count === 4) return 'Cross';
  if (count === 0) return 'Dot';
  if (count === 2) return (n && s) || (e && w) ? 'Line' : 'L';
  return 'L'; // không xảy ra với OLL hợp lệ (số cạnh lật luôn chẵn)
}

/* ------------------------------ PLL ------------------------------ */

// 8 ô của tầng trên theo chiều kim đồng hồ khi nhìn từ trên xuống
// slot: 0 UBL, 1 UB, 2 UBR, 3 UR, 4 UFR, 5 UF, 6 UFL, 7 UL
export const SLOT_GRID: [number, number][] = [
  [0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [2, 0], [1, 0],
];

function slotColors(s: CubeState): number[][] {
  return [
    [s.L[0][0], s.B[0][2]], // UBL
    [s.B[0][1]], // UB
    [s.B[0][0], s.R[0][2]], // UBR
    [s.R[0][1]], // UR
    [s.R[0][0], s.F[0][2]], // UFR
    [s.F[0][1]], // UF
    [s.F[0][0], s.L[0][2]], // UFL
    [s.L[0][1]], // UL
  ];
}

// màu mặt: F=2, B=3, L=4, R=5. Tìm ô "nhà" của một viên theo tập màu bên.
function homeSlot(cols: number[]): number {
  const has = (...c: number[]) => c.every(x => cols.includes(x));
  if (cols.length === 1) return ({ 3: 1, 5: 3, 2: 5, 4: 7 } as Record<number, number>)[cols[0]];
  if (has(3, 5)) return 2;
  if (has(2, 5)) return 4;
  if (has(2, 4)) return 6;
  if (has(3, 4)) return 0;
  return -1;
}

/** p[slot] = ô nhà của viên đang nằm ở `slot`. Trả null nếu tầng trên chưa phải PLL thuần (còn lệch orient). */
export function pllPermutation(s: CubeState): number[] | null {
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) if (s.U[r][c] !== 0) return null;
  const p = slotColors(s).map(homeSlot);
  return p.includes(-1) ? null : p;
}

/** Chữ ký case PLL, bất biến với AUF trước/sau và xoay góc nhìn quanh trục U. */
export function pllClassKey(s: CubeState): string | null {
  const p = pllPermutation(s);
  if (!p) return null;
  let best = '';
  for (let a = 0; a < 4; a++) {
    for (let b = 0; b < 4; b++) {
      const q = p.map((_, slot) => (p[(slot - 2 * a + 8) % 8] + 2 * b) % 8);
      const key = q.join('');
      if (best === '' || key < best) best = key;
    }
  }
  return best;
}

export function pllPatternFromState(s: CubeState): PLLPattern {
  const sideColors = {
    N: [s.B[0][2], s.B[0][1], s.B[0][0]] as [number, number, number],
    E: [s.R[0][2], s.R[0][1], s.R[0][0]] as [number, number, number],
    S: [s.F[0][0], s.F[0][1], s.F[0][2]] as [number, number, number],
    W: [s.L[0][0], s.L[0][1], s.L[0][2]] as [number, number, number],
  };
  const p = pllPermutation(s);
  const arrows: NonNullable<PLLPattern['arrows']> = [];
  if (p) {
    const done = new Set<number>();
    for (let slot = 0; slot < 8; slot++) {
      const home = p[slot];
      if (home === slot || done.has(slot)) continue;
      if (p[home] === slot) {
        arrows.push({ from: SLOT_GRID[slot], to: SLOT_GRID[home], twoWay: true });
        done.add(slot);
        done.add(home);
      } else {
        arrows.push({ from: SLOT_GRID[slot], to: SLOT_GRID[home] });
        done.add(slot);
      }
    }
  }
  return { sideColors, arrows };
}
