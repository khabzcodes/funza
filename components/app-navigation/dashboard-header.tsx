'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';

export const DashboardHeader = () => {
  const pathname = usePathname();

  const formattedPathname = pathname
    .split('/')
    .slice(2)
    .join('/')
    .replace(/[-/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-semibold capitalize">{formattedPathname}</h1>
      </div>
    </header>
  );
};
