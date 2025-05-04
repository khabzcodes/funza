'use client';

import React from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { DashboardHeader } from '@/components/app-navigation/dashboard-header';
import { LearnSidebar } from '@/components/learn-navigation/learn-sidebar';
import { LessionProvider } from '@/components/lessons/providers/lessons';

export default function LearnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [introduction, setIntoduction] = React.useState<string | null>(null);
  const [conclusion, setConclusion] = React.useState<string | null>(null);

  return (
    <LessionProvider introduction={introduction} conclusion={conclusion} setIntoduction={setIntoduction} setConclusion={setConclusion}>
      <SidebarProvider style={{ "--sidebar-width": "24rem" } as React.CSSProperties}>
        <LearnSidebar variant="inset" />
        <SidebarInset>
          <DashboardHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="px-6 py-4">{children}</div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </LessionProvider>
  );
}
