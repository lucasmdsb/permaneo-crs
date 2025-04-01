import {
  IconChecklist,
  IconHeart,
} from '@tabler/icons-react';

import { NavItemType } from '@/shared/types/nav-link';

const icons = {
  courses: IconChecklist,
  favorites: IconHeart,
};

export const enterprisesItems: NavItemType[] = [
  {
    id: 'courses',
    title: 'Cursos',
    icon: icons.courses,
    type: 'group',
    url: '/courses',
    roles: ['rh', 'admin', 'manager'],
  },
  {
    id: 'favorites',
    title: 'Favoritos',
    icon: icons.favorites,
    type: 'group',
    url: '/courses/favorites',
    roles: ['rh', 'admin', 'manager'],
  }
];
