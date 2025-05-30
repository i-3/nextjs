import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, subject, message } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['iurii.korotkoff@gmail.com'],
      subject: `${subject} (from ${email})`,
      // react: EmailTemplate({ firstName: 'John' }),
      text: message,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    // console.log(data);
    //data = { id: 'd88acf57-172d-44a4-b987-65f9e879c1de' }

    return Response.json(
      { message: 'Email sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
