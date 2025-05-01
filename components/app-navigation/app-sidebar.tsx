'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import React from 'react';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { MainNav } from '@/components/app-navigation/main-nav';
import { dashboardConfiguration } from '@/config/dashboard';
import { useSession } from '@/lib/auth-client';
import { UserNav } from '@/components/app-navigation/user-nav';

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { data, isPending } = useSession();

  if (isPending || !data?.user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Icons.spinner className="size-4 animate-spin text-primary" />
      </div>
    );
  }
  const roleBasedNav = dashboardConfiguration.mainNav.filter(item => {
    if (data.user.role === 'learner') {
      return item.visibleTo?.includes('learner');
    } else if (data.user.role === 'educator') {
      return item.visibleTo?.includes('educator');
    } else if (data.user.role === 'parent') {
      return item.visibleTo?.includes('parent');
    }
    return false;
  });

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Icons.logo className="size-4" />
                </div>
                <span className="text-base font-semibold">Funza</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <MainNav items={roleBasedNav} />
      </SidebarContent>
      <SidebarFooter>
        {!isPending && (
          <UserNav
            user={{
              name: data?.user.name || '',
              email: data?.user.email || '',
              image: data?.user.image || '',
            }}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
};
