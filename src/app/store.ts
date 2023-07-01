import { configureStore } from "@reduxjs/toolkit";
import consoleSlice from "../features/Console/consoleSlice";
import quickActionsSlice from "../features/QuickActions/quickActionsSlice";
import graphSlice from "../features/Graph/graphSlice";
import tourSlice from "../features/Tour/tourSlice";
import helpSlice from "../features/Help/helpSlice";
import quickStartSlice from "../features/QuickStart/quickStartSlice";
import cursorSlice from "../features/Cursor/cursorSlice";

const store = configureStore({
  reducer: {
    console: consoleSlice,
    quickActions: quickActionsSlice,
    quickStart: quickStartSlice,
    graph: graphSlice,
    tour: tourSlice,
    help: helpSlice,
    cursor: cursorSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
