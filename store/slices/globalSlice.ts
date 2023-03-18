import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface GlobalSlice {
  isDataFetched: boolean;
}

// Define the initial state using that type
const initialState: GlobalSlice = {
  isDataFetched: false,
};

export const globalSlice = createSlice({
  name: 'global',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsDataFetched: (state, action: PayloadAction<boolean>) => {
      state.isDataFetched = action.payload;
    },
  },
});

export const { setIsDataFetched } = globalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGlobalState = (state: RootState) => state.global;

export default globalSlice.reducer;
