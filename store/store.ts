import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import themeSlice from './slices/themeSlice';
import trackerSlice from './slices/trackerSlice';
import layoutSlice from './slices/layoutSlice';
import todosSlice from './slices/todosSlice';
import labelsSlice from './slices/labelsSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    auth: authSlice,
    tracker: trackerSlice,
    layout: layoutSlice,
    todo: todosSlice,
    labels: labelsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
