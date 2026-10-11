"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: React.ReactNode;
  /** Classes for the card surface (background, border, radius) */
  surfaceClassName?: string;
  /** Classes for the content layer (padding, layout) */
  className?: string;
  /** Classes for the outer wrapper */
  wrapperClassName?: string;
  /** Maximum tilt in degrees */
  maxTilt?: number;
  glare?: boolean;
};

/**
 * 3D tilt card. The surface sits on its own layer because backdrop-filter
 * and overflow:hidden flatten preserve-3d, so children can pop out with
 * the `depth-*` utilities (translateZ) defined in globals.css.
 */
export function TiltCard({
  children,
  surfaceClassName,
  className,
  wrapperClassName,
  maxTilt = 10,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const rotateX = useSpring(0, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 18 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 25 });
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22), transparent 55%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    const px = (e.clientX - box.left) / box.width;
    const py = (e.clientY - box.top) / box.height;
    rotateX.set((0.5 - py) * maxTilt * 2);
    rotateY.set((px - 0.5) * maxTilt * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  };

  return (
    <div className={cn("[perspective:1200px]", wrapperClassName)}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full rounded-2xl"
      >
        <div className={cn("absolute inset-0 rounded-[inherit]", surfaceClassName)} />
        <div className={cn("relative h-full [transform-style:preserve-3d]", className)}>
          {children}
        </div>
        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
            style={{ background: glareBackground, opacity: glareOpacity }}
          />
        )}
      </motion.div>
    </div>
  );
}
