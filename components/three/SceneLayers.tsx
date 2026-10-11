"use client";

import dynamic from "next/dynamic";
import { useCan3D } from "./Scene3DProvider";
import { SeaParticles } from "@/components/ui/SeaParticles";
import { OnePieceBackground } from "@/components/ui/OnePieceBackground";

// three.js is only downloaded when 3D is actually enabled
const BackgroundCanvas = dynamic(() => import("./lazy").then((m) => m.BackgroundCanvas), { ssr: false });
const FruitCanvas = dynamic(() => import("./lazy").then((m) => m.FruitCanvas), { ssr: false });

export function BackgroundLayer() {
  const can3D = useCan3D();
  if (can3D === null) return null;
  if (can3D) return <BackgroundCanvas />;
  return (
    <>
      <SeaParticles />
      <OnePieceBackground />
    </>
  );
}

export function ForegroundLayer() {
  return useCan3D() ? <FruitCanvas /> : null;
}
