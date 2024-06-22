import { fetchCS2FC, fetchCardsetById, fetchFilteredCardsets } from '@/app/lib/data';
import { Cardset } from '@/app/lib/definitions';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Invoices'
}

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [cset, cs2fc] = await Promise.all([fetchCardsetById(id), fetchCS2FC(id)])
  
    if (!cset){
    //   notFound();
    }
    return (
      <main>
        <div>
            {cset.csid} /// {cset.title}
        </div>
        <div>
        <table className="min-w-full text-gray-900 md:table">
              <tbody className="bg-white">
                {cs2fc?.map((cardset) => (
                  <tr
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3 border-r border-solid">
                      <div className="flex items-center gap-3">
                        <p>{cardset.fcid}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>

      </main>
    );
}