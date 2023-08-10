import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface QuickStartState {
    opened: boolean;
}

// Define the initial state using that type
const initialState: QuickStartState = {
    opened: localStorage.getItem("openQuickStartOnStartup") === "true",
};

export const quickStartSlice = createSlice({
    name: "quickStart",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        openQuickStart: (state) => {
            state.opened = true;
        },
        closeQuickStart: (state) => {
            state.opened = false;
        },
        toggleOpenQuickStart: (state) => {
            state.opened = !state.opened;
        },
        toggleOpenQuickStartOnStartup: (state) => {
            const value = localStorage.getItem("openQuickStartOnStartup");
            if (value) {
                localStorage.setItem("openQuickStartOnStartup", value === "true" ? "false" : "true");
            } else {
                localStorage.setItem("openQuickStartOnStartup", "true");
            }
        },
    },
});

export const { openQuickStart, closeQuickStart, toggleOpenQuickStart, toggleOpenQuickStartOnStartup } =
    quickStartSlice.actions;

export default quickStartSlice.reducer;
