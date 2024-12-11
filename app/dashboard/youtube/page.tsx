import Search from './search';
import Pagination from './pagination';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteVideo } from '@/app/lib/actions';
// import { sql } from '@vercel/postgres';
const pool = require('../../../db');

export const metadata: Metadata = {
  title: 'YouTube',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  // const searchParams = await props.searchParams;
  // const query = searchParams?.query || '';
  // const currentPage = Number(searchParams?.page) || 1;
  // const totalPages = await fetchInvoicesPages(query);

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
    <div className='w-full'>
      <div className='flex w-full items-center justify-between'>
        <h1 className={`${lusitana.className} text-2xl text-neutral-300`}>
          YouTube
        </h1>
      </div>

      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        {/* <Search placeholder='Search videos...' /> */}

        <Link
          href='/dashboard/youtube/create'
          className='flex h-10 items-center rounded-lg bg-lime-600 px-4 text-sm font-medium text-white transition-colors hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600'
        >
          <span className='hidden md:block'>Create Video</span>{' '}
          <PlusIcon className='h-5 md:ml-4' />
        </Link>
      </div>

      {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
      <div className='mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-neutral-800 p-2 md:pt-0'>
            <table className='hidden min-w-full text-neutral-300 md:table'>
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

              <tbody className='bg-white'>
                {videos?.map((video: any) => (
                  <tr
                    key={video.id}
                    className='w-full bg-neutral-900 border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
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
                        <Link
                          href={`/dashboard/youtube/${video.id}/edit`}
                          className='rounded-md border p-2 hover:bg-gray-700'
                        >
                          <PencilIcon className='w-5' />
                        </Link>

                        <form action={deleteVideo.bind(null, video.id)}>
                          <button className='rounded-md border p-2 hover:bg-gray-700'>
                            <span className='sr-only'>Delete</span>

                            <TrashIcon className='w-5' />
                          </button>
                        </form>

                        <Link href={`/dashboard/youtube/${video.videoid}`}>
                          <button className='flex rounded-md border p-2 hover:bg-gray-700'>
                            <span className=''>Trainers</span>
                          </button>
                        </Link>
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
