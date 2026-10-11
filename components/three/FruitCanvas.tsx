"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

// Transparent overlay that only draws inside each <FruitView> slot (scissored),
// so devil fruits can render on top of the frosted skill cards.
export default function FruitCanvas() {
  return (
    <Canvas
      flat
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "fixed", inset: 0, zIndex: 20, pointerEvents: "none" }}
      aria-hidden
    >
      <View.Port />
    </Canvas>
  );
}
