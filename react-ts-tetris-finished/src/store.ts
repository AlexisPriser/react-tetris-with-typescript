import { configureStore } from "@reduxjs/toolkit";
import NextTSlice from "./NextTSlice";
import PauseSlice from "./PauseSlice";
import ShowCtrlSlice from "./ShowCtrlSlice";
// ...

export const store = configureStore({
  reducer: {
    nextT: NextTSlice,
    pause: PauseSlice,
    showCtrl: ShowCtrlSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
