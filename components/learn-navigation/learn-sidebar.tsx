'use client';
import { useSession } from "@/lib/auth-client";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Icons } from "../icons";
import Link from "next/link";

export const LearnSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { data, isPending } = useSession();

  if (isPending || !data?.user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Icons.spinner className="size-4 animate-spin text-primary" />
      </div>
    );
  }

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
        
      </SidebarContent>
    </Sidebar>
  )
}