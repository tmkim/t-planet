'use client'
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom'
import { TAC_Back, TAC_Front } from '@/app/ui/textarea_custom';

import { createFlashcard } from '@/app/lib/actions';


export default function FlashcardCreateForm() {
  const initialState = {
    message: "",
    errors: {
      front_text: [],
      back_text: [],
      front_img: [],
      back_img: []
    }
  }
  const [state, dispatch] = useFormState(createFlashcard, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="w-full">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="front_text"
          >
            Front Text
          </label>
          <div className="relative">
            <TAC_Front />
            {/* <textarea
              className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 text-center"
              id="front_text"
              name="front_text"
              placeholder="Enter front text here"
              required
            /> */}
          </div>
          <div id="front_text-error" aria-live="polite" aria-atomic="true">
            {state.errors?.front_text &&
              state.errors.front_text.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="w-full">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="front_img"
          >
            Upload Front Image
          </label>
          <div className="relative">
            {/* <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="front_img"
              type="front_img"
              name="front_img"
              placeholder="Enter front image here"
            /> */}
            {/* <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" /> */}
          </div>

          <div id="front_img-error" aria-live="polite" aria-atomic="true">
            {state.errors?.front_img &&
              state.errors.front_img.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div>
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="back_text"
          >
            Back Text
          </label>
          <div className="relative">
            {/* <textarea
              className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 text-center"
              id="back_text"
              name="back_text"
              placeholder="Enter back text here"
              required
            /> */}
            <TAC_Back/>
          </div>
          <div id="back_text-error" aria-live="polite" aria-atomic="true">
            {state.errors?.back_text &&
              state.errors.back_text.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div>
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="back_img"
          >
            Upload Back Image
          </label>
          <div className="relative">
            {/* <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="back_img"
              type="back_img"
              name="back_img"
              placeholder="Enter back image here"
            /> */}
            {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label> */}
            {/* <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" /> */}
          </div>
          <div id="back_img-error" aria-live="polite" aria-atomic="true">
            {state.errors?.back_img &&
              state.errors.back_img.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div className="mt-6 flex justify-end gap-4">
            {/* <Link
              href="/dashboard/flashcards"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link> */}
            {/* Need to add appropriate functionality to the below buttons */}
            <Button type="button">Cancel</Button>
            <Button type="submit">Save + Close</Button>
            <Button type="button">Save + Add New</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
