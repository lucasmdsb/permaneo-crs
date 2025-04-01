import { NavItemType } from '@/shared/types/nav-link';
import { enterprisesItems } from './enterprises';

const menuItems: { items: NavItemType[] } = {
  items: [...enterprisesItems],
};

export default menuItems;
