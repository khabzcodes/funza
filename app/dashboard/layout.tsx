import React from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-navigation/app-sidebar';
import { DashboardHeader } from '@/components/app-navigation/dashboard-header';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="px-6 py-4">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
