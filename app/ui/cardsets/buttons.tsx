'use client'
import { PencilIcon, PlusIcon, TrashIcon, EyeIcon, MagnifyingGlassPlusIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { copyCardset, deleteCardset } from '@/app/lib/actions';
import { FormEvent, MouseEventHandler, useEffect, useState } from 'react';
import { Cardset, Cardsets_Flashcards_Helper, Cardsets_Helper, Flashcard } from '@/app/lib/definitions';
import { useModal } from '@/app/lib/useModal';
import React from 'react';
import { CreateCSModal, EditCSModal, PreviewCSModal, ViewCSModal } from '@/app/ui/cardsets/modal';

export function CreateCardset({ fcl }: { fcl: Flashcard[] }) {

  const { isShown, toggle } = useModal();

  return (
    <React.Fragment>
      <button
        onClick={toggle}
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        <span className="hidden md:block">Create Card Set</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </button>
      <CreateCSModal fcl={fcl} isShown={isShown} hide={toggle} headerText='Add New Card Set' />
    </React.Fragment>
  );
}

export function BrowseCardsets() {
  return (
    <Link
      href="/dashboard/cardsets/browse"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Browse</span>{' '}
      <MagnifyingGlassPlusIcon className="h-5 md:ml-4" />
    </Link>
  )
}

export function CopyCardset({ cs }: { cs: Cardsets_Helper }) {
  const copyCardsetWithId = copyCardset.bind(null, cs);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!confirm(`Copy card set "${cs.title}" by ${cs.created_by}?`)) {
      e.preventDefault();
    }
  };

  return (
    <form action={copyCardsetWithId} onSubmit={onSubmit}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <DocumentDuplicateIcon className="h-8 w-8" />
      </button>
    </form>
  );
}

export function PreviewCardset({ cs }: { cs: Cardsets_Helper }) {
  const { isShown, toggle } = useModal();

  return (
    <React.Fragment>
      <button
        onClick={toggle}
        className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Update Flashcard</span>{' '}
        <EyeIcon className="w-8 h-8" />
      </button>
      <PreviewCSModal cs={cs} isShown={isShown} hide={toggle} headerText={`Preview Flashcard ${cs.title}`} />
    </React.Fragment>
  );
}

export function ReadCardset({ cs }: { cs: Cardsets_Helper }) {
  const { isShown, toggle } = useModal();
    // console.log(cs)
    return (
    <React.Fragment>
      <button
        onClick={toggle}
        className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Update Flashcard</span>{' '}
        <EyeIcon className="w-5" />
      </button>
      <ViewCSModal cs={cs} isShown={isShown} hide={toggle}/>
    </React.Fragment>
  )
}

export function UpdateCardset({ cs }: { cs: Cardsets_Helper }) {
  const { isShown, toggle } = useModal();

  return (
    <React.Fragment>
      <button
        onClick={toggle}
        className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Update Flashcard</span>{' '}
        <PencilIcon className="w-5" />
      </button>
      <EditCSModal cs={cs} isShown={isShown} hide={toggle} headerText='Update Flashcard' />
    </React.Fragment>
  );
}

export function DeleteCardset({ id, title }: { id: string, title: string }) {
  const deleteCardsetWithId = deleteCardset.bind(null, id);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!confirm(`Delete card set ${title}?`)) {
      e.preventDefault();
    }
  };

  return (
    <form action={deleteCardsetWithId} onSubmit={onSubmit}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}