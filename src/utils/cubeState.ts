/**
 * Rubik's Cube 3x3 Facelet State & Notation Engine
 * Faces:
 * U: 0 (Yellow - Vàng)
 * D: 1 (White - Trắng)
 * F: 2 (Green - Xanh lá)
 * B: 3 (Blue - Xanh dương)
 * L: 4 (Orange - Cam)
 * R: 5 (Red - Đỏ)
 */

export type FaceIndex = 0 | 1 | 2 | 3 | 4 | 5;

export const FACE_COLORS = {
  0: '#FACC15', // U - Yellow
  1: '#F8FAFC', // D - White
  2: '#22C55E', // F - Green
  3: '#3B82F6', // B - Blue
  4: '#FB923C', // L - Orange
  5: '#EF4444', // R - Red
};

export const FACE_NAMES = ['U', 'D', 'F', 'B', 'L', 'R'] as const;

// 3x3 array of FaceIndex for each face
export type CubeState = {
  U: FaceIndex[][];
  D: FaceIndex[][];
  F: FaceIndex[][];
  B: FaceIndex[][];
  L: FaceIndex[][];
  R: FaceIndex[][];
};

export function createSolvedCube(): CubeState {
  const makeFace = (color: FaceIndex): FaceIndex[][] => [
    [color, color, color],
    [color, color, color],
    [color, color, color],
  ];
  return {
    U: makeFace(0),
    D: makeFace(1),
    F: makeFace(2),
    B: makeFace(3),
    L: makeFace(4),
    R: makeFace(5),
  };
}

export function cloneCube(cube: CubeState): CubeState {
  return {
    U: cube.U.map(row => [...row]),
    D: cube.D.map(row => [...row]),
    F: cube.F.map(row => [...row]),
    B: cube.B.map(row => [...row]),
    L: cube.L.map(row => [...row]),
    R: cube.R.map(row => [...row]),
  };
}

function rotateFaceClockwise(face: FaceIndex[][]): FaceIndex[][] {
  const result: FaceIndex[][] = [
    [0, 0, 0] as FaceIndex[],
    [0, 0, 0] as FaceIndex[],
    [0, 0, 0] as FaceIndex[],
  ];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      result[c][2 - r] = face[r][c];
    }
  }
  return result;
}

function rotateFaceCounterClockwise(face: FaceIndex[][]): FaceIndex[][] {
  const result: FaceIndex[][] = [
    [0, 0, 0] as FaceIndex[],
    [0, 0, 0] as FaceIndex[],
    [0, 0, 0] as FaceIndex[],
  ];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      result[2 - c][r] = face[r][c];
    }
  }
  return result;
}

export function applyMove(cube: CubeState, move: string): CubeState {
  const clean = move.trim().replace(/[()[\]{}]/g, '');
  if (!clean) return cube;

  // Handle Rw, Lw, Fw, Uw, Dw, Bw by normalizing to r, l, f, u, d, b
  let normalized = clean;
  if (/^[RLFUDB]w/i.test(normalized)) {
    normalized = normalized[0].toLowerCase() + normalized.slice(2);
  }

  const base = normalized[0];
  const modifier = normalized.slice(1);
  const isDouble = modifier.includes('2');
  const isPrime = modifier.includes("'") || modifier.includes('’');

  const turns = isDouble ? 2 : isPrime ? 3 : 1;
  let next = cloneCube(cube);

  for (let t = 0; t < turns; t++) {
    next = applySingleMove(next, base);
  }
  return next;
}

