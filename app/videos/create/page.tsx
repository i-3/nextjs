'use client';

import Breadcrumbs from '@/app/ui/breadcrumbs';
import { createVideo, State_ } from '@/app/lib/actions';
import { useActionState } from 'react';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function Page() {
  const initialState: State_ = { message: null, errors: {} };
  const [state, formAction] = useActionState(createVideo, initialState);

  return (
    <main className='w-screen py-8 px-48'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Videos', href: '/videos' },
          {
            label: 'Create Video',
            href: '/videos/create',
            active: true,
          },
        ]}
      />

      <form action={formAction}>
        {/* <form> */}
        {[0, 1, 2].map((i) => (
          <div key={i} className='rounded-md bg-muted p-4 md:p-6'>
            <div className='mb-4'>
              <label
                htmlFor='amount'
                className='mb-2 block text-sm font-medium '
              >
                {(i == 0 && 'Enter uploaded') ||
                  (i == 1 && 'Enter a title') ||
                  (i == 2 && 'Enter a video ID')}
              </label>

              <div className='relative mt-2 rounded-md'>
                <div className='relative'>
                  <input
                    id={
                      (i == 0 && 'uploaded') ||
                      (i == 1 && 'title') ||
                      (i == 2 && 'videoid') ||
                      ''
                    }
                    name={
                      (i == 0 && 'uploaded') ||
                      (i == 1 && 'title') ||
                      (i == 2 && 'videoid') ||
                      ''
                    }
                    type='string'
                    // step='0.01'
                    placeholder={
                      (i == 0 && 'Enter uploaded') ||
                      (i == 1 && 'Enter a title') ||
                      (i == 2 && 'Enter a video ID') ||
                      ''
                    }
                    className={clsx(
                      'bg-background peer block w-full',
                      ' rounded-md border  py-2 pl-10 text-sm',
                      ' outline-2 placeholder:text-muted-foreground'
                    )}
                    // required
                  />

                  <CurrencyDollarIcon
                    className={clsx(
                      'pointer-events-none absolute left-3 top-1/2 h-[18px]',
                      ' w-[18px] -translate-y-1/2 '
                    )}
                  />
                </div>
              </div>

              {/* <div id='customer-error' aria-live='polite' aria-atomic='true'>
                {state.errors?.amount &&
                  state.errors.amount.map((error: string) => (
                    <p className='mt-2 text-sm text-red-500' key={error}>
                      {error}
                    </p>
                  ))}
              </div> */}
            </div>
          </div>
        ))}

        <div className='mt-6 flex justify-end gap-4'>
          <Link
            href='/videos'
            className={clsx(
              'flex h-10 items-center rounded-lg bg-muted px-4 text-sm',
              ' font-medium  transition-colors hover:bg-muted-foreground'
            )}
          >
            Cancel
          </Link>

          <Button type='submit'>Create Video</Button>
        </div>
      </form>
    </main>
  );
}
