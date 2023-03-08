import { getDaysInAWeek } from '@/hooks/dates';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface TrackerSlice {
  daySelected: string;
  weekSelected: any[];
  projects: string[];
  projectSelected: string;
}

// Define the initial state using that type
const initialState: TrackerSlice = {
  daySelected: '',
  weekSelected: [],
  projects: ['own-project'],
  projectSelected: 'own-project',
};

export const trackerSlice = createSlice({
  name: 'tracker',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDaySelected: (state, action: PayloadAction<string>) => {
      state.daySelected = action.payload;
      state.weekSelected = getDaysInAWeek(new Date(action.payload));
    },
    setWeekSelected: (state, action: PayloadAction<any[]>) => {
      state.weekSelected = action.payload;
      // Can be removed.
    },
    setProjects: (state, action: PayloadAction<string[]>) => {
      state.projects = action.payload;
    },
    setProjectSelected: (state, action: PayloadAction<string>) => {
      state.projectSelected = action.payload;
    },
  },
});

export const {
  setDaySelected,
  setWeekSelected,
  setProjectSelected,
  setProjects,
} = trackerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDaySelected = (state: RootState) =>
  state.tracker.daySelected;
export const selectWeekSelected = (state: RootState) =>
  state.tracker.weekSelected;
export const selectProjects = (state: RootState) => state.tracker.projects;
export const selectProjectSelected = (state: RootState) =>
  state.tracker.projectSelected;

export default trackerSlice.reducer;