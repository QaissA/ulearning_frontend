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
import { Globe, ChevronDown } from 'lucide-react';

interface NavbarProps {
  user: {
    name: string;
    role: string;
    imageUrl: string;
  };
}

export default function Navbar({ user }: NavbarProps) {
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
  ];

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-0 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo/Brand - Left side */}
          {/* <div className="flex items-center">
            <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="ml-3 text-xl font-semibold text-gray-900 hidden sm:block">
              AppName
            </span>
          </div> */}

          {/* Right side controls */}
          <div className="flex items-center space-x-3 ml-auto">

            {/* Language Selector */}
            <DropdownMenu open={isLangOpen} onOpenChange={setIsLangOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="group h-10 px-3 rounded-xl bg-gray-50 hover:bg-gray-100 border-transparent hover:border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <Globe className="w-4 h-4 text-gray-600 group-hover:text-indigo-600 transition-colors duration-200 mr-2" />
                  <span className="text-sm font-medium text-gray-700 hidden sm:block mr-1">
                    {currentLanguage.substring(0, 3)}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-white rounded-xl shadow-lg border border-gray-100 animate-in slide-in-from-top-2 duration-200"
              >
                {languages.map((lang, index) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang.name)}
                    className="text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150 cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile Section */}
            <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
              <DropdownMenuTrigger asChild>
                <div className="group flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:shadow-md cursor-pointer">
                  <div className="relative">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-indigo-200 transition-all duration-200">
                      <Image
                        src={user.imageUrl}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Online status indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-700 transition-colors duration-200">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white rounded-xl shadow-lg border border-gray-100 animate-in slide-in-from-top-2 duration-200"
              >
                {/* User info header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>

                <div className="py-1">
                  <DropdownMenuItem className="text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150 cursor-pointer">
                    <div className="flex items-center w-full">
                      <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150 cursor-pointer">
                    <div className="flex items-center w-full">
                      <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </div>
                  </DropdownMenuItem>

                  <div className="border-t border-gray-100 my-1"></div>

                  <DropdownMenuLogoutItem className="text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 cursor-pointer">
                    <div className="flex items-center w-full">
                      <svg className="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </div>
                  </DropdownMenuLogoutItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}