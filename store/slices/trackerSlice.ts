import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface TrackerSlice {
  daySelected: string;
}

// Define the initial state using that type
const initialState: TrackerSlice = {
  daySelected: '',
};

export const trackerSlice = createSlice({
  name: 'tracker',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDaySelected: (state, action: PayloadAction<string>) => {
      state.daySelected = action.payload;
    },
  },
});

export const { setDaySelected } = trackerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDaySelected = (state: RootState) =>
  state.tracker.daySelected;

export default trackerSlice.reducer;
