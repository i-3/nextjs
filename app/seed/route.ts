import bcrypt from 'bcrypt';
import { pool } from '../../db';

// const client = await db.connect();

export async function GET() {
  return Response.json({
    message:
      'Uncomment this file and remove this line. You can delete this file when you are finished.',
  });

  // try {
  //   await client.sql`BEGIN`;
  //   await seedUsers();
  //   await seedInvoices();
  //   await seedCustomers();
  //   await seedRevenue();
  //   await client.sql`COMMIT`;

  //   return Response.json({ message: 'Database seeded successfully' });
  // } catch (error) {
  //   await client.sql`ROLLBACK`;
  //   return Response.json({ error }, { status: 500 });
  // }
}

// CREATE TABLE IF NOT EXISTS videos (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   uploaded VARCHAR(255) NOT NULL,
//   title VARCHAR(255) NOT NULL,
//   videoid VARCHAR(255) NOT NULL,
//   date DATE NOT NULL
// );

// CREATE TABLE IF NOT EXISTS trainers (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   videoid VARCHAR(255) NOT NULL,
//   title VARCHAR(255) NOT NULL,
//   start VARCHAR(255) NOT NULL,
//   stop VARCHAR(255) NOT NULL,
//   date DATE NOT NULL
// );

// CREATE TABLE IF NOT EXISTS applications (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   employer VARCHAR(255) NOT NULL,
//   vacancy VARCHAR(255) NOT NULL,
//   state VARCHAR(255) NOT NULL,
//   date DATE NOT NULL
// );
