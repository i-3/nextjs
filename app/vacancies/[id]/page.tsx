import { notFound } from 'next/navigation';
import { Divide, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Button } from '@/app/ui/button';
import { pool } from '../../../db';
// import { createVacancy, updateVacancy } from '../actions';
import Vacancy from '../vacancy';
import { vacSchema } from '../columns';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  async function fetchVacancyByID(id: string) {
    try {
      const data = await pool.query(`
        SELECT * FROM vacancies WHERE id = '${id}';
      `);

      return data.rows[0];
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch vacancy.');
    }
  }

  let vacancy;

  const params = await props.params;

  if (params.id == '-') {
    vacancy = {
      id: '-',
    };
  } else {
    vacancy = await fetchVacancyByID(params.id);
    if (!vacancy) {
      notFound();
    }
  }

  // async function updVid(id: string, formData: FormData) {
  //   'use server';
  //   await updateVacancy(id, formData);
  // }

  return (
    <main className='w-96 my-auto mx-auto'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Vacancies', href: '/vacancies' },
          {
            label: 'Edit Vacancy',
            href: `/vacancies/${params.id}`,
            active: true,
          },
        ]}
      />

      <Vacancy {...vacancy} />

      {/* <form action={updVid.bind(null, id)}>
        <div className='rounded-md bg-muted p-4 md:p-6'>
          {[0, 1, 2].map((i) => (
            <div key={i} className='mb-4'>
              <label
                htmlFor='amount'
                className='mb-2 block text-sm font-medium '
              >
                {(i == 0 && 'Employer') ||
                  (i == 1 && 'Vacancy') ||
                  (i == 2 && 'State')}
              </label>

              {i < 2 ? (
                <input
                  className='bg-background  peer block w-full rounded-md border
                    py-2 pl-10 text-sm outline-2 placeholder:text-muted-foreground'
                  id={(i == 0 && 'employer') || (i == 1 && 'vacancy') || ''}
                  name={(i == 0 && 'employer') || (i == 1 && 'vacancy') || ''}
                  type='string'
                  defaultValue={
                    (i == 0 && vacancy.employer) ||
                    (i == 1 && vacancy.vacancy) ||
                    ''
                  }
                  placeholder={
                    (i == 0 && 'Enter uploaded') ||
                    (i == 1 && 'Enter a vacancy') ||
                    ''
                  }
                  required
                />
              ) : (
                <div>
                  {[0, 1].map((i) => (
                    <input
                      key={i}
                      className='bg-background  peer block w-full rounded-md border
                    py-2 pl-10 text-sm outline-2 placeholder:text-muted-foreground'
                      id='state'
                      name='state'
                      type='radio'
                      value={vacancy.state}
                    />
                  ))}
                  <p>{vacancy.state}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='mt-6 flex justify-end gap-4'>
          <Link
            href='/vacancies'
            className='flex h-10 items-center rounded-lg bg-muted px-4 text-sm font-medium  transition-colors hover:bg-muted-foreground'
          >
            Cancel
          </Link>

          <Button type='submit'>Edit Vacancy</Button>
        </div>
      </form> */}
    </main>
  );
}
