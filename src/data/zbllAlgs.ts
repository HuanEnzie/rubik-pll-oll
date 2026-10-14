/**
 * ZBLL — 472 case (không tính 21 PLL). FILE SINH TỰ ĐỘNG bởi scripts/gen-zbll.ts — đừng sửa tay.
 * Công thức do bộ giải <R,U,F> tìm (ngắn nhất tới +2 nước, ưu tiên R/U), đã kiểm bằng mô phỏng.
 * set = nhóm hướng góc (T, U, L, H, Pi, S, AS); sub = tập con COLL (cùng cách hoán vị góc);
 * cp = kiểu hoán vị góc của tập con: solved (đúng chỗ) | diag (đổi chéo) | adj (đổi kề).
 */
export interface ZbllDef { set: string; n: number; sub: number; cp: 'solved' | 'diag' | 'adj'; algs: string[] }

export const ZBLL_DEFS: ZbllDef[] = [
  { set: "T", n: 1, sub: 1, cp: "solved", algs: [
    "R U R2 U' R2 U' R2 U2 R U' R U' R' U'",
    "R U2 R' U2 R' U2 R U R' U R U' R U' R' U'",
    "R' U' R2 U R2 U R2 U' R2 U R U' R U' R' U'",
  ] },
  { set: "T", n: 2, sub: 1, cp: "solved", algs: [
    "R' U2 R U R' U R2 U2 R' U' R U' R' U'",
    "R U' R U2 R U' R U R U' R2 U' R' U R'",
    "R U2 R2 U2 R' U R' U' R2 U R' U R2 U2 R'",
  ] },
  { set: "T", n: 3, sub: 1, cp: "solved", algs: [
    "R U2 R' U' R U' R2 U2 R U R' U R U",
    "R U' R2 U' R' U2 R' U2 R' U2 R2 U' R2 U R'",
    "R' U R' U2 R' U R' U' R' U R2 U R U' R",
  ] },
  { set: "T", n: 4, sub: 1, cp: "solved", algs: [
    "R' U' R2 U R2 U R2 U2 R' U R' U R U",
    "R U R2 U' R2 U' R2 U R2 U' R' U R' U R U",
    "R U2 R' U R2 U' R' U R' U R' U R' U' R U",
  ] },
  { set: "T", n: 5, sub: 1, cp: "solved", algs: [
    "R U R' U R U2 R' U2 R' U' R U' R' U2 R",
    "R U R' U' R' U R U2 R U2 R' U R' U2 R",
    "R' U' R U R U' R' U2 R' U2 R U' R U2 R'",
  ] },
  { set: "T", n: 6, sub: 1, cp: "solved", algs: [
    "R U R' U' R2 U2 R' U R' U2 R U2 R U R2",
    "R U' R U2 R U2 R' U R U2 R U' R' U' R2",
    "R U2 R' U' R U' R' U R U R' U R U2 R'",
  ] },
  { set: "T", n: 7, sub: 1, cp: "solved", algs: [
    "R' U2 R' U R2 U R' U' R2 U2 R2 U R' U R'",
    "R U R' U R U2 R' U' R U2 R' U' R U' R' U'",
    "R' U R U2 R' U' R U2 R' U' R U' R' U R U2",
  ] },
  { set: "T", n: 8, sub: 1, cp: "solved", algs: [
    "R' U R' U2 R' U2 R U' R' U' R U R U' R",
    "R' U' R U' R' U R U' R U R2 U R2 U2 R'",
    "R' U2 R2 U2 R U2 R' U2 R U R2 U' R2 U2 R",
  ] },
  { set: "T", n: 9, sub: 1, cp: "solved", algs: [
    "R' U R' U2 R' U2 R U' R' U2 R' U R U R2",
    "R' U' R U R2 U2 R U' R U2 R' U2 R' U' R2",
    "R' U2 R U R' U R U' R' U' R U' R' U2 R",
  ] },
  { set: "T", n: 10, sub: 1, cp: "solved", algs: [
    "R U2 R U' R2 U' R U R2 U2 R2 U' R U' R",
    "R U R' U2 R' U2 R' U2 R U2 R' U' R2 U R U",
    "R U R2 U2 R' U2 R U2 R U2 R2 U' R2 U R U",
  ] },
  { set: "T", n: 11, sub: 1, cp: "solved", algs: [
    "R U R' U R U' R' U R' U' R2 U' R2 U2 R",
    "R U' R U2 R U2 R' U R U R' U' R' U R'",
    "R U2 R2 U2 R' U2 R U2 R' U' R2 U R2 U2 R'",
  ] },
  { set: "T", n: 12, sub: 1, cp: "solved", algs: [
    "R U2 R2 U R' U R' U R' U R U2 R2 U' R2 U",
    "R' U2 R2 U' R U' R U' R U' R' U2 R2 U R2 U'",
    "R U R' U R U' R2 U' R' U' R U R' U' R2 U2 R",
  ] },
  { set: "T", n: 13, sub: 2, cp: "diag", algs: [
    "R2 U' R U F' U2 R' U2 R F U' R",
    "R2 U2 R' U2 R U2 F U R' U' R F' U R2",
    "R U F' U R' U R U2 F R' U R U2 R' U'",
  ] },
  { set: "T", n: 14, sub: 2, cp: "diag", algs: [
    "R' U F' R' U2 R U2 F U' R' U R2 U'",
    "R U2 R' U' R F' U2 R' U' R U' F U' R' U",
    "R2 U' F R' U R U' F' U2 R' U2 R U2 R2 U'",
  ] },
  { set: "T", n: 15, sub: 2, cp: "diag", algs: [
    "R' U2 R' U2 R2 U R F R U R U' R' F' R2",
    "R2 F R U R' U' R' F' R' U' R2 U2 R U2 R U'",
    "R F U' R2 U' R U2 R U F' R U2 R U' R2 U' R2",
  ] },
  { set: "T", n: 16, sub: 2, cp: "diag", algs: [
    "F U' R2 U R' U R U2 R2 U' R U2 R' F' U2",
    "R2 U2 R U2 R2 U2 R' U2 F U R' U' R F' U R2",
    "R2 F2 R U2 R U2 R' F' R U R' U' R' F' R2 U",
  ] },
  { set: "T", n: 17, sub: 2, cp: "diag", algs: [
    "F R U2 R' U R2 U2 R' U' R U' R2 U F' U2",
    "R2 F R U R U' R' F R U2 R' U2 R' F2 R2 U'",
    "R2 U' F R' U R U' F' U2 R U2 R2 U2 R' U2 R2 U'",
  ] },
  { set: "T", n: 18, sub: 2, cp: "diag", algs: [
    "F U' R' U R U F' U R' U' R U R' U R",
    "R U F' U2 R' U R U2 R' U' R U2 F U' R' U",
    "R' U' R U' R' U R U' F U' R' U' R U F' U",
  ] },
  { set: "T", n: 19, sub: 2, cp: "diag", algs: [
    "F2 U F' U' R U2 F U2 F' R' U F' U",
    "R U2 R2 F R F' R U' R2 F R F2 U F",
    "R' U' F' U F' R2 U2 F U F' U R2 F2 R",
  ] },
  { set: "T", n: 20, sub: 2, cp: "diag", algs: [
    "F U' R F U2 F' U2 R' U F U' F2 U2",
    "F' U' F2 R' F' R2 U R' F R' F' R2 U2 R'",
    "R' F2 R2 U' F U' F' U2 R2 F U' F U R",
  ] },
  { set: "T", n: 21, sub: 2, cp: "diag", algs: [
    "R' F R U R' U2 R2 U R2 U R F' R U2 R' U",
    "R' U2 F R2 F' U' R' U' R' U2 F R F' U' R2",
    "R U2 R' U' R2 F2 U R' U R U2 F2 R' U' R' U'",
  ] },
  { set: "T", n: 22, sub: 2, cp: "diag", algs: [
    "R U' R2 U' R' F' R U R2 U R' U2 R' F R U'",
    "R' F' R U2 R U' R2 U' R' F R U R2 U R' U",
    "F R' U R U' F2 U R' U R U2 F U2 R' U2 R",
  ] },
  { set: "T", n: 23, sub: 2, cp: "diag", algs: [
    "R U' R' U R F R U R U' R U R2 U' F' R'",
    "R U2 R' F R' U' R2 U' R2 U2 R U' R' F' R U2",
    "R U R F2 U2 R' U' R U' F2 R2 U R U2 R' U'",
  ] },
  { set: "T", n: 24, sub: 2, cp: "diag", algs: [
    "R2 F' R' U2 R2 U2 R' U2 R' U2 F R2 U2 R U2 R'",
    "R2 U R' U' R' F U R' U2 R' U2 R U R F' R'",
    "R U' R' U' F U F' U' R U2 F U2 F' U2 R'",
  ] },
  { set: "T", n: 25, sub: 3, cp: "adj", algs: [
    "R' U' R F R' U R U' F'",
    "R' U' F' U R' U' R F R' U R2",
    "R F R' U R F' R' F U' F'",
  ] },
  { set: "T", n: 26, sub: 3, cp: "adj", algs: [
    "F U R U2 R' U R U R' F'",
    "F U' R' U2 R U F' R' U R",
    "F' R' F U2 F' R F U R' U R",
  ] },
  { set: "T", n: 27, sub: 3, cp: "adj", algs: [
    "R U R' U' R' F' R U2 R U2 R' F U",
    "F U F' R' U' R U F U' R' U R U' F'",
    "R' U2 R U' R' F' U F U2 F' U F R U2",
  ] },
  { set: "T", n: 28, sub: 3, cp: "adj", algs: [
    "R' U2 R' U2 R F U' R' U' R U F' R",
    "R2 F2 R U2 R U2 R' F2 R U' R' U R",
    "F' R U R' U' R' U R' U' R F R2 U R2 U2",
  ] },
  { set: "T", n: 29, sub: 3, cp: "adj", algs: [
    "R' U2 R F U' R' U R U F' R' U R U2",
    "R' U2 R' F' U R' U' R F R2 U R2 U R",
    "R U2 R U' R2 F' R' U R U' F R2 U' R' U",
  ] },
  { set: "T", n: 30, sub: 3, cp: "adj", algs: [
    "F R U R2 U' R' F' R' U' R2 U2 R2 U2 R'",
    "F' U' F U' F' R' U' R U' F U' R' U' R",
    "R2 U' F' U2 F R2 U2 F R2 F' R2 U' R2 U'",
  ] },
  { set: "T", n: 31, sub: 3, cp: "adj", algs: [
    "F U R' U' R F' R' U' R U R' U R U2",
    "R' U2 F' R' F R U R' F' R F U R U2",
    "R U F' R' U R' U2 R U R' U R2 F U' R' U'",
  ] },
  { set: "T", n: 32, sub: 3, cp: "adj", algs: [
    "F U2 R U R2 U' R' U' R2 U R U R F'",
    "F R U R2 U' R' F' R U R U R U2 R' U'",
    "R' U2 R U F U' R' U' R U F' R' U2 R U'",
  ] },
  { set: "T", n: 33, sub: 3, cp: "adj", algs: [
    "F R2 U' R' U2 R' U' R U' R' U' R2 U R2 F'",
    "F' R U R U' R' F R' U' R' U2 R U2 R U2",
    "R U R2 F' R' U2 R U2 F R' U' R2 U' R U2",
  ] },
  { set: "T", n: 34, sub: 3, cp: "adj", algs: [
    "R U2 F U' R U' R2 U' R2 U2 R' U F' U R'",
    "F U' F' R2 F' R2 U R2 U' F2 U F' R2 U2",
    "F' U' F U2 R2 U2 R2 U' R2 U' R2 F' U2 F U'",
  ] },
  { set: "T", n: 35, sub: 3, cp: "adj", algs: [
    "R' U R' U' R' U' F' R' U R U' F U2 R2 U2",
    "R' F' R F U' R' U2 R U' F' R' F U' R U2",
    "F2 R F' R' U2 R U F' U2 F U' F R' F2",
  ] },
  { set: "T", n: 36, sub: 3, cp: "adj", algs: [
    "R' U2 R' U' R' U' R' F' R' U R U' F U2 R2 U2",
    "R' U2 R2 U R' U' R' U2 F' R U2 R U2 R' F U",
    "R F R2 U' R' U' R' U' R U2 R U R2 F' U2 R' U",
  ] },
  { set: "T", n: 37, sub: 4, cp: "adj", algs: [
    "F U F' R' F U' F' U R U",
    "F U' R' U' R U F' U' R' U R U",
    "R U2 R' F' R U2 R' U2 R' F R U'",
  ] },
  { set: "T", n: 38, sub: 4, cp: "adj", algs: [
    "R' U F U2 F' U' R F U' F' U",
    "R' U' F' U2 F U' F' U' F R U",
    "R F R' U2 R F' R' U' F U' F' U",
  ] },
  { set: "T", n: 39, sub: 4, cp: "adj", algs: [
    "R F U R2 U' R2 F' U R U R2 U' R2",
    "R' U' R2 U R2 U R F2 R U2 R2 U2 R' F2 R2",
    "F' U R' U2 R U R' U' R U2 F U' R' U R U'",
  ] },
  { set: "T", n: 40, sub: 4, cp: "adj", algs: [
    "R U2 R' U2 R' F R U R U' R' F' U'",
    "F' U' F U F R F' U2 F' U2 F R'",
    "F U2 F' U F R U' R' U2 R U' R' F' U'",
  ] },
  { set: "T", n: 41, sub: 4, cp: "adj", algs: [
    "R F U R' U' R U' R' U' R U F' R'",
    "R U R' U' R U2 F U R' U' R F' U R'",
    "R' U' R U F R' U R U' F' U2 R' U' R U'",
  ] },
  { set: "T", n: 42, sub: 4, cp: "adj", algs: [
    "R' U' R U R U' R2 F' R' U R U' F R2",
    "R' U' R2 F' R' U R U' R U R U' R' F R'",
    "R U2 R' U' R U R' F2 R U2 R' U2 R' F2 R",
  ] },
  { set: "T", n: 43, sub: 4, cp: "adj", algs: [
    "R' U' R U F U' R' U2 R U F' R' U2 R",
    "R U F R U' R' U' R U2 R2 U' R F' U' R'",
    "R' U' R F' R' F U2 F' R F U R' U2 R",
  ] },
  { set: "T", n: 44, sub: 4, cp: "adj", algs: [
    "R2 U F' U' R' U' R U2 R' U' R F U' R2",
    "R U2 R U F U' R2 U' R2 U F' U' R' U' R'",
    "R' U2 R F U' R' U2 R U F' U2 R' U2 R U",
  ] },
  { set: "T", n: 45, sub: 4, cp: "adj", algs: [
    "R' U R U2 F U R' U' R F' U2 R' U2 R U",
    "R' U' R' U' R' F' R U R2 U' R' F U2 R U'",
    "R' U F2 U2 R U' R' U2 R U' R' U F2 U' R",
  ] },
  { set: "T", n: 46, sub: 4, cp: "adj", algs: [
    "R2 F' U R' U' R F R2 U R' U2 R' U2 R U",
    "R' U2 R U2 F R2 U' R' U R' U' R2 U R F' U'",
    "F' U2 R' U' R U2 F U' F' U2 F R' U R U'",
  ] },
  { set: "T", n: 47, sub: 4, cp: "adj", algs: [
    "F R U R' U' R' F' U2 R U R U' R2 U2 R",
    "R F' U2 F R U F R' F' R' U R U2 R2 U2",
    "R U' F R U R U' R' F' R U2 R U' R' U' R2 U'",
  ] },
  { set: "T", n: 48, sub: 4, cp: "adj", algs: [
    "R' U R F2 R F2 U' F2 U R2 U' R F2 U'",
    "R U' F U2 F' R' U2 R' U' F U F' R2 U2 R' U",
    "R U R' U2 F2 U2 F2 U F2 U F2 R U2 R' U2",
  ] },
  { set: "T", n: 49, sub: 5, cp: "adj", algs: [
    "R U2 R' F2 R U2 R' U2 R' F2 R",
    "F U' R' U2 R U F' U' R' U2 R U2",
    "F' R' F U2 F' R F R' U2 R U2",
  ] },
  { set: "T", n: 50, sub: 5, cp: "adj", algs: [
    "R F R' U2 R F' R' F U2 F' U'",
    "R U2 R F2 R' U2 R' U2 R2 F2 R2 U2",
    "R' U F U2 F' U' R U F U2 F' U'",
  ] },
  { set: "T", n: 51, sub: 5, cp: "adj", algs: [
    "R F R' U R U2 R' U R U F' R' U2",
  ] },
  { set: "T", n: 52, sub: 5, cp: "adj", algs: [
    "R U2 R F2 U R U R2 U' R' U' F2 R2",
    "F' R' F U' F' U2 F U' F' U' R F U'",
  ] },
  { set: "T", n: 53, sub: 5, cp: "adj", algs: [
    "F R U R' U' R U' R' U' R U R' F' U2",
    "R' F' U' F U R F R' F' R U R U' R'",
    "F2 R U' R' U R U R2 F2 R U R U' R' U2",
  ] },
  { set: "T", n: 54, sub: 5, cp: "adj", algs: [
    "R' F2 R U' R2 F2 R2 U' R' U2 R' F2 R2",
    "R U R2 F U' R2 U' R2 U F' U R2 U2 R' U",
    "R' U2 R' U2 R2 U R F' U' R' U R U F R2 U",
  ] },
  { set: "T", n: 55, sub: 5, cp: "adj", algs: [
    "R U2 F U R2 U' R' U R' U' R' F' U2 R' U",
    "F' U2 R' F R' F2 R F R' F R2 U2 F",
    "R U2 F R' F R2 F' R' F R' F2 U2 R' U",
  ] },
  { set: "T", n: 56, sub: 5, cp: "adj", algs: [
    "R' U' R U' F U' R' U R U F' R' U R U2",
    "F' U2 R' U2 R F U' R U2 R U2 R U2 R U R U2",
    "R F U R2 U' F' R' F R' F' R' U R' U' R2 U2",
  ] },
  { set: "T", n: 57, sub: 5, cp: "adj", algs: [
    "F R' U2 R U R2 U R2 U R2 U2 R U2 R F'",
    "F U R' U' R' U' R' U R' U' R2 U2 R U' F'",
    "F R' U' R2 U' R2 U R' U' R2 U R U R U F'",
  ] },
  { set: "T", n: 58, sub: 5, cp: "adj", algs: [
    "R U2 R2 F2 R U2 R U R2 F2 R2 U R' F2",
    "R U R2 F' U' R' U' R U F R' U' R2 U2 R U2",
    "R' U2 R U2 R' F2 R U' R2 F2 R2 U R' F2 R",
  ] },
  { set: "T", n: 59, sub: 5, cp: "adj", algs: [
    "F U F' R U R' U F U F' U' R U2 R' U'",
    "R' U2 R2 U2 R' F2 R' U2 R U' R2 F2 R2 U' F2",
    "R F2 U R2 U' R' U R' U' R2 U R U' F2 R' U'",
  ] },
  { set: "T", n: 60, sub: 5, cp: "adj", algs: [
    "F R' U R' U' R2 F R U' R' U R U R2 F2 U'",
    "R2 U' F R U R U2 R' U R U2 R2 U' F' U2 R2 U'",
    "F R U F R2 F' U' R U R' U' R' U R' U' F'",
  ] },
  { set: "T", n: 61, sub: 6, cp: "adj", algs: [
    "F' U2 R' U' R U' F U' R' U' R",
    "R' U R U F' U R' U R U2 F U'",
  ] },
  { set: "T", n: 62, sub: 6, cp: "adj", algs: [
    "R' F R U R' U' R' F' R2 U' R' U2 R",
    "F U' F' U' R U' F U' F' U2 R' U2",
    "R U2 F U F' U R' U F U F' U",
  ] },
  { set: "T", n: 63, sub: 6, cp: "adj", algs: [
    "R' U' R U' R' U R F U' R' U2 R U F'",
    "R U F R U' R2 U' R2 U2 R2 U' R F' U' R' U2",
  ] },
  { set: "T", n: 64, sub: 6, cp: "adj", algs: [
    "F R' F R F2 U F U R U R' F'",
    "F' U' F R U R' F R' F' R2 U' R' U'",
    "R U R2 F R F' R U' R' F' U F U'",
  ] },
  { set: "T", n: 65, sub: 6, cp: "adj", algs: [
    "R' F R' F' R2 U' R' U' F' U' F R U",
    "R' F' U F U R U R2 F R F' R U'",
    "F' U' F2 R' F' R F' U F R U' R' U2",
  ] },
  { set: "T", n: 66, sub: 6, cp: "adj", algs: [
    "F U' R' U2 R U F' R' U' R U R' U R U2",
    "R U F R' U R2 U2 R2 U R2 U R' F' U' R'",
    "F' R' F U2 F' R F U R' U' R U R' U R U2",
  ] },
  { set: "T", n: 67, sub: 6, cp: "adj", algs: [
    "F' U2 R' U2 R F R2 U' R' U' R' U2 R' U' R'",
    "R' U' R' U2 R' U' R' U F' U2 R' U2 R F R2 U",
    "F R U' R' U' R U2 R' U' F' R' U' R U' R' U2 R",
  ] },
  { set: "T", n: 68, sub: 6, cp: "adj", algs: [
    "R' U2 R' U2 R' U' F R U R2 U' R' F' U' R2 U",
    "F' U' R' U' R' F R F' U R F U' R U' R'",
    "R U R' U' R U' R2 F2 R U' F2 U R' F2 R",
  ] },
  { set: "T", n: 69, sub: 6, cp: "adj", algs: [
    "R F R U R2 U2 R' U' R U2 R U' R2 F' U R'",
    "F' U2 R' U' R U' F U' R2 U' R' U' R' U R U R2",
    "R U' F R2 U R' U2 R' U R U2 R2 U' R' F' R' U'",
  ] },
  { set: "T", n: 70, sub: 6, cp: "adj", algs: [
    "R U2 R U F' U R U2 R U2 R' U F U' R2 U",
    "R' F' R U2 R' U' R U' R' F U R U2 R' U' R",
    "R' U R F' R U R U' R' F R2 U R U2 R U",
  ] },
  { set: "T", n: 71, sub: 6, cp: "adj", algs: [
    "R U R U2 R U R U R2 F' R' U2 R U2 F U2",
    "R2 F' R' U2 R U2 F U' R U R U2 R U R U",
    "R' U2 F' R2 F R' U2 R F' R' U2 R' U2 F R",
  ] },
  { set: "T", n: 72, sub: 6, cp: "adj", algs: [
    "R2 U F R U R2 U' R' F' U R U2 R U2 R U",
    "R2 F2 R2 U2 R U2 R F2 R U' R2 U' R2 U2 R U'",
    "F' U' F U' R2 U R2 U R2 U2 R2 U2 F' U F U'",
  ] },
  { set: "U", n: 1, sub: 1, cp: "solved", algs: [
    "R' U' R U' R' U2 R2 U R' U R U2 R' U",
    "R U' R2 U R2 U2 R U2 R U2 R U R2 U R' U",
    "R U2 R' U2 R2 U R' U R U2 R2 U' R U R' U",
  ] },
  { set: "U", n: 2, sub: 1, cp: "solved", algs: [
    "R U R' U R' U2 R2 U R2 U R2 U' R' U2",
    "R U' R' U R' U R' U R' U' R2 U R' U2 R",
    "R' U' R2 U' R' U2 R2 U R' U2 R U R2 U2 R' U2 R",
  ] },
  { set: "U", n: 3, sub: 1, cp: "solved", algs: [
    "R' U' R U' R U2 R2 U' R2 U' R2 U R U2",
    "R' U R U' R U' R U' R U R2 U' R U2 R'",
    "R U R2 U R U2 R2 U' R U2 R' U' R2 U2 R U2 R'",
  ] },
  { set: "U", n: 4, sub: 1, cp: "solved", algs: [
    "R U R' U R U2 R2 U' R U' R' U2 R U'",
    "R U' R U R2 U R' U' R' U R' U2 R' U R' U",
    "R U' R2 U2 R2 U R U2 R U2 R2 U2 R' U' R U'",
  ] },
  { set: "U", n: 5, sub: 1, cp: "solved", algs: [
    "R' U2 R' U R' U R2 U2 R2 U' R' U R2 U R'",
    "R U R' U' R U' R' U2 R U' R' U2 R U R' U'",
    "R U2 R' U2 R2 U R' U R' U' R U R U2 R2 U",
  ] },
  { set: "U", n: 6, sub: 1, cp: "solved", algs: [
    "R U2 R U' R U' R2 U2 R2 U R U' R2 U' R",
    "R U R' U R U2 R' U R U2 R' U' R U' R' U2",
    "R U R2 U' R' U2 R U2 R' U2 R' U2 R' U R U'",
  ] },
  { set: "U", n: 7, sub: 1, cp: "solved", algs: [
    "R2 U R2 U2 R' U' R U' R U' R U' R2 U2 R' U",
    "R2 U' R2 U2 R U R' U R' U R' U R2 U2 R U'",
    "R U R' U' R U' R U2 R2 U' R U R' U' R2 U' R2",
  ] },
  { set: "U", n: 8, sub: 1, cp: "solved", algs: [
    "R U' R' U2 R U R2 U2 R' U R2 U' R U2 R U",
    "R U2 R' U' R U' R' U' R U R' U R U2 R' U",
    "R2 U R U R' U2 R' U' R U2 R' U2 R' U R' U",
  ] },
  { set: "U", n: 9, sub: 1, cp: "solved", algs: [
    "R U2 R U2 R' U R' U2 R U2 R U R' U' R' U'",
    "R U2 R' U R' U2 R U2 R U R' U' R' U R U2",
    "R U2 R' U' R U' R' U2 R' U2 R U R' U R U2",
  ] },
  { set: "U", n: 10, sub: 1, cp: "solved", algs: [
    "R U' R U R U' R' U' R U2 R' U2 R' U R' U",
    "R U2 R2 U' R2 U R U2 R' U2 R U2 R2 U2 R' U'",
    "R' U2 R2 U R2 U R U' R U R' U' R U' R' U2",
  ] },
  { set: "U", n: 11, sub: 1, cp: "solved", algs: [
    "R' U R U2 R' U' R2 U2 R U' R2 U R' U2 R' U'",
    "R' U2 R U R' U R U R' U' R U' R' U2 R U'",
    "R2 U R U2 R U2 R' U R' U2 R2 U' R' U R U2",
  ] },
  { set: "U", n: 12, sub: 1, cp: "solved", algs: [
    "R U2 R2 U' R2 U' R' U R' U' R U R' U R U2",
    "R' U R' U' R' U R U R' U2 R U2 R U' R U'",
    "R' U2 R2 U R2 U' R' U2 R U2 R' U2 R2 U2 R U",
  ] },
  { set: "U", n: 13, sub: 2, cp: "diag", algs: [
    "R' U2 R F U' R' U' R U F' U'",
    "R' U2 R U' F' R' F U' F' R F",
    "R' U2 R U2 F U F' R' F U' F' R",
  ] },
  { set: "U", n: 14, sub: 2, cp: "diag", algs: [
    "F U' R' U R U F' R' U2 R U2",
    "F' R' F U F' R F U R' U2 R U2",
  ] },
  { set: "U", n: 15, sub: 2, cp: "diag", algs: [
    "F U2 F' R' U F U F' U' R U2",
    "F U2 F' U R F R' U R F' R' U",
    "F U2 F' U2 R' U' R F R' U R F' U",
  ] },
  { set: "U", n: 16, sub: 2, cp: "diag", algs: [
    "R' U F U' F' U' R F U2 F' U'",
    "R F R' U' R F' R' U' F U2 F' U'",
    "F R' U' R F' R' U R U2 F U2 F' U'",
  ] },
  { set: "U", n: 17, sub: 2, cp: "diag", algs: [
    "F U R2 U2 R2 U2 R2 U R2 U R2 U' R2 F'",
    "F U' R2 U2 R2 U2 R2 U' R2 U R2 U' R2 F'",
    "F R U R2 U' R' U' R2 U R U R U F' U",
  ] },
  { set: "U", n: 18, sub: 2, cp: "diag", algs: [
    "F R2 U R2 U' R2 U R2 U2 R2 U2 R2 U F'",
    "R F' U R' U2 R U' R' U' R U2 F U R'",
    "R' U' R U2 F U R' U' R F' U2 R' U R",
  ] },
  { set: "U", n: 19, sub: 2, cp: "diag", algs: [
    "R' U R U2 F U2 F' U' R' F U' F' R",
    "R' F U F' R U F U2 F' U2 R' U' R U",
    "F U R' U2 R' U2 R U R F' R U R' U' R' U'",
  ] },
  { set: "U", n: 20, sub: 2, cp: "diag", algs: [
    "F R' U' R F' U' R' U2 R U2 F U F'",
    "F U R' U' R U' R' U' R U F' R' U2 R U'",
    "R' U' R U2 F U R' U' R F' U R' U2 R U'",
  ] },
  { set: "U", n: 21, sub: 2, cp: "diag", algs: [
    "F R2 U R2 U R U' R U' R' U2 R' U2 F' U",
    "F U2 R U2 R U R' U R' U' R2 U' R2 F' U'",
    "R' U' R' F' R U R U R U2 R' F R U2 R'",
  ] },
  { set: "U", n: 22, sub: 2, cp: "diag", algs: [
    "F R U2 R U R U R2 U' R U R2 U2 R2 U2 F'",
    "F R2 U R U' R2 U R U R U2 R U2 R2 U2 F'",
    "F R2 U R' U' R2 U2 R2 U2 R' U2 R' U' R' U' F'",
  ] },
  { set: "U", n: 23, sub: 2, cp: "diag", algs: [
    "F R U' R' U2 R' U' R U' R' U2 R2 U2 R' U' F' U2",
    "R' U' R' U' R2 F' R U R' U' R' F U R' U R U",
    "R' F' U' F U R F R' F2 R U2 R U2 R' F",
  ] },
  { set: "U", n: 24, sub: 2, cp: "diag", algs: [
    "F U R U2 R2 U2 R U R' U R U2 R U R' F' U2",
    "R U2 R' U' R2 U F' R U R2 U R2 U2 R' F U' R2",
    "R' U' R U' F' R U R U' R' F R2 U R U R U2",
  ] },
  { set: "U", n: 25, sub: 3, cp: "adj", algs: [
    "R' U2 R U F U' R' U2 R U F'",
    "F' R U2 R' U2 R' F R U2 R U2 R'",
    "R U R2 U' R' F R U R2 U' R' F'",
  ] },
  { set: "U", n: 26, sub: 3, cp: "adj", algs: [
    "F U2 F' R F R' U2 R F' R'",
    "R2 F2 R2 U2 R U2 R F2 R' U2 R' U",
    "F U2 F' U' R' U F U2 F' U' R U",
  ] },
  { set: "U", n: 27, sub: 3, cp: "adj", algs: [
    "R F U' R' U' R U2 R' U' R F' R'",
  ] },
  { set: "U", n: 28, sub: 3, cp: "adj", algs: [
    "F R U' R' U R U R' U R U' R' F'",
    "R U R' U' R' F2 R2 U' R' U' R U R' F2",
    "F R' U2 R2 U R' U' R2 U R' U' R U2 R F'",
  ] },
  { set: "U", n: 29, sub: 3, cp: "adj", algs: [
    "R2 F2 U R U R2 U' R' U' F2 R' U2 R' U",
    "F' R' U F U F' U2 F U F' R F U",
  ] },
  { set: "U", n: 30, sub: 3, cp: "adj", algs: [
    "R' U' R F U' R' U' R U F' U R' U R U",
    "R' U' R' U2 R' U2 R' U2 R' U F' R' U2 R U2 F U2",
    "R' U' F' U F U2 R2 U R2 F' U F R2 U' R' U'",
  ] },
  { set: "U", n: 31, sub: 3, cp: "adj", algs: [
    "R U2 R2 U' F U' R2 U R2 U F' R2 U' R' U",
    "R2 F2 R U2 R U R2 F2 R2 U R' F2 R U'",
    "R2 F' U' R' U' R U F R' U' R2 U2 R U2 R U'",
  ] },
  { set: "U", n: 32, sub: 3, cp: "adj", algs: [
    "R U2 F R U R U' R U R2 U' F' U2 R' U'",
    "R U2 F2 R F' R F R2 F' R F' U2 R' U'",
    "F U2 R U2 R' U R U R' U F' U2 F U' F'",
  ] },
  { set: "U", n: 33, sub: 3, cp: "adj", algs: [
    "F' U2 F U' R' U R U F' U F R' U R",
    "F2 R' U R' U' R2 F' R U' R' U R U R2 F'",
    "F R' U2 R' U2 R2 U' R2 U' R2 U' R' U2 R F' U2",
  ] },
  { set: "U", n: 34, sub: 3, cp: "adj", algs: [
    "F2 R2 U' R' U' R U R' F' R2 U R U' R F'",
    "R2 U2 F U R2 U2 R' U' R U2 R' U' R' F' U R2",
    "F U F' R' U F U F' U' R U' F U' F'",
  ] },
  { set: "U", n: 35, sub: 3, cp: "adj", algs: [
    "R' U2 R2 U R F' U' R' U R U F R2 U' R' U'",
    "F2 R U' R2 F2 R2 U' R' U2 R' F2 R2 U2 R' U'",
    "F2 U' R2 F2 R2 U' R' U2 R F2 R U2 R2 U2 R U",
  ] },
  { set: "U", n: 36, sub: 3, cp: "adj", algs: [
    "F' R U R' U' R' F R' U R2 U R U' R U' R2",
    "R U R2 U R U' F' U R' U' R F U R U2 R'",
    "F' U F U2 R U' R U2 F R F' U2 R' U R'",
  ] },
  { set: "U", n: 37, sub: 4, cp: "adj", algs: [
    "R' U2 R U2 F U' R' U R U F' U'",
    "R' U2 R U F' R' F U F' R F",
  ] },
  { set: "U", n: 38, sub: 4, cp: "adj", algs: [
    "R2 U F' R2 U R2 U2 R2 U' R2 U F U' R2",
    "R U R' F' U R' U' R F R' U R2 U2 R' U'",
    "R' U2 F' R' U2 R U2 F U' R' U R U' R U2",
  ] },
  { set: "U", n: 39, sub: 4, cp: "adj", algs: [
    "R2 U F' R2 U' R2 U' R2 U2 R2 U' F U' R2",
    "F U2 R' U' R F' R' U2 F U F' U' R",
  ] },
  { set: "U", n: 40, sub: 4, cp: "adj", algs: [
    "F' U2 R' U' R F U' R' U2 R F' U2 F",
    "R' F R' F' R2 F R2 U2 R' U2 R U2 R U2 F' U2",
  ] },
  { set: "U", n: 41, sub: 4, cp: "adj", algs: [
    "R U R U2 F2 U2 R' U' R U' F2 U R2 U",
    "F' R2 U' R F2 R' U R U' F2 U R F",
    "R U' R2 U' F U F' R2 F U' F' U2 R' U2",
  ] },
  { set: "U", n: 42, sub: 4, cp: "adj", algs: [
    "R2 U R' U' R2 U' R F U' R2 U2 R2 U F' R'",
    "F' R' F U2 R2 U2 R2 U' R2 U' R2 U F' R F",
    "R2 F2 R2 U R U2 R' U' R U R F2 R' U2 R' U",
  ] },
  { set: "U", n: 43, sub: 4, cp: "adj", algs: [
    "R U2 F' U2 R' U R U2 R' U' R U2 F U R' U'",
    "F R' F' U2 R U R U' R2 U F' U F R U2",
    "F' U F R' F2 U' R F' R' U F' R F' U'",
  ] },
  { set: "U", n: 44, sub: 4, cp: "adj", algs: [
    "R2 U R U R2 U2 R' F R2 U R2 U' F' U2 R' U2",
    "R2 U R' U2 R F' R' U' R U R' U2 R U' F R2",
    "F2 R U' R' U' R U2 R2 U' R F2 U' R' U2 R U",
  ] },
  { set: "U", n: 45, sub: 4, cp: "adj", algs: [
    "R U R2 U2 R U2 F U' R' U R U F' R U' R'",
    "R U2 R U R U' R' F R2 U R2 U' F' U2 R' U2",
    "R U2 R2 U' R F' U' R' U2 R U F R U' R' U2",
  ] },
  { set: "U", n: 46, sub: 4, cp: "adj", algs: [
    "R2 U F U R' U' R F' U2 R' U' R' U R2 U R2",
    "R F R2 U R' U' R U' R2 U2 R2 U R F' U R' U2",
    "R2 U2 F R' U R' U' R2 F' R' U2 R2 U2 R' U2 R U",
  ] },
  { set: "U", n: 47, sub: 4, cp: "adj", algs: [
    "R F R F' U R' U' R2 U R F' U' F U' R2",
    "F2 R2 U2 R U2 R F2 R' U R' U R' U2 R' U2 R'",
    "R' U' R U F U' R2 U' R2 U R U R2 U' R' F' U'",
  ] },
  { set: "U", n: 48, sub: 4, cp: "adj", algs: [
    "R' U' R U R' U R U2 F R' U R U' F' R' U2 R",
    "F U' R U' R' F U' F' U' R U' R' F U' F2",
    "R2 U R U' R' F2 U' R2 U2 R2 U F2 R' U' R U R'",
  ] },
  { set: "U", n: 49, sub: 5, cp: "adj", algs: [
    "F U2 F' U' F R' U' R F' R' U R",
    "F U2 F' U2 R' U F U' F' U' R U2",
    "R F' U R' U F U F' U' R U2 F R'",
  ] },
  { set: "U", n: 50, sub: 5, cp: "adj", algs: [
    "R' F2 R2 U R U' R F2 R' U R' U' R'",
    "R2 U R' U' R2 F R2 U R U' R F' R U2",
    "R2 U2 R F' R' U R U' F U R' U R2 U2",
  ] },
  { set: "U", n: 51, sub: 5, cp: "adj", algs: [
    "R F2 R' U R2 U2 R2 U R2 U R' F2 R' U",
    "R2 F' R U2 R U2 R' F U' R U R' U' R U2",
    "R2 F' U' R' U' R U F R2 U' R' U2 R U2 R U",
  ] },
  { set: "U", n: 52, sub: 5, cp: "adj", algs: [
    "R2 U' R F' R' U R U' F R U' R' U2 R U'",
    "R2 U' R2 F U' R2 U R2 U F' U' R2 U R2 U'",
    "F2 R' F U' F' R F U' R' U2 R U' F",
  ] },
  { set: "U", n: 53, sub: 5, cp: "adj", algs: [
    "R U' R2 U' R2 F' R U R' U' R' F U2 R' U",
    "R U2 F U F' R' U F U2 F' R U2 R' U",
    "R' F U F' R F U2 R' U' R U F' R' U R U'",
  ] },
  { set: "U", n: 54, sub: 5, cp: "adj", algs: [
    "R U' R' F R2 U F' R F U' R F' R U2",
    "R F' U R' U R F R' U' R U F' U2 F R'",
    "R' U R U' R2 U' F R' F' R2 F R' F' U R2",
  ] },
  { set: "U", n: 55, sub: 5, cp: "adj", algs: [
    "R' U2 F U F' R F U2 R' U' R U F' U",
    "F' R U2 R U2 R' F U' R' U R2 U2 R' U2 R' U",
    "F U' R F R' F' U' R U2 F' R U2 R' U2 R' U2",
  ] },
  { set: "U", n: 56, sub: 5, cp: "adj", algs: [
    "R U R' U2 F2 R U2 R' U2 R' F2 R2 U R' U'",
    "F R U R2 F R F' R' U2 R2 U R2 U R F' U2",
  ] },
  { set: "U", n: 57, sub: 5, cp: "adj", algs: [
    "R U R' U R U2 R2 U R U' F U R' U' R F'",
    "F R U2 R2 U' R2 U' R' F U' R' U' R U F2 U",
    "R U F' R' U R U' R U2 R U2 R' F U' R2 U' R",
  ] },
  { set: "U", n: 58, sub: 5, cp: "adj", algs: [
    "F U R2 U' R' U R2 U' R2 U R U2 R2 U R2 U F'",
    "R U R2 U' R2 U R U' F R2 U' R2 U R2 U R2 F'",
    "R2 U R2 F R U R' U' R' F' U2 R' U2 R' U' R2 U'",
  ] },
  { set: "U", n: 59, sub: 5, cp: "adj", algs: [
    "R U R2 U R' U2 R2 U R F U' R2 U2 R2 U F' U'",
    "R' U R U R2 U' F R' U' R' U R U R F' U' R",
    "R' U R U' R' F' U' R' U2 R2 U R' U' R' U2 F R2",
  ] },
  { set: "U", n: 60, sub: 5, cp: "adj", algs: [
    "F U R U2 R' U R U2 R2 F R F' R U' R' F'",
    "R' U F' U F R' U R U F' U F R' U R2 U",
    "R2 U2 F' R2 F R2 U' R2 U' F' U R2 U' F R2 U'",
  ] },
  { set: "U", n: 61, sub: 6, cp: "adj", algs: [
    "R U' R2 U' R2 U R' F' R U R2 U' R' F R2",
    "R2 F' R U R2 U' R' F R U' R2 U R2 U R'",
    "R U' R F' R' U R U F U' F' U' F R2",
  ] },
  { set: "U", n: 62, sub: 6, cp: "adj", algs: [
    "R U R' U R' F2 U' R2 U' R2 U F2 U R U",
    "F R U R' U' R2 U R2 F' R F R U' R F' R",
    "R2 F2 R U' F2 U R' F2 R U2 R U R' U' R U2",
  ] },
  { set: "U", n: 63, sub: 6, cp: "adj", algs: [
    "R' U' F2 U' R2 U R2 U F2 R U' R U' R' U2",
    "F' U' F U' F R2 U F2 U F2 U' R2 U' F'",
    "R' U R U' R' U2 R' F2 R U' F2 U R' F2 R2 U'",
  ] },
  { set: "U", n: 64, sub: 6, cp: "adj", algs: [
    "R F2 R2 U' R U' R' U R2 F2 R' U2 R' U' R",
    "F2 R U2 R U2 R2 U2 R' U2 R2 F2 R' U2 R' U2 R2",
    "F2 R2 U2 R U2 R F2 R2 U2 R U2 R2 U2 R' U2 R'",
  ] },
  { set: "U", n: 65, sub: 6, cp: "adj", algs: [
    "R2 U R' U' R' F R' U' R' U R U2 R U' F' R'",
    "R F U R' U2 R' U' R U R F' R U R U' R2 U'",
    "R U2 R' U F2 R U' R2 F2 R2 U R' F2 R U R'",
  ] },
  { set: "U", n: 66, sub: 6, cp: "adj", algs: [
    "R F R U' R F' R U2 F R2 U2 R' U' R' F'",
    "R U R U R2 F' U F U R2 U2 R F R F'",
    "R2 F' R2 F R U2 R' F' R2 F R2 U R' U R",
  ] },
  { set: "U", n: 67, sub: 6, cp: "adj", algs: [
    "R' U2 R' U' F' U F R2 U' R' F R' F' R2 U",
    "R U R' U R U' R' U F2 R U2 R' U2 R' F2 R",
    "R U2 R F2 R U' R2 U' R2 U2 R U' R2 F2 R2 U",
  ] },
  { set: "U", n: 68, sub: 6, cp: "adj", algs: [
    "R2 F R F' R U R2 F' U' F U R U2 R U",
    "R U R' U R' U F2 U' R2 U2 R2 U F2 U' R U",
    "R2 F2 R2 U R' U2 R2 U R2 U R' F2 R' U2 R' U",
  ] },
  { set: "U", n: 69, sub: 6, cp: "adj", algs: [
    "R U2 R' U' R2 U' R F2 R' U R' U' R2 F2 R U'",
    "F2 R' F' R F' U' F2 R U R' U' F' U2 F'",
    "F R U R U2 R2 F' U2 R' F R' U R' F' R' U'",
  ] },
  { set: "U", n: 70, sub: 6, cp: "adj", algs: [
    "R2 U R2 U' R2 U' R F2 U' R2 U R2 U F2 U2 R'",
    "R' U' R F' R U R U' R' F R2 U R2 U2 R' U2 R",
    "R2 U' R2 F' R U R' U' R' F R' U R U2 R' U2 R",
  ] },
  { set: "U", n: 71, sub: 6, cp: "adj", algs: [
    "F R' U' R' U R U2 R U' F' R' U R2 U R' U' R'",
    "R U R U' R2 U' R F U R' U2 R' U' R U R F'",
    "F' U2 R U' R' U' F R' U2 R U2 R' F' R' F R2",
  ] },
  { set: "U", n: 72, sub: 6, cp: "adj", algs: [
    "F R2 U' R2 U' R2 U F U F' R2 F U' F2 U",
    "F' U F' R F U' F' U' R' U R U R' F2 U",
    "F2 R U' R' U' R U F U F' R' F U' F U",
  ] },
  { set: "L", n: 1, sub: 1, cp: "solved", algs: [
    "R2 U' R U' R U R' U R U R' U' R' U R2",
    "R2 U2 R' U2 R U2 R' U' R2 U R2 U2 R' U R",
    "R U' R U2 R U' R' U R U' R2 U' R' U2 R' U2",
  ] },
  { set: "L", n: 2, sub: 1, cp: "solved", algs: [
    "R U2 R' U' R U' R' U2 R U R' U R U2 R'",
    "R' U2 R U R' U R U2 R' U' R U' R' U2 R U",
    "R U R2 U R2 U2 R U2 R' U R U' R U2 R U R",
  ] },
  { set: "L", n: 3, sub: 1, cp: "solved", algs: [
    "R' U' R U2 R2 U' R2 U R U2 R' U2 R U2 R2",
    "R U2 R U R2 U R' U' R U R' U2 R' U R' U2",
    "R' U2 R2 U2 R U' R U R' U2 R' U2 R' U2 R U'",
  ] },
  { set: "L", n: 4, sub: 1, cp: "solved", algs: [
    "R U R' U R U2 R' U2 R U2 R' U' R U' R'",
    "R' U' R U' R' U2 R U2 R' U2 R U R' U R U",
    "R U' R2 U' R U2 R2 U R' U R' U R2 U' R U2 R2",
  ] },
  { set: "L", n: 5, sub: 1, cp: "solved", algs: [
    "R' U2 R U R' U R U' R U2 R' U' R U' R'",
    "R2 U' R U' R U2 R U R U' R2 U' R' U R2",
    "R2 U2 R2 U' R U2 R2 U' R' U R' U R' U R'",
  ] },
  { set: "L", n: 6, sub: 1, cp: "solved", algs: [
    "R U' R' U2 R' U2 R U' R U2 R' U2 R' U' R",
    "R' U' R2 U2 R2 U R U' R U R2 U2 R2 U' R'",
    "R' U2 R U2 R U R' U R U2 R' U2 R' U' R",
  ] },
  { set: "L", n: 7, sub: 1, cp: "solved", algs: [
    "R' U R2 U' R' U2 R2 U' R' U2 R' U2 R' U R2",
    "R' U' R U' R' U2 R U' R U R' U R U2 R'",
    "R U2 R' U R' U2 R' U2 R U2 R' U' R2 U R U'",
  ] },
  { set: "L", n: 8, sub: 1, cp: "solved", algs: [
    "R U' R U' R2 U R2 U R2 U R' U' R U R",
    "R U R' U R U2 R' U R' U' R U' R' U2 R U",
    "R U' R2 U R U2 R2 U R U2 R U2 R U' R2 U",
  ] },
  { set: "L", n: 9, sub: 1, cp: "solved", algs: [
    "R U2 R' U2 R' U2 R' U R U' R U2 R2 U2 R' U'",
    "R' U R' U2 R' U R U' R' U R2 U R U2 R U'",
    "R2 U R' U R' U' R U' R' U' R U R U' R2 U",
  ] },
  { set: "L", n: 10, sub: 1, cp: "solved", algs: [
    "R U R U' R' U R2 U R2 U R2 U' R U' R U'",
    "R U2 R' U' R U' R' U R' U2 R U R' U R U",
    "R' U' R2 U R U2 R' U2 R U2 R U' R U2 R' U'",
  ] },
  { set: "L", n: 11, sub: 1, cp: "solved", algs: [
    "R U R' U R U' R' U R U' R' U R U2 R' U2",
    "R U2 R' U' R U R' U' R U R' U' R U' R' U2",
    "R' U' R U' R' U R U' R' U R U' R' U2 R U'",
  ] },
  { set: "L", n: 12, sub: 1, cp: "solved", algs: [
    "R U R' U2 R2 U R2 U' R' U2 R U2 R' U2 R2 U",
    "R U2 R2 U2 R' U R' U' R U2 R U2 R U2 R' U2",
    "R' U2 R' U' R2 U' R U R' U' R U2 R U' R U'",
  ] },
  { set: "L", n: 13, sub: 2, cp: "diag", algs: [
    "F U' R' U R U F' U R' U R",
    "R U F' U R' U R U2 F U' R' U'",
    "R U F' U2 R' U' R U' F U' R' U2",
  ] },
  { set: "L", n: 14, sub: 2, cp: "diag", algs: [
    "R F R' U' R F' R' U2 F U' F'",
    "R' U F U' F' U' R U' F U' F'",
    "F R F' U R' U R U2 F R' F' U'",
  ] },
  { set: "L", n: 15, sub: 2, cp: "diag", algs: [
    "F R U R' F R' F' R2 U' R' F' U2",
    "F R U R2 F R F' R U' R' F' U'",
    "R' F' U' F R' F R F2 U F R U2",
  ] },
  { set: "L", n: 16, sub: 2, cp: "diag", algs: [
    "F U2 F' R' U F U F' U R U R' U R",
    "F U F' U F U R' U R U F' R' U2 R U2",
    "R' U2 R F R2 U R U' R F' U2 R U R U' R' U'",
  ] },
  { set: "L", n: 17, sub: 2, cp: "diag", algs: [
    "R' U2 R F U' R' U' R U' F' U' F U' F'",
    "R' U' R U' R' U' F U' F' U' R F U2 F' U2",
    "R U R' U' R' U2 F R' U R' U' R2 F' R' U2 R U'",
  ] },
  { set: "L", n: 18, sub: 2, cp: "diag", algs: [
    "R' U R2 F2 R2 U R U R' U2 R2 F2 R2 U' R",
    "R' U2 R' U2 R U R2 F U' R' U R U F' R2 U2",
    "F' U2 R2 U F' R2 U R2 U' F U' R2 U' F U'",
  ] },
  { set: "L", n: 19, sub: 2, cp: "diag", algs: [
    "R' F2 R2 U' F U2 R U R' F' U2 R2 F2 R",
    "R2 F U' R' U' R U F' R2 U' R' U2 R U2 R U2",
    "F' U R2 U F' U R2 U' R2 F U' R2 U2 F U",
  ] },
  { set: "L", n: 20, sub: 2, cp: "diag", algs: [
    "F R U R' U' R' F R2 U' R' U' R U R' F2",
    "F2 R U' R' U R U R2 F' R U R U' R' F'",
    "R U R' F' R U2 R' U' R U' R' F U R U2 R' U2",
  ] },
  { set: "L", n: 21, sub: 2, cp: "diag", algs: [
    "R' F' U2 R' U2 R F U' R' U' R2 U' R' U2 R U2",
    "R2 U R2 U R U' R F' U' R' U2 R U F U' R2",
    "R2 U' R U F' U2 R' U2 R F U2 R U' R' U2 R",
  ] },
  { set: "L", n: 22, sub: 2, cp: "diag", algs: [
    "R' U2 R U R' U2 F' R' U2 R U2 F U' R' U R2",
    "R F2 U R2 U R U' R U' R' U2 R' U2 R2 F2 R'",
    "R U R2 U' R' U' F R2 U R U' R F' U R' U R",
  ] },
  { set: "L", n: 23, sub: 2, cp: "diag", algs: [
    "R U2 R' F R U2 R' U' R' U2 R U R' U F' R",
    "R' U' R' U' R2 F' R U R' U' R' F R' U2 R U2",
    "R' U2 R F' R U R U' R' F R2 U R U R U2",
  ] },
  { set: "L", n: 24, sub: 2, cp: "diag", algs: [
    "R' U2 R U F R2 U' R' U R' U' R2 U2 R U' F'",
    "F U R' U2 R2 U R U' R U R2 F' U' R' U2 R U'",
    "R2 U' R2 U R2 U R2 F' R U R2 U' R' F R' U R",
  ] },
  { set: "L", n: 25, sub: 3, cp: "adj", algs: [
    "F U R' U' R F' R' U R",
    "R' F R U R' U' R' F' R U R U2",
    "R2 U' R F' R' U R U' F U R U",
  ] },
  { set: "L", n: 26, sub: 3, cp: "adj", algs: [
    "R' U' R F U' R' U2 R U F'",
    "F R U' R' U' R U2 R' U' F' U2",
  ] },
  { set: "L", n: 27, sub: 3, cp: "adj", algs: [
    "F' R U R U' R' F U' R2 U2 R U2 R",
    "R' F U' R' U R U F' R' U2 R U2 R",
    "R' U' R U R' F2 R U2 R' U2 R' F2 R2 U'",
  ] },
  { set: "L", n: 28, sub: 3, cp: "adj", algs: [
    "F' R U2 R' U2 R' F R U R U' R' U2",
    "R' F' U' F U2 F' U' F R U R' U2 R",
  ] },
  { set: "L", n: 29, sub: 3, cp: "adj", algs: [
    "R' U' R U' R' U R F R' U R U' F'",
    "R2 U' R2 U' F' U R' U' R F R2 U2 R U' R",
    "R' U' F' R' F R U' R' F' R F U2 R U'",
  ] },
  { set: "L", n: 30, sub: 3, cp: "adj", algs: [
    "R' U' R F U' R' U' R U F' R' U2 R U'",
    "R' U' R2 U' R2 F' R' U R U' F R U2 R",
    "R U R2 F' U R' U' R F R2 U R' U2 R' U'",
  ] },
  { set: "L", n: 31, sub: 3, cp: "adj", algs: [
    "R U2 R2 U2 R2 U R F R U R2 U' R' F'",
    "R2 U R2 F R2 F' U2 R2 F' U2 F U R2",
    "R' U' R U' R2 U2 R F U' R' U' R U F' R",
  ] },
  { set: "L", n: 32, sub: 3, cp: "adj", algs: [
    "R U2 R' U' R' U' R' F R U R2 U' R' F'",
    "R' U2 R F U' R' U R U F' U' R' U2 R",
    "F R' U' R' U' R2 U R U R2 U' R' U2 F' U2",
  ] },
  { set: "L", n: 33, sub: 3, cp: "adj", algs: [
    "F U2 R' U R2 U R U' R U R U2 R U2 F'",
    "F' U R' U R U2 F U R' U' R U' R' U R",
    "R U' R' F R' U' R' U2 R U2 R U' F' U2 R",
  ] },
  { set: "L", n: 34, sub: 3, cp: "adj", algs: [
    "R2 U2 F' U R' U' R F U R U R U' R U'",
    "F R' U R F' U2 R' U' R U2 R' F U' F' R",
    "R' U F' R F U R' U2 R U F' R' F R U2",
  ] },
  { set: "L", n: 35, sub: 3, cp: "adj", algs: [
    "R U' F U' R U2 R2 U R2 U R' U F' U2 R' U2",
    "R2 F U' F2 U R2 U' R2 F R2 F U F' U",
    "F' U2 F R2 U R2 U R2 U2 R2 U2 F' U F U'",
  ] },
  { set: "L", n: 36, sub: 3, cp: "adj", algs: [
    "F' R U2 R' U2 R' F U2 R U R U' R2 U2 R U2",
    "R U2 F R2 U' R' U2 R' U R U R U R2 F' R'",
    "R U2 R2 U' R' U2 F R' U R U' F' U2 R U R",
  ] },
  { set: "L", n: 37, sub: 4, cp: "adj", algs: [
    "R' F' R U2 R U2 R' F R U2 R'",
    "R' U' F U F' R F U' F' U",
    "R' U' R F' R' F U F' R F",
  ] },
  { set: "L", n: 38, sub: 4, cp: "adj", algs: [
    "F U F' R' U F U2 F' U' R U",
    "F U F' U R F R' U2 R F' R'",
    "R' F' U F U F' U2 F U R U'",
  ] },
  { set: "L", n: 39, sub: 4, cp: "adj", algs: [
    "F R U R' U' R' F' R U2 R U2 R' U2",
    "F U' F' U2 F U R U R' U2 R U R' F'",
    "R' U' F U F' U' R U F U' F' R' U R",
  ] },
  { set: "L", n: 40, sub: 4, cp: "adj", algs: [
    "R2 U R2 U' R' U' F R2 U R2 U' F' R' U2",
    "R U' R F' R' U R U' F U' R2 U R2 U R2",
    "R2 F' R U' R U2 R' U F U2 F' R' F R2",
  ] },
  { set: "L", n: 41, sub: 4, cp: "adj", algs: [
    "R' U2 R U2 F U' R' U2 R U F' R' U2 R",
    "R2 U F' R' U R U2 R' U R U F U' R2 U2",
    "R2 U' R2 F' U2 F U2 R2 F R2 F' U' R2 U2",
  ] },
  { set: "L", n: 42, sub: 4, cp: "adj", algs: [
    "R' U2 R U2 R U' R2 F' R' U R U' F R2",
    "F R' U' R2 U R U' R U R2 F' U2 R' U2 R U",
    "R' U' R F' U2 F U F' U2 R' U R U2 F U'",
  ] },
  { set: "L", n: 43, sub: 4, cp: "adj", algs: [
    "R F U' R' U R U R' U R U' F' R' U2",
    "R U' F R' U R U' F' U2 R' U R U' R' U2",
    "R' U R U2 F U R' U' R F' U' R' U R U'",
  ] },
  { set: "L", n: 44, sub: 4, cp: "adj", algs: [
    "R2 F' U R' U' R F R2 U R' U' R' U R U'",
    "R F' R U R' U' R' U R' U' R F R2 U R U'",
    "R U R' U F U' F' U' R F U2 F' U R' U2",
  ] },
  { set: "L", n: 45, sub: 4, cp: "adj", algs: [
    "R' U2 R F U' R' U2 R U F' U' R' U R U'",
    "F U' F' U' R U' F U' F' R' U' R U' R'",
    "R U F R' U R2 U2 R' U R U R' F' U' R' U2",
  ] },
  { set: "L", n: 46, sub: 4, cp: "adj", algs: [
    "R' U2 F' R U R2 U' R' F R U R U R U2",
    "R' U2 R U2 F R' U R U' F' U2 R' U' R U'",
    "R' U2 R F U F' R2 F U' F' U R U R U2",
  ] },
  { set: "L", n: 47, sub: 4, cp: "adj", algs: [
    "F2 R' U R2 U' F2 U F2 R' F2 R' U' R",
    "R U2 R2 F U' F' U R U2 R F U2 F' U R' U",
    "R U2 R' F2 U' F2 U' F2 U2 F2 U2 R U' R' U2",
  ] },
  { set: "L", n: 48, sub: 4, cp: "adj", algs: [
    "R' U2 R2 U R' U' R' U2 F R U R U' R' F' U'",
    "R2 U2 R' U' R F R F' U' R' F' U2 F R' U2",
    "R2 U R U R' U2 R' F R U R' U' R' F' U R' U2",
  ] },
  { set: "L", n: 49, sub: 5, cp: "adj", algs: [
    "R F R' U R F' R' U F U2 F' U2",
    "R' U F U F' U' R U2 F U2 F' U2",
    "R' U' R F R' U R F' U F U2 F' U2",
  ] },
  { set: "L", n: 50, sub: 5, cp: "adj", algs: [
    "R' F R' U R' U' R2 F' R2 U R U' R2 U",
    "R2 U' R U' F' U R' U' R F R' U2 R2 U",
    "R' U2 F' R F R' U2 R F' R' F R U",
  ] },
  { set: "L", n: 51, sub: 5, cp: "adj", algs: [
    "R' U2 R U R' F' U R' U' R F R' U R2",
    "R2 U' R2 U F U' R2 U' R2 U F' R2 U R2",
    "R' U2 R' F R2 U R U' R F' R' U R2 U R",
  ] },
  { set: "L", n: 52, sub: 5, cp: "adj", algs: [
    "R U2 R' F U2 F' U' R F U' F' U2 R'",
    "R U2 F' R U R U' R' F R2 U R2 U R' U",
    "R U2 R F U F' R F U' F' R U R2 U R' U",
  ] },
  { set: "L", n: 53, sub: 5, cp: "adj", algs: [
    "R F2 R U' R2 U' R2 U2 R2 U' R F2 R' U'",
    "R' U R U' R' U F' R U2 R' U2 R' F R2 U2",
    "R' U2 R' U2 R U R2 F' U' R' U R U F R2 U",
  ] },
  { set: "L", n: 54, sub: 5, cp: "adj", algs: [
    "R U2 R U2 R2 U' R U F' R U2 R' U2 R' F",
    "F U' R' U R U2 F' R' F U' F' U2 R U",
    "R U' R U F' U' F U2 F' U' F U2 R' U R'",
  ] },
  { set: "L", n: 55, sub: 5, cp: "adj", algs: [
    "R' F R' U F' R' F U' R2 F' R U R' U",
    "F R U R' U F2 U' F U F U2 R' F' R",
    "R2 F2 R2 U' R' U' R U R' F2 R U2 R' U2 R U2",
  ] },
  { set: "L", n: 56, sub: 5, cp: "adj", algs: [
    "R U' R2 F2 R U2 R U2 R' F2 U2 R U' R' U2",
    "F R' U' R2 U' R2 U2 R F R' F' R2 U' R' F' U2",
    "F' U2 F U F' U F2 U' R' U2 R U F' R' U R",
  ] },
  { set: "L", n: 57, sub: 5, cp: "adj", algs: [
    "F' R U R U' R' F R' U' R' U2 R2 U R' U R",
    "F2 U' R' U R U F' R U R2 U R2 U2 R' F' U",
    "F R' U R U' F' U R' U' R2 U2 R' U' R U' R' U'",
  ] },
  { set: "L", n: 58, sub: 5, cp: "adj", algs: [
    "R2 F' U R2 U' F U R2 U R2 F' R2 F U2 R2",
    "F R U R' F R' F' R2 U2 R' U' R U2 R' U' F'",
    "F' R U2 R U2 R2 F R2 U2 R2 F' R U2 R' U2 F",
  ] },
  { set: "L", n: 59, sub: 5, cp: "adj", algs: [
    "R' F' U' R' F' U' R' F' R F U R F U R",
    "R' U2 R F U' R' U R U F' R' U' R U R' U R",
    "R2 U R U2 R U2 F R U R U' R' F' R2 U' R2 U'",
  ] },
  { set: "L", n: 60, sub: 5, cp: "adj", algs: [
    "F U' R2 U2 R2 U F' R' U' R2 U2 R U' R2 U' R' U2",
    "R' U2 R U F R U R U' R U R2 U' F' R' U R",
    "R2 F' U2 R U R U' R2 U2 R U F R U R' U' R",
  ] },
  { set: "L", n: 61, sub: 6, cp: "adj", algs: [
    "F U' R' U' R U F' U2 R' U2 R U'",
    "F' R' F U' F' R F U' R' U2 R U'",
    "R' F' R U R' U' R' F R2 U' R' U2 R U'",
  ] },
  { set: "L", n: 62, sub: 6, cp: "adj", algs: [
    "R' U F U' F' U2 R F R' U R U2 F'",
    "R2 U F' U R2 U2 R2 U R2 U R2 F U' R2 U2",
    "R2 F U' F2 U' R2 U R2 U F R2 F U F'",
  ] },
  { set: "L", n: 63, sub: 6, cp: "adj", algs: [
    "F U2 R F' R' F U2 F' R F R' F'",
    "R2 U' F2 U R' U R U2 F2 U2 R' U' R' U2",
    "F U2 R U F U' R' U2 R U F' U' R' F'",
  ] },
  { set: "L", n: 64, sub: 6, cp: "adj", algs: [
    "R U2 R2 U' R F' R' U R U' F R U' R' U2",
    "R' U R' U' R U F' U2 R' U2 R F U2 R U2",
    "R2 U F' U' R2 U R2 U2 R2 U' R2 F U' R2 U2",
  ] },
  { set: "L", n: 65, sub: 6, cp: "adj", algs: [
    "F' U2 F R' U2 R U F' R' U R U2 F U",
    "F U2 R' U2 R' U2 R U2 R2 F' R2 F R F' R",
    "F' U2 R F' U' F' U F R' F2 U' F2 U' F",
  ] },
  { set: "L", n: 66, sub: 6, cp: "adj", algs: [
    "F R' F U' R F R' U F2 R F' U' F",
    "R U' F' U2 R' U R U2 R' U' R U2 F U2 R' U",
    "R' F' U' F U' R2 U R' U' R' U2 F R F' U",
  ] },
  { set: "L", n: 67, sub: 6, cp: "adj", algs: [
    "R F U' R2 U2 R2 U F' R' U R2 U R U' R2 U",
    "R U2 R F2 R' U' R' U R U2 R' U' R2 F2 R2 U",
    "F' R' F U' R2 U R2 U R2 U2 R2 U2 F' R F U2",
  ] },
  { set: "L", n: 68, sub: 6, cp: "adj", algs: [
    "R U R' F U' R' U' R U F' U2 R' U2 R2 U' R'",
    "R U R' F' U' R' U2 R U F R' U R2 U2 R' U'",
    "R U2 F U R2 U' R2 F' R U R' U' R' U2 R' U2",
  ] },
  { set: "L", n: 69, sub: 6, cp: "adj", algs: [
    "R U2 F U R2 U' R2 F' R U2 R2 U' R' U' R2 U2",
    "F2 R2 U R U' R F2 R2 U R U R2 U' R' U R'",
    "R F2 U' R' U R' U R U2 R' U R2 U F2 R' U'",
  ] },
  { set: "L", n: 70, sub: 6, cp: "adj", algs: [
    "R2 U F' U F R' U' R2 U R U' F R' F' R'",
    "R U2 R U2 R U' R U' R F2 R' U2 R' U2 R2 F2",
    "F R U R2 U' R' U' R2 U R2 U F' U' R' U R U'",
  ] },
  { set: "L", n: 71, sub: 6, cp: "adj", algs: [
    "R2 U' R' F2 U' R2 U R2 U F2 U' R' U R U2 R",
    "R U' F R' U' R2 U2 R2 U R' U R U' R2 F' R' U'",
    "R' U2 R U2 R2 U2 R F R2 U R U' R F' U2 R2 U",
  ] },
  { set: "L", n: 72, sub: 6, cp: "adj", algs: [
    "R' U2 R F U R' U' R F' U2 R' U' R U' R' U R",
    "R2 U F' U R' U R U2 R' U2 R U2 F U' R' U2 R'",
    "F2 U F' R U R' U F U F' R U R' U F' U'",
  ] },
  { set: "H", n: 1, sub: 1, cp: "solved", algs: [
    "R U2 R' U' R U R' U' R U' R'",
  ] },
  { set: "H", n: 2, sub: 1, cp: "solved", algs: [
    "R U R' U R U' R' U R U2 R' U'",
    "R U R2 U R2 U R2 U' R U2 R2 U R' U' R2",
    "R U2 R2 U2 R2 U R2 U R2 U R' U' R U' R'",
  ] },
  { set: "H", n: 3, sub: 1, cp: "solved", algs: [
    "R' U' R U' R' U R U' R' U2 R U",
    "R U2 R2 U2 R2 U R' U R2 U R2 U' R U R",
    "R' U' R2 U' R2 U' R2 U R' U2 R2 U' R U R2",
  ] },
  { set: "H", n: 4, sub: 1, cp: "solved", algs: [
    "R' U2 R U R' U' R U R' U R U2",
    "R U R U' R2 U R2 U2 R U2 R' U' R' U' R",
    "R' U' R U' R' U R2 U R2 U R2 U2 R2 U2 R",
  ] },
  { set: "H", n: 5, sub: 1, cp: "solved", algs: [
    "R' U2 R2 U2 R U2 R' U2 R U2 R2 U2 R' U",
    "R U2 R U2 R2 U' R U R U2 R2 U' R U' R'",
    "R' U' R U' R U2 R2 U2 R2 U' R2 U R2 U' R'",
  ] },
  { set: "H", n: 6, sub: 1, cp: "solved", algs: [
    "R U2 R2 U2 R' U2 R U2 R' U2 R2 U2 R U",
    "R U R' U R' U2 R2 U2 R2 U R2 U' R2 U R",
    "R U R2 U' R2 U R2 U2 R2 U2 R' U R' U R",
  ] },
  { set: "H", n: 7, sub: 1, cp: "solved", algs: [
    "R U R' U R U2 R' U' R' U2 R U R' U R",
    "R' U' R U' R' U2 R U R U2 R' U' R U' R'",
    "R U R' U' R' U2 R' U R U' R U2 R2 U2 R' U",
  ] },
  { set: "H", n: 8, sub: 1, cp: "solved", algs: [
    "R U R2 U' R2 U' R U2 R U2 R U' R2 U' R2 U R U",
    "R' U' R2 U R2 U R' U2 R' U2 R' U R2 U R2 U' R' U",
    "R U R2 U R2 U R' U' R U2 R' U R U R U' R U R2",
  ] },
  { set: "H", n: 9, sub: 2, cp: "diag", algs: [
    "R' F2 R2 U2 R' F2 R U2 R2 F2 R U",
    "F R2 F2 U2 F R2 F' U2 F2 R2 F'",
  ] },
  { set: "H", n: 10, sub: 2, cp: "diag", algs: [
    "F U' R2 U R U2 R' U R2 U2 R' U' R F'",
    "F' U' F U' R U' R' U2 F R' F' R2 U' R'",
    "R F U2 R' U R2 U2 R' U' R U' R2 U R F' R'",
  ] },
  { set: "H", n: 11, sub: 2, cp: "diag", algs: [
    "F R' U R U2 R2 U' R U2 R' U' R2 U F' U2",
    "F' U' F R2 U2 R2 U' R2 U' R2 U2 F' U F U",
    "R U R2 F R F' U2 R U R' U F' U F U2",
  ] },
  { set: "H", n: 12, sub: 2, cp: "diag", algs: [
    "F R' F R F' R U2 R' F R' F' R F'",
    "F' U' F2 R' F' R U R' F R F' R U2 R'",
    "R U2 R' F R' F' R U' R' F R F2 U F",
  ] },
  { set: "H", n: 13, sub: 2, cp: "diag", algs: [
    "R U' R2 U' F2 U' R2 U R2 U F2 R2 U R' U'",
    "R' U F2 U' R2 U2 R2 U' R2 U' R2 U' F2 U' R U'",
    "R' U R2 U R2 U2 F2 U' R2 U2 R2 U F2 U2 R U'",
  ] },
  { set: "H", n: 14, sub: 2, cp: "diag", algs: [
    "R U' R2 F2 U' R2 U' R2 U F2 U R2 U R' U'",
    "R' U F2 U R2 U R2 U R2 U2 R2 U F2 U' R U'",
    "R' U2 F2 U' R2 U2 R2 U F2 U2 R2 U' R2 U' R U'",
  ] },
  { set: "H", n: 15, sub: 2, cp: "diag", algs: [
    "R U R F2 U R' U R U2 F2 R2 U R U2 R'",
    "R U2 R' U' R2 F2 U2 R' U' R U' F2 R' U' R'",
    "F R' F' R2 U' R U2 R U2 R' U2 F R2 F' R'",
  ] },
  { set: "H", n: 16, sub: 2, cp: "diag", algs: [
    "R2 U' F' R2 F U R2 U2 R2 U' F' R2 F U R2",
    "R' F' R U' F U' F' U2 R' F U' R U' R' U2 R",
    "R' U2 R U R' U F' R U2 F U F' U R' F R",
  ] },
  { set: "H", n: 17, sub: 3, cp: "adj", algs: [
    "R U2 R2 F U' R2 U' R2 U F' U R",
  ] },
  { set: "H", n: 18, sub: 3, cp: "adj", algs: [
    "R F R2 U' R2 U' R2 U2 R2 U' F' R'",
  ] },
  { set: "H", n: 19, sub: 3, cp: "adj", algs: [
    "R2 U2 F' R2 U2 R2 U R2 U R2 U F U2 R2",
    "F R2 U2 R2 U2 R2 U' R2 U R2 U' R2 U2 F' U2",
    "R' U2 R U2 R2 F' R U R U' R' F U R U'",
  ] },
  { set: "H", n: 20, sub: 3, cp: "adj", algs: [
    "R U' R2 F2 R U2 R U2 R' F2 U' R U2 R'",
    "R' F U' R2 U R2 U F' R' U' R2 U R' U2 R'",
    "R' U2 R U2 F U' R' U2 R U F' U R' U R U2",
  ] },
  { set: "H", n: 21, sub: 3, cp: "adj", algs: [
    "F R U' R' U R U2 R' U' R U R' U' F' U2",
    "F R' U2 R U2 R2 U2 R' U2 R' U2 R2 U2 R F'",
    "R' U2 R2 U R' U R U2 R' U' F R' U R U' F'",
  ] },
  { set: "H", n: 22, sub: 3, cp: "adj", algs: [
    "F U2 F' U' R' F U' F' R U' R' U2 R U'",
    "F U R' U' R U' R' U R U F' U2 R' U2 R U'",
    "R' F U2 F' U' R U F U2 F' U2 R' U2 R U2",
  ] },
  { set: "H", n: 23, sub: 3, cp: "adj", algs: [
    "R' U2 R U F R' U R F' U F U2 F' U2",
    "R U' R' F2 R U2 R' U2 R' F2 R U' R U2 R'",
    "F R' U2 R U F' U' R' U2 R U2 F U2 F' U'",
  ] },
  { set: "H", n: 24, sub: 3, cp: "adj", algs: [
    "F' U2 F2 R' U F2 U F2 U' R U' F' U",
    "R' F R' U F2 U F2 U' R U' F2 U F R",
  ] },
  { set: "H", n: 25, sub: 3, cp: "adj", algs: [
    "F R' U R2 U' R' U' R' U2 R' U' R2 U R2 F' U2",
    "F U R U2 R' U' R' U2 R2 U R2 U R U' F' U2",
    "F U2 R' U2 R' U2 R U' R' U' R2 F' R' U R U2",
  ] },
  { set: "H", n: 26, sub: 3, cp: "adj", algs: [
    "F R U R' U' R' F' U2 R U R' U R2 U2 R' U2",
    "R' F' U2 F R U' R U2 F R' F' U2 R2 U' R",
    "F R U' R' U' R U2 R' U' F' R U2 R' U' R U' R'",
  ] },
  { set: "H", n: 27, sub: 3, cp: "adj", algs: [
    "R U2 R' F' U' R U2 R' U2 R' U' F U R2 U' R'",
    "R' U2 R U2 R U F' R' U2 R U2 F U' R2 U R",
    "R' U2 R2 U R2 U R U2 R' F R U R U' R' F' U'",
  ] },
  { set: "H", n: 28, sub: 3, cp: "adj", algs: [
    "F' R' F2 U F2 U F2 U2 F2 U R F U",
    "F' R F2 U' R2 U' R2 U2 R2 U' R2 F2 R' F U",
  ] },
  { set: "H", n: 29, sub: 4, cp: "adj", algs: [
    "R2 U' R2 U F R2 U R2 U' F' R2 U R2",
  ] },
  { set: "H", n: 30, sub: 4, cp: "adj", algs: [
    "R' F' R U2 R U2 R' F U' R U' R' U2",
    "R' U' R U' R' U' R U' F U R' U' R F'",
  ] },
  { set: "H", n: 31, sub: 4, cp: "adj", algs: [
    "F U2 R2 U R' U R U2 R' U R' U2 F' U2",
    "R U' R' U2 R' U' F U R2 U' R2 F' R U'",
    "R' U2 R U R' F U R' U' R F' R' U R2 U'",
  ] },
  { set: "H", n: 32, sub: 4, cp: "adj", algs: [
    "R U R' U R F' U2 R' U' R U' F U R' U'",
    "F' U R U' F U2 R' U R F' U2 R' U2 F",
    "R U R2 F R F' U R U2 R' U' F' U' F",
  ] },
  { set: "H", n: 33, sub: 4, cp: "adj", algs: [
    "R F' U R' U R U2 F U2 R' U R U R' U'",
    "R' U2 F' U' R' U' R U' R' U2 R F U2 R U'",
    "R' U R' U2 R U R2 F R U R2 U' R' F' R U'",
  ] },
  { set: "H", n: 34, sub: 4, cp: "adj", algs: [
    "R2 U F2 U2 F U R2 U' R2 F' U F2 U' R2",
    "R' U' R2 U2 F' U' R' U R U F U R2 U2 R U'",
    "R' U R U' F R2 U F' R F R U' F' R2 U'",
  ] },
  { set: "H", n: 35, sub: 4, cp: "adj", algs: [
    "F' R' U R U' F U R U R U2 R2 U R U R2",
    "R U R2 U2 R2 U R2 U' R U F' R' U R U' F U2",
    "R U2 R' U R U R' U' F' R U2 R' U' R U' R' F",
  ] },
  { set: "H", n: 36, sub: 4, cp: "adj", algs: [
    "R U F' U2 R' U R U R' U' R U2 F U' R' U'",
    "F' R F U' R' U R U R' U' R U F' R' F U'",
    "R2 U F' U F U' R2 U R2 U F' U2 F U' R2 U2",
  ] },
  { set: "H", n: 37, sub: 4, cp: "adj", algs: [
    "R U F' R2 U2 R U R' U R U R F U' R' U'",
    "R U R' U R U2 R2 U' R F U' R' U2 R U F'",
    "F R' F' U2 R U2 R F R' F' U2 R2 U2 R U'",
  ] },
  { set: "H", n: 38, sub: 4, cp: "adj", algs: [
    "F' R' U R U' F U R U R U' R U R U2 R",
    "R U F U2 R2 U' R' U R' U' R' U' F' U' R' U2",
    "F U F' R' U F U2 F' U2 R U' R' U2 R U'",
  ] },
  { set: "H", n: 39, sub: 4, cp: "adj", algs: [
    "R2 U' R' F R F' U R2 U' R2 F R F' R U",
    "R F R' U2 R2 U' F' R2 F R' U R U' R2 U' F'",
    "R2 F' U' F R U' R' U2 R2 U' R2 F R F' R U",
  ] },
  { set: "H", n: 40, sub: 4, cp: "adj", algs: [
    "R' U2 R2 U R2 F' U R' U' R F R' U R' U2 R' U",
    "F' U2 F U' R U R' F U R U' R2 F' R2 U' R'",
    "R U F U2 R2 U' R' U2 R2 U' R' U' R' U F' U' R' U2",
  ] },
  { set: "Pi", n: 1, sub: 1, cp: "solved", algs: [
    "R' U2 R2 U R2 U R2 U2 R' U'",
  ] },
  { set: "Pi", n: 2, sub: 1, cp: "solved", algs: [
    "R U2 R2 U' R2 U' R2 U2 R U'",
  ] },
  { set: "Pi", n: 3, sub: 1, cp: "solved", algs: [
    "R U R' U R U2 R2 U2 R U R' U R",
    "R' U2 R U R' U R2 U R' U R U2 R' U2",
    "R U2 R' U' R U' R' U2 R' U' R U' R' U2 R U'",
  ] },
  { set: "Pi", n: 4, sub: 1, cp: "solved", algs: [
    "R U2 R' U' R U' R2 U' R U' R' U2 R",
    "R' U' R U' R' U2 R2 U2 R' U' R U' R' U2",
    "R' U2 R U R' U R U2 R U R' U R U2 R' U'",
  ] },
  { set: "Pi", n: 5, sub: 1, cp: "solved", algs: [
    "R U R' U' R' U2 R U R' U R2 U2 R' U'",
    "R U2 R2 U' R U' R' U2 R U R U' R' U'",
    "R' U' R U' R' U2 R U R' U' R U' R' U2 R",
  ] },
  { set: "Pi", n: 6, sub: 1, cp: "solved", algs: [
    "R' U' R U R U2 R' U' R U' R2 U2 R U'",
    "R' U2 R2 U R' U R U2 R' U' R' U R U'",
    "R U R' U R U2 R' U' R U R' U R U2 R' U2",
  ] },
  { set: "Pi", n: 7, sub: 1, cp: "solved", algs: [
    "R' U' R2 U R2 U R2 U2 R2 U R U' R' U2 R",
    "R U R2 U' R2 U' R2 U2 R2 U' R' U R U2 R' U2",
    "R U2 R' U' R U R2 U2 R2 U R2 U R2 U' R' U'",
  ] },
  { set: "Pi", n: 8, sub: 1, cp: "solved", algs: [
    "R U' R' U2 R U R' U2 R U R' U2 R U2 R'",
    "R U' R2 U' R2 U' R U R U' R U2 R2 U R' U2",
    "R U2 R2 U' R' U R U' R' U' R' U' R' U2 R U'",
  ] },
  { set: "Pi", n: 9, sub: 1, cp: "solved", algs: [
    "R U R' U2 R U2 R U2 R2 U' R2 U' R' U' R'",
    "R U2 R2 U' R2 U R2 U' R2 U' R' U' R' U2 R",
    "R U2 R2 U2 R U R2 U R2 U' R2 U2 R' U2 R",
  ] },
  { set: "Pi", n: 10, sub: 1, cp: "solved", algs: [
    "R U R U2 R' U R' U2 R' U R' U2 R U R",
    "R' U2 R U R' U R U R' U2 R U R' U R",
    "R2 U R' U R U' R2 U R U' R U' R' U R'",
  ] },
  { set: "Pi", n: 11, sub: 1, cp: "solved", algs: [
    "R' U' R' U' R2 U' R2 U2 R U2 R U2 R' U R",
    "R U R' U' R2 U R' U R' U' R U R U2 R2 U",
    "R U' R2 U2 R' U R' U' R' U R2 U R2 U R' U'",
  ] },
  { set: "Pi", n: 12, sub: 1, cp: "solved", algs: [
    "R U R U R2 U R2 U2 R' U2 R' U2 R U' R' U2",
    "R U R' U' R2 U R' U R U2 R2 U' R U R' U",
    "R U2 R' U' R' U' R' U' R U R' U' R2 U2 R U'",
  ] },
  { set: "Pi", n: 13, sub: 2, cp: "diag", algs: [
    "F R2 U' R U2 R U R' U R' U R2 F'",
    "R F U' R2 U2 R U R' U R2 U F' R'",
  ] },
  { set: "Pi", n: 14, sub: 2, cp: "diag", algs: [
    "R F' U' R2 U' F U F' R2 U F R'",
  ] },
  { set: "Pi", n: 15, sub: 2, cp: "diag", algs: [
    "F R U' R' U2 R' U2 R2 U R2 U R U' F'",
    "F U R' U' R2 U' R2 U2 R U2 R U R' F' U2",
    "R F U R' U R U2 R U2 R2 U' R2 U' R' F' R'",
  ] },
  { set: "Pi", n: 16, sub: 2, cp: "diag", algs: [
    "R' U R U F U R' U' R F' U' R' U' R",
    "F' R U F2 U R' U' R F2 U' R' F U'",
  ] },
  { set: "Pi", n: 17, sub: 2, cp: "diag", algs: [
    "F R2 U' R U' R U' R' U2 R' U R2 F' U2",
    "R F U' R2 U' R U' R' U2 R2 U F' R' U2",
    "F' R' U F2 U2 F' U' F U' F2 U' R F U'",
  ] },
  { set: "Pi", n: 18, sub: 2, cp: "diag", algs: [
    "R F' U' R2 F U' F' U R2 U F R' U2",
  ] },
  { set: "Pi", n: 19, sub: 2, cp: "diag", algs: [
    "F' R U F2 R' U R U' F2 U' R' F U",
    "R' U R U F R' U R U' F' U' R' U' R U2",
  ] },
  { set: "Pi", n: 20, sub: 2, cp: "diag", algs: [
    "R' U R U R2 U2 R U F' R' U R U' F R",
    "R F U' R2 U2 R U2 R U F' U' R U R U' R2",
    "R F R' U R U' F' U2 R U R2 U R2 U2 R' U' R'",
  ] },
  { set: "Pi", n: 21, sub: 2, cp: "diag", algs: [
    "R U2 R' U2 R' U R' U' R F R2 U R2 U' F'",
    "R' U' R U2 F U' R' U2 R U F' U2 R' U R",
    "F U R2 U' R2 F' R' U R U' R U2 R U2 R' U",
  ] },
  { set: "Pi", n: 22, sub: 2, cp: "diag", algs: [
    "R' F' U R' U' R F U' R' U2 R2 U' R' U' R U",
    "F R' U' R' U' R U2 R U' R2 U' R2 U' R2 U R2 F'",
    "R U2 R' U' F' R U2 R' U' R U' R' F R U' R' U",
  ] },
  { set: "Pi", n: 23, sub: 2, cp: "diag", algs: [
    "R' F' R' F2 R2 U2 R U2 R F2 R2 F R U2 R'",
    "F R U R2 U' R U R2 U2 R2 U2 R U2 R U F' U'",
    "F R' U' R2 U' R2 U2 R2 U2 R' U' R U2 R' U' F' U",
  ] },
  { set: "Pi", n: 24, sub: 2, cp: "diag", algs: [
    "R U R' U2 F' U R' U2 R U R' U R F R U2 R'",
    "R U2 R' F' R' U' R U' R' U2 R U' F U2 R U' R'",
    "R U R' F U R' U' R F' U' R2 U R' U' R U2 R U'",
  ] },
  { set: "Pi", n: 25, sub: 3, cp: "adj", algs: [
    "R U R' U F2 R U2 R' U2 R' F2 R",
    "R U R2 F R F' R U' R' U' F' U2 F U",
  ] },
  { set: "Pi", n: 26, sub: 3, cp: "adj", algs: [
    "R U R' U' R2 F2 R2 U2 R U2 R F2 R2",
    "R U R' U R2 F2 R' U2 R' U2 R2 F2 R2 U2",
    "R' U2 R U2 F' U2 R U R2 U R2 U2 R' U' F U",
  ] },
  { set: "Pi", n: 27, sub: 3, cp: "adj", algs: [
    "R U2 R' U' F' R U2 R' U2 R' F R2 U' R'",
    "R U R' U' R' F R2 U R' U' R U R' U' F' U'",
  ] },
  { set: "Pi", n: 28, sub: 3, cp: "adj", algs: [
    "R U' R2 U' F U' R2 U R2 U F' R2 U R'",
    "F R2 F' U2 F U' R2 U F' U2 F R2 U F'",
    "F U F R2 F2 U' F R2 F' U F2 R2 F2",
  ] },
  { set: "Pi", n: 29, sub: 3, cp: "adj", algs: [
    "F U R' U' R F' U' R' U R U' R' U2 R",
    "R2 F2 R2 U R' F2 R U' R2 F2 R U R U'",
    "R' U F2 R U2 R' U F2 U' R U2 R' F2 R U'",
  ] },
  { set: "Pi", n: 30, sub: 3, cp: "adj", algs: [
    "R2 F2 R2 U' R U R' U R2 F2 R' U2 R' U",
    "R U' F R' U F R F2 R2 F R U' F'",
    "R2 F2 R2 F' U2 F R2 F2 R2 U F' U F U2",
  ] },
  { set: "Pi", n: 31, sub: 3, cp: "adj", algs: [
    "R2 F2 R' U R' U' R2 F2 R2 U2 R U2 R' U",
    "F R2 F' U2 F' U2 F R2 U F' U F U2",
    "R U2 R' U' F' U' F R' F R F2 U F U2",
  ] },
  { set: "Pi", n: 32, sub: 3, cp: "adj", algs: [
    "R' U2 R2 U R U' R' U F R U R2 U' R' F'",
    "R' U2 R U2 F R2 U R2 U' R U R2 U' R' F' U'",
    "R F2 U2 R2 U2 R' U2 R' U2 R2 U R U' F2 R' U",
  ] },
  { set: "Pi", n: 33, sub: 3, cp: "adj", algs: [
    "R' F2 R U' R2 F2 R U R U R2 F2 R2 U'",
    "R U2 R' U2 R U' R2 F2 R U' F2 U R' F2 R",
    "R' F2 U' F2 U' R U R' F' R U' R' U2 F R",
  ] },
  { set: "Pi", n: 34, sub: 3, cp: "adj", algs: [
    "R' U2 R U2 F2 R U' R' U' R' U R2 U R' F2",
    "F' U2 R' U' R U' F U' R' U2 R U' R' U2 R U2",
    "R U2 R' U2 R' F R2 U' R' U2 R U2 R' U' F' U'",
  ] },
  { set: "Pi", n: 35, sub: 3, cp: "adj", algs: [
    "R U R' U R2 F2 U R U R2 U' R' U' F2 R2",
    "F R2 F' R2 U R2 U R2 U' F' U' F U R2 U",
    "R' U R U R F2 U2 R U' R2 U R' U2 F2 R' U2",
  ] },
  { set: "Pi", n: 36, sub: 3, cp: "adj", algs: [
    "R2 U' R' U2 R' U2 F2 R' U2 R' U2 R2 F2 R U R2",
    "R U R' U R U2 F U' R' U' R U2 R' U' R F' R'",
    "R2 F U' R' U2 R U F' R2 U R U R2 U2 R' U2 R",
  ] },
  { set: "Pi", n: 37, sub: 4, cp: "adj", algs: [
    "R' U' F U' R2 U R2 U F' R2 U2 R' U'",
  ] },
  { set: "Pi", n: 38, sub: 4, cp: "adj", algs: [
    "R F U R2 U2 R2 U R2 U R2 F' R' U2",
  ] },
  { set: "Pi", n: 39, sub: 4, cp: "adj", algs: [
    "F U R U' R' U R U2 R' U' R U R' F'",
    "F U F' R2 U' R2 U2 F U2 F' U2 R2 U R2",
    "F R' U2 R2 U2 R U2 R U2 R2 U2 R' U2 R F' U2",
  ] },
  { set: "Pi", n: 40, sub: 4, cp: "adj", algs: [
    "F U2 R2 U R2 U' R2 U R2 U2 R2 U2 R2 F'",
    "F U R2 U R2 U R2 U' R2 U R2 U2 R2 U2 F'",
    "R' U' F' R U R' U' R' F R2 U2 R' U2 R U'",
  ] },
  { set: "Pi", n: 41, sub: 4, cp: "adj", algs: [
    "R U2 R U' R2 U R F U' R2 U' R2 U F' R",
    "R U2 R' U F2 R U2 R' U2 R' F2 R2 U R' U'",
    "R' U F2 U R2 U R2 U2 F2 U' R U' R U' R'",
  ] },
  { set: "Pi", n: 42, sub: 4, cp: "adj", algs: [
    "F R2 U' R2 U R U2 R U R U R2 U' R F'",
    "F U R' U' R2 U' R2 U2 R U R U2 R' U' F'",
    "R U2 R2 U' R F' U' R' U2 R U F U R U2 R'",
  ] },
  { set: "Pi", n: 43, sub: 4, cp: "adj", algs: [
    "R' U2 R U R' F U F' R U F U2 F' U'",
    "R' U2 R U2 F U' R' U' R U R' U R U' F' U'",
    "F R' F' R U R U' R' U' R' F' U' F U R U",
  ] },
  { set: "Pi", n: 44, sub: 4, cp: "adj", algs: [
    "F U2 F' U' F R' U' R F' U' R' U2 R U2",
    "F U2 F' U2 R' U2 R U F U' R' U2 R F' U2",
    "R U2 R' U R' F2 R U2 R U2 R' F2 R U R' U'",
  ] },
  { set: "Pi", n: 45, sub: 4, cp: "adj", algs: [
    "F U R' U F2 U' F2 U' R F2 U2 F U2",
    "R' F' U' F2 U R' U F2 U' F2 U' R F' R",
  ] },
  { set: "Pi", n: 46, sub: 4, cp: "adj", algs: [
    "R U2 R2 U' R U' R' U2 F R U R U' R' F' U'",
    "R' U' R U R U F' U R' U' R F U' R2 U2 R",
    "R' U R2 U2 F R F' U2 R' U R' F' U2 F R",
  ] },
  { set: "Pi", n: 47, sub: 4, cp: "adj", algs: [
    "F R U R' U' R' F' R U2 R' U' R2 U' R2 U2 R",
    "R U R2 U' F' U R U2 R U2 R' U F R U2 R' U",
    "R' U' R2 U F' U2 R' U2 R F U' R' U2 R' U2 R U2",
  ] },
  { set: "Pi", n: 48, sub: 4, cp: "adj", algs: [
    "F' R' U' F2 U2 F2 U' F2 U' F2 R F U'",
    "F' R F2 R2 U R2 U2 R2 U R2 U F2 R' F U'",
  ] },
  { set: "Pi", n: 49, sub: 5, cp: "adj", algs: [
    "R' F2 R U2 R U2 R' F2 U' R U' R' U'",
    "F' U2 F U R U R' F R' F' R2 U' R' U'",
  ] },
  { set: "Pi", n: 50, sub: 5, cp: "adj", algs: [
    "R' U2 R U R' U' R U F R' U R U' F'",
    "R' U' R' F2 R2 U R' F2 R U' R2 F2 R2 U",
    "R' F2 R U2 R' U F2 U' R U2 R' F2 U' R U",
  ] },
  { set: "Pi", n: 51, sub: 5, cp: "adj", algs: [
    "R U2 R F2 R2 U' R U' R' U R2 F2 R2 U'",
    "F U R' F' R2 F2 R' F' U' R F' U R' U2",
    "F' U' F U' R2 F2 R2 F' U2 F R2 F2 R2 U",
  ] },
  { set: "Pi", n: 52, sub: 5, cp: "adj", algs: [
    "R2 F2 R' U2 R' U2 R2 F2 R2 U R U' R' U'",
    "R2 F2 R2 U2 R U2 R F2 R2 U' R U' R' U'",
    "F' U R U2 R2 U' R2 U' R' U2 F U2 R' U2 R U",
  ] },
  { set: "Pi", n: 53, sub: 5, cp: "adj", algs: [
    "R U2 R' U2 R2 F2 R2 U R U' R F2 R2 U2",
    "F' U' F2 R' F' R F' U F U R U2 R'",
    "F' U' F U' R2 F' U2 F U2 F R2 F' U",
  ] },
  { set: "Pi", n: 54, sub: 5, cp: "adj", algs: [
    "F U R U2 R' U2 R U R2 F' R U2 R U2 R'",
    "F' U' R U2 F R' U' R U F' U2 R' U' F",
    "R U' F' U2 R' U F U' F' R U2 F U' R'",
  ] },
  { set: "Pi", n: 55, sub: 5, cp: "adj", algs: [
    "R U R2 F' R U2 R U2 R' F U R U2 R' U",
    "F U R U' R' U R U' R2 F' R U R U' R' U2",
    "R U' R U2 R U2 R2 U R' F2 R' U R' U' R2 F2",
  ] },
  { set: "Pi", n: 56, sub: 5, cp: "adj", algs: [
    "R U' R2 F U' R2 U' R2 U F' U R2 U R' U'",
    "F U' R2 F' U2 F U' R2 U F' U2 F R2 F' U2",
    "R' U' F U F' R U F U' F' U F U2 F' U",
  ] },
  { set: "Pi", n: 57, sub: 5, cp: "adj", algs: [
    "R2 F2 R2 U' R' U' R' F2 R2 U R' F2 R U'",
    "R' F2 R U' F2 U R' F2 R2 U R' U2 R U2 R'",
    "R U R F' R2 F R U F' R F U2 R2 U R U2",
  ] },
  { set: "Pi", n: 58, sub: 5, cp: "adj", algs: [
    "F R U R2 U' R' F' U' R U R' U' R2 U2 R U",
    "R F2 U R' U' R2 U2 R U2 R U2 R2 U2 F2 R' U'",
    "R2 F2 R U2 R2 U R2 U R2 U R F2 R' U R' U2",
  ] },
  { set: "Pi", n: 59, sub: 5, cp: "adj", algs: [
    "F R' U' R U R2 U2 R2 U' R2 U' R U2 R U' F'",
    "R2 U' F' U F U R2 U' R2 U' R2 F R2 F' U",
    "R F2 U2 R U' R2 U R' U2 F2 R' U' R' U' R U",
  ] },
  { set: "Pi", n: 60, sub: 5, cp: "adj", algs: [
    "R F R' U R U2 R' U R U F' U2 R' U' R U' R'",
    "F R2 U R U' R2 U2 F' U' R2 F R U' F' R U'",
    "R2 U' R' F2 R2 U2 R U2 R F2 U2 R U2 R U R2 U2",
  ] },
  { set: "Pi", n: 61, sub: 6, cp: "adj", algs: [
    "F U2 R U' R U2 R' U' R U' R2 U2 F'",
    "R' F R2 U R2 U' F' U R U2 R U R' U2",
    "R2 U' R F R' U R U' F' R U' R' U2 R",
  ] },
  { set: "Pi", n: 62, sub: 6, cp: "adj", algs: [
    "R U R' U F' R U2 R' U2 R' F R U'",
    "F R' U R U' F' U R' U R U R' U R U'",
  ] },
  { set: "Pi", n: 63, sub: 6, cp: "adj", algs: [
    "R2 U' R2 F U R2 U' R2 F' U' R2 U R2 U2",
  ] },
  { set: "Pi", n: 64, sub: 6, cp: "adj", algs: [
    "R U' R' U' R U2 F' U2 R' U' R U' F R'",
    "F' R U R2 U' R' F U' R2 U R2 U' R' U2 R",
    "R' F R U R2 U' R' F' R2 U' R' U2 R U' R",
  ] },
  { set: "Pi", n: 65, sub: 6, cp: "adj", algs: [
    "R U' F' U R' U R U2 F R' U' R U' R' U'",
    "F' U2 R U2 F R' U' R U2 F' U R' U' F",
    "F' U' F U' R F' U2 F U2 F R' F' U2",
  ] },
  { set: "Pi", n: 66, sub: 6, cp: "adj", algs: [
    "R U F U R U R U' R U R2 U2 F' U' R'",
    "F U2 F' U' F U2 R' U2 R U F' R' U R",
    "F U R' U2 R2 U R2 U R2 U' R' U2 R U R' F'",
  ] },
  { set: "Pi", n: 67, sub: 6, cp: "adj", algs: [
    "R' U2 R2 U' F' U' R' U' R U F U2 R2 U R U'",
    "R2 F U R' F' R' F U' R2 F' U R' U' R U2",
    "R2 U F2 U' F R2 U R2 U' F' U2 F2 U' R2 U2",
  ] },
  { set: "Pi", n: 68, sub: 6, cp: "adj", algs: [
    "R' U2 F R2 U R U' R F' R' U R U R2 U2 R'",
    "F' R U R' U R U2 R' F U R U' R' U' R U2 R'",
    "F' U R' U' R F U' R' U R2 U' R2 U2 R2 U' R' U'",
  ] },
  { set: "Pi", n: 69, sub: 6, cp: "adj", algs: [
    "R U F' U2 R' U R U' R' U' R U2 F U' R' U",
    "F' R F U' R' U R U' R' U' R U F' R' F U",
    "R2 U F' U2 F U' R2 U' R2 U F' U' F U' R2 U",
  ] },
  { set: "Pi", n: 70, sub: 6, cp: "adj", algs: [
    "R U F' R' U' R' U' R U' R' U2 R2 F U' R' U",
    "R2 F R' U R U' F' R2 U2 R' U' R2 U' R' U2 R",
    "R' U2 R2 U2 F R F' R' U2 R' U2 F R F' U",
  ] },
  { set: "Pi", n: 71, sub: 6, cp: "adj", algs: [
    "R' F R' F' R2 U R2 U' F R' F' R U R2 U",
    "R U2 R' U2 R' U' F R F' U' R' U F' U F R",
    "F2 U' R2 U R' F2 U' F2 U R U2 R2 U F2 U'",
  ] },
  { set: "Pi", n: 72, sub: 6, cp: "adj", algs: [
    "F' U' R' U2 R U F U' R2 U R2 U' R U2 R2 U2 R'",
    "R U F U' R U R U R2 U2 R U R2 U2 F' U' R'",
    "R U2 R U' R F' R' U R U' F R2 U' R2 U2 R U2",
  ] },
  { set: "S", n: 1, sub: 1, cp: "solved", algs: [
    "R' U2 R U R' U R",
  ] },
  { set: "S", n: 2, sub: 1, cp: "solved", algs: [
    "R U R' U R U2 R' U'",
  ] },
  { set: "S", n: 3, sub: 1, cp: "solved", algs: [
    "R' U2 R2 U2 R2 U' R2 U' R2 U R",
    "R U2 R2 U2 R2 U2 R2 U R2 U' R2 U R",
    "R' U2 R2 U R2 U' R2 U R2 U R2 U' R'",
  ] },
  { set: "S", n: 4, sub: 1, cp: "solved", algs: [
    "R U R2 U' R2 U' R2 U2 R2 U2 R'",
    "R U2 R' U2 R' U2 R U R' U R2 U2 R'",
    "R' U' R2 U R2 U R2 U' R2 U R2 U2 R'",
  ] },
  { set: "S", n: 5, sub: 1, cp: "solved", algs: [
    "R' U' R U' R U R2 U R2 U2 R' U'",
    "R' U2 R2 U R2 U R U' R U' R' U2",
    "R' U' R' U R2 U' R2 U' R' U R2 U' R' U'",
  ] },
  { set: "S", n: 6, sub: 1, cp: "solved", algs: [
    "R2 U' R' U' R2 U R U R2 U R' U R",
    "R U R' U R2 U R U R2 U' R' U' R2 U'",
    "R U R' U' R' U2 R U R U' R' U R' U R",
  ] },
  { set: "S", n: 7, sub: 1, cp: "solved", algs: [
    "R2 U R' U R2 U' R2 U R U' R2 U' R2",
    "R2 U' R2 U' R U2 R U' R' U' R U R2 U'",
    "R2 U' R2 U R U2 R U' R' U' R' U' R2 U R2",
  ] },
  { set: "S", n: 8, sub: 1, cp: "solved", algs: [
    "R' U2 R2 U R U R U' R' U' R2 U R",
    "R U R2 U' R' U' R U R U R2 U2 R' U'",
    "R U2 R' U' R U' R2 U2 R2 U R2 U R2 U2 R'",
  ] },
  { set: "S", n: 9, sub: 1, cp: "solved", algs: [
    "R2 U R' U' R' U' R U2 R' U' R2 U' R2 U'",
    "R' U R2 U R U R2 U' R2 U R U2 R2 U' R",
    "R U R U R U R U' R U R2 U2 R' U' R' U2",
  ] },
  { set: "S", n: 10, sub: 1, cp: "solved", algs: [
    "R2 U' R2 U' R' U2 R U' R' U' R' U R2 U'",
    "R2 F2 R' U R' U R U2 R F2 R2 U",
    "R U R2 U R U' R U' R2 U R U R' U' R",
  ] },
  { set: "S", n: 11, sub: 1, cp: "solved", algs: [
    "R2 U R U' R' U' R U2 R U' R2 U' R2 U'",
    "R2 U' R' U R2 U R2 U2 R2 U R' U R2 U",
    "R2 U' R2 U' R U R2 U' R2 U R' U R2 U",
  ] },
  { set: "S", n: 12, sub: 1, cp: "solved", algs: [
    "R' U R2 U R' U R U2 R U2 R U R' U R2 U'",
    "R2 U R U' R U2 R U' R U2 R U' R U R2 U'",
    "R2 U R' U R U2 R U2 R U R' U R2 U R' U'",
  ] },
  { set: "S", n: 13, sub: 2, cp: "diag", algs: [
    "R2 U R' F' U R' U R U2 F R U' R2",
    "F R U' R2 U2 R U R' U R2 U R' F' U2",
    "R U R' F' R U R' U R U2 R' F R U' R'",
  ] },
  { set: "S", n: 14, sub: 2, cp: "diag", algs: [
    "F R' U2 R U2 F U' R' U R U F2 U2",
    "F' R U2 R' U2 R' F2 R U R U' R' F'",
    "R F' U' F U2 R' U R U F' U F R'",
  ] },
  { set: "S", n: 15, sub: 2, cp: "diag", algs: [
    "R2 U F U F' U' R U2 F U2 F' R U2",
    "R' U2 R U' F U R' U' R F' U2 R' U R U2",
    "F' R U R' U F U F' U2 R U' R' F U",
  ] },
  { set: "S", n: 16, sub: 2, cp: "diag", algs: [
    "R U R2 F2 R U2 R U2 R' F2 U R U2 R'",
    "F U R U' R U R2 U R2 U2 R' U2 R' U2 F'",
    "F R U R' U R U2 R U2 R2 U' R2 U' R2 F' U2",
  ] },
  { set: "S", n: 17, sub: 2, cp: "diag", algs: [
    "R' U2 R U R' U' R F U' R' U' R U F' U",
    "R U2 F U' R2 U' R2 U F' R' U R2 U R2 U' R2",
    "R U2 R' U F2 U' F2 U' F2 U2 F2 R U' R'",
  ] },
  { set: "S", n: 18, sub: 2, cp: "diag", algs: [
    "R U F' U2 R' U' R U' F R' U R U2 R' U",
    "F' U' F R2 U2 R2 U' R2 U' R2 U F' U2 F U'",
    "R' U2 F R2 U R2 U' F' U R' U' R2 U2 R' U' R2 U",
  ] },
  { set: "S", n: 19, sub: 2, cp: "diag", algs: [
    "F U' R' U R U F' R U R2 U R2 U2 R' U",
    "R U F' R U R U' R' F R2 U R2 U2 R' U",
    "F U2 R' U2 R' U2 R U' R' U' R U R U' F' U'",
  ] },
  { set: "S", n: 20, sub: 2, cp: "diag", algs: [
    "R2 U' F R U R U' R2 F' R' F R2 F' R",
    "R' U2 R2 U' F U' R' U' R U F' U2 R2 U R U2",
    "R' U2 R U2 R' F' U2 F U2 R' F R F' R U",
  ] },
  { set: "S", n: 21, sub: 2, cp: "diag", algs: [
    "F R U R' U' R U R2 U' F' U R U R U' R'",
    "R U R F' R' U R U' F R2 U R' U2 R2 U2 R",
    "R' U' R U2 F U' R' U2 R U F' U R' U2 R U",
  ] },
  { set: "S", n: 22, sub: 2, cp: "diag", algs: [
    "R2 U R2 F' R U2 R' U' R U' R' F R2 U' R2 U",
    "F U R' F' R2 F R2 U' R' U R2 U' F' U R'",
    "R U2 R2 U' F' U R U2 R U2 R' U F R U' R' U'",
  ] },
  { set: "S", n: 23, sub: 2, cp: "diag", algs: [
    "F U R' F R F' R U' R' U R U' R' F' U",
    "R' F' U' F U F' U' F R' F R F' U R",
    "R F' U' F U' R F R' F' R' U2 F R2 F' R",
  ] },
  { set: "S", n: 24, sub: 2, cp: "diag", algs: [
    "R U2 R F2 U2 R2 U' R U R U2 F2 R' U2 R' U'",
    "F R U R2 U2 R U R2 U' R' U R2 U' R' U2 R F'",
    "R U' R2 U2 R F' U R' U' R F R' U2 R2 U R' U",
  ] },
  { set: "S", n: 25, sub: 3, cp: "adj", algs: [
    "R' U2 R U F R' U R U' F'",
  ] },
  { set: "S", n: 26, sub: 3, cp: "adj", algs: [
    "F R' U' R2 U' R2 U2 R2 U' R' F' U2",
    "R U R2 F' R U2 R U2 R' F R U' R' U'",
  ] },
  { set: "S", n: 27, sub: 3, cp: "adj", algs: [
    "R2 U2 R' U2 R' U2 F R' U R' U' R2 F' R'",
    "F' U F' U' R U2 F U2 F' R' U F2 U",
    "R' U2 R U R' U' R F' R' F U2 F' R F U",
  ] },
  { set: "S", n: 28, sub: 3, cp: "adj", algs: [
    "R U R2 F' U' R' U' R U F R U R2 U2 R'",
    "R U2 F U R2 U2 R' U2 R' U2 R2 U R F' U2 R' U'",
    "R' U2 R U R' U R F U' R' U2 R U F' R' U R",
  ] },
  { set: "S", n: 29, sub: 3, cp: "adj", algs: [
    "F R U R2 U' R2 U' R2 U2 R U R U R' F'",
    "R2 U' R' U' R2 U R U R2 U F R' U R U' F'",
    "F U F' U2 R' U2 R U2 F U' R' U R U' F'",
  ] },
  { set: "S", n: 30, sub: 3, cp: "adj", algs: [
    "R' U2 R2 U2 R2 U' R2 U' R' F R' U R U' F'",
    "R' U2 R U' R' U2 R' F' R U2 R U2 R' F U R U'",
    "R2 U' R2 F U' R' U2 R U F' U2 R' U' R' U R2 U'",
  ] },
  { set: "S", n: 31, sub: 3, cp: "adj", algs: [
    "F U' R' U2 R U F' U' R U R2 U R2 U2 R'",
    "R U R' U R F U' R' U R U F' U R' U'",
    "R U R2 F' R U R' U' R' F R U R2 U2 R'",
  ] },
  { set: "S", n: 32, sub: 3, cp: "adj", algs: [
    "R' U' R U R2 F' R U R U' R' F U R U'",
    "F' R2 U F' R' U2 R U2 F U' R' U R' F",
    "R' U' R U2 F U' R' U R U F' U2 R' U R U'",
  ] },
  { set: "S", n: 33, sub: 3, cp: "adj", algs: [
    "F U F' U F U' R U2 R' U R U R' F'",
    "F R2 U R U' R' U R U R2 U' R' U R' U2 F'",
    "F U' R' U2 R U R' U R2 U2 R' U R U R' F'",
  ] },
  { set: "S", n: 34, sub: 3, cp: "adj", algs: [
    "R' U' R' U R2 U' R2 U' R2 F R U R2 U' R' F'",
    "R' U' R2 U F' U' R' U' R U F R2 U R2 U2 R' U",
    "R' F R U2 F' U R U R' F' U2 F2 U' F' U'",
  ] },
  { set: "S", n: 35, sub: 3, cp: "adj", algs: [
    "F U R' U' R F' U' R' U2 R2 U2 R' U' R U' R'",
    "F R' U2 R2 U R U R U2 R U R2 U' R' U R F'",
    "F U' R' U' R' U R U R' U2 R2 U R' U R U' F'",
  ] },
  { set: "S", n: 36, sub: 3, cp: "adj", algs: [
    "F R2 U R U' R F' R U' R2 U2 R' U2 R' U R' U2",
    "R2 U' R2 F R U R2 U' R' F' U2 R' U' R' U R2 U'",
    "F' U' F U' F R' U F2 U F2 U' R U' F' U",
  ] },
  { set: "S", n: 37, sub: 4, cp: "adj", algs: [
    "F R' U R U' F' U R' U' R U",
    "R U2 F' U2 R' U' R U' F U R' U'",
    "R U2 R U2 R' F' R U2 R' U2 R' F",
  ] },
  { set: "S", n: 38, sub: 4, cp: "adj", algs: [
    "R' U2 F' R U R' U' R' F R U2 R U'",
    "R' U2 R F U F' R' F U' F' U2 R U'",
  ] },
  { set: "S", n: 39, sub: 4, cp: "adj", algs: [
    "R' U' R' U R2 U2 R F' U R' U' R F R2",
    "R' U' R' U' R F U' R' U2 R U F' R U'",
    "R2 U' F R F' U' R' U2 R F R' F' R2",
  ] },
  { set: "S", n: 40, sub: 4, cp: "adj", algs: [
    "F U2 R' U' R F' R' U R F U2 F' U'",
    "F U2 F R F' U' F' U F R' U2 F' U'",
    "F U' F' U' F R U2 R' U R U R' U2 F' U'",
  ] },
  { set: "S", n: 41, sub: 4, cp: "adj", algs: [
    "R' U' R U F U' R' U' R U F' R' U R U",
    "R2 F U R2 U' R2 F' U R U R2 U' R2 U R'",
    "R2 U R2 U R2 F R2 F' U2 R2 U' F' U' F",
  ] },
  { set: "S", n: 42, sub: 4, cp: "adj", algs: [
    "R' U' R' U R U2 R2 F U R' U' R F' R2 U2",
    "R U R' U F U2 F' U' R F U' F' U2 R'",
    "R U' R' U' F' U2 F U' F' U' F R U2 R'",
  ] },
  { set: "S", n: 43, sub: 4, cp: "adj", algs: [
    "F' R' U' R F R' U2 R U F' R' U2 R F",
    "R U R' U2 F U2 F' U' R' F R2 U' R2 F' R",
    "F R' U R' U2 R' U' R' U R2 U R' U R2 U' F' U2",
  ] },
  { set: "S", n: 44, sub: 4, cp: "adj", algs: [
    "F2 R U' R' U' R U2 R2 U' R F2 R' U R U'",
    "R2 U R U R F' U2 R' U2 R F R U' R2 U R'",
    "R2 F R' U R' U R F' R' F U2 R2 F' R U'",
  ] },
  { set: "S", n: 45, sub: 4, cp: "adj", algs: [
    "F R' U R U' F' R2 U2 R2 U R' U' R' U2 R2 U",
    "R U2 R2 U2 R' U2 F U' R2 U' R U2 R U F' U'",
    "F R U' R' U R U2 R2 U' F' U R U2 R U2 R' U",
  ] },
  { set: "S", n: 46, sub: 4, cp: "adj", algs: [
    "R2 U F U R' U' R F' U2 R U' R2 U R' U R2",
    "R2 U R U' R2 U' R U F R2 U R U' R F' R'",
    "R' F' R U' F U' F' R U2 R' F U' R U' R'",
  ] },
  { set: "S", n: 47, sub: 4, cp: "adj", algs: [
    "F R' F2 R U' F' R' F' R F R U R' F",
    "R' U R' F R U R' U' R' F' U' R2 U R U R2 U'",
    "R' U2 R U2 F U' R2 U' R2 U R U R2 U' R' F' U'",
  ] },
  { set: "S", n: 48, sub: 4, cp: "adj", algs: [
    "F2 R2 U2 R U2 R F R U2 R2 U2 R' F R2 U2 R2",
    "R U R U' R' U' F U' R2 U' R2 U2 R' U' R F' U'",
    "R U R2 F' U2 R U R U' R' U F R U' R2 U2 R",
  ] },
  { set: "S", n: 49, sub: 5, cp: "adj", algs: [
    "F R' U2 R F' R' F U2 F' R U2",
  ] },
  { set: "S", n: 50, sub: 5, cp: "adj", algs: [
    "R' U' F2 U' R2 U R2 U F2 R2 U2 R'",
    "R' U' R F U' R' U R U F' U2 R' U2 R U2",
    "R' U' R U' R2 F' R U R U' R' F U2 R U2",
  ] },
  { set: "S", n: 51, sub: 5, cp: "adj", algs: [
    "F R' U R U F' R' U F U F' R U2",
    "R' U2 R U2 F' U2 F' R' F U2 F' R F2",
    "R2 F R' U2 R F' R' U2 R' U2 F U2 F' U2",
  ] },
  { set: "S", n: 52, sub: 5, cp: "adj", algs: [
    "R F2 U R U R U' R U R2 U2 F2 R' U",
    "R U2 R2 U F2 U2 R2 U' R2 U' F2 U' R U",
    "F U2 R2 U2 R' U2 R' U' F R F' U' R' F' U2",
  ] },
  { set: "S", n: 53, sub: 5, cp: "adj", algs: [
    "R F2 R2 U R U2 R' U R U R F2 R' U",
    "R' U' F2 U R2 U2 R2 U' R2 U' R2 U2 F2 R",
    "R' U' R U F U' R' U2 R U F' U R' U R U2",
  ] },
  { set: "S", n: 54, sub: 5, cp: "adj", algs: [
    "F' U2 F2 R2 U F2 U F2 U' R2 U' F'",
    "R' U2 F2 U' R2 U2 R2 U' R2 U' R2 U' F2 R U",
    "R U2 R2 F R F' R' U' F' U F R2 U' R' U'",
  ] },
  { set: "S", n: 55, sub: 5, cp: "adj", algs: [
    "F' R U2 R U2 R' F R U2 R2 U' R U' R' U",
    "F U R' U' R F' R' U R2 U R' U R U2 R' U2",
    "R U R' F' U' R' U2 R U F R U' R2 U2 R U",
  ] },
  { set: "S", n: 56, sub: 5, cp: "adj", algs: [
    "F U R' F R F' R U2 R' U' R U R' F'",
    "R' U' F U F' R U R' U F U F' U' R",
    "F U2 R U2 R' U2 R U R' U R U' R' U2 F' U2",
  ] },
  { set: "S", n: 57, sub: 5, cp: "adj", algs: [
    "R F U R' U' R U R2 U' R2 F' R U R' U' R2",
    "R2 U' F' R2 F U R2 U R2 U' F' R2 F U R2",
    "R U' R F2 R' U2 R' U R U2 R' U R2 F2 R2 U2",
  ] },
  { set: "S", n: 58, sub: 5, cp: "adj", algs: [
    "R' F' U' F U2 R U' R2 F R2 U R' U' F' R",
    "R U' F U' R' U' R U F' U2 R2 U2 R U R' U R",
    "R' U' R2 U R2 U' R' F R2 U' R2 U' R2 U R2 F' U2",
  ] },
  { set: "S", n: 59, sub: 5, cp: "adj", algs: [
    "R' U2 R2 U F' R' U R U' F U' R' U2 R' U2 R U",
    "R2 F' R U R U' R' U R U R' U' R' U' F U R2",
    "R2 F' R' U R U' F R' U2 R2 U' R2 U' R' U2 R U2",
  ] },
  { set: "S", n: 60, sub: 5, cp: "adj", algs: [
    "R U' R' U' R F U R U2 R2 U R2 U R' F' U R'",
    "F R2 F' U2 R' U2 R2 U2 R U2 R F R F' R U'",
    "R' U2 R' U' R F' U' R' U2 R U F R U R' U2 R U'",
  ] },
  { set: "S", n: 61, sub: 6, cp: "adj", algs: [
    "R2 U F' R' U2 R U2 F U' R' U R'",
    "R U' F R' U R U' F' U2 R' U2 R U2 R'",
    "R U R2 F' R U R U' R' F U R U2 R' U",
  ] },
  { set: "S", n: 62, sub: 6, cp: "adj", algs: [
    "R' U' F U F' R U F U2 F' U'",
  ] },
  { set: "S", n: 63, sub: 6, cp: "adj", algs: [
    "R2 F R U R U' R' F' R U' R' U R U2",
    "R' F' U' F2 U2 F2 U' F2 U' F' R U",
  ] },
  { set: "S", n: 64, sub: 6, cp: "adj", algs: [
    "R' U' F U' R2 U R2 U F' R U' R U' R' U",
    "R F U' R2 U2 R2 U F' U R U2 R U' R U' R2",
    "F R' U' R2 U' R2 U2 F R F' R U' R' F' U2",
  ] },
  { set: "S", n: 65, sub: 6, cp: "adj", algs: [
    "F R2 U' R2 U' R U2 R' U' R U' R U R2 F'",
    "R' U' R2 U R F' U R' U' R F U R2 U2 R'",
    "R2 U R2 F U F' R2 U' R U2 F U2 F' R",
  ] },
  { set: "S", n: 66, sub: 6, cp: "adj", algs: [
    "R' U2 R U R2 U' R F' R' U R U' F U2 R U'",
    "R' U2 R2 U R' U R U R2 F' R' U R U' F R2",
    "R U F R' F' U2 R U R U F R2 F' U2 R2",
  ] },
  { set: "S", n: 67, sub: 6, cp: "adj", algs: [
    "F R U R' U' R' F' R U2 R U' R' U R U2 R'",
    "R2 U R2 F' R' U2 R U2 F R U R U' R U' R2",
    "R' U R2 U2 R' U2 R2 U' R F2 U' R2 U2 R2 U F2",
  ] },
  { set: "S", n: 68, sub: 6, cp: "adj", algs: [
    "F' U R' U' R F R' U R2 U R' U2 R U R' U2",
    "R U2 R2 U' R2 U' R2 U' R U' F U R' U' R F'",
    "F R2 U' R2 U R2 U F' U' R' U2 F' U' F R",
  ] },
  { set: "S", n: 69, sub: 6, cp: "adj", algs: [
    "R F U' R' U' R' U R U2 R' U R2 U F' U R'",
    "R U' F U' R' U2 R' U2 R2 U F' U' R U2 R' U2 R2",
    "R U2 F R2 U' R U' R' U2 R U R U2 F' U R' U'",
  ] },
  { set: "S", n: 70, sub: 6, cp: "adj", algs: [
    "R F U R2 U' R2 U' R2 U2 R U R U F' R' U2",
    "R' U2 R2 F' U2 R U2 R U2 R2 U2 R F R2 U2 R",
    "F R' U2 R' U R' F' R F R U' R U2 F' R",
  ] },
  { set: "S", n: 71, sub: 6, cp: "adj", algs: [
    "R' U' R2 U2 R' F' U F U R' U2 F R F' U2",
    "R2 U F2 U R U2 R U' R' U' R' U2 F2 U' R2 U",
    "F R' U R U' F' U R' U2 R F R' U R U' F' U'",
  ] },
  { set: "S", n: 72, sub: 6, cp: "adj", algs: [
    "R' F' U F U F' U2 F U' R U R' U R U",
    "R U2 R' F2 U' F2 U' F2 U2 F2 U' R U2 R'",
    "F U' R U R2 U' R2 U' R' U R' U R2 U' R' F' U2",
  ] },
  { set: "AS", n: 1, sub: 1, cp: "solved", algs: [
    "R U2 R' U' R U' R' U",
    "F U2 F' U' F U' F'",
  ] },
  { set: "AS", n: 2, sub: 1, cp: "solved", algs: [
    "R' U' R U' R' U2 R U2",
  ] },
  { set: "AS", n: 3, sub: 1, cp: "solved", algs: [
    "R U2 R2 U2 R2 U R2 U R2 U' R' U",
    "R U2 R2 U' R U' R' U2 R U2 R U2 R'",
    "R' U2 R' U2 R U R U' R2 U2 R U2 R U2",
  ] },
  { set: "AS", n: 4, sub: 1, cp: "solved", algs: [
    "R U R' U R' U' R2 U' R2 U2 R U2",
    "R U2 R2 U' R2 U' R' U R' U R U'",
    "R U R U' R2 U R2 U R U' R2 U R U2",
  ] },
  { set: "AS", n: 5, sub: 1, cp: "solved", algs: [
    "R' U' R2 U R2 U R2 U2 R2 U2 R U",
    "R U R2 U' R' U' R U R' U' R2 U2 R U2",
    "R U2 R U2 R2 U' R U R U2 R' U2 R' U",
  ] },
  { set: "AS", n: 6, sub: 1, cp: "solved", algs: [
    "R2 U R U' R2 U' R2 U2 R2 U' R U' R2",
    "R2 U R2 U R' U' R2 U R2 U' R U' R2",
    "R2 U' R' U R U R' U2 R' U R2 U R2 U2",
  ] },
  { set: "AS", n: 7, sub: 1, cp: "solved", algs: [
    "R2 U' R U R U R' U2 R U R2 U R2 U2",
    "R2 F2 R' U2 R' U' R U' R F2 R2 U'",
    "R' U' R' U2 R' U R' U' R2 U R' U R U R",
  ] },
  { set: "AS", n: 8, sub: 1, cp: "solved", algs: [
    "R U2 R2 U' R' U' R' U R U R2 U' R' U",
    "R' U' R2 U R U R' U' R' U' R2 U2 R U2",
    "R U R' U R U2 R' U R' U2 R U R' U R",
  ] },
  { set: "AS", n: 9, sub: 1, cp: "solved", algs: [
    "R2 U R2 U R' U2 R' U R U R' U' R2 U2",
    "R2 U' R U' R2 U R2 U' R' U R2 U R2 U",
    "R U' R U2 R U2 R2 U2 R2 U R U' R' U' R' U'",
  ] },
  { set: "AS", n: 10, sub: 1, cp: "solved", algs: [
    "R2 U R2 U R U2 R' U R U R U' R2 U2",
    "R U R U R' U R2 U' R' U R' U2 R' U' R'",
    "R U R U' R U' R U' R' U2 R' U R' U' R'",
  ] },
  { set: "AS", n: 11, sub: 1, cp: "solved", algs: [
    "R' U' R U' R2 U' R' U' R2 U R U R2 U2",
    "R2 U R U R2 U' R' U' R2 U' R U' R' U",
    "R U' R' U2 R U R U2 R U' R U R' U2 R2",
  ] },
  { set: "AS", n: 12, sub: 1, cp: "solved", algs: [
    "R U' R2 U' R U' R' U2 R' U2 R' U' R U' R2 U2",
    "R2 U' R U' R' U2 R' U2 R' U' R U' R2 U' R U2",
    "R2 U' R' U R' U2 R' U R' U2 R' U R' U' R2 U2",
  ] },
  { set: "AS", n: 13, sub: 2, cp: "diag", algs: [
    "F2 U' R' U' R U F' U2 R' U2 R F' U2",
    "F R U R' U' R' F2 R U2 R U2 R' F U",
    "R' U R U2 F U' R' U R U2 R' U' R F' U2",
  ] },
  { set: "AS", n: 14, sub: 2, cp: "diag", algs: [
    "F R U' R2 U' R U' R' U2 R2 U R' F' U",
    "R2 U R' F' U2 R' U' R U' F R U' R2 U'",
    "R' F R F' U2 R U' R' U' F R' F' R U",
  ] },
  { set: "AS", n: 15, sub: 2, cp: "diag", algs: [
    "F' R U R' U2 F U' F' U' R U' R' F",
    "R' F U2 F' U2 R' U F U' F' U' R2 U2",
    "R' U' R U2 F R' U R U' F' U R' U2 R U",
  ] },
  { set: "AS", n: 16, sub: 2, cp: "diag", algs: [
    "R2 U R2 F' R U R' U R U2 R' F R2 U' R2",
    "R U R' F' U' R U2 R' U2 R' U' F U R2 U2 R'",
    "R U2 R' F' R' U' R U' R' U2 R U' F U' R U2 R'",
  ] },
  { set: "AS", n: 17, sub: 2, cp: "diag", algs: [
    "F U R' U' R' U R U R' U2 R U2 R U2 F'",
    "R U2 R2 U' R2 F' R U R' U' R' F U' R' U",
    "F' U2 F U R2 U2 R2 U' R2 U' R2 U2 F' U F",
  ] },
  { set: "AS", n: 18, sub: 2, cp: "diag", algs: [
    "F U' R' U R U F' R' U R U' R' U2 R U",
    "R F R2 U' R2 U' R2 U R2 F' U R U R2 U' R2",
    "R2 U R2 U' R2 U' R F U' R2 U R2 U F' U2 R' U",
  ] },
  { set: "AS", n: 19, sub: 2, cp: "diag", algs: [
    "R U2 R' U' R F' U R' U R U2 F U' R' U2",
    "F' U2 F U' R2 U R2 U R2 U2 R2 F' U F",
    "R U' R2 U' F U F' R U F U2 F' R U2 R'",
  ] },
  { set: "AS", n: 20, sub: 2, cp: "diag", algs: [
    "F R U R' U' R U R' F R' F' R U' F'",
    "R U2 R2 F R F2 U F U' F R' F' R2 U2 R'",
    "R' F R2 F' U2 R F R F' R' U F' U F R'",
  ] },
  { set: "AS", n: 21, sub: 2, cp: "diag", algs: [
    "R' F R' F' R U2 F' U2 F R U2 R' U2 R",
    "R' F R2 F' R F R2 U R' U' R' F' U R2",
    "R' U' R2 U2 F U' R' U R U F' U R2 U2 R U2",
  ] },
  { set: "AS", n: 22, sub: 2, cp: "diag", algs: [
    "R U2 R F2 U2 R' U' R' U R2 U2 F2 R' U2 R'",
    "R U' R2 U2 R F' R' U R U' F R' U2 R2 U R' U2",
    "R' U R U2 R U R2 U2 F U' R2 U2 R2 U F' U R",
  ] },
  { set: "AS", n: 23, sub: 2, cp: "diag", algs: [
    "R U2 R' U' F2 R U2 R' U2 R' F2 R2 U' R' U",
    "F R2 U R2 U R2 U2 R' U2 R' U' R U' R' F' U",
    "F U2 R U2 R U2 R2 U' R2 U' R' U R' U' F' U'",
  ] },
  { set: "AS", n: 24, sub: 2, cp: "diag", algs: [
    "R U R' U' R' U' F U R2 U' R' U R U' R' F'",
    "R' U2 R U' F U' R' U2 R U F' U2 R' U R U2",
    "R U2 R U' F R F' R' U' R U2 R2 F' U' F",
  ] },
  { set: "AS", n: 25, sub: 3, cp: "adj", algs: [
    "R' U R U' F U R' U' R F'",
    "R' F U' F' U R U' F U F'",
    "R U' F' U R' U R U2 F U2 R' U",
  ] },
  { set: "AS", n: 26, sub: 3, cp: "adj", algs: [
    "R' U2 R' F' R U R U' R' F U2 R U2",
    "R' U2 F U F' R F U' F' R' U2 R U2",
  ] },
  { set: "AS", n: 27, sub: 3, cp: "adj", algs: [
    "R' U' R F U' R' U R U F' U' R' U R",
    "R U' R' U' R U R2 F R2 U R2 U' F' U R",
    "R' U' R U' F' R' F U F' R F R' U R",
  ] },
  { set: "AS", n: 28, sub: 3, cp: "adj", algs: [
    "F' R U R2 U' R' F U' R2 U R U R U2",
    "R' F U' R' U2 R U F' R' U R U R U2",
    "R2 F' R' U R U' F R' U2 R2 U' R U R",
  ] },
  { set: "AS", n: 29, sub: 3, cp: "adj", algs: [
    "F U2 F' R' U' R F R' U R U2 F' U2",
    "F U2 R F' U' F U F R' F' U2 F' U2",
    "F U2 R U' R' U' R U2 R' F' U F U F' U2",
  ] },
  { set: "AS", n: 30, sub: 3, cp: "adj", algs: [
    "R2 F R' U R U' F' R2 U2 R' U' R U R U2",
    "R' U F2 U2 F2 U R U R' F2 U F2 R",
    "R' U F2 U R2 U2 R2 U' R2 U' R2 U2 F2 U' R",
  ] },
  { set: "AS", n: 31, sub: 3, cp: "adj", algs: [
    "R2 U2 R U R U' R2 U2 R2 F U R' U' R F'",
    "F U' R' U2 R' U R2 U F' U2 R U2 R2 U2 R' U",
    "R U2 R' U2 R' U' F U R2 U2 R' U' R U R' F'",
  ] },
  { set: "AS", n: 32, sub: 3, cp: "adj", algs: [
    "R' U' R F2 R' U R2 U2 R' U R U R' F2 U2",
    "R2 U' R' U' R U R U R2 U' F U R' U' R F'",
    "F U2 F' U2 R' U F U' F' U2 R U' R' U2 R",
  ] },
  { set: "AS", n: 33, sub: 3, cp: "adj", algs: [
    "F U R2 U' R U' R2 U' R U R U2 R U' R F'",
    "F' R' U2 R F U' R' U2 R F' R' U R F U'",
    "F' R U R U' R' F R2 U R U2 R U2 R' U' R U",
  ] },
  { set: "AS", n: 34, sub: 3, cp: "adj", algs: [
    "F U' R' U' R' U' R2 U2 R2 U' R2 F' U2 R' U2 R",
    "F R' U R U2 R2 U R2 U F' U R U R' U' R' U'",
    "R2 U2 F' R F U2 F U2 R' U2 R F2 R' F R2",
  ] },
  { set: "AS", n: 35, sub: 3, cp: "adj", algs: [
    "R2 F' R2 F R F' U2 R U2 F U2 R2 U2 R U'",
    "R F R' U R' U' R2 F' U' R' U R2 U R' U' R2 U2",
    "R F U' R2 U' R2 U F' U' R' U R2 U R U' R2 U2",
  ] },
  { set: "AS", n: 36, sub: 3, cp: "adj", algs: [
    "F R U R2 U' R' U' R2 U R2 U F' U2 R' U2 R U",
    "R U F U R2 U' R2 F' U R U R U R U2 R2 U",
    "R2 U R2 F' U R' U' R F R U R2 U' R U' R2 U2",
  ] },
  { set: "AS", n: 37, sub: 4, cp: "adj", algs: [
    "R U' R U F' U2 R' U2 R F U' R2",
    "R U2 R' U2 R U2 F U R' U' R F' U R'",
    "R U' F U R2 U2 R2 U R2 U R2 F' U2 R' U2",
  ] },
  { set: "AS", n: 38, sub: 4, cp: "adj", algs: [
    "F U2 F' U' R' F U' F' U R U",
  ] },
  { set: "AS", n: 39, sub: 4, cp: "adj", algs: [
    "R U R' U R' F U' R2 U' R2 U F' U R",
    "R2 U R' U R' U2 R' U' F U' R2 U2 R2 U F' R'",
    "F R U R' F R' F' U2 R2 U R2 U R F' U2",
  ] },
  { set: "AS", n: 40, sub: 4, cp: "adj", algs: [
    "R' U' R U R' F R U R' U' R' F' R2 U'",
    "R' F U F2 U F2 U2 F2 U F R U'",
  ] },
  { set: "AS", n: 41, sub: 4, cp: "adj", algs: [
    "R F U' R' U' R' U2 R2 U R2 U R2 U' F' R'",
    "F' U2 R2 U F R U' R2 F' R' U2 F U R' U2",
    "R2 F' R2 F R U F' U R U' F U R2 U2 R",
  ] },
  { set: "AS", n: 42, sub: 4, cp: "adj", algs: [
    "R' F U2 F' U2 R' U R2 F U' F' R2 U' R2",
    "F R2 U' R' U R' U R U2 R' U R2 U R2 F' U2",
    "R F U' R2 U' R2 U F' R U2 R U' R U' R2 U",
  ] },
  { set: "AS", n: 43, sub: 4, cp: "adj", algs: [
    "R' U' R2 F2 U R' U R U2 F2 R' U' R' U' R",
    "R' U2 F' U R' U' R F R' U R2 U' R' U2 R U2",
    "R2 U2 F R2 F' U' R' U' R' U2 F R F' U' R'",
  ] },
  { set: "AS", n: 44, sub: 4, cp: "adj", algs: [
    "R U' R' U2 R U' R2 U' R F' R' U R U' F U2",
    "R' U' R U' R' F' U R' U' R F R' U R U R",
    "F U2 F' R F R' U R F' R' U2 F U' F'",
  ] },
  { set: "AS", n: 45, sub: 4, cp: "adj", algs: [
    "F R U R2 U' R U' R U R2 U R2 U' R' U F'",
    "R' U' R U' R' U F' U2 F U' F' U' F R U",
    "R U R' U' F R U' R' U R U R2 F' R2 U2 R' U2",
  ] },
  { set: "AS", n: 46, sub: 4, cp: "adj", algs: [
    "R2 U R' U R' U' R' F' U2 R' U2 R F R2 U' R2",
    "F2 U' R2 U2 R2 U F2 R' U R2 U2 R U2 R2 U' R",
    "R' F' U' R' U' R U F2 R2 U R2 U' F' R U R2",
  ] },
  { set: "AS", n: 47, sub: 4, cp: "adj", algs: [
    "R2 U R2 U' R' F U' R2 U R U2 R U F' R' U'",
    "R U' F U' R2 U' R U2 R' U' R U R U F' R' U'",
    "R U' F U2 R' U' R' U2 R U R' U R2 F' U2 R' U2",
  ] },
  { set: "AS", n: 48, sub: 4, cp: "adj", algs: [
    "F R' F' U2 R U' F' U' F R U2 R2 U R U2",
    "R2 U F2 U2 R U R U R' U2 R' U' F2 U' R2 U'",
    "F U R' U' R F' R' U2 R U' F U R' U' R F' U",
  ] },
  { set: "AS", n: 49, sub: 5, cp: "adj", algs: [
    "F U R' U' R F' U' R' U2 R U2",
  ] },
  { set: "AS", n: 50, sub: 5, cp: "adj", algs: [
    "F R U R2 U2 R2 U R2 U R F'",
    "R U R' F' R U2 R' U2 R' F R2 U' R'",
  ] },
  { set: "AS", n: 51, sub: 5, cp: "adj", algs: [
    "R U' F U' R' U' R U F' R' U' R U' R'",
    "R U2 R2 U' R2 U' R' U F U' R' U2 R U F'",
    "F U' R2 U' R2 U F' R U R U R U2 R2 U2 R",
  ] },
  { set: "AS", n: 52, sub: 5, cp: "adj", algs: [
    "R F R2 U R U' R F' U2 R U2 R U2 R2 U2",
    "F2 U' R F U2 F' U2 R' U F U' F U",
    "F' R' F U2 F' R F R' U R U' R' U2 R",
  ] },
  { set: "AS", n: 53, sub: 5, cp: "adj", algs: [
    "R' U' F' R U R' U' R' F R2 U' R' U R U",
    "R' U' R U' F U' R' U R U F' U' R' U2 R",
    "F' R U' R U F' U2 R' U2 R F U' R2 F",
  ] },
  { set: "AS", n: 54, sub: 5, cp: "adj", algs: [
    "F R U' R' U' R U2 R' U F' U' F U' F'",
    "R U2 R2 U R U' F' U R' U' R F U' R U' R'",
    "R2 U R2 U R2 U2 R2 F' R U R' U R U2 R' F",
  ] },
  { set: "AS", n: 55, sub: 5, cp: "adj", algs: [
    "R U2 R2 U' R' F' U' R' U R U F R2 U' R' U'",
    "R' U' F R' F' U2 R U F' R' U R U F R",
    "R U2 F R' U' R2 U2 R U2 R U2 R2 U' F' U2 R' U",
  ] },
  { set: "AS", n: 56, sub: 5, cp: "adj", algs: [
    "F R U' R' U' R' U2 R2 U R2 U R2 U' R' F' U2",
    "F R2 U' R2 U2 R2 U R U' R' U' R U2 R U' F'",
    "R' U' R U2 F U2 F' U' F U2 R' U2 R U F'",
  ] },
  { set: "AS", n: 57, sub: 5, cp: "adj", algs: [
    "R U R' U R U2 R2 U2 R U F R' U R U' F'",
    "F R' U' R2 F R' F' R U' R2 U R2 F' R' U R",
    "F U R U2 R' U' R' U' F' U F R2 U2 R' U' F'",
  ] },
  { set: "AS", n: 58, sub: 5, cp: "adj", algs: [
    "F U R' U' R F' R U R2 U R2 U2 R2 U2 R U",
    "R' U' F' R U2 R' U2 R' F R U2 R U R' U2 R",
    "R2 U' R U R U2 F U' R' U2 R U F' R2 U R2 U",
  ] },
  { set: "AS", n: 59, sub: 5, cp: "adj", algs: [
    "F U R' U F2 U' F2 U' R F' U F' U F",
    "R U' R U2 R U2 R2 U R' F R' U R' U' R2 F' U'",
    "R2 U' R U R U2 F R U R2 U' R' F' R2 U R2 U",
  ] },
  { set: "AS", n: 60, sub: 5, cp: "adj", algs: [
    "F R U R2 U' R' F' R2 U R2 U R2 U' R U R U",
    "R U2 R2 U' R2 F' U' R' U R U F U' R2 U R U2",
    "F U F2 U2 F R U' R' U' F U2 R' F' R U'",
  ] },
  { set: "AS", n: 61, sub: 6, cp: "adj", algs: [
    "R' F U2 F' R F R' U2 R F' U'",
  ] },
  { set: "AS", n: 62, sub: 6, cp: "adj", algs: [
    "R U2 R2 F2 U' R2 U' R2 U F2 U R U",
    "R' U2 F' R U R' U' R' F R2 U R' U R U",
    "R' U2 R U2 F U' R' U' R U F' R' U R U",
  ] },
  { set: "AS", n: 63, sub: 6, cp: "adj", algs: [
    "R U R' U R2 U2 R' F' R U2 R' U2 R' F",
    "R U2 R' U' R U' R2 U' R F R' U R U' F'",
    "F2 R' U' R' U' R U R F2 U R U2 R U2 R'",
  ] },
  { set: "AS", n: 64, sub: 6, cp: "adj", algs: [
    "R' F U' F' U' R F U' R' U' R F' U'",
    "F U2 F' U2 R U2 R F R' U2 R F' R2 U",
    "R U2 R' F U F' U' R U2 R' U F U F'",
  ] },
  { set: "AS", n: 65, sub: 6, cp: "adj", algs: [
    "R F2 R' U' R' U' R U2 R' U' R2 F2 R' U'",
    "R' F2 U2 R2 U R2 U R2 U2 R2 U' F2 U R U",
    "F' R2 U' F' U' F' U F' U' F2 U2 R2 F",
  ] },
  { set: "AS", n: 66, sub: 6, cp: "adj", algs: [
    "R F2 U2 R2 U' R' U R' U' R' U' F2 R' U'",
    "R' U F2 U R2 U R2 U2 F2 U' R2 U2 R' U2",
    "F' R' F U' R U' R' U2 R U' R' F' R F",
  ] },
  { set: "AS", n: 67, sub: 6, cp: "adj", algs: [
    "F U2 R U R' U' R U' R' U2 R U2 R' U2 F'",
    "R' U' R U' R' U F' U R' U' R F R' U R2",
    "F R U' R' U R U2 R' F R' F' R U' F'",
  ] },
  { set: "AS", n: 68, sub: 6, cp: "adj", algs: [
    "R' F2 U R2 U R2 U R2 U2 R2 U F2 U2 R U2",
    "F U R2 U F2 U' F2 U' R2 F2 U2 F U",
    "R U R2 F' U' F U R F R' F' R2 U2 R' U",
  ] },
  { set: "AS", n: 69, sub: 6, cp: "adj", algs: [
    "R' U2 R U R2 U R2 U2 R F' U R' U' R F R2",
    "R' U2 R U2 R U F' U R' U' R F U' R2 U2 R",
    "R' U2 R2 U R U2 F' U' R' U' R U F U' R2 U' R'",
  ] },
  { set: "AS", n: 70, sub: 6, cp: "adj", algs: [
    "R U2 R U2 R' U' R' U R F' R U2 R' U2 R' F",
    "R U2 R' U R' U2 R U2 R' F' R' U R U' F R2",
    "R2 U R U' R' F R2 U R2 U' R' U R U' F' R'",
  ] },
  { set: "AS", n: 71, sub: 6, cp: "adj", algs: [
    "R' U2 R U' R' F' U' R' U2 R U F R' U R U2 R",
    "R' F R' F' R' U2 R' U2 R2 U2 R U2 F R2 F' U",
    "R U' F R U' R2 U' R2 U2 R' U' F' R' U R U R' U",
  ] },
  { set: "AS", n: 72, sub: 6, cp: "adj", algs: [
    "F R2 U' R2 U R2 U R2 F' R U R2 U' R2 U R U'",
    "R F' U R' U' R F R2 U2 R' U2 R U R2 U R2 U",
    "F' U2 F2 U' R2 U R2 U F' R2 U2 R2 F' U F",
  ] },
];
