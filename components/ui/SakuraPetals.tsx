"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// One Piece: Bioluminescent sea particles — treasure coins, ocean sparks, and the glow of the Grand Line
export function SakuraPetals() {
  const { resolvedTheme } = useTheme();
  const [particles, setParticles] = useState<{ id: number; type: number; size: number; left: number; delay: number; duration: number; driftX: number }[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        type: i % 3, // 0 = gold coin, 1 = ocean blue, 2 = Luffy red
        size: 4 + Math.random() * 6,
        left: Math.random() * 100,
        delay: Math.random() * 14,
        duration: 12 + Math.random() * 16,
        driftX: (Math.random() - 0.5) * 180,
      }))
    );
  }, []);

  const getColor = (type: number) => {
    if (resolvedTheme === "dark") {
      if (type === 0) return "rgba(255, 200, 50, 0.85)";   // Gold coin glow
      if (type === 1) return "rgba(50, 160, 230, 0.75)";   // Ocean bioluminescence
      return "rgba(230, 70, 60, 0.70)";                    // Red ember
    } else {
      if (type === 0) return "rgba(200, 140, 0, 0.70)";    // Warm gold
      if (type === 1) return "rgba(20, 100, 180, 0.60)";   // Deep ocean blue
      return "rgba(190, 40, 30, 0.55)";                    // Luffy red
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: getColor(p.type),
            left: `${p.left}%`,
            top: -20,
            boxShadow: p.type === 0
              ? `0 0 ${p.size * 2}px rgba(255,190,30,0.6)`
              : p.type === 1
              ? `0 0 ${p.size * 2}px rgba(50,150,220,0.5)`
              : `0 0 ${p.size * 2}px rgba(220,60,50,0.5)`,
          }}
          animate={{
            y: ["0vh", "100vh"],
            x: [0, p.driftX * 0.5, p.driftX, p.driftX * 0.6],
            opacity: [0, 0.9, 0.9, 0],
            scale: [0.6, 1, 0.8, 0.4],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
            times: [0, 0.2, 0.8, 1],
          }}
        />
      ))}
    </div>
  );
}
