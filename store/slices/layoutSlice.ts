import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface LayoutSlice {
  isSidebarOpen: boolean;
  isCreatingProject: boolean;
  isCreatingList: boolean;
  isEditingProject: boolean;
  isEditingList: boolean;
  isLoading: boolean;
  page: string;
}

// Define the initial state using that type
const initialState: LayoutSlice = {
  isSidebarOpen: false,
  isCreatingProject: false,
  isCreatingList: false,
  isEditingProject: false,
  isEditingList: false,
  isLoading: false,
  page: '',
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
    toggleIsCreatingList: (state) => {
      state.isCreatingList = !state.isCreatingList;
    },
    toggleIsEditingProject: (state) => {
      state.isEditingProject = !state.isEditingProject;
    },
    toggleIsEditingList: (state) => {
      state.isEditingList = !state.isEditingList;
    },
    closeModal: (state) => {
      state.isCreatingProject = false;
      state.isEditingProject = false;
      state.isCreatingList = false;
      state.isEditingList = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  toggleIsCreatingProject,
  toggleIsEditingProject,
  toggleIsCreatingList,
  closeModal,
  setIsLoading,
  toggleIsEditingList,
} = layoutSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSidebarState = (state: RootState) =>
  state.layout.isSidebarOpen;
export const selectIsCreatingProject = (state: RootState) =>
  state.layout.isCreatingProject;
export const selectIsEditingProject = (state: RootState) =>
  state.layout.isEditingProject;
export const selectIsCreatingList = (state: RootState) =>
  state.layout.isCreatingList;
export const selectIsEditingList = (state: RootState) =>
  state.layout.isEditingList;
export const selectIsLoading = (state: RootState) => state.layout.isLoading;

export default layoutSlice.reducer;
