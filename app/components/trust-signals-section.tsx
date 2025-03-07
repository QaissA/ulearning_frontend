'use client'

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Shield, Users, BookOpen, TrendingUp } from 'lucide-react';

const SocialProofSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6
            }
        }
    };

    const testimonials = [
        {
            quote: "This app completely transformed how I manage my courses. My GPA improved by 0.5 points this semester!",
            name: "Alex Thompson",
            role: "Computer Science Major",
            avatar: "/api/placeholder/40/40"
        },
        {
            quote: "The collaboration features helped our study group stay organized during finals week. Couldn't have passed without it!",
            name: "Mia Rodriguez",
            role: "Pre-Med Student",
            avatar: "/api/placeholder/40/40"
        },
        {
            quote: "As someone with ADHD, this app's organization tools have been a game-changer for keeping me on track with assignments.",
            name: "Jordan Williams",
            role: "Psychology Student",
            avatar: "/api/placeholder/40/40"
        }
    ];

    const stats = [
        { value: "25,000+", label: "Active Students", icon: <Users className="h-6 w-6" /> },
        { value: "4.8/5", label: "App Store Rating", icon: <Star className="h-6 w-6" /> },
        { value: "98%", label: "Assignment Completion Rate", icon: <BookOpen className="h-6 w-6" /> },
        { value: "32%", label: "Average GPA Improvement", icon: <TrendingUp className="h-6 w-6" /> }
    ];

    const awards = [
        { name: "Best Education App 2024", organization: "EdTech Awards" },
        { name: "Student Choice Award", organization: "Campus Technology" },
        { name: "Best UI Design", organization: "App Innovation Summit" }
    ];

    return (
        <section className="py-16 bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/30 z-10"></div>
            <div className="container mx-auto px-4">
                {/* Stats Counter */}
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700 hover:border-indigo-500 transition-all duration-300"
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.1)",
                                borderColor: "rgb(99, 102, 241)"
                            }}
                        >
                            <motion.div
                                className="flex justify-center mb-3 text-indigo-400"
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                            >
                                {stat.icon}
                            </motion.div>
                            <motion.h3
                                className="text-3xl font-bold text-white mb-2"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                {stat.value}
                            </motion.h3>
                            <p className="text-gray-300">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Trust Badges */}
                <div className="mb-16 text-center">
                    <motion.h3
                        className="text-2xl font-bold text-white mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Award-Winning Student Platform
                    </motion.h3>
                    <motion.div
                        className="flex flex-wrap justify-center gap-8"
                        initial="hidden"
                        whileInView="visible"
                        variants={containerVariants}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {awards.map((award, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center bg-gray-800 p-4 rounded-lg border border-gray-700"
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "rgb(55, 48, 163, 0.3)",
                                    borderColor: "rgb(129, 140, 248)"
                                }}
                            >
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    whileHover={{ rotate: 360, scale: 1.2 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Award className="h-8 w-8 text-yellow-400 mr-3" />
                                </motion.div>
                                <div className="text-left">
                                    <p className="text-white font-semibold">{award.name}</p>
                                    <p className="text-gray-400 text-sm">{award.organization}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Testimonials */}
                <div className="mb-16">
                    <motion.h3
                        className="text-2xl font-bold text-white mb-8 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        What Students Are Saying
                    </motion.h3>
                    <motion.div
                        className="grid md:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700"
                                variants={itemVariants}
                                whileHover={{
                                    y: -10,
                                    boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.2)",
                                    borderColor: "rgb(129, 140, 248)"
                                }}
                            >
                                <motion.div
                                    className="flex mb-4 text-yellow-400"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.3 }}
                                >
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * i, duration: 0.3 }}
                                        >
                                            <Star className="h-4 w-4 fill-current" />
                                        </motion.div>
                                    ))}
                                </motion.div>
                                <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                                <div className="flex items-center">
                                    <motion.img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-10 h-10 rounded-full mr-3"
                                        whileHover={{ scale: 1.2 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <div>
                                        <p className="text-white font-medium">{testimonial.name}</p>
                                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Trusted By Section */}
                <div className="text-center">
                    <motion.h3
                        className="text-xl font-medium text-gray-300 mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Trusted By Students At
                    </motion.h3>
                    <motion.div
                        className="flex flex-wrap justify-center items-center gap-8"
                        initial="hidden"
                        whileInView="visible"
                        variants={containerVariants}
                        viewport={{ once: true }}
                    >
                        {["university 1", "university 2", "university 3", "university 4", "university 4"].map((school, index) => (
                            <motion.div
                                key={index}
                                className="text-gray-400 text-lg font-semibold px-4 py-2"
                                variants={fadeInVariants}
                                whileHover={{ scale: 1.1, color: "#fff" }}
                            >
                                {school}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Security Badge */}
                <motion.div
                    className="mt-16 text-center max-w-md mx-auto bg-gray-800 rounded-lg p-4 border border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03 }}
                    animate={{
                        boxShadow: ["0px 0px 0px rgba(74, 222, 128, 0)", "0px 0px 15px rgba(74, 222, 128, 0.3)", "0px 0px 0px rgba(74, 222, 128, 0)"],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    <div className="flex justify-center items-center">
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Shield className="h-5 w-5 text-green-400 mr-2" />
                        </motion.div>
                        <span className="text-gray-300 text-sm">Your data is secure with our 256-bit encryption</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SocialProofSection;