"use client";

import React from 'react';
import { motion } from 'motion/react';
import { socialLinks } from './navbar';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            className="relative border-t"
            style={{
                backgroundColor: 'var(--background)',
                borderColor: 'var(--border)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Left side - Logo/Name */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-4 md:mb-0"
                    >
                        <span
                            className="text-xl font-semibold"
                            style={{
                                color: 'var(--foreground)',
                                background: `linear-gradient(to right, var(--primary), var(--ring))`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}
                        >
                            Manik Dingra
                        </span>
                    </motion.div>

                    {/* Center - Social Links */}
                    <motion.div
                        className="flex gap-6 mb-4 md:mb-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`transition-colors relative group`}
                                style={{ color: 'var(--muted-foreground)' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'var(--primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--muted-foreground)';
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <social.icon className="w-5 h-5" />
                                <span
                                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                                        px-2 py-1 text-xs rounded-md
                                        opacity-0 group-hover:opacity-100 transition-opacity
                                        whitespace-nowrap pointer-events-none"
                                    style={{
                                        backgroundColor: 'var(--card)',
                                        color: 'var(--card-foreground)'
                                    }}
                                >
                                    {social.label}
                                </span>
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Right side - Copyright */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm"
                        style={{ color: 'var(--muted-foreground)' }}
                    >
                        © {currentYear} All rights reserved
                    </motion.div>
                </div>

                {/* Animated gradient line */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                        background: `linear-gradient(to right, var(--primary)/0, var(--primary)/50, var(--primary)/0)`
                    }}
                    animate={{
                        backgroundPosition: ['200% 0', '-200% 0'],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />
            </div>
        </motion.footer>
    );
};

export default Footer;