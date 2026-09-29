import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { CubeState, FaceIndex, decomposeMove } from '../utils/cubeState';
import { FaceLetter, MOVE_GEOMETRY, faceletOf } from '../utils/cubeGeometry';
import { RotateCcw } from 'lucide-react';

/** Một nước đi cần animate: hiển thị `from`, xoay lớp theo `move`, rồi kết thúc ở `cubeState`. */
export interface CubeTransition {
  key: number;
  move: string;
  from: CubeState;
  /** ms; mặc định lấy từ moveDurationMs */
  durationMs?: number;
}

interface Cube3DProps {
  cubeState: CubeState;
  transition?: CubeTransition | null;
  /** ms cho một nước đi */
  moveDurationMs?: number;
  size?: number;
  className?: string;
}

const COLOR_VALUES: Record<FaceIndex, number> = {
  0: 0xffd500, // U - vàng
  1: 0xffffff, // D - trắng
  2: 0x00a651, // F - xanh lá
  3: 0x0057d9, // B - xanh dương
  4: 0xff6a00, // L - cam
  5: 0xd8202a, // R - đỏ
};

const BODY_COLOR = 0x0d0f14;
const FACES: { face: FaceLetter; normal: [number, number, number] }[] = [
  { face: 'U', normal: [0, 1, 0] },
  { face: 'D', normal: [0, -1, 0] },
  { face: 'F', normal: [0, 0, 1] },
  { face: 'B', normal: [0, 0, -1] },
  { face: 'L', normal: [-1, 0, 0] },
  { face: 'R', normal: [1, 0, 0] },
];

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function roundedRectGeometry(size: number, radius: number): THREE.ShapeGeometry {
  const h = size / 2;
  const s = new THREE.Shape();
  s.moveTo(-h + radius, -h);
  s.lineTo(h - radius, -h);
  s.quadraticCurveTo(h, -h, h, -h + radius);
  s.lineTo(h, h - radius);
  s.quadraticCurveTo(h, h, h - radius, h);
  s.lineTo(-h + radius, h);
  s.quadraticCurveTo(-h, h, -h, h - radius);
  s.lineTo(-h, -h + radius);
  s.quadraticCurveTo(-h, -h, -h + radius, -h);
  return new THREE.ShapeGeometry(s, 6);
}

