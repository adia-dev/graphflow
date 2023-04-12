import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface ConsoleState {
  opened: boolean;
}

// Define the initial state using that type
const initialState: ConsoleState = {
  opened: false,
};

export const consoleSlice = createSlice({
  name: "console",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openConsole: (state) => {
      state.opened = true;
    },
    closeConsole: (state) => {
      state.opened = false;
    },
    toggleOpenConsole: (state) => {
      state.opened = !state.opened;
    },
  },
});

export const { openConsole, closeConsole, toggleOpenConsole } =
  consoleSlice.actions;

export const selectConsoleOpen = (state: RootState) => state.console.opened;

export default consoleSlice.reducer;
