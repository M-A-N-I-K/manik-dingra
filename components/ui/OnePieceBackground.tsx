"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useEffect } from "react";

/* ─── SVG Shapes ─────────────────────────────────────────────── */

function ShipWheel({ className }: { className?: string }) {
  const spokes = Array.from({ length: 8 }, (_, i) => (i * 45 * Math.PI) / 180);
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="3" />
      {spokes.map((a, i) => (
        <line
          key={i}
          x1={50 + 10 * Math.cos(a)}
          y1={50 + 10 * Math.sin(a)}
          x2={50 + 46 * Math.cos(a)}
          y2={50 + 46 * Math.sin(a)}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}
      {spokes.map((a, i) => (
        <circle
          key={`k${i}`}
          cx={50 + 40 * Math.cos(a)}
          cy={50 + 40 * Math.sin(a)}
          r="4.5"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

function StrawHat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 110" fill="none" className={className}>
      {/* Brim */}
      <ellipse
        cx="100"
        cy="82"
        rx="92"
        ry="22"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="3.5"
      />
      {/* Dome */}
      <path
        d="M38,82 Q38,18 100,18 Q162,18 162,82"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="3.5"
      />
      {/* Red band */}
      <path
        d="M44,80 Q100,70 156,80"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function JollyRoger({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 128" className={className}>
      {/* Skull head */}
      <ellipse cx="50" cy="42" rx="33" ry="35" fill="currentColor" />
      {/* Eyes */}
      <ellipse cx="37" cy="38" rx="8" ry="10" fill="hsl(var(--background))" />
      <ellipse cx="63" cy="38" rx="8" ry="10" fill="hsl(var(--background))" />
      {/* Nose */}
      <path d="M46,53 L50,60 L54,53 Z" fill="hsl(var(--background))" />
      {/* Teeth */}
      <rect
        x="35"
        y="62"
        width="6"
        height="8"
        rx="1"
        fill="hsl(var(--background))"
      />
      <rect
        x="44"
        y="62"
        width="6"
        height="8"
        rx="1"
        fill="hsl(var(--background))"
      />
      <rect
        x="53"
        y="62"
        width="6"
        height="8"
        rx="1"
        fill="hsl(var(--background))"
      />
      {/* Jaw */}
      <path
        d="M22,62 Q22,78 50,78 Q78,78 78,62"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      {/* Crossbones */}
      <line
        x1="5"
        y1="90"
        x2="95"
        y2="126"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <line
        x1="95"
        y1="90"
        x2="5"
        y2="126"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="5" cy="90" r="6" fill="currentColor" />
      <circle cx="95" cy="90" r="6" fill="currentColor" />
      <circle cx="5" cy="126" r="6" fill="currentColor" />
      <circle cx="95" cy="126" r="6" fill="currentColor" />
    </svg>
  );
}

function Compass({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" />
      <circle
        cx="50"
        cy="50"
        r="36"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
      <circle cx="50" cy="50" r="5" fill="currentColor" />
      {/* North needle — red (primary) */}
      <polygon points="50,12 53.5,50 50,50 46.5,50" fill="currentColor" />
      {/* South needle — muted */}
      <polygon
        points="50,88 53.5,50 50,50 46.5,50"
        fill="currentColor"
        opacity="0.35"
      />
      {/* East / West needles */}
      <polygon
        points="88,50 50,53.5 50,50 50,46.5"
        fill="currentColor"
        opacity="0.35"
      />
      <polygon
        points="12,50 50,53.5 50,50 50,46.5"
        fill="currentColor"
        opacity="0.55"
      />
      {/* Cardinal labels */}
      <text
        x="46"
        y="9"
        fill="currentColor"
        fontSize="7"
        fontWeight="bold"
        fontFamily="monospace"
      >
        N
      </text>
      <text
        x="46"
        y="98"
        fill="currentColor"
        fontSize="7"
        fontWeight="bold"
        fontFamily="monospace"
      >
        S
      </text>
      <text
        x="90"
        y="53"
        fill="currentColor"
        fontSize="7"
        fontWeight="bold"
        fontFamily="monospace"
      >
        E
      </text>
      <text
        x="5"
        y="53"
        fill="currentColor"
        fontSize="7"
        fontWeight="bold"
        fontFamily="monospace"
      >
        W
      </text>
    </svg>
  );
}

function GoingMerry({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 120" fill="none" className={className}>
      {/* Hull */}
      <path
        d="M10,80 Q40,110 140,110 Q240,110 270,80 L260,70 Q200,95 140,95 Q80,95 20,70 Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      {/* Main mast */}
      <line
        x1="140"
        y1="20"
        x2="140"
        y2="95"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Cross spar */}
      <line
        x1="90"
        y1="38"
        x2="190"
        y2="38"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Main sail */}
      <path
        d="M92,40 Q140,44 188,40 L180,80 Q140,85 100,80 Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Fore mast */}
      <line
        x1="70"
        y1="35"
        x2="70"
        y2="90"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="42"
        y1="50"
        x2="98"
        y2="50"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M44,52 Q70,56 96,52 L90,78 Q70,82 50,78 Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Sheep head figurehead */}
      <circle
        cx="20"
        cy="72"
        r="9"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Waves */}
      <path
        d="M0,108 Q30,100 60,108 Q90,116 120,108 Q150,100 180,108 Q210,116 240,108 Q260,102 280,108"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */

export function OnePieceBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 35, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 35, damping: 20 });

  // scrollYProgress goes 0→1 across the full page, so transforms
  // always run continuously regardless of total page height.
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 80);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 80);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  /* Scroll-based transforms — scaled to full page (0→1) */
  const wheelRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const wheel2Rotate = useTransform(scrollYProgress, [0, 1], [0, -540]);
  const compassRotate = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const anchorScrollY = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const hatScrollY = useTransform(scrollYProgress, [0, 1], [0, -420]);
  const merryScrollY = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const jollyScrollY = useTransform(scrollYProgress, [0, 1], [0, 380]);

  /* Mouse parallax layers */
  const farX = useTransform(springX, (v) => v * 0.07);
  const farY = useTransform(springY, (v) => v * 0.07);
  const midX = useTransform(springX, (v) => v * 0.18);
  const midY = useTransform(springY, (v) => v * 0.18);
  const nearX = useTransform(springX, (v) => v * 0.35);
  const nearY = useTransform(springY, (v) => v * 0.35);

  /* Combined Y (mouse + scroll) */
  const anchorY = useTransform(
    [nearY, anchorScrollY],
    ([a, b]) => (a as number) + (b as number),
  );
  const hatY = useTransform(
    [midY, hatScrollY],
    ([a, b]) => (a as number) + (b as number),
  );
  const merryY = useTransform(
    [farY, merryScrollY],
    ([a, b]) => (a as number) + (b as number),
  );
  const jollyY = useTransform(
    [nearY, jollyScrollY],
    ([a, b]) => (a as number) + (b as number),
  );

  return (
    /* z-[15] sits above sections (z-10) but below navbar/cursor (z-50).
       pointer-events-none ensures nothing is blocked. */
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[15]">
      {/* ── Ship Wheel — top-left, far, scroll-spins ── */}
      <motion.div
        className="absolute -top-20 -left-20 w-80 h-80 text-primary/[0.08] dark:text-primary/[0.11]"
        style={{ x: farX, y: farY, rotate: wheelRotate }}
      >
        <ShipWheel />
      </motion.div>

      {/* ── Straw Hat — left-center, mid, idle tilt ── */}
      <motion.div
        className="hidden sm:block absolute top-[58%] -left-16 w-72 text-primary/[0.09] dark:text-primary/[0.12]"
        style={{ x: midX, y: hatY }}
      >
        <motion.div
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <StrawHat />
        </motion.div>
      </motion.div>

      {/* ── Jolly Roger — right-upper, near, gentle sway ── */}
      <motion.div
        className="hidden sm:block absolute top-[12%] -right-8 w-36 text-primary/[0.09] dark:text-primary/[0.12]"
        style={{ x: nearX, y: jollyY }}
      >
        <motion.div
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <JollyRoger />
        </motion.div>
      </motion.div>

      {/* ── Compass — right-lower, mid, scroll-spins ── */}
      <motion.div
        className="absolute top-[58%] -right-14 w-52 h-52 text-primary/[0.08] dark:text-primary/[0.11]"
        style={{ x: midX, y: midY, rotate: compassRotate }}
      >
        <Compass />
      </motion.div>

      {/* ── Anchor — bottom-left, near + scroll parallax ── */}
      <motion.div
        className="hidden sm:block absolute bottom-[5%] -left-6 text-[210px] leading-none text-primary/[0.06] dark:text-primary/[0.09] select-none"
        style={{ x: nearX, y: anchorY }}
      >
        ⚓
      </motion.div>

      {/* ── Going Merry — bottom-center, far, slow drift ── */}
      <motion.div
        className="hidden sm:block absolute -bottom-8 left-1/2 -translate-x-1/2 w-[420px] text-primary/[0.07] dark:text-primary/[0.10]"
        style={{ x: farX, y: merryY }}
      >
        <motion.div
          animate={{ x: [-8, 8, -8] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <GoingMerry />
        </motion.div>
      </motion.div>

      {/* ── Second ship wheel — bottom-right, far, counter-spin ── */}
      <motion.div
        className="absolute -bottom-28 -right-28 w-[420px] h-[420px] text-secondary/[0.07] dark:text-secondary/[0.09]"
        style={{ x: farX, y: farY, rotate: wheel2Rotate }}
      >
        <ShipWheel />
      </motion.div>

      {/* ── Grand Line watermark — dead center, barely visible ── */}
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="text-[clamp(48px,8vw,110px)] font-black text-primary/[0.03] dark:text-primary/[0.045] whitespace-nowrap select-none tracking-[0.2em]"
          style={{ x: farX, y: farY }}
        >
          ☠ ONE PIECE ☠
        </motion.div>
      </div>
    </div>
  );
}
