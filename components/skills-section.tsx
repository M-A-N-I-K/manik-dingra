"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Skill {
    name: string;
    category: string;
    icon: string;
}

const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const skills: Skill[] = [
        // Languages
        { name: 'TypeScript', category: 'Languages', icon: '📘' },
        { name: 'JavaScript', category: 'Languages', icon: '💛' },

        // Frontend
        { name: 'React', category: 'Frontend', icon: '⚛️' },
        { name: 'Next.js', category: 'Frontend', icon: '▲' },
        { name: 'Tailwind', category: 'Frontend', icon: '🎨' },
        { name: 'Framer Motion', category: 'Frontend', icon: '✨' },

        // Backend
        { name: 'Node.js', category: 'Backend', icon: '🟢' },
        { name: "Express.js", category: "Backend", icon: "🐘" },
        { name: 'MongoDB', category: 'Backend', icon: '🍃' },
        { name: 'Redis', category: 'Backend', icon: '⚡️' },
        { name: 'PostgreSQL', category: 'Backend', icon: '🐘' },

        // Others
        { name: 'Docker', category: 'Others', icon: '🐳' },
        { name: 'Git', category: 'Others', icon: '📦' },
        { name: 'AWS', category: 'Others', icon: '☁️' },
        { name: "CI/CD", category: "Others", icon: "🔄" },
        { name: "Sanity", category: "Others", icon: "🍃" },
    ];

    const categories = Array.from(new Set(skills.map(skill => skill.category)));

    const filteredSkills = activeCategory
        ? skills.filter(skill => skill.category === activeCategory)
        : skills;

    const headingVariants = {
        hidden: {
            opacity: 0,
            y: -20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const letterVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.1
            }
        })
    };

    // Skill card animation variants
    const skillCardVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.8
        },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1]
            }
        }),
        exit: {
            opacity: 0,
            scale: 0.8,
            y: -20,
            transition: {
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <section className="py-24 min-h-screen bg-gray-900">
            <div className="max-w-6xl mx-auto px-4">
                {/* Enhanced Section Title */}
                <motion.div
                    className="text-center mb-16"
                    variants={headingVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="relative inline-block">
                        <motion.h2
                            className="text-2xl md:text-5xl font-bold"
                        >
                            {"Skills & Technologies".split("").map((letter, i) => (
                                <motion.span
                                    key={i}
                                    variants={letterVariants}
                                    custom={i}
                                    className="inline-block"
                                    style={{
                                        background: `linear-gradient(to right, rgb(167, 139, 250) ${i * 5}%, rgb(139, 92, 246) ${i * 10}%)`,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent"
                                    }}
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}
                        </motion.h2>
                        <motion.div
                            className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-xl rounded-full"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        />
                    </div>
                    <motion.div
                        className="h-1 w-24 mx-auto mt-6 rounded-full bg-gradient-to-r from-violet-500/50 to-purple-500/50"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    />
                </motion.div>
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <motion.button
                        onClick={() => setActiveCategory(null)}
                        className={`px-5 py-2 rounded-full text-sm transition-all ${activeCategory === null
                            ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                            : 'text-gray-400 hover:text-violet-300'
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        All
                    </motion.button>
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-5 py-2 rounded-full text-sm transition-all ${activeCategory === category
                                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                                : 'text-gray-400 hover:text-violet-300'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                variants={skillCardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                custom={index}
                                layout
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-violet-500/10 rounded-xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
                                <motion.div
                                    className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 transition-colors hover:border-violet-500/50"
                                    whileHover={{
                                        y: -5,
                                        transition: { duration: 0.2, ease: "easeOut" }
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{skill.icon}</span>
                                        <span className="font-medium text-gray-300 group-hover:text-violet-300 transition-colors">
                                            {skill.name}
                                        </span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsSection;