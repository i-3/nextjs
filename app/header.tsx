import clsx from 'clsx';
import {
  ArrowRightStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import { Links, ThemeSwitcher } from './ui/client';
import Link from 'next/link';
import { auth } from '../auth';

export default async function Header() {
  const session = await auth();

  return (
    <div className='h-16 flex justify-end items-center'>
      {!session?.user ? (
        <div className='flex items-center'>
          <Link
            href={'/login'}
            className={clsx(
              'flex mr-12 h-10 w-10 items-center justify-center rounded-full',
              'hover:bg-neutral-500'
            )}
          >
            <ArrowRightEndOnRectangleIcon className='h-6' />
          </Link>

          <div className='w-32 '></div>
        </div>
      ) : (
        <>
          <Links />

          <form
            className='flex items-center'
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button
              className={clsx(
                'flex h-10 w-10 items-center justify-center rounded-full',
                ' hover:bg-neutral-500'
              )}
            >
              <ArrowRightStartOnRectangleIcon className='h-6 text-primary ' />
            </button>

            <p className='text-xs text-primary w-32'>User</p>
          </form>
        </>
      )}

      <ThemeSwitcher />
    </div>
  );
}
