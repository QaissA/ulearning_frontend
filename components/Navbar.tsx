'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLogoutItem,
} from './ui/dropdown-menu';
import { Button } from './ui/button';

interface NavbarProps {
  user: {
    name: string;
    role: string;
    imageUrl: string;
  };
}

export default function Navbar({ user }: NavbarProps) {
  const [currentLanguage, setCurrentLanguage] = useState('English');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
  ];

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Language Selector */}
          <div className="flex items-center space-x-4 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Image
                    src="/globe.svg"
                    alt="Language Selector"
                    width={20}
                    height={20}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang.name)}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile Section */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={user.imageUrl}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900 hidden sm:block">
                    {user.name}
                  </p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuLogoutItem />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}