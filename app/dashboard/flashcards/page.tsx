import FlashcardsTable from '@/app/ui/flashcards/table'
import CardsetsTable from '@/app/ui/cardsets/table';
import Search from '@/app/ui/search';
import Pagination from '@/app/ui/flashcards/pagination';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { CreateFlashcard } from '@/app/ui/flashcards/buttons';
import { CreateCardset, BrowseCardsets } from '@/app/ui/cardsets/buttons';
import { fetchFlashcardsPages, fetchCardsetsPages } from '@/app/lib/data';

export const metadata: Metadata = {
    title: 'Flashcards',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalFCPages = await fetchFlashcardsPages(query);
    const totalCSPages = await fetchCardsetsPages(query);

    return (
        <div className="grid grid-cols-2 w-full gap-5">
            {/* ---------------- flash cards ---------------- */}
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <h1 className={`${lusitana.className} text-2xl`}>Flashcards</h1>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Search Flashcards..." />
                    <CreateFlashcard />
                </div>
                <Suspense key={query + currentPage}>
                    <FlashcardsTable query={query} currentPage={currentPage}/>
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalFCPages} />
                </div>
            </div>
            
            {/* ---------------- card sets ---------------- */}

            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <h1 className={`${lusitana.className} text-2xl`}>Card Sets</h1>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Search Card Sets..." />
                    <CreateCardset />
                    <BrowseCardsets />
                </div>
                <Suspense key={query + currentPage}>
                    <CardsetsTable query={query} currentPage={currentPage}/>
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalCSPages} />
                </div>
            </div>
        </div>
    );

}