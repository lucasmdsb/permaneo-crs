import { NavItemType } from '@/shared/types/nav-link';
import { createSlice } from '@reduxjs/toolkit';

export type MenuProps = {
  selectedItem: string[];
  selectedID: string | null;
  drawerOpen: boolean;
  error: null;
  menu: NavItemType;
};

const initialState: MenuProps = {
  selectedItem: ['courses'],
  selectedID: null,
  drawerOpen: false,
  error: null,
  menu: {},
};

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.selectedItem = action.payload;
    },

    activeID(state, action) {
      state.selectedID = action.payload;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload;
    },
  },
});

export default menu.reducer;

export const { activeItem, openDrawer, activeID } = menu.actions;
