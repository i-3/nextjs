import Breadcrumbs from '@/app/ui/breadcrumbs';
import { notFound } from 'next/navigation';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateTrainer } from '@/app/lib/actions';
import clsx from 'clsx';

const pool = require('../../../../../db');

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
      const data = await pool.query(`
        SELECT * FROM trainers WHERE id = '${ID}';
      `);

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

  async function updTra(id: string, formData: FormData) {
    'use server';
    await updateTrainer(id, formData);
  }

  return (
    <main className='w-screen py-8 px-48'>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: `Videos / ${trainer.videoid}`,
            href: `/videos/${trainer.videoid}`,
          },
          {
            label: `${ID} / Edit Trainer`,
            href: `/videos/${trainer.videoid}/${ID}/edit`,
            active: true,
          },
        ]}
      />

      <form action={updTra.bind(null, ID)}>
        {/* <form> */}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className='rounded-md bg-muted p-4 md:p-6'>
            <div className='mb-4'>
              <label
                htmlFor='amount'
                className='mb-2 block text-sm font-medium '
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
                    className={clsx(
                      'bg-background  peer block w-full rounded-md',
                      ' border  py-2 pl-10 text-sm outline-2',
                      ' placeholder:text-muted-foreground'
                    )}
                    // required
                  />
                  <CurrencyDollarIcon
                    className={clsx(
                      'pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px]',
                      ' -translate-y-1/2 '
                    )}
                  />
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
            href={`/videos/${trainer.videoid}`}
            className={clsx(
              'flex h-10 items-center rounded-lg bg-muted px-4 text-sm',
              ' font-medium  transition-colors hover:bg-muted-foreground'
            )}
          >
            Cancel
          </Link>

          <Button type='submit'>Edit Trainer</Button>
        </div>
      </form>
    </main>
  );
}
