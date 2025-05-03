import { DashboardConfiguration } from '@/types/navigation';

export const dashboardConfiguration: DashboardConfiguration = {
  mainNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'home',
      visibleTo: ['learner', 'educator', 'parent'],
    },
    {
      title: 'Study Plans',
      href: '/dashboard/study-plans',
      icon: 'book',
      visibleTo: ['educator'],
    },
    {
      title: 'Students',
      href: '/dashboard/students',
      icon: 'users',
      visibleTo: ['educator'],
    },
    {
      title: 'Assessments',
      href: '/dashboard/assessments',
      icon: 'clipboard',
      visibleTo: ['learner', 'educator'],
    },
  ],
};
