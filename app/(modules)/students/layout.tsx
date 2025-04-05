'use client'

import Sidebar from "@/app/components/sidebar";
import SidebarToggleButton from "@/app/components/SidebarToggleButton";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StudentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        // Only check for authentication
        if (!isAuthenticated) {
            router.replace('/auth/signin');
            return;
        }
    }, [isAuthenticated, router]);

    // Don't render until authenticated
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
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