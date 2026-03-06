"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Projects() {
  const projects = [
    {
      title: "Jobiffy",
      description: "A comprehensive referral platform connecting job seekers with referrers, streamlining the job search process with robust database architecture and type-safe APIs.",
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS"],
      live: "https://jobiffy.co",
      gradient: "from-blue-600/50 to-cyan-400/50",
    },
    {
      title: "Callsure AI",
      description: "Full-stack application with clean architecture, CI/CD pipeline for automated AWS deployment, and a scalable database schema for optimal query performance.",
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "AWS"],
      live: "https://callsure.ai",
      gradient: "from-purple-600/50 to-pink-400/50",
    },
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center gap-6">
            Featured Projects
            <span className="h-px bg-primary/30 flex-1" />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;

    setRotateX((y - box.height / 2) / 10);
    setRotateY(-(x - box.width / 2) / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative h-full perspective-1000"
    >
      <motion.div
        className="h-full rounded-2xl p-[1px] bg-gradient-to-br transition-all duration-300 shadow-2xl hover:shadow-primary/20"
        animate={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-700 rounded-2xl blur-2xl -z-10`} />

        <div className="h-full border border-white/5 rounded-2xl p-8 flex flex-col relative z-0 overflow-hidden bg-background/60 backdrop-blur-2xl group-hover:bg-background/80 transition-colors">
          <div className="flex-1 space-y-6 flex flex-col justify-center">
            <h3 className="text-3xl font-extrabold tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>

            <p className="text-muted-foreground leading-relaxed text-lg">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-4">
              {project.techStack.map((tech: string) => (
                <span key={tech} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-6 mt-8 pt-6 border-t border-white/10">
            <Link href={project.live} className="flex items-center gap-2 hover:text-primary transition-colors font-medium">
              <ExternalLink className="w-5 h-5" /> Live Demo
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
