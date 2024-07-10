import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Welcome Page'
}

export default async function Page(){
    redirect('/dashboard/flashcards');
    return (
        <div className="w-full">
            Welcome to T-Planet !!! 
        </div>
    )
}