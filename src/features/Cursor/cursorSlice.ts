import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Position } from "../../types";

// Define a type for the slice state
interface CursorState {
  visible: boolean;
  position: Position;
  label?: string | JSX.Element;
  color?: string;
}

// Define the initial state using that type
const initialState: CursorState = {
  position: { x: 0, y: 0 },
  visible: true,
  label: "Abdoulaye Dia",
  color: "#6366f1",
};

export const cursorSlice = createSlice({
  name: "cursor",
  initialState,
  reducers: {
    showCursor: (state) => {
      state.visible = false;
    },
    hideCursor: (state) => {
      state.visible = false;
    },
    toggleCursorVisibility: (state) => {
      state.visible = !state.visible;
    },
    setPosition: (state, action: PayloadAction<Position>) => {
      state.position = action.payload;
    },
    setLabel: (state, action: PayloadAction<string>) => {
      state.label = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
});

export const {
  showCursor,
  hideCursor,
  toggleCursorVisibility,
  setPosition,
  setLabel,
  setColor,
} = cursorSlice.actions;

export default cursorSlice.reducer;
