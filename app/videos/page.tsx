import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteVideo } from '@/app/lib/actions';
import { DeleteVideo } from '../buttons';
import clsx from 'clsx';

const pool = require('../../db');

export const metadata: Metadata = {
  title: 'Videos',
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
      <div className=' h-10'>
        <h1 className={`${lusitana.className} text-2xl `}>Videos</h1>
      </div>

      <div className='flex items-center justify-between mt-4'>
        <Link
          href='/videos/create'
          className={clsx(
            'flex h-10 items-center rounded-lg bg-muted',
            ' px-4 text-sm font-medium  transition-colors',
            ' hover:bg-primary '
          )}
        >
          <PlusIcon className='h-5 ' />
        </Link>
      </div>

      <div className='flex flex-col max-h-[506px] mt-6 rounded-lg bg-muted p-2 pt-0'>
        <table className=''>
          <thead className='rounded-lg text-left text-sm font-normal'>
            <tr>
              <th scope='col' className='px-4 py-5 font-medium '>
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
        </table>
        <div className='flex-1 overflow-y-auto'>
          <table className='hidden min-w-full  md:table'>
            <tbody className=''>
              {videos?.map((video: any) => (
                <tr
                  key={video.id}
                  className='w-full bg-background border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                >
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    {video.uploaded}
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>{video.title}</td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {video.videoid}
                  </td>
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    <div className='flex justify-end gap-3'>
                      <Link href={`/videos/${video.videoid}`}>
                        <button className='flex rounded-md border py-2 px-4 mr-12 hover:bg-muted'>
                          Trainers
                        </button>
                      </Link>

                      <Link
                        href={`/videos/${video.id}/edit`}
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
  );
}
