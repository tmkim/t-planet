import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Welcome',
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        <div>
          Welcome to T-Planet!
        </div>
        <Link
          href="/login"
          className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        >
          <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
        </Link>
      </div>
    </main>
  );
}