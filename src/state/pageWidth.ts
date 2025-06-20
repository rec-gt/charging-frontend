import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PageWidthState = {
  width: any;
};

const initialState: PageWidthState = {
  width: null,
};

const pageWidthSlice = createSlice({
  name: "pageWidth-info",
  initialState,
  reducers: {
    setPageWidth: (state, action: PayloadAction<any>) => {
      state.width = action.payload;
    },
    getPageWidth: (state) => state.width,
  },
});
export const { setPageWidth, getPageWidth } = pageWidthSlice.actions;
export const pageWidthReducer = pageWidthSlice.reducer;
