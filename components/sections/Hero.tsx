"use client";

import { motion } from "framer-motion";
import { Anchor, Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Ocean depth background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-background to-background z-0" />

      {/* Horizon glow */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-accent/5 to-transparent z-0" />

      {/* Subtle map-dot texture */}
      <div className="absolute inset-0 map-texture z-0 opacity-60" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          {/* Badge — Setting Sail */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block"
          >
            <span className="px-5 py-2.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-semibold text-primary mb-8 inline-flex items-center gap-2 backdrop-blur-md shadow-neon">
              <Anchor className="w-4 h-4" />
              よし、行くぞ! // Let&apos;s Set Sail!
            </span>
          </motion.div>

          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[1.1] mb-6">
              I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary">
                Manik Dingra
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground font-medium tracking-tight">
              Full Stack Developer
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed"
          >
            Charting a course across the digital Grand Line — crafting scalable,
            visually immersive web applications through clean code and fearless design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <Link
              href="#projects"
              className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold overflow-hidden transition-all hover:scale-105 shadow-xl shadow-primary/30 w-full sm:w-auto flex justify-center items-center"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10 flex items-center gap-2">
                ☠ View My Bounty
              </span>
            </Link>
            <Link
              href="/resume.pdf"
              target="_blank"
              className="px-8 py-4 border border-primary/20 bg-primary/5 backdrop-blur-md text-foreground rounded-full font-semibold transition-all hover:bg-primary/10 hover:border-primary/40 w-full sm:w-auto flex justify-center items-center gap-2 hover:shadow-lg"
            >
              Resume <Download className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center justify-center gap-6 pt-12"
          >
            {[
              { icon: Github, href: "https://github.com/manik-dingra" },
              { icon: Linkedin, href: "https://linkedin.com/in/manik-dingra" },
              { icon: Mail, href: "mailto:manikdhingra0582@gmail.com" },
            ].map((social, i) => (
              <Link
                key={i}
                href={social.href}
                target="_blank"
                className="p-3 rounded-full border border-primary/10 bg-primary/5 backdrop-blur-md hover:border-primary/60 hover:text-primary hover:shadow-neon transition-all hover:-translate-y-1"
              >
                <social.icon className="w-6 h-6" />
              </Link>
            ))}
          </motion.div>

          {/* Grand Line divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="flex items-center justify-center gap-4 pt-4"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent w-48" />
            <span className="text-primary/50 text-xs font-bold tracking-widest uppercase">Grand Line</span>
            <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent w-48" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
