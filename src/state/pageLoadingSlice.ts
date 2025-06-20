import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PageLoadingState = {
  toggle: boolean;
};

const initialState: PageLoadingState = {
  toggle: false,
};

const pageLoadingSlice = createSlice({
  name: "page-loading",
  initialState,
  reducers: {
    setPageLoading: (state, action: PayloadAction<boolean>) => {
      state.toggle = action.payload;
    },
  },
});
export const { setPageLoading } = pageLoadingSlice.actions;
export const pageLoadingReducer = pageLoadingSlice.reducer;
