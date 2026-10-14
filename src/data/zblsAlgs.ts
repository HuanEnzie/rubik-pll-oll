/**
 * ZBLS (ZBF2L) — ô F2L cuối ở FR + định hướng cạnh tầng trên. FILE SINH TỰ ĐỘNG bởi scripts/gen-zbls.ts — đừng sửa tay.
 * Công thức do bộ giải <R,U,F> tìm (ngắn nhất tới +2 nước, chấm điểm dễ bấm), đã kiểm bằng mô phỏng.
 * loc = vị trí cặp: both-u (cả góc và cạnh ở tầng trên) | corner-slot (góc trong khe) | edge-slot (cạnh trong khe) | both-slot;
 * f2l = số thứ tự thế F2L (bỏ qua hướng cạnh tầng trên) trong nhóm loc.
 */
export interface ZblsDef { n: number; loc: 'both-u' | 'corner-slot' | 'edge-slot' | 'both-slot'; f2l: number; algs: string[] }

export const ZBLS_DEFS: ZblsDef[] = [
  { n: 1, loc: "both-u", f2l: 1, algs: [
    "R U' R'",
    "R U2 R'",
  ] },
  { n: 2, loc: "both-u", f2l: 1, algs: [
    "R' F R F'",
    "F' U' F R U' R'",
  ] },
  { n: 3, loc: "both-u", f2l: 1, algs: [
    "F R' F' R2 U2 R'",
    "F R' F' R U' R U' R'",
    "R U' R2 F' U' F U R",
  ] },
  { n: 4, loc: "both-u", f2l: 1, algs: [
    "F' U2 F R U' R'",
    "F' U F U' R U2 R'",
    "F' U F U2 R U' R'",
  ] },
  { n: 5, loc: "both-u", f2l: 1, algs: [
    "F' U F R U' R'",
    "F' U' F R U2 R'",
    "R' F R F2 U F",
  ] },
  { n: 6, loc: "both-u", f2l: 1, algs: [
    "R' F R2 U R' U' F'",
    "R U' R' U' R' F R F'",
    "R U' R2 U' F' U F R",
  ] },
  { n: 7, loc: "both-u", f2l: 1, algs: [
    "R U R' U2 R' F R F'",
    "R U2 R2 U' F' U F R",
    "R' U' F U R2 U' R' F'",
  ] },
  { n: 8, loc: "both-u", f2l: 1, algs: [
    "F' U2 F R U' R2 F R F'",
    "R' F R F' U2 R' F R F'",
    "F' U F U F R' F' R2 U2 R'",
  ] },
  { n: 9, loc: "both-u", f2l: 2, algs: [
    "F' U F",
    "F' U2 F",
  ] },
  { n: 10, loc: "both-u", f2l: 2, algs: [
    "F R' F' R",
    "R U R' F' U F",
  ] },
  { n: 11, loc: "both-u", f2l: 2, algs: [
    "F R' F' R2 U' R'",
    "R U R' F' U2 F",
    "R U' R' F' U F",
  ] },
  { n: 12, loc: "both-u", f2l: 2, algs: [
    "R U2 R' F' U F",
    "F U R' U' F' U R",
    "R U' R' U F' U2 F",
  ] },
  { n: 13, loc: "both-u", f2l: 2, algs: [
    "R' F R F2 U2 F",
    "F U R U' R' F2 U F",
    "F' U F2 R U R' U' F'",
  ] },
  { n: 14, loc: "both-u", f2l: 2, algs: [
    "F R' F2 U' F U R",
    "F R U R' U' F2 U' F",
    "F' U F2 U R U' R' F'",
  ] },
  { n: 15, loc: "both-u", f2l: 2, algs: [
    "F U R' U' F2 U F R",
    "F' U2 F2 U R U' R' F'",
    "F' U' F U2 F R' F' R",
  ] },
  { n: 16, loc: "both-u", f2l: 2, algs: [
    "R U2 R' F' U F2 R' F' R",
    "F R' F' R U2 F R' F' R",
    "R U' R' U' R' F R F2 U2 F",
  ] },
  { n: 17, loc: "both-u", f2l: 3, algs: [
    "R U R'",
  ] },
  { n: 18, loc: "both-u", f2l: 3, algs: [
    "F U R U' R2 F' R",
    "R U2 R2 F R F2 U F",
    "R U' R' F R' F' R2 U2 R'",
  ] },
  { n: 19, loc: "both-u", f2l: 3, algs: [
    "F' U2 F U R U' R'",
    "F' U2 F U2 R U2 R'",
    "R U R2 U' F' U F R",
  ] },
  { n: 20, loc: "both-u", f2l: 3, algs: [
    "R U R2 F' U' F U R",
    "R U R' U F R U R' U' F'",
    "R U R' U' F R U R' U' F'",
  ] },
  { n: 21, loc: "both-u", f2l: 3, algs: [
    "R U' R' U2 R' F R F'",
    "F' U R U R' U' R' F R",
    "R' U' F U R U' F2 U2 F",
  ] },
  { n: 22, loc: "both-u", f2l: 3, algs: [
    "R U2 R' U' R' F R F'",
    "F' U2 F R' F R F'",
    "R U R' F R U R' U' F'",
  ] },
  { n: 23, loc: "both-u", f2l: 3, algs: [
    "F U R U' R' F' R U2 R'",
    "R U' R2 F R F' R U2 R'",
    "R U2 R' F R' F' R2 U R'",
  ] },
  { n: 24, loc: "both-u", f2l: 3, algs: [
    "F U R U' R2 F2 U' F U R",
    "F' U' F2 U R' U' F' U R2 U R'",
    "F' U2 F R' U' F U R2 U' R' F'",
  ] },
  { n: 25, loc: "both-u", f2l: 4, algs: [
    "R U R' U R U' R'",
    "R U R' U2 R U2 R'",
    "R U' R' U2 R U R'",
  ] },
  { n: 26, loc: "both-u", f2l: 4, algs: [
    "R U R2 F R F'",
    "F U R U' R' F2 U2 F",
  ] },
  { n: 27, loc: "both-u", f2l: 4, algs: [
    "F' U' F R U R'",
    "R' F R F' U' R U2 R'",
  ] },
  { n: 28, loc: "both-u", f2l: 4, algs: [
    "F R U R2 U' F' U R",
    "R F R2 U R2 U' R2 F' R'",
    "R U2 R' F' U2 F R U2 R'",
  ] },
  { n: 29, loc: "both-u", f2l: 4, algs: [
    "R U R2 U' F U R U' F'",
    "F R U R' U' F' U' R U2 R'",
    "R U R' U F' U2 F R U' R'",
  ] },
  { n: 30, loc: "both-u", f2l: 4, algs: [
    "F R U R2 U' F2 U F R",
    "F' U F R U2 R' U R U' R'",
    "R U R' U' F' U F R U R'",
  ] },
  { n: 31, loc: "both-u", f2l: 4, algs: [
    "R' F R F2 U' F R U2 R'",
    "F R U R' U' F2 U' F R U2 R'",
    "F' U F2 R U R' U' F' R U R'",
  ] },
  { n: 32, loc: "both-u", f2l: 4, algs: [
    "R U R' F' U2 F U R U R'",
    "R U R' U F' U F R U' R'",
    "R U R' U' F' U' F R U2 R'",
  ] },
  { n: 33, loc: "both-u", f2l: 5, algs: [
    "F' U' F",
  ] },
  { n: 34, loc: "both-u", f2l: 5, algs: [
    "R U2 R' U' F' U F",
    "R U2 R' U2 F' U2 F",
    "F' U' F2 U R U' R' F'",
  ] },
  { n: 35, loc: "both-u", f2l: 5, algs: [
    "R U2 R' F R' F' R",
    "F' U2 F U F R' F' R",
    "R U' R' F' U' F2 R' F' R",
  ] },
  { n: 36, loc: "both-u", f2l: 5, algs: [
    "R' U' F' U F2 R F'",
    "F' U2 F2 R' F' R2 U' R'",
    "F' U2 F R U' R' F' U F",
  ] },
  { n: 37, loc: "both-u", f2l: 5, algs: [
    "F' U' F2 R U R' U' F'",
    "F R' F2 R' U2 R F R' U2 R2",
    "R U2 R' U2 R' F R F2 U2 F",
  ] },
  { n: 38, loc: "both-u", f2l: 5, algs: [
    "F U R' U' F' U R2 U2 R'",
    "R' F R U R U' R2 F' R",
    "F' U F U2 F R' F' R",
  ] },
  { n: 39, loc: "both-u", f2l: 5, algs: [
    "F' U2 F R U2 R' F' U F",
    "R' U' F' U F R F' U2 F",
    "F U R' U' F2 U F R2 U' R'",
  ] },
  { n: 40, loc: "both-u", f2l: 5, algs: [
    "R' U' F' U F2 R2 U R' U' F'",
    "R U R2 U' F U R U' F2 U' F",
    "R U' R2 F R F2 U' F R U R'",
  ] },
  { n: 41, loc: "both-u", f2l: 6, algs: [
    "R U2 R' U R U' R'",
    "R U2 R' U2 R U2 R'",
    "R U' R U R' U R U2 R2",
  ] },
  { n: 42, loc: "both-u", f2l: 6, algs: [
    "R U2 R2 F R F'",
  ] },
  { n: 43, loc: "both-u", f2l: 6, algs: [
    "F' U F2 R' F' R2 U R'",
    "F' U2 F2 R' F' R U R U R'",
  ] },
  { n: 44, loc: "both-u", f2l: 6, algs: [
    "F R U R' U' F' R U R'",
    "R U R' F' U' F R U R'",
    "R U2 R2 F R2 U R' U' F'",
  ] },
  { n: 45, loc: "both-u", f2l: 6, algs: [
    "R U2 R2 U' F U R U' F'",
    "R2 U2 F R2 F' U2 R' U' R'",
    "F' U F R U2 R' U2 R U R'",
  ] },
  { n: 46, loc: "both-u", f2l: 6, algs: [
    "R U' R' F' U2 F R U2 R'",
    "F' U' F R' U2 R2 U R2 U R",
    "R U2 R' U F' U2 F R U2 R'",
  ] },
  { n: 47, loc: "both-u", f2l: 6, algs: [
    "F R' F' R2 U2 R' U2 R U R'",
    "R U2 R' F' U2 F U R U R'",
    "R U2 R' U F' U F R U' R'",
  ] },
  { n: 48, loc: "both-u", f2l: 6, algs: [
    "R U' R' U' F' U' F R U R'",
    "R U2 R2 U' F U R2 U' R' F'",
    "F U2 F' U' R' F R U' F'",
  ] },
  { n: 49, loc: "both-u", f2l: 7, algs: [
    "R U R' U' R U2 R'",
    "R U R' U2 R U' R'",
    "R2 U R U R' U' R' U' R2",
  ] },
  { n: 50, loc: "both-u", f2l: 7, algs: [
    "R2 U2 F R' F' U2 R2",
  ] },
  { n: 51, loc: "both-u", f2l: 7, algs: [
    "R U R' U R' F R F'",
    "R U2 R2 F R F' R U R'",
    "F U R U' R' F' U' R U R'",
  ] },
  { n: 52, loc: "both-u", f2l: 7, algs: [
    "F R U R' U' F2 U F",
    "F U F' R' F R U' F'",
    "R' U2 R2 U F R2 F' R2 U R",
  ] },
  { n: 53, loc: "both-u", f2l: 7, algs: [
    "F R U R' U' F' R U2 R'",
    "R U R' F' U' F R U2 R'",
    "R F R U R2 U' R F' U2 R'",
  ] },
  { n: 54, loc: "both-u", f2l: 7, algs: [
    "R U' R U2 F R F' U2 R2",
    "F' U F R U' R' U' R U R'",
    "F' U2 F R U2 R' U' R U R'",
  ] },
  { n: 55, loc: "both-u", f2l: 7, algs: [
    "R' F R F' U2 F' U' F",
    "F' U F R U2 R' U' R U2 R'",
    "R U F R2 U R' U' R2 F' R'",
  ] },
  { n: 56, loc: "both-u", f2l: 7, algs: [
    "R' F R F2 U' F U R U R'",
    "F' U F U R U' R2 F R F'",
    "R' F' U' F2 U R U' F' R U2 R'",
  ] },
  { n: 57, loc: "both-u", f2l: 8, algs: [
    "R U R' U R U R'",
    "R U' R' U' R U R'",
    "R' U' R U' R U R2 U R",
  ] },
  { n: 58, loc: "both-u", f2l: 8, algs: [
    "F' U F U' R U R'",
    "F' U' F U2 R U R'",
    "R U R2 F R F' R U R'",
  ] },
  { n: 59, loc: "both-u", f2l: 8, algs: [
    "F R' F' R U' R U2 R'",
    "R U' R' F' U F R U R'",
    "F R U' R' U' R U R2 F' R",
  ] },
  { n: 60, loc: "both-u", f2l: 8, algs: [
    "R F R U R' U' F' U2 R'",
    "R U R' F' U' F U R U R'",
    "R' U' R' F R F' U R2 U R'",
  ] },
  { n: 61, loc: "both-u", f2l: 8, algs: [
    "R' F R F2 U F R U R'",
    "F' U F R2 U2 R' U' R U' R2",
    "R U' R' F U R U' R2 F' R",
  ] },
  { n: 62, loc: "both-u", f2l: 8, algs: [
    "F R' F2 U' F U R2 U R'",
    "F' U F2 U R U' R2 F' R",
    "F R' F R2 F U2 F' R2 F2 R",
  ] },
  { n: 63, loc: "both-u", f2l: 8, algs: [
    "R F R2 U R2 U' R2 F' U2 R'",
    "R U2 R2 U' F' U F R2 U R'",
    "R2 U R' U2 R F R' F' U R2",
  ] },
  { n: 64, loc: "both-u", f2l: 8, algs: [
    "R U2 R' U' F R' F' R2 U R'",
    "F' R' U' R F U' R' U2 R2 U R'",
    "F' U' F U' R' U2 R2 U R2 U R",
  ] },
  { n: 65, loc: "both-u", f2l: 9, algs: [
    "R' U2 R2 U R2 U R",
    "R U R U R2 U R2 U2 R2",
    "R U2 R U R2 U R2 U2 R2",
  ] },
  { n: 66, loc: "both-u", f2l: 9, algs: [
    "F' U2 F U' R U R'",
  ] },
  { n: 67, loc: "both-u", f2l: 9, algs: [
    "R U2 F U R U' R' F' R'",
    "R' U2 R2 U R2 U F R F'",
    "R2 U2 F R' F' U2 R' U' R'",
  ] },
  { n: 68, loc: "both-u", f2l: 9, algs: [
    "R' U2 R2 U R2 F' U F R",
    "F' U2 F2 U R U' R2 F' R",
    "F U R' U2 R2 U R2 U F' R",
  ] },
  { n: 69, loc: "both-u", f2l: 9, algs: [
    "R2 U2 R F R F' R2 U2 R2",
    "R U' R' U F' U F R U R'",
    "R' U2 R2 U R F R F' U R",
  ] },
  { n: 70, loc: "both-u", f2l: 9, algs: [
    "F R' F' R2 U R' U' R U2 R'",
    "R U2 R' U F' U F R U R'",
    "R U R U2 R F R F' R2 U2 R2",
  ] },
  { n: 71, loc: "both-u", f2l: 9, algs: [
    "R U' R' F' U2 F U' R U R'",
    "R U2 R' U2 F R' F' R2 U R'",
    "F' U F U R U' R' U' R U R'",
  ] },
  { n: 72, loc: "both-u", f2l: 9, algs: [
    "F' U F2 R' F' R U' R U2 R'",
    "F' U F U' R U2 R2 F R F'",
    "F' U' F U2 F R' F' R2 U R'",
  ] },
  { n: 73, loc: "both-u", f2l: 10, algs: [
    "R U R' F' U' F",
  ] },
  { n: 74, loc: "both-u", f2l: 10, algs: [
    "F' U' F2 R' F' R",
    "R' U' F' U F R2 U2 R'",
  ] },
  { n: 75, loc: "both-u", f2l: 10, algs: [
    "F' U F U2 F' U' F",
    "F' U' F U' F' U F",
    "F' U' F U2 F' U2 F",
  ] },
  { n: 76, loc: "both-u", f2l: 10, algs: [
    "R' F' U' F2 U R U' F'",
    "F' U2 F R U2 R' F' U2 F",
    "F' U' R U R' U' R' F2 R F'",
  ] },
  { n: 77, loc: "both-u", f2l: 10, algs: [
    "R U2 R' F' U2 F R U R'",
    "R2 U2 R2 F R F' R U2 R2",
    "R' F' U' F2 U R2 U' R' F'",
  ] },
  { n: 78, loc: "both-u", f2l: 10, algs: [
    "F' R' U' R F2 R' F' U R",
    "F' U' F2 U R' U' F' U R",
    "R U' R' F' U2 F2 R' F' R",
  ] },
  { n: 79, loc: "both-u", f2l: 10, algs: [
    "F R' F' R2 U R' F' U2 F",
    "R U2 R2 F R F2 U2 F R U' R'",
    "F R' F' R U2 F R' F' R2 U' R'",
  ] },
  { n: 80, loc: "both-u", f2l: 10, algs: [
    "F R' F2 R U2 R U2 R' U2 F",
    "R U2 R' U' R' F R F2 U' F",
    "R' U' F' U F2 R F' R U2 R'",
  ] },
  { n: 81, loc: "both-u", f2l: 11, algs: [
    "R U2 R' U' R U2 R'",
    "R U2 R' U2 R U' R'",
    "R U2 R2 U2 R2 U R2 U R",
  ] },
  { n: 82, loc: "both-u", f2l: 11, algs: [
    "R U2 R' U R' F R F'",
    "R U R' U F' U2 F R U2 R'",
    "R U2 R' U2 F' U' F R U' R'",
  ] },
  { n: 83, loc: "both-u", f2l: 11, algs: [
    "R F U R U' R' F' R'",
    "R' U' R2 F R' F' R2 U R",
    "R U R' U R U' R2 F R F'",
  ] },
  { n: 84, loc: "both-u", f2l: 11, algs: [
    "R U' R U2 F R' F' U2 R2",
    "R U2 R2 F' U' F U R2 U R'",
    "R2 U R' U F R' F' R2 U2 R2",
  ] },
  { n: 85, loc: "both-u", f2l: 11, algs: [
    "R F R2 U R' U' R2 F' R'",
    "R U2 R' F' U' F R U2 R'",
    "R F R' F' U2 R U2 R U2 R2",
  ] },
  { n: 86, loc: "both-u", f2l: 11, algs: [
    "F U R U' R' F' U R U' R'",
    "R U2 R' U2 F' U2 F R U' R'",
    "F R' F' U2 R2 U R2 U R2 U R'",
  ] },
  { n: 87, loc: "both-u", f2l: 11, algs: [
    "R U' F R' F' U R U R U' R2",
    "R U' R' U F' U' F U R U R'",
    "R U2 F R' F' U' R U R U' R2",
  ] },
  { n: 88, loc: "both-u", f2l: 11, algs: [
    "F' U' F U R U2 R2 F R F'",
    "F R' F' R U2 R U' R2 F R F'",
    "F' U' F2 R U' R' U2 R U R2 F' R",
  ] },
  { n: 89, loc: "both-u", f2l: 12, algs: [
    "F R' F' R U2 R U R'",
    "R U R' F' U F U R U R'",
  ] },
  { n: 90, loc: "both-u", f2l: 12, algs: [
    "R' F' U' F U R2 U' R'",
    "R' U' R F R' F' U R",
    "R U R' F' U' F U R U' R'",
  ] },
  { n: 91, loc: "both-u", f2l: 12, algs: [
    "F' U' F U F' U2 F",
    "F' U' F U2 F' U F",
    "F' R' U' R U' R' U2 R F",
  ] },
  { n: 92, loc: "both-u", f2l: 12, algs: [
    "F2 U2 R' F R U2 F2",
  ] },
  { n: 93, loc: "both-u", f2l: 12, algs: [
    "R' U' R F R2 F' R U R",
    "R F R' U R2 U' R' F' U R'",
    "R U' F U R U' R' F' U R'",
  ] },
  { n: 94, loc: "both-u", f2l: 12, algs: [
    "F' U' F U' F R' F' R",
    "R' U' R F R' F2 U F R",
    "F' U2 F2 R' F' R F' U' F",
  ] },
  { n: 95, loc: "both-u", f2l: 12, algs: [
    "F' U' F R U R' F' U2 F",
    "R' F' U' F U R F' U2 F",
    "F R U R' U' F' U F' U2 F",
  ] },
  { n: 96, loc: "both-u", f2l: 12, algs: [
    "R U' R' U' F' U F2 R' F' R",
    "F R' F' R2 U R' U' F' U' F",
    "R U2 R2 F R F2 U2 F R U2 R'",
  ] },
  { n: 97, loc: "both-u", f2l: 13, algs: [
    "R U' R' U R U R'",
    "R2 U R' U R U2 R2",
    "R U R U R' U R U2 R2",
  ] },
  { n: 98, loc: "both-u", f2l: 13, algs: [
    "R' U' F' U F R2 U R'",
    "F' U' F2 R' F' R2 U R'",
    "R U' F R2 U R' U' R2 F' R'",
  ] },
  { n: 99, loc: "both-u", f2l: 13, algs: [
    "R U2 R U2 F R' F' U2 R2",
    "R' F R2 U R2 U' F2 U F R",
    "F' U' F U R2 U R' U R U2 R2",
  ] },
  { n: 100, loc: "both-u", f2l: 13, algs: [
    "R' F R2 U R' U' R' F' R",
    "F' U F R U' R' U R U R'",
    "F' U' F R U2 R' U2 R U R'",
  ] },
  { n: 101, loc: "both-u", f2l: 13, algs: [
    "R2 U R2 U' R' F R2 F' U R'",
    "F U R' F' R2 F U' F' R'",
    "R U R' U F' U2 F U2 R U R'",
  ] },
  { n: 102, loc: "both-u", f2l: 13, algs: [
    "F R' F' R' U R' U R U2 R2",
    "F U R U' R' F' U R U R'",
    "R U R' U' F' U' F U R U R'",
  ] },
  { n: 103, loc: "both-u", f2l: 13, algs: [
    "F' U' F R2 U R' U R U2 R2",
    "R U R' U R U2 R2 F R F'",
    "R U2 R' F' U' F U2 R U R'",
  ] },
  { n: 104, loc: "both-u", f2l: 13, algs: [
    "F U R' U' F2 U F R2 U R'",
    "F' U2 F U2 R U2 R2 F R F'",
    "R' U' R F R' F2 U F R2 U R'",
  ] },
  { n: 105, loc: "both-u", f2l: 14, algs: [
    "R2 U2 R' U' R U' R2",
    "R U R U2 R' U' R U' R2",
    "R' U' R U' R' U2 R2 U' R'",
  ] },
  { n: 106, loc: "both-u", f2l: 14, algs: [
    "F R' F' R U R U R'",
    "R U R' F' U F R U R'",
    "R F R' U R2 U' R' F' U2 R'",
  ] },
  { n: 107, loc: "both-u", f2l: 14, algs: [
    "F U R' U' F' U R2 U' R'",
    "R' U' R2 F R2 F' R2 U R",
    "R U R' U F R' F' R2 U R'",
  ] },
  { n: 108, loc: "both-u", f2l: 14, algs: [
    "F R' F' R' U2 R' U' R U' R2",
    "F' U2 F R U2 R2 F R F'",
    "F R' F' U2 R U R' U R2 U R'",
  ] },
  { n: 109, loc: "both-u", f2l: 14, algs: [
    "F' U2 F R U2 R' U R U' R'",
    "R U' R' U' R U' R2 F R F'",
    "R2 U2 R' F R' F' U' R2 U' R2",
  ] },
  { n: 110, loc: "both-u", f2l: 14, algs: [
    "F' U' F R2 U2 R' U' R U' R2",
    "F' U2 F R U2 R' U' R U2 R'",
    "R U2 R' U' R U' R2 F R F'",
  ] },
  { n: 111, loc: "both-u", f2l: 14, algs: [
    "F' R' U' R F R' U R2 U R'",
    "R F R2 U R' U' R2 F' U2 R'",
    "R' U' F' U F R F' U F",
  ] },
  { n: 112, loc: "both-u", f2l: 14, algs: [
    "F' U F2 R U R2 U' F' U R",
    "F' U' F U' R U' R2 F R F'",
    "F' U F2 U R' U' F' U R2 U' R'",
  ] },
  { n: 113, loc: "both-u", f2l: 15, algs: [
    "R U2 R' U' R U R'",
    "R' U2 R2 U R2 U R2 U R'",
  ] },
  { n: 114, loc: "both-u", f2l: 15, algs: [
    "R2 U2 F R F' U2 R2",
  ] },
  { n: 115, loc: "both-u", f2l: 15, algs: [
    "R U R U2 F R F' U2 R2",
    "R U R' U2 F' U F R U R'",
    "R U' R' U2 R U2 R2 F R F'",
  ] },
  { n: 116, loc: "both-u", f2l: 15, algs: [
    "R2 U R2 F R F2 U F R'",
    "F' U F R U R' U' R U R'",
    "F' U2 F R U R' U' R U R'",
  ] },
  { n: 117, loc: "both-u", f2l: 15, algs: [
    "R U2 R' U' F' U' F R U R'",
    "F U R U2 R' U' R U R2 F' R",
    "R U2 R' U2 F' U2 F U R U' R'",
  ] },
  { n: 118, loc: "both-u", f2l: 15, algs: [
    "F' U2 F R U R' U' R U2 R'",
    "R2 U R' U R F R' F' U2 R2",
    "F' R' U2 R F U' R' U' R2 U2 R'",
  ] },
  { n: 119, loc: "both-u", f2l: 15, algs: [
    "F' U F U R U2 R' U' R U R'",
    "F' U' F U R U' R' U R U' R'",
    "F' U2 F U' R U2 R' U' R U R'",
  ] },
  { n: 120, loc: "both-u", f2l: 15, algs: [
    "F R' F' R' U2 F R F' U2 R2",
    "F' U2 F U' F R' F' R2 U R'",
    "R U' R' F' U F2 R' F' R2 U R'",
  ] },
  { n: 121, loc: "both-u", f2l: 16, algs: [
    "F' U2 F2 R' F' R",
  ] },
  { n: 122, loc: "both-u", f2l: 16, algs: [
    "F' U2 F U' F' U F",
    "F' U2 F U2 F' U2 F",
    "F' R' U2 R U F R' U R",
  ] },
  { n: 123, loc: "both-u", f2l: 16, algs: [
    "R U' R2 F R F2 U' F",
    "R U2 R2 F R F' U' F' U' F",
  ] },
  { n: 124, loc: "both-u", f2l: 16, algs: [
    "R U' R2 F R F' R U' R'",
    "R' U2 R U F R' F' U R",
    "R U' R' U R U' R' F' U' F",
  ] },
  { n: 125, loc: "both-u", f2l: 16, algs: [
    "F' U2 F2 U R' U' F' U R",
    "R U R' U F' U2 F R U R'",
    "R U R' U2 F' U F R U2 R'",
  ] },
  { n: 126, loc: "both-u", f2l: 16, algs: [
    "F R' F' R2 U R' U2 R U R'",
    "R U R' U' R U R' F' U' F",
    "R U R' U2 R U' R' F' U2 F",
  ] },
  { n: 127, loc: "both-u", f2l: 16, algs: [
    "F' U' F R U R' F' U' F",
    "R' F' U' F U R F' U' F",
    "F' U2 F2 R' F2 U' F U R",
  ] },
  { n: 128, loc: "both-u", f2l: 16, algs: [
    "R' F2 R U' F U R' F2 R",
    "R U R2 F' U' F2 U R U' F'",
    "F' U2 F R U2 R' U' F' U' F",
  ] },
  { n: 129, loc: "both-u", f2l: 17, algs: [
    "R U' R U2 R2 U' R2 U' R2",
    "R' U2 R' U R' U' R U2 R",
    "R2 U2 R U' R' U R' U2 R2",
  ] },
  { n: 130, loc: "both-u", f2l: 17, algs: [
    "F' U F U2 R U R'",
    "R' F R F' U R U R'",
    "R F R' F' R U2 R U2 R2",
  ] },
  { n: 131, loc: "both-u", f2l: 17, algs: [
    "F' R' F' U' F U R F",
    "F' U2 F R U R' U R U R'",
    "R U R' U2 F' U2 F R U2 R'",
  ] },
  { n: 132, loc: "both-u", f2l: 17, algs: [
    "R U2 R' U F' U' F R U R'",
    "R U2 R2 F R F' U' R U2 R'",
    "R U' R U2 R2 U2 R' F R2 F' R'",
  ] },
  { n: 133, loc: "both-u", f2l: 17, algs: [
    "F R U' R' U2 R U R2 F' R",
    "R U R' U2 R U' R2 F R F'",
    "R U' R' U2 F' U F U R U' R'",
  ] },
  { n: 134, loc: "both-u", f2l: 17, algs: [
    "R U' F R' F' R U2 R U2 R2",
    "R U' R2 F R F' U R U R'",
    "R U2 F R2 U R2 U' R2 F' R'",
  ] },
  { n: 135, loc: "both-u", f2l: 17, algs: [
    "R U' F R U R' U' F' U R'",
    "R U2 R' U R U R2 F R F'",
    "R' U' F' U F R F' U' F",
  ] },
  { n: 136, loc: "both-u", f2l: 17, algs: [
    "R' F R F2 U2 F U R U' R'",
    "R U2 R2 F R F2 U' F R U2 R'",
    "F' U F2 U R U' R' F' U R U' R'",
  ] },
  { n: 137, loc: "both-u", f2l: 18, algs: [
    "R U R' U2 F' U' F",
    "R U' R' U F' U' F",
    "R2 U2 F R F' U2 R' U R'",
  ] },
  { n: 138, loc: "both-u", f2l: 18, algs: [
    "F' U F U F' U' F",
    "F' U' F U' F' U' F",
    "F' U' R' U' R F R' U R",
  ] },
  { n: 139, loc: "both-u", f2l: 18, algs: [
    "F R U R' U' F' R U' R'",
    "R U2 F R U R' U' F' U' R'",
    "R2 U R2 U F R' F' R' U2 R2",
  ] },
  { n: 140, loc: "both-u", f2l: 18, algs: [
    "R' F R F' U F' U2 F",
    "F' U F R U' R' F' U' F",
    "F' U' F R U' R' U' F' U F",
  ] },
  { n: 141, loc: "both-u", f2l: 18, algs: [
    "R U' R2 U' F' U F2 R F'",
    "R' F R2 U R' U' F2 U' F",
    "R' F R' F2 R' U2 R F2 R2 F'",
  ] },
  { n: 142, loc: "both-u", f2l: 18, algs: [
    "F' R' F' U' F U R U2 F",
    "F' U' F R U R' U' F' U' F",
    "R' F R F' R U R' F' U2 F",
  ] },
  { n: 143, loc: "both-u", f2l: 18, algs: [
    "F' U F2 R' F' R U2 R U R'",
    "F' U2 F2 U R U' R' F2 U' F",
    "F R U R' U' F2 U2 F R U' R'",
  ] },
  { n: 144, loc: "both-u", f2l: 18, algs: [
    "R U' R U R2 F' U F R2 U' R2",
    "R U' R' U2 R U R' U F' U' F",
    "R U2 F R' F' U R U2 R U2 R2",
  ] },
  { n: 145, loc: "both-u", f2l: 19, algs: [
    "F2 U2 F U F' U F2",
    "F' R' U2 R U R' U R F",
    "R U R2 F R F' R U' R'",
  ] },
  { n: 146, loc: "both-u", f2l: 19, algs: [
    "F U R U' R' F' R U' R'",
    "R2 U2 F R' F' U2 R' U R'",
    "R U R' U R U' R' F' U2 F",
  ] },
  { n: 147, loc: "both-u", f2l: 19, algs: [
    "R U R' F' U2 F R U R'",
    "F R' F' R2 U2 R' U R U R'",
    "R U R' U F' U F R U2 R'",
  ] },
  { n: 148, loc: "both-u", f2l: 19, algs: [
    "R' F R F' U' F' U' F",
    "F' U' F R U' R' F' U' F",
    "F' U F U R U2 R' F' U2 F",
  ] },
  { n: 149, loc: "both-u", f2l: 19, algs: [
    "R' U' F U R U' F2 U F",
    "F' U2 F R U' R' U F' U' F",
    "F' U2 F U R U2 R' F' U2 F",
  ] },
  { n: 150, loc: "both-u", f2l: 19, algs: [
    "R U2 R' F' U2 F2 R' F' R",
    "F R' F2 U' F U R U' R U R'",
    "R' F R F U2 F U F' U F2",
  ] },
  { n: 151, loc: "both-u", f2l: 19, algs: [
    "R' F' U' F U R U' R U R'",
    "F U R U' R2 F' R U2 R U R'",
    "R U R' U F' U2 F U' R U2 R'",
  ] },
  { n: 152, loc: "both-u", f2l: 19, algs: [
    "R U R' U F' U F2 R' F' R",
    "R U' R2 F' U' F2 U R U' F'",
    "R U' R2 U' F U R U' F2 U F",
  ] },
  { n: 153, loc: "both-u", f2l: 20, algs: [
    "R U2 R' U F' U' F",
  ] },
  { n: 154, loc: "both-u", f2l: 20, algs: [
    "F U2 F2 U' F2 U' F'",
    "R' U' R F' U' R' U2 R F",
    "F U F' U F U2 F2 U' F",
  ] },
  { n: 155, loc: "both-u", f2l: 20, algs: [
    "R U R U2 F R2 F' U2 R2",
    "R U2 R U2 F R2 F' U2 R2",
    "R2 U2 R2 F R' F' R' U2 R2",
  ] },
  { n: 156, loc: "both-u", f2l: 20, algs: [
    "R U2 R2 U' F' U F2 R F'",
    "F U2 F2 U' F2 R U' R' F'",
    "F R U R' U' F' U' F' U' F",
  ] },
  { n: 157, loc: "both-u", f2l: 20, algs: [
    "R' U' R2 U' R2 U2 R F' U F",
    "R U R' U' R U' R' U' F' U' F",
    "R U' R' U2 R U2 R' U F' U' F",
  ] },
  { n: 158, loc: "both-u", f2l: 20, algs: [
    "F' U2 R' U' F' U F R F",
    "F2 U2 R' F R U2 F U F",
    "F U2 F2 U' F2 U' R' F' R",
  ] },
  { n: 159, loc: "both-u", f2l: 20, algs: [
    "R U R' U2 R' F R F2 U' F",
    "R U' R' U F' U2 F2 R' F' R",
    "R U' R2 F R F' U F' U2 F",
  ] },
  { n: 160, loc: "both-u", f2l: 20, algs: [
    "F' U2 F U' R U' R' F' U' F",
    "R' F R F2 U' F U F' U2 F",
    "F' U' F U R U2 R' U2 F' U' F",
  ] },
  { n: 161, loc: "both-u", f2l: 21, algs: [
    "R U' R' U2 F' U' F",
    "F R' F' R U' F' U' F",
  ] },
  { n: 162, loc: "both-u", f2l: 21, algs: [
    "R F R U R' U' F' R'",
    "F R U R' U' F' U R U' R'",
    "R U2 R' U2 R U R' F' U' F",
  ] },
  { n: 163, loc: "both-u", f2l: 21, algs: [
    "F U R U' R' F' R U R'",
    "R F' U' F2 R' F' R2 U' R2",
    "F R' F' R2 U' R' U' R U2 R'",
  ] },
  { n: 164, loc: "both-u", f2l: 21, algs: [
    "R U' F R U R' U' F' R'",
    "F' R' U' R U F U' R' U R",
    "F' U F R2 U2 R2 U' R2 U' R2",
  ] },
  { n: 165, loc: "both-u", f2l: 21, algs: [
    "F2 R2 U2 R' F R U2 R2 F2",
    "F' U R U R' U' R' F2 R F'",
    "F R' F' R2 U2 R' F R' F' R",
  ] },
  { n: 166, loc: "both-u", f2l: 21, algs: [
    "F R' F' R2 U2 R' U' F' U F",
    "F' U2 F2 R' F' R2 U R' F' U2 F",
    "F R U R2 U' F' U R U' F' U' F",
  ] },
  { n: 167, loc: "both-u", f2l: 21, algs: [
    "F' U2 F U' R U R' F' U' F",
    "R U2 R' F2 U2 R' F R U2 F2",
    "F' U F2 U R U' R' F' R U R'",
  ] },
  { n: 168, loc: "both-u", f2l: 21, algs: [
    "F' U' F U2 F' U F2 R' F' R",
    "R' F' U F U2 F' U' F2 R F'",
    "F' U F R F R U R' U' F' R'",
  ] },
  { n: 169, loc: "both-u", f2l: 22, algs: [
    "F' U2 F U F' U' F",
  ] },
  { n: 170, loc: "both-u", f2l: 22, algs: [
    "F2 U2 R' F' R U2 F2",
    "R' F R F2 U2 F R U2 R'",
    "F2 R2 U2 R' F' R U2 R2 F2",
  ] },
  { n: 171, loc: "both-u", f2l: 22, algs: [
    "R' U' R2 F R F' R2 U R",
    "R U' R' F' U F U R U R'",
    "R U' R2 F R F' U R U' R'",
  ] },
  { n: 172, loc: "both-u", f2l: 22, algs: [
    "F U R U' R' F' U2 R U R'",
    "R U R' U' R U2 R' F' U2 F",
    "R U' R2 F R F' U2 R U R'",
  ] },
  { n: 173, loc: "both-u", f2l: 22, algs: [
    "R U' R' F' U' F U R U' R'",
    "R U2 R' U2 R U' R' F' U' F",
    "R U R' U2 R U R' F R' F' R",
  ] },
  { n: 174, loc: "both-u", f2l: 22, algs: [
    "F' U' F' U2 R' F' R U2 F2",
    "R' F R F2 U' F U' R U2 R'",
    "F' U' F U2 R U' R' F' U' F",
  ] },
  { n: 175, loc: "both-u", f2l: 22, algs: [
    "R U2 R' U R' F R F2 U' F",
    "R' F R F U2 R' F' R U2 F2",
    "R U R' U' F2 U2 R' F' R U2 F2",
  ] },
  { n: 176, loc: "both-u", f2l: 22, algs: [
    "F' U2 F U R U R' F' U' F",
    "F' U2 F U2 R U2 R' U' F' U F",
    "F2 R U2 R' U F' U' R U2 R' F2",
  ] },
  { n: 177, loc: "both-u", f2l: 23, algs: [
    "R2 U2 F R2 F' U2 R2",
    "F' U2 F U F' U2 F",
    "F' U2 F U2 F' U F",
  ] },
  { n: 178, loc: "both-u", f2l: 23, algs: [
    "F' R' U' F' U F R F",
    "R U' R' F' U' F U' R U R'",
    "R U' R' U R U2 R' F' U2 F",
  ] },
  { n: 179, loc: "both-u", f2l: 23, algs: [
    "F' U2 F U' F R' F' R",
    "R' F R F2 U2 F R U R'",
    "R U' R' U F' U F2 R' F' R",
  ] },
  { n: 180, loc: "both-u", f2l: 23, algs: [
    "F R U R2 U' F' U R2 U' R'",
    "R U2 R' U2 R U2 R' F' U2 F",
    "R' U' F' U F R U' R U R'",
  ] },
  { n: 181, loc: "both-u", f2l: 23, algs: [
    "F R' F' R2 U2 R' U' R U2 R'",
    "R U R2 F' U' F U R2 U' R'",
    "F' U F' U2 R' F R U2 F2",
  ] },
  { n: 182, loc: "both-u", f2l: 23, algs: [
    "R U R' U' F' U2 F2 R' F' R",
    "R U' R' F' U' F2 U R U' R2 F' R",
    "R' F R F' U2 F' U F2 R' F' R",
  ] },
  { n: 183, loc: "both-u", f2l: 23, algs: [
    "F' U2 F2 R' F' R U' R U R'",
    "F' U2 F U2 R U2 R' F' U F",
    "R' U' F' U F R U' F' U F",
  ] },
  { n: 184, loc: "both-u", f2l: 23, algs: [
    "R U2 R' U2 F' U F2 R' F' R",
    "R' F' U' F2 R F' R' U R2 U' R'",
    "F R' F' R2 U2 R' U R' F R F'",
  ] },
  { n: 185, loc: "both-u", f2l: 24, algs: [
    "F' U F U' F' U' F",
    "F2 U' F U' F' U2 F2",
    "F' U' R' F U' F' U R F",
  ] },
  { n: 186, loc: "both-u", f2l: 24, algs: [
    "F U R U' R' F2 U' F",
    "R U R2 F R F2 U' F",
    "R' F2 U' R F R' U F2 R",
  ] },
  { n: 187, loc: "both-u", f2l: 24, algs: [
    "R' U' F R F2 R' U R F",
    "R2 U' R F' R' U R F2 R F'",
    "F2 U2 R' F R U2 F2 R U' R'",
  ] },
  { n: 188, loc: "both-u", f2l: 24, algs: [
    "R U' R' U F' U2 F R U R'",
    "R U' R' U2 F' U F R U2 R'",
    "R' F' U' F U' R2 U R2 U R",
  ] },
  { n: 189, loc: "both-u", f2l: 24, algs: [
    "R U R' U R U' R' F' U' F",
    "R U' R2 U' R F' R' U R F",
    "R U2 R2 U' R F' R' U R F",
  ] },
  { n: 190, loc: "both-u", f2l: 24, algs: [
    "R U2 R' U2 F' U2 F2 R' F' R",
    "R' U' F U R2 U' R' F2 U' F",
    "R U' R' F U R U' R' F2 U' F",
  ] },
  { n: 191, loc: "both-u", f2l: 24, algs: [
    "R' F R F2 U' F U' R U R'",
    "F' U F R U2 R' F R' F' R",
    "R' U' F' U F R U' F' U' F",
  ] },
  { n: 192, loc: "both-u", f2l: 24, algs: [
    "R U R' U2 F' U' F U R U' R'",
    "R U' R' U R U R' U' F' U' F",
    "R U' R' U2 F' U2 F U' R U2 R'",
  ] },
  { n: 193, loc: "corner-slot", f2l: 1, algs: [
    "R U' R' U R U' R'",
    "R U' R' U2 R U2 R'",
    "R U2 R U2 R' U' R U' R2",
  ] },
  { n: 194, loc: "corner-slot", f2l: 1, algs: [
    "R U' R2 F R F'",
  ] },
  { n: 195, loc: "corner-slot", f2l: 1, algs: [
    "F' U2 F R U2 R'",
    "F' U2 F U' R U' R'",
  ] },
  { n: 196, loc: "corner-slot", f2l: 1, algs: [
    "F' U' F U' R U2 R'",
    "F' U' F U2 R U' R'",
    "R U' R2 F R2 U R' U' F'",
  ] },
  { n: 197, loc: "corner-slot", f2l: 1, algs: [
    "F' U2 F2 R' F' R2 U2 R'",
    "F' U' F U' F R' F' R2 U2 R'",
  ] },
  { n: 198, loc: "corner-slot", f2l: 1, algs: [
    "R U' R2 U' F U R U' F'",
    "R F R U R2 U' R F' U R'",
    "R U R' U R U R2 F R F'",
  ] },
  { n: 199, loc: "corner-slot", f2l: 1, algs: [
    "F R' F' R2 U' R' U2 R U R'",
    "R U' R' F' U F U2 R U R'",
    "R U' R2 U' F U R2 U' R' F'",
  ] },
  { n: 200, loc: "corner-slot", f2l: 1, algs: [
    "F' U F R U2 R' U' R U R'",
    "F' U' F R U2 R' U' R U2 R'",
    "R U R' U F' U' F R U R'",
  ] },
  { n: 201, loc: "corner-slot", f2l: 2, algs: [
    "R U2 R' F' U2 F",
    "R U2 R' U F' U F",
  ] },
  { n: 202, loc: "corner-slot", f2l: 2, algs: [
    "F' U F2 R' F' R",
  ] },
  { n: 203, loc: "corner-slot", f2l: 2, algs: [
    "R U R' U F' U2 F",
    "R U R' U2 F' U F",
    "F U R U' R2 F' R2 U R'",
  ] },
  { n: 204, loc: "corner-slot", f2l: 2, algs: [
    "R U R' U' F R' F' R",
    "R U2 R' U2 F R' F' R",
    "F' U F U' F' U F",
  ] },
  { n: 205, loc: "corner-slot", f2l: 2, algs: [
    "R U2 R2 F R F2 U2 F",
    "R U R' U R' F R F2 U2 F",
  ] },
  { n: 206, loc: "corner-slot", f2l: 2, algs: [
    "R U' R' F' U F R U2 R'",
    "R U R' U2 R U2 R' F' U F",
    "R U' R' U' F' U2 F R U R'",
  ] },
  { n: 207, loc: "corner-slot", f2l: 2, algs: [
    "F' U F2 U R' U' F' U R",
    "F' U2 R' U' R F2 R' F' U R",
    "R' F R F2 U2 F U' R U2 R'",
  ] },
  { n: 208, loc: "corner-slot", f2l: 2, algs: [
    "R U' R' U' F' U2 F2 R' F' R",
    "F' U F R U' R' U2 F' U' F",
    "F' U F2 U R' U' F2 U F R",
  ] },
  { n: 209, loc: "corner-slot", f2l: 3, algs: [
    "R U' R2 U2 R2 U R2 U R",
    "R' U' R' U' R U R U R",
    "R' U' R2 U' R2 U2 R2 U R'",
  ] },
  { n: 210, loc: "corner-slot", f2l: 3, algs: [
    "F' U F U R U' R'",
    "F' U F U2 R U2 R'",
    "R U F U R U' R' F' R'",
  ] },
  { n: 211, loc: "corner-slot", f2l: 3, algs: [
    "F' U2 F U2 R U R'",
    "R' F R F' R U R'",
    "F' U F R' F R F'",
  ] },
  { n: 212, loc: "corner-slot", f2l: 3, algs: [
    "F' U' F U R U R'",
  ] },
  { n: 213, loc: "corner-slot", f2l: 3, algs: [
    "R U R U2 F R' F' U2 R2",
    "R F R2 U' R2 U R2 U F' R'",
    "R2 F R2 U R2 U' R' F' U R2",
  ] },
  { n: 214, loc: "corner-slot", f2l: 3, algs: [
    "R2 U2 F R F' U2 R' U' R'",
    "R F U' R2 U' R2 U R2 F' R'",
    "R U2 F R2 U R' U' R2 F' R'",
  ] },
  { n: 215, loc: "corner-slot", f2l: 3, algs: [
    "R F R2 U R U' R2 F' U2 R'",
    "R' U R' F' U' F U' R' U2 R2",
    "R2 U R2 U R2 F R F' U2 R2",
  ] },
  { n: 216, loc: "corner-slot", f2l: 3, algs: [
    "R' U' F' U F2 R F' R U R'",
    "F' U F R' F R2 U R' U' F'",
    "F R' F2 U' F U R U' R U2 R'",
  ] },
  { n: 217, loc: "corner-slot", f2l: 4, algs: [
    "R U R' U' R U R'",
    "R U2 R' U2 R U R'",
    "R U' R U R2 U R2 U2 R2",
  ] },
  { n: 218, loc: "corner-slot", f2l: 4, algs: [
    "F R' F' R2 U R'",
  ] },
  { n: 219, loc: "corner-slot", f2l: 4, algs: [
    "F' U F R U R'",
  ] },
  { n: 220, loc: "corner-slot", f2l: 4, algs: [
    "F U R' U' F' U R2 U R'",
    "R U' F R' U R2 U' R' F' R'",
    "R U' F R2 F' R U2 R2 U2 R2",
  ] },
  { n: 221, loc: "corner-slot", f2l: 4, algs: [
    "F R' F' R F R' F' R",
    "F' U2 F R U R' U R U' R'",
    "F R' U2 F' R F R' U2 F' R",
  ] },
  { n: 222, loc: "corner-slot", f2l: 4, algs: [
    "F R U R2 U' F' U R2 U R'",
    "R U' F U R U' R' F' U2 R'",
    "R U' R' U2 R U R2 F R F'",
  ] },
  { n: 223, loc: "corner-slot", f2l: 4, algs: [
    "F' U F R' U2 R2 U R2 U R",
    "R U F R U R2 U' R F' R'",
    "F' U' F U2 R U2 R' U R U' R'",
  ] },
  { n: 224, loc: "corner-slot", f2l: 4, algs: [
    "F U R U' R' F2 U F R U R'",
    "F' R' U' R F2 R' F' U R2 U R'",
    "F' U F R U R2 F' U' F U R",
  ] },
  { n: 225, loc: "corner-slot", f2l: 5, algs: [
    "R U R' U' F' U' F",
  ] },
  { n: 226, loc: "corner-slot", f2l: 5, algs: [
    "R U' R' F R' F' R",
    "R U2 R' U2 F' U' F",
    "F R' F' R F' U' F",
  ] },
  { n: 227, loc: "corner-slot", f2l: 5, algs: [
    "R U' R' U' F' U F",
    "R U' R' U2 F' U2 F",
  ] },
  { n: 228, loc: "corner-slot", f2l: 5, algs: [
    "F' R' U' R F R' U R",
    "R' U' R F' R' U R F",
    "F' R' U2 R F U' R' U' R",
  ] },
  { n: 229, loc: "corner-slot", f2l: 5, algs: [
    "F2 R U' R2 F R2 U R' F2",
    "F' U2 F2 R' F' R U2 R U R'",
    "R U' R' U2 R' F R F2 U2 F",
  ] },
  { n: 230, loc: "corner-slot", f2l: 5, algs: [
    "F2 R U' R2 F' R2 U R' F2",
    "F' U' F' U2 R' F R U2 F2",
    "F R2 F2 R' U2 R F2 R2 F'",
  ] },
  { n: 231, loc: "corner-slot", f2l: 5, algs: [
    "F2 U2 R' F' R U2 F U F",
    "F U' F R U2 R' U F U F2",
    "F2 U2 F' U' R U' R' F' U F'",
  ] },
  { n: 232, loc: "corner-slot", f2l: 5, algs: [
    "R U' R' F R' F2 U' F U R",
    "F U R U' R2 F' R F' U' F",
    "R U R' U2 R' U' F' U F2 R F'",
  ] },
  { n: 233, loc: "corner-slot", f2l: 6, algs: [
    "R U' R' F' U' F",
  ] },
  { n: 234, loc: "corner-slot", f2l: 6, algs: [
    "R' F R F2 U' F",
  ] },
  { n: 235, loc: "corner-slot", f2l: 6, algs: [
    "R' F R F' U R U' R'",
    "F' U' F U F' U' F",
    "F' U2 F U2 F' U' F",
  ] },
  { n: 236, loc: "corner-slot", f2l: 6, algs: [
    "R' F R F' R' F R F'",
    "F R' F' R' U R2 U R2 U2 R2",
    "R U2 R' U' R U2 R' F' U' F",
  ] },
  { n: 237, loc: "corner-slot", f2l: 6, algs: [
    "R' U' F U R U' F2 U' F",
    "R' U' F R F2 R' U R U2 F",
    "R U2 R' F' U2 F2 R' F' R2 U R'",
  ] },
  { n: 238, loc: "corner-slot", f2l: 6, algs: [
    "R F R' U R2 U' R' F' U' R'",
    "R U R' U R U R' F' U' F",
    "R' U' R2 U' R2 U2 R F' U' F",
  ] },
  { n: 239, loc: "corner-slot", f2l: 6, algs: [
    "R U R' U2 F' U2 F2 R' F' R",
    "F' U R' U' F' U F R U2 F",
    "R U2 R' F2 U2 R' F' R U2 F2",
  ] },
  { n: 240, loc: "corner-slot", f2l: 6, algs: [
    "R U' R' F' U' F2 R U R' U' F'",
    "R U' R2 U' F R F2 R' U R F",
    "R' U' F' U F R2 U' R' F' U' F",
  ] },
  { n: 241, loc: "edge-slot", f2l: 1, algs: [
    "R U' R' F' U2 F",
    "R U2 R' F' U' F",
    "R U' R' U F' U F",
  ] },
  { n: 242, loc: "edge-slot", f2l: 1, algs: [
    "F' U F R U2 R'",
    "F' U2 F R U R'",
    "F' U F U' R U' R'",
  ] },
  { n: 243, loc: "edge-slot", f2l: 1, algs: [
    "R U2 R' U F' U2 F",
    "R U2 R' U2 F' U F",
    "R' F R F' R U' R'",
  ] },
  { n: 244, loc: "edge-slot", f2l: 1, algs: [
    "F' U2 F U' R U2 R'",
    "F' U2 F U2 R U' R'",
    "R U' R' U2 F R' F' R",
  ] },
  { n: 245, loc: "edge-slot", f2l: 1, algs: [
    "R U' R2 F R F2 U2 F",
    "R U2 R2 F R F2 U' F",
    "R' F R F2 U2 F R U' R'",
  ] },
  { n: 246, loc: "edge-slot", f2l: 1, algs: [
    "F' U F2 R' F' R2 U2 R'",
    "F' U2 F2 R' F' R2 U R'",
    "F R' F' R2 U2 R' F' U F",
  ] },
  { n: 247, loc: "edge-slot", f2l: 1, algs: [
    "R' F R F2 U' F R U' R'",
    "F' U' F R U' R2 F R F'",
    "R' F R F' U' R' F R F'",
  ] },
  { n: 248, loc: "edge-slot", f2l: 1, algs: [
    "R U R' F' U F2 R' F' R",
    "F R' F' R U F R' F' R",
    "F R' F' R2 U R' F' U F",
  ] },
  { n: 249, loc: "edge-slot", f2l: 2, algs: [
    "R U R' U' F' U F",
    "R U R' U2 F' U2 F",
  ] },
  { n: 250, loc: "edge-slot", f2l: 2, algs: [
    "R U R' F R' F' R",
    "F R' F' R U2 F' U' F",
  ] },
  { n: 251, loc: "edge-slot", f2l: 2, algs: [
    "R U' R' U' F' U' F",
  ] },
  { n: 252, loc: "edge-slot", f2l: 2, algs: [
    "R U R' U F' U' F",
  ] },
  { n: 253, loc: "edge-slot", f2l: 2, algs: [
    "R' F R2 U R' U' F2 U F",
    "R U R' F R' F2 U' F U R",
    "F' U' F R2 U2 F R' F' U2 R2",
  ] },
  { n: 254, loc: "edge-slot", f2l: 2, algs: [
    "R U R2 U' F' U F2 R F'",
    "R' U' F' U F2 R F' R U' R'",
    "F' U2 F U R U2 R2 F R F'",
  ] },
  { n: 255, loc: "edge-slot", f2l: 2, algs: [
    "R U R' U2 R' F R F2 U2 F",
    "R' F R F2 U' F U2 R U R'",
    "R' U' F U R2 U' R' F2 U2 F",
  ] },
  { n: 256, loc: "edge-slot", f2l: 2, algs: [
    "R U R' U R' F R F2 U' F",
    "F' U F2 R U R' U' F' R U2 R'",
    "R U' R2 U' F' U F R F' U2 F",
  ] },
  { n: 257, loc: "edge-slot", f2l: 3, algs: [
    "R2 U R2 U R2 U2 R2",
    "R2 U2 R2 U' R2 U' R2",
    "R' U' R2 U' R2 U2 R2 U' R'",
  ] },
  { n: 258, loc: "edge-slot", f2l: 3, algs: [
    "F R' F' R U' R U R'",
    "R U R' F' U F U2 R U R'",
    "R U R' U2 F R' F' R2 U R'",
  ] },
  { n: 259, loc: "edge-slot", f2l: 3, algs: [
    "R F R U R' U' F' U R'",
    "F' R U R' U' R' F2 R F'",
    "R U R' U' R U2 R2 F R F'",
  ] },
  { n: 260, loc: "edge-slot", f2l: 3, algs: [
    "R' F' R' U2 R F R' U2 R2",
    "F2 R U2 R' U2 R' F' R F'",
    "F R' F' R2 U R' U R U' R'",
  ] },
  { n: 261, loc: "edge-slot", f2l: 3, algs: [
    "R F R' U R2 U' R' F' R'",
    "R F R2 F' R U2 R2 U2 R2",
    "F R' F' R2 U R' U' R U R'",
  ] },
  { n: 262, loc: "edge-slot", f2l: 3, algs: [
    "R2 U2 R2 U2 R' F R2 F' R'",
    "R' F R F' U F' U' F",
    "R U R' U' F' U' F R U R'",
  ] },
  { n: 263, loc: "edge-slot", f2l: 3, algs: [
    "R U' F R2 U R2 U' R2 F' R'",
    "R U' R' U F' U2 F R U2 R'",
    "R2 U R' U' R' F R F' U R'",
  ] },
  { n: 264, loc: "edge-slot", f2l: 3, algs: [
    "R2 U2 F R F' U2 R F R F'",
    "F2 U2 R' F' R U2 F' R' F' R",
    "R U' R2 F R F2 U' F R U2 R'",
  ] },
  { n: 265, loc: "edge-slot", f2l: 4, algs: [
    "R U' R' U' R U2 R'",
    "R U' R' U2 R U' R'",
    "R U R2 U2 R2 U R2 U R",
  ] },
  { n: 266, loc: "edge-slot", f2l: 4, algs: [
    "R U' R' U R' F R F'",
    "R2 U2 R F R2 F' R U2 R2",
    "R2 U2 R F' R' U2 R F R",
  ] },
  { n: 267, loc: "edge-slot", f2l: 4, algs: [
    "R U' R2 F R F' R U R'",
    "R2 U2 R' F R2 F' R' U2 R2",
    "F R' F' R2 U' R' U R U' R'",
  ] },
  { n: 268, loc: "edge-slot", f2l: 4, algs: [
    "R U' R' F' U' F R U2 R'",
    "R U' R' U2 F' U F R U' R'",
    "R U2 F R U R' U' F' U2 R'",
  ] },
  { n: 269, loc: "edge-slot", f2l: 4, algs: [
    "R U' F U R U' R' F' R'",
    "R U R' U' F' U2 F R U2 R'",
    "R U' R' F' U F U R U' R'",
  ] },
  { n: 270, loc: "edge-slot", f2l: 4, algs: [
    "F R' F R U2 R U2 R' F2",
    "R F R2 U R2 U' R2 F' U R'",
    "R U' R' U2 F' U2 F R U' R'",
  ] },
  { n: 271, loc: "edge-slot", f2l: 4, algs: [
    "F' U2 F R U' R' F' U' F",
    "R U R' U F' U2 F U' R U R'",
    "R U R' U' R2 U2 F R' F' U2 R2",
  ] },
  { n: 272, loc: "edge-slot", f2l: 4, algs: [
    "F R' F' R2 U2 R2 F R F'",
    "R' F R F U2 R' F R U2 F2",
    "R2 U2 R' F R2 F2 R' U2 R F R",
  ] },
  { n: 273, loc: "edge-slot", f2l: 5, algs: [
    "F' U' F U' R U R'",
    "F' U2 R U R' U' R' F R",
  ] },
  { n: 274, loc: "edge-slot", f2l: 5, algs: [
    "F' U F U R U R'",
  ] },
  { n: 275, loc: "edge-slot", f2l: 5, algs: [
    "F' U' F U R U' R'",
    "F' U' F U2 R U2 R'",
  ] },
  { n: 276, loc: "edge-slot", f2l: 5, algs: [
    "R' F R F' U2 R U R'",
    "F' U' F R' F R F'",
  ] },
  { n: 277, loc: "edge-slot", f2l: 5, algs: [
    "F' U' F2 U R U' R2 F' R",
    "R U2 R' U' F' U2 F2 R' F' R",
    "F U R U' R2 F' R F' U F",
  ] },
  { n: 278, loc: "edge-slot", f2l: 5, algs: [
    "F R' F2 U' F U R2 U' R'",
    "F' U F R2 U2 F R F' U2 R2",
    "F' U' F R' F R2 U R' U' F'",
  ] },
  { n: 279, loc: "edge-slot", f2l: 5, algs: [
    "F U R' U' F2 U F R2 U2 R'",
    "F' U2 F2 R' F' R U' R U2 R'",
    "R U' R' U2 F' U F2 R' F' R",
  ] },
  { n: 280, loc: "edge-slot", f2l: 5, algs: [
    "F' U' F U' F R' F' R2 U R'",
    "F R U R' U' F2 U2 F R U R'",
    "F' U F2 U R U' R' F' R U2 R'",
  ] },
  { n: 281, loc: "edge-slot", f2l: 6, algs: [
    "R U R' U2 R U R'",
    "R U2 R' U R U R'",
  ] },
  { n: 282, loc: "edge-slot", f2l: 6, algs: [
    "R U' R' F R' F' R2 U R'",
    "R U' R2 U' F' U F R2 U R'",
    "R U2 R' U2 F' U' F R U R'",
  ] },
  { n: 283, loc: "edge-slot", f2l: 6, algs: [
    "R F R U R2 U' R F' R'",
    "R U2 R' F' U F R U R'",
    "R U R' F' U' F U2 R U R'",
  ] },
  { n: 284, loc: "edge-slot", f2l: 6, algs: [
    "F' U F U' F R' F' R",
    "R' F R F2 U F2 R' F' R",
    "F2 U2 F' R F U2 F' R' F'",
  ] },
  { n: 285, loc: "edge-slot", f2l: 6, algs: [
    "F R' F2 R U R U' R' F",
    "R U' R' U' F' U F R U R'",
    "F R' F' U' R' U' R' U R U R",
  ] },
  { n: 286, loc: "edge-slot", f2l: 6, algs: [
    "R U2 F U R U' R' F' U2 R'",
    "R U2 R' U2 R U R2 F R F'",
    "F' U R' U' F' U F R F",
  ] },
  { n: 287, loc: "edge-slot", f2l: 6, algs: [
    "F R' F' R2 U' R' U' R U R'",
    "R U R' F' U2 F U2 R U R'",
    "R U' R' F' U F U' R U R'",
  ] },
  { n: 288, loc: "edge-slot", f2l: 6, algs: [
    "R' F R F2 U2 F2 R' F' R",
    "F R' F' R' U2 F R' F' U2 R2",
    "R' F' R' U2 R F2 R2 F' R U2 R2",
  ] },
  { n: 289, loc: "both-slot", f2l: 1, algs: [
    "F U R U' R' F'",
    "R' U' F' U F R",
    "F R' F' R U R U' R'",
  ] },
  { n: 290, loc: "both-slot", f2l: 1, algs: [
    "F R U R' U' F'",
    "R' F' U' F U R",
    "R U R' U' R' F R F'",
  ] },
  { n: 291, loc: "both-slot", f2l: 1, algs: [
    "R' F' U2 F2 U R U' R' F' U2 R",
    "R' U2 F R U R' U' F2 U2 F R",
    "F R U2 R2 U' F' U F R U2 F'",
  ] },
  { n: 292, loc: "both-slot", f2l: 2, algs: [
    "R U2 R U R' U R U2 R2",
    "R U R' U R2 U R' U R U2 R2",
    "R U R' U2 R U' R' U R U R'",
  ] },
  { n: 293, loc: "both-slot", f2l: 2, algs: [
    "R2 U2 F R' F' U2 R' U2 R'",
    "R U' R' U R U2 R2 F R F'",
    "F' U2 F' U2 R' F' R U2 F2",
  ] },
  { n: 294, loc: "both-slot", f2l: 2, algs: [
    "R2 U2 R' U' R U F R F' U2 R2",
    "R2 U2 R U' R U F R F' R2 U2 R2",
    "F U R' F' R F U' F' R U R'",
  ] },
  { n: 295, loc: "both-slot", f2l: 2, algs: [
    "R U' R' U' F' U F2 R' F' R2 U R'",
    "R U2 R' F U R' U' F2 U F R2 U R'",
    "R' U R' U' F' U' F2 R F' U R' U R2",
  ] },
  { n: 296, loc: "both-slot", f2l: 3, algs: [
    "R2 U2 R' U' R U' R' U2 R'",
    "R U R' U' R U2 R' U' R U R'",
    "R U' R' U' R U R' U' R U2 R'",
  ] },
  { n: 297, loc: "both-slot", f2l: 3, algs: [
    "R U2 R U2 F R F' U2 R2",
    "F R' F' R2 U2 R' U' R U R'",
    "F2 U2 R' F R U2 F U2 F",
  ] },
  { n: 298, loc: "both-slot", f2l: 3, algs: [
    "R2 U2 R' U2 R' U F R F' U R'",
    "R U' R' U' R U R' U R' F R F'",
    "R2 U2 R' U' R' U R2 F R' F' U2 R2",
  ] },
  { n: 299, loc: "both-slot", f2l: 3, algs: [
    "R U' R2 F R F2 U' F U R U R'",
    "R U' R2 F' U' F2 U R U' F' R U2 R'",
    "R2 U' R U' F R' F2 U F U R U' R",
  ] },
  { n: 300, loc: "both-slot", f2l: 4, algs: [
    "R U F R U R' U' F' R'",
    "F' U2 F R2 U2 R' U' R U' R2",
    "R U' R' U2 R U R' F' U' F",
  ] },
  { n: 301, loc: "both-slot", f2l: 4, algs: [
    "F' U' F2 U R' U' F' U R2 U' R'",
    "R2 F R2 F' R' U' R2 F R2 F' R'",
    "F' U2 F2 R' F' R' U2 R' U' R U' R2",
  ] },
  { n: 302, loc: "both-slot", f2l: 5, algs: [
    "R F U R U' R' F' U' R'",
    "F' U F R U' R' U2 R U R'",
    "R2 U R' U R U2 R2 F' U2 F",
  ] },
  { n: 303, loc: "both-slot", f2l: 5, algs: [
    "R U R2 U' F U R U' F2 U F",
    "R F R2 F' R2 U R F R2 F' R2",
    "F U R' U' F2 U F R U R U R'",
  ] },
  { n: 304, loc: "both-slot", f2l: 6, algs: [
    "R U' R U2 F R2 F' U2 R2",
    "R2 U2 F R2 F' U2 R' U R'",
    "R F R' F' U2 R U R U' R2",
  ] },
  { n: 305, loc: "both-slot", f2l: 6, algs: [
    "F' U' F2 U R' U2 R2 U R2 U F' R",
    "R' F U' R2 U' R2 U2 R U' F2 U F",
    "F R' F' R U' R U2 R' U F' U' F",
  ] },
];
