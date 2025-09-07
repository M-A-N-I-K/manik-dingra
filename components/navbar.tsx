"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Mail, FileText, Menu, X, Sun, Moon } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useTheme } from './theme-provider';


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
    const { theme, toggleTheme } = useTheme();

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
                className="relative w-full max-w-5xl rounded-full shadow-xl"
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full blur-xl transform scale-110" style={{ backgroundColor: 'var(--primary)/5' }} />

                {/* Main Navigation */}
                <div
                    className="relative z-[100] px-4 md:px-8 py-3 md:py-4 backdrop-blur-md border rounded-full"
                    style={{
                        backgroundColor: 'var(--card)/95',
                        borderColor: 'var(--border)',
                        boxShadow: '0 4px 6px -1px var(--border)/20, 0 2px 4px -1px var(--border)/10'
                    }}
                >
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
                                        className="transition-colors px-2 py-1 relative text-primary group text-sm font-bold"
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = 'var(--foreground)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = 'var(--muted-foreground)';
                                        }}
                                    >
                                        {item.name}
                                        <div
                                            className="absolute bottom-0 left-1/2 w-0 h-[2px] group-hover:w-full group-hover:left-0 transition-all duration-300"
                                            style={{ backgroundColor: 'var(--primary)' }}
                                        />
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleMenuClick}
                            className="md:hidden p-2 transition-colors"
                            style={{ color: 'var(--muted-foreground)' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--foreground)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--muted-foreground)';
                            }}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>

                        {/* Social Links - Desktop */}
                        <div
                            className="hidden md:flex items-center gap-4 border-l pl-6"
                            style={{ borderColor: 'var(--border)' }}
                        >
                            {/* Theme Toggle */}
                            <motion.button
                                onClick={toggleTheme}
                                className="transition-colors relative group"
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
                                transition={{ delay: 0.1 }}
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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
                                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                                </span>
                            </motion.button>

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
                                    transition={{ delay: (index + 1) * 0.1 }}
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
                            {/* Theme Toggle - Mobile */}
                            <motion.button
                                onClick={toggleTheme}
                                className="transition-colors"
                                style={{ color: 'var(--muted-foreground)' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'var(--primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--muted-foreground)';
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </motion.button>

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
                            className="absolute top-20 left-0 right-0 backdrop-blur-lg rounded-2xl border shadow-lg p-4 mt-2"
                            style={{
                                backgroundColor: 'var(--card)/98',
                                borderColor: 'var(--border)',
                                boxShadow: '0 10px 15px -3px var(--border)/20, 0 4px 6px -2px var(--border)/10'
                            }}
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
                                            className="block rounded-lg px-4 py-2 transition-colors text-sm font-medium"
                                            style={{ color: 'var(--muted-foreground)' }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = 'var(--foreground)';
                                                e.currentTarget.style.backgroundColor = 'var(--accent)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = 'var(--muted-foreground)';
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }}
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
                <div className="absolute inset-0 rounded-full transform scale-105 opacity-50" style={{ background: `linear-gradient(to right, var(--primary)/0, var(--primary)/5, var(--primary)/0)` }} />
            </motion.nav>
        </div>
    );
};

export default NavBar;