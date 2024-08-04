import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import bookReducer from "./bookSlice";
import chatReducer from "./chatSlice";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    books: bookReducer,
    chat: chatReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;