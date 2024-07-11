// import Image from 'next/image';
import { Cardset, Flashcard, Cardsets_Flashcards_Helper, Cardsets_Helper } from '@/app/lib/definitions';
import { UpdateCardset, DeleteCardset, ReadCardset, CopyCardset, PreviewCardset } from './buttons';
import { fetchBrowseCardsets, fetchBrowseFCL, fetchCS_FC, fetchFilteredCardsets } from '@/app/lib/data';

export default async function BrowseCardsetsTable({query, currentPage}: {query:string, currentPage: number}) {
  const cardsets = await fetchBrowseCardsets(query, currentPage);

  let cs_help: Cardsets_Helper[] = []
  for (var cs of cardsets){
    const cards = await fetchBrowseFCL(cs.csid)
    const cs_fcl: Cardsets_Helper = {...cs, 'cs_fcl':[], 'cards':[], 'cs_view': cards}
    cs_help.push(cs_fcl)
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="border-separate overflow-clip rounded-xl border border-solid flex flex-col overflow-y-auto">
          <table className="min-w-full text-gray-900 table-fixed md:table">
              <thead className="sticky bg-gray-300 rounded-lg text-left font-bold">
              <tr>
                <th scope="col" className="pr-3 py-3 pl-6 font-medium sm:pl-6 w-1/4">
                  Author
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 border-r border-solid border-slate-900 w-2/4">
                  Title
                </th>
                <th scope="col" className="px-4 py-5 w-1/4"></th>
              </tr>
            </thead>
              <tbody className="bg-white">
                {cs_help?.map((cardset) => (
                  <tr
                    key={cardset.csid}
                    className="w-full border-b py-3 text-lg last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 border-r border-solid w-1/4">
                      <p>{cardset.created_by}</p>
                  </td>
                    <td className="whitespace-nowrap pl-6 pr-6 border-solid w-1/2">
                      <div className="flex items-center gap-3">
                        <p>{cardset.title}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3 w-1/4">
                      <div className="flex justify-end gap-3">
                        <PreviewCardset cs={cardset}/>
                        <CopyCardset cs={cardset}/>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}