'use client';

import React from 'react';
import { useUIStore } from '@/store/useUIStore';

const SidebarToggleButton = () => {
  const { toggleSidebar, sidebarOpen } = useUIStore();

  return (
    <div
      className={`fixed top-4 z-50 transition-all ${sidebarOpen ? 'left-64' : 'left-4'
        }`}
    >
      <button
        className={`bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-2 rounded-md shadow-lg absolute right-0 transition-all ${sidebarOpen ? 'translate-x-5' : 'translate-x-8'
          }`}
        onClick={toggleSidebar}
      >
        {/* Hamburger Icon */}
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default SidebarToggleButton;
