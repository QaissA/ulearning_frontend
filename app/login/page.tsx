"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginMode, setLoginMode] = useState('student'); // 'student', 'teacher', 'admin'
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            router.push('/dashboard');
        }, 1500);
    };

    const toggleLoginMode = (mode: any) => {
        setLoginMode(mode);
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full opacity-20"
                        style={{
                            background: `radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(99,102,241,0) 70%)`,
                            width: `${Math.random() * 400 + 200}px`,
                            height: `${Math.random() * 400 + 200}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            filter: 'blur(40px)',
                        }}
                        animate={{
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Main container */}
            <div className="relative z-10 w-full max-w-md">
                {/* Logo and branding */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text inline-block">
                        EduManage
                    </h1>
                    <p className="text-gray-400 mt-1">School Management System</p>
                </motion.div>

                {/* Login card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
                >
                    {/* Login type selector */}
                    <div className="flex border-b border-gray-700">
                        {['student', 'teacher', 'admin'].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => toggleLoginMode(mode)}
                                className={`flex-1 py-4 text-center text-sm font-medium relative ${loginMode === mode
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-gray-300'
                                    }`}
                            >
                                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                {loginMode === mode && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
                                        initial={false}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Login form */}
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-white mb-6">
                            {loginMode === 'student' ? 'Student Login' :
                                loginMode === 'teacher' ? 'Teacher Login' : 'Admin Login'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 block">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <motion.input
                                        whileFocus={{ scale: 1.01 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-10 w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        placeholder={`${loginMode}@school.edu`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 block">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <motion.input
                                        whileFocus={{ scale: 1.01 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-10 w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-500 rounded bg-gray-700"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                                        Remember me
                                    </label>
                                </div>

                                <Link href="/forgot-password" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
                                    Forgot password?
                                </Link>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-4 rounded-lg text-white font-medium ${isLoading ? 'bg-gray-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </div>
                                ) : (
                                    'Sign in'
                                )}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <div className="relative flex items-center mt-8">
                            <div className="flex-grow border-t border-gray-600"></div>
                            <span className="flex-shrink mx-4 text-gray-400">or continue with</span>
                            <div className="flex-grow border-t border-gray-600"></div>
                        </div>

                        {/* Social login */}
                        <div className="mt-6 grid grid-cols-3 gap-3">
                            {['google', 'microsoft', 'apple'].map((provider) => (
                                <motion.button
                                    key={provider}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex justify-center items-center py-2 px-4 border border-gray-600 rounded-lg bg-gray-700 bg-opacity-50 hover:bg-gray-700 transition-colors"
                                >
                                    <span className="sr-only">{`Sign in with ${provider}`}</span>
                                    <svg className="h-5 w-5 text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {provider === 'google' && (
                                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill="currentColor" />
                                        )}
                                        {provider === 'microsoft' && (
                                            <path d="M11 11V5H5V11H11ZM11 19V13H5V19H11ZM13 11H19V5H13V11ZM19 13H13V19H19V13Z" fill="currentColor" />
                                        )}
                                        {provider === 'apple' && (
                                            <path d="M14.94 5.19C15.88 4.08 16.5 2.56 16.27 1C14.91 1.08 13.23 1.93 12.27 3.04C11.41 4.05 10.66 5.61 10.93 7.09C12.46 7.24 14.01 6.3 14.94 5.19ZM18.07 17.92C18.39 17.24 18.6 16.54 18.71 15.83C17.47 15.35 16.6 14.31 16.47 13.07C16.33 11.54 17.22 10.16 18.58 9.55C17.93 8.27 16.74 7.43 15.42 7.37C14.12 7.31 13.41 7.77 12.58 8.12C11.91 8.42 11.34 8.68 10.53 8.68C9.66 8.68 9.03 8.39 8.34 8.07C7.7 7.77 7 7.46 6.2 7.49C4.44 7.56 2.85 8.81 2.04 10.76C0.75 13.89 1.76 18.79 3.93 21.49C4.79 22.57 5.84 23.82 7.26 23.78C7.96 23.76 8.47 23.5 9 23.24C9.64 22.93 10.34 22.58 11.4 22.58C12.42 22.58 13.1 22.92 13.74 23.23C14.29 23.5 14.81 23.75 15.54 23.73C17 23.69 18 22.34 18.79 21.25C19.33 20.49 19.74 19.62 20 18.78L18.08 17.94" fill="currentColor" />
                                        )}
                                    </svg>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Sign up link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mt-6 text-gray-400"
                >
                    <span>Don't have an account?</span>{' '}
                    <Link href="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
                        Sign up
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}