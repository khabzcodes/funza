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
      title: 'Lesson Plans',
      href: '/dashboard/lesson-plans',
      icon: 'book',
      visibleTo: ['educator'],
    },
    {
      title: 'Assessments',
      href: '/dashboard/assessments',
      icon: 'clipboard',
      visibleTo: ['learner', 'educator'],
    }
  ],
};
