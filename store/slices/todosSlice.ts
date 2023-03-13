import { Todo } from '@/global/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface TodosSlice {
  todoData: any[];
  todos: Todo[];
  todoSelected: Todo;
  todoEdit: Todo;
  isLoadingData: boolean;
}

// Define the initial state using that type
const initialState: TodosSlice = {
  todoData: [],
  todos: [],
  todoSelected: {
    id: '',
    todoName: '',
    isDefault: false,
    isFavorite: false,
  },
  todoEdit: {
    id: '',
    todoName: '',
    isDefault: false,
    isFavorite: false,
  },
  isLoadingData: false,
};

export const todosSlice = createSlice({
  name: 'todo',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTodoData: (state, action: PayloadAction<any[]>) => {
      state.todoData = action.payload;
      state.isLoadingData = false;
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.todoSelected =
        action.payload.find((todo) => todo.isDefault === true) ||
        action.payload[0];
    },
    setTodoSelected: (state, action: PayloadAction<Todo>) => {
      state.todoSelected = action.payload;
    },
    setTodoEdit: (state, action: PayloadAction<string>) => {
      state.todoEdit =
        state.todos.find((todo) => todo.id === action.payload) ||
        state.todoEdit;
    },
    setIsLoadingData: (state, action: PayloadAction<boolean>) => {
      state.isLoadingData = action.payload;
    },
  },
});

export const {
  setTodoData,
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
