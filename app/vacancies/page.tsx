import { vacSchema, columns } from './columns';
import { DataTable } from './data-table';
import { pool } from '../../db';

async function getData(): Promise<vacSchema[]> {
  try {
    const data = await pool.query(`SELECT * FROM vacancies`);

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch vacancies.');
  }
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className='container p-8'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
