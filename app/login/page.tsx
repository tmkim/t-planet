import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};
 
export default function LoginPage() {
  return (
    <main className="flex bg-slate-400 items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36 ">
          <span className="text-white font-semibold text-2xl tracking-wide px-10 py-10">Welcome to T-Planet!</span> 
        </div>
        <LoginForm />
      </div>
    </main>
  );
}