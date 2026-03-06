"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-background to-background z-0" />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block"
          >
            <span className="px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary mb-8 inline-block backdrop-blur-md">
              初めまして // Nice to meet you
            </span>
          </motion.div>

          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[1.1] mb-6">
              I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Manik Dingra</span>
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
            Crafting scalable and visually stunning web applications with modern technologies. 
            Passionate about turning ideas into reality through clean code and immersive design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <Link
              href="#projects"
              className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold overflow-hidden transition-all hover:scale-105 shadow-xl shadow-primary/20 w-full sm:w-auto flex justify-center items-center"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10 flex items-center gap-2">
                View My Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/resume.pdf"
              target="_blank"
              className="px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-md text-foreground rounded-full font-semibold transition-all hover:bg-white/10 w-full sm:w-auto flex justify-center items-center gap-2 hover:shadow-lg"
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
                className="p-3 rounded-full border border-white/5 bg-white/5 backdrop-blur-md hover:border-primary/50 hover:text-primary hover:shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-1"
              >
                <social.icon className="w-6 h-6" />
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
