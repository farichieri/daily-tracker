import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface LayoutSlice {
  isSidebarOpen: boolean;
  isCreatingProject: boolean;
  isEditingProject: boolean;
  isLoading: boolean;
  isProfileOpen: boolean;
}

// Define the initial state using that type
const initialState: LayoutSlice = {
  isSidebarOpen: false,
  isCreatingProject: false,
  isEditingProject: false,
  isLoading: false,
  isProfileOpen: false,
};

export const layoutSlice = createSlice({
  name: 'layout',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleIsCreatingProject: (state) => {
      state.isCreatingProject = !state.isCreatingProject;
    },
    toggleIsEditingProject: (state) => {
      state.isEditingProject = !state.isEditingProject;
    },
    closeModal: (state) => {
      state.isCreatingProject = false;
      state.isEditingProject = false;
      state.isProfileOpen = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleIsProfileOpen: (state) => {
      state.isProfileOpen = !state.isProfileOpen;
    },
  },
});

export const {
  toggleSidebar,
  toggleIsCreatingProject,
  toggleIsEditingProject,
  closeModal,
  setIsLoading,
  toggleIsProfileOpen,
} = layoutSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSidebarState = (state: RootState) =>
  state.layout.isSidebarOpen;
export const selectIsCreatingProject = (state: RootState) =>
  state.layout.isCreatingProject;
export const selectIsEditingProject = (state: RootState) =>
  state.layout.isEditingProject;
export const selectIsLoading = (state: RootState) => state.layout.isLoading;
export const selectIsProfileOpen = (state: RootState) =>
  state.layout.isProfileOpen;

export default layoutSlice.reducer;
