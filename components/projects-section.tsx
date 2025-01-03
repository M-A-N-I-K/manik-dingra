"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue } from 'motion/react';
import ProjectCard, { Project } from './project-card';
import { PiProjectorScreenBold } from 'react-icons/pi';

const ProjectsSection = () => {
    const sectionRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Projects data
    const projects = [
        {
            title: "Jobiffy",
            description: "A comprehensive referral platform connecting job seekers with referrers, streamlining the job search process with efficient type-safe APIs and robust database architecture.",
            image: "/projects/jobiffy.png",
            technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS"],
            links: [
                {
                    icon: "🚀",
                    label: "Live Demo",
                    url: "https://jobiffy.co"
                }
            ],
            status: "in-progress"
        },
        {
            title: "Callsure AI",
            description: "Full-stack application with clean architecture principles, featuring automated deployment through CI/CD pipeline to AWS and scalable database implementation.",
            image: "/projects/callsure.png",
            technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "AWS", "CI/CD"],
            links: [
                {
                    icon: "🌐",
                    label: "Live Demo",
                    url: "https://callsure.ai"
                }
            ],
            status: "in-progress"
        },
        // {
        //     title: "MailEase",
        //     description: "Email automation platform with robust form validation and efficient email delivery system, achieving significant reduction in bounce rates and improved data integrity.",
        //     image: "/api/placeholder/800/600",
        //     technologies: ["Next.js", "TypeScript", "React Hook Form", "Zod", "Nodemailer", "TailwindCSS", "Shadcn UI"],
        //     links: [
        //         {
        //             icon: "📧",
        //             label: "Live Demo",
        //             url: "https://automated-mail-sender.vercel.app"
        //         },
        //         {
        //             icon: "📦",
        //             label: "Source Code",
        //             url: "https://github.com/M-A-N-I-K/automated-mail-sender"
        //         }
        //     ],
        //     status: "completed"
        // },
        {
            title: "Mind Note",
            description: "Feature-rich document management system with real-time collaboration capabilities, incorporating authentication and optimized query responses for enhanced performance.",
            image: "/projects/mindnote.png",
            technologies: ["Next.js", "TypeScript", "TailwindCSS", "Shadcn UI", "Clerk", "Convex", "Docker"],
            links: [
                {
                    icon: "📝",
                    label: "Live Demo",
                    url: "https://mind-note-beta.vercel.app/"
                }
            ],
            status: "completed"
        }
    ] as Project[];

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <motion.section
            ref={sectionRef}
            className="relative py-20 bg-gray-900 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
        >
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12 md:mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-2 md:gap-4">
                        Projects
                        <PiProjectorScreenBold className="w-6 h-6 md:w-8 md:h-8 text-violet-400" />
                    </h2>
                    <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto" />
                </motion.div>

                <div className="grid gap-8 max-w-6xl mx-auto">
                    {projects.map((project: Project, index: number) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            index={index}
                        />

                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default ProjectsSection;