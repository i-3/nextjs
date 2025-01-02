import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteVideo, deleteTrainer } from '@/app/lib/actions';

export function DeleteVideo({ id }: { id: string }) {
  async function delVid(id: string) {
    'use server';
    await deleteVideo(id);
  }

  return (
    <form action={delVid.bind(null, id)}>
      <button className='rounded-md border p-2 hover:bg-muted'>
        <span className='sr-only'>Delete</span>
        <TrashIcon className='w-5' />
      </button>
    </form>
  );
}

export function DeleteTrainer({ id, ID }: { id: string; ID: string }) {
  async function delTra(id: string, ID: string) {
    'use server';
    await deleteTrainer(id, ID);
  }

  return (
    <form action={delTra.bind(null, id, ID)}>
      <button className='rounded-md border p-2 hover:bg-muted'>
        <span className='sr-only'>Delete</span>
        <TrashIcon className='w-5' />
      </button>
    </form>
  );
}
