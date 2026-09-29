/**
 * Ánh xạ giữa ô facelet (mặt, hàng, cột) và toạ độ 3D của sticker.
 * Đây là NGUỒN DUY NHẤT cho quy ước hướng của các mặt — cả Cube3D và script kiểm tra đều dùng.
 *
 * Toạ độ: x: -1 = L, +1 = R | y: -1 = D, +1 = U | z: -1 = B, +1 = F
 * Mỗi mặt được nhìn từ BÊN NGOÀI với quy ước net chuẩn (U có F ở phía dưới):
 *   U: hàng 0 = phía sau (B), hàng 2 = phía trước (F), cột 0 = trái
 *   D: hàng 0 = phía trước (F), hàng 2 = phía sau (B), cột 0 = trái
 *   F: hàng 0 = trên, cột 0 = trái
 *   B: hàng 0 = trên, cột 0 = phía R (nhìn từ sau)
 *   R: hàng 0 = trên, cột 0 = phía F
 *   L: hàng 0 = trên, cột 0 = phía B
 */

export type FaceLetter = 'U' | 'D' | 'F' | 'B' | 'L' | 'R';
type Vec = [number, number, number];

export const FACELET_POS: Record<FaceLetter, (r: number, c: number) => { pos: Vec; nor: Vec }> = {
  U: (r, c) => ({ pos: [c - 1, 1, r - 1], nor: [0, 1, 0] }),
  D: (r, c) => ({ pos: [c - 1, -1, 1 - r], nor: [0, -1, 0] }),
  F: (r, c) => ({ pos: [c - 1, 1 - r, 1], nor: [0, 0, 1] }),
  B: (r, c) => ({ pos: [1 - c, 1 - r, -1], nor: [0, 0, -1] }),
  R: (r, c) => ({ pos: [1, 1 - r, 1 - c], nor: [1, 0, 0] }),
  L: (r, c) => ({ pos: [-1, 1 - r, c - 1], nor: [-1, 0, 0] }),
};

export const faceletKey = (f: FaceLetter, r: number, c: number) => `${f}[${r}][${c}]`;

/** Ngược lại: từ toạ độ cubie + hướng pháp tuyến -> (r, c) trên mặt tương ứng. */
export function faceletOf(x: number, y: number, z: number, face: FaceLetter): { r: number; c: number } {
  switch (face) {
    case 'U': return { r: z + 1, c: x + 1 };
    case 'D': return { r: 1 - z, c: x + 1 };
    case 'F': return { r: 1 - y, c: x + 1 };
    case 'B': return { r: 1 - y, c: 1 - x };
    case 'R': return { r: 1 - y, c: 1 - z };
    case 'L': return { r: 1 - y, c: z + 1 };
  }
}

/**
 * Hình học từng nước đi: trục quay (0=x,1=y,2=z), các lớp bị quay (toạ độ trên trục đó),
 * q = số góc 90° (quy tắc bàn tay phải quanh trục +) tương ứng với MỘT nước theo chiều kim đồng hồ.
 * Được script verify-engine đối chiếu với engine facelet.
 */
export const MOVE_GEOMETRY: Record<string, { axis: 0 | 1 | 2; layers: number[]; q: number }> = {
  R: { axis: 0, layers: [1], q: -1 }, L: { axis: 0, layers: [-1], q: 1 }, M: { axis: 0, layers: [0], q: 1 },
  U: { axis: 1, layers: [1], q: -1 }, D: { axis: 1, layers: [-1], q: 1 }, E: { axis: 1, layers: [0], q: 1 },
  F: { axis: 2, layers: [1], q: -1 }, B: { axis: 2, layers: [-1], q: 1 }, S: { axis: 2, layers: [0], q: -1 },
  r: { axis: 0, layers: [0, 1], q: -1 }, l: { axis: 0, layers: [-1, 0], q: 1 },
  u: { axis: 1, layers: [0, 1], q: -1 }, d: { axis: 1, layers: [-1, 0], q: 1 },
  f: { axis: 2, layers: [0, 1], q: -1 }, b: { axis: 2, layers: [-1, 0], q: 1 },
  x: { axis: 0, layers: [-1, 0, 1], q: -1 }, y: { axis: 1, layers: [-1, 0, 1], q: -1 }, z: { axis: 2, layers: [-1, 0, 1], q: -1 },
};
