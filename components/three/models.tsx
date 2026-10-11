"use client";

import { useMemo } from "react";
import * as THREE from "three";

/* ─── Shared helpers ─────────────────────────────────────────── */

const WOOD = "#8a5a2b";
const WOOD_DARK = "#5e3b1a";
const CREAM = "#efe4c8";
const GOLD = "#e7b53c";
const STRAW = "#e8c25c";
const RED = "#c8302a";

function canvasTexture(width: number, height: number, draw: (g: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext("2d")!);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/* ─── Going Merry ────────────────────────────────────────────── */

function useHullGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-2.1, 0.95);
    s.lineTo(1.75, 0.95);
    s.quadraticCurveTo(2.25, 0.9, 2.15, 0.45);
    s.quadraticCurveTo(1.9, -0.25, 1.0, -0.3);
    s.lineTo(-1.5, -0.3);
    s.quadraticCurveTo(-2.1, -0.2, -2.15, 0.4);
    s.lineTo(-2.1, 0.95);

    const geometry = new THREE.ExtrudeGeometry(s, {
      depth: 1.4,
      bevelEnabled: true,
      bevelSize: 0.06,
      bevelThickness: 0.06,
      bevelSegments: 1,
      curveSegments: 10,
    });
    geometry.translate(0, 0, -0.7);

    // Taper the bow and the keel so the box extrusion reads as a hull
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      let scale = 0.55 + 0.45 * THREE.MathUtils.clamp((y + 0.3) / 1.25, 0, 1);
      if (x > 0.7) scale *= 1 - THREE.MathUtils.clamp((x - 0.7) / 1.6, 0, 1) * 0.85;
      if (x < -1.6) scale *= 0.85;
      pos.setZ(i, pos.getZ(i) * scale);
    }
    geometry.computeVertexNormals();
    return geometry;
  }, []);
}

function useSailGeometry(width: number, height: number, billow: number) {
  return useMemo(() => {
    const geometry = new THREE.PlaneGeometry(width, height, 12, 8);
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i) / width + 0.5;
      const v = pos.getY(i) / height + 0.5;
      pos.setZ(i, Math.sin(u * Math.PI) * Math.sin(v * Math.PI * 0.9 + 0.2) * billow);
    }
    geometry.computeVertexNormals();
    return geometry;
  }, [width, height, billow]);
}

function useJollyRogerTexture() {
  return useMemo(
    () =>
      canvasTexture(256, 256, (g) => {
        g.fillStyle = "#f6f1e3";
        g.fillRect(0, 0, 256, 256);
        g.strokeStyle = "#141414";
        g.lineCap = "round";
        g.lineWidth = 18;
        g.beginPath();
        g.moveTo(62, 150);
        g.lineTo(194, 216);
        g.moveTo(194, 150);
        g.lineTo(62, 216);
        g.stroke();
        g.fillStyle = "#141414";
        g.beginPath();
        g.arc(128, 122, 50, 0, Math.PI * 2);
        g.fill();
        g.fillRect(102, 150, 52, 28);
        g.fillStyle = "#f6f1e3";
        g.beginPath();
        g.arc(108, 122, 12, 0, Math.PI * 2);
        g.arc(148, 122, 12, 0, Math.PI * 2);
        g.fill();
        g.fillRect(112, 158, 6, 14);
        g.fillRect(125, 158, 6, 14);
        g.fillRect(138, 158, 6, 14);
        // Straw hat
        g.fillStyle = STRAW;
        g.beginPath();
        g.ellipse(128, 84, 80, 13, 0, 0, Math.PI * 2);
        g.fill();
        g.beginPath();
        g.ellipse(128, 80, 46, 34, 0, Math.PI, 0);
        g.fill();
        g.fillStyle = RED;
        g.fillRect(83, 68, 90, 10);
      }),
    [],
  );
}

