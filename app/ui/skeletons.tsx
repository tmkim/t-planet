// Loading animation
const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
    return (
        <div
            className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
        >
            <div className="flex p-4">
                <div className="h-5 w-5 rounded-md bg-gray-200" />
                <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
            </div>
            <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
                <div className="h-7 w-20 rounded-md bg-gray-200" />
            </div>
        </div>
    );
}

export function CardsSkeleton() {
    return (
        <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </>
    );
}

export function FlashcardRowSkeleton() {
    return (
        <tr className={`${shimmer} w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg`}>
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center gap-3"/>
            </td>
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center gap-3"/>
            </td>
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                    <div className="h-[38px] w-[38px] rounded bg-gray-100"/>
                    <div className="h-[38px] w-[38px] rounded bg-gray-100"/>
                    <div className="h-[38px] w-[38px] rounded bg-gray-100"/>
                </div>
            </td>
        </tr>
    )
}

export function FlashcardTableSkeleton() {
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Front Text
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Back Text
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            <FlashcardRowSkeleton />
                            <FlashcardRowSkeleton />
                            <FlashcardRowSkeleton />
                            <FlashcardRowSkeleton />
                            <FlashcardRowSkeleton />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export function CardsetRowSkeleton() {
    return (
        <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center gap-3"/>
            </td>
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center gap-3"/>
            </td>
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                    <div className="h-[38px] w-[38px] rounded bg-gray-100" />
                    <div className="h-[38px] w-[38px] rounded bg-gray-100" />
                    <div className="h-[38px] w-[38px] rounded bg-gray-100" />
                </div>
            </td>
        </tr>
    )
}

export function CardsetTableSkeleton(){
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
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
                        <tbody className="bg-white">
                            <CardsetRowSkeleton />
                            <CardsetRowSkeleton />
                            <CardsetRowSkeleton />
                            <CardsetRowSkeleton />
                            <CardsetRowSkeleton />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}