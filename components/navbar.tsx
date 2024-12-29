"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Mail, FileText, Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';


export const socialLinks = [
    {
        icon: FaGithub,
        href: 'https://github.com/M-A-N-I-K',
        label: 'GitHub',
        color: 'hover:text-gray-200'
    },
    {
        icon: FaLinkedin,
        href: 'https://www.linkedin.com/in/manik-dingra/',
        label: 'LinkedIn',
        color: 'hover:text-blue-400'
    },
    {
        icon: FaTwitter,
        href: 'https://twitter.com/manik_dingra',
        label: 'Twitter',
        color: 'hover:text-blue-400'
    },
    {
        icon: Mail,
        href: 'mailto:manikdhingra0582@gmail.com',
        label: 'Email',
        color: 'hover:text-violet-400'
    },
    {
        icon: FileText,
        href: 'https://drive.google.com/file/d/1V4i4lY4rZcS7jx9iRNzMANyytJQFwoWE/view?usp=sharing',
        label: 'Resume',
        color: 'hover:text-green-400'
    },
];

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className="fixed top-0 left-0 right-0 flex justify-center items-center h-20 md:h-24 z-50 px-4">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-5xl"
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-violet-500/10 rounded-full blur-xl transform scale-110" />

                {/* Main Navigation */}
                <div className="relative z-[100] px-4 md:px-8 py-3 md:py-4 bg-gray-900/80 backdrop-blur-md rounded-full border border-violet-500/20 shadow-lg shadow-violet-500/10">
                    <div className="flex items-center justify-between gap-4">
                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <motion.li
                                    className="cursor-pointer"
                                    key={item.name}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="text-gray-300 hover:text-white transition-colors px-2 py-1 relative group text-sm font-medium"
                                    >
                                        {item.name}
                                        <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-violet-500 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleMenuClick}
                            className="md:hidden text-gray-300 hover:text-white p-2"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>

                        {/* Social Links - Desktop */}
                        <div className="hidden md:flex items-center gap-4 border-l border-violet-500/20 pl-6">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-gray-400 ${social.color} transition-colors relative group`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <social.icon className="w-5 h-5" />
                                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                                            px-2 py-1 bg-gray-900 text-xs text-gray-300 rounded-md
                                            opacity-0 group-hover:opacity-100 transition-opacity
                                            whitespace-nowrap pointer-events-none">
                                        {social.label}
                                    </span>
                                </motion.a>
                            ))}
                        </div>

                        {/* Mobile Social Links - Always visible */}
                        <div className="flex md:hidden items-center gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-gray-400 ${social.color} transition-colors`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-20 left-0 right-0 bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-violet-500/20 shadow-lg shadow-violet-500/10 p-4 mt-2"
                        >
                            <ul className="space-y-2">
                                {navItems.map((item, index) => (
                                    <motion.li
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={closeMenu}
                                            className="block text-gray-300 hover:text-white hover:bg-violet-500/10 rounded-lg px-4 py-2 transition-colors text-sm font-medium"
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Background Accent */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-violet-500/0 rounded-full transform scale-105 opacity-50" />
            </motion.nav>
        </div>
    );
};

export default NavBar;