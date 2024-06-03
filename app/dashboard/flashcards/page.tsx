import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { UpdateFlashcard, CreateFlashcard } from '@/app/ui/flashcards/buttons';

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
    // const currentPage = Number(searchParams?.page) || 1;
    // const totalFCPages = await fetchFlashcardPages;
    // const totalCSPages = await fetchCardsetPages;

    return (
        <div className="grid grid-cols-2 w-full">
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <h1 className={`${lusitana.className} text-2xl`}>Flashcards</h1>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <div>Search placeholder</div>
                    <CreateFlashcard />
                    <UpdateFlashcard id={""} />
                    {/* <Search placeholder="Search invoices..." />
                <CreateFlashcard /> */}
                </div>
                <div> Suspense Table Placeholder </div>
                {/* <Suspense key={query + currentPage} fallback={<FlashcardsTableSkeleton />}>
                <Table query={query} currentPage={currentPage}
            </Suspense> */}
                {/* <Suspense key={query} fallback={<FlashcardsTableSkeleton />}>
                <Table query={query}/>
            </Suspense> */}
                <div className="mt-5 flex w-full justify-center">
                    {/* <Pagination totalPages={totalPages} /> */}
                    <div>Pagination placeholder</div>
                </div>
            </div>

            <div className='w-full'>
                <div className="flex w-full items-center justify-between">
                    <h1 className={`${lusitana.className} text-2xl`}>Card sets</h1>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <div>Search placeholder</div>
                    <CreateFlashcard />
                    <UpdateFlashcard id={""} />
                    {/* <Search placeholder="Search invoices..." />
                <CreateFlashcard /> */}
                </div>
                <div> Suspense Table Placeholder </div>
                {/* <Suspense key={query + currentPage} fallback={<FlashcardsTableSkeleton />}>
                <Table query={query} currentPage={currentPage}
            </Suspense> */}
                {/* <Suspense key={query} fallback={<FlashcardsTableSkeleton />}>
                <Table query={query}/>
            </Suspense> */}
                <div className="mt-5 flex w-full justify-center">
                    {/* <Pagination totalPages={totalPages} /> */}
                    <div>Pagination placeholder</div>
                </div>
                <div>
                    Browse Card Sets
                </div>
            </div>
        </div>
    );

}