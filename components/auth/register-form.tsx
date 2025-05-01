'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { RegisterInput, registerSchema } from '@/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createLogger } from '@/lib/logger';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signUp, adminOps } from '@/lib/auth-client';
import { toast } from 'sonner';

const logger = createLogger('RegisterForm');

export const RegisterForm = ({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'learner',
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const handleSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      const response = await signUp.email({
        email: data.email,
        name: data.name,
        password: data.password,
      });

      if (response.error) {
        setIsLoading(false);
        logger.error('Error signing up', response.error);
        toast.error(response.error.message);
        return;
      }

      const userId = response.data.user.id;

      await adminOps.setRole({
        userId,
        role: data.role,
      });

      setIsLoading(false);

      toast.success('Registration successful! Please check your email for a confirmation link.');
    } catch (error) {
      setIsLoading(false);
      logger.error('Error registering user', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
      return;
    }
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-6">
          <FormField
            name="role"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <RadioGroup
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="learner" />
                      </FormControl>
                      <FormLabel>Learner</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="educator" />
                      </FormControl>
                      <FormLabel>Educator</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="parent" />
                      </FormControl>
                      <FormLabel>Parent</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full names</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage {...field} className="text-destructive text-xs" />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage {...field} className="text-destructive text-xs" />
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
                  <Input {...field} type="password" disabled={isLoading} />
                </FormControl>
                <FormMessage {...field} className="text-destructive text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
