import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { sql } from '@vercel/postgres';
import { updateTrainer } from '@/app/lib/actions';

export default async function Page(props: { params: Promise<{ ID: string }> }) {
  type TrainerForm = {
    id: string;
    videoid: string;
    title: string;
    start: string;
    stop: string;
    date: string;
  };

  async function fetchTrainerByID(ID: string) {
    try {
      const data = await sql<TrainerForm>`
        SELECT * FROM trainers WHERE id = ${ID};
      `;

      return data.rows[0];
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch trainer.');
    }
  }

  const params = await props.params;
  const ID = params.ID;
  const trainer = await fetchTrainerByID(ID);

  // console.log(v);

  if (!trainer) {
    notFound();
  }

  const updateTrainerWithID = updateTrainer.bind(null, ID);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: `YouTube / ${trainer.videoid}`,
            href: `/dashboard/youtube/${trainer.videoid}`,
          },
          {
            label: `${ID} / Edit Trainer`,
            href: `/dashboard/youtube/${trainer.videoid}/${ID}/edit`,
            active: true,
          },
        ]}
      />

      <form action={updateTrainerWithID}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className='rounded-md bg-gray-50 p-4 md:p-6'>
            <div className='mb-4'>
              <label
                htmlFor='amount'
                className='mb-2 block text-sm font-medium'
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
                    defaultValue={
                      (i == 0 && trainer.videoid) ||
                      (i == 1 && trainer.title) ||
                      (i == 2 && trainer.start) ||
                      (i == 3 && trainer.stop) ||
                      ''
                    }
                    placeholder={
                      (i == 0 && 'Enter a videoID') ||
                      (i == 1 && 'Enter a title') ||
                      (i == 2 && 'Enter a start') ||
                      (i == 3 && 'Enter a stop') ||
                      ''
                    }
                    className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
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
            href={`/dashboard/youtube/${trainer.videoid}`}
            className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
          >
            Cancel
          </Link>

          <Button type='submit'>Edit Trainer</Button>
        </div>
      </form>
    </main>
  );
}
