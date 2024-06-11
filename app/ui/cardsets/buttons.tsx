'use client'
import { PencilIcon, PlusIcon, TrashIcon, EyeIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteCardset } from '@/app/lib/actions';
import { FormEvent } from 'react';
import { Cardset } from '@/app/lib/definitions';
import { useModal } from '@/app/lib/useModal';
import React from 'react';
import { Modal } from '../myModal';
import CardsetEditForm from './edit-form';

export function CreateCardset() {
  return (
    <Link
      href="/dashboard/cardsets/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add New</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function BrowseCardsets() {
  return (
    <Link
    href = ""
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
      href = {`/dashboard/cardsets/read/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
      >
        <EyeIcon className="w-5" />
      </Link>
  )
}

export function UpdateCardset({ cs }: { cs: Cardset }) {
  const { isShown, toggle } = useModal();
  const content = <CardsetEditForm cs={cs}/>

  return (
    <React.Fragment>
        <button 
          onClick={toggle}
          className="rounded-md border p-2 hover:bg-gray-100">
            <span className="sr-only">Update Flashcard</span>{' '}
            <PencilIcon className="w-5" />
        </button>
        <Modal isShown={isShown} hide={toggle} modalContent={content} headerText='Update Flashcard'/>
    </React.Fragment>
  );
}

export function DeleteCardset({ id, name }: { id: string, name: string }) {
  const deleteCardsetWithId = deleteCardset.bind(null, id);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!confirm(`Delete flashcard ${name}?`)) {
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
