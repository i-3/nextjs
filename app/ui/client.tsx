'use client';

import {
  HomeIcon,
  LanguageIcon,
  ChatBubbleLeftRightIcon,
  MoonIcon,
  SunIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

export function Links() {
  const pathname = usePathname();

  const links = [
    { href: '/', icon: HomeIcon },
    { href: '/videos', icon: LanguageIcon },
    { href: '/chat', icon: ChatBubbleLeftRightIcon },
    { href: '/pinecone', icon: DocumentTextIcon },
  ];

  return links.map((link, k) => {
    const LinkIcon = link.icon;

    return (
      <Link
        key={k}
        href={link.href}
        className={clsx(
          'mr-12 flex h-10 w-10 items-center justify-center',
          'rounded-full hover:bg-neutral-500',
          pathname === link.href && 'text-primary'
        )}
      >
        <LinkIcon className='w-6' />
      </Link>
    );
  });
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className={clsx(
        'flex mr-2 h-10 w-10 items-center justify-center',
        ' rounded-full hover:bg-neutral-500'
      )}
      onClick={() => {
        if (theme == 'dark') setTheme('light');
        else setTheme('dark');
      }}
    >
      {theme == 'dark' ? (
        <MoonIcon className='h-6' />
      ) : (
        <SunIcon className='h-6' />
      )}
    </button>
  );
}
