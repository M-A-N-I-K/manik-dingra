"use client";

import React, { useState } from 'react';
import {
    Code2,
    Server,
    Box,
    CircuitBoard,
    FileCode,
    Database,
    Cloud,
    GitBranch,
    Layers,
    Palette,
    Sparkles,
    Infinity,
    RefreshCw,
    Leaf,
    Boxes
} from 'lucide-react';

interface Skill {
    name: string;
    category: string;
    icon: React.ReactNode;
}

const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const skills: Skill[] = [
        // Languages
        {
            name: 'TypeScript',
            category: 'Languages',
            icon: <FileCode className="w-6 h-6 text-blue-400" />
        },
        {
            name: 'JavaScript',
            category: 'Languages',
            icon: <Code2 className="w-6 h-6 text-yellow-400" />
        },

        // Frontend
        {
            name: 'React',
            category: 'Frontend',
            icon: <CircuitBoard className="w-6 h-6 text-cyan-400" />
        },
        {
            name: 'Next.js',
            category: 'Frontend',
            icon: <Layers className="w-6 h-6 text-white" />
        },
        {
            name: 'Tailwind',
            category: 'Frontend',
            icon: <Palette className="w-6 h-6 text-sky-400" />
        },
        {
            name: 'Framer Motion',
            category: 'Frontend',
            icon: <Sparkles className="w-6 h-6 text-purple-400" />
        },

        // Backend
        {
            name: 'Node.js',
            category: 'Backend',
            icon: <Server className="w-6 h-6 text-green-400" />
        },
        {
            name: "Express.js",
            category: "Backend",
            icon: <Infinity className="w-6 h-6 text-gray-400" />
        },
        {
            name: 'MongoDB',
            category: 'Backend',
            icon: <Leaf className="w-6 h-6 text-green-500" />
        },
        {
            name: 'Redis',
            category: 'Backend',
            icon: <Database className="w-6 h-6 text-red-400" />
        },
        {
            name: 'PostgreSQL',
            category: 'Backend',
            icon: <Database className="w-6 h-6 text-blue-400" />
        },

        // Others
        {
            name: 'Docker',
            category: 'Others',
            icon: <Box className="w-6 h-6 text-blue-400" />
        },
        {
            name: 'Git',
            category: 'Others',
            icon: <GitBranch className="w-6 h-6 text-orange-400" />
        },
        {
            name: 'AWS',
            category: 'Others',
            icon: <Cloud className="w-6 h-6 text-yellow-500" />
        },
        {
            name: "CI/CD",
            category: "Others",
            icon: <RefreshCw className="w-6 h-6 text-green-400" />
        },
        {
            name: "Sanity",
            category: "Others",
            icon: <Boxes className="w-6 h-6 text-red-400" />
        },
    ];

    const categories = Array.from(new Set(skills.map(skill => skill.category)));

    const filteredSkills = activeCategory
        ? skills.filter(skill => skill.category === activeCategory)
        : skills;

    return (
        <section className="py-24 min-h-screen bg-gray-900">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <div className="relative inline-block">
                        <h2 className="text-2xl md:text-5xl font-bold">
                            {"Skills & Technologies".split("").map((letter, i) => (
                                <span
                                    key={i}
                                    className="inline-block"
                                    style={{
                                        background: `linear-gradient(to right, rgb(167, 139, 250) ${i * 5}%, rgb(139, 92, 246) ${i * 10}%)`,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent"
                                    }}
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </span>
                            ))}
                        </h2>
                        <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-xl rounded-full" />
                    </div>
                    <div className="h-1 w-24 mx-auto mt-6 rounded-full bg-gradient-to-r from-violet-500/50 to-purple-500/50" />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-5 py-2 rounded-full text-sm transition-all ${activeCategory === null
                            ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                            : 'text-gray-400 hover:text-violet-300'
                            }`}
                    >
                        All
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-5 py-2 rounded-full text-sm transition-all ${activeCategory === category
                                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                                : 'text-gray-400 hover:text-violet-300'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredSkills.map((skill) => (
                        <div
                            key={skill.name}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-violet-500/10 rounded-xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
                            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 transition-colors hover:border-violet-500/50 hover:-translate-y-1 duration-200">
                                <div className="flex items-center gap-3">
                                    {skill.icon}
                                    <span className="font-medium text-gray-300 group-hover:text-violet-300 transition-colors">
                                        {skill.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;