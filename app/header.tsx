import { LogIn, LogOut } from 'lucide-react';
import { signOut } from '@/auth';
import { Links } from './ui/links';
import Link from 'next/link';
import { auth } from '../auth';
import { ModeToggle } from '@/components/mode-toggle';

export default async function Header() {
  const session = await auth();

  return (
    <div className=' px-4 md:w-96 md:self-center h-16 flex justify-between items-center'>
      {session?.user && <Links />}

      {!session?.user ? (
        <Link
          href={'/login'}
          className=' absolute right-28 flex h-12 w-12 items-center justify-center
          hover:bg-muted'
        >
          <LogIn />
        </Link>
      ) : (
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
          className='md:absolute md:right-28 flex h-12 w-12 items-center justify-center
          hover:bg-muted'
        >
          <button>
            <LogOut className='scale-75 md:scale-100' />
          </button>
        </form>
      )}

      <ModeToggle />
    </div>
  );
}
