import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { CubeState, FACE_COLORS, FaceIndex } from '../utils/cubeState';
import { RotateCw, Maximize2, RotateCcw } from 'lucide-react';

interface Cube3DProps {
  cubeState: CubeState;
  activeMove?: string;
  size?: number;
  className?: string;
}

// Map face indices to Three.js sticker hex colors
const COLOR_VALUES: Record<FaceIndex, number> = {
  0: 0xfacc15, // U - Yellow
  1: 0xf8fafc, // D - White
  2: 0x22c55e, // F - Green
  3: 0x3b82f6, // B - Blue
  4: 0xf97316, // L - Orange
  5: 0xef4444, // R - Red
};

const INNER_COLOR = 0x181e29; // Dark inner plastic of speedcube

export const Cube3D: React.FC<Cube3DProps> = ({
  cubeState,
  activeMove = '',
  size = 220,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cubeGroupRef = useRef<THREE.Group | null>(null);
  const cubiesRef = useRef<THREE.Mesh[]>([]);

  // Drag rotation state
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Default camera target rotation for standard U-F-R perspective
  const defaultEuler = useRef(new THREE.Euler(0.45, -0.65, 0, 'YXZ'));

  // Reset cube orientation to default isometric angle
  const resetOrientation = useCallback(() => {
    if (cubeGroupRef.current) {
      cubeGroupRef.current.setRotationFromEuler(defaultEuler.current);
    }
  }, []);

  // Set top-down view (ideal for OLL inspection)
  const setTopView = useCallback(() => {
    if (cubeGroupRef.current) {
      cubeGroupRef.current.setRotationFromEuler(new THREE.Euler(1.25, 0, 0, 'YXZ'));
    }
  }, []);

  // Update materials on the 27 cubies based on current cubeState
  const updateCubeColors = useCallback((state: CubeState) => {
    const cubies = cubiesRef.current;
    if (!cubies || cubies.length === 0) return;

    // Cubies coordinate convention:
    // x in {-1, 0, 1}: -1 is Left (L), +1 is Right (R)
    // y in {-1, 0, 1}: -1 is Down (D), +1 is Up (U)
    // z in {-1, 0, 1}: -1 is Back (B), +1 is Front (F)
    // BoxGeometry materials array order:
    // [0]: +X (Right / R)
    // [1]: -X (Left / L)
    // [2]: +Y (Up / U)
    // [3]: -Y (Down / D)
    // [4]: +Z (Front / F)
    // [5]: -Z (Back / B)

    cubies.forEach(mesh => {
      const { x, y, z } = mesh.userData as { x: number; y: number; z: number };
      const mats = mesh.material as THREE.MeshStandardMaterial[];

      // +X (Right face, x = +1)
      if (x === 1) {
        // In R face: row is (1 - y) -> 0, 1, 2; col is (z + 1) -> 0 is B, 2 is F
        const r = 1 - y;
        const c = z + 1;
        const colorIdx = state.R[r][c] as FaceIndex;
        mats[0].color.setHex(COLOR_VALUES[colorIdx]);
      } else {
        mats[0].color.setHex(INNER_COLOR);
      }

      // -X (Left face, x = -1)
      if (x === -1) {
        // In L face: row is (1 - y); col is (1 - z) -> 0 is B, 2 is F
        const r = 1 - y;
        const c = 1 - z;
        const colorIdx = state.L[r][c] as FaceIndex;
        mats[1].color.setHex(COLOR_VALUES[colorIdx]);
      } else {
        mats[1].color.setHex(INNER_COLOR);
      }

      // +Y (Up face, y = +1)
      if (y === 1) {
        // In U face: row is (1 - z) -> z=-1(B)=row 0, z=+1(F)=row 2
        // col is (x + 1) -> x=-1(L)=col 0, x=+1(R)=col 2
        const r = 1 - z;
        const c = x + 1;
        const colorIdx = state.U[r][c] as FaceIndex;
        mats[2].color.setHex(COLOR_VALUES[colorIdx]);
      } else {
        mats[2].color.setHex(INNER_COLOR);
      }

      // -Y (Down face, y = -1)
      if (y === -1) {
        const r = z + 1;
        const c = x + 1;
        const colorIdx = state.D[r][c] as FaceIndex;
        mats[3].color.setHex(COLOR_VALUES[colorIdx]);
      } else {
        mats[3].color.setHex(INNER_COLOR);
      }

      // +Z (Front face, z = +1)
      if (z === 1) {
        // In F face: row is (1 - y); col is (x + 1)
        const r = 1 - y;
        const c = x + 1;
        const colorIdx = state.F[r][c] as FaceIndex;
        mats[4].color.setHex(COLOR_VALUES[colorIdx]);
      } else {
        mats[4].color.setHex(INNER_COLOR);
      }

      // -Z (Back face, z = -1)
      if (z === -1) {
        // In B face: row is (1 - y); col is (1 - x)
        const r = 1 - y;
        const c = 1 - x;
        const colorIdx = state.B[r][c] as FaceIndex;
        mats[5].color.setHex(COLOR_VALUES[colorIdx]);
      } else {
        mats[5].color.setHex(INNER_COLOR);
      }
    });
  }, []);

  // Initialize Three.js Scene, Camera, Lights, Cubies
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = size;
    const height = size;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera (Perspective for true 3D depth)
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.6);
    cameraRef.current = camera;

    // Renderer with antialias and alpha
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight1.position.set(5, 8, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight2.position.set(-5, -4, -6);
    scene.add(dirLight2);

    // Root Cube Group
    const cubeGroup = new THREE.Group();
    cubeGroup.setRotationFromEuler(defaultEuler.current);
    scene.add(cubeGroup);
    cubeGroupRef.current = cubeGroup;

    // Build 27 Cubies
    const cubies: THREE.Mesh[] = [];
    const cubieSize = 0.94;
    const spacing = 1.0; // 0.06 gap between cubies gives realistic speedcube look
    const geom = new THREE.BoxGeometry(cubieSize, cubieSize, cubieSize);

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          // 6 materials per cubie for 6 faces: +X, -X, +Y, -Y, +Z, -Z
          const materials: THREE.MeshStandardMaterial[] = [];
          for (let f = 0; f < 6; f++) {
            materials.push(
              new THREE.MeshStandardMaterial({
                color: INNER_COLOR,
                roughness: 0.28,
                metalness: 0.12,
              })
            );
          }

          const mesh = new THREE.Mesh(geom, materials);
          mesh.position.set(x * spacing, y * spacing, z * spacing);
          mesh.userData = { x, y, z };

          cubeGroup.add(mesh);
          cubies.push(mesh);
        }
      }
    }

    cubiesRef.current = cubies;
    updateCubeColors(cubeState);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Pointer Event Handlers for interactive 360 rotation
    const dom = renderer.domElement;

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      prevPointerRef.current = { x: e.clientX, y: e.clientY };
      dom.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || !cubeGroupRef.current) return;
      const deltaX = e.clientX - prevPointerRef.current.x;
      const deltaY = e.clientY - prevPointerRef.current.y;
      prevPointerRef.current = { x: e.clientX, y: e.clientY };

      // Apply rotation to cube group relative to screen axes
      const rotationSpeed = 0.009;
      const rotY = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        deltaX * rotationSpeed
      );
      const rotX = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        deltaY * rotationSpeed
      );

      cubeGroupRef.current.quaternion.premultiply(rotX);
      cubeGroupRef.current.quaternion.premultiply(rotY);
    };

    const onPointerUp = (e: PointerEvent) => {
      isDraggingRef.current = false;
      try {
        dom.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    };

    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('pointercancel', onPointerUp);

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('pointercancel', onPointerUp);

      cubies.forEach(mesh => {
        mesh.geometry.dispose();
        const mats = mesh.material as THREE.MeshStandardMaterial[];
        mats.forEach(m => m.dispose());
      });
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [size]);

  // Update cubie sticker colors when cubeState changes
  useEffect(() => {
    updateCubeColors(cubeState);
  }, [cubeState, updateCubeColors]);

  return (
    <div
      id="cube-3d-interactive-container"
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        className="cursor-grab active:cursor-grabbing rounded-xl overflow-hidden touch-none"
        style={{ width: size, height: size }}
        title="Chạm hoặc kéo chuột để xoay khối 3D 360°"
      />

      {/* Floating Control Toolbar */}
      <div className="absolute top-2 left-2 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-lg p-1 shadow-md">
        <button
          type="button"
          onClick={resetOrientation}
          className="p-1 text-slate-300 hover:text-amber-400 hover:bg-slate-800 rounded transition"
          title="Góc nhìn chuẩn U-F-R"
          aria-label="Góc nhìn chuẩn"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={setTopView}
          className="p-1 text-slate-300 hover:text-amber-400 hover:bg-slate-800 rounded transition text-[10px] font-bold px-1.5"
          title="Góc nhìn từ trên (Top View)"
          aria-label="Góc nhìn mặt trên"
        >
          Top U
        </button>
      </div>

      {/* Active move badge indicator */}
      {activeMove && (
        <div className="absolute top-2 right-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-xs font-mono font-bold tracking-wider animate-pulse shadow-sm">
          Move: {activeMove}
        </div>
      )}

      {/* Subtle Hint for User */}
      <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 opacity-75 hover:opacity-100 transition">
        <span>🖱️ Kéo để xoay 360°</span>
        <span className="text-slate-600">•</span>
        <button
          type="button"
          onClick={resetOrientation}
          className="text-amber-400/90 hover:underline cursor-pointer"
        >
          Đặt lại góc
        </button>
      </div>
    </div>
  );
};
