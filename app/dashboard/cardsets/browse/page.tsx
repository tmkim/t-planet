import FlashcardsTable from '@/app/ui/flashcards/table'
import CardsetsTable from '@/app/ui/cardsets/table';
import FCSearch from '@/app/ui/flashcards/search';
import CSSearch from '@/app/ui/cardsets/search';
import FCPagination from '@/app/ui/flashcards/pagination';
import CSPagination from '@/app/ui/cardsets/pagination';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { CreateCardset, BrowseCardsets } from '@/app/ui/cardsets/buttons';
import { fetchCardsetsPages } from '@/app/lib/data';
import { CardsetTableSkeleton } from '@/app/ui/skeletons';
import BrowseCardsetsTable from '@/app/ui/cardsets/browse-table';

export const metadata: Metadata = {
    title: 'Browse Card Sets',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        csquery?: string;
        cspage?: string;
    };
}) {

    const csquery = searchParams?.csquery || '';
    const currentCSPage = Number(searchParams?.cspage) || 1;
    var totalCSPages = 1
    try {
        [totalCSPages] = await Promise.all([fetchCardsetsPages(csquery)])

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch flashcard or cardset pages : ${error}`);
    }

    return (
        <div className="lg:grid-cols-2 w-full gap-5">
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <h1 className={`${lusitana.className} text-3xl`}>Card Sets</h1>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <CSSearch placeholder="Search Card Sets..." />
                </div>
                <Suspense key={csquery + currentCSPage} fallback={<CardsetTableSkeleton />}>
                    <BrowseCardsetsTable query={csquery} currentPage={currentCSPage} />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    <CSPagination totalPages={totalCSPages} />
                </div>
            </div>
        </div>
    );

}