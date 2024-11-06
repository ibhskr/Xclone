import { createSlice } from "@reduxjs/toolkit";

const refreshSlice = createSlice({
  name: "refreshSlice",
  initialState: { refresh: false },
  reducers: {
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { getRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;
