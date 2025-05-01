'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { EmailAuthInput, emailAuthSchema } from '@/validations/auth';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { createLogger } from '@/lib/logger';
import { toast } from 'sonner';
import { signIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const logger = createLogger('LoginForm');

export const LoginForm = ({ className, ...props }: React.ComponentPropsWithRef<'form'>) => {
  const router = useRouter();

  const form = useForm<EmailAuthInput>({
    resolver: zodResolver(emailAuthSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const handleSubmit = async (input: EmailAuthInput) => {
    try {
      await signIn.email(
        {
          email: input.email,
          password: input.password,
        },
        {
          onSuccess: () => {
            router.push('/dashboard');
          },
        }
      );
    } catch (error) {
      logger.error('Error signing in', error);
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }

      toast.error('An unknown error occurred');
      return;
    }
  };
  return (
    <Form {...form}>
      <form
        className={cn('flex flex-col gap-6', className)}
        {...props}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to sign in to your account.
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage {...field} className="text-xs text-destructive" />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage {...field} className="text-xs text-destructive" />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Sign In with Email</Button>
        </div>
      </form>
    </Form>
  );
};
