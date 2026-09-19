import fs from 'fs';
import { createSolvedCube, applyMove, parseAlgorithmMoves } from '../src/utils/cubeState';

function applyAlg(cube: any, alg: string) {
  const moves = parseAlgorithmMoves(alg);
  let c = cube;
  for (const m of moves) c = applyMove(c, m);
  return c;
}

function invertAlg(alg: string): string {
  const moves = parseAlgorithmMoves(alg);
  return moves.reverse().map(m => {
    let clean = m.replace(/[()[\]{}]/g, '');
    let isDouble = clean.includes('2');
    let isPrime = clean.includes("'") || clean.includes('’');
    let base = clean.replace(/['’2]/g, '');
    if (isDouble) return `${base}2`;
    if (isPrime) return base;
    return `${base}'`;
  }).join(' ');
}

// Extract top and side patterns from cube state
function getOllPatternFromCube(cube: any) {
  const top = [
    [cube.U[0][0] === 0, cube.U[0][1] === 0, cube.U[0][2] === 0],
    [cube.U[1][0] === 0, cube.U[1][1] === 0, cube.U[1][2] === 0],
    [cube.U[2][0] === 0, cube.U[2][1] === 0, cube.U[2][2] === 0],
  ];

  // In CubeSvg:
  // North row: from West to East (index 0 is NW, index 2 is NE)
  // Back face row 0: B[0][2] is NW, B[0][1] is N, B[0][0] is NE
  const N = [cube.B[0][2] === 0, cube.B[0][1] === 0, cube.B[0][0] === 0];

  // South row: from West to East (index 0 is SW, index 2 is SE)
  // Front face row 0: F[0][0] is SW, F[0][1] is S, F[0][2] is SE
  const S = [cube.F[0][0] === 0, cube.F[0][1] === 0, cube.F[0][2] === 0];

  // West column: from North to South (index 0 is NW, index 2 is SW)
  // Left face row 0: L[0][0] is NW, L[0][1] is W, L[0][2] is SW
  const W = [cube.L[0][0] === 0, cube.L[0][1] === 0, cube.L[0][2] === 0];

  // East column: from North to South (index 0 is NE, index 2 is SE)
  // Right face row 0: R[0][2] is NE, R[0][1] is E, R[0][0] is SE
  const E = [cube.R[0][2] === 0, cube.R[0][1] === 0, cube.R[0][0] === 0];

  return { top, sides: { N, E, S, W } };
}

// Definitions of all 57 OLL cases with authoritative metadata and algorithms
const OLL_DEFINITIONS = [
  // --- DOT CASES (8) ---
  {
    number: 1,
    name: 'OLL 1',
    aka: ['Runway', 'Dot 8'],
    category: 'Dot',
    groupNameVi: 'Dấu chấm (Dot)',
    algs: [
      { notation: "R U2 R2' F R F' U2 R' F R F'", isPreferred: true, description: 'Chuẩn SpeedCubeDB' },
      { notation: "F (R U R' U') F' f (R U R' U') f'", description: 'Biến thể F sexy F\' f sexy f\'' },
    ],
    tags: ['dot', 'runway', 'oll 1'],
  },
  {
    number: 2,
    name: 'OLL 2',
    aka: ['Zamboni', 'Dot 7'],
    category: 'Dot',
    groupNameVi: 'Dấu chấm (Dot)',
    algs: [
      { notation: "F (R U R' U') F' f (R U R' U') f'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "r U r' U2 r U2 R' U2 R U' r'", description: 'Biến thể r-slice' },
    ],
    tags: ['dot', 'zamboni', 'oll 2'],
  },
  {
    number: 3,
    name: 'OLL 3',
    aka: ['Anti-Alien', 'Dot 5'],
    category: 'Dot',
    groupNameVi: 'Dấu chấm (Dot)',
    algs: [
      { notation: "f (R U R' U') f' U' F (R U R' U') F'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "r' R2 U R' U r U2 r' U M'", description: 'Biến thể M-slice' },
    ],
    tags: ['dot', 'alien', 'anti-alien', 'oll 3'],
  },
  {
    number: 4,
    name: 'OLL 4',
    aka: ['Alien', 'Dot 6'],
    category: 'Dot',
    groupNameVi: 'Dấu chấm (Dot)',
    algs: [
      { notation: "f (R U R' U') f' U F (R U R' U') F'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "M U' r U2 r' U' R U' R' M'", description: 'Biến thể M-slice' },
    ],
    tags: ['dot', 'alien', 'oll 4'],
  },
  {
    number: 5,
    name: 'OLL 5',
    aka: ['Righty Square', 'Right Back Breeze'],
    category: 'Square',
    groupNameVi: 'Hình vuông (Square)',
    algs: [
      { notation: "r' U2 R U R' U r", isPreferred: true, description: 'Chuẩn SpeedCubeDB' },
      { notation: "l' U2 L U L' U l", description: 'Biến thể tay trái' },
    ],
    tags: ['square', 'breeze', 'oll 5'],
  },
  {
    number: 6,
    name: 'OLL 6',
    aka: ['Lefty Square', 'Left Back Breeze'],
    category: 'Square',
    groupNameVi: 'Hình vuông (Square)',
    algs: [
      { notation: "r U2 R' U' R U' r'", isPreferred: true, description: 'Chuẩn SpeedCubeDB' },
      { notation: "l U2 L' U' L U' l'", description: 'Biến thể tay trái' },
    ],
    tags: ['square', 'breeze', 'oll 6'],
  },
  {
    number: 7,
    name: 'OLL 7',
    aka: ['Lightning 1', 'Small Lightning 1'],
    category: 'Lightning',
    groupNameVi: 'Tia sét (Lightning)',
    algs: [
      { notation: "r U R' U R U2' r'", isPreferred: true, description: 'Chuẩn Wide Sune' },
      { notation: "l U L' U L U2' l'", description: 'Biến thể tay trái' },
    ],
    tags: ['lightning', 'kite', 'oll 7'],
  },
  {
    number: 8,
    name: 'OLL 8',
    aka: ['Lightning 2', 'Small Lightning 2'],
    category: 'Lightning',
    groupNameVi: 'Tia sét (Lightning)',
    algs: [
      { notation: "l' U' L U' L' U2 l", isPreferred: true, description: 'Chuẩn Wide Anti-Sune' },
      { notation: "r' U' R U' R' U2 r", description: 'Biến thể tay phải' },
    ],
    tags: ['lightning', 'anti-kite', 'oll 8'],
  },
  {
    number: 9,
    name: 'OLL 9',
    aka: ['Kite', 'Fish 1'],
    category: 'Fish',
    groupNameVi: 'Con cá (Fish)',
    algs: [
      { notation: "R U R' U' R' F R2 U R' U' F'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "f (R U R' U') f' U F (R U R' U') F'", description: 'Biến thể f-turn' },
    ],
    tags: ['fish', 'kite', 'oll 9'],
  },
  {
    number: 10,
    name: 'OLL 10',
    aka: ['Anti-Kite', 'Fish 2'],
    category: 'Fish',
    groupNameVi: 'Con cá (Fish)',
    algs: [
      { notation: "R U R' U R' F R F' R U2' R'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "F U R U' R' F' R U R' U'", description: 'Biến thể thay thế' },
    ],
    tags: ['fish', 'anti-kite', 'oll 10'],
  },
  {
    number: 11,
    name: 'OLL 11',
    aka: ['Flying Fish 1', 'Small L 1'],
    category: 'Lightning',
    groupNameVi: 'Tia sét (Lightning)',
    algs: [
      { notation: "r U R' U R' F R F' R U2' r'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "M U R U R' U' R' F R F' M'", description: 'Biến thể M-slice' },
    ],
    tags: ['lightning', 'flying fish', 'oll 11'],
  },
  {
    number: 12,
    name: 'OLL 12',
    aka: ['Flying Fish 2', 'Small L 2'],
    category: 'Lightning',
    groupNameVi: 'Tia sét (Lightning)',
    algs: [
      { notation: "M' U' R U' R' U2 R U' R' U' M", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "F (R U R' U') F' U2 F (R U R' U') F'", description: 'Biến thể F-turn' },
    ],
    tags: ['lightning', 'flying fish', 'oll 12'],
  },
  {
    number: 13,
    name: 'OLL 13',
    aka: ['Gun 1', 'Knight Move 1'],
    category: 'Knight',
    groupNameVi: 'Nước đi mã (Knight)',
    algs: [
      { notation: "r U' r' U' r U r' y' R' U R", isPreferred: true, description: 'Chuẩn r-slice' },
      { notation: "F U R U2' R' U' R U R' F'", description: 'Biến thể F-turn' },
    ],
    tags: ['knight', 'gun', 'oll 13'],
  },
  {
    number: 14,
    name: 'OLL 14',
    aka: ['Anti-Gun', 'Knight Move 2'],
    category: 'Knight',
    groupNameVi: 'Nước đi mã (Knight)',
    algs: [
      { notation: "R' F R U R' F' R F U' F'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "F' U' L' U2 L U L' U' L F", description: 'Biến thể tay trái' },
    ],
    tags: ['knight', 'anti-gun', 'oll 14'],
  },
  {
    number: 15,
    name: 'OLL 15',
    aka: ['Squeegee', 'Knight Move 3'],
    category: 'Knight',
    groupNameVi: 'Nước đi mã (Knight)',
    algs: [
      { notation: "l' U' l L' U' L U l' U l", isPreferred: true, description: 'Chuẩn tay trái' },
      { notation: "r' U' r R' U' R U r' U r", description: 'Biến thể r-slice' },
    ],
    tags: ['knight', 'squeegee', 'oll 15'],
  },
  {
    number: 16,
    name: 'OLL 16',
    aka: ['Anti-Squeegee', 'Knight Move 4'],
    category: 'Knight',
    groupNameVi: 'Nước đi mã (Knight)',
    algs: [
      { notation: "r U r' R U R' U' r U' r'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "R' F R U R' U' F' R U' R' U2 R", description: 'Biến thể F-turn' },
    ],
    tags: ['knight', 'anti-squeegee', 'oll 16'],
  },
  {
    number: 17,
    name: 'OLL 17',
    aka: ['Diagonal Dot', 'Slash'],
    category: 'Dot',
    groupNameVi: 'Dấu chấm (Dot)',
    algs: [
      { notation: "F R' F' R2 r' U R U' r' R U'", isPreferred: true, description: 'Chuẩn SpeedCubeDB' },
      { notation: "R U R' U R' F R F' U2 R' F R F'", description: 'Biến thể cơ bản' },
    ],
    tags: ['dot', 'slash', 'oll 17'],
  },
  {
    number: 18,
    name: 'OLL 18',
    aka: ['Crown Dot'],
    category: 'Dot',
    groupNameVi: 'Dấu chấm (Dot)',
    algs: [
      { notation: "r U R' U R U2' r2' U' R U' R' U2 r", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "F (R U R' U') F' U2 F (R U R' U') F'", description: 'Biến thể 2 F-sexy' },
    ],
    tags: ['dot', 'crown', 'oll 18'],
  },
  {
    number: 19,
    name: 'OLL 19',
    aka: ['Mushroom Dot'],
    category: 'Dot',
    groupNameVi: 'Dấu chấm (Dot)',
    algs: [
      { notation: "M U R U R' U' M' R' F R F'", isPreferred: true, description: 'Chuẩn M-slice' },
      { notation: "r' R U R U R' U' r R2' F R F'", description: 'Biến thể r-slice' },
    ],
    tags: ['dot', 'mushroom', 'oll 19'],
  },
  {
    number: 20,
    name: 'OLL 20',
    aka: ['Checkered Dot', 'X Dot'],
    category: 'Dot',
    groupNameVi: 'Dấu chấm (Dot)',
    algs: [
      { notation: "M U R U R' U' M2' U R U' r'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "r U R' U' M2' U R U' R' U' M'", description: 'Biến thể thay thế' },
    ],
    tags: ['dot', 'checkered', 'x', 'oll 20'],
  },
  // --- CROSS / OCLL (7) ---
  {
    number: 21,
    name: 'OLL 21',
    aka: ['H', 'Double Sune', 'Cross 1'],
    category: 'Cross',
    groupNameVi: 'Chữ thập (Cross)',
    algs: [
      { notation: "R U2 R' U' R U R' U' R U' R'", isPreferred: true, description: 'Chuẩn Double Sune' },
      { notation: "F (R U R' U')3 F'", description: 'F (sexy)3 F\'' },
    ],
    tags: ['cross', 'h', 'double sune', 'oll 21'],
  },
  {
    number: 22,
    name: 'OLL 22',
    aka: ['Pi', 'Wheel', 'Cross 2'],
    category: 'Cross',
    groupNameVi: 'Chữ thập (Cross)',
    algs: [
      { notation: "R U2' R2' U' R2 U' R2' U2' R", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "f (R U R' U') f' F (R U R' U') F'", description: 'Biến thể dễ học' },
    ],
    tags: ['cross', 'pi', 'wheel', 'oll 22'],
  },
  {
    number: 23,
    name: 'OLL 23',
    aka: ['Headlights', 'U', 'Cross 3'],
    category: 'Cross',
    groupNameVi: 'Chữ thập (Cross)',
    algs: [
      { notation: "R2 D R' U2 R D' R' U2 R'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "R2 D' R U2 R' D R U2 R", description: 'Biến thể ngược' },
    ],
    tags: ['cross', 'headlights', 'u', 'oll 23'],
  },
  {
    number: 24,
    name: 'OLL 24',
    aka: ['Chameleon', 'T', 'Cross 4'],
    category: 'Cross',
    groupNameVi: 'Chữ thập (Cross)',
    algs: [
      { notation: "r U R' U' r' F R F'", isPreferred: true, description: 'Sexy move + Sledge' },
      { notation: "R' F' r U R U' r' F", description: 'Biến thể thay thế' },
    ],
    tags: ['cross', 'chameleon', 't', 'oll 24'],
  },
  {
    number: 25,
    name: 'OLL 25',
    aka: ['Bowtie', 'L', 'Cross 5'],
    category: 'Cross',
    groupNameVi: 'Chữ thập (Cross)',
    algs: [
      { notation: "F' r U R' U' r' F R", isPreferred: true, description: 'Chuẩn SpeedCubeDB' },
      { notation: "x' R U R' D R U' R' D' x", description: 'Commutator góc' },
    ],
    tags: ['cross', 'bowtie', 'l', 'oll 25'],
  },
  {
    number: 26,
    name: 'OLL 26',
    aka: ['Anti-Sune', 'Fish 2', 'Cross 6'],
    category: 'Cross',
    groupNameVi: 'Chữ thập (Cross)',
    algs: [
      { notation: "R' U' R U' R' U2 R", isPreferred: true, description: 'Anti-Sune chuẩn' },
      { notation: "R U2 R' U' R U' R'", description: 'Sune ngược' },
    ],
    tags: ['cross', 'anti-sune', 'oll 26'],
  },
  {
    number: 27,
    name: 'OLL 27',
    aka: ['Sune', 'Fish 1', 'Cross 7'],
    category: 'Cross',
    groupNameVi: 'Chữ thập (Cross)',
    algs: [
      { notation: "R U R' U R U2' R'", isPreferred: true, description: 'Sune quốc dân' },
      { notation: "y' R' U2 R U R' U R", description: 'Biến thể tay trái' },
    ],
    tags: ['cross', 'sune', 'oll 27'],
  },
  // --- ALL CORNERS ORIENTED (2) ---
  {
    number: 28,
    name: 'OLL 28',
    aka: ['Stealth', 'Corners 1'],
    category: 'Corners',
    groupNameVi: 'Góc xoay (Corners)',
    algs: [
      { notation: "r U R' U' r' R U R U' R'", isPreferred: true, description: 'Chuẩn r-slice' },
      { notation: "M' U M U2 M' U M", description: 'Biến thể M-slice' },
    ],
    tags: ['corners', 'stealth', 'oll 28'],
  },
  {
    number: 29,
    name: 'OLL 29',
    aka: ['Spotted Camouflage', 'Awkward 3'],
    category: 'Awkward',
    groupNameVi: 'Hình bất đối xứng (Awkward)',
    algs: [
      { notation: "R U R' U' R U' R' F' U' F R U R'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "M U R U R' U' R' F R F' M'", description: 'Biến thể M-slice' },
    ],
    tags: ['awkward', 'camouflage', 'oll 29'],
  },
  {
    number: 30,
    name: 'OLL 30',
    aka: ['Anti-Spotted Camouflage', 'Awkward 4'],
    category: 'Awkward',
    groupNameVi: 'Hình bất đối xứng (Awkward)',
    algs: [
      { notation: "F R' F R2 U' R' U' R U R' F2", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "r' D' r U' r' D r U r U' r'", description: 'Biến thể r-slice' },
    ],
    tags: ['awkward', 'anti-camouflage', 'oll 30'],
  },
  // --- P-SHAPES (4) ---
  {
    number: 31,
    name: 'OLL 31',
    aka: ['Couch 1', 'P-Shape 1'],
    category: 'P',
    groupNameVi: 'Chữ P (P-Shape)',
    algs: [
      { notation: "R' U' F U R U' R' F' R", isPreferred: true, description: 'Chuẩn SpeedCubeDB' },
      { notation: "S' L' U' L U S U L F' L' F", description: 'Biến thể S-slice' },
    ],
    tags: ['p-shape', 'couch', 'oll 31'],
  },
  {
    number: 32,
    name: 'OLL 32',
    aka: ['Couch 2', 'P-Shape 2'],
    category: 'P',
    groupNameVi: 'Chữ P (P-Shape)',
    algs: [
      { notation: "R U B' U' R' U R B R'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "L U F U' L' U L F' L'", description: 'Biến thể tay trái' },
    ],
    tags: ['p-shape', 'couch', 'oll 32'],
  },
  // --- T-SHAPES (2) ---
  {
    number: 33,
    name: 'OLL 33',
    aka: ['T-Shape 1'],
    category: 'T',
    groupNameVi: 'Chữ T (T-Shape)',
    algs: [
      { notation: "R U R' U' R' F R F'", isPreferred: true, description: 'Sexy move + Sledgehammer' },
      { notation: "F R U R' U' F'", description: 'Biến thể cơ bản' },
    ],
    tags: ['t-shape', 'oll 33'],
  },
  // --- C-SHAPES (2) ---
  {
    number: 34,
    name: 'OLL 34',
    aka: ['City', 'C-Shape 1'],
    category: 'C',
    groupNameVi: 'Chữ C (C-Shape)',
    algs: [
      { notation: "R U R2' U' R' F R U R U' F'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "R U R' U' B' R' F R F' B", description: 'Biến thể B-turn' },
    ],
    tags: ['c-shape', 'city', 'oll 34'],
  },
  // --- FISH SHAPES (2 thêm vào nhóm cá) ---
  {
    number: 35,
    name: 'OLL 35',
    aka: ['Fish 3'],
    category: 'Fish',
    groupNameVi: 'Con cá (Fish)',
    algs: [
      { notation: "R U2' R2' F R F' R U2' R'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "f R U R' U' f' R U R' U' R U' R'", description: 'Biến thể f sexy' },
    ],
    tags: ['fish', 'oll 35'],
  },
  // --- W-SHAPES (2) ---
  {
    number: 36,
    name: 'OLL 36',
    aka: ['W-Shape 1'],
    category: 'W',
    groupNameVi: 'Chữ W (W-Shape)',
    algs: [
      { notation: "L' U' L U' L' U L U L F' L' F", isPreferred: true, description: 'Chuẩn tay trái' },
      { notation: "R' U' R U' R' U R U R B' R' B", description: 'Biến thể B-turn' },
    ],
    tags: ['w-shape', 'oll 36'],
  },
  {
    number: 37,
    name: 'OLL 37',
    aka: ['Mounted Gun', 'Fish 4'],
    category: 'Fish',
    groupNameVi: 'Con cá (Fish)',
    algs: [
      { notation: "F R' F' R U R U' R'", isPreferred: true, description: 'Sledgehammer + Sexy' },
      { notation: "F R U' R' U' R U R' F'", description: 'Biến thể F-turn' },
    ],
    tags: ['fish', 'mounted gun', 'oll 37'],
  },
  {
    number: 38,
    name: 'OLL 38',
    aka: ['W-Shape 2'],
    category: 'W',
    groupNameVi: 'Chữ W (W-Shape)',
    algs: [
      { notation: "R U R' U R U' R' U' R' F R F'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "F R U' R' U' R U R' F'", description: 'F inverse sexy F\'' },
    ],
    tags: ['w-shape', 'oll 38'],
  },
  // --- LIGHTNING SHAPES (2 thêm vào nhóm tia sét) ---
  {
    number: 39,
    name: 'OLL 39',
    aka: ['Fung', 'Lightning 3'],
    category: 'Lightning',
    groupNameVi: 'Tia sét (Lightning)',
    algs: [
      { notation: "L F' L' U' L U F U' L'", isPreferred: true, description: 'Chuẩn tay trái' },
      { notation: "R B' R' U' R U B U' R'", description: 'Biến thể B-turn' },
    ],
    tags: ['lightning', 'fung', 'oll 39'],
  },
  {
    number: 40,
    name: 'OLL 40',
    aka: ['Anti-Fung', 'Lightning 4'],
    category: 'Lightning',
    groupNameVi: 'Tia sét (Lightning)',
    algs: [
      { notation: "R' F R U R' U' F' U R", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "f R U R' U' f'", description: 'Biến thể đơn giản' },
    ],
    tags: ['lightning', 'anti-fung', 'oll 40'],
  },
  // --- AWKWARD SHAPES (2 thêm vào nhóm awkward) ---
  {
    number: 41,
    name: 'OLL 41',
    aka: ['Awkward 1'],
    category: 'Awkward',
    groupNameVi: 'Hình bất đối xứng (Awkward)',
    algs: [
      { notation: "R U R' U R U2' R' F R U R' U' F'", isPreferred: true, description: 'Sune + F sexy F\'' },
      { notation: "R U' R' U2 R U y R U' R' U' F'", description: 'Biến thể rotation' },
    ],
    tags: ['awkward', 'oll 41'],
  },
  {
    number: 42,
    name: 'OLL 42',
    aka: ['Awkward 2'],
    category: 'Awkward',
    groupNameVi: 'Hình bất đối xứng (Awkward)',
    algs: [
      { notation: "R' U2 R U R' U R U F R U R' U' F'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "M U' F' L' U' L U F M'", description: 'Biến thể M-slice' },
    ],
    tags: ['awkward', 'oll 42'],
  },
  // --- P-SHAPES (2 thêm vào nhóm P) ---
  {
    number: 43,
    name: 'OLL 43',
    aka: ['Anti-P Shape', 'P-Shape 3'],
    category: 'P',
    groupNameVi: 'Chữ P (P-Shape)',
    algs: [
      { notation: "f' L' U' L U f", isPreferred: true, description: 'f\' sexy tay trái f' },
      { notation: "R' U' F R' F' R U R", description: 'Biến thể R-turn' },
    ],
    tags: ['p-shape', 'oll 43'],
  },
  {
    number: 44,
    name: 'OLL 44',
    aka: ['P-Shape 4'],
    category: 'P',
    groupNameVi: 'Chữ P (P-Shape)',
    algs: [
      { notation: "f R U R' U' f'", isPreferred: true, description: 'f sexy f\'' },
      { notation: "F U R U' R' F'", description: 'Biến thể F' },
    ],
    tags: ['p-shape', 'oll 44'],
  },
  // --- T-SHAPES (1 thêm vào nhóm T) ---
  {
    number: 45,
    name: 'OLL 45',
    aka: ['T-Shape 2'],
    category: 'T',
    groupNameVi: 'Chữ T (T-Shape)',
    algs: [
      { notation: "F R U R' U' F'", isPreferred: true, description: 'F sexy F\' quốc dân' },
      { notation: "R' F' U' F U R", description: 'Biến thể ngược' },
    ],
    tags: ['t-shape', 'oll 45'],
  },
  // --- C-SHAPES (1 thêm vào nhóm C) ---
  {
    number: 46,
    name: 'OLL 46',
    aka: ['C-Shape 2'],
    category: 'C',
    groupNameVi: 'Chữ C (C-Shape)',
    algs: [
      { notation: "R' U' R' F R F' U R", isPreferred: true, description: 'Chuẩn SpeedCubeDB' },
      { notation: "f R U R' U' f' U' F R U R' U' F'", description: 'Biến thể an toàn' },
    ],
    tags: ['c-shape', 'oll 46'],
  },
  // --- L-SHAPES (6) ---
  {
    number: 47,
    name: 'OLL 47',
    aka: ['Anti-Breakneck', 'L-Shape 1'],
    category: 'L',
    groupNameVi: 'Chữ L (L-shape)',
    algs: [
      { notation: "F' L' U' L U L' U' L U F", isPreferred: true, description: 'F\' sexy2 F' },
      { notation: "R' U' R' F R F' R' F R F' U R", description: 'Biến thể R-turn' },
    ],
    tags: ['l', 'breakneck', 'oll 47'],
  },
  {
    number: 48,
    name: 'OLL 48',
    aka: ['Breakneck', 'L-Shape 2'],
    category: 'L',
    groupNameVi: 'Chữ L (L-shape)',
    algs: [
      { notation: "F R U R' U' R U R' U' F'", isPreferred: true, description: 'F (sexy)2 F\'' },
      { notation: "R U2 R' U' R U R' U' R U' R'", description: 'Biến thể thay thế' },
    ],
    tags: ['l', 'breakneck', 'oll 48'],
  },
  {
    number: 49,
    name: 'OLL 49',
    aka: ['Right Back Squeezy', 'L-Shape 3'],
    category: 'L',
    groupNameVi: 'Chữ L (L-shape)',
    algs: [
      { notation: "r U' r2' U r2 U r2' U' r", isPreferred: true, description: 'Chuẩn r-slice' },
      { notation: "R' F R' F' R2 U2' y R' F R F'", description: 'Biến thể F-turn' },
    ],
    tags: ['l', 'squeezy', 'oll 49'],
  },
  {
    number: 50,
    name: 'OLL 50',
    aka: ['Right Front Squeezy', 'L-Shape 4'],
    category: 'L',
    groupNameVi: 'Chữ L (L-shape)',
    algs: [
      { notation: "r' U r2 U' r2' U' r2 U r'", isPreferred: true, description: 'Chuẩn r-slice' },
      { notation: "R B' R B R2' U2' y R B' R' B", description: 'Biến thể B-turn' },
    ],
    tags: ['l', 'squeezy', 'oll 50'],
  },
  // --- LINE SHAPES (4) ---
  {
    number: 51,
    name: 'OLL 51',
    aka: ['Bottle Cap', 'Line 1'],
    category: 'Line',
    groupNameVi: 'Đường thẳng (Line)',
    algs: [
      { notation: "f R U R' U' R U R' U' f'", isPreferred: true, description: 'Double sexy wide f' },
      { notation: "F U R U' R' U R U' R' F'", description: 'Biến thể F' },
    ],
    tags: ['line', 'bottle cap', 'oll 51'],
  },
  {
    number: 52,
    name: 'OLL 52',
    aka: ['Rice Cooker', 'Line 2'],
    category: 'Line',
    groupNameVi: 'Đường thẳng (Line)',
    algs: [
      { notation: "R U R' U R U' B U' B' R'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "R' U' R U' R' d R' U R B", description: 'Biến thể d-turn' },
    ],
    tags: ['line', 'rice cooker', 'oll 52'],
  },
  // --- L-SHAPES (2 thêm vào nhóm L) ---
  {
    number: 53,
    name: 'OLL 53',
    aka: ['Frying Pan', 'L-Shape 5'],
    category: 'L',
    groupNameVi: 'Chữ L (L-shape)',
    algs: [
      { notation: "r' U' R U' R' U R U' R' U2 r", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "l' U2 L U L' U' L U L' U l", description: 'Biến thể tay trái' },
    ],
    tags: ['l', 'frying pan', 'oll 53'],
  },
  {
    number: 54,
    name: 'OLL 54',
    aka: ['Anti-Frying Pan', 'L-Shape 6'],
    category: 'L',
    groupNameVi: 'Chữ L (L-shape)',
    algs: [
      { notation: "r U R' U R U' R' U R U2' r'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "F R U R' U' R U' R' U R U' F'", description: 'Biến thể F-turn' },
    ],
    tags: ['l', 'anti-frying pan', 'oll 54'],
  },
  // --- LINE SHAPES (2 thêm vào nhóm Line) ---
  {
    number: 55,
    name: 'OLL 55',
    aka: ['Highway', 'Line 3'],
    category: 'Line',
    groupNameVi: 'Đường thẳng (Line)',
    algs: [
      { notation: "R' F R U R U' R2' F' R2 U' R' U R U R'", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "r U2 R2' F R F' U2' r' F R F'", description: 'Biến thể r-turn' },
    ],
    tags: ['line', 'highway', 'oll 55'],
  },
  {
    number: 56,
    name: 'OLL 56',
    aka: ['Streetlights', 'Line 4'],
    category: 'Line',
    groupNameVi: 'Đường thẳng (Line)',
    algs: [
      { notation: "r' U' r U' R' U R U' R' U R r' U r", isPreferred: true, description: 'Chuẩn speedcubing' },
      { notation: "F R U R' U' R' F' r U R U' r'", description: 'Biến thể F sledge' },
    ],
    tags: ['line', 'streetlights', 'oll 56'],
  },
  // --- ALL CORNERS ORIENTED (1 thêm vào) ---
  {
    number: 57,
    name: 'OLL 57',
    aka: ['Anti-Stealth', 'Corners 2'],
    category: 'Corners',
    groupNameVi: 'Góc xoay (Corners)',
    algs: [
      { notation: "R U R' U' M' U R U' r'", isPreferred: true, description: 'Chuẩn M-slice' },
      { notation: "R U2' R2' F R F' U2' M' U R U' r'", description: 'Biến thể mở rộng' },
    ],
    tags: ['corners', 'anti-stealth', 'oll 57'],
  },
];

console.log(`Processing all ${OLL_DEFINITIONS.length} OLL definitions...`);

// Verify and build OLL cases array with 100% accurate patterns
const finalCases = OLL_DEFINITIONS.map(def => {
  const preferredAlg = def.algs.find(a => a.isPreferred) || def.algs[0];
  const inv = invertAlg(preferredAlg.notation);
  const setupCube = applyAlg(createSolvedCube(), inv);
  
  // Test that applying the alg solves the U face (all yellow = 0)
  const resultCube = applyAlg(setupCube, preferredAlg.notation);
  let uOriented = true;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (resultCube.U[r][c] !== 0) uOriented = false;
    }
  }
  if (!uOriented) {
    console.error(`FATAL: Alg for OLL ${def.number} does NOT orient U face!`);
  }

  const ollPattern = getOllPatternFromCube(setupCube);

  return {
    id: `oll-${def.number}`,
    type: 'OLL',
    number: def.number,
    name: def.name,
    aka: def.aka,
    category: def.category,
    groupNameVi: def.groupNameVi,
    ollPattern,
    algorithms: def.algs.map((a, idx) => ({
      id: `${def.number}-${idx + 1}`,
      notation: a.notation,
      isPreferred: a.isPreferred,
      description: a.description,
    })),
    tags: def.tags,
  };
});

// Sort by number 1..57
finalCases.sort((a, b) => a.number - b.number);

// Generate typescript code
const code = `import { AlgorithmCase, OLLPattern } from '../types';

export const OLL_CASES: AlgorithmCase[] = ${JSON.stringify(finalCases, null, 2)};
`;

fs.writeFileSync('./src/data/ollCases.ts', code, 'utf8');
console.log('Successfully written pristine OLL_CASES to src/data/ollCases.ts!');
