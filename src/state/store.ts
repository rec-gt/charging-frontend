import { configureStore } from "@reduxjs/toolkit";
import { pageAlertReducer } from "./pageAlertSlice";
import { pageLoadingReducer } from "./pageLoadingSlice";
import { pageWidthReducer } from "./pageWidth";
import { userReducer } from "./user";
import { pageDialogReducer } from "./pageDialogSlice";

export const store = configureStore({
  reducer: {
    pageLoading: pageLoadingReducer,
    pageAlert: pageAlertReducer,
    pageDialog: pageDialogReducer,
    user: userReducer,
    pageWidth: pageWidthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
