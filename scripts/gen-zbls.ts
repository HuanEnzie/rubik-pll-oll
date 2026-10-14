/**
 * SINH công thức ZBLS (ô F2L cuối FR + định hướng 4 cạnh tầng trên) bằng bộ giải <R,U,F>,
 * ghi ra src/data/zblsAlgs.ts.   Chạy: npx tsx scripts/gen-zbls.ts
 * Case = vị trí/hướng của góc + cạnh FR (ở tầng trên hoặc trong khe) × hướng các cạnh tầng trên,
 * tính tới AUF; không gồm trường hợp cặp đã vào khe và 4 cạnh đã đúng hướng.
 */
import fs from 'node:fs';
import * as S from './lib/rufSolver';
import { UK, classKey, compose, FL } from './lib/llCases';
import { scoreAlg, pickAlgs, Candidate } from './lib/algScore';

// chỉ số trong CORNERS / EDGES của rufSolver
const FR_CORNER = 4; // DFR
const FR_EDGE = 4; // FR
const SLOT = 4;

const pieceOfSticker = new Map<number, { kind: 'c' | 'e'; piece: number }>();
S.CORNERS.forEach((ids, p) => ids.forEach(i => pieceOfSticker.set(i, { kind: 'c', piece: p })));
S.EDGES.forEach((ids, p) => ids.forEach(i => pieceOfSticker.set(i, { kind: 'e', piece: p })));
const U_STICKERS = new Set(S.FACELETS.map((f, i) => (f.face === 'U' ? i : -1)).filter(i => i >= 0));

/** Che các sticker không quan trọng với ZBLS: góc tầng trên bỏ qua, cạnh tầng trên chỉ giữ "vàng / không vàng". */
export function zblsMask(fl: FL, ignoreEo = false): (number | string)[] {
  return fl.map(v => {
    const pc = pieceOfSticker.get(v);
    if (!pc) return v;
    if (pc.kind === 'c' && pc.piece < 4) return '*';
    if (pc.kind === 'e' && pc.piece < 4) return ignoreEo ? 'e' : U_STICKERS.has(v) ? 'Y' : 'e';
    return v;
  });
}

const parity = (p: number[]) => { let n = 0; for (let i = 0; i < p.length; i++) for (let j = i + 1; j < p.length; j++) if (p[i] > p[j]) n++; return n & 1; };

interface ZblsCaseInfo { key: string; f2lKey: string; cSlot: number; cTwist: number; eSlot: number; eFlip: number; rep: FL }

export function enumerateZbls(): ZblsCaseInfo[] {
  const byKey = new Map<string, ZblsCaseInfo>();
  for (let cSlot = 0; cSlot <= SLOT; cSlot++) for (let cTwist = 0; cTwist < 3; cTwist++)
    for (let eSlot = 0; eSlot <= SLOT; eSlot++) for (let flips = 0; flips < 32; flips++) {
      // 5 viên cạnh (4 cạnh tầng trên + cạnh FR) ở 5 slot 0..4; tổng lật chẵn
      const eo5 = [0, 1, 2, 3, 4].map(i => (flips >> i) & 1);
      if (eo5.reduce((a, b) => a + b, 0) % 2) continue;
      const ep = new Array(5).fill(-1);
      ep[eSlot] = FR_EDGE;
      let nextLL = 0;
      for (let s = 0; s < 5; s++) if (ep[s] < 0) ep[s] = nextLL++;
      const cp = new Array(5).fill(-1);
      const co = new Array(5).fill(0);
      cp[cSlot] = FR_CORNER;
      co[cSlot] = cTwist;
      let nextC = 0;
      for (let s = 0; s < 5; s++) if (cp[s] < 0) cp[s] = nextC++;
      // bù độ xoắn bằng một góc tầng trên, khớp tính chẵn lẻ hoán vị bằng cách đổi 2 góc tầng trên
      const llSlots = [0, 1, 2, 3, 4].filter(s => s !== cSlot);
      co[llSlots[0]] = (3 - cTwist) % 3;
      if (parity(cp) !== parity(ep)) [cp[llSlots[1]], cp[llSlots[2]]] = [cp[llSlots[2]], cp[llSlots[1]]];
      const cub: S.Cubies = { cp: [...cp, 5, 6], co: [...co, 0, 0], ep: [...ep, 5, 6, 7, 8], eo: [...eo5, 0, 0, 0, 0] };
      const fl = S.encode(cub);
      const key = classKey(fl, x => zblsMask(x));
      if (byKey.has(key)) continue;
      byKey.set(key, { key, f2lKey: classKey(fl, x => zblsMask(x, true)), cSlot, cTwist, eSlot, eFlip: eo5[eSlot], rep: fl });
    }
  // bỏ thế đã xong (cặp trong khe đúng hướng + 4 cạnh đúng hướng)
  const goal = classKey(S.FACELETS.map((_, i) => i), x => zblsMask(x));
  byKey.delete(goal);
  return [...byKey.values()];
}

