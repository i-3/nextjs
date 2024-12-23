import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteTrainer } from '@/app/lib/actions';
import { DeleteTrainer } from '../buttons';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import clsx from 'clsx';

const pool = require('../../../db');

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
    <div className='w-full p-8'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'YouTube', href: '/youtube' },
          {
            label: `${videoId}`,
            href: '/youtube/',
            active: true,
          },
        ]}
      />

      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        {/* <Search placeholder='Search videos...' /> */}

        <Link
          href={`/youtube/${videoId}/create`}
          className={clsx(
            'flex h-10 items-center rounded-lg bg-muted px-4 text-sm',
            ' font-medium transition-colors hover:bg-primary '
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

              <tbody className=''>
                {trainers?.map((trainer: any) => (
                  <tr
                    key={trainer.title}
                    className={clsx(
                      'w-full bg-background border-b py-3 text-sm',
                      ' last-of-type:border-none',
                      ' [&:first-child>td:first-child]:rounded-tl-lg',
                      ' [&:first-child>td:last-child]:rounded-tr-lg',
                      ' [&:last-child>td:first-child]:rounded-bl-lg',
                      ' [&:last-child>td:last-child]:rounded-br-lg'
                    )}
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
                        className=' text-primary hover:underline'
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
                          href={`/youtube/${videoId}/${trainer.id}/edit`}
                          className='rounded-md border p-2 hover:bg-muted'
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
