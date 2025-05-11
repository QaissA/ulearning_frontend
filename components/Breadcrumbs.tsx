'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Fragment } from 'react';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav className="text-sm text-gray-600 mb-4 mx-6">
      <ol className="list-reset flex">
        <li>
          <Link href="/" className="text-blue-500 hover:underline">Home</Link>
        </li>
        {segments.map((segment, index) => {
          const path = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;
          return (
            <Fragment key={path}>
              <span className="mx-2">/</span>
              <li>
                {isLast ? (
                  <span className="text-gray-800 font-semibold capitalize">{decodeURIComponent(segment)}</span>
                ) : (
                  <Link href={path} className="text-blue-500 hover:underline capitalize">
                    {decodeURIComponent(segment)}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
