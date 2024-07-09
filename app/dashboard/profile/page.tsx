import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Profile'
}

export default async function Page(){
    return (
        <div className="w-full">
            Page Placeholder
        </div>
    )
}