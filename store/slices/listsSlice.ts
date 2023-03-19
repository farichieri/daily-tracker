import { Task, TaskGroup, List, ListGroup } from '@/global/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface ListSlice {
  tasks: TaskGroup;
  lists: ListGroup;
  listSelected: List;
  listEdit: List;
  isLoadingData: boolean;
}

// Define the initial state using that type
const initialState: ListSlice = {
  tasks: {},
  lists: {},
  listSelected: {
    is_archived: false,
    is_default: false,
    is_favorite: false,
    is_private: false,
    labels: [],
    list_id: '',
    list_name: '',
    members: [],
  },
  listEdit: {
    is_archived: false,
    is_default: false,
    is_favorite: false,
    is_private: false,
    labels: [],
    list_id: '',
    list_name: '',
    members: [],
  },
  isLoadingData: false,
};

export const listsSlice = createSlice({
  name: 'list',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLists: (state, action: PayloadAction<ListGroup>) => {
      state.lists = { ...state.lists, ...action.payload };
    },
    setTasks: (state, action: PayloadAction<TaskGroup>) => {
      state.tasks = action.payload;
      state.isLoadingData = false;
    },
    setAddNewTask: (state, action: PayloadAction<Task>) => {
      state.tasks = {
        ...state.tasks,
        [action.payload.task_id]: action.payload,
      };
    },
    setUpdateTask: (state, action: PayloadAction<Task>) => {
      state.tasks = {
        ...state.tasks,
        [action.payload.task_id]: action.payload,
      };
    },
    setDeleteTask: (state, action: PayloadAction<string>) => {
      delete state.tasks[action.payload];
    },
    setListSelected: (state, action: PayloadAction<List>) => {
      state.listSelected = action.payload;
    },
    setListEdit: (state, action: PayloadAction<string>) => {
      state.listEdit = state.lists[action.payload];
    },
  },
});

export const {
  setTasks,
  setListSelected,
  setLists,
  setListEdit,
  setAddNewTask,
  setUpdateTask,
  setDeleteTask,
} = listsSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectList = (state: RootState) => state.list;
export const selectLists = (state: RootState) => state.list.lists;
export const selectListSelected = (state: RootState) => state.list.listSelected;
export const selectListEdit = (state: RootState) => state.list.listEdit;
export const selectIsLoadingData = (state: RootState) =>
  state.list.isLoadingData;

export default listsSlice.reducer;
