import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface HelpState {
  opened: boolean;
}

// Define the initial state using that type
const initialState: HelpState = {
  opened: false,
};

export const helpSlice = createSlice({
  name: "help",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openHelp: (state) => {
      state.opened = true;
    },
    closeHelp: (state) => {
      state.opened = false;
    },
    toggleOpenHelp: (state) => {
      state.opened = !state.opened;
    },
  },
});

export const { openHelp, closeHelp, toggleOpenHelp } = helpSlice.actions;
export default helpSlice.reducer;
