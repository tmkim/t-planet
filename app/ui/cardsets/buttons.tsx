'use client'
import { PencilIcon, PlusIcon, TrashIcon, EyeIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteCardset } from '@/app/lib/actions';
import { FormEvent, MouseEventHandler, useEffect, useState } from 'react';
import { Cardset, Cardsets_Flashcards_Helper, Cardsets_Helper, Flashcard } from '@/app/lib/definitions';
import { useModal } from '@/app/lib/useModal';
import React from 'react';
import { CreateCSModal, EditCSModal } from '@/app/ui/cardsets/modal';

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
      href=""
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Browse</span>{' '}
      <MagnifyingGlassPlusIcon className="h-5 md:ml-4" />
    </Link>
  )

}

export function ReadCardset({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/cardsets/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <EyeIcon className="w-5" />
    </Link>
  )
}

export function UpdateCardset({ cs }: { cs: Cardsets_Helper }) {
  const { isShown, toggle } = useModal();

  const testCS = () => {
    toggle()
    for (var fc of cs.cs_fcl){
      console.log(`testing updates - ${fc.checked}`)
    }
  }

  return (
    <React.Fragment>
      <button
        onClick={testCS}
        className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Update Flashcard</span>{' '}
        <PencilIcon className="w-5" />
      </button>
      <EditCSModal fcl={cs.cs_fcl} cs={cs} isShown={isShown} hide={toggle} headerText='Update Flashcard' />
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
