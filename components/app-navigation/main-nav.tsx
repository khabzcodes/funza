import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SidebarNavItem } from '@/types/navigation';
import React from 'react';
import { Icons } from '@/components/icons';
import Link from 'next/link';

type MainNavProps = {
  items: SidebarNavItem[];
};

export const MainNav = ({ items }: MainNavProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item, idx) => {
            const Icon = item.icon ? Icons[item.icon] : Icons.home;
            return (
              <SidebarMenuItem key={idx}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.href} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
