import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteVideo } from '@/app/lib/actions';
import { DeleteVideo } from './buttons';
import clsx from 'clsx';

const pool = require('../../db');

export const metadata: Metadata = {
  title: 'YouTube',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  type Video = {
    id: string;
    uploaded: string;
    title: string;
    videoid: string;
    date: string;
  };

  async function fetchVideos() {
    try {
      const data = await pool.query(`SELECT * FROM videos`);

      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch videos.');
    }
  }

  const videos = await fetchVideos();

  return (
    <div className=' p-8 w-full'>
      <div className='flex w-full items-center justify-between'>
        <h1 className={`${lusitana.className} text-2xl `}>YouTube</h1>
      </div>

      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        {/* <Search placeholder='Search videos...' /> */}

        <Link
          href='/youtube/create'
          className={clsx(
            'flex h-10 items-center rounded-lg bg-muted',
            ' px-4 text-sm font-medium  transition-colors',
            ' hover:bg-primary '
          )}
        >
          <PlusIcon className='h-5 ' />
        </Link>
      </div>

      {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
      <div className='mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-muted p-2 md:pt-0'>
            <table className='hidden min-w-full  md:table'>
              <thead className='rounded-lg text-left text-sm font-normal'>
                <tr>
                  <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                    Uploaded
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Title
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Video ID
                  </th>
                </tr>
              </thead>

              <tbody className=''>
                {videos?.map((video: any) => (
                  <tr
                    key={video.id}
                    className='w-full bg-background border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                  >
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      {video.uploaded}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {video.title}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {video.videoid}
                    </td>
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <div className='flex justify-end gap-3'>
                        <Link href={`/youtube/${video.videoid}`}>
                          <button className='flex rounded-md border py-2 px-4 mr-12 hover:bg-muted'>
                            Trainers
                          </button>
                        </Link>

                        <Link
                          href={`/youtube/${video.id}/edit`}
                          className='rounded-md border p-2 hover:bg-muted'
                        >
                          <PencilIcon className='w-5' />
                        </Link>

                        <DeleteVideo id={video.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* </Suspense> */}

      {/* <div className='mt-5 flex w-full justify-center'>
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}
