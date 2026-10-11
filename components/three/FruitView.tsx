"use client";

import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, View } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { DevilFruit } from "./models";

function SpinningFruit({ color, hovered }: { color: string; hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  // Deterministic per-fruit offset so the cards don't bob in sync
  const phase = [...color].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 7;

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * (hovered ? 3 : 0.6);
    ref.current.position.y = Math.sin(clock.elapsedTime * 1.5 + phase) * 0.08;
    const scale = THREE.MathUtils.lerp(ref.current.scale.x, hovered ? 1.15 : 1, 0.15);
    ref.current.scale.setScalar(scale);
  });

  return (
    <group ref={ref}>
      <DevilFruit color={color} rotation={[0.15, 0, 0.1]} />
    </group>
  );
}

export default function FruitView({
  color,
  hovered,
  className,
}: {
  color: string;
  hovered: boolean;
  className?: string;
}) {
  return (
    <View className={className}>
      <PerspectiveCamera makeDefault position={[0, 0.15, 4]} fov={35} />
      <ambientLight intensity={1} />
      <directionalLight position={[2, 3, 4]} intensity={2.4} />
      <pointLight position={[-2.5, -1, 1.5]} intensity={8} color={color} />
      <SpinningFruit color={color} hovered={hovered} />
    </View>
  );
}
