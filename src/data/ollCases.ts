/**
 * OLL — 57 case. Sửa danh sách công thức ở đây rồi chạy `npm run verify` (đừng thêm công thức chưa kiểm)
 * Hình 2D/3D được suy ra từ công thức đầu tiên của mỗi case.
 */
import { AlgorithmCase } from '../types';
import { buildOllCase, OllDef } from '../utils/caseBuilder';

const OLL_DEFS: OllDef[] = [
  { number: 1, family: "Dot", algs: [
    "R U2 R2 F R F' U2 R' F R F'",
  ] },
  { number: 2, family: "Dot", algs: [
    "F R U R' U' F' f R U R' U' f'",
    "r U r' U2 r U2 R' U2 R U' r'",
  ] },
  { number: 3, family: "Dot", algs: [
    "f R U R' U' f' U' F R U R' U' F'",
    "r' R2 U R' U r U2 r' U M'",
  ] },
  { number: 4, family: "Dot", algs: [
    "f R U R' U' f' U F R U R' U' F'",
    "M U' r U2 r' U' R U' R' M'",
  ] },
  { number: 5, family: "Square", algs: [
    "r' U2 R U R' U r",
    "l' U2 L U L' U l",
  ] },
  { number: 6, family: "Square", algs: [
    "r U2 R' U' R U' r'",
    "l U2 L' U' L U' l'",
  ] },
  { number: 7, family: "Lightning", algs: [
    "r U R' U R U2 r'",
    "l U L' U L U2 l'",
  ] },
  { number: 8, family: "Lightning", algs: [
    "r' U' R U' R' U2 r",
    "l' U' L U' L' U2 l",
  ] },
  { number: 9, family: "Fish", algs: [
    "R U R' U' R' F R2 U R' U' F'",
  ] },
  { number: 10, family: "Fish", algs: [
    "R U R' U R' F R F' R U2 R'",
  ] },
  { number: 11, family: "Lightning", algs: [
    "r U R' U R' F R F' R U2 r'",
  ] },
  { number: 12, family: "Lightning", algs: [
    "F R U R' U' F' U F R U R' U' F'",
  ] },
  { number: 13, family: "Knight", algs: [
    "F U R U' R2 F' R U R U' R'",
    "r U' r' U' r U r' y' R' U R",
    "F U R U2 R' U' R U R' F'",
  ] },
  { number: 14, family: "Knight", algs: [
    "R' F R U R' F' R F U' F'",
    "F' U' L' U2 L U L' U' L F",
  ] },
  { number: 15, family: "Knight", algs: [
    "r' U' r R' U' R U r' U r",
    "l' U' l L' U' L U l' U l",
  ] },
  { number: 16, family: "Knight", algs: [
    "r U r' R U R' U' r U' r'",
    "R' F R U R' U' F' R U' R' U2 R",
  ] },
  { number: 17, family: "Dot", algs: [
    "R U R' U R' F R F' U2 R' F R F'",
  ] },
  { number: 18, family: "Dot", algs: [
    "r U R' U R U2 r2 U' R U' R' U2 r",
  ] },
  { number: 19, family: "Dot", algs: [
    "r' R U R U R' U' r R2 F R F'",
    "M U R U R' U' M' R' F R F'",
  ] },
  { number: 20, family: "Dot", algs: [
    "r U R' U' M2 U R U' R' U' M'",
    "M U R U R' U' M2 U R U' r'",
  ] },
  { number: 21, family: "Cross", aka: ["H","Double Sune"], algs: [
    "R U2 R' U' R U R' U' R U' R'",
    "F R U R' U' R U R' U' R U R' U' F'",
  ] },
  { number: 22, family: "Cross", aka: ["Pi"], algs: [
    "R U2 R2 U' R2 U' R2 U2 R",
    "f R U R' U' f' F R U R' U' F'",
  ] },
  { number: 23, family: "Cross", aka: ["U","Headlights"], algs: [
    "R2 D R' U2 R D' R' U2 R'",
    "R2 D' R U2 R' D R U2 R",
  ] },
  { number: 24, family: "Cross", aka: ["T","Chameleon"], algs: [
    "r U R' U' r' F R F'",
    "R' F' r U R U' r' F",
  ] },
  { number: 25, family: "Cross", aka: ["L","Bowtie"], algs: [
    "F' r U R' U' r' F R",
  ] },
  { number: 26, family: "Cross", aka: ["Anti-Sune"], algs: [
    "R U2 R' U' R U' R'",
    "R' U' R U' R' U2 R",
  ] },
  { number: 27, family: "Cross", aka: ["Sune"], algs: [
    "R U R' U R U2 R'",
    "y' R' U2 R U R' U R",
  ] },
  { number: 28, family: "Corners", aka: ["Stealth"], algs: [
    "r U R' U' r' R U R U' R'",
    "M' U M U2 M' U M",
  ] },
  { number: 29, family: "Awkward", algs: [
    "R U R' U' R U' R' F' U' F R U R'",
    "M U R U R' U' R' F R F' M'",
  ] },
  { number: 30, family: "Awkward", algs: [
    "F R' F R2 U' R' U' R U R' F2",
  ] },
  { number: 31, family: "P", algs: [
    "R' U' F U R U' R' F' R",
  ] },
  { number: 32, family: "P", algs: [
    "R U B' U' R' U R B R'",
  ] },
  { number: 33, family: "T", algs: [
    "R U R' U' R' F R F'",
  ] },
  { number: 34, family: "C", algs: [
    "R U R2 U' R' F R U R U' F'",
    "R U R' U' B' R' F R F' B",
  ] },
  { number: 35, family: "Fish", algs: [
    "R U2 R2 F R F' R U2 R'",
  ] },
  { number: 36, family: "W", algs: [
    "R' U' R U' R' U R U R B' R' B",
    "L' U' L U' L' U L U L F' L' F",
  ] },
  { number: 37, family: "Fish", algs: [
    "F R' F' R U R U' R'",
    "F R U' R' U' R U R' F'",
  ] },
  { number: 38, family: "W", algs: [
    "R U R' U R U' R' U' R' F R F'",
  ] },
  { number: 39, family: "Lightning", algs: [
    "R U R' F' U' F U R U2 R'",
    "L F' L' U' L U F U' L'",
    "R B' R' U' R U B U' R'",
  ] },
  { number: 40, family: "Lightning", algs: [
    "R' F R U R' U' F' U R",
  ] },
  { number: 41, family: "Awkward", algs: [
    "R U R' U R U2 R' F R U R' U' F'",
    "R U' R' U2 R U y R U' R' U' F'",
  ] },
  { number: 42, family: "Awkward", algs: [
    "R' U' R U' R' U2 R F R U R' U' F'",
    "R' U2 R U R' U R U F R U R' U' F'",
  ] },
  { number: 43, family: "P", algs: [
    "R' U' F' U F R",
    "f' L' U' L U f",
    "R' U' F R' F' R U R",
  ] },
  { number: 44, family: "P", algs: [
    "F U R U' R' F'",
    "f R U R' U' f'",
  ] },
  { number: 45, family: "T", algs: [
    "F R U R' U' F'",
    "R' F' U' F U R",
  ] },
  { number: 46, family: "C", algs: [
    "R' U' R' F R F' U R",
  ] },
  { number: 47, family: "L", algs: [
    "F' L' U' L U L' U' L U F",
    "R' U' R' F R F' R' F R F' U R",
  ] },
  { number: 48, family: "L", algs: [
    "F R U R' U' R U R' U' F'",
  ] },
  { number: 49, family: "L", algs: [
    "R B' R2 F R2 B R2 F' R",
    "r U' r2 U r2 U r2 U' r",
    "R' F R' F' R2 U2 y R' F R F'",
  ] },
  { number: 50, family: "L", algs: [
    "R' F R2 B' R2 F' R2 B R'",
    "r' U r2 U' r2 U' r2 U r'",
  ] },
  { number: 51, family: "Line", algs: [
    "F U R U' R' U R U' R' F'",
    "f R U R' U' R U R' U' f'",
  ] },
  { number: 52, family: "Line", algs: [
    "R U R' U R U' B U' B' R'",
    "R' U' R U' R' d R' U R B",
  ] },
  { number: 53, family: "L", algs: [
    "r' U' R U' R' U R U' R' U2 r",
    "l' U2 L U L' U' L U L' U l",
  ] },
  { number: 54, family: "L", algs: [
    "r U R' U R U' R' U R U2 r'",
  ] },
  { number: 55, family: "Line", algs: [
    "R' F R U R U' R2 F' R2 U' R' U R U R'",
    "r U2 R2 F R F' U2 r' F R F'",
  ] },
  { number: 56, family: "Line", algs: [
    "r U r' U R U' R' U R U' R' r U' r'",
    "r' U' r U' R' U R U' R' U R r' U r",
  ] },
  { number: 57, family: "Corners", algs: [
    "R U R' U' M' U R U' r'",
  ] },
];

export const OLL_CASES: AlgorithmCase[] = OLL_DEFS.map(buildOllCase);