function letterTexture(letter: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.font = '900 84px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, 64, 70);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

interface Cubie {
  group: THREE.Group;
  x: number;
  y: number;
  z: number;
}

type ViewPreset = 'ufr' | 'top' | 'back';
const VIEW_EULER: Record<ViewPreset, THREE.Euler> = {
  ufr: new THREE.Euler(0.55, -0.72, 0, 'YXZ'), // thấy U, F, R
  top: new THREE.Euler(1.5, 0, 0, 'YXZ'), // nhìn thẳng từ trên xuống, F ở phía dưới
  back: new THREE.Euler(0.55, Math.PI - 0.72, 0, 'YXZ'), // thấy U, B, L
};

export const Cube3D: React.FC<Cube3DProps> = ({
  cubeState,
  transition = null,
  moveDurationMs = 420,
  size = 260,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cubeGroupRef = useRef<THREE.Group | null>(null);
  const cubiesRef = useRef<Cubie[]>([]);
  const stickersRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const animRef = useRef<{ finish: () => void } | null>(null);
  const latestState = useRef(cubeState);
  const durationRef = useRef(moveDurationMs);
  durationRef.current = moveDurationMs;
  const [view, setView] = useState<ViewPreset>('ufr');
  const lastKeyRef = useRef<number | null>(null);

  const paint = useCallback((state: CubeState) => {
    for (const cubie of cubiesRef.current) {
      for (const { face, normal } of FACES) {
        const mesh = stickersRef.current.get(`${cubie.x},${cubie.y},${cubie.z},${face}`);
        if (!mesh) continue;
        const { r, c } = faceletOf(cubie.x, cubie.y, cubie.z, face);
        (mesh.material as THREE.MeshStandardMaterial).color.setHex(COLOR_VALUES[state[face][r][c] as FaceIndex]);
        void normal;
      }
    }
  }, []);

  /* ---- khởi tạo scene ---- */
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.35));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(4, 8, 7);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.5);
    fill.position.set(-6, -3, -5);
    scene.add(fill);

    const cubeGroup = new THREE.Group();
    cubeGroup.setRotationFromEuler(VIEW_EULER.ufr);
    scene.add(cubeGroup);
    cubeGroupRef.current = cubeGroup;

    const bodyGeom = new THREE.BoxGeometry(0.97, 0.97, 0.97);
    const bodyMat = new THREE.MeshStandardMaterial({ color: BODY_COLOR, roughness: 0.55, metalness: 0.1 });
    const stickerGeom = roundedRectGeometry(0.82, 0.13);
    const letterGeom = new THREE.PlaneGeometry(0.55, 0.55);
    const disposables: { dispose(): void }[] = [bodyGeom, bodyMat, stickerGeom, letterGeom];
    const cubies: Cubie[] = [];
    const stickers = new Map<string, THREE.Mesh>();
    const zAxis = new THREE.Vector3(0, 0, 1);

    for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
      const group = new THREE.Group();
      group.position.set(x, y, z);
      group.add(new THREE.Mesh(bodyGeom, bodyMat));
      for (const { face, normal } of FACES) {
        const coord = { x, y, z };
        const onFace = normal[0] !== 0 ? coord.x === normal[0] : normal[1] !== 0 ? coord.y === normal[1] : coord.z === normal[2];
        if (!onFace) continue;
        const n = new THREE.Vector3(...normal);
        const mat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.35, metalness: 0 });
        disposables.push(mat);
        const mesh = new THREE.Mesh(stickerGeom, mat);
        mesh.quaternion.setFromUnitVectors(zAxis, n);
        mesh.position.copy(n).multiplyScalar(0.488);
        group.add(mesh);
        stickers.set(`${x},${y},${z},${face}`, mesh);

        // chữ tên mặt trên sticker tâm
        if (Math.abs(x) + Math.abs(y) + Math.abs(z) === 1) {
          const tex = letterTexture(face);
          const lm = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
          disposables.push(tex, lm);
          const label = new THREE.Mesh(letterGeom, lm);
          label.position.z = 0.004;
          mesh.add(label);
        }
      }
      cubeGroup.add(group);
      cubies.push({ group, x, y, z });
    }
    cubiesRef.current = cubies;
    stickersRef.current = stickers;
    paint(latestState.current);

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      renderer.render(scene, camera);
    };
    loop();

    /* kéo chuột để xoay */
    const dom = renderer.domElement;
    let dragging = false;
    let px = 0, py = 0;
    const down = (e: PointerEvent) => { dragging = true; px = e.clientX; py = e.clientY; dom.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - px, dy = e.clientY - py;
      px = e.clientX; py = e.clientY;
      const s = 0.009;
      cubeGroup.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), dy * s));
      cubeGroup.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), dx * s));
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      try { dom.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
    };
    dom.addEventListener('pointerdown', down);
    dom.addEventListener('pointermove', move);
    dom.addEventListener('pointerup', up);
    dom.addEventListener('pointercancel', up);

    return () => {
      cancelAnimationFrame(raf);
      animRef.current = null;
      dom.removeEventListener('pointerdown', down);
      dom.removeEventListener('pointermove', move);
      dom.removeEventListener('pointerup', up);
      dom.removeEventListener('pointercancel', up);
      disposables.forEach(d => d.dispose());
      renderer.dispose();
      if (container.contains(dom)) container.removeChild(dom);
      cubiesRef.current = [];
      stickersRef.current = new Map();
    };
  }, [size, paint]);

  /* ---- đổi trạng thái / animate một nước ---- */
  useEffect(() => {
    latestState.current = cubeState;
    // kết thúc animation đang chạy (nếu có) để không bị lệch
    animRef.current?.finish();

    const cubeGroup = cubeGroupRef.current;
    const isNewTransition = transition && transition.key !== lastKeyRef.current;
    if (transition) lastKeyRef.current = transition.key;

    const d = transition ? decomposeMove(transition.move) : null;
    const geo = d ? MOVE_GEOMETRY[d.base] : null;
    if (!cubeGroup || !transition || !isNewTransition || !d || !geo) {
      paint(cubeState);
      return;
    }

    paint(transition.from);
    const quarters = geo.q * (d.turns === 3 ? -1 : d.turns);
    const target = (quarters * Math.PI) / 2;
    const axisVec = new THREE.Vector3(...([0, 1, 2].map(i => (i === geo.axis ? 1 : 0)) as [number, number, number]));
    const pivot = new THREE.Group();
    cubeGroup.add(pivot);
    const moving = cubiesRef.current.filter(c => geo.layers.includes([c.x, c.y, c.z][geo.axis]));
    moving.forEach(c => pivot.attach(c.group));

    const duration = (transition.durationMs ?? durationRef.current) * (d.turns === 2 ? 1.4 : 1);
    const t0 = performance.now();
    let raf = 0;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      moving.forEach(c => {
        pivot.remove(c.group);
        c.group.position.set(c.x, c.y, c.z);
        c.group.quaternion.identity();
        cubeGroup.add(c.group);
      });
      cubeGroup.remove(pivot);
      paint(latestState.current);
      animRef.current = null;
    };
    animRef.current = { finish };

    const tick = () => {
      const t = Math.min(1, (performance.now() - t0) / duration);
      pivot.quaternion.setFromAxisAngle(axisVec, target * easeInOut(t));
      if (t >= 1) finish();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }, [cubeState, transition, paint]);

  const applyView = useCallback((v: ViewPreset) => {
    setView(v);
    cubeGroupRef.current?.setRotationFromEuler(VIEW_EULER[v]);
  }, []);

  const viewBtn = (id: ViewPreset, label: string, title: string) => (
    <button
      key={id}
      type="button"
      onClick={() => applyView(id)}
      title={title}
      className={`px-2 py-1 rounded text-[11px] font-bold transition ${
        view === id ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      <div
        ref={mountRef}
        className="cursor-grab active:cursor-grabbing rounded-xl overflow-hidden touch-none"
        style={{ width: size, height: size }}
        title="Kéo chuột để xoay khối 3D"
      />
      <div className="mt-1.5 flex items-center gap-1 bg-slate-900/90 border border-slate-700/60 rounded-lg p-1">
        {viewBtn('ufr', 'Trước-Phải', 'Nhìn chéo: thấy mặt U, F, R')}
        {viewBtn('top', 'Từ trên', 'Nhìn thẳng từ trên xuống (mặt U), F ở phía dưới')}
        {viewBtn('back', 'Sau-Trái', 'Nhìn chéo từ phía sau: thấy mặt U, B, L')}
        <button
          type="button"
          onClick={() => applyView(view)}
          className="p-1 text-slate-400 hover:text-amber-300 rounded"
          title="Đặt lại góc nhìn"
          aria-label="Đặt lại góc nhìn"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="text-[10px] text-slate-500 mt-1">Kéo để xoay · chữ trên tâm là tên mặt</div>
    </div>
  );
};
