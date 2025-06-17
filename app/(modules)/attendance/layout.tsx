"use client";

import Sidebar from "@/app/components/sidebar";
import SidebarToggleButton from "@/app/components/SidebarToggleButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AttendanceLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/auth/signin');
            return;
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Sidebar />
            <SidebarToggleButton />
            <main className="sm:ml-64 p-4">
                <Breadcrumbs />
                <div className="container mx-auto px-8 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
