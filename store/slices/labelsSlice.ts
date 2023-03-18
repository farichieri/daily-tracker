import { Label, LabelGroup } from '@/global/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface LabelsSlice {
  labels: LabelGroup;
}

// Define the initial state using that type
const initialState: LabelGroup = {};

export const labelsSlice = createSlice({
  name: 'label',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLabels: (state, action: PayloadAction<LabelGroup>) => {
      return action.payload;
    },
    setAddNewLabel: (state, action: PayloadAction<Label>) => {
      return {
        ...state,
        [action.payload.label_id]: action.payload,
      };
    },
    setEditLabel: (state, action: PayloadAction<Label>) => {
      return {
        ...state,
        [action.payload.label_id]: action.payload,
      };
    },
    setDeleteLabel: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { setLabels, setAddNewLabel, setEditLabel, setDeleteLabel } =
  labelsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLabels = (state: RootState) => state;

export default labelsSlice.reducer;
