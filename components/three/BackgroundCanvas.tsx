"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Anchor, BerryCoin, Compass, GoingMerry, ShipWheel, StrawHat } from "./models";
import { Ocean, waveHeight } from "./Ocean";
import { usePalette } from "./theme";

const FOG_NEAR = 9;
const FOG_FAR = 40;
// World units the camera sinks per viewport of page scroll
const DEPTH_PER_SCREEN = 3.2;

const mouse = { x: 0, y: 0 };

function useWindowMouse() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
}

/* ─── Camera: hovers above the sea in the hero, dives as you scroll ── */

function CameraRig() {
  const lookAt = useRef(new THREE.Vector3());

  useFrame(({ camera }) => {
    const screens = window.scrollY / window.innerHeight;
    const targetY = 1.2 - screens * DEPTH_PER_SCREEN + mouse.y * 0.3;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.8, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.12);
    // Look slightly up in the hero so the horizon sits low, level out once diving
    lookAt.current.set(camera.position.x * 0.3, camera.position.y + 1.4 - Math.min(screens, 1) * 1.4, 0);
    camera.lookAt(lookAt.current);
  });

  return null;
}

/* ─── Hero: Going Merry riding the waves ─────────────────────── */

function Ship() {
  const ref = useRef<THREE.Group>(null);
  const base = useMemo(() => new THREE.Vector3(6.2, 0, -5), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const h = waveHeight(base.x, base.z, t);
    const dx = waveHeight(base.x + 0.5, base.z, t) - h;
    const dz = waveHeight(base.x, base.z + 0.5, t) - h;
    ref.current.position.set(base.x, h - 0.2, base.z);
    ref.current.rotation.set(dz * 0.8, -0.55, dx * 0.8);
  });

  return (
    <group ref={ref}>
      <GoingMerry scale={0.62} />
    </group>
  );
}

