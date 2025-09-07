"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useAnimationControls, useScroll, useTransform } from 'motion/react';
import { MapPin } from 'lucide-react';

const GlitchText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
    const controls = useAnimationControls();
    const letters = Array.from(text);

    useEffect(() => {
        controls.start(i => ({
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                delay: delay + i * 0.1,
                duration: 0.3,
                type: "spring",
                stiffness: 100
            }
        }));
    }, [controls, delay]);

    return (
        <div className="relative inline-block">
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, x: -20 }}
                    custom={i}
                    animate={controls}
                    className="inline-block relative"
                    whileHover={{
                        color: ["var(--foreground)", "var(--primary)", "var(--foreground)"],
                        transition: { duration: 0.2 }
                    }}
                >
                    {letter === " " ? "\u00A0" : letter as string}
                </motion.span>
            ))}
        </div>
    );
};

const ScrollIndicator = () => {
    return (
        <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
        >
            <div
                className="w-6 h-10 border-2 rounded-full relative"
                style={{ borderColor: 'var(--primary)' }}
            >
                <motion.div
                    className="w-2 h-2 mx-auto rounded-full"
                    style={{ backgroundColor: 'var(--primary)' }}
                    animate={{ y: [0, 16, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </div>
            <motion.p
                className="text-sm mt-2 text-center"
                style={{ color: 'var(--primary)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                Scroll
            </motion.p>
        </motion.div>
    );
};

const HeroSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <motion.div
            ref={containerRef}
            className="relative min-h-screen overflow-hidden"
            style={{ backgroundColor: 'var(--background)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Background elements remain the same */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(to right, var(--primary)/10 1px, transparent 1px),
                            linear-gradient(to bottom, var(--primary)/10 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}>
                </div>
            </div>

            {/* Particles section remains the same */}

            {/* Main Content */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
                style={{ opacity }}
            >
                {/* Decorative lines remain the same */}
                <motion.div
                    className="absolute top-0 left-0 w-1 h-32 bg-gradient-to-b to-transparent"
                    style={{ background: `linear-gradient(to bottom, var(--primary), transparent)` }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                />
                <motion.div
                    className="absolute top-0 left-0 h-1 w-32 bg-gradient-to-r to-transparent"
                    style={{ background: `linear-gradient(to right, var(--primary), transparent)` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                />

                {/* Main Title */}
                <motion.div
                    className="text-center"
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                >
                    <h1 className="text-5xl md:text-8xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                        <GlitchText text="Manik Dingra" />
                    </h1>

                    <motion.div
                        className="text-xl md:text-4xl font-bold mb-4"
                        style={{ color: 'var(--primary)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        <GlitchText text="Full Stack Developer" />
                    </motion.div>

                    {/* Location */}
                    <motion.div
                        className="flex items-center justify-center gap-2 mb-8"
                        style={{ color: 'var(--muted-foreground)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8 }}
                    >
                        <MapPin className="w-4 h-4" />
                        <span>Jammu, India</span>
                    </motion.div>

                    {/* Description Card */}
                    <motion.div
                        className="relative max-w-2xl mx-auto backdrop-blur-lg p-6 rounded-lg border"
                        style={{
                            backgroundColor: 'var(--card)/80',
                            borderColor: 'var(--primary)/20'
                        }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 2 }}
                        whileHover={{
                            scale: 1.02,
                            boxShadow: `0 0 20px var(--primary)/30`
                        }}
                    >
                        <p className="text-left" style={{ color: 'var(--card-foreground)' }}>
                            Hey there! I&apos;m a web developer who loves turning ambitious ideas into reality. My focus? Creating blazing-fast, scalable applications using Next.js, AWS, and cutting-edge web technologies. I bring together clean frontend designs with robust backend architecture, always aiming to build solutions that make a real impact. Want to create something amazing together? Let&apos;s make it happen! 🚀
                        </p>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.a
                        className="mt-8 px-8 py-3 rounded-full font-semibold transition-colors relative overflow-hidden group"
                        style={{
                            backgroundColor: 'var(--primary)',
                            color: 'var(--primary-foreground)'
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#projects"
                    >
                        <span className="relative z-10">View My Projects</span>
                        <motion.div
                            className="absolute inset-0"
                            style={{ backgroundColor: 'var(--ring)' }}
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <ScrollIndicator />
        </motion.div>
    );
};

export default HeroSection;