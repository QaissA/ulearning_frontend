'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Sidebar from '../../components/sidebar';
import { useUIStore } from '@/store/useUIStore';
import SidebarToggleButton from '@/app/components/SidebarToggleButton';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const { toggleSidebar, sidebarOpen } = useUIStore(); // Access sidebarOpen directly here

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/signin');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Sidebar Toggle Button */}
            <SidebarToggleButton />

            <main className="sm:ml-64 p-4 w-full">
                <div className="container mx-auto px-4 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
