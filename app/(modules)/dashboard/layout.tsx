'use client';

import React from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuthStore();
    const { sidebarOpen, toggleSidebar } = useUIStore();

    // Protect dashboard routes
    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/signin');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 z-40 h-screen w-64 transform bg-white transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex h-full flex-col">
                    {/* Sidebar header */}
                    <div className="flex items-center justify-between px-4 py-6">
                        <span className="text-xl font-bold">EduManage</span>
                        <button onClick={toggleSidebar} className="lg:hidden">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Sidebar content */}
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {/* Add your sidebar navigation items here */}
                    </nav>

                    {/* User info */}
                    <div className="border-t border-gray-200 p-4">
                        <div className="flex items-center">
                            <div className="flex-1">
                                <p className="text-sm font-medium">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                            <button
                                onClick={() => {
                                    logout();
                                    router.push('/auth/signin');
                                }}
                                className="text-sm text-red-600 hover:text-red-800"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className={`transition-margin duration-200 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <header className="bg-white shadow">
                    <div className="flex items-center px-4 py-6">
                        <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </header>
                <main className="container mx-auto px-4 py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}