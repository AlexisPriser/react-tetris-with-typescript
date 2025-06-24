import { createSlice, current } from "@reduxjs/toolkit";

const initialState = { pause: false, reset: false };

const PauseSlice = createSlice({
  name: "pause",
  initialState,
  reducers: {
    setPause: (state) => {
      state.pause = !state.pause;
    },
    setReset: (state) => {
      state.reset = !state.reset;
    },
  },
});

export const { setPause, setReset } = PauseSlice.actions;
export default PauseSlice.reducer;
