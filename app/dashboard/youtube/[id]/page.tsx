import Search from '@/app/ui/youtube/search';
import Pagination from '@/app/ui/youtube/pagination';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteTrainer } from '@/app/lib/actions';
import { sql } from '@vercel/postgres';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const videoid = params.id;

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
      const data =
        await sql<Trainer>`SELECT * FROM trainers WHERE videoid = ${videoid}`;

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
          className={`${lusitana.className} text-2xl`}
        >{`YouTube / ${videoid}`}</h1>
      </div>

      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        {/* <Search placeholder='Search videos...' /> */}

        <Link
          href={`/dashboard/youtube/${videoid}/create`}
          className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
        >
          <span className='hidden md:block'>Create Trainer</span>{' '}
          <PlusIcon className='h-5 md:ml-4' />
        </Link>
      </div>

      {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
      <div className='mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
            <table className='hidden min-w-full text-gray-900 md:table'>
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
                {trainers?.map((trainer) => (
                  <tr
                    key={trainer.title}
                    className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                  >
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <a
                        href={
                          'https://www.youtube.com/watch' +
                          `?v=${videoid}` +
                          `&loop=10` +
                          `&start=${trainer.start}` +
                          `&end=${trainer.stop}`
                        }
                        target='_blank'
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
                          href={`/dashboard/youtube/${videoid}/${trainer.id}/edit`}
                          className='rounded-md border p-2 hover:bg-gray-100'
                        >
                          <PencilIcon className='w-5' />
                        </Link>

                        <form
                          action={deleteTrainer.bind(null, videoid, trainer.id)}
                        >
                          <button className='rounded-md border p-2 hover:bg-gray-100'>
                            <span className='sr-only'>Delete</span>
                            <TrashIcon className='w-5' />
                          </button>
                        </form>
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
