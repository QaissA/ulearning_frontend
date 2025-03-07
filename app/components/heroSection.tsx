'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const heroSlides = [
    {
        id: 1,
        heading: "Simplify School Management",
        subheading: "All-in-one platform for administrators, teachers, and students",
        image: "/api/placeholder/1200/800",
        color: "from-blue-600 to-indigo-700"
    },
    {
        id: 2,
        heading: "Track Student Progress",
        subheading: "Comprehensive analytics and reporting for better outcomes",
        image: "/api/placeholder/1200/800",
        color: "from-purple-600 to-pink-600"
    },
    {
        id: 3,
        heading: "Streamline Communication",
        subheading: "Connect teachers, parents and students seamlessly",
        image: "/api/placeholder/1200/800",
        color: "from-emerald-500 to-teal-700"
    }
];

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    // Autoplay functionality
    useEffect(() => {
        if (isAutoplay) {
            autoplayRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
            }, 5000);
        }

        return () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current);
            }
        };
    }, [isAutoplay]);

    // Pause autoplay on hover
    const handleMouseEnter = () => setIsAutoplay(false);
    const handleMouseLeave = () => setIsAutoplay(true);

    // Navigate to specific slide
    const goToSlide = (index: any) => {
        setCurrentSlide(index);
        // Reset autoplay timer when manually changing slides
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            if (isAutoplay) {
                autoplayRef.current = setInterval(() => {
                    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
                }, 5000);
            }
        }
    };

    return (
        <div
            className="relative min-h-screen w-full overflow-hidden bg-gray-900"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/30 z-10"></div>

            {/* Slider */}
            <div className="relative h-screen">
                <AnimatePresence mode="wait">
                    {heroSlides.map((slide, index) => (
                        index === currentSlide && (
                            <motion.div
                                key={slide.id}
                                className="absolute inset-0"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            >
                                {/* Background image */}
                                <div className="absolute inset-0 bg-black">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-70"
                                        style={{ backgroundImage: `url(${slide.image})` }}
                                    ></div>
                                </div>

                                {/* Floating particles effect */}
                                <div className="absolute inset-0 overflow-hidden">
                                    {[...Array(20)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className={`absolute w-2 h-2 rounded-full bg-white bg-opacity-50`}
                                            animate={{
                                                x: [Math.random() * 100, Math.random() * window.innerWidth],
                                                y: [Math.random() * 100, Math.random() * window.innerHeight],
                                                opacity: [0, 0.5, 0],
                                                scale: [0, 1, 0]
                                            }}
                                            transition={{
                                                duration: Math.random() * 20 + 10,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            style={{
                                                left: `${Math.random() * 100}%`,
                                                top: `${Math.random() * 100}%`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>

                {/* Content */}
                <div className="relative h-full flex items-center z-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.6 }}
                                    className="space-y-6 md:space-y-8"
                                >
                                    <motion.h1
                                        className={`text-4xl md:text-6xl font-bold text-white bg-gradient-to-r ${heroSlides[currentSlide].color} bg-clip-text text-transparent`}
                                    >
                                        {heroSlides[currentSlide].heading}
                                    </motion.h1>

                                    <motion.p
                                        className="text-xl md:text-2xl text-gray-200"
                                    >
                                        {heroSlides[currentSlide].subheading}
                                    </motion.p>

                                    <motion.div
                                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <button className={`bg-gradient-to-r ${heroSlides[currentSlide].color} text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                                            Get Started
                                        </button>
                                        <button className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-30 transition-all duration-300">
                                            Learn More
                                        </button>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Slider navigation */}
                            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
                                {heroSlides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                            ? `w-8 bg-gradient-to-r ${heroSlides[currentSlide].color}`
                                            : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex flex-col items-center"
                    >
                        <span className="text-white text-sm font-medium mb-2">Scroll Down</span>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </div> */}
            </div>
        </div>
    );
};

export default HeroSection;