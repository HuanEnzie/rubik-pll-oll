import { OLL_CASES } from '../src/data/ollCases';
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

function rotateMatrix(matrix: boolean[][]): boolean[][] {
  const res: boolean[][] = [[false, false, false], [false, false, false], [false, false, false]];
  for (let r = 0; r < 3; r++) {
    for (let col = 0; col < 3; col++) {
      res[col][2 - r] = matrix[r][col];
    }
  }
  return res;
}

function matricesEqual(m1: boolean[][], m2: boolean[][]): boolean {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (m1[r][c] !== m2[r][c]) return false;
    }
  }
  return true;
}

console.log("Analyzing OLL algorithms vs SVG pattern orientations...");

let exactMatches = 0;
let rotatedMatches = 0;
let noMatches: number[] = [];

for (const c of OLL_CASES) {
  const a = c.algorithms[0];
  const inv = invertAlg(a.notation);
  const setup = applyAlg(createSolvedCube(), inv);
  
  let actualTop = [
    [setup.U[0][0] === 0, setup.U[0][1] === 0, setup.U[0][2] === 0],
    [setup.U[1][0] === 0, setup.U[1][1] === 0, setup.U[1][2] === 0],
    [setup.U[2][0] === 0, setup.U[2][1] === 0, setup.U[2][2] === 0],
  ];

  const expectedTop = c.ollPattern?.top;
  if (!expectedTop) continue;

  if (matricesEqual(actualTop, expectedTop)) {
    exactMatches++;
    continue;
  }

  // Check 90, 180, 270 deg rotations
  let matchedAngle = -1;
  let currentRot = actualTop;
  for (let angle = 90; angle <= 270; angle += 90) {
    currentRot = rotateMatrix(currentRot);
    if (matricesEqual(currentRot, expectedTop)) {
      matchedAngle = angle;
      break;
    }
  }

  if (matchedAngle !== -1) {
    rotatedMatches++;
    // console.log(`OLL ${c.number}: matches with ${matchedAngle}° U-rotation.`);
  } else {
    noMatches.push(c.number);
    console.log(`OLL ${c.number}: NO match even with rotation! Algorithm: "${a.notation}"`);
  }
}

console.log(`\nSummary:`);
console.log(`Exact matches: ${exactMatches}`);
console.log(`Rotated matches: ${rotatedMatches}`);
console.log(`No match: ${noMatches.length} (${noMatches.join(', ')})`);
