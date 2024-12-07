import Form from './form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const videoid = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: `YouTube / ${videoid}`, href: '/dashboard/youtube' },
          {
            label: 'Create Trainer',
            href: `/dashboard/youtube/${videoid}/create`,
            active: true,
          },
        ]}
      />

      <Form videoid={videoid} />
    </main>
  );
}