export function GoingMerry(props: React.JSX.IntrinsicElements["group"]) {
  const hull = useHullGeometry();
  const mainSail = useSailGeometry(2.1, 1.7, 0.35);
  const foreSail = useSailGeometry(1.5, 1.2, 0.28);
  const jollyRoger = useJollyRogerTexture();

  return (
    <group {...props}>
      {/* Hull */}
      <mesh geometry={hull} castShadow>
        <meshStandardMaterial color={CREAM} roughness={0.75} flatShading />
      </mesh>
      {/* Deck and rail */}
      <mesh position={[-0.15, 0.98, 0]}>
        <boxGeometry args={[3.7, 0.08, 1.15]} />
        <meshStandardMaterial color={WOOD} roughness={0.9} flatShading />
      </mesh>
      {/* Stern cabin */}
      <mesh position={[-1.55, 1.3, 0]}>
        <boxGeometry args={[0.9, 0.6, 1.1]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.9} flatShading />
      </mesh>
      {/* Masts */}
      <mesh position={[0.05, 2.5, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 3.1, 8]} />
        <meshStandardMaterial color={WOOD_DARK} flatShading />
      </mesh>
      <mesh position={[1.15, 2.0, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 2.1, 8]} />
        <meshStandardMaterial color={WOOD_DARK} flatShading />
      </mesh>
      {/* Spars */}
      <mesh position={[0.05, 3.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 2.2, 6]} />
        <meshStandardMaterial color={WOOD_DARK} />
      </mesh>
      <mesh position={[1.15, 2.85, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.6, 6]} />
        <meshStandardMaterial color={WOOD_DARK} />
      </mesh>
      {/* Sails (span the beam, billow toward the bow) */}
      <mesh geometry={mainSail} position={[0.12, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial map={jollyRoger} side={THREE.DoubleSide} roughness={1} />
      </mesh>
      <mesh geometry={foreSail} position={[1.2, 2.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#f6f1e3" side={THREE.DoubleSide} roughness={1} />
      </mesh>
      {/* Flag */}
      <mesh position={[0.35, 4.15, 0]}>
        <boxGeometry args={[0.55, 0.32, 0.01]} />
        <meshStandardMaterial color="#141414" />
      </mesh>
      {/* Sheep figurehead */}
      <group position={[2.2, 1.12, 0]}>
        <mesh>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial color={CREAM} flatShading />
        </mesh>
        <mesh position={[0.02, 0.05, 0.27]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.11, 0.045, 6, 12]} />
          <meshStandardMaterial color={WOOD} flatShading />
        </mesh>
        <mesh position={[0.02, 0.05, -0.27]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.11, 0.045, 6, 12]} />
          <meshStandardMaterial color={WOOD} flatShading />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Straw Hat ──────────────────────────────────────────────── */

export function StrawHat(props: React.JSX.IntrinsicElements["group"]) {
  return (
    <group {...props}>
      <mesh>
        <cylinderGeometry args={[1.35, 1.4, 0.06, 28]} />
        <meshStandardMaterial color={STRAW} roughness={0.85} flatShading />
      </mesh>
      <mesh position={[0, 0.03, 0]} scale={[1, 0.85, 1]}>
        <sphereGeometry args={[0.78, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={STRAW} roughness={0.85} flatShading />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.79, 0.79, 0.2, 28, 1, true]} />
        <meshStandardMaterial color={RED} roughness={0.7} side={THREE.DoubleSide} flatShading />
      </mesh>
    </group>
  );
}

/* ─── Ship Wheel ─────────────────────────────────────────────── */

export function ShipWheel(props: React.JSX.IntrinsicElements["group"]) {
  const spokes = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4);
  return (
    <group {...props}>
      <mesh>
        <torusGeometry args={[1, 0.09, 8, 32]} />
        <meshStandardMaterial color={WOOD} roughness={0.8} flatShading />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.2, 12]} />
        <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.35} />
      </mesh>
      {spokes.map((a) => (
        <group key={a} rotation={[0, 0, a]}>
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 1.0, 6]} />
            <meshStandardMaterial color={WOOD} flatShading />
          </mesh>
          <mesh position={[0, 1.3, 0]}>
            <cylinderGeometry args={[0.07, 0.05, 0.4, 6]} />
            <meshStandardMaterial color={WOOD_DARK} flatShading />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─── Berry Coin ─────────────────────────────────────────────── */

function useBerryTexture() {
  return useMemo(
    () =>
      canvasTexture(128, 128, (g) => {
        g.fillStyle = GOLD;
        g.fillRect(0, 0, 128, 128);
        g.strokeStyle = "#b07d14";
        g.lineWidth = 6;
        g.beginPath();
        g.arc(64, 64, 54, 0, Math.PI * 2);
        g.stroke();
        g.fillStyle = "#9a6a0c";
        g.font = "bold 72px Georgia, serif";
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("B", 64, 68);
        g.fillRect(52, 22, 6, 84);
        g.fillRect(68, 22, 6, 84);
      }),
    [],
  );
}

export function BerryCoin(props: React.JSX.IntrinsicElements["group"]) {
  const face = useBerryTexture();
  return (
    <group {...props}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.08, 28]} />
        <meshStandardMaterial attach="material-0" color={GOLD} metalness={0.9} roughness={0.3} />
        <meshStandardMaterial attach="material-1" map={face} metalness={0.7} roughness={0.35} />
        <meshStandardMaterial attach="material-2" map={face} metalness={0.7} roughness={0.35} />
      </mesh>
    </group>
  );
}

/* ─── Anchor ─────────────────────────────────────────────────── */

export function Anchor(props: React.JSX.IntrinsicElements["group"]) {
  const iron = <meshStandardMaterial color="#5b6573" metalness={0.7} roughness={0.45} flatShading />;
  return (
    <group {...props}>
      <mesh position={[0, 1.15, 0]}>
        <torusGeometry args={[0.2, 0.06, 6, 16]} />
        {iron}
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.9, 8]} />
        {iron}
      </mesh>
      <mesh position={[0, 0.75, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 1.0, 8]} />
        {iron}
      </mesh>
      <mesh position={[0, -0.25, 0]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.65, 0.08, 6, 20, Math.PI]} />
        {iron}
      </mesh>
      <mesh position={[0.65, -0.12, 0]} rotation={[0, 0, -0.5]}>
        <coneGeometry args={[0.16, 0.38, 4]} />
        {iron}
      </mesh>
      <mesh position={[-0.65, -0.12, 0]} rotation={[0, 0, 0.5]}>
        <coneGeometry args={[0.16, 0.38, 4]} />
        {iron}
      </mesh>
    </group>
  );
}