function applySingleMove(cube: CubeState, move: string): CubeState {
  const res = cloneCube(cube);

  switch (move) {
    case 'U': {
      res.U = rotateFaceClockwise(res.U);
      const temp = [...res.F[0]];
      res.F[0] = [...res.R[0]];
      res.R[0] = [...res.B[0]];
      res.B[0] = [...res.L[0]];
      res.L[0] = temp;
      break;
    }
    case 'D': {
      res.D = rotateFaceClockwise(res.D);
      const temp = [...res.F[2]];
      res.F[2] = [...res.L[2]];
      res.L[2] = [...res.B[2]];
      res.B[2] = [...res.R[2]];
      res.R[2] = temp;
      break;
    }
    case 'R': {
      res.R = rotateFaceClockwise(res.R);
      const temp = [res.U[0][2], res.U[1][2], res.U[2][2]];
      for (let i = 0; i < 3; i++) {
        res.U[i][2] = res.F[i][2];
        res.F[i][2] = res.D[i][2];
        res.D[i][2] = res.B[2 - i][0];
        res.B[2 - i][0] = temp[i];
      }
      break;
    }
    case 'L': {
      res.L = rotateFaceClockwise(res.L);
      const temp = [res.U[0][0], res.U[1][0], res.U[2][0]];
      for (let i = 0; i < 3; i++) {
        res.U[i][0] = res.B[2 - i][2];
        res.B[2 - i][2] = res.D[i][0];
        res.D[i][0] = res.F[i][0];
        res.F[i][0] = temp[i];
      }
      break;
    }
    case 'F': {
      res.F = rotateFaceClockwise(res.F);
      const temp = [...res.U[2]];
      for (let i = 0; i < 3; i++) {
        res.U[2][i] = res.L[2 - i][2];
        res.L[2 - i][2] = res.D[0][2 - i];
        res.D[0][2 - i] = res.R[i][0];
        res.R[i][0] = temp[i];
      }
      break;
    }
    case 'B': {
      res.B = rotateFaceClockwise(res.B);
      const temp = [...res.U[0]];
      for (let i = 0; i < 3; i++) {
        res.U[0][i] = res.R[i][2];
        res.R[i][2] = res.D[2][2 - i];
        res.D[2][2 - i] = res.L[2 - i][0];
        res.L[2 - i][0] = temp[i];
      }
      break;
    }
    case 'M': {
      // M follows L direction (downwards in front)
      const temp = [res.U[0][1], res.U[1][1], res.U[2][1]];
      for (let i = 0; i < 3; i++) {
        res.U[i][1] = res.B[2 - i][1];
        res.B[2 - i][1] = res.D[i][1];
        res.D[i][1] = res.F[i][1];
        res.F[i][1] = temp[i];
      }
      break;
    }
    case 'E': {
      // E follows D direction
      const temp = [...res.F[1]];
      res.F[1] = [...res.L[1]];
      res.L[1] = [...res.B[1]];
      res.B[1] = [...res.R[1]];
      res.R[1] = temp;
      break;
    }
    case 'S': {
      // S follows F direction
      const temp = [...res.U[1]];
      for (let i = 0; i < 3; i++) {
        res.U[1][i] = res.L[2 - i][1];
        res.L[2 - i][1] = res.D[1][2 - i];
        res.D[1][2 - i] = res.R[i][1];
        res.R[i][1] = temp[i];
      }
      break;
    }
    // Wide moves: r = R + M', l = L + M, u = U + E', etc.
    case 'r': {
      const step1 = applySingleMove(res, 'R');
      // M' is 3 x M
      return applySingleMove(applySingleMove(applySingleMove(step1, 'M'), 'M'), 'M');
    }
    case 'l': {
      const step1 = applySingleMove(res, 'L');
      return applySingleMove(step1, 'M');
    }
    case 'f': {
      const step1 = applySingleMove(res, 'F');
      return applySingleMove(step1, 'S');
    }
    case 'u': {
      const step1 = applySingleMove(res, 'U');
      // E' is 3 x E
      return applySingleMove(applySingleMove(applySingleMove(step1, 'E'), 'E'), 'E');
    }
    case 'd': {
      const step1 = applySingleMove(res, 'D');
      return applySingleMove(step1, 'E');
    }
    case 'b': {
      const step1 = applySingleMove(res, 'B');
      // S' is 3 x S
      return applySingleMove(applySingleMove(applySingleMove(step1, 'S'), 'S'), 'S');
    }
    // Whole cube rotations x, y, z
    case 'x': {
      // Rotates entire cube on R axis
      const step1 = applySingleMove(res, 'R');
      const step2 = applySingleMove(applySingleMove(applySingleMove(step1, 'M'), 'M'), 'M');
      // L' is 3 x L
      return applySingleMove(applySingleMove(applySingleMove(step2, 'L'), 'L'), 'L');
    }
    case 'y': {
      // Rotates entire cube on U axis
      const step1 = applySingleMove(res, 'U');
      const step2 = applySingleMove(applySingleMove(applySingleMove(step1, 'E'), 'E'), 'E');
      // D' is 3 x D
      return applySingleMove(applySingleMove(applySingleMove(step2, 'D'), 'D'), 'D');
    }
    case 'z': {
      // Rotates entire cube on F axis
      const step1 = applySingleMove(res, 'F');
      const step2 = applySingleMove(step1, 'S');
      // B' is 3 x B
      return applySingleMove(applySingleMove(applySingleMove(step2, 'B'), 'B'), 'B');
    }
  }

  return res;
}

/**
 * Splits notation into individual move tokens, e.g. "R U2 R' U' (R U R') U'" -> ["R", "U2", "R'", "U'", "R", "U", "R'", "U'"]
 */
export function parseAlgorithmMoves(algorithm: string): string[] {
  // strip parens, brackets, multiple spaces
  const cleaned = algorithm.replace(/[()[\]{}]/g, ' ');
  return cleaned
    .split(/\s+/)
    .map(m => m.trim())
    .filter(Boolean);
}

/**
 * Inverts an algorithm to get setup move (e.g. to setup a case from solved state)
 */
export function invertAlgorithm(algorithm: string): string {
  const moves = parseAlgorithmMoves(algorithm);
  const inverted = moves.reverse().map(m => {
    if (m.endsWith("2")) return m;
    if (m.endsWith("'") || m.endsWith("’")) return m.slice(0, -1);
    return `${m}'`;
  });
  return inverted.join(' ');
}
