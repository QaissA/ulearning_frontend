"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from "sonner";

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userType, setUserType] = useState('student');
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState('');
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    // Mouse position for interactive background effect
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: any) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            // Transform the user data to ensure correct types
            const user = {
                ...data.user,
                id: data.user.id.toString()
            };
            // Store user data and token
            login(user, data.token);
            toast.success('Login successful!', {
                description: `Welcome back, ${user.name}!`
            });
            setIsLoading(false);
            // Redirect to dashboard after successful login
            setTimeout(() => {
                router.push('/dashboard');
            }, 500);
        },
        onError: (error: any) => {
            console.error('Login failed:', error);
            setFormError(error.response?.data?.message || 'Invalid email or password');
            toast.error('Login failed', {
                description: error.response?.data?.message || 'Invalid email or password'
            });
            setIsLoading(false);
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setFormError('All fields are required');
            return;
        }
        setFormError('');
        setIsLoading(true);
        mutation.mutate({ email, password });
    };

    const userTypes = [
        { id: 'student', label: 'Student' },
        { id: 'teacher', label: 'Teacher' },
        { id: 'admin', label: 'Admin' }
    ];

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated gradient background */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `radial-gradient(
            circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(59, 130, 246, 0.4) 0%,
            transparent 50%
          )`
                }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-blue-500"
                        style={{
                            width: Math.random() * 4 + 2,
                            height: Math.random() * 4 + 2,
                            filter: "blur(1px)",
                            opacity: Math.random() * 0.3 + 0.1,
                        }}
                        animate={{
                            x: [
                                Math.random() * window.innerWidth,
                                Math.random() * window.innerWidth,
                            ],
                            y: [
                                Math.random() * window.innerHeight,
                                Math.random() * window.innerHeight,
                            ],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                        }}
                    />
                ))}
            </div>

            {/* Card container with glassmorphism */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden"
            >
                {/* Card inner content */}
                <div className="p-8 sm:p-10">
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mx-auto w-16 h-16 mb-4 relative"
                        >
                            <div className="absolute inset-0 rounded-full border-4 border-white border-opacity-20"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">EM</span>
                            </div>
                        </motion.div>
                        <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
                        <p className="text-blue-200 text-sm">Sign in to continue to EduManage</p>
                    </div>

                    {/* User type selector */}
                    {/* <div className="mb-6">
                        <div className="bg-white bg-opacity-5 rounded-lg p-1 flex items-center justify-between">
                            {userTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setUserType(type.id)}
                                    className={`relative flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-300 z-10 ${userType === type.id ? 'text-blue-900' : 'text-blue-200'
                                        }`}
                                >
                                    {userType === type.id && (
                                        <motion.div
                                            layoutId="activeUserType"
                                            className="absolute inset-0 bg-white rounded-md"
                                            transition={{ type: "spring", duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{type.label}</span>
                                </button>
                            ))}
                        </div>
                    </div> */}

                    {/* Sign in form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-blue-100 block">Email</label>
                            <div className="relative">
                                <motion.div
                                    whileFocus={{ scale: 1.02 }}
                                    className="absolute inset-0 bg-blue-400 bg-opacity-20 rounded-lg blur-sm"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="block w-full px-4 py-3 bg-white bg-opacity-10 border border-blue-300 border-opacity-10 rounded-lg text-white placeholder-blue-200 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative z-10 transition-all duration-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-blue-100 block">Password</label>
                            <div className="relative">
                                <motion.div
                                    whileFocus={{ scale: 1.02 }}
                                    className="absolute inset-0 bg-blue-400 bg-opacity-20 rounded-lg blur-sm"
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="block w-full px-4 py-3 bg-white bg-opacity-10 border border-blue-300 border-opacity-10 rounded-lg text-white placeholder-blue-200 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative z-10 pr-12 transition-all duration-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white z-10"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {formError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-300 text-sm font-medium"
                            >
                                {formError}
                            </motion.div>
                        )}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 bg-blue-600 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-100">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-300 hover:text-blue-100 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 group-hover:from-blue-500 group-hover:via-indigo-500 group-hover:to-blue-600 rounded-lg"></div>
                                <div className="relative px-6 py-3 flex items-center justify-center">
                                    {isLoading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <span className="font-medium text-white">Sign In</span>
                                    )}
                                </div>

                                {/* Button shine effect */}
                                <motion.div
                                    className="absolute inset-0 w-full h-full bg-white opacity-0"
                                    animate={{
                                        x: ["0%", "100%"],
                                        opacity: [0, 0.1, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatDelay: 3,
                                    }}
                                />
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-blue-200">
                            Don't have an account?{" "}
                            <Link href="/auth/signup" className="font-medium text-blue-300 hover:text-blue-100 transition-colors">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignInPage;