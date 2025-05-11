'use client'

import { useAuthStore } from "@/store/useAuthStore";
import { useUIStore } from "@/store/useUIStore";
import { useRouter } from "next/navigation";
import React from "react";
import Link from 'next/link';

const Sidebar = () => {
    const router = useRouter();
    const { user } = useAuthStore();
    const { sidebarOpen, toggleSidebar } = useUIStore();

    return (
        <aside
            className={`fixed left-0 top-0 z-40 h-screen w-72 transform bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white transition-all duration-500 ease-in-out shadow-2xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <div className="flex h-full flex-col">
                {/* Sidebar header with animation */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-blue-800">
                    <div className="flex items-center space-x-2 transition-all duration-300 hover:scale-105">
                        <svg
                            className="h-8 w-8 text-blue-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                        </svg>
                        <span className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">EduManage</span>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="rounded-full p-1 hover:bg-blue-800 transition-all duration-300 lg:hidden"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* User profile section with animations */}
                {user && (
                    <div className="flex flex-col items-center px-4 py-6 border-b border-blue-800 relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-800 bg-opacity-20 backdrop-blur-sm"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-1 shadow-lg transition-transform duration-300 hover:scale-105">
                                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-blue-400 text-2xl font-bold">
                                    {user.name[0].toUpperCase()}
                                </div>
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-white">{user.name}</h3>
                            <p className="text-sm text-blue-300">{user.email}</p>
                            <div className="mt-2 px-4 py-1 bg-blue-800 bg-opacity-50 text-blue-200 rounded-full text-xs font-medium shadow-md transition-all duration-300 hover:bg-opacity-70">
                                {/* {user.role.name} */}
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation with hover effects and animations */}
                <nav className="flex-1 overflow-y-auto py-6 px-4">
                    <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-blue-400">
                        Main
                    </div>
                    <ul className="space-y-1">
                        <li>
                            <Link href="/dashboard" className="group flex items-center px-4 py-2.5 text-white rounded-xl hover:bg-blue-800 hover:bg-opacity-50 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                <span className="relative z-10 flex items-center">
                                    <svg className="h-5 w-5 mr-3 text-blue-400 transition-transform duration-300 group-hover:rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/students" className="group flex items-center px-4 py-2.5 text-white rounded-xl hover:bg-blue-800 hover:bg-opacity-50 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                <span className="relative z-10 flex items-center">
                                    <svg className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    Students
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/courses" className="group flex items-center px-4 py-2.5 text-white rounded-xl hover:bg-blue-800 hover:bg-opacity-50 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                <span className="relative z-10 flex items-center">
                                    <svg className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Courses
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/grades" className="group flex items-center px-4 py-2.5 text-white rounded-xl hover:bg-blue-800 hover:bg-opacity-50 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                <span className="relative z-10 flex items-center">
                                    <svg className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Grades
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/calendar" className="group flex items-center px-4 py-2.5 text-white rounded-xl hover:bg-blue-800 hover:bg-opacity-50 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                <span className="relative z-10 flex items-center">
                                    <svg className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Calendar
                                </span>
                            </Link>
                        </li>
                    </ul>

                    <div className="mt-8 mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-blue-400">
                        Administration
                    </div>
                    <ul className="space-y-1">
                        <li>
                            <Link href="/settings" className="group flex items-center px-4 py-2.5 text-white rounded-xl hover:bg-blue-800 hover:bg-opacity-50 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                <span className="relative z-10 flex items-center">
                                    <svg className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Settings
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/reports" className="group flex items-center px-4 py-2.5 text-white rounded-xl hover:bg-blue-800 hover:bg-opacity-50 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                <span className="relative z-10 flex items-center">
                                    <svg className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Reports
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Animated logout button */}
                {/* <div className="border-t border-blue-800 p-4">
                    <button
                        className="group flex w-full items-center justify-center px-4 py-3 rounded-xl bg-blue-800 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                        <span className="relative z-10 flex items-center font-medium">
                            <svg className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </span>
                    </button>
                </div> */}
            </div>
        </aside>
    );
};

export default Sidebar;