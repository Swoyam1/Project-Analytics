import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const TableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    insertTable(state, action) {
      return action.payload ? action.payload : { table: {} };
    },
  },
});

export const { insertTable } = TableSlice.actions;
export default TableSlice.reducer;
