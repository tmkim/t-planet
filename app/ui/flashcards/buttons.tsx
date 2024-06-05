import { PencilIcon, PlusIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteFlashcard } from '@/app/lib/actions';

export function CreateFlashcard() {
  return (
    <Link
      href="/dashboard/flashcards/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Flashcard</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function ReadFlashcard({ id }: { id: string }) {
  return (
    <Link
      href = {`/dashboard/flashcards/read/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
      >
        <EyeIcon className="w-5" />
      </Link>
  )
}

export function UpdateFlashcard({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/flashcards/edit/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteFlashcard({ id }: { id: string }) {
  const deleteFlashcardWithId = deleteFlashcard.bind(null, id);
  return (
    <form action={deleteFlashcardWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