function pruning() {
  const corner = new Set<number>(), edge = new Set<number>();
  const perms: number[][] = [];
  const rec = (cur: number[]) => { if (cur.length === 4) perms.push(cur); else for (let i = 0; i < 4; i++) if (!cur.includes(i)) rec([...cur, i]); };
  rec([]);
  for (const p of perms) {
    for (let t = 0; t < 27; t++) {
      const c = [t % 3, Math.floor(t / 3) % 3, Math.floor(t / 9)];
      const co = [...c, (6 - c[0] - c[1] - c[2]) % 3, 0, 0, 0];
      corner.add(S.cornerKey(S.toCoord({ cp: [...p, 4, 5, 6], co, ep: [...Array(9).keys()], eo: new Array(9).fill(0) })));
    }
    edge.add(S.edgeKey(S.toCoord({ cp: [...Array(7).keys()], co: new Array(7).fill(0), ep: [...p, 4, 5, 6, 7, 8], eo: new Array(9).fill(0) })));
  }
  return S.buildPruning({ corner, edge });
}

const OPT = { forbidFirstFace: 'U', forbidLastFace: 'U' };

function solveCase(pr: S.Pruning, rep: FL): { algs: Candidate[]; optimal: number } {
  const starts = [0, 1, 2, 3].map(a => S.toCoord(S.decode(compose(rep, UK[a]))));
  const d = starts.map(st => S.optimalLength(pr, st, 20, OPT));
  const dmin = Math.min(...d);
  const cands: Candidate[] = [];
  starts.forEach((st, a) => {
    for (let depth = d[a]; depth <= dmin + 2; depth++) {
      for (const ms of S.search(pr, st, depth, { ...OPT, maxSolutions: 3000 })) cands.push(scoreAlg(S.movesToString(ms)));
    }
  });
  return { algs: pickAlgs(cands, 3), optimal: dmin };
}

function checkAlg(alg: string, key: string) {
  let fl = S.FACELETS.map((_, i) => i);
  for (const m of alg.split(' ').reverse()) {
    const im = m.endsWith("'") ? m[0] : m.endsWith('2') ? m : m + "'";
    fl = S.applyFaceletMove(fl, S.PERMS[S.moveIndex(im)]);
  }
  if (classKey(fl, x => zblsMask(x)) !== key) throw new Error(`"${alg}" không giải đúng case`);
}

const LOC_ORDER = ['both-u', 'corner-slot', 'edge-slot', 'both-slot'] as const;
const locOf = (c: ZblsCaseInfo) =>
  c.cSlot < SLOT && c.eSlot < SLOT ? 'both-u' : c.cSlot === SLOT && c.eSlot < SLOT ? 'corner-slot' : c.cSlot < SLOT ? 'edge-slot' : 'both-slot';

if (process.argv[2] === 'count') {
  const cs = enumerateZbls();
  const by: Record<string, number> = {};
  for (const c of cs) by[locOf(c)] = (by[locOf(c)] || 0) + 1;
  console.log(cs.length, by, new Set(cs.map(c => c.f2lKey)).size, 'thế F2L');
} else {
  const cases = enumerateZbls();
  const t0 = Date.now();
  const pr = pruning();
  console.log(`bảng cắt tỉa ${Date.now() - t0} ms, ${cases.length} case`);
  const res = cases.map((c, i) => {
    const { algs, optimal } = solveCase(pr, c.rep);
    for (const a of algs) checkAlg(a.alg, c.key);
    if (i % 20 === 0) console.log(`${i + 1}/${cases.length} opt=${optimal} ${algs[0].alg}`);
    return { ...c, loc: locOf(c), algs, optimal };
  });
  // nhóm theo vị trí cặp -> thế F2L (xếp theo độ khó trung bình) -> số cạnh cần lật
  const lines: string[] = [];
  let n = 0;
  for (const loc of LOC_ORDER) {
    const inLoc = res.filter(c => c.loc === loc);
    const f2l = [...new Set(inLoc.map(c => c.f2lKey))].map(k => {
      const cs = inLoc.filter(c => c.f2lKey === k);
      return { cs, avg: cs.reduce((s, c) => s + c.algs[0].cost, 0) / cs.length };
    }).sort((a, b) => a.avg - b.avg);
    f2l.forEach((g, gi) => {
      g.cs.sort((a, b) => a.algs[0].cost - b.algs[0].cost);
      for (const c of g.cs) {
        n++;
        lines.push(`  { n: ${n}, loc: ${JSON.stringify(loc)}, f2l: ${gi + 1}, algs: [\n${c.algs.map(a => `    ${JSON.stringify(a.alg)},`).join('\n')}\n  ] },`);
      }
    });
    console.log(loc, inLoc.length, 'case,', f2l.length, 'thế F2L');
  }
  fs.writeFileSync('src/data/zblsAlgs.ts', `/**
 * ZBLS (ZBF2L) — ô F2L cuối ở FR + định hướng cạnh tầng trên. FILE SINH TỰ ĐỘNG bởi scripts/gen-zbls.ts — đừng sửa tay.
 * Công thức do bộ giải <R,U,F> tìm (ngắn nhất tới +2 nước, chấm điểm dễ bấm), đã kiểm bằng mô phỏng.
 * loc = vị trí cặp: both-u (cả góc và cạnh ở tầng trên) | corner-slot (góc trong khe) | edge-slot (cạnh trong khe) | both-slot;
 * f2l = số thứ tự thế F2L (bỏ qua hướng cạnh tầng trên) trong nhóm loc.
 */
export interface ZblsDef { n: number; loc: 'both-u' | 'corner-slot' | 'edge-slot' | 'both-slot'; f2l: number; algs: string[] }

export const ZBLS_DEFS: ZblsDef[] = [
${lines.join('\n')}
];
`);
  console.log('Đã ghi src/data/zblsAlgs.ts:', res.length, 'case');
}
