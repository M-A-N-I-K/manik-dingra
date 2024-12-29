"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import HeroSection from './hero-section';
import AboutSection from './about-section';
import ExperienceSection from './experience-section';
import ProjectsSection from './projects-section';

const MainContainer = () => {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const experienceRef = useRef(null);
    const aboutRef = useRef(null);
    const projectsRef = useRef(null);

    // Main scroll progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Hero section animations
    const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
    const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
    const heroY = useTransform(smoothProgress, [0, 0.2], [0, -50]);

    // Experience section animations
    const { scrollYProgress: expProgress } = useScroll({
        target: experienceRef,
        offset: ["start end", "end start"]
    });

    const experienceOpacity = useTransform(
        expProgress,
        [0, 0.1, 0.8, 1],
        [0, 1, 1, 0]
    );

    const experienceScale = useTransform(
        expProgress,
        [0, 0.1, 0.8, 1],
        [0.8, 1, 1, 0.8]
    );

    // About section animations
    const { scrollYProgress: aboutProgress } = useScroll({
        target: aboutRef,
        offset: ["start end", "end start"]
    });

    const aboutOpacity = useTransform(
        aboutProgress,
        [0, 0.1, 0.8, 1],
        [0, 1, 1, 0]
    );

    const aboutScale = useTransform(
        aboutProgress,
        [0, 0.1, 0.8, 1],
        [0.8, 1, 1, 0.8]
    );

    // Projects section animations
    const { scrollYProgress: projectsProgress } = useScroll({
        target: projectsRef,
        offset: ["start end", "end start"]
    });

    const projectsOpacity = useTransform(
        projectsProgress,
        [0, 0.1, 0.8, 1],
        [0, 1, 1, 0]
    );

    const projectsScale = useTransform(
        projectsProgress,
        [0, 0.1, 0.8, 1],
        [0.8, 1, 1, 0.8]
    );

    // Background gradient animation
    const gradientProgress = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        [
            "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 0%, rgba(0, 0, 0, 0) 70%)",
            "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 70%)",
            "radial-gradient(circle at 50% 50%, rgba(167, 139, 250, 0.1) 0%, rgba(0, 0, 0, 0) 70%)"
        ]
    );

    return (
        <motion.main
            ref={containerRef}
            className="relative bg-gray-900"
            style={{
                background: gradientProgress
            }}
        >
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 100%),
                                        radial-gradient(circle at 98% 50%, rgba(217, 70, 239, 0.1) 0%, transparent 100%)`,
                        scale: smoothProgress
                    }}
                />
            </div>

            {/* Hero Section */}
            <motion.section
                ref={heroRef}
                className="sticky top-0 h-screen"
                style={{
                    scale: heroScale,
                    opacity: heroOpacity,
                    y: heroY
                }}
            >
                <HeroSection />
            </motion.section>

            {/* Experience Section */}
            <motion.section
                ref={experienceRef}
                className="sticky top-0 z-10 min-h-screen"
                style={{
                    opacity: experienceOpacity,
                    scale: experienceScale
                }}
            >
                <ExperienceSection />
            </motion.section>

            {/* Projects Section */}
            <motion.section
                ref={projectsRef}
                className="relative z-20 min-h-screen"
                style={{
                    opacity: projectsOpacity,
                    scale: projectsScale
                }}
            >
                <ProjectsSection />
            </motion.section>

            {/* About Section */}
            <motion.section
                id="about"
                ref={aboutRef}
                className="relative z-20 min-h-screen"
                style={{
                    opacity: aboutOpacity,
                    scale: aboutScale
                }}
            >
                <AboutSection />
            </motion.section>


            {/* Scroll Progress Indicator */}
            <motion.div
                className="fixed bottom-4 right-4 w-12 h-12 rounded-full border-2 border-violet-500 flex items-center justify-center text-violet-400 text-sm font-medium"
                style={{
                    scale: useTransform(smoothProgress, [0, 0.1], [0, 1]),
                    opacity: useTransform(smoothProgress, [0, 0.1], [0, 1])
                }}
            >
                <motion.div
                    className="absolute inset-2"
                    style={{
                        background: "linear-gradient(to bottom, #7C3AED 50%, transparent 50%)",
                        rotate: useTransform(smoothProgress, [0, 1], [0, 360])
                    }}
                />
                <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
                    {Math.round(useTransform(smoothProgress, [0, 1], [0, 100]).get())}%
                </div>
            </motion.div>
        </motion.main>
    );
};

export default MainContainer;