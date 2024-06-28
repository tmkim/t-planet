// import Image from 'next/image';
import { UpdateFlashcard, DeleteFlashcard, ReadFlashcard, CreateFlashcard } from '@/app/ui/flashcards/buttons';
import { fetchFilteredFlashcards, fetchFlashcardsPages } from '@/app/lib/data';
import FCSearch from '../flashcards/search';
import FCPagination from '../flashcards/pagination';
import { Flashcard } from '@/app/lib/definitions';
import { useEffect, useState } from 'react';

export interface FormProps {
  result: boolean;
  isChecked: boolean;
  callTime: any;
}

export default function TempTable({
  fcl,
  cs
}: {
  fcl: Flashcard[]
  cs: String[]
}) {

  // get flashcards associated to cardset
  // if fcid in cs, checkbox default checked


  const onChangeCheckBox = (e: {
    target: { checked: boolean; value: String };
  }) => {
    if (e.target.checked) {
      cs.push(e.target.value)
    } else {
      cs.splice(cs.indexOf(e.target.value), 1)
    }
    // console.log(cs)
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="h-96 border-separate overflow-clip rounded-xl border border-solid flex flex-col">

          {/* <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <FCSearch placeholder="Search Flashcards..." />
          </div> */}
          {/* <Suspense key={fcquery + currentFCPage} fallback={<FlashcardTableSkeleton />}> */}
          <table className="min-w-full text-gray-900">
            <thead className="sticky bg-gray-300 rounded-lg text-left text-md font-bold">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Flash Cards
                </th>
                {/* <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Back Text
                </th> */}
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
          </table>
          <div className="flex-1 overflow-y-auto">
            <table className="min-w-full text-gray-900 md:table">
              <tbody className="bg-white">
                {fcl.map((flashcard) => (
                  <tr
                    key={flashcard.fcid}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{flashcard.front_text}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{flashcard.back_text}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <input
                        type="checkbox"
                        value={flashcard.fcid}
                        name="include"
                        onChange={onChangeCheckBox}
                        id={flashcard.fcid}
                      // checked={flashcard.checked}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <FlashcardsTable query={fcquery} currentPage={currentFCPage} /> */}
            {/* </Suspense> */}
            {/* <div className="mt-5 flex w-full justify-center">
            <FCPagination totalPages={totalFCPages} />
          </div> */}
          </div>
        </div>
      </div>
    </div >
  );
}
