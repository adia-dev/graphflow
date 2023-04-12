import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface QuickActionsState {
  opened: boolean;
}

// Define the initial state using that type
const initialState: QuickActionsState = {
  opened: false,
};

export const quickActionsSlice = createSlice({
  name: "quickActions",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openQuickActions: (state) => {
      state.opened = true;
    },
    closeQuickActions: (state) => {
      state.opened = false;
    },
    toggleOpenQuickActions: (state) => {
      state.opened = !state.opened;
    },
  },
});

export const { openQuickActions, closeQuickActions, toggleOpenQuickActions } =
  quickActionsSlice.actions;

export const selectQuickActionsOpen = (state: RootState) =>
  state.quickActions.opened;

export default quickActionsSlice.reducer;
