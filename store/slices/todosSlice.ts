import { Task, TaskGroup, List, ListGroup } from '@/global/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface TodosSlice {
  tasks: TaskGroup;
  lists: ListGroup;
  todoSelected: List;
  todoEdit: List;
  isLoadingData: boolean;
}

// Define the initial state using that type
const initialState: TodosSlice = {
  tasks: {},
  lists: {},
  todoSelected: {
    is_archived: false,
    is_default: false,
    is_favorite: false,
    is_private: false,
    labels: [],
    list_id: '',
    list_name: '',
    members: [],
  },
  todoEdit: {
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

export const todosSlice = createSlice({
  name: 'todo',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<ListGroup>) => {
      state.lists = { ...state.lists, ...action.payload };
      // state.todoSelected =
      //   action.payload.find((todo) => todo.is_default === true) ||
      //   action.payload[0];
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
    setTodoSelected: (state, action: PayloadAction<List>) => {
      state.todoSelected = action.payload;
    },
    setTodoEdit: (state, action: PayloadAction<string>) => {
      state.todoEdit = state.lists[action.payload];
    },
    setIsLoadingData: (state, action: PayloadAction<boolean>) => {
      state.isLoadingData = action.payload;
    },
  },
});

export const {
  setTasks,
  setTodoSelected,
  setTodos,
  setTodoEdit,
  setIsLoadingData,
  setAddNewTask,
  setUpdateTask,
  setDeleteTask,
} = todosSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodo = (state: RootState) => state.todo;
export const selectTodos = (state: RootState) => state.todo.lists;
export const selectTodoSelected = (state: RootState) => state.todo.todoSelected;
export const selectTodoEdit = (state: RootState) => state.todo.todoEdit;
export const selectIsLoadingData = (state: RootState) =>
  state.todo.isLoadingData;

export default todosSlice.reducer;
