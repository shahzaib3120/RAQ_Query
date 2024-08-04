import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import bookReducer from "./bookSlice";
import chatReducer from "./chatSlice";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    books: bookReducer,
    chat: chatReducer,
    // Add other reducers here
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
