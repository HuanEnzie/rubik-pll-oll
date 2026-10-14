/**
 * SINH công thức ZBLL (472 case) bằng bộ giải <R,U,F> rồi ghi ra src/data/zbllAlgs.ts.
 *   npx tsx scripts/gen-zbll.ts <phần> <số phần> <thư mục tạm>   # chạy song song nhiều tiến trình
 *   npx tsx scripts/gen-zbll.ts merge <số phần> <thư mục tạm>     # gộp kết quả -> src/data/zbllAlgs.ts
 * Mỗi case: tìm lời giải ngắn nhất từ cả 4 hướng nhìn (AUF trước), lấy mọi lời giải tới +2 nước,
 * thêm lời giải chỉ R/U nếu có, rồi chấm điểm "dễ bấm" và giữ tối đa 3 công thức.
 */
import fs from 'node:fs';
import path from 'node:path';
import * as S from './lib/rufSolver';
import { UK, classKey, compose, FL } from './lib/llCases';
import { scoreAlg, pickAlgs, Candidate } from './lib/algScore';
import { caseStateFromAlgorithm, ollClassKey, ollPatternFromState } from '../src/utils/caseAnalysis';
import { REF_OLL } from './reference-algs';

const [mode, nArg, dirArg] = process.argv.slice(2);
const nParts = Number(nArg ?? 1);
const dir = dirArg ?? '.zb-tmp';

const OLL_SET: Record<number, string> = { 21: 'H', 22: 'Pi', 23: 'U', 24: 'T', 25: 'L', 26: 'AS', 27: 'S' };
const SET_ORDER = ['T', 'U', 'L', 'H', 'Pi', 'S', 'AS'];
const ollKeyToSet = new Map<string, string>();
for (const n of [21, 22, 23, 24, 25, 26, 27]) {
  ollKeyToSet.set(ollClassKey(ollPatternFromState(caseStateFromAlgorithm(REF_OLL[n]))), OLL_SET[n]);
}

/* ------------------------- liệt kê 472 case ZBLL ------------------------- */

function perms4(): number[][] {
  const out: number[][] = [];
  const rec = (cur: number[]) => {
    if (cur.length === 4) { out.push(cur); return; }
    for (let i = 0; i < 4; i++) if (!cur.includes(i)) rec([...cur, i]);
  };
  rec([]);
  return out;
}
const parity = (p: number[]) => { let n = 0; for (let i = 0; i < p.length; i++) for (let j = i + 1; j < p.length; j++) if (p[i] > p[j]) n++; return n & 1; };

const U_FACE = new Set(S.FACELETS.map((f, i) => (f.face === 'U' ? i : -1)).filter(i => i >= 0));
const U_EDGE_POS = new Set(S.EDGES.slice(0, 4).flat());

export interface ZbllCaseInfo { key: string; set: string; cornerKey: string; cornerType: string; rep: FL }

function cornerPermType(cp: number[]): string {
  // cp: slot -> viên, slot 0..3 = UFR, UFL, UBL, UBR (theo vòng)
  for (let j = 0; j < 4; j++) for (let k = 0; k < 4; k++) {
    const q = [0, 1, 2, 3].map(s => (((cp[(s + j) % 4] - k) % 4) + 4) % 4);
    const moved = q.map((v, s) => (v !== s ? s : -1)).filter(s => s >= 0);
    if (moved.length === 0) return 'solved';
  }
  for (let j = 0; j < 4; j++) for (let k = 0; k < 4; k++) {
    const q = [0, 1, 2, 3].map(s => (((cp[(s + j) % 4] - k) % 4) + 4) % 4);
    const moved = q.map((v, s) => (v !== s ? s : -1)).filter(s => s >= 0);
    if (moved.length === 2 && Math.abs(moved[0] - moved[1]) === 2) return 'diag';
  }
  return 'adj';
}

