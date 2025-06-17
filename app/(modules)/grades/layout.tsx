'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Sidebar from '../../components/sidebar';
import SidebarToggleButton from '@/app/components/SidebarToggleButton';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    useEffect(() => {
        if (hasHydrated && !isAuthenticated) {
            router.push('/auth/signin');
        }
    }, [hasHydrated, isAuthenticated, router]);

    if (!hasHydrated) {
        return null; // or a loading spinner
    }
    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Sidebar Toggle Button */}
            <SidebarToggleButton />

            <main className="sm:ml-64 p-4">
                <div className="container mx-auto px-8 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}