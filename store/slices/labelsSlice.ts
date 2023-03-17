import { Label, LabelGroup } from '@/global/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface LabelsSlice {
  labels: LabelGroup;
}

// Define the initial state using that type
const initialState: LabelsSlice = {
  labels: {},
};

export const labelsSlice = createSlice({
  name: 'label',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLabels: (state, action: PayloadAction<LabelGroup>) => {
      state.labels = { ...state.labels, ...action.payload };
    },
    setAddNewLabel: (state, action: PayloadAction<Label>) => {
      state.labels = {
        ...state.labels,
        [action.payload.label_id]: action.payload,
      };
    },
  },
});

export const { setLabels, setAddNewLabel } = labelsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLabels = (state: RootState) => state.labels;

export default labelsSlice.reducer;
