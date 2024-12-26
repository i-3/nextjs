'use client';

import AcmeLogo from '@/app/ui/acme-logo';
import { lusitana } from '@/app/ui/fonts';
import { authenticate } from '@/app/lib/actions';
import { useActionState } from 'react';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import clsx from 'clsx';

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className='relative m-auto w-full max-w-[400px] flex-col space-y-2.5 p-4'>
      <div className='flex h-20 w-full items-end rounded-lg bg-primary p-3 md:h-36'>
        <div className='w-32  md:w-36'>{/* <AcmeLogo /> */}</div>
      </div>

      <form action={formAction} className='space-y-3'>
        <div className='flex-1 rounded-lg bg-muted px-6 pb-4 pt-8'>
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Please log in to continue.
          </h1>
          <div className='w-full'>
            <div>
              <label
                className='mb-3 mt-5 block text-xs font-medium 
                '
                htmlFor='email'
              >
                Email: user@nextmail.com
              </label>

              <div className='relative'>
                <input
                  className={clsx(
                    'peer block w-full rounded-md border  py-[9px] pl-10 text-sm',
                    ' outline-2 placeholder:text-neutral-500'
                  )}
                  id='email'
                  type='email'
                  name='email'
                  placeholder='Enter your email address'
                  required
                />
                <AtSymbolIcon
                  className={clsx(
                    'pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px]',
                    ' -translate-y-1/2 text-neutral-500 peer-focus:text-foreground'
                  )}
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
                  className={clsx(
                    'peer block w-full rounded-md border  py-[9px] pl-10 text-sm',
                    ' outline-2 placeholder:text-neutral-500'
                  )}
                  id='password'
                  type='password'
                  name='password'
                  placeholder='Enter password'
                  required
                  minLength={6}
                />
                <KeyIcon
                  className={clsx(
                    'pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px]',
                    ' -translate-y-1/2 text-neutral-500 peer-focus:text-foreground'
                  )}
                />
              </div>
            </div>
          </div>

          <Button className='mt-8 w-full' aria-disabled={isPending}>
            Log in <ArrowRightIcon className='ml-auto h-5 w-5 ' />
          </Button>

          <div
            className='flex h-8 items-end space-x-1'
            aria-live='polite'
            aria-atomic='true'
          >
            {errorMessage && (
              <>
                <ExclamationCircleIcon className='h-5 w-5 text-red-500' />
                <p className='text-sm text-red-500'>{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
