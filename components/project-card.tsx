// ProjectCard.tsx
"use client";

import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'motion/react';

interface ProjectLink {
    icon: string;
    label: string;
    url: string;
}

export interface Project {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    status?: 'in-progress' | 'completed';
    links: ProjectLink[];
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse tracking for parallax effect
    // const mouseX = useMotionValue(0);
    // const mouseY = useMotionValue(0);


    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const rotationSpringConfig = { stiffness: 400, damping: 25, mass: 0.1 };

    const rotateX = useSpring(0, rotationSpringConfig);
    const rotateY = useSpring(0, rotationSpringConfig);

    const contentX = useSpring(0, springConfig);
    const contentY = useSpring(0, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseXRelative = e.clientX - centerX;
        const mouseYRelative = e.clientY - centerY;

        rotateX.set(mouseYRelative * -0.01);
        rotateY.set(mouseXRelative * 0.01);

        contentX.set(mouseXRelative * 0.02);
        contentY.set(mouseYRelative * 0.02);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        rotateX.set(0);
        rotateY.set(0);
        contentX.set(0);
        contentY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className="relative max-w-6xl w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.5,
                    delay: index * 0.1
                }
            }}
            viewport={{ once: true, margin: "-100px" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative rounded-xl overflow-hidden backdrop-blur-lg border"
                style={{
                    backgroundColor: 'var(--card)/80',
                    borderColor: 'var(--border)/50',
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    transformPerspective: "1000px"
                }}
                whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                }}
            >
                {/* Project Image */}
                <motion.div
                    className="relative h-64 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                >
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        style={{
                            x: contentX,
                            y: contentY
                        }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                    />
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                        style={{ background: `linear-gradient(to top, var(--background), var(--background)/50, transparent)` }}
                        initial={{ opacity: 0.5 }}
                        whileHover={{ opacity: 0.7 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>

                {/* Project Content */}
                <motion.div
                    className="relative p-6"
                    style={{
                        x: contentX,
                        y: contentY,
                        transformStyle: "preserve-3d"
                    }}
                >
                    {/* Title and Status */}
                    <div className="flex items-center gap-3 mb-3">
                        <motion.h3
                            className="text-2xl font-bold"
                            style={{
                                color: 'var(--primary)',
                                translateZ: 50
                            }}
                        >
                            {project.title}
                        </motion.h3>
                        {project.status === 'in-progress' && (
                            <motion.div
                                className="px-3 py-1 bg-amber-500/20 rounded-full border border-amber-500/30"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                    </span>
                                    <span className="text-xs font-medium text-amber-400">In Progress</span>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Description */}
                    <motion.p
                        className="mb-4 leading-relaxed"
                        style={{
                            color: 'var(--muted-foreground)',
                            translateZ: 30
                        }}
                    >
                        {project.description}
                    </motion.p>

                    {/* Technologies */}
                    <motion.div
                        className="flex flex-wrap gap-2 mb-4"
                        style={{ translateZ: 40 }}
                    >
                        {project.technologies.map((tech, i) => (
                            <motion.span
                                key={i}
                                className="px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border"
                                style={{
                                    backgroundColor: 'var(--primary)/20',
                                    color: 'var(--primary)',
                                    borderColor: 'var(--primary)/20'
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: 'var(--primary)/30'
                                }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Links */}
                    <motion.div
                        className="flex gap-3"
                        style={{ translateZ: 50 }}
                    >
                        {project.links.map((link, i) => (
                            <motion.a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                                style={{
                                    backgroundColor: 'var(--primary)/20',
                                    color: 'var(--primary)'
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: 'var(--primary)/30'
                                }}
                            >
                                {link.icon} {link.label}
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Hover Glow Effect */}
            <motion.div
                className="absolute -inset-1 rounded-xl -z-10 opacity-0 group-hover:opacity-100 blur-xl"
                style={{ background: `linear-gradient(to right, var(--primary)/20, var(--ring)/20)` }}
                animate={isHovered ? {
                    opacity: [0, 0.5, 0],
                    scale: [0.8, 1.2, 0.8],
                    transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                } : { opacity: 0 }}
            />
        </motion.div>
    );
};

export default ProjectCard;