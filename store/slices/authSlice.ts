import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import type { RootState } from '../store';

// Define a type for the slice state
interface AuthState {
  user: User | null;
  // isLoaded: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  // isLoaded: false,
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    verifyUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      // state.isLoaded = true;
    },
  },
});

export const { verifyUser } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
