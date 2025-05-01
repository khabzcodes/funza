import Link from 'next/link';
import { Icons } from '@/components/icons';
import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Icons.logo className="size-4" />
          </div>
          <span className="text-base font-semibold">Funza</span>
        </Link>
        <RegisterForm />
        <p className="text-sm text-muted-foreground text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-primary underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
