// import Image from 'next/image';
import { UpdateCardset, DeleteCardset, ReadCardset } from './buttons';
// import InvoiceStatus from '@/app/ui/flashcards/status';
// import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredCardsets } from '@/app/lib/data';

export default async function CardsetsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const cardsets = await fetchFilteredCardsets(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="h-96 border-separate overflow-clip rounded-xl border border-solid flex flex-col overflow-y-auto">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="sticky rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
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
            <table className="hidden min-w-full text-gray-900 md:table">
              <tbody className="bg-white">
                {cardsets?.map((cardset) => (
                  <tr
                    key={cardset.csid}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{cardset.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{cardset.created_by}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <ReadCardset id={cardset.csid} />
                        <UpdateCardset id={cardset.csid} />
                        <DeleteCardset id={cardset.csid} name={cardset.name} />
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
