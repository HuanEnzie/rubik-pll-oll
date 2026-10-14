/**
 * Chấm điểm "dễ bấm" cho công thức sinh tự động (điểm càng thấp càng tốt):
 * số nước (HTM) + phạt nước F (phải đổi tay cầm) + thưởng công thức chỉ R/U.
 */
export interface Candidate { alg: string; cost: number; len: number }

export function scoreAlg(alg: string): Candidate {
  const ms = alg.split(' ').filter(Boolean);
  let cost = ms.length;
  let fCount = 0;
  for (const m of ms) {
    if (m[0] === 'F') { fCount++; cost += m.includes('2') ? 0.9 : 0.6; }
    if (m[0] === 'L') cost += 0.4;
  }
  if (!fCount && ms.every(m => m[0] === 'R' || m[0] === 'U')) cost -= 1;
  // F đứng riêng lẻ giữa chuỗi R/U khó bấm hơn cặp F ... F' ở đầu/cuối
  if (ms[0]?.[0] === 'U') cost += 0.3;
  return { alg, cost: Math.round(cost * 100) / 100, len: ms.length };
}

/** Giữ tối đa n công thức: tốt nhất + các phương án khác hẳn (khác 4 nước đầu), ưu tiên có một bản R/U. */
export function pickAlgs(cands: Candidate[], n: number): Candidate[] {
  const uniq = new Map<string, Candidate>();
  for (const c of cands) if (!uniq.has(c.alg)) uniq.set(c.alg, c);
  const sorted = [...uniq.values()].sort((a, b) => a.cost - b.cost || a.alg.localeCompare(b.alg));
  const out: Candidate[] = [];
  const prefix = (c: Candidate) => c.alg.split(' ').slice(0, 4).join(' ');
  const isRU = (c: Candidate) => /^[RU2' ]+$/.test(c.alg);
  for (const c of sorted) {
    if (out.length >= n) break;
    if (out.some(o => prefix(o) === prefix(c))) continue;
    if (out.length && c.cost > out[0].cost + 3) break;
    out.push(c);
  }
  const ru = sorted.find(isRU);
  if (ru && !out.some(o => o.alg === ru.alg)) {
    if (out.length >= n) out[n - 1] = ru;
    else out.push(ru);
  }
  return out;
}
