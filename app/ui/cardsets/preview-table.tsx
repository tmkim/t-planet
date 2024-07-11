// import Image from 'next/image';
import { UpdateFlashcard, DeleteFlashcard, ReadFlashcard, CreateFlashcard } from '@/app/ui/flashcards/buttons';
import { fetchFilteredFlashcards, fetchFlashcardsPages } from '@/app/lib/data';
import FCSearch from '../flashcards/search';
import FCPagination from '../flashcards/pagination';
import { Cardsets_Flashcards_Helper, Cardsets_Helper, Flashcard } from '@/app/lib/definitions';
import { useEffect, useState } from 'react';

export interface FormProps {
  result: boolean;
  isChecked: boolean;
  callTime: any;
}

export default function PreviewTable({
  cs
}: {
  cs: Cardsets_Helper
}) {

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="h-96 border-separate overflow-clip rounded-xl border border-solid flex flex-col">
          {/* <Suspense key={fcquery + currentFCPage} fallback={<FlashcardTableSkeleton />}> */}
          <table className="min-w-full text-gray-900">
            <thead className="sticky bg-gray-300 rounded-lg text-left text-lg font-bold">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Front Text
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Back Text
                </th>
              </tr>
            </thead>
              <tbody className="bg-white">
                {cs.cs_view.map((flashcard) => (
                  <tr
                    key={flashcard.fcid}
                    className="w-full border-b py-3 text-lg last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
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
                  </tr>
                ))}
              </tbody>
            </table>
            {/* </Suspense> */}
            {/* <div className="mt-5 flex w-full justify-center">
            <FCPagination totalPages={totalFCPages} />
          </div> */}
          </div>
        </div>
      </div>
  );
}
