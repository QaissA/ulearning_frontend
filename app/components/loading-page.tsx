"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function LoadingPage() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            router.push("/home");

        }, 5000)
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100 space-x-4">
            {/** First bouncing div */}
            <motion.div
                className="w-[100px] h-[100px] bg-red-500"
                initial={{ borderRadius: "0%", y: 0 }}
                animate={{
                    borderRadius: ["0%", "100%"],
                    y: [0, -50, 0, 3000], // Different bounce height
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.3, 0.6, 1],
                    repeat: Infinity,
                    delay: 0, // No delay for first div
                }}
            />

            {/** Second bouncing div (Delayed) */}
            <motion.div
                className="w-[100px] h-[100px] bg-red-500"
                initial={{ borderRadius: "0%", y: 0 }}
                animate={{
                    borderRadius: ["0%", "100%"],
                    y: [0, -70, 0, 3000], // Different bounce height
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.3, 0.6, 1],
                    repeat: Infinity,
                    delay: 0.2, // Delayed start for staggered effect
                }}
            />

            {/** Third bouncing div (More delay) */}
            <motion.div
                className="w-[100px] h-[100px] bg-red-500"
                initial={{ borderRadius: "0%", y: 0 }}
                animate={{
                    borderRadius: ["0%", "100%"],
                    y: [0, -90, 0, 3000], // Different bounce height
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.3, 0.6, 1],
                    repeat: Infinity,
                    delay: 0.4, // More delay for variation
                }}
            />
        </div>
    )
}