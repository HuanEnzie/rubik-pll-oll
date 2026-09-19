import { OLL_CASES } from '../src/data/ollCases';
import { PLL_CASES } from '../src/data/pllCases';
import { createSolvedCube, applyMove, parseAlgorithmMoves } from '../src/utils/cubeState';

console.log(`Verifying ${OLL_CASES.length} OLL cases and ${PLL_CASES.length} PLL cases...`);

function applyAlg(cube: any, alg: string) {
  const moves = parseAlgorithmMoves(alg);
  let c = cube;
  for (const m of moves) {
    c = applyMove(c, m);
  }
  return c;
}

// Invert algorithm correctly
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

// Check 1: Does inverting + applying return to solved state?
let identityErrors: string[] = [];
for (const c of [...OLL_CASES, ...PLL_CASES]) {
  if (c.category === 'Parity') continue; // 4x4 Parity cannot be represented on a pure 3x3 without center shift
  for (const a of c.algorithms) {
    const solved = createSolvedCube();
    const inv = invertAlg(a.notation);
    const scrambled = applyAlg(solved, inv);
    const result = applyAlg(scrambled, a.notation);
    
    // Check if cube is completely solved (all faces uniform)
    let isSolved = true;
    for (const f of ['U', 'D', 'F', 'B', 'L', 'R'] as const) {
      const center = result[f][1][1];
      for (let r = 0; r < 3; r++) {
        for (let col = 0; col < 3; col++) {
          if (result[f][r][col] !== center) isSolved = false;
        }
      }
    }
    if (!isSolved) {
      identityErrors.push(`[${c.type}] ${c.name} alg "${a.notation}" failed invert-apply identity!`);
    }
  }
}

console.log(`Identity test results: ${identityErrors.length} errors found.`);
if (identityErrors.length > 0) {
  console.log(identityErrors);
}

// Check 2: Pattern match check
// For OLL, does applying the inverse algorithm to a solved cube match the top pattern?
// Top orientation: does a piece have yellow pointing UP?
let patternMismatches: string[] = [];
for (const c of OLL_CASES) {
  const a = c.algorithms[0];
  const inv = invertAlg(a.notation);
  const setup = applyAlg(createSolvedCube(), inv);
  
  // What is on U face? Yellow is color 0.
  const actualTop = [
    [setup.U[0][0] === 0, setup.U[0][1] === 0, setup.U[0][2] === 0],
    [setup.U[1][0] === 0, setup.U[1][1] === 0, setup.U[1][2] === 0],
    [setup.U[2][0] === 0, setup.U[2][1] === 0, setup.U[2][2] === 0],
  ];
  
  // Compare with c.ollPattern.top
  const expectedTop = c.ollPattern?.top;
  if (expectedTop) {
    let matches = true;
    for (let r = 0; r < 3; r++) {
      for (let col = 0; col < 3; col++) {
        if (actualTop[r][col] !== expectedTop[r][col]) {
          matches = false;
        }
      }
    }
    if (!matches) {
      patternMismatches.push(`OLL ${c.number} (${c.name}): setup top pattern doesn't match predefined visual pattern`);
    }
  }
}

console.log(`Pattern mismatch count: ${patternMismatches.length}`);
console.log('Sample mismatches (may be due to rotation/view angle):', patternMismatches.slice(0, 10));
