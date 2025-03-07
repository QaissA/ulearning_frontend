"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingPage() {
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                const newProgress = prevProgress + Math.random() * 10;
                return newProgress >= 100 ? 100 : newProgress;
            });
        }, 200);

        const timer = setTimeout(() => {
            clearInterval(interval);
            setLoading(false);
            router.push("/home");
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [router]);

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-40 h-40 bg-blue-500 opacity-10 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            filter: "blur(60px)",
                        }}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.05, 0.15, 0.05],
                        }}
                        transition={{
                            duration: 8 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* School logo/brand mark */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="mb-12"
                >
                    <div className="w-24 h-24 relative">
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-t-4 border-l-4 border-blue-500 opacity-70"
                        ></motion.div>
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-r-4 border-b-4 border-indigo-600 opacity-70"
                            style={{ margin: "8px" }}
                        ></motion.div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-bold text-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">EM</span>
                        </div>
                    </div>
                </motion.div>

                {/* Bouncing elements (improved) */}
                <div className="flex gap-3 mb-12">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                            animate={{
                                y: [-10, 10],
                                opacity: [0.5, 1, 0.5],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                y: {
                                    duration: 0.6,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    delay: i * 0.1,
                                },
                                opacity: {
                                    duration: 0.6,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    delay: i * 0.1,
                                },
                                scale: {
                                    duration: 0.6,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    delay: i * 0.1,
                                }
                            }}
                        />
                    ))}
                </div>

                {/* Progress bar */}
                <div className="w-64 sm:w-80 h-1 bg-gray-700 rounded-full overflow-hidden mb-4">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeInOut" }}
                    />
                </div>

                {/* Loading text */}
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-gray-300 text-sm font-medium"
                >
                    {progress < 100 ? "Loading..." : "Redirecting..."}
                </motion.div>

                {/* App name */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute bottom-10 text-center"
                >
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">EduManage</h1>
                    <p className="text-gray-400 text-sm mt-1">School Management System</p>
                </motion.div> */}
            </div>
        </div>
    );
}