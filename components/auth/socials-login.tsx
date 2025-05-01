'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { createLogger } from '@/lib/logger';
import { toast } from 'sonner';
import { BetterAuthError } from 'better-auth';
import { signIn } from '@/lib/auth-client';

const logger = createLogger('SocialsLogin');

export const SocialsLogin = ({ className, ...props }: React.ComponentPropsWithRef<'div'>) => {
  const [isLoadingGoogle, setIsLoadingGoogle] = React.useState<boolean>(false);

  const handleGoogleLogin = async () => {
    setIsLoadingGoogle(true);
    try {
      await signIn.social({ provider: 'google' });
    } catch (error) {
      setIsLoadingGoogle(false);
      logger.error('Google login error', { error });
      const errorMessage =
        error instanceof Error
          ? error.message
            ? error instanceof BetterAuthError
              ? error.message
              : 'Unknown error'
            : 'Unknown error'
          : 'Unknown error';
      toast.error(errorMessage);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Button variant="outline" disabled={isLoadingGoogle} onClick={handleGoogleLogin}>
        {!isLoadingGoogle ? (
          <>
            <Icons.google className="mr-2 h-4 w-4" />
            Continue with Google
          </>
        ) : (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
      </Button>
    </div>
  );
};
