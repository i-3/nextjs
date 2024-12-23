'use client';

import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import clsx from 'clsx';
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  MoonIcon,
  SunIcon,
  UserGroupIcon,
  HomeModernIcon,
  DocumentDuplicateIcon,
  LanguageIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

const links = [
  { href: '/', icon: HomeModernIcon },
  { href: '/youtube', icon: LanguageIcon },
  { href: '/chat', icon: ChatBubbleLeftRightIcon },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <div className=' h-20 flex bg-background justify-center items-center'>
      {links.map((link, k) => {
        const LinkIcon = link.icon;

        return (
          <Link
            key={k}
            href={link.href}
            className={clsx(
              'mx-5 flex h-10 w-10 items-center justify-center',
              'rounded-full hover:bg-neutral-500',
              pathname === link.href && 'text-primary'
            )}
          >
            <LinkIcon className='w-6' />
          </Link>
        );
      })}

      <form
        action={async () => {
          // 'use server';
          // await signOut();
        }}
      >
        <button
          className={clsx(
            'mx-5  flex h-10 w-10 items-center justify-center rounded-full',
            ' hover:bg-neutral-500'
          )}
        >
          <ArrowRightEndOnRectangleIcon className='h-6' />
        </button>
      </form>

      <button
        className={clsx(
          'mx-5  flex h-10 w-10 items-center justify-center',
          ' rounded-full hover:bg-neutral-500'
        )}
        onClick={() => {
          theme == 'dark' ? setTheme('light') : setTheme('dark');
        }}
      >
        {theme == 'dark' ? (
          <SunIcon className='h-6' />
        ) : (
          <MoonIcon className='h-6' />
        )}
      </button>
    </div>
  );
}
