import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface LayoutSlice {
  isSidebarOpen: boolean;
  isCreatingProject: boolean;
  isEditingProject: boolean;
}

// Define the initial state using that type
const initialState: LayoutSlice = {
  isSidebarOpen: false,
  isCreatingProject: false,
  isEditingProject: false,
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
    },
  },
});

export const {
  toggleSidebar,
  toggleIsCreatingProject,
  toggleIsEditingProject,
  closeModal,
} = layoutSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSidebarState = (state: RootState) =>
  state.layout.isSidebarOpen;
export const selectIsCreatingProject = (state: RootState) =>
  state.layout.isCreatingProject;
export const selectIsEditingProject = (state: RootState) =>
  state.layout.isEditingProject;

export default layoutSlice.reducer;
