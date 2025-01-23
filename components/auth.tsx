import { LogIn, LogOut } from 'lucide-react';
import { signOut } from '@/auth';
import Link from 'next/link';
import { auth } from '../auth';

export default async function Auth() {
  const session = await auth();

  return (
    <div className=''>
      {session?.user && (
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
          className=' flex h-10 w-10 items-center justify-center hover:bg-muted
          bg-background rounded-md'
        >
          <button>
            <LogOut size={18} />
          </button>
        </form>
      )}
    </div>
  );
}
