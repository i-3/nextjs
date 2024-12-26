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
    <div className=' h-20 flex justify-end items-center'>
      {!session?.user ? (
        <Link
          href={'/login'}
          className={clsx(
            'mx-6 flex h-12 w-12 items-center justify-center',
            'rounded-full hover:bg-neutral-500'
          )}
        >
          <ArrowRightEndOnRectangleIcon className='w-6' />
        </Link>
      ) : (
        <>
          <Links />

          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button
              className={clsx(
                'flex mx-6 h-12 w-12 items-center justify-center rounded-full',
                ' hover:bg-neutral-500'
              )}
            >
              <ArrowRightStartOnRectangleIcon className='h-6 text-primary ' />
            </button>

            <div className=' flex absolute w-24 justify-center'>
              <p className='text-xs text-primary'>User</p>
            </div>
          </form>
        </>
      )}

      <ThemeSwitcher />
    </div>
  );
}
