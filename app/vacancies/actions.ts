'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { pool } from '../../db';
import { formSchema } from './vacancy';

export async function query(values: formSchema) {
  // console.log(values);

  if (values.new) {
    try {
      await pool.query(`
      INSERT INTO vacancies (employer, vacancy, state, date)
      VALUES ('${values.employer}', '${values.vacancy}', '${values.state}', '${values.date}')
    `);
    } catch (error) {
      return {
        error,
        message: 'Database Error: Failed to Create Vacancy.',
      };
    }
  } else {
    try {
      await pool.query(`
        UPDATE vacancies
        SET employer = '${values.employer}', vacancy = '${values.vacancy}', state = '${values.state}'
        WHERE id = '${values.id}'
      `);
    } catch (error) {
      return {
        error,
        message: 'Database Error: Failed to update vacancy.',
      };
    }
  }

  // revalidatePath(`/videos/${videoid}`);
  redirect(`/vacancies`);
}

export async function deleteVacancy(id: string) {
  try {
    await pool.query(`DELETE FROM vacancies WHERE id = '${id}'`);
    revalidatePath('/vacancies');
    // return { message: 'Deleted Trainer.' };
  } catch (error) {
    return {
      error,
      message: 'Database Error: Failed to delete vacancy.',
    };
  }
}
