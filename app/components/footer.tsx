'use client'
import React from 'react';
import { motion } from 'framer-motion';
import {
    Github,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    ChevronRight,
    Heart,
    Calendar,
    BookOpen,
    Bell,
    BarChart,
    Users
} from 'lucide-react';

const Footer = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const footerLinks = [
        {
            title: "Product",
            links: [
                { name: "Features", href: "#" },
                { name: "Pricing", href: "#" },
                { name: "Roadmap", href: "#" },
                { name: "Beta Program", href: "#" },
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Blog", href: "#" },
                { name: "Student Guide", href: "#" },
                { name: "Help Center", href: "#" },
                { name: "API Docs", href: "#" },
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About Us", href: "#" },
                { name: "Careers", href: "#" },
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
            ]
        }
    ];

    const features = [
        { name: "Assignment Tracking", icon: <Calendar className="h-4 w-4" /> },
        { name: "Study Planner", icon: <BookOpen className="h-4 w-4" /> },
        { name: "Deadline Reminders", icon: <Bell className="h-4 w-4" /> },
        { name: "Grade Analytics", icon: <BarChart className="h-4 w-4" /> },
        { name: "Study Groups", icon: <Users className="h-4 w-4" /> }
    ];

    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-5 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    {/* Brand Column */}
                    <motion.div className="lg:col-span-2" variants={itemVariants}>
                        <motion.div
                            className="flex items-center mb-4"
                            whileHover={{ scale: 1.05, x: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="h-8 w-8 bg-indigo-600 rounded-lg mr-3 flex items-center justify-center">
                                <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-white">SchoolManager</h2>
                        </motion.div>

                        <p className="text-gray-400 mb-6">
                            The all-in-one platform designed to help students organize their academic life, collaborate effectively, and achieve better results.
                        </p>

                        <div className="mb-6">
                            <h4 className="text-gray-300 font-medium mb-3">Key Features</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center text-gray-400"
                                        whileHover={{ x: 5, color: "#fff" }}
                                    >
                                        {feature.icon}
                                        <span className="ml-2 text-sm">{feature.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            className="flex space-x-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            {[Github, Twitter, Instagram, Linkedin].map((Icon, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-indigo-600"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Icon className="h-5 w-5" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Nav Links */}
                    {footerLinks.map((column, columnIndex) => (
                        <motion.div key={columnIndex} variants={itemVariants}>
                            <h3 className="text-white font-semibold mb-4">{column.title}</h3>
                            <ul className="space-y-2">
                                {column.links.map((link, linkIndex) => (
                                    <motion.li key={linkIndex}
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <a href={link.href} className="text-gray-400 hover:text-white flex items-center">
                                            <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100" />
                                            {link.name}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Newsletter */}
                <motion.div
                    className="mt-12 pt-8 border-t border-gray-800"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-white font-semibold mb-2">Stay up to date</h3>
                            <p className="text-gray-400">Get updates on new features and tips to improve your school life.</p>
                        </div>
                        <div>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-gray-800 border border-gray-700 rounded-l-lg py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-grow"
                                />
                                <motion.button
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-r-lg"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Subscribe
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Copyright */}
                <motion.div
                    className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} SchoolManager. All rights reserved.
                    </p>

                    <motion.div
                        className="flex items-center text-gray-500 text-sm"
                        whileHover={{ color: "#fff" }}
                    >
                        Made with
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="mx-1 text-red-500"
                        >
                            <Heart className="h-4 w-4 fill-current" />
                        </motion.div>
                        for students worldwide
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;