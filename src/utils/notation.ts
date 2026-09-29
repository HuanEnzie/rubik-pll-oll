/**
 * Giải thích ký hiệu xoay bằng tiếng Việt. Hướng luôn mô tả khi cầm khối với mặt F (xanh lá) hướng về phía bạn, U (vàng) ở trên.
 */
import { decomposeMove, parseAlgorithmMoves } from './cubeState';

export type MoveKind = 'face' | 'slice' | 'wide' | 'rotation';

interface BaseInfo {
  name: string;
  kind: MoveKind;
  /** mô tả chiều "thuận" (không dấu) và chiều ngược (dấu ') */
  cw: string;
  ccw: string;
  cwArrow: string;
  ccwArrow: string;
}

const BASE_INFO: Record<string, BaseInfo> = {
  R: { name: 'Mặt phải (Right)', kind: 'face', cw: 'Mặt phải quay LÊN (phía trước đi lên trên)', ccw: 'Mặt phải quay XUỐNG (phía trước đi xuống dưới)', cwArrow: '↑', ccwArrow: '↓' },
  L: { name: 'Mặt trái (Left)', kind: 'face', cw: 'Mặt trái quay XUỐNG (phía trước đi xuống dưới)', ccw: 'Mặt trái quay LÊN (phía trước đi lên trên)', cwArrow: '↓', ccwArrow: '↑' },
  U: { name: 'Mặt trên (Up)', kind: 'face', cw: 'Tầng trên quay sang TRÁI (mặt trước chạy sang trái)', ccw: 'Tầng trên quay sang PHẢI (mặt trước chạy sang phải)', cwArrow: '←', ccwArrow: '→' },
  D: { name: 'Mặt dưới (Down)', kind: 'face', cw: 'Tầng dưới quay sang PHẢI (mặt trước chạy sang phải)', ccw: 'Tầng dưới quay sang TRÁI (mặt trước chạy sang trái)', cwArrow: '→', ccwArrow: '←' },
  F: { name: 'Mặt trước (Front)', kind: 'face', cw: 'Mặt trước quay THUẬN chiều kim đồng hồ (nhìn thẳng vào nó)', ccw: 'Mặt trước quay NGƯỢC chiều kim đồng hồ', cwArrow: '↻', ccwArrow: '↺' },
  B: { name: 'Mặt sau (Back)', kind: 'face', cw: 'Mặt sau quay thuận chiều kim đồng hồ khi nhìn từ PHÍA SAU (nhìn từ trước thì cạnh trên chạy sang TRÁI)', ccw: 'Mặt sau quay ngược lại (nhìn từ trước thì cạnh trên chạy sang PHẢI)', cwArrow: '↺', ccwArrow: '↻' },
  M: { name: 'Lớp giữa dọc (giữa L và R)', kind: 'slice', cw: 'Lớp giữa quay XUỐNG — cùng chiều với L (phía trước đi xuống)', ccw: 'Lớp giữa quay LÊN — cùng chiều với R (phía trước đi lên)', cwArrow: '↓', ccwArrow: '↑' },
  E: { name: 'Lớp giữa ngang (giữa U và D)', kind: 'slice', cw: 'Lớp giữa quay sang PHẢI — cùng chiều với D', ccw: 'Lớp giữa quay sang TRÁI — cùng chiều với U', cwArrow: '→', ccwArrow: '←' },
  S: { name: 'Lớp giữa đứng (giữa F và B)', kind: 'slice', cw: 'Lớp giữa quay THUẬN chiều kim đồng hồ — cùng chiều với F', ccw: 'Lớp giữa quay NGƯỢC chiều kim đồng hồ', cwArrow: '↻', ccwArrow: '↺' },
  r: { name: '2 lớp phải (R + lớp giữa)', kind: 'wide', cw: 'Quay 2 lớp bên phải LÊN cùng lúc (như R, kéo theo lớp giữa)', ccw: 'Quay 2 lớp bên phải XUỐNG cùng lúc', cwArrow: '↑', ccwArrow: '↓' },
  l: { name: '2 lớp trái (L + lớp giữa)', kind: 'wide', cw: 'Quay 2 lớp bên trái XUỐNG cùng lúc (như L, kéo theo lớp giữa)', ccw: 'Quay 2 lớp bên trái LÊN cùng lúc', cwArrow: '↓', ccwArrow: '↑' },
  u: { name: '2 lớp trên (U + lớp giữa)', kind: 'wide', cw: 'Quay 2 lớp trên sang TRÁI cùng lúc (như U, kéo theo lớp giữa)', ccw: 'Quay 2 lớp trên sang PHẢI cùng lúc', cwArrow: '←', ccwArrow: '→' },
  d: { name: '2 lớp dưới (D + lớp giữa)', kind: 'wide', cw: 'Quay 2 lớp dưới sang PHẢI cùng lúc (như D, kéo theo lớp giữa)', ccw: 'Quay 2 lớp dưới sang TRÁI cùng lúc', cwArrow: '→', ccwArrow: '←' },
  f: { name: '2 lớp trước (F + lớp giữa)', kind: 'wide', cw: 'Quay 2 lớp phía trước THUẬN chiều kim đồng hồ (như F)', ccw: 'Quay 2 lớp phía trước NGƯỢC chiều kim đồng hồ', cwArrow: '↻', ccwArrow: '↺' },
  b: { name: '2 lớp sau (B + lớp giữa)', kind: 'wide', cw: 'Quay 2 lớp phía sau như B', ccw: 'Quay 2 lớp phía sau ngược lại', cwArrow: '↺', ccwArrow: '↻' },
  x: { name: 'Xoay CẢ KHỐI theo trục R', kind: 'rotation', cw: 'Cả khối lăn LÊN về phía bạn như R (mặt trước → lên trên). Chỉ đổi cách cầm, không đổi thế bài', ccw: 'Cả khối lăn XUỐNG như R\'. Chỉ đổi cách cầm', cwArrow: '↑', ccwArrow: '↓' },
  y: { name: 'Xoay CẢ KHỐI theo trục U', kind: 'rotation', cw: 'Cả khối xoay sang TRÁI như U (mặt phải quay ra phía trước). Chỉ đổi cách cầm', ccw: 'Cả khối xoay sang PHẢI như U\'. Chỉ đổi cách cầm', cwArrow: '←', ccwArrow: '→' },
  z: { name: 'Xoay CẢ KHỐI theo trục F', kind: 'rotation', cw: 'Cả khối nghiêng THUẬN chiều kim đồng hồ như F. Chỉ đổi cách cầm', ccw: 'Cả khối nghiêng NGƯỢC chiều kim đồng hồ như F\'. Chỉ đổi cách cầm', cwArrow: '↻', ccwArrow: '↺' },
};

export interface MoveInfo {
  token: string;
  title: string;
  detail: string;
  arrow: string;
  kind: MoveKind;
  /** ghi chú về dấu ' hoặc 2 */
  modifier: string | null;
}

export function describeMove(token: string): MoveInfo | null {
  const d = decomposeMove(token);
  if (!d) return null;
  const info = BASE_INFO[d.base];
  const prime = d.turns === 3;
  const double = d.turns === 2;
  const shown = /w/.test(token) ? token : token.replace(/’/g, "'");
  return {
    token: shown,
    title: `${shown} — ${info.name}`,
    detail: prime ? info.ccw : info.cw,
    arrow: prime ? info.ccwArrow : info.cwArrow,
    kind: info.kind,
    modifier: double ? 'Số 2 = xoay 180° (làm 2 lần cùng một chiều)' : prime ? "Dấu ' = xoay NGƯỢC lại so với không có dấu" : null,
  };
}

/** Các token khác nhau trong công thức, theo thứ tự xuất hiện (R và R' là hai token khác nhau). */
export function uniqueMoveTokens(algorithm: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of parseAlgorithmMoves(algorithm)) {
    const d = decomposeMove(t);
    if (!d) continue;
    const key = d.turns === 1 ? d.base : d.turns === 2 ? `${d.base}2` : `${d.base}'`;
    if (!seen.has(key)) { seen.add(key); out.push(key); }
  }
  return out;
}

export const LEGEND_GROUPS: { title: string; hint: string; bases: string[] }[] = [
  { title: '6 mặt', hint: 'Quay một mặt 90° theo chiều kim đồng hồ khi bạn nhìn thẳng vào mặt đó', bases: ['R', 'L', 'U', 'D', 'F', 'B'] },
  { title: 'Lớp giữa', hint: 'Quay lớp nằm giữa hai mặt', bases: ['M', 'E', 'S'] },
  { title: '2 lớp cùng lúc (chữ thường)', hint: 'Mặt + lớp giữa liền kề quay cùng nhau', bases: ['r', 'l', 'u', 'd', 'f', 'b'] },
  { title: 'Xoay cả khối', hint: 'Không đổi thế bài, chỉ đổi hướng bạn cầm khối', bases: ['x', 'y', 'z'] },
];
