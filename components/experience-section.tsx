"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Briefcase, Code2, GitBranch, GanttChart } from 'lucide-react';

interface ExperienceData {
    title: string;
    company: string;
    period: string;
    description: string;
    skills: string[];
    icon: any;
    color: string;
}

const experiences = [
    {
        title: "Full Stack Developer",
        company: "Tuna Software Solutions Limited",
        period: "May 2024 - Present",
        description: "Developing scalable web applications using Next.js and AWS infrastructure with Sanity CMS integration.",
        skills: ["Next.js", "AWS", "CI/CD", "Sanity CMS", "TypeScript"],
        icon: Code2,
        color: "violet"
    },
    {
        title: "Web Developer",
        company: "Lotus Interworks",
        period: "Aug 2023 - Apr 2024",
        description: "Streamlined deployment processes and developed SMS campaign features using modern web technologies.",
        skills: ["React", "Node.js", "Express.js", "React Native", "MySQL"],
        icon: GitBranch,
        color: "blue"
    },
    {
        title: "Front End Developer",
        company: "ONIRIC",
        period: "Dec 2022 - Aug 2023",
        description: "Created and maintained modular React components while optimizing application performance.",
        skills: ["React", "Tailwind CSS", "TypeScript", "API Integration"],
        icon: Briefcase,
        color: "indigo"
    }
];

const ExperienceCard = ({ data, index }: { data: ExperienceData, index: number }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative group"
        >
            {/* Connection Line - Hidden on mobile */}
            {index !== experiences.length - 1 && (
                <div className="absolute left-8 md:left-14 top-24 w-1 h-full bg-gradient-to-b from-violet-500/50 to-transparent hidden md:block" />
            )}

            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 p-4 md:p-6">
                {/* Icon Circle */}
                <div className={`relative shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-${data.color}-500/20 
                        flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <data.icon className={`w-6 h-6 md:w-8 md:h-8 text-${data.color}-400`} />
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-full bg-${data.color}-500/20 blur-lg opacity-0 
                          group-hover:opacity-100 transition-opacity`} />
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-2 text-center md:text-left">
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-1">{data.title}</h3>
                            <p className="text-violet-400 text-sm md:text-base">{data.company}</p>
                        </div>
                        <span className="text-gray-400 text-xs md:text-sm mt-1 md:mt-0">{data.period}</span>
                    </div>

                    <p className="text-gray-300 mb-4 text-sm md:text-base text-center md:text-left">{data.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {data.skills.map((skill: string, i: number) => (
                            <span
                                key={i}
                                className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm border border-${data.color}-500/20 
                           bg-${data.color}-500/10 text-${data.color}-300`}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ExperienceSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    return (
        <section ref={sectionRef} className="min-h-screen bg-gray-900 py-12 md:py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12 md:mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-2 md:gap-4">
                        Experience
                        <GanttChart className="w-6 h-6 md:w-8 md:h-8 text-violet-400" />
                    </h2>
                    <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto" />
                </motion.div>

                {/* Timeline */}
                <div className="space-y-6 md:space-y-8">
                    {experiences.map((exp, index) => (
                        <ExperienceCard key={index} data={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
