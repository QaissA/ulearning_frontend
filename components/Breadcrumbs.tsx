'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Fragment } from 'react';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav className="mx-6 mb-6">
      <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 px-4 py-3 shadow-sm">
        <ol className="flex items-center space-x-2 text-sm">
          {/* Home Link */}
          <li className="flex items-center">
            <Link
              href="/"
              className="group flex items-center space-x-1 px-2 py-1 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105"
            >
              <Home className="w-4 h-4 text-gray-500 group-hover:text-indigo-600 transition-colors duration-200" />
              <span className="font-medium">Home</span>
            </Link>
          </li>

          {/* Breadcrumb Segments */}
          {segments.map((segment, index) => {
            const path = '/' + segments.slice(0, index + 1).join('/');
            const isLast = index === segments.length - 1;
            const decodedSegment = decodeURIComponent(segment);
            const displayName = decodedSegment.charAt(0).toUpperCase() + decodedSegment.slice(1).replace(/-/g, ' ');

            return (
              <Fragment key={path}>
                {/* Separator */}
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />

                <li
                  className="flex items-center animate-in fade-in duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {isLast ? (
                    <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 text-indigo-700 font-semibold text-sm shadow-sm">
                      {displayName}
                    </span>
                  ) : (
                    <Link
                      href={path}
                      className="group px-2 py-1 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105 font-medium"
                    >
                      <span className="relative">
                        {displayName}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  )}
                </li>
              </Fragment>
            );
          })}
        </ol>

        {/* Optional: Path indicator */}
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded-md inline-block">
            {pathname || '/'}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;