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
  SiGit
} from "react-icons/si";

export function Skills() {
  const skills = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" }, // Need inverted logic for dark/light but fine as white with shadow
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "AWS", icon: SiAmazonwebservices, color: "#232F3E" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
    { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Git", icon: SiGit, color: "#F05032" }
  ];

  return (
    <section id="skills" className="py-24 relative">
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">Tech Arsenal</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">My primary tools for building modern web applications.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="group relative flex flex-col items-center justify-center p-8 bg-white/5 border border-white/5 rounded-2xl overflow-hidden cursor-none backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              {/* Subtle hover background */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: skill.color }}
              />
              
              <skill.icon 
                className="w-10 h-10 mb-4 drop-shadow-sm transition-transform group-hover:scale-110 duration-500"
                style={{ color: skill.color !== "#ffffff" ? skill.color : "currentColor" }}
              />
              <span className="font-medium text-foreground relative z-10">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
