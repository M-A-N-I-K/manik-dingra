"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiAmazonwebservices,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiTailwindcss,
  SiFirebase,
  SiDocker,
  SiGit,
  SiGo,
  SiFlask,
  SiReactrouter,
  SiJavascript,
  SiPython,
  SiAstro,
} from "react-icons/si";

export function Skills() {
  const skills = [
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", fruit: "Goro Goro" },
    { name: "Python", icon: SiPython, color: "#3776AB", fruit: "Doku Doku" },
    { name: "React", icon: SiReact, color: "#61DAFB", fruit: "Mera Mera" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", fruit: "Yomi Yomi" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933", fruit: "Moku Moku" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", fruit: "Ope Ope" },
    { name: "Go", icon: SiGo, color: "#00ADD8", fruit: "Soru Soru" },
    { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900", fruit: "Gura Gura" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", fruit: "Mori Mori" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", fruit: "Sui Sui" },
    { name: "Prisma", icon: SiPrisma, color: "#2D3748", fruit: "Bari Bari" },
    { name: "Flask", icon: SiFlask, color: "#ffffff", fruit: "Kilo Kilo" },
    { name: "React Router", icon: SiReactrouter, color: "#CA4245", fruit: "Noro Noro" },
    { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4", fruit: "Hana Hana" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28", fruit: "Pika Pika" },
    { name: "Docker", icon: SiDocker, color: "#2496ED", fruit: "Horo Horo" },
    { name: "Git", icon: SiGit, color: "#F05032", fruit: "Fuwa Fuwa" },
    { name: "Astro", icon: SiAstro, color: "#FF5D01", fruit: "Bara Bara" },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 map-texture opacity-30 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm font-semibold text-primary mb-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Awakened Powers
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Devil Fruit Arsenal
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Awakened abilities for building the modern digital world — each one a power consumed on the Grand Line.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="group relative flex flex-col items-center justify-center p-7 parchment-glass rounded-2xl overflow-hidden cursor-none transition-all hover:border-primary/40 hover:shadow-neon"
            >
              {/* Hover color wash */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-8 transition-opacity duration-500 rounded-2xl"
                style={{ backgroundColor: skill.color }}
              />

              <skill.icon
                className="w-10 h-10 mb-3 transition-all group-hover:scale-110 duration-300 group-hover:drop-shadow-lg"
                style={{ color: skill.color !== "#ffffff" ? skill.color : "currentColor" }}
              />
              <span className="font-bold text-foreground relative z-10 text-center text-sm">{skill.name}</span>
              <span className="text-[10px] text-primary/50 font-mono mt-1 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity text-center">
                {skill.fruit} no Mi
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mt-16"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent flex-1" />
          <span className="text-primary/40 text-sm font-bold tracking-widest">☠</span>
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent flex-1" />
        </motion.div>
      </div>
    </section>
  );
}
