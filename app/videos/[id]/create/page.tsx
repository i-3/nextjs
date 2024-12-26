import Form from './form';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const videoid = params.id;

  return (
    <main className='w-screen py-8 px-48'>
      <Breadcrumbs
        breadcrumbs={[
          { label: `Videos / ${videoid}`, href: '/videos' },
          {
            label: 'Create Trainer',
            href: `/videos/${videoid}/create`,
            active: true,
          },
        ]}
      />

      <Form videoid={videoid} />
    </main>
  );
}
