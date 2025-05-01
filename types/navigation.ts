import { Icons } from '@/components/icons';

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  visibleTo?: string[];
};

export type DashboardConfiguration = {
  mainNav: SidebarNavItem[];
};
