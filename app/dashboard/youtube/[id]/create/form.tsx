'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createTrainer, State__ } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form({ videoid }: { videoid: string }) {
  const initialState: State__ = { message: null, errors: {} };
  const [state, formAction] = useActionState(createTrainer, initialState);

  return (
    <form action={formAction}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className='rounded-md bg-gray-800 p-4 md:p-6'>
          <div className='mb-4'>
            <label
              htmlFor='amount'
              className='mb-2 block text-sm font-medium text-gray-100'
            >
              {(i == 0 && 'Enter a videoID') ||
                (i == 1 && 'Enter a title') ||
                (i == 2 && 'Enter a start') ||
                (i == 3 && 'Enter a stop')}
            </label>

            <div className='relative mt-2 rounded-md'>
              <div className='relative'>
                <input
                  id={
                    (i == 0 && 'videoid') ||
                    (i == 1 && 'title') ||
                    (i == 2 && 'start') ||
                    (i == 3 && 'stop') ||
                    ''
                  }
                  name={
                    (i == 0 && 'videoid') ||
                    (i == 1 && 'title') ||
                    (i == 2 && 'start') ||
                    (i == 3 && 'stop') ||
                    ''
                  }
                  type='string'
                  // step='0.01'
                  defaultValue={(i == 0 && videoid) || ''}
                  placeholder={
                    (i == 0 && 'Enter a videoID') ||
                    (i == 1 && 'Enter a title') ||
                    (i == 2 && 'Enter a start') ||
                    (i == 3 && 'Enter a stop') ||
                    ''
                  }
                  className='bg-gray-900 peer block w-full rounded-md border border-gray-700 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
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
                ))}b
            </div> */}
          </div>
        </div>
      ))}

      <div className='mt-6 flex justify-end gap-4'>
        <Link
          href={`/dashboard/youtube/${videoid}`}
          className='flex h-10 items-center rounded-lg bg-gray-800 px-4 text-sm font-medium text-gray-100 transition-colors hover:bg-gray-600'
        >
          Cancel
        </Link>

        <Button type='submit'>Create Trainer</Button>
      </div>
    </form>
  );
}
