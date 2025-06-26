import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

const initialState = { show: false };

const ShowCtrlSlice = createSlice({
  name: "showCtrl",
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
  },
});

export const { setShow } = ShowCtrlSlice.actions;
export default ShowCtrlSlice.reducer;
