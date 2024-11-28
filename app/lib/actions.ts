'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

const FormSchema_ = z.object({
  id: z.string(),
  uploaded: z.string({
    invalid_type_error: 'Please enter uploaded.',
  }),
  title: z.string({
    invalid_type_error: 'Please enter a title.',
  }),
  videoid: z.string({
    invalid_type_error: 'Please enter a video.',
  }),
  date: z.string(),
});

const CreateVideo = FormSchema_.omit({ id: true, date: true });
const UpdateVideo = FormSchema_.omit({ id: true, date: true });

const FormSchema__ = z.object({
  id: z.string(),
  videoid: z.string({
    invalid_type_error: 'Please enter a videoID.',
  }),
  title: z.string({
    invalid_type_error: 'Please enter a title.',
  }),
  start: z.string({
    invalid_type_error: 'Please enter a start.',
  }),
  stop: z.string({
    invalid_type_error: 'Please enter a stop.',
  }),
  date: z.string(),
});

const CreateTrainer = FormSchema__.omit({ id: true, date: true });
const UpdateTrainer = FormSchema__.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type State_ = {
  errors?: {
    uploaded?: string[];
    title?: string[];
    videoid?: string[];
  };
  message?: string | null;
};

export type State__ = {
  errors?: {
    videoid?: string[];
    title?: string[];
    start?: string[];
    stop?: string[];
  };
  message?: string | null;
};

export async function createTrainer(prevState: State__, formData: FormData) {
  const validatedFields = CreateTrainer.safeParse({
    videoid: formData.get('videoid'),
    title: formData.get('title'),
    start: formData.get('start'),
    stop: formData.get('stop'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Trainer.',
    };
  }

  const { videoid, title, start, stop } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO trainers (videoid, title, start, stop, date)
      VALUES (${videoid}, ${title}, ${start}, ${stop}, ${date})
    `;
  } catch (error) {
    return {
      error,
      message: 'Database Error: Failed to Create Video.',
    };
  }

  // revalidatePath('/dashboard/invoices');
  redirect(`/dashboard/youtube/${videoid}`);
}

export async function updateTrainer(ID: string, formData: FormData) {
  const { videoid, title, start, stop } = UpdateTrainer.parse({
    videoid: formData.get('videoid'),
    title: formData.get('title'),
    start: formData.get('start'),
    stop: formData.get('stop'),
  });

  try {
    await sql`
        UPDATE trainers
        SET videoid = ${videoid}, title = ${title}, start = ${start}, stop = ${stop}
        WHERE id = ${ID}
      `;
  } catch (error) {
    return {
      error,
      // message: 'Database Error: Failed to Update Trainer.',
    };
  }

  // revalidatePath('/dashboard/invoices');
  redirect(`/dashboard/youtube/${videoid}`);
}

export async function deleteTrainer(videoid: string, id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM trainers WHERE id = ${id}`;

    revalidatePath(`/dashboard/youtube/${videoid}`);

    return { message: 'Deleted Trainer.' };
  } catch (error) {
    return {
      error,
      // message: 'Database Error: Failed to Delete Trainer.',
    };
  }
}

export async function createVideo(prevState: State_, formData: FormData) {
  const validatedFields = CreateVideo.safeParse({
    uploaded: formData.get('uploaded'),
    title: formData.get('title'),
    videoid: formData.get('videoid'),
  });

  // console.log(validatedFields.data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Video.',
    };
  }

  const { uploaded, title, videoid } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO videos (uploaded, title, videoid, date)
      VALUES (${uploaded}, ${title}, ${videoid}, ${date})
    `;
  } catch (error) {
    return {
      error,
      message: 'Database Error: Failed to Create Video.',
    };
  }

  // revalidatePath('/dashboard/invoices');
  redirect('/dashboard/youtube');
}

export async function updateVideo(id: string, formData: FormData) {
  const { uploaded, title, videoid } = UpdateVideo.parse({
    uploaded: formData.get('uploaded'),
    title: formData.get('title'),
    videoid: formData.get('videoid'),
  });

  try {
    await sql`
        UPDATE videos
        SET uploaded = ${uploaded}, title = ${title}, videoid = ${videoid}
        WHERE id = ${id}
      `;
  } catch (error) {
    return {
      error,
      // message: 'Database Error: Failed to Update Video.',
    };
  }

  // revalidatePath('/dashboard/invoices');
  redirect('/dashboard/youtube');
}

export async function deleteVideo(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM videos WHERE id = ${id}`;

    // revalidatePath('/dashboard/youtube');
    return { message: 'Deleted Video.' };
  } catch (error) {
    return {
      error,
      // message: 'Database Error: Failed to Delete Invoice.',
    };
  }
}

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      error,
      // message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return {
      error,
      // message: 'Database Error: Failed to Update Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return {
      error,
      // message: 'Database Error: Failed to Delete Invoice.',
    };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}