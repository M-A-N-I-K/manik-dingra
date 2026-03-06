"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function SakuraPetals() {
  const { resolvedTheme } = useTheme();
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    setPetals(Array.from({ length: 20 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      {petals.map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-3 rounded-tr-full rounded-bl-full shadow-neon"
          style={{
            background: resolvedTheme === "dark" ? "rgba(255,100,200,0.8)" : "rgba(255,180,220,0.8)",
            left: `${Math.random() * 100}%`,
            top: -20,
          }}
          animate={{
            y: ["0vh", "100vh"],
            x: [0, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
}