export function enumerateZbll(): ZbllCaseInfo[] {
  const byKey = new Map<string, ZbllCaseInfo>();
  for (const cp of perms4()) for (let co = 0; co < 27; co++) for (const ep of perms4()) {
    if (parity(cp) !== parity(ep)) continue;
    const c = [co % 3, Math.floor(co / 3) % 3, Math.floor(co / 9)];
    const twist = [...c, (6 - c[0] - c[1] - c[2]) % 3];
    const cub: S.Cubies = {
      cp: [...cp, 4, 5, 6], co: [...twist, 0, 0, 0],
      ep: [...ep, 4, 5, 6, 7, 8], eo: new Array(9).fill(0),
    };
    const fl = S.encode(cub);
    if ([...U_FACE].every(p => U_FACE.has(fl[p]))) continue; // PLL / đã giải
    const key = classKey(fl);
    if (byKey.has(key)) continue;
    const set = ollKeyToSet.get(ollClassKey(ollPatternFromState(S.faceletsToCube(fl))));
    if (!set) throw new Error('không xác định được nhóm OLL');
    const cornerKey = classKey(fl, x => x.map((v, p) => (U_EDGE_POS.has(p) ? -1 : v)));
    byKey.set(key, { key, set, cornerKey, cornerType: cornerPermType(cp), rep: fl });
  }
  return [...byKey.values()];
}

/* ------------------------------- giải ------------------------------- */

function goalPruning() {
  const goalStates = UK.map(fl => S.toCoord(S.decode(fl)));
  return S.buildPruning({
    corner: new Set(goalStates.map(S.cornerKey)),
    edge: new Set(goalStates.map(S.edgeKey)),
    pairs: new Set(goalStates.map(k => S.cornerKey(k) + ':' + S.edgeKey(k))),
  });
}

const AUF_FIX = ['', "U'", 'U2', 'U'];

function finish(start: S.Coord, ms: number[]): string {
  const end = S.applyMovesCoord(start, ms);
  const goals = UK.map(fl => S.toCoord(S.decode(fl)));
  const k = goals.findIndex(g => g.cp === end.cp && g.co === end.co && g.ep === end.ep && g.eo === end.eo);
  if (k < 0) throw new Error('lời giải không về đích');
  return [S.movesToString(ms), AUF_FIX[k]].filter(Boolean).join(' ');
}

const OPT = { forbidFirstFace: 'U', forbidLastFace: 'U' };
const RU = ['R', 'R2', "R'", 'U', 'U2', "U'"].map(S.moveIndex);

function solveCase(pr: S.Pruning, rep: FL): { algs: Candidate[]; optimal: number } {
  const starts = [0, 1, 2, 3].map(a => S.toCoord(S.decode(compose(rep, UK[a]))));
  const d = starts.map(st => S.optimalLength(pr, st, 22, OPT));
  const dmin = Math.min(...d);
  const cands: Candidate[] = [];
  starts.forEach((st, a) => {
    for (let depth = d[a]; depth <= dmin + 2; depth++) {
      for (const ms of S.search(pr, st, depth, { ...OPT, maxSolutions: 3000 })) cands.push(scoreAlg(finish(st, ms)));
    }
    // công thức chỉ R/U (2-gen) nếu tồn tại và không quá dài
    for (let depth = d[a]; depth <= dmin + 6; depth++) {
      const sols = S.search(pr, st, depth, { ...OPT, allowed: RU, maxSolutions: 50, nodeBudget: 3_000_000 });
      if (sols.length) { for (const ms of sols) cands.push(scoreAlg(finish(st, ms))); break; }
    }
  });
  return { algs: pickAlgs(cands, 3), optimal: dmin };
}

/** Kiểm lại bằng engine facelet của app: công thức phải giải đúng case này. */
function checkAlg(alg: string, key: string) {
  const inv = alg.split(' ').reverse();
  let fl = S.FACELETS.map((_, i) => i);
  for (const m of inv) {
    const im = m.endsWith("'") ? m[0] : m.endsWith('2') ? m : m + "'";
    fl = S.applyFaceletMove(fl, S.PERMS[S.moveIndex(im)]);
  }
  if (classKey(fl) !== key) throw new Error(`"${alg}" không giải đúng case`);
}

/* ------------------------------- main ------------------------------- */

