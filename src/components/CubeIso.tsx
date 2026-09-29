import React, { useMemo } from 'react';
import { AlgorithmCase } from '../types';
import { caseStateFromAlgorithm } from '../utils/caseAnalysis';
import { CubeState } from '../utils/cubeState';
import { FACELET_POS } from '../utils/cubeGeometry';

interface CubeIsoProps {
  caseData: AlgorithmCase;
  size?: number;
  className?: string;
}

const COLORS: Record<number, string> = {
  0: '#FFD500',
  1: '#FFFFFF',
  2: '#00A651',
  3: '#0057D9',
  4: '#FF6A00',
  5: '#D8202A',
};
const GRAY = '#7C8598';
const BG = '#0B1020';
const BODY = '#151a27';

const S = 13.5; // px trên viewBox 100
type V3 = [number, number, number];

// nhìn từ hướng (+x,+y,+z): mặt F nằm bên trái, mặt R bên phải, U ở trên
const proj = ([x, y, z]: V3): string => {
  const px = 50 + (x - z) * 0.866 * S;
  const py = 50 + (-y + (x + z) * 0.5) * S + 1.5;
  return `${px.toFixed(2)},${py.toFixed(2)}`;
};

const add = (a: V3, b: V3, k = 1): V3 => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];

function quad(center: V3, u: V3, v: V3, hu: number, hv: number): string {
  return [
    add(add(center, u, -hu), v, -hv),
    add(add(center, u, hu), v, -hv),
    add(add(center, u, hu), v, hv),
    add(add(center, u, -hu), v, hv),
  ]
    .map(proj)
    .join(' ');
}

const AXES: V3[] = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];
const tangents = (n: V3): [V3, V3] => {
  const t = AXES.filter((_, i) => n[i] === 0);
  return [t[0], t[1]];
};

// Cache mô phỏng theo công thức để 57 thẻ không tính lại mỗi lần render
const stateCache = new Map<string, CubeState>();
function stateFor(alg: string): CubeState {
  let s = stateCache.get(alg);
  if (!s) {
    s = caseStateFromAlgorithm(alg);
    stateCache.set(alg, s);
  }
  return s;
}

/**
 * Khối 3D đẳng cự (SVG, không dùng WebGL nên vẽ được hàng chục thẻ cùng lúc).
 * Thấy 3 mặt U/F/R; hàng trên của mặt B và L được "gập" ra phía sau mặt U để không mất thông tin nhận diện.
 * OLL: sticker tầng trên không vàng vẽ xám (màu thật không quan trọng), hai tầng dưới giữ màu thật.
 */
export const CubeIso: React.FC<CubeIsoProps> = ({ caseData, size = 120, className = '' }) => {
  const isOll = caseData.type === 'OLL';
  const alg = (caseData.algorithms.find(a => a.isPreferred) ?? caseData.algorithms[0]).notation;
  const state = useMemo(() => stateFor(alg), [alg]);
  const small = size < 90;
  const sw = small ? 0.9 : 0.7;

  const colorOf = (color: number, topLayer: boolean) =>
    isOll && topLayer && color !== 0 ? GRAY : COLORS[color];

  const faces = (['U', 'F', 'R'] as const).map(face => {
    const polys: React.ReactNode[] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const { pos, nor } = FACELET_POS[face](r, c);
        const center = add(pos as V3, nor as V3, 0.5);
        const [u, v] = tangents(nor as V3);
        const top = face === 'U' || pos[1] === 1;
        polys.push(
          <polygon
            key={`${face}${r}${c}`}
            points={quad(center, u, v, 0.45, 0.45)}
            fill={colorOf(state[face][r][c], top)}
            stroke={BG}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
        );
      }
    }
    return { face, polys };
  });

  // thân khối (nền tối phía sau các sticker)
  const bodyPts = ([
    [-1.5, 1.5, -1.5],
    [1.5, 1.5, -1.5],
    [1.5, -1.5, -1.5],
    [1.5, -1.5, 1.5],
    [-1.5, -1.5, 1.5],
    [-1.5, 1.5, 1.5],
  ] as V3[])
    .map(proj)
    .join(' ');

  // hàng trên của B và L, gập ra phía sau/bên trái trên mặt phẳng y = 1.5
  const flaps: React.ReactNode[] = [];
  for (let c = 0; c < 3; c++) {
    const b = FACELET_POS.B(0, c).pos as V3; // x = 1 - c
    flaps.push(
      <polygon
        key={`fb${c}`}
        points={quad([b[0], 1.5, -1.84], [1, 0, 0], [0, 0, 1], 0.45, 0.27)}
        fill={colorOf(state.B[0][c], true)}
        stroke={BG}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
    );
    const l = FACELET_POS.L(0, c).pos as V3; // z = c - 1
    flaps.push(
      <polygon
        key={`fl${c}`}
        points={quad([-1.84, 1.5, l[2]], [0, 0, 1], [1, 0, 0], 0.45, 0.27)}
        fill={colorOf(state.L[0][c], true)}
        stroke={BG}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`select-none overflow-visible ${className}`}
      role="img"
      aria-label={`${caseData.name} dạng 3D`}
    >
      <rect x="4" y="4" width="92" height="92" rx="9" fill={BG} />
      {flaps}
      <polygon points={bodyPts} fill={BODY} stroke={BG} strokeWidth="1" strokeLinejoin="round" />
      {faces.map(f => (
        <g key={f.face}>{f.polys}</g>
      ))}
    </svg>
  );
};
