'use client';

import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { createVideo, State_ } from '@/app/lib/actions';
import { useActionState } from 'react';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

export default function Page() {
  const initialState: State_ = { message: null, errors: {} };
  const [state, formAction] = useActionState(createVideo, initialState);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'YouTube', href: '/dashboard/youtube' },
          {
            label: 'Create Video',
            href: '/dashboard/youtube/create',
            active: true,
          },
        ]}
      />

      {/* <form action={formAction}> */}
      <form>
        {[0, 1, 2].map((i) => (
          <div key={i} className='rounded-md bg-gray-800 p-4 md:p-6'>
            <div className='mb-4'>
              <label
                htmlFor='amount'
                className='mb-2 block text-sm font-medium text-gray-50'
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
                    className='bg-gray-900 text-gray-100 peer block w-full rounded-md border border-gray-700 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                    // required
                  />

                  <CurrencyDollarIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
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
            href='/dashboard/youtube'
            className='flex h-10 items-center rounded-lg bg-gray-800 px-4 text-sm font-medium text-gray-100 transition-colors hover:bg-gray-600'
          >
            Cancel
          </Link>

          <Button type='submit'>Create Video</Button>
        </div>
      </form>
    </main>
  );
}
