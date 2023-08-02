import { configureStore } from "@reduxjs/toolkit";
import TableReducer from "../feature/TableSlice";
import AppReducer from "../feature/AppSlice";

const reducer = { table: TableReducer, appName: AppReducer };

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
