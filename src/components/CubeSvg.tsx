import React from 'react';
import { AlgorithmCase, OLLPattern, PLLPattern } from '../types';
import { FACE_COLORS } from '../utils/cubeState';

interface CubeSvgProps {
  caseData: AlgorithmCase;
  size?: number;
  className?: string;
  showArrows?: boolean;
}

const COLOR_MAP: Record<number, string> = {
  0: '#FACC15', // Yellow (U)
  1: '#F8FAFC', // White (D)
  2: '#22C55E', // Green (F)
  3: '#3B82F6', // Blue (B)
  4: '#FB923C', // Orange (L)
  5: '#EF4444', // Red (R)
};

export const CubeSvg: React.FC<CubeSvgProps> = ({
  caseData,
  size = 100,
  className = '',
  showArrows = true,
}) => {
  const isOLL = caseData.type === 'OLL';
  const oll = caseData.ollPattern;
  const pll = caseData.pllPattern;

  // Viewbox coordinates:
  // Grid sits from (20, 20) to (80, 80)
  // Side bars sit at 0..16 or 84..100
  const cellSize = 18;
  const gridGap = 2;
  const startX = 20;
  const startY = 20;

  // Arrow marker ID unique per case
  const arrowMarkerId = `arrow-${caseData.id}`;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`select-none overflow-visible ${className}`}
      aria-label={`${caseData.name} visualization`}
    >
      <defs>
        <marker
          id={arrowMarkerId}
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#EF4444" />
        </marker>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Cube Outer Base */}
      <rect
        x="18"
        y="18"
        width="64"
        height="64"
        rx="4"
        fill="#0F172A"
        stroke="#334155"
        strokeWidth="1.5"
      />

      {/* --- OLL RENDERING --- */}
      {isOLL && oll && (
        <>
          {/* Top 3x3 Grid */}
          {oll.top.map((row, rIdx) =>
            row.map((isYellow, cIdx) => {
              const x = startX + cIdx * (cellSize + gridGap);
              const y = startY + rIdx * (cellSize + gridGap);
              return (
                <rect
                  key={`top-${rIdx}-${cIdx}`}
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  rx="2.5"
                  fill={isYellow ? '#FACC15' : '#334155'}
                  stroke="#0F172A"
                  strokeWidth="1"
                />
              );
            })
          )}

          {/* North Side Stickers (Facing Up) */}
          {oll.sides.N.map((hasYellow, idx) => {
            const x = startX + idx * (cellSize + gridGap);
            return (
              <rect
                key={`n-${idx}`}
                x={x}
                y="9"
                width={cellSize}
                height="6"
                rx="1.5"
                fill={hasYellow ? '#FACC15' : '#1E293B'}
                stroke={hasYellow ? '#CA8A04' : '#0F172A'}
                strokeWidth="0.75"
              />
            );
          })}

          {/* South Side Stickers (Facing Down) */}
          {oll.sides.S.map((hasYellow, idx) => {
            const x = startX + idx * (cellSize + gridGap);
            return (
              <rect
                key={`s-${idx}`}
                x={x}
                y="85"
                width={cellSize}
                height="6"
                rx="1.5"
                fill={hasYellow ? '#FACC15' : '#1E293B'}
                stroke={hasYellow ? '#CA8A04' : '#0F172A'}
                strokeWidth="0.75"
              />
            );
          })}

          {/* West Side Stickers (Facing Left) */}
          {oll.sides.W.map((hasYellow, idx) => {
            const y = startY + idx * (cellSize + gridGap);
            return (
              <rect
                key={`w-${idx}`}
                x="9"
                y={y}
                width="6"
                height={cellSize}
                rx="1.5"
                fill={hasYellow ? '#FACC15' : '#1E293B'}
                stroke={hasYellow ? '#CA8A04' : '#0F172A'}
                strokeWidth="0.75"
              />
            );
          })}

          {/* East Side Stickers (Facing Right) */}
          {oll.sides.E.map((hasYellow, idx) => {
            const y = startY + idx * (cellSize + gridGap);
            return (
              <rect
                key={`e-${idx}`}
                x="85"
                y={y}
                width="6"
                height={cellSize}
                rx="1.5"
                fill={hasYellow ? '#FACC15' : '#1E293B'}
                stroke={hasYellow ? '#CA8A04' : '#0F172A'}
                strokeWidth="0.75"
              />
            );
          })}
        </>
      )}

      {/* --- PLL RENDERING --- */}
      {!isOLL && pll && (
        <>
          {/* Top 3x3 Grid is all yellow since OLL was solved */}
          {[0, 1, 2].map(rIdx =>
            [0, 1, 2].map(cIdx => {
              const x = startX + cIdx * (cellSize + gridGap);
              const y = startY + rIdx * (cellSize + gridGap);
              return (
                <rect
                  key={`pll-top-${rIdx}-${cIdx}`}
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  rx="2.5"
                  fill="#FACC15"
                  stroke="#0F172A"
                  strokeWidth="1"
                />
              );
            })
          )}

          {/* North (Back) side colors */}
          {pll.sideColors.N.map((c, idx) => {
            const x = startX + idx * (cellSize + gridGap);
            return (
              <rect
                key={`pll-n-${idx}`}
                x={x}
                y="9"
                width={cellSize}
                height="6"
                rx="1.5"
                fill={COLOR_MAP[c] || '#64748B'}
                stroke="#0F172A"
                strokeWidth="0.75"
              />
            );
          })}

          {/* South (Front) side colors */}
          {pll.sideColors.S.map((c, idx) => {
            const x = startX + idx * (cellSize + gridGap);
            return (
              <rect
                key={`pll-s-${idx}`}
                x={x}
                y="85"
                width={cellSize}
                height="6"
                rx="1.5"
                fill={COLOR_MAP[c] || '#64748B'}
                stroke="#0F172A"
                strokeWidth="0.75"
              />
            );
          })}

          {/* West (Left) side colors */}
          {pll.sideColors.W.map((c, idx) => {
            const y = startY + idx * (cellSize + gridGap);
            return (
              <rect
                key={`pll-w-${idx}`}
                x="9"
                y={y}
                width="6"
                height={cellSize}
                rx="1.5"
                fill={COLOR_MAP[c] || '#64748B'}
                stroke="#0F172A"
                strokeWidth="0.75"
              />
            );
          })}

          {/* East (Right) side colors */}
          {pll.sideColors.E.map((c, idx) => {
            const y = startY + idx * (cellSize + gridGap);
            return (
              <rect
                key={`pll-e-${idx}`}
                x="85"
                y={y}
                width="6"
                height={cellSize}
                rx="1.5"
                fill={COLOR_MAP[c] || '#64748B'}
                stroke="#0F172A"
                strokeWidth="0.75"
              />
            );
          })}

          {/* PLL Permutation Arrows */}
          {showArrows &&
            pll.arrows?.map((arrow, aIdx) => {
              const [r1, c1] = arrow.from;
              const [r2, c2] = arrow.to;
              const x1 = startX + c1 * (cellSize + gridGap) + cellSize / 2;
              const y1 = startY + r1 * (cellSize + gridGap) + cellSize / 2;
              const x2 = startX + c2 * (cellSize + gridGap) + cellSize / 2;
              const y2 = startY + r2 * (cellSize + gridGap) + cellSize / 2;

              // Curved arc if adjacent or center-crossing
              const dx = x2 - x1;
              const dy = y2 - y1;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const isAdjacent = dist < 25;
              const cx = (x1 + x2) / 2 - (isAdjacent ? dy * 0.35 : 0);
              const cy = (y1 + y2) / 2 + (isAdjacent ? dx * 0.35 : 0);

              const pathData = isAdjacent
                ? `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
                : `M ${x1} ${y1} L ${x2} ${y2}`;

              return (
                <g key={`arrow-${aIdx}`}>
                  {/* Outer line for contrast */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#0F172A"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    markerEnd={`url(#${arrowMarkerId})`}
                    markerStart={arrow.twoWay ? `url(#${arrowMarkerId})` : undefined}
                  />
                </g>
              );
            })}
        </>
      )}
    </svg>
  );
};
