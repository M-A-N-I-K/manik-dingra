"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Projects() {
  const projects = [
    {
      title: "Six Flags Parks",
      description: "High-traffic Next.js platform powered by Sanity CMS, serving content for every Six Flags theme park nationwide. Shipped new visitor-facing features on a two-week cadence while maintaining zero-downtime deployments. Designed backend services and caching strategies that keep page loads fast during peak summer traffic.",
      techStack: ["Next.js", "Sanity CMS", "AWS", "Cognito", "Node.js", "Terraform", "GitHub Actions"],
      live: null,
      org: "Tuna Software Solutions",
      gradient: "from-primary/50 to-amber-400/50",
      bounty: "980,000,000",
    },
    {
      title: "Jobiffy",
      description: "A comprehensive referral platform connecting job seekers with referrers — like a Vivre Card guiding nakama to each other. Streamlines the job search with robust database architecture and type-safe APIs.",
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS"],
      live: "https://jobiffy.co",
      gradient: "from-amber-500/50 to-yellow-400/50",
      bounty: "450,000,000",
    },
    {
      title: "LCF Invoices",
      description: "Migrated 1 million invoice documents from an external provider to AWS infrastructure and moved all associated metadata to an in-house MSSQL server. Built a full Next.js dashboard with shadcn/ui to visualize, analyze, and search across the entire invoice corpus.",
      techStack: ["Next.js", "shadcn/ui", "AWS", "MSSQL", "TypeScript"],
      live: null,
      org: "Tuna Software Solutions",
      gradient: "from-accent/50 to-primary/50",
      bounty: "850,000,000",
    },
    {
      title: "Callsure AI",
      description: "Full-stack application built with the strength of the Thousand Sunny — clean architecture, CI/CD pipeline for automated AWS deployment, and a scalable database schema for peak performance.",
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "AWS"],
      live: "https://callsure.ai",
      gradient: "from-secondary/50 to-primary/50",
      bounty: "620,000,000",
    },
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 map-texture opacity-30 z-0" />

      <div className="container px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm font-semibold text-primary mb-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Treasure Vault
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center gap-6">
            My Treasures
            <span className="h-px bg-primary/30 flex-1" />
            <span className="text-primary/40 text-2xl">☠</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
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
        className="h-full rounded-2xl p-[1px] bg-gradient-to-br transition-all duration-300 shadow-2xl hover:shadow-neon"
        animate={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Glow bloom */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-700 rounded-2xl blur-2xl -z-10`} />

        <div className="h-full border border-primary/10 rounded-2xl p-8 flex flex-col relative z-0 overflow-hidden bg-background/70 backdrop-blur-2xl group-hover:bg-background/85 transition-colors parchment-glass">

          {/* Wanted Poster Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs font-black tracking-[0.25em] text-primary/50 uppercase border-b border-primary/20 pb-1">
                — Wanted —
              </div>
              {project.org && (
                <div className="text-[10px] text-muted-foreground/60 font-mono mt-1.5">@ {project.org}</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-[10px] text-muted-foreground/60 font-mono">BOUNTY</div>
              <div className="text-sm font-black text-primary font-mono">{project.bounty} Berry</div>
            </div>
          </div>

          <div className="flex-1 space-y-5 flex flex-col justify-center">
            <h3 className="text-3xl font-extrabold tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>

            <p className="text-muted-foreground leading-relaxed text-lg">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.techStack.map((tech: string) => (
                <span key={tech} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-semibold border border-primary/20">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-6 mt-8 pt-6 border-t border-primary/10">
            {project.live ? (
              <Link href={project.live} className="flex items-center gap-2 hover:text-primary transition-colors font-bold group/link">
                <ExternalLink className="w-5 h-5 group-hover/link:rotate-12 transition-transform" />
                Claim the Treasure
              </Link>
            ) : (
              <span className="flex items-center gap-2 text-muted-foreground/50 text-sm font-semibold italic">
                🔒 Classified — Private Seas
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
