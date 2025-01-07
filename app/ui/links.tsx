'use client';

import { House, Languages, MessagesSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Links() {
  const pathname = usePathname();

  const links = [
    { href: '/', icon: House },
    { href: '/videos', icon: Languages },
    { href: '/chat', icon: MessagesSquare },
  ];

  return links.map((link, k) => {
    const LinkIcon = link.icon;

    return (
      <Link
        key={k}
        href={link.href}
        className={`flex h-12 w-12 items-center justify-center
          hover:bg-muted ${pathname === link.href && 'text-primary'}`}
      >
        <LinkIcon className='scale-75 md:scale-100' />
      </Link>
    );
  });
}
