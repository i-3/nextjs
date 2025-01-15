import { notFound } from 'next/navigation';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { pool } from '../../../db';
import Vacancy from '../vacancy';

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

  return (
    <main className=' mt-48 max-w-md mx-auto px-4'>
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
    </main>
  );
}
