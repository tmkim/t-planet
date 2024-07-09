// import Image from 'next/image';
import { UpdateFlashcard, DeleteFlashcard, ReadFlashcard, CreateFlashcard } from '@/app/ui/flashcards/buttons';
// import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredFlashcards } from '@/app/lib/data';

export default async function FlashcardsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const flashcards = await fetchFilteredFlashcards(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="h-96 border-separate overflow-clip rounded-xl border border-solid flex flex-col">
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
                    {/* <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{flashcard.back_text}</p>
                    </div>
                  </td> */}
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <ReadFlashcard fc={flashcard} />
                        <UpdateFlashcard fc={flashcard} />
                        {/* <CreateFlashcard/> */}
                        <DeleteFlashcard fc={flashcard} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  );
}
