import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface TourState {
  opened: boolean;
}

// Define the initial state using that type
const initialState: TourState = {
  opened:
    localStorage.getItem("firstTime") === null ||
    localStorage.getItem("firstTime") === "true",
};

export const tourSlice = createSlice({
  name: "tour",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openTour: (state) => {
      state.opened = true;
      localStorage.setItem("firstTime", "true");
    },
    closeTour: (state) => {
      state.opened = false;
      localStorage.setItem("firstTime", "false");
    },
    toggleOpenTour: (state) => {
      state.opened = !state.opened;
    },
  },
});

export const { openTour, closeTour, toggleOpenTour } = tourSlice.actions;

export default tourSlice.reducer;
