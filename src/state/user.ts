import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  info: any;
};

const initialState: UserState = {
  info: null,
};

const userSlice = createSlice({
  name: "user-info",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.info = action.payload;
    },
  },
});
export const { setUserInfo } = userSlice.actions;
export const userReducer = userSlice.reducer;
