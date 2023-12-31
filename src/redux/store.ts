import { configureStore } from '@reduxjs/toolkit'
import { api } from './features/api/apiSlice'
import userReducer from "./features/user/userSlice"
import filterReducer from "./features/book/bookSlice"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user:userReducer,
    filter: filterReducer
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(api.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

