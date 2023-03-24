import { Goal, GoalGroup } from '@/global/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface goalsSlice {
  goals: GoalGroup;
}

// Define the initial state using that type
const initialState: GoalGroup = {};

export const goalsSlice = createSlice({
  name: 'goals',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setGoals: (state, action: PayloadAction<GoalGroup>) => {
      return action.payload;
    },
    setAddnewGoal: (state, action: PayloadAction<Goal>) => {
      return {
        ...state,
        [action.payload.goal_id]: action.payload,
      };
    },
    setUpdateGoal: (state, action: PayloadAction<Goal>) => {
      return {
        ...state,
        [action.payload.goal_id]: action.payload,
      };
    },
    setDeleteGoal: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { setGoals, setAddnewGoal, setUpdateGoal, setDeleteGoal } =
  goalsSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectGoals = (state: RootState) => state;

export default goalsSlice.reducer;
