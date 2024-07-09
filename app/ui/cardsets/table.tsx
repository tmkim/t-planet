// import Image from 'next/image';
import { Cardset, Flashcard, Cardsets_Flashcards_Helper, Cardsets_Helper } from '@/app/lib/definitions';
import { UpdateCardset, DeleteCardset, ReadCardset } from './buttons';
import { fetchCS_FC, fetchFilteredCardsets } from '@/app/lib/data';

export default async function CardsetsTable({
  query,
  currentPage,
  fcl,
}: {
  query: string;
  currentPage: number;
  fcl: Flashcard[];
}) {
  const cardsets = await fetchFilteredCardsets(query, currentPage);

  let cs_fcl_checked: Cardsets_Helper[] = []
  for (var cs of cardsets){
    const cards = await fetchCS_FC(cs.csid)
    let cs_view: Flashcard[] = []
    var temp_fcl:Cardsets_Flashcards_Helper[] = []
    for (var fc of fcl){
      if (cards.includes(fc.fcid)){
        temp_fcl.push({...fc, checked: true})
        cs_view.push(fc)
      }
      else{
        temp_fcl.push({...fc, checked: false})
      }
    }
    const cs_fcl: Cardsets_Helper = {...cs, 'cs_fcl':temp_fcl, 'cards':cards, 'cs_view': cs_view}
    cs_fcl_checked.push(cs_fcl)
  }
  // console.log(cs_fcl_checked)

  // const fcl_checked: {csid: string, fcl: Flashcard[]}[] = [{csid: '', fcl: []}, {csid: '1', fcl: []}, {csid: '2', fcl: []}];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="h-96 border-separate overflow-clip rounded-xl border border-solid flex flex-col overflow-y-auto">
          <table className="min-w-full text-gray-900 md:table">
            <thead className="sticky rounded-lg text-left text-md font-bold">
              {/* <thead className="sticky bg-gray-300 rounded-lg text-left text-md font-bold"> */}
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 border-r border-solid border-slate-900">
                  Name
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Created By
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
          </table>
          <div className="flex-1 overflow-y-auto">
            <table className="min-w-full text-gray-900 md:table">
              <tbody className="bg-white">
                {cs_fcl_checked?.map((cardset) => (
                  <tr
                    key={cardset.csid}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3 border-r border-solid">
                      <div className="flex items-center gap-3">
                        <p>{cardset.title}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3 border-r border-solid">
                      <div className="flex items-center gap-3">
                        <p>{cardset.created_by}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <ReadCardset cs={cardset} />
                        <UpdateCardset cs={cardset} />
                        <DeleteCardset id={cardset.csid} title={cardset.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function fetchCheckedCards() {
  return ['h', 'e', 'w', 'o', '?']
}