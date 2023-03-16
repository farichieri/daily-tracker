import { Task, Todo } from '@/global/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface TodosSlice {
  todoTasks: any[];
  todos: Todo[];
  todoSelected: Todo;
  todoEdit: Todo;
  isLoadingData: boolean;
}

// Define the initial state using that type
const initialState: TodosSlice = {
  todoTasks: [],
  todos: [],
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
    setTodoTasks: (state, action: PayloadAction<Task[]>) => {
      state.todoTasks = action.payload;
      state.isLoadingData = false;
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.todoSelected =
        action.payload.find((todo) => todo.is_default === true) ||
        action.payload[0];
    },
    setTodoSelected: (state, action: PayloadAction<Todo>) => {
      state.todoSelected = action.payload;
    },
    setTodoEdit: (state, action: PayloadAction<string>) => {
      state.todoEdit =
        state.todos.find((todo) => todo.list_id === action.payload) ||
        state.todoEdit;
    },
    setIsLoadingData: (state, action: PayloadAction<boolean>) => {
      state.isLoadingData = action.payload;
    },
  },
});

export const {
  setTodoTasks,
  setTodoSelected,
  setTodos,
  setTodoEdit,
  setIsLoadingData,
} = todosSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodo = (state: RootState) => state.todo;
export const selectTodos = (state: RootState) => state.todo.todos;
export const selectTodoSelected = (state: RootState) => state.todo.todoSelected;
export const selectTodoEdit = (state: RootState) => state.todo.todoEdit;
export const selectIsLoadingData = (state: RootState) =>
  state.todo.isLoadingData;

export default todosSlice.reducer;
