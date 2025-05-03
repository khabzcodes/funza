'use client';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import React from 'react';
import { Toaster } from 'sonner';

export const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
      <QueryClientProvider client={new QueryClient()}>
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
        <Toaster
          position="top-center"
          richColors
          closeButton
          expand={false}
          toastOptions={{
            style: {
              borderRadius: '0.2rem',
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
