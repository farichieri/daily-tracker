import { Task, TaskGroup, List, ListGroup } from '@/global/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface tasksSlice {
  tasks: TaskGroup;
}

// Define the initial state using that type
const initialState: TaskGroup = {};

export const tasksSlice = createSlice({
  name: 'tasks',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskGroup>) => {
      return action.payload;
    },
    setAddNewTask: (state, action: PayloadAction<Task>) => {
      return {
        ...state,
        [action.payload.task_id]: action.payload,
      };
    },
    setUpdateTask: (state, action: PayloadAction<Task>) => {
      return {
        ...state,
        [action.payload.task_id]: action.payload,
      };
    },
    setDeleteTask: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { setTasks, setAddNewTask, setUpdateTask, setDeleteTask } =
  tasksSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectTasks = (state: RootState) => state;

export default tasksSlice.reducer;
