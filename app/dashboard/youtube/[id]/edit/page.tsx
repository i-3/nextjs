import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
// import { sql } from '@vercel/postgres';
const pool = require('../../../../../db');
import { updateVideo } from '@/app/lib/actions';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  type VideoForm = {
    id: string;
    uploaded: string;
    title: string;
    videoid: string;
    date: string;
  };
  async function fetchVideoByID(id: string) {
    try {
      const data = await pool.query(`
        SELECT * FROM videos WHERE id = '${id}';
      `);

      return data.rows[0];
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch video.');
    }
  }
  const params = await props.params;
  const id = params.id;
  const video = await fetchVideoByID(id);
  // console.log(v);
  if (!video) {
    notFound();
  }
  async function updVid(id: string, formData: FormData) {
    'use server';
    await updateVideo(id, formData);
  }
  const updateInvoiceWithId = updVid.bind(null, id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'YouTube', href: '/dashboard/youtube' },
          {
            label: 'Edit Video',
            href: `/dashboard/youtube/${id}/edit`,
            active: true,
          },
        ]}
      />
      <form action={updateInvoiceWithId}>
        {/* <form> */}
        {[0, 1, 2].map((i) => (
          <div key={i} className='rounded-md bg-gray-800 p-4 md:p-6'>
            <div className='mb-4'>
              <label
                htmlFor='amount'
                className='mb-2 block text-sm font-medium text-gray-50'
              >
                {(i == 0 && 'Enter uploaded') ||
                  (i == 1 && 'Enter a title') ||
                  (i == 2 && 'Enter a video')}
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
                    defaultValue={
                      (i == 0 && video.uploaded) ||
                      (i == 1 && video.title) ||
                      (i == 2 && video.videoid) ||
                      ''
                    }
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
          <Button type='submit'>Edit Video</Button>
        </div>
      </form>
    </main>
  );
}
