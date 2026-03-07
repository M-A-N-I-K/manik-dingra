"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Link from "next/link";
import { Mail, FileText, Sun, Moon, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useTheme } from "next-themes";

export const socialLinks = [
  { icon: FaGithub, href: "https://github.com/M-A-N-I-K", label: "GitHub" },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/manik-dingra/",
    label: "LinkedIn",
  },
  {
    icon: FaTwitter,
    href: "https://twitter.com/manik_dingra",
    label: "Twitter",
  },
  { icon: Mail, href: "mailto:manikdhingra0582@gmail.com", label: "Email" },
  {
    icon: FileText,
    href: "https://drive.google.com/file/d/1V4i4lY4rZcS7jx9iRNzMANyytJQFwoWE/view?usp=sharing",
    label: "Resume",
  },
];

const navItems = [
  { name: "Home", href: "#home", icon: "⚓", section: "home" },
  { name: "About", href: "#about", icon: "📜", section: "about" },
  { name: "Projects", href: "#projects", icon: "💀", section: "projects" },
  { name: "Freelance", href: "#freelance", icon: "⚡", section: "freelance" },
  { name: "Contact", href: "#contact", icon: "🐌", section: "contact" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  // Active section detection
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ── NAVBAR ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2 backdrop-blur-xl border-b border-primary/20 bg-background/80 shadow-[0_4px_30px_rgba(0,0,0,0.15)]"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* ── Logo ── */}
          <Link
            href="#home"
            className="group flex items-center gap-2.5 shrink-0"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-lg group-hover:bg-primary/20 transition-colors"
            >
              ☠
            </motion.div>
            <div className="leading-none">
              <span className="font-black text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
                MANIK
              </span>
              <div className="text-[9px] font-mono text-primary/50 tracking-[0.2em] uppercase">
                Full Stack Dev
              </div>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1 bg-background/50 backdrop-blur-sm border border-primary/10 rounded-full px-2 py-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.section;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-1.5 rounded-full text-sm font-semibold transition-colors group"
                  style={{
                    color: isActive
                      ? "hsl(var(--primary-foreground))"
                      : "hsl(var(--muted-foreground))",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className="text-xs">{item.icon}</span>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Right: socials + theme ── */}
          <div className="hidden md:flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
            <div className="w-px h-4 bg-primary/20 mx-1" />
            <ThemeBtn theme={theme} setTheme={setTheme} />
          </div>

          {/* ── Mobile Right: theme + hamburger ── */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeBtn theme={theme} setTheme={setTheme} />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
              aria-label="Open menu"
            >
              <span className="text-base leading-none">☰</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE FULL-SCREEN MENU ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[min(320px,90vw)] bg-background border-l border-primary/20 flex flex-col overflow-hidden"
            >
              {/* Gold top bar */}
              <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-primary/10">
                <div>
                  <div className="text-[10px] font-mono text-primary/50 tracking-[0.25em] uppercase mb-0.5">
                    — Crew Manifest —
                  </div>
                  <div className="font-black text-lg text-foreground flex items-center gap-2">
                    ☠ Navigate
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Nav Items */}
              <nav className="flex-1 px-4 py-4 overflow-y-auto">
                <ul className="space-y-1">
                  {navItems.map((item, i) => {
                    const isActive = activeSection === item.section;
                    return (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.07,
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-semibold ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                          }`}
                        >
                          <span className="text-xl w-7 text-center">
                            {item.icon}
                          </span>
                          <span className="flex-1">{item.name}</span>
                          {isActive && (
                            <span className="text-xs font-mono opacity-70">
                              — active
                            </span>
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-primary/15" />
                  <span className="text-primary/30 text-xs font-mono">☠</span>
                  <div className="flex-1 h-px bg-primary/15" />
                </div>

                {/* Social links */}
                <div className="grid grid-cols-5 gap-2">
                  {socialLinks.map(({ icon: Icon, href, label }, i) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + i * 0.06 }}
                      whileTap={{ scale: 0.85 }}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/15 hover:border-primary/25 transition-all text-muted-foreground hover:text-primary"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[9px] font-mono">{label}</span>
                    </motion.a>
                  ))}
                </div>
              </nav>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-primary/10">
                <p className="text-[10px] font-mono text-primary/30 text-center tracking-widest">
                  ⚓ SAILING THE GRAND LINE
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

function ThemeBtn({
  theme,
  setTheme,
}: {
  theme: string | undefined;
  setTheme: (t: string) => void;
}) {
  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </motion.button>
  );
}

export default NavBar;