// drei's <Stars> uses additive blending, which vanishes on a transparent canvas
function StarField() {
  const positions = useMemo(() => {
    const random = seeded(99);
    const points = new Float32Array(700 * 3);
    for (let i = 0; i < 700; i++) {
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(0.05 + random() * 0.95); // upper hemisphere only
      const r = 70 + random() * 15;
      points[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      points[i * 3 + 1] = r * Math.cos(phi);
      points[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return points;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#dbe7ff" size={0.35} sizeAttenuation transparent opacity={0.85} fog={false} depthWrite={false} />
    </points>
  );
}

function Sky({ dark }: { dark: boolean }) {
  const stars = useRef<THREE.Group>(null);
  useFrame(({ camera }) => {
    if (stars.current) stars.current.visible = camera.position.y > 0;
  });

  return (
    <>
      {/* Sun (light) / moon (dark) sitting low on the horizon */}
      <group position={dark ? [-34, 13, -50] : [-36, 3, -50]}>
        <mesh>
          <sphereGeometry args={[dark ? 2 : 3, 32, 16]} />
          <meshBasicMaterial color={dark ? "#e8f0ff" : "#ffd27a"} fog={false} toneMapped={false} />
        </mesh>
        <mesh>
          <sphereGeometry args={[dark ? 3.4 : 5.5, 32, 16]} />
          <meshBasicMaterial
            color={dark ? "#9fc4ff" : "#ffb347"}
            transparent
            opacity={dark ? 0.07 : 0.14}
            fog={false}
            depthWrite={false}
          />
        </mesh>
      </group>
      {dark && (
        <group ref={stars}>
          <StarField />
        </group>
      )}
    </>
  );
}

/* ─── The depths: treasure drifting beside the content ───────── */

const TREASURE_TYPES = ["hat", "wheel", "coins", "anchor", "compass", "coins"] as const;

function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function Treasure({ type }: { type: (typeof TREASURE_TYPES)[number] }) {
  switch (type) {
    case "hat":
      return <StrawHat scale={0.9} rotation={[0.5, 0, 0.2]} />;
    case "wheel":
      return <ShipWheel scale={0.85} />;
    case "anchor":
      return <Anchor scale={0.9} />;
    case "compass":
      return <Compass scale={0.8} />;
    case "coins":
      return (
        <group>
          <BerryCoin position={[0, 0, 0]} />
          <BerryCoin position={[0.6, 0.5, -0.3]} rotation={[0.4, 0.8, 0]} scale={0.8} />
          <BerryCoin position={[-0.5, -0.6, 0.2]} rotation={[-0.3, -0.6, 0.2]} scale={0.7} />
        </group>
      );
  }
}

function TreasureField() {
  const items = useMemo(() => {
    const random = seeded(42);
    return Array.from({ length: 16 }, (_, i) => {
      const side = i % 2 === 0 ? -1 : 1;
      return {
        type: TREASURE_TYPES[i % TREASURE_TYPES.length],
        fraction: i / 15,
        // Keep treasure in the side gutters, away from the text column
        x: side * (9.2 + random() * 2.2),
        z: -3 - random() * 4,
        spin: (random() - 0.5) * 0.8,
        phase: random() * Math.PI * 2,
        tilt: (random() - 0.5) * 1.2,
      };
    });
  }, []);

  const refs = useRef<(THREE.Group | null)[]>([]);
  const lastScroll = useRef(0);
  const velocity = useRef(0);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const vh = window.innerHeight;
    const maxScreens = Math.max(document.documentElement.scrollHeight / vh - 1, 1);
    const depth = maxScreens * DEPTH_PER_SCREEN;

    // Scroll speed adds a little extra spin, decaying smoothly
    velocity.current = THREE.MathUtils.lerp(velocity.current, window.scrollY - lastScroll.current, 0.1);
    lastScroll.current = window.scrollY;

    items.forEach((item, i) => {
      const group = refs.current[i];
      if (!group) return;
      group.position.set(
        item.x,
        -2.5 - item.fraction * (depth - 1) + Math.sin(t * 0.6 + item.phase) * 0.3,
        item.z,
      );
      group.rotation.x = item.tilt + Math.sin(t * 0.4 + item.phase) * 0.2;
      group.rotation.y += delta * (item.spin + velocity.current * 0.01);
    });
  });

  return (
    <>
      {items.map((item, i) => (
        <group key={i} ref={(el) => void (refs.current[i] = el)} scale={0.75}>
          <Treasure type={item.type} />
        </group>
      ))}
    </>
  );
}

function Bubbles({ color }: { color: string }) {
  const count = 40;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { camera } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const bubbles = useMemo(() => {
    const random = seeded(7);
    return Array.from({ length: count }, () => ({
      // Two bands at the edges of the screen
      x: (random() < 0.5 ? -1 : 1) * (7 + random() * 5),
      z: -1 - random() * 10,
      offset: random() * 14,
      speed: 0.4 + random() * 0.8,
      size: 0.03 + random() * 0.05,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const underwater = camera.position.y < -0.5;
    mesh.current.visible = underwater;
    if (!underwater) return;
    const t = clock.elapsedTime;
    bubbles.forEach((b, i) => {
      // Rise through a 14-unit window that follows the camera
      const y = camera.position.y - 7 + ((b.offset + t * b.speed) % 14);
      dummy.position.set(b.x + Math.sin(t + b.offset) * 0.15, Math.min(y, -0.3), b.z);
      dummy.scale.setScalar(b.size);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 6]} />
      <meshStandardMaterial color={color} transparent opacity={0.25} roughness={0.1} />
    </instancedMesh>
  );
}

/* ─── Scene ──────────────────────────────────────────────────── */

function SceneContents() {
  const palette = usePalette();
  const dark = palette.background === "#070e18";
  useWindowMouse();

  return (
    <>
      <fog attach="fog" args={[palette.background, FOG_NEAR, FOG_FAR]} />
      <hemisphereLight args={[palette.skyLight, palette.groundLight, palette.ambient]} />
      <directionalLight position={[-6, 8, 4]} color={palette.sun} intensity={palette.sunIntensity} />
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={2} position={[0, 5, -6]} scale={[12, 4, 1]} color="#ffffff" />
        <Lightformer intensity={1.2} position={[-6, 1, 3]} scale={[4, 6, 1]} color={palette.sun} />
        <Lightformer intensity={0.8} position={[6, -2, 2]} scale={[4, 4, 1]} color={palette.waterShallow} />
      </Environment>

      <CameraRig />
      <Sky dark={dark} />
      <Ocean palette={palette} fogNear={FOG_NEAR} fogFar={FOG_FAR} />
      <Ship />
      <TreasureField />
      <Bubbles color={palette.foam} />
    </>
  );
}

export default function BackgroundCanvas() {
  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      aria-hidden
    >
      <Canvas
        flat
        dpr={[1, 1.5]}
        camera={{ fov: 45, position: [0, 1.2, 10], near: 0.1, far: 120 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <SceneContents />
      </Canvas>
    </motion.div>
  );
}
