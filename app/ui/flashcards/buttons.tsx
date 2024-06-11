'use client'
import { PencilIcon, PlusIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteFlashcard } from '@/app/lib/actions';
import { FormEvent, useEffect, useState } from 'react';
import { useModal } from '@/app/lib/useModal';
import { Modal } from '@/app/ui/myModal';
import React from 'react'
import FlashcardCreateForm from './create-form';
import FlashcardEditForm from './edit-form';
import { fetchFlashcardById } from '@/app/lib/data';
import { FlashcardForm } from '@/app/lib/definitions';

export function CreateFlashcard() {
  const { isShown, toggle } = useModal();

  const content = <FlashcardCreateForm/>
  return (
    <React.Fragment>
      <button 
        onClick={toggle}
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          <span className="hidden md:block">Create Flashcard</span>{' '}
          <PlusIcon className="h-5 md:ml-4" />
      </button>
      <Modal isShown={isShown} hide={toggle} modalContent={content} headerText='Add New Flashcard'/>
    </React.Fragment>

    // <Link
    //   href="/dashboard/flashcards/create"
    //   className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    // >
    //   <span className="hidden md:block">Create Flashcard</span>{' '}
    //   <PlusIcon className="h-5 md:ml-4" />
    // </Link>
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

// export function UpdateFlashcard({ id }: { id: string }) {
export function UpdateFlashcard({
  fc,
}: {
  fc: FlashcardForm;
}) {
  const { isShown, toggle } = useModal();
  const content = <FlashcardEditForm fc={fc}/>
  // const content = <FlashcardCreateForm/>
  // const fetchFlashcardByIdAction = fetchFlashcardById.bind(null, id)

  return (
    <React.Fragment>
      {/* <form action={fetchFlashcardByIdAction}> */}
        <button 
          // formAction={fetchFlashcardByIdAction}
          onClick={toggle}
          className="rounded-md border p-2 hover:bg-gray-100">
            <span className="sr-only">Update Flashcard</span>{' '}
            <PencilIcon className="w-5" />
        </button>
        <Modal isShown={isShown} hide={toggle} modalContent={content} headerText='Update Flashcard'/>
    </React.Fragment>
  );
}

export function DeleteFlashcard({ id, ft }: { id: string, ft: string }) {
  const deleteFlashcardWithId = deleteFlashcard.bind(null, id);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!confirm(`Delete flashcard ${ft}?`)) {
      e.preventDefault();
    }
  };

  return (
    <form action={deleteFlashcardWithId} onSubmit={onSubmit}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
