import React from 'react';
import { AlgorithmCase } from '../types';

interface CubeSvgProps {
  caseData: AlgorithmCase;
  size?: number;
  className?: string;
  showArrows?: boolean;
  /** hiện chữ B / F / L / R quanh hình (nên bật khi hình đủ lớn) */
  showLabels?: boolean;
}

const COLOR_MAP: Record<number, string> = {
  0: '#FFD500', // U vàng
  1: '#FFFFFF', // D trắng
  2: '#00A651', // F xanh lá
  3: '#0057D9', // B xanh dương
  4: '#FF6A00', // L cam
  5: '#D8202A', // R đỏ
};

const YELLOW = '#FFD500';
const NOT_YELLOW = '#7C8598'; // xám sáng, đủ tương phản với cả vàng và nền tối
const BG = '#0B1020';

// Hình học (viewBox 100x100), nhìn từ trên xuống, giả phối cảnh: sticker bên là hình thang loe ra ngoài
const CX = 50;
const CELL = 17;
const GAP = 1.6;
const GRID = 3 * CELL + 2 * GAP;
const START = CX - GRID / 2;
const D0 = GRID / 2 + 2.2; // khoảng cách từ tâm tới mép trong sticker bên
const DEPTH = 10.5;
const D1 = D0 + DEPTH;
const F = D1 / D0;
const INSET = 0.7;

type Pt = [number, number];

/** hình thang sticker số i (0 = tây) của cạnh Bắc */
function northTrapezoid(i: number): Pt[] {
  const x0 = START + i * (CELL + GAP) + INSET;
  const x1 = START + i * (CELL + GAP) + CELL - INSET;
  const ox0 = CX + (x0 - CX) * F;
  const ox1 = CX + (x1 - CX) * F;
  return [
    [x0, CX - D0],
    [x1, CX - D0],
    [ox1, CX - D1],
    [ox0, CX - D1],
  ];
}

function rotate(p: Pt, quarterTurnsCw: number): Pt {
  let [x, y] = [p[0] - CX, p[1] - CX];
  for (let k = 0; k < quarterTurnsCw; k++) [x, y] = [-y, x];
  return [x + CX, y + CX];
}

function sidePolygon(side: 'N' | 'E' | 'S' | 'W', idx: number): string {
  const spec = { N: [idx, 0], E: [idx, 1], S: [2 - idx, 2], W: [2 - idx, 3] }[side];
  return northTrapezoid(spec[0])
    .map(p => rotate(p, spec[1]))
    .map(p => p.map(v => v.toFixed(2)).join(','))
    .join(' ');
}

const cellXY = (r: number, c: number): Pt => [
  START + c * (CELL + GAP) + CELL / 2,
  START + r * (CELL + GAP) + CELL / 2,
];

export const CubeSvg: React.FC<CubeSvgProps> = ({
  caseData,
  size = 100,
  className = '',
  showArrows = true,
  showLabels = false,
}) => {
  const oll = caseData.type === 'OLL' ? caseData.ollPattern : undefined;
  const pll = caseData.type === 'PLL' ? caseData.pllPattern : undefined;
  const markerId = `arrow-${caseData.id}`;
  const small = size < 70;

  const stroke = small ? 0.9 : 0.7;
  const sides: ('N' | 'E' | 'S' | 'W')[] = ['N', 'E', 'S', 'W'];

  const sideFill = (side: 'N' | 'E' | 'S' | 'W', i: number) =>
    oll ? (oll.sides[side][i] ? YELLOW : NOT_YELLOW) : pll ? COLOR_MAP[pll.sideColors[side][i]] ?? NOT_YELLOW : NOT_YELLOW;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`select-none overflow-visible ${className}`}
      role="img"
      aria-label={`${caseData.name} nhìn từ trên xuống`}
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="4.2"
          markerHeight="4.2"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={BG} stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" paintOrder="stroke" />
        </marker>
      </defs>

      {/* nền */}
      <rect x="4" y="4" width="92" height="92" rx="9" fill={BG} />

      {/* 9 ô mặt trên */}
      {[0, 1, 2].map(r =>
        [0, 1, 2].map(c => {
          const isCenter = r === 1 && c === 1;
          const fill = oll ? (oll.top[r][c] ? YELLOW : NOT_YELLOW) : YELLOW;
          return (
            <rect
              key={`t-${r}-${c}`}
              x={START + c * (CELL + GAP)}
              y={START + r * (CELL + GAP)}
              width={CELL}
              height={CELL}
              rx="2.6"
              fill={fill}
              stroke={BG}
              strokeWidth={stroke}
            />
          );
        })
      )}

      {/* 12 sticker bên (hình thang) */}
      {sides.map(side =>
        [0, 1, 2].map(i => (
          <polygon
            key={`${side}-${i}`}
            points={sidePolygon(side, i)}
            fill={sideFill(side, i)}
            stroke={BG}
            strokeWidth={stroke}
            strokeLinejoin="round"
          />
        ))
      )}

      {/* mũi tên hoán vị PLL */}
      {pll && showArrows &&
        pll.arrows?.map((arrow, aIdx) => {
          const [x1, y1] = cellXY(arrow.from[0], arrow.from[1]);
          const [x2, y2] = cellXY(arrow.to[0], arrow.to[1]);
          // cung cong phồng ra phía ngoài (xa tâm) để các mũi tên của một vòng hoán vị không đè lên nhau
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2;
          const off = Math.hypot(mx - CX, my - CX);
          const bulge = off > 3 ? 7 : 0;
          const cx = mx + (off > 3 ? ((mx - CX) / off) * bulge : 0);
          const cy = my + (off > 3 ? ((my - CX) / off) * bulge : 0);
          const d = bulge ? `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}` : `M ${x1} ${y1} L ${x2} ${y2}`;
          const w = small ? 3.4 : 2.6;
          return (
            <g key={`arrow-${aIdx}`}>
              <path d={d} fill="none" stroke="#FFFFFF" strokeWidth={w + 2.2} strokeLinecap="round" />
              <path
                d={d}
                fill="none"
                stroke={BG}
                strokeWidth={w}
                strokeLinecap="round"
                markerEnd={`url(#${markerId})`}
                markerStart={arrow.twoWay ? `url(#${markerId})` : undefined}
              />
            </g>
          );
        })}

      {/* nhãn hướng nhìn */}
      {showLabels && (
        <g fontSize="6.5" fontWeight="800" fill="#94A3B8" textAnchor="middle" fontFamily="system-ui, sans-serif">
          <text x={CX} y="9.2">B</text>
          <text x={CX} y="98.4">F (trước)</text>
          <text x="8.2" y="52.2">L</text>
          <text x="91.8" y="52.2">R</text>
        </g>
      )}
    </svg>
  );
};
