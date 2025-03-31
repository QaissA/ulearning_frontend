'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Sidebar from '../../components/sidebar';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
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
            <Sidebar />

            <main className="sm:ml-64 p-4">
                <div className="container mx-auto px-8 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}