import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface ThemeSlice {
  theme: string;
  // isLoaded: boolean;
}

// Define the initial state using that type
const initialState: ThemeSlice = {
  theme: '',
  // isLoaded: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
      // state.isLoaded = true;
    },
  },
});

export const { setTheme } = themeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.theme.theme;

export default themeSlice.reducer;
