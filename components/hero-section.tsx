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
                        color: ["#fff", "#7c3aed", "#fff"],
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
            <div className="w-6 h-10 border-2 border-violet-500 rounded-full relative">
                <motion.div
                    className="w-2 h-2 mx-auto bg-violet-500 rounded-full"
                    animate={{ y: [0, 16, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </div>
            <motion.p
                className="text-violet-400 text-sm mt-2 text-center"
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
            className="relative min-h-screen bg-gray-900 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Background elements remain the same */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(to right, #7c3aed10 1px, transparent 1px),
                            linear-gradient(to bottom, #7c3aed10 1px, transparent 1px)`,
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
                    className="absolute top-0 left-0 w-1 h-32 bg-gradient-to-b from-violet-500 to-transparent"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                />
                <motion.div
                    className="absolute top-0 left-0 h-1 w-32 bg-gradient-to-r from-violet-500 to-transparent"
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
                    <h1 className="text-5xl md:text-8xl font-bold text-white mb-4">
                        <GlitchText text="Manik Dingra" />
                    </h1>

                    <motion.div
                        className="text-xl md:text-4xl font-bold text-violet-400 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        <GlitchText text="Full Stack Developer" />
                    </motion.div>

                    {/* Location */}
                    <motion.div
                        className="flex items-center justify-center gap-2 text-gray-400 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8 }}
                    >
                        <MapPin className="w-4 h-4" />
                        <span>Jammu, India</span>
                    </motion.div>

                    {/* Description Card */}
                    <motion.div
                        className="relative max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg border border-violet-500/20"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 2 }}
                        whileHover={{
                            scale: 1.02,
                            boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
                        }}
                    >
                        <p className="text-gray-300 text-left">
                            Hey there! I&apos;m a web developer who loves turning ambitious ideas into reality. My focus? Creating blazing-fast, scalable applications using Next.js, AWS, and cutting-edge web technologies. I bring together clean frontend designs with robust backend architecture, always aiming to build solutions that make a real impact. Want to create something amazing together? Let&apos;s make it happen! 🚀
                        </p>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.a
                        className="mt-8 px-8 py-3 bg-violet-600 text-white rounded-full font-semibold 
                        hover:bg-violet-700 transition-colors relative overflow-hidden group"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#projects"
                    >
                        <span className="relative z-10">View My Projects</span>
                        <motion.div
                            className="absolute inset-0 bg-violet-500"
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