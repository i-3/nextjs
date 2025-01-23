'use client';

import { lusitana } from '@/app/ui/fonts';
import { authenticate } from '@/lib/actions';
import { useActionState } from 'react';
import { ArrowRight, AtSign, CircleAlert, Key } from 'lucide-react';
import { Button } from '../ui/button';

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className='py-8 flex justify-center max-w-xs mx-auto rounded-lg bg-muted mt-48'>
      <form action={formAction}>
        <h1 className={`${lusitana.className}  text-2xl`}>
          Please log in to continue.
        </h1>

        <div className='w-full mt-8'>
          <div>
            <label
              className='mb-3 mt-5 block text-xs font-medium'
              htmlFor='email'
            >
              Email: user@nextmail.com
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border  py-[9px] pl-10
                text-sm outline-2 placeholder:text-neutral-500'
                id='email'
                type='email'
                name='email'
                placeholder='Enter your email address'
                required
              />
              <AtSign
                className='pointer-events-none absolute left-3 top-1/2
              h-[18px] w-[18px] -translate-y-1/2 text-neutral-500
              peer-focus:text-foreground'
              />
            </div>
          </div>

          <div className='mt-4'>
            <label
              className='mb-3 mt-5 block text-xs font-medium'
              htmlFor='password'
            >
              Password: 123456
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border py-[9px] pl-10
                text-sm outline-2 placeholder:text-neutral-500'
                id='password'
                type='password'
                name='password'
                placeholder='Enter password'
                required
                minLength={6}
              />
              <Key
                className='pointer-events-none absolute left-3 top-1/2
              h-[18px] w-[18px] -translate-y-1/2 text-neutral-500
              peer-focus:text-foreground'
              />
            </div>
          </div>
        </div>

        <Button className='mt-8 w-full bg-background' aria-disabled={isPending}>
          Log in <ArrowRight className='ml-auto h-5 w-5 ' />
        </Button>

        {errorMessage && (
          <div
            className='flex h-8 items-end space-x-1 bg-red-900'
            aria-live='polite'
            aria-atomic='true'
          >
            <>
              <CircleAlert className='h-5 w-5 text-red-500' />
              <p className='text-sm text-red-500'>{errorMessage}</p>
            </>
          </div>
        )}
      </form>
    </div>
  );
}
