import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Welcome Page'
}

export default async function Page(){
    return (
        <div className="w-full">
            Welcome to T-Planet !!! 
        </div>
    )
}