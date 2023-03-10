import { DayData } from '@/global/types';
import { getDaysInAWeek } from '@/hooks/dates';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface Project {
  id: string;
  projectName: string;
  isDefault: boolean;
  isFavorite: boolean;
}

// Define a type for the slice state
interface TrackerSlice {
  dayData: DayData;
  daySelected: string;
  weekSelected: any[];
  projects: Project[];
  projectSelected: Project;
  projectEdit: Project;
}

// Define the initial state using that type
const initialState: TrackerSlice = {
  dayData: {
    date: '',
    objetives: [],
    tasks: [],
  },
  daySelected: '',
  weekSelected: [],
  projects: [],
  projectSelected: {
    id: '',
    projectName: '',
    isDefault: false,
    isFavorite: false,
  },
  projectEdit: {
    id: '',
    projectName: '',
    isDefault: false,
    isFavorite: false,
  },
};

export const trackerSlice = createSlice({
  name: 'tracker',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDayData: (state, action: PayloadAction<DayData>) => {
      state.dayData = action.payload;
    },
    setDaySelected: (state, action: PayloadAction<string>) => {
      state.daySelected = action.payload;
      state.weekSelected = getDaysInAWeek(new Date(action.payload));
    },
    setWeekSelected: (state, action: PayloadAction<any[]>) => {
      state.weekSelected = action.payload;
      // Can be removed.
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
      state.projectSelected =
        action.payload.find((project) => project.isDefault === true) ||
        action.payload[0];
    },
    setProjectSelected: (state, action: PayloadAction<Project>) => {
      state.projectSelected = action.payload;
    },
    setProjectEdit: (state, action: PayloadAction<string>) => {
      state.projectEdit =
        state.projects.find((project) => project.id === action.payload) ||
        state.projectEdit;
    },
  },
});

export const {
  setDaySelected,
  setWeekSelected,
  setProjectSelected,
  setProjects,
  setProjectEdit,
  setDayData,
} = trackerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDayData = (state: RootState) => state.tracker.dayData;
export const selectDaySelected = (state: RootState) =>
  state.tracker.daySelected;
export const selectWeekSelected = (state: RootState) =>
  state.tracker.weekSelected;
export const selectProjects = (state: RootState) => state.tracker.projects;
export const selectProjectSelected = (state: RootState) =>
  state.tracker.projectSelected;
export const selectProjectEdit = (state: RootState) =>
  state.tracker.projectEdit;

export default trackerSlice.reducer;
