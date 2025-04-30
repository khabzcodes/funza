import { LoginForm } from '@/components/auth/login-form';
import { SocialsLogin } from '@/components/auth/socials-login';
import { Icons } from '@/components/icons';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Icons.logo className="size-4" />
            </div>
            Better Next
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm className="mb-3" />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">OR</span>
              </div>
            </div>
            <SocialsLogin className="mt-3" />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block"></div>
    </div>
  );
};

export default LoginPage;
