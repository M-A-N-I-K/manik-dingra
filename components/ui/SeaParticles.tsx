"use client";

import { motion } from "framer-motion";

// One Piece: Bioluminescent sea particles — treasure coins, ocean sparks, and the glow of the Grand Line

// Seeded PRNG so server and client render identical particles (no hydration mismatch)
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(1337);

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  type: i % 3, // 0 = gold coin, 1 = ocean blue, 2 = Luffy red
  size: 4 + random() * 6,
  left: random() * 100,
  delay: random() * 14,
  duration: 12 + random() * 16,
  driftX: (random() - 0.5) * 180,
}));

const particleStyles = [
  // Warm gold / gold coin glow
  { className: "bg-[rgba(200,140,0,0.70)] dark:bg-[rgba(255,200,50,0.85)]", glow: "rgba(255,190,30,0.6)" },
  // Deep ocean blue / ocean bioluminescence
  { className: "bg-[rgba(20,100,180,0.60)] dark:bg-[rgba(50,160,230,0.75)]", glow: "rgba(50,150,220,0.5)" },
  // Luffy red / red ember
  { className: "bg-[rgba(190,40,30,0.55)] dark:bg-[rgba(230,70,60,0.70)]", glow: "rgba(220,60,50,0.5)" },
];

export function SeaParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${particleStyles[p.type].className}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: -20,
            boxShadow: `0 0 ${p.size * 2}px ${particleStyles[p.type].glow}`,
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
