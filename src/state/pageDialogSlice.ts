import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageDialogDetailType } from "../components";

type PageDialogState = {
  detail?: PageDialogDetailType;
};

const initialState: PageDialogState = {
  detail: undefined,
};

const pageDialogSlice = createSlice({
  name: "page-dialog",
  initialState,
  reducers: {
    setPageDialog: (
      state,
      action: PayloadAction<PageDialogDetailType | undefined>
    ) => {
      state.detail = action.payload;
    },
  },
});
export const { setPageDialog } = pageDialogSlice.actions;
export const pageDialogReducer = pageDialogSlice.reducer;
