'use server'
// import Image from 'next/image';
import { UpdateFlashcard, DeleteFlashcard, ReadFlashcard, CreateFlashcard } from '@/app/ui/flashcards/buttons';
import { fetchFilteredFlashcards, fetchFlashcardsPages } from '@/app/lib/data';
import FCSearch from '../flashcards/search';
import FCPagination from '../flashcards/pagination';
import { FlashcardsTable } from '@/app/lib/definitions';

export interface FormProps {
  result: boolean;
  isChecked: boolean;
  callTime: any;
}

export default async function CSFlashcardsTable({
  searchParams,
}: {
  searchParams?: {
    fcquery?: string;
    fcpage?: string;
  };
}) {

  const onChangeCheckBox = (e: {
    target: { checked: boolean; value: React.SetStateAction<string> };
  }) => {
    const { value, checked: isChecked } = e.target;
    // setCallTimes((prev) =>
    //   prev.map((ct) => {
    //     if (ct.time === value) ct.isChecked = isChecked;
    //     return ct;
    //   })
    // );
  }
  // const flashcards = await fetchFilteredFlashcards(query, currentPage);
  const fcquery = searchParams?.fcquery || '';
  const currentFCPage = Number(searchParams?.fcpage) || 1;
  // const totalFCPages = await fetchFlashcardsPages(fcquery);
  // const flashcards = await fetchFilteredFlashcards(fcquery, currentFCPage);
  // const flashcards = await fetchFilteredFlashcards('', 1);
  const flashcards: FlashcardsTable[] = []

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
                  Front Text
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
                {flashcards?.map((flashcard) => (
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
                        // onChange={onChangeCheckBox}
                        id={flashcard.fcid}
                      // checked={item.checked}
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