/* ─── Compass ────────────────────────────────────────────────── */

export function Compass(props: React.JSX.IntrinsicElements["group"]) {
  return (
    <group {...props}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.85, 0.22, 24]} />
        <meshStandardMaterial color="#b5872f" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.115]}>
        <circleGeometry args={[0.7, 24]} />
        <meshStandardMaterial color="#f3ead2" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.25, 0.13]}>
        <coneGeometry args={[0.09, 0.5, 4]} />
        <meshStandardMaterial color={RED} />
      </mesh>
      <mesh position={[0, -0.25, 0.13]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.09, 0.5, 4]} />
        <meshStandardMaterial color="#2c3440" />
      </mesh>
    </group>
  );
}

/* ─── Devil Fruit ────────────────────────────────────────────── */

let fruitGeometry: THREE.BufferGeometry | undefined;
function getFruitGeometry() {
  if (!fruitGeometry) {
    const geometry = new THREE.SphereGeometry(1, 48, 32);
    const pos = geometry.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const angle = Math.atan2(v.z, v.x);
      // Lobes around the body, dimple at the top
      const lobes = 1 + 0.07 * Math.sin(angle * 6) * Math.cos(v.y * 1.4);
      v.multiplyScalar(lobes);
      v.y *= 0.92;
      if (v.y > 0.75) v.y -= (v.y - 0.75) * 0.6;
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geometry.computeVertexNormals();
    fruitGeometry = geometry;
  }
  return fruitGeometry;
}

let stemGeometry: THREE.BufferGeometry | undefined;
let leafGeometry: THREE.BufferGeometry | undefined;
function getStemGeometries() {
  if (!stemGeometry || !leafGeometry) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.75, 0),
      new THREE.Vector3(0.02, 1.0, 0),
      new THREE.Vector3(0.18, 1.18, 0.04),
      new THREE.Vector3(0.36, 1.12, 0.08),
      new THREE.Vector3(0.34, 0.98, 0.04),
      new THREE.Vector3(0.22, 1.0, 0),
    ]);
    stemGeometry = new THREE.TubeGeometry(curve, 24, 0.045, 6, false);

    const leaf = new THREE.Shape();
    leaf.moveTo(0, 0);
    leaf.quadraticCurveTo(0.22, 0.14, 0.5, 0);
    leaf.quadraticCurveTo(0.22, -0.14, 0, 0);
    leafGeometry = new THREE.ExtrudeGeometry(leaf, { depth: 0.015, bevelEnabled: false });
  }
  return { stem: stemGeometry, leaf: leafGeometry };
}

const fruitTextures = new Map<string, THREE.Texture>();
function getFruitTexture(color: string) {
  let texture = fruitTextures.get(color);
  if (!texture) {
    const base = new THREE.Color(color);
    // Keep very dark or very light brand colors readable as a fruit
    const hsl = { h: 0, s: 0, l: 0 };
    base.getHSL(hsl);
    base.setHSL(hsl.h, hsl.s, THREE.MathUtils.clamp(hsl.l, 0.3, 0.78));
    const swirl = base.clone().multiplyScalar(0.55);

    texture = canvasTexture(512, 256, (g) => {
      g.fillStyle = base.getStyle();
      g.fillRect(0, 0, 512, 256);
      g.strokeStyle = swirl.getStyle();
      g.lineWidth = 7;
      g.lineCap = "round";
      // Signature devil-fruit spirals
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 6; col++) {
          const cx = col * 86 + (row % 2) * 43 + 20;
          const cy = 50 + row * 78;
          g.beginPath();
          for (let t = 0; t < Math.PI * 4; t += 0.15) {
            const r = 3 + t * 4.2;
            const x = cx + Math.cos(t) * r;
            const y = cy + Math.sin(t) * r * 0.8;
            if (t === 0) g.moveTo(x, y);
            else g.lineTo(x, y);
          }
          g.stroke();
        }
      }
    });
    fruitTextures.set(color, texture);
  }
  return texture;
}

export function DevilFruit({ color, ...props }: { color: string } & React.JSX.IntrinsicElements["group"]) {
  const body = getFruitGeometry();
  const { stem, leaf } = getStemGeometries();
  const map = getFruitTexture(color);

  return (
    <group {...props}>
      <mesh geometry={body} dispose={null}>
        <meshStandardMaterial map={map} roughness={0.45} metalness={0.05} />
      </mesh>
      <mesh geometry={stem} dispose={null}>
        <meshStandardMaterial color="#3b7f2e" roughness={0.7} />
      </mesh>
      <mesh geometry={leaf} position={[0.02, 0.92, 0]} rotation={[0.3, 0.4, 0.5]} dispose={null}>
        <meshStandardMaterial color="#4c9a36" roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