if (mode === 'merge') {
  const all: { key: string; set: string; cornerKey: string; cornerType: string; algs: Candidate[]; optimal: number }[] = [];
  for (let p = 0; p < nParts; p++) all.push(...JSON.parse(fs.readFileSync(path.join(dir, `zbll-${p}.json`), 'utf8')));
  const cases = enumerateZbll();
  if (all.length !== cases.length) throw new Error(`thiếu case: ${all.length}/${cases.length}`);
  const typeRank: Record<string, number> = { solved: 0, diag: 1, adj: 2 };
  const lines: string[] = [];
  for (const set of SET_ORDER) {
    const inSet = all.filter(c => c.set === set);
    // tập con COLL: xếp theo kiểu hoán vị góc rồi theo độ dài trung bình
    const subsets = [...new Set(inSet.map(c => c.cornerKey))].map(k => {
      const cs = inSet.filter(c => c.cornerKey === k);
      return { k, type: cs[0].cornerType, cs, avg: cs.reduce((s, c) => s + c.algs[0].cost, 0) / cs.length };
    }).sort((a, b) => typeRank[a.type] - typeRank[b.type] || a.avg - b.avg);
    let n = 0;
    subsets.forEach((sub, si) => {
      sub.cs.sort((a, b) => a.algs[0].cost - b.algs[0].cost);
      for (const c of sub.cs) {
        n++;
        lines.push(`  { set: ${JSON.stringify(set)}, n: ${n}, sub: ${si + 1}, cp: ${JSON.stringify(sub.type)}, algs: [\n${c.algs.map(a => `    ${JSON.stringify(a.alg)},`).join('\n')}\n  ] },`);
      }
    });
    console.log(set, inSet.length, 'case,', subsets.length, 'tập con');
  }
  const out = `/**
 * ZBLL — 472 case (không tính 21 PLL). FILE SINH TỰ ĐỘNG bởi scripts/gen-zbll.ts — đừng sửa tay.
 * Công thức do bộ giải <R,U,F> tìm (ngắn nhất tới +2 nước, ưu tiên R/U), đã kiểm bằng mô phỏng.
 * set = nhóm hướng góc (T, U, L, H, Pi, S, AS); sub = tập con COLL (cùng cách hoán vị góc);
 * cp = kiểu hoán vị góc của tập con: solved (đúng chỗ) | diag (đổi chéo) | adj (đổi kề).
 */
export interface ZbllDef { set: string; n: number; sub: number; cp: 'solved' | 'diag' | 'adj'; algs: string[] }

export const ZBLL_DEFS: ZbllDef[] = [
${lines.join('\n')}
];
`;
  fs.writeFileSync('src/data/zbllAlgs.ts', out);
  console.log('Đã ghi src/data/zbllAlgs.ts:', all.length, 'case');
} else if (mode !== undefined && !Number.isNaN(Number(mode))) {
  const part = Number(mode);
  fs.mkdirSync(dir, { recursive: true });
  const cases = enumerateZbll().filter((_, i) => i % nParts === part);
  const t0 = Date.now();
  const pr = goalPruning();
  console.log(`[${part}] bảng cắt tỉa ${Date.now() - t0} ms, ${cases.length} case`);
  const res = [];
  for (const c of cases) {
    const t = Date.now();
    const { algs, optimal } = solveCase(pr, c.rep);
    for (const a of algs) checkAlg(a.alg, c.key);
    res.push({ key: c.key, set: c.set, cornerKey: c.cornerKey, cornerType: c.cornerType, algs, optimal });
    console.log(`[${part}] ${res.length}/${cases.length} ${c.set} opt=${optimal} ${Date.now() - t}ms  ${algs[0].alg}`);
    fs.writeFileSync(path.join(dir, `zbll-${part}.json`), JSON.stringify(res));
  }
} else if (mode === 'count') {
  const cs = enumerateZbll();
  const by: Record<string, number> = {};
  for (const c of cs) by[c.set] = (by[c.set] || 0) + 1;
  console.log(cs.length, by, new Set(cs.map(c => c.cornerKey)).size, 'tập con');
}
