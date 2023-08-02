import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const appNameSlice = createSlice({
  name: "appName",
  initialState,
  reducers: {
    getAppName(state, action) {
      return action.payload ? action.payload : { appName: {} };
    },
  },
});

export const { getAppName } = appNameSlice.actions;
export default appNameSlice.reducer;
