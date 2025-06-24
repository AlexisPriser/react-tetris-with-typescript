import { createSlice, current } from "@reduxjs/toolkit";
import { randomTetromino } from "./gameHelpers";

const initialState = { value: randomTetromino() };

const NextTSlice = createSlice({
  name: "nextT",
  initialState,
  reducers: {
    setNextT: (state) => {
      const randT = randomTetromino();
      console.log("setNextT called", randT.color);
      return { value: randT };
    },
  },
});

export const { setNextT } = NextTSlice.actions;
export default NextTSlice.reducer;
