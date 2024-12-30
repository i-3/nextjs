'use client';

import {
  HomeModernIcon,
  LanguageIcon,
  ChatBubbleLeftRightIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

export function Links() {
  const pathname = usePathname();

  const links = [
    { href: '/', icon: HomeModernIcon },
    { href: '/videos', icon: LanguageIcon },
    { href: '/chat', icon: ChatBubbleLeftRightIcon },
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
        theme == 'dark' ? setTheme('light') : setTheme('dark');
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
