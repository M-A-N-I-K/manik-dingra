"use client";

import { motion } from "framer-motion";
import { Code2, Database, Layout, Server } from "lucide-react";

export function About() {
  const cards = [
    {
      title: "Frontend Engineering",
      description: "Building responsive, accessible, and stunning UIs using React, Next.js, and Framer Motion.",
      icon: Layout,
    },
    {
      title: "Backend Architecture",
      description: "Designing robust APIs and microservices with Node.js, Express, and Serverless technologies.",
      icon: Server,
    },
    {
      title: "Database Management",
      description: "Architecting efficient schemas and complex queries in PostgreSQL, MongoDB, and DynamoDB.",
      icon: Database,
    },
    {
      title: "Continuous Integration",
      description: "Automating deployments and managing cloud infrastructure efficiently with AWS.",
      icon: Code2,
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container px-6 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          {/* Avatar/Story Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm font-medium text-secondary mb-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              About Me
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Translating ideas into <span className="text-primary italic">reality</span>.
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                As a passionate Full Stack Developer, I specialize in bridging the gap between elegant UI/UX and robust backend systems. Based in Delhi, India, I enjoy solving complex problems and turning them into simple, beautiful, and intuitive interfaces.
              </p>
              <p>
                My journey in tech has led me to work extensively with JavaScript/TypeScript ecosystems, creating applications that are not only performant but also provide seamless user experiences.
              </p>
            </div>
            
            {/* Anime style separator */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-px bg-gradient-to-r from-primary to-transparent flex-1" />
              <div className="w-2 h-2 rotate-45 bg-primary" />
              <div className="w-2 h-2 rotate-45 border border-primary" />
              <div className="h-px bg-gradient-to-l from-primary to-transparent flex-1" />
            </div>
          </motion.div>

          {/* Cards Side */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass p-6 rounded-2xl border-white/5 dark:border-white/5 hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary transition-all duration-300 group-hover:text-background">
                  <card.icon className="w-6 h-6" />
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
