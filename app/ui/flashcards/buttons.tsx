'use client'
import { PencilIcon, PlusIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteFlashcard } from '@/app/lib/actions';
import { FormEvent, useState } from 'react';
import { useModal } from '@/app/lib/useModal';
import React from 'react'
import { Flashcard } from '@/app/lib/definitions';
import { CreateFCModal, EditFCModal, ViewFCModal } from '@/app/ui/flashcards/modal';

export function CreateFlashcard() {
  const { isShown, toggle } = useModal();

  return (
    <React.Fragment>
      <button
        onClick={toggle}
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        <span className="hidden md:block">Create Flashcard</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </button>
      <CreateFCModal isShown={isShown} hide={toggle} headerText='Add New Flashcard' />
    </React.Fragment>
  );
}

export function ReadFlashcard({ fc }: { fc: Flashcard }) {
  const { isShown, toggle } = useModal();

  return (
    <React.Fragment>
      <button
        onClick={toggle}
        className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Read Flashcard</span>{' '}
        <EyeIcon className="w-5" />
      </button>
    <ViewFCModal isShown={isShown} hide={toggle} fc={fc} headerText='View Flashcard' />
    </React.Fragment>
  )
}

export function UpdateFlashcard({ fc }: { fc: Flashcard }) {
  const { isShown, toggle } = useModal();

  return (
    <React.Fragment>
      <button
        onClick={toggle}
        className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Update Flashcard</span>{' '}
        <PencilIcon className="w-5" />
      </button>
      <EditFCModal isShown={isShown} hide={toggle} fc={fc} headerText='Update Flashcard' />
    </React.Fragment>
  );
}

export function DeleteFlashcard({ fc }: { fc: Flashcard }) {
  const deleteFlashcardWithId = deleteFlashcard.bind(null, fc.fcid);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!confirm(`Delete flashcard ${fc.front_text}?`)) {
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
