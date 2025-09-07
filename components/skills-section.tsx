"use client";

import React, { useState } from 'react';
import {
    SiTypescript,
    SiJavascript,
    SiPython,
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiRedis,
    SiPostgresql,
    SiDocker,
    SiGit,
    SiFlask,
    SiSanity,
    SiAmazonwebservices,
} from 'react-icons/si';
import {
    Sparkles,
    RefreshCw,
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
            icon: <SiTypescript className="w-6 h-6 text-blue-400" />
        },
        {
            name: 'JavaScript',
            category: 'Languages',
            icon: <SiJavascript className="w-6 h-6 text-yellow-400" />
        },
        {
            name: 'Python',
            category: 'Languages',
            icon: <SiPython className="w-6 h-6 text-green-400" />
        },
        {
            name: 'Flask',
            category: 'Backend',
            icon: <SiFlask className="w-6 h-6 text-gray-300" />
        },

        // Frontend
        {
            name: 'React',
            category: 'Frontend',
            icon: <SiReact className="w-6 h-6 text-cyan-400" />
        },
        {
            name: 'Next.js',
            category: 'Frontend',
            icon: <SiNextdotjs className="w-6 h-6 text-white" />
        },
        {
            name: 'Tailwind',
            category: 'Frontend',
            icon: <SiTailwindcss className="w-6 h-6 text-sky-400" />
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
            icon: <SiNodedotjs className="w-6 h-6 text-green-400" />
        },
        {
            name: "Express.js",
            category: "Backend",
            icon: <SiExpress className="w-6 h-6 text-gray-400" />
        },
        {
            name: 'MongoDB',
            category: 'Backend',
            icon: <SiMongodb className="w-6 h-6 text-green-500" />
        },
        {
            name: 'Redis',
            category: 'Backend',
            icon: <SiRedis className="w-6 h-6 text-red-400" />
        },
        {
            name: 'PostgreSQL',
            category: 'Backend',
            icon: <SiPostgresql className="w-6 h-6 text-blue-400" />
        },

        // Others
        {
            name: 'Docker',
            category: 'Others',
            icon: <SiDocker className="w-6 h-6 text-blue-400" />
        },
        {
            name: 'Git',
            category: 'Others',
            icon: <SiGit className="w-6 h-6 text-orange-400" />
        },
        {
            name: 'AWS',
            category: 'Others',
            icon: <SiAmazonwebservices className="w-6 h-6 text-yellow-500" />
        },
        {
            name: "CI/CD",
            category: "Others",
            icon: <RefreshCw className="w-6 h-6 text-green-400" />
        },
        {
            name: "Sanity",
            category: "Others",
            icon: <SiSanity className="w-6 h-6 text-red-400" />
        },
    ];

    const categories = Array.from(new Set(skills.map(skill => skill.category)));

    const filteredSkills = activeCategory
        ? skills.filter(skill => skill.category === activeCategory)
        : skills;

    return (
        <section className="py-24 min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <div className="relative inline-block">
                        <h2 className="text-2xl md:text-5xl font-bold" style={{ color: 'var(--foreground)' }}>
                            {"Skills & Technologies".split("").map((letter, i) => (
                                <span
                                    key={i}
                                    className="inline-block"
                                    style={{
                                        background: `linear-gradient(to right, var(--primary) ${i * 5}%, var(--ring) ${i * 10}%)`,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent"
                                    }}
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </span>
                            ))}
                        </h2>
                        <div className="absolute -inset-x-4 -inset-y-2 blur-xl rounded-full" style={{ background: `linear-gradient(to right, var(--primary)/10, var(--ring)/10)` }} />
                    </div>
                    <div className="h-1 w-24 mx-auto mt-6 rounded-full" style={{ background: `linear-gradient(to right, var(--primary), var(--ring))` }} />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-5 py-2 rounded-full text-sm transition-all border ${activeCategory === null
                            ? 'text-white'
                            : 'hover:opacity-80'
                            }`}
                        style={{
                            backgroundColor: activeCategory === null ? 'var(--primary)' : 'var(--secondary)',
                            color: activeCategory === null ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
                            borderColor: activeCategory === null ? 'var(--primary)' : 'var(--border)'
                        }}
                    >
                        All
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-5 py-2 rounded-full text-sm transition-all border ${activeCategory === category
                                ? 'text-white'
                                : 'hover:opacity-80'
                                }`}
                            style={{
                                backgroundColor: activeCategory === category ? 'var(--primary)' : 'var(--secondary)',
                                color: activeCategory === category ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
                                borderColor: activeCategory === category ? 'var(--primary)' : 'var(--border)'
                            }}
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
                            className="group relative cursor-grab"
                        >
                            <div className="absolute inset-0 rounded-xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" style={{ backgroundColor: 'var(--primary)/5' }} />
                            <div
                                className="relative backdrop-blur-sm rounded-xl border p-4 transition-all duration-200 hover:-translate-y-1 shadow-sm"
                                style={{
                                    backgroundColor: 'var(--card)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--card-foreground)',
                                    boxShadow: '0 1px 3px 0 var(--border)/20'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px 0 var(--primary)/20';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                    e.currentTarget.style.boxShadow = '0 1px 3px 0 var(--border)/20';
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    {skill.icon}
                                    <span className="font-medium transition-colors group-hover:opacity-80">
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