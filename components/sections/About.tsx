"use client";

import { motion } from "framer-motion";
import { Code2, Database, Layout, Server } from "lucide-react";

export function About() {
  const cards = [
    {
      title: "Frontend Engineering",
      description: "Crafting flexible, living interfaces — like a Gomu Gomu stretch, they adapt and bounce back on any screen.",
      icon: Layout,
      label: "Gomu Gomu no UI",
    },
    {
      title: "Backend Architecture",
      description: "Building fortified server systems worthy of Marine HQ — robust APIs and microservices built to withstand any storm.",
      icon: Server,
      label: "Marine Fortress",
    },
    {
      title: "Database Management",
      description: "Navigating complex data seas, charting schemas like treasure maps in PostgreSQL, MongoDB, and DynamoDB.",
      icon: Database,
      label: "Treasure Navigation",
    },
    {
      title: "Continuous Integration",
      description: "Keeping the ship's engine running at full throttle — automated deployments and cloud infrastructure on AWS.",
      icon: Code2,
      label: "Engine Room",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle ocean depth background */}
      <div className="absolute inset-0 map-texture opacity-40 z-0" />

      <div className="container px-6 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">

          {/* Story Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm font-semibold text-primary mb-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              The Pirate&apos;s Log
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Charting my course to the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary italic">
                Grand Line
              </span>
              .
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                As a passionate Full Stack Developer, I bridge the gap between elegant UI/UX and rock-solid backend systems — like a navigator who reads both the Log Pose and the stars. Based in Delhi, India, I turn complex problems into intuitive, beautiful experiences.
              </p>
              <p>
                My voyage through the JavaScript/TypeScript seas has led me to build high-performance applications where every crew member — from frontend to database — pulls their weight toward the destination.
              </p>
            </div>

            {/* One Piece style compass separator */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-px bg-gradient-to-r from-primary to-transparent flex-1" />
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="w-4 h-4 rotate-45 border-2 border-primary" />
                <div className="absolute w-2 h-2 bg-primary rotate-45" />
              </div>
              <span className="text-primary/60 text-xs font-bold tracking-widest">⚓</span>
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="w-4 h-4 rotate-45 border-2 border-primary" />
                <div className="absolute w-2 h-2 bg-secondary rotate-45" />
              </div>
              <div className="h-px bg-gradient-to-l from-primary to-transparent flex-1" />
            </div>
          </motion.div>

          {/* Capability Cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="parchment-glass p-6 rounded-2xl hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary transition-all duration-300 group-hover:text-primary-foreground">
                    <card.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs text-primary/60 font-mono font-bold border border-primary/20 rounded-full px-2 py-0.5">
                    {card.label}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
