'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Add scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <span className={`text-2xl font-bold bg-gradient-to-r ${scrolled ? 'from-blue-600 to-indigo-700' : 'from-blue-500 to-purple-600'} text-transparent bg-clip-text transition-all duration-300`}>
                                EduManage
                            </span>
                        </div>

                        {/* Desktop menu */}
                        <div className="hidden md:ml-10 md:flex md:space-x-8">
                            <Link href="/" className={`${scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
                                Home
                            </Link>
                            <Link href="/features" className={`${scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
                                Features
                            </Link>
                            <Link href="/pricing" className={`${scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
                                Pricing
                            </Link>
                            <Link href="/testimonials" className={`${scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
                                Testimonials
                            </Link>
                            <Link href="/contact" className={`${scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="hidden md:flex md:space-x-3">
                            <Link href="/login" className={`${scrolled ? 'text-blue-600 border-blue-600 hover:bg-blue-50' : 'text-white border-white hover:bg-white hover:bg-opacity-10'} border px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200`}>
                                Log In
                            </Link>
                            <Link href="/signup" className="text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 px-5 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200">
                                Get Started
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={toggleMenu}
                                className={`inline-flex items-center justify-center p-2 rounded-md ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white hover:bg-opacity-10'} focus:outline-none transition-colors duration-200`}
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isMenuOpen ? (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {isMenuOpen && (
                <div className="md:hidden absolute w-full">
                    <div className="bg-white shadow-lg rounded-b-lg mx-4 px-4 pt-4 pb-6 space-y-3">
                        <Link href="/" className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200">
                            Home
                        </Link>
                        <Link href="/features" className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200">
                            Features
                        </Link>
                        <Link href="/pricing" className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200">
                            Pricing
                        </Link>
                        <Link href="/testimonials" className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200">
                            Testimonials
                        </Link>
                        <Link href="/contact" className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200">
                            Contact
                        </Link>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Link href="/login" className="text-blue-600 border-blue-600 hover:bg-blue-50 border text-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200">
                                Log In
                            </Link>
                            <Link href="/signup" className="text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-center px-4 py-3 rounded-lg text-sm font-medium shadow-md transition-all duration-200">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;