import { DayData, Project } from '@/global/types';
import { getDaysInAWeek } from '@/hooks/dates';
import { dbFormatDate } from '@/utils/formatDate';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parseISO } from 'date-fns';
import type { RootState } from '../store';

// Define a type for the slice state
interface TrackerSlice {
  dayData: DayData;
  daySelected: string;
  weekSelected: any[];
  projects: Project[];
  projectSelected: Project;
  projectEdit: Project;
  today: string;
  isLoadingData: boolean;
}

// Define the initial state using that type
const initialState: TrackerSlice = {
  dayData: {
    day_date: '',
    day_goals: [],
    day_tasks: {},
  },
  daySelected: '',
  weekSelected: [],
  projects: [],
  projectSelected: {
    is_archived: false,
    is_default: false,
    is_favorite: false,
    is_private: false,
    labels: [],
    project_id: '',
    project_name: '',
    members: [],
  },
  projectEdit: {
    is_archived: false,
    is_default: false,
    is_favorite: false,
    is_private: false,
    labels: [],
    project_id: '',
    project_name: '',
    members: [],
  },
  today: dbFormatDate(new Date()),
  isLoadingData: false,
};

export const trackerSlice = createSlice({
  name: 'tracker',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDayData: (state, action: PayloadAction<DayData>) => {
      state.dayData = action.payload;
      state.isLoadingData = false;
    },
    setDaySelected: (state, action: PayloadAction<string>) => {
      state.daySelected = action.payload;
      state.weekSelected = getDaysInAWeek(parseISO(action.payload));
    },
    setWeekSelected: (state, action: PayloadAction<any[]>) => {
      state.weekSelected = action.payload;
      // Can be removed.
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
      state.projectSelected =
        action.payload.find((project) => project.is_default === true) ||
        action.payload[0] ||
        state.projectSelected;
    },
    setProjectSelected: (state, action: PayloadAction<Project>) => {
      state.projectSelected = action.payload;
    },
    setProjectEdit: (state, action: PayloadAction<string>) => {
      state.projectEdit =
        state.projects.find(
          (project) => project.project_id === action.payload
        ) || state.projectEdit;
    },
    setIsLoadingData: (state, action: PayloadAction<boolean>) => {
      state.isLoadingData = action.payload;
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
  setIsLoadingData,
} = trackerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTrackerSlice = (state: RootState) => state.tracker;
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
export const selectToday = (state: RootState) => state.tracker.today;
export const selectIsLoadingData = (state: RootState) =>
  state.tracker.isLoadingData;

export default trackerSlice.reducer;
