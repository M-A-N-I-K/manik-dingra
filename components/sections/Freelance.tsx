"use client";

import { motion } from "framer-motion";

const contracts = [
  {
    title: "Blended Concept",
    role: "Full Stack Developer",
    description: "Professional training and e-learning marketplace for corrections, rehabilitation, and social work professionals in Singapore.",
    techStack: ["Next.js", "AWS ECS", "CloudFront", "Terraform", "GitHub Actions"],
    gradient: "from-primary/40 to-secondary/40",
    bounty: "680,000,000",
    highlights: [
      "Built a professional e-learning marketplace serving corrections, rehabilitation, and social work professionals across Singapore.",
      "Containerized and deployed the platform on AWS ECS, with CloudFront CDN ensuring fast content delivery across the region.",
      "Provisioned and managed cloud infrastructure as code using Terraform for repeatable, zero-drift deployments.",
      "Automated CI/CD pipelines via GitHub Actions, enabling rapid iteration with zero-downtime production releases.",
    ],
  },
  {
    title: "Zorcha Automation Platform",
    role: "Full Stack Developer",
    techStack: ["Go (Golang)", "React Router v7", "Flask", "PostgreSQL", "REST APIs"],
    gradient: "from-accent/40 to-primary/40",
    bounty: "750,000,000",
    highlights: [
      "Designed high-performance Golang REST APIs reducing response time by ~35–45%, supporting thousands of DB transactions per minute.",
      "Built a dynamic form system with React Router v7 and Flask, cutting manual data processing by ~60% through automated pipeline ingestion.",
      "Implemented an automation re-run trigger system, enabling users to replay failed workflows without developer intervention.",
      "Optimized PostgreSQL queries for high concurrency, ensuring database reliability under sustained automation load.",
    ],
  },
];

export function Freelance() {
  return (
    <section id="freelance" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 map-texture opacity-30 z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm font-semibold text-primary mb-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Mercenary Contracts
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center gap-6">
            Freelance Voyages
            <span className="h-px bg-primary/30 flex-1" />
            <span className="text-primary/40 text-2xl">⚡</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-3">
            Contracts taken on between arcs — solo missions across uncharted seas.
          </p>
        </motion.div>

        <div className="space-y-8">
          {contracts.map((contract, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="parchment-glass rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-colors shadow-lg hover:shadow-neon">

                {/* Gradient accent top bar */}
                <div className={`h-px bg-gradient-to-r ${contract.gradient}`} />

                <div className="p-8">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 shrink-0 text-lg">
                        ⚓
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-primary/50 tracking-widest mb-0.5">— CONTRACT —</div>
                        <h3 className="text-2xl font-extrabold tracking-tight group-hover:text-primary transition-colors">
                          {contract.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{contract.role}</p>
                        {"description" in contract && contract.description && (
                          <p className="text-xs text-muted-foreground/70 mt-1 max-w-sm leading-relaxed">{contract.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-muted-foreground/60 font-mono">BOUNTY</div>
                      <div className="text-sm font-black text-primary font-mono">{contract.bounty} Berry</div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-3 mb-6">
                    {contract.highlights.map((point, i) => (
                      <li key={i} className="flex gap-3 text-muted-foreground/90 text-sm leading-relaxed">
                        <span className="text-primary mt-0.5 shrink-0">⚡</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/10">
                    {contract.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-semibold border border-primary/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
