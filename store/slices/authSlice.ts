import { UserSettings } from "@/global/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import type { RootState } from "../store";

// Define a type for the slice state
interface AuthState {
  user: User | null;
  isVerifyingUser: boolean;
  userSettings: UserSettings;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  isVerifyingUser: true,
  userSettings: {
    display_name: "",
    email: "",
    photo: "",
    is_premium: false,
    plan_name: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    verifyUser: (state) => {
      state.isVerifyingUser = true;
    },
    userVerified: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isVerifyingUser = false;
    },
    setUserSettings: (state, action: PayloadAction<UserSettings>) => {
      const userSettings = action.payload;
      state.userSettings = {
        display_name: userSettings.display_name,
        email: userSettings.email,
        photo: userSettings.photo,
        is_premium: userSettings.is_premium,
        plan_name: userSettings.plan_name,
      };
    },
  },
});

export const { verifyUser, userVerified, setUserSettings } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth;

export default authSlice.reducer;
