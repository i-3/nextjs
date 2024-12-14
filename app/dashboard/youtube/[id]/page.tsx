import Search from '@/app/ui/youtube/search';
import Pagination from '@/app/ui/youtube/pagination';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteTrainer } from '@/app/lib/actions';
import { DeleteTrainer } from '../buttons';
// import { sql } from '@vercel/postgres';
const pool = require('../../../../db');

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const videoId = params.id;
  const loop = 9;

  type Trainer = {
    id: string;
    videoid: string;
    title: string;
    start: string;
    stop: string;
    date: string;
  };

  async function fetchTrainers() {
    try {
      const data = await pool.query(
        `SELECT * FROM trainers WHERE videoid = '${videoId}'`
      );

      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch trainers.');
    }
  }

  const trainers = await fetchTrainers();

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between'>
        <h1
          className={`${lusitana.className} text-2xl text-neutral-300`}
        >{`YouTube / ${videoId}`}</h1>
      </div>

      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        {/* <Search placeholder='Search videos...' /> */}

        <Link
          href={`/dashboard/youtube/${videoId}/create`}
          className='flex h-10 items-center rounded-lg bg-lime-600 px-4 text-sm font-medium text-white transition-colors hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600'
        >
          <span className='hidden md:block'>Create Trainer</span>{' '}
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
                    Title
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Start
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Stop
                  </th>
                </tr>
              </thead>

              <tbody className='bg-white'>
                {trainers?.map((trainer: any) => (
                  <tr
                    key={trainer.title}
                    className='w-full bg-neutral-900 border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                  >
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <a
                        href={
                          'https://www.youtube.com/watch' +
                          `?v=${videoId}` +
                          `&loop=${loop}` +
                          `&start=${trainer.start}` +
                          `&end=${trainer.stop}`
                        }
                        target='_blank'
                        className='underline text-lime-600 hover:text-lime-300'
                      >
                        {trainer.title}
                      </a>
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {trainer.start}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {trainer.stop}
                    </td>
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <div className='flex justify-end gap-3'>
                        <Link
                          href={`/dashboard/youtube/${videoId}/${trainer.id}/edit`}
                          className='rounded-md border p-2 hover:bg-gray-700'
                        >
                          <PencilIcon className='w-5' />
                        </Link>

                        <DeleteTrainer id={videoId} ID={trainer.id} />
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
