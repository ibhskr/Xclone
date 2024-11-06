// store.js
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice.js";
import refreshReducer from "./slices/refreshSlice.js";
const store = configureStore({
  reducer: {
    users: userSlice,
    refresh: refreshReducer,
  },
});

export default store;
