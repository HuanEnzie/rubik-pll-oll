import fs from 'fs';
import { PLL_CASES } from '../src/data/pllCases';
import { createSolvedCube, applyMove, parseAlgorithmMoves, invertAlgorithm } from '../src/utils/cubeState';

function getPllAccuratePattern(alg: string) {
  const inv = invertAlgorithm(alg);
  let cube = createSolvedCube();
  for (const m of parseAlgorithmMoves(inv)) cube = applyMove(cube, m);

  // Top view 2D side colors:
  // North row: from West to East (index 0 is NW, index 2 is NE)
  // Back face: B[0][2] is NW, B[0][1] is N, B[0][0] is NE
  // East col: from North to South (index 0 is NE, index 2 is SE)
  // Right face: R[0][2] is NE, R[0][1] is E, R[0][0] is SE
  // South row: from West to East (index 0 is SW, index 2 is SE)
  // Front face: F[0][0] is SW, F[0][1] is S, F[0][2] is SE
  // West col: from North to South (index 0 is NW, index 2 is SW)
  // Left face: L[0][0] is NW, L[0][1] is W, L[0][2] is SW
  const sideColors = {
    N: [cube.B[0][2], cube.B[0][1], cube.B[0][0]] as [number, number, number],
    E: [cube.R[0][2], cube.R[0][1], cube.R[0][0]] as [number, number, number],
    S: [cube.F[0][0], cube.F[0][1], cube.F[0][2]] as [number, number, number],
    W: [cube.L[0][0], cube.L[0][1], cube.L[0][2]] as [number, number, number],
  };

  // Find arrows: pieces that move when algorithm is applied
  let tagged = createSolvedCube();
  for (let r = 0; r < 3; r++) {
    for (let col = 0; col < 3; col++) {
      tagged.U[r][col] = (r * 3 + col) as any;
    }
  }
  for (const m of parseAlgorithmMoves(inv)) tagged = applyMove(tagged, m);

  const arrows: { from: [number, number]; to: [number, number]; twoWay?: boolean }[] = [];
  const visited = new Set<string>();

  // 2-way swaps first
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (r === 1 && c === 1) continue;
      const key = `${r},${c}`;
      if (visited.has(key)) continue;

      const home = tagged.U[r][c];
      const homeR = Math.floor(home / 3);
      const homeC = home % 3;

      if (homeR === r && homeC === c) continue;

      const otherHome = tagged.U[homeR][homeC];
      const otherHomeR = Math.floor(otherHome / 3);
      const otherHomeC = otherHome % 3;

      if (otherHomeR === r && otherHomeC === c) {
        arrows.push({ from: [r, c], to: [homeR, homeC], twoWay: true });
        visited.add(key);
        visited.add(`${homeR},${homeC}`);
      }
    }
  }

  // Cycles (3-cycles or 4-cycles)
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (r === 1 && c === 1) continue;
      const key = `${r},${c}`;
      if (visited.has(key)) continue;

      const home = tagged.U[r][c];
      const homeR = Math.floor(home / 3);
      const homeC = home % 3;
      if (homeR === r && homeC === c) continue;

      arrows.push({ from: [r, c], to: [homeR, homeC] });
      visited.add(key);
    }
  }

  return { sideColors, arrows };
}

console.log('Generating accurate PLL patterns and adding reverse/mirror variants...');

// Update cases
const updatedCases = PLL_CASES.map(c => {
  if (c.category === 'Parity') return c;

  const pref = c.algorithms.find(a => a.isPreferred) || c.algorithms[0];
  const { sideColors, arrows } = getPllAccuratePattern(pref.notation);

  let algs = [...c.algorithms];

  // If case is PLL T, add Lefty/Mirror and AUF variants
  if (c.id === 'pll-t') {
    if (!algs.some(a => a.id === 't-mirror')) {
      algs.push({
        id: 't-mirror',
        notation: "(L' U' L U) (L F' L2 U) (L U L' U') (L F)",
        description: 'Bản ngược / Mirror (Headlights bên Phải, xoay tay trái)',
        fingerTrickNotes: 'Dùng khi gặp T-Perm bị ngược với Headlights ở bên phải',
      });
    }
    if (!algs.some(a => a.id === 't-y2')) {
      algs.push({
        id: 't-y2',
        notation: "y2 (R U R' U') (R' F R2 U') (R' U' R U) (R' F') y2",
        description: 'Xoay y2 (hoặc U2) đưa Headlights về bên Trái rồi giải chuẩn',
      });
    }
  }

  // If case is PLL F, add AUF note
  if (c.id === 'pll-f') {
    if (!algs.some(a => a.id === 'f-setup')) {
      algs.push({
        id: 'f-setup',
        notation: "(R' U' F') (R U R' U') (R' F R2 U') (R' U' R U) (R' U R)",
        description: 'Chuẩn speedcubing: Setup T-Perm (R\' U\' F\' + T-Perm + U R)',
      });
    }
  }

  return {
    ...c,
    pllPattern: {
      arrows,
      sideColors,
    },
    algorithms: algs,
  };
});

const fileContent = `import { AlgorithmCase } from '../types';

export const PLL_CASES: AlgorithmCase[] = ${JSON.stringify(updatedCases, null, 2)};
`;

fs.writeFileSync('./src/data/pllCases.ts', fileContent, 'utf-8');
console.log('Successfully updated src/data/pllCases.ts!');
