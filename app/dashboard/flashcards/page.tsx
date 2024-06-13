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
import { CreateFlashcard } from '@/app/ui/flashcards/buttons';
import { CreateCardset, BrowseCardsets } from '@/app/ui/cardsets/buttons';
import { fetchFlashcardsPages, fetchCardsetsPages } from '@/app/lib/data';
import { FlashcardTableSkeleton, CardsetTableSkeleton } from '@/app/ui/skeletons';

export const metadata: Metadata = {
    title: 'Flashcards',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        fcquery?: string;
        csquery?: string;
        fcpage?: string;
        cspage?: string;
    };
}) {
    const fcquery = searchParams?.fcquery || '';
    const csquery = searchParams?.csquery || '';
    const currentFCPage = Number(searchParams?.fcpage) || 1;
    const currentCSPage = Number(searchParams?.cspage) || 1;
    const totalFCPages = await fetchFlashcardsPages(fcquery);
    const totalCSPages = await fetchCardsetsPages(csquery);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
            {/* ---------------- flash cards ---------------- */}
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <h1 className={`${lusitana.className} text-2xl`}>Flashcards</h1>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <FCSearch placeholder="Search Flashcards..." />
                    <CreateFlashcard />
                </div>
                <Suspense key={fcquery + currentFCPage} fallback={<FlashcardTableSkeleton />}>
                    <FlashcardsTable query={fcquery} currentPage={currentFCPage} />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    <FCPagination totalPages={totalFCPages} />
                </div>
            </div>

            {/* ---------------- card sets ---------------- */}

            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <h1 className={`${lusitana.className} text-2xl`}>Card Sets</h1>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <CSSearch placeholder="Search Card Sets..." />
                    <CreateCardset />
                    <BrowseCardsets />
                </div>
                <Suspense key={csquery + currentCSPage} fallback={<CardsetTableSkeleton />}>
                    <CardsetsTable query={csquery} currentPage={currentCSPage} />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    <CSPagination totalPages={totalCSPages} />
                </div>
            </div>
        </div>
    );

}