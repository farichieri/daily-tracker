import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import globalSlice from "./slices/globalSlice";
import labelsSlice from "./slices/labelsSlice";
import layoutSlice from "./slices/layoutSlice";
import listsSlice from "./slices/listsSlice";
import tasksSlice from "./slices/tasksSlice";
import themeSlice from "./slices/themeSlice";
import trackerSlice from "./slices/trackerSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    global: globalSlice,
    labels: labelsSlice,
    layout: layoutSlice,
    list: listsSlice,
    tasks: tasksSlice,
    theme: themeSlice,
    tracker: trackerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
