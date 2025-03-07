'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const EmailCaptureForm = () => {
    const [email, setEmail] = useState('');
    const [formState, setFormState] = useState('idle'); // idle, loading, success, error

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!email) return;

        setFormState('loading');

        // Simulate API call
        setTimeout(() => {
            // Check for valid email format
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            setFormState(isValidEmail ? 'success' : 'error');
        }, 1500);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
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
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const pulseVariants = {
        pulse: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
            }
        }
    };

    return (
        <section className="py-16 bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/30 z-10"></div>
            <div className="container mx-auto px-4">
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-white mb-6"
                        variants={itemVariants}
                    >
                        Ready to Transform Your School Experience?
                    </motion.h2>

                    <motion.p
                        className="text-lg text-gray-300 mb-8"
                        variants={itemVariants}
                    >
                        Join thousands of students who are saving time, improving their grades, and reducing stress with our app.
                    </motion.p>

                    <motion.div
                        className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-lg"
                        variants={pulseVariants}
                        animate="pulse"
                    >
                        <motion.div
                            className="flex justify-center mb-6"
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-indigo-500/20 p-3 rounded-full">
                                <Mail className="h-8 w-8 text-indigo-400" />
                            </div>
                        </motion.div>

                        {formState === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-4">
                                    <CheckCircle className="h-10 w-10 text-green-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Thank You for Joining!</h3>
                                <p className="text-gray-300">We'll send you early access information and exclusive student offers soon.</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-6 rounded-full inline-flex items-center"
                                    onClick={() => setFormState('idle')}
                                >
                                    <span>Sign Up Another Email</span>
                                </motion.button>
                            </motion.div>
                        ) : formState === 'error' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-4">
                                    <AlertCircle className="h-10 w-10 text-red-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Invalid Email</h3>
                                <p className="text-gray-300">Please check your email address and try again.</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-6 rounded-full inline-flex items-center"
                                    onClick={() => setFormState('idle')}
                                >
                                    <span>Try Again</span>
                                </motion.button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-xl font-semibold text-white mb-4">Get Early Access</h3>
                                <p className="text-gray-300 mb-6">Be the first to know when we launch new features and special offers for students.</p>

                                <div className="relative mb-4">
                                    <motion.div
                                        className="absolute inset-0 bg-indigo-500/20 rounded-lg"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        viewport={{ once: true }}
                                        whileHover={{ opacity: 0.3 }}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 relative z-10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-6 rounded-lg transition duration-300 inline-flex items-center justify-center"
                                    disabled={formState === 'loading'}
                                >
                                    {formState === 'loading' ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                                        />
                                    ) : (
                                        <>
                                            <span>Get Started Free</span>
                                            <motion.div
                                                initial={{ x: 0 }}
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                                            >
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </motion.div>
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        )}

                        <motion.div
                            className="mt-6 text-center text-gray-400 text-sm"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <p>No credit card required · No spam · Unsubscribe anytime</p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="mt-8 flex flex-wrap justify-center items-center gap-6"
                        variants={itemVariants}
                    >
                        {["Get started in seconds", "Join 25,000+ students", "Free forever plan available"].map((text, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center text-gray-300"
                                whileHover={{ color: "#fff", scale: 1.05 }}
                            >
                                <CheckCircle className="h-4 w-4 text-indigo-400 mr-2" />
                                <span>{text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default EmailCaptureForm;