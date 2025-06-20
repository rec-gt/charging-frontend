import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PageAlertState = {
  detail: any;
};

const initialState: PageAlertState = {
  detail: null,
};

const pageAlertSlice = createSlice({
  name: "page-alert",
  initialState,
  reducers: {
    setPageAlert: (
      state,
      action: PayloadAction<{ severity: AlertColor; text: string } | null>
    ) => {
      state.detail = action.payload;
    },
  },
});
export const { setPageAlert } = pageAlertSlice.actions;
export const pageAlertReducer = pageAlertSlice.reducer;
