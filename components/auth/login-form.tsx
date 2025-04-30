'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { EmailOtpAuthInput, emailOtpAuthSchema } from '@/validations/auth';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';

export const LoginForm = ({ className, ...props }: React.ComponentPropsWithRef<'form'>) => {
  const form = useForm<EmailOtpAuthInput>({
    resolver: zodResolver(emailOtpAuthSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });
  return (
    <Form {...form}>
      <form className={cn('flex flex-col gap-6', className)} {...props}>
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
                    <Input />
                  </FormControl>
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
