import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataSet, Edge, Node, Options } from "vis-network";
import type { RootState } from "../../app/store";
import options from "./options";

// Define a type for the slice state
interface GraphState {
  nodes: Node[] | DataSet<Node>;
  edges: Edge[] | DataSet<Edge>;
  builderIndex: number | null;
  options: Options;
}

// Define the initial state using that type
const initialState: GraphState = {
  nodes: [],
  edges: [],
  options: options,
  builderIndex: null,
};

export const graphSlice = createSlice({
  name: "graph",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setGraphNodes: (state, action) => {
      state.nodes = action.payload;
    },
    setGraphEdges: (state, action) => {
      state.edges = action.payload;
    },
    setGraphOptions: (state, action) => {
      state.options = action.payload;
    },
    setGraphBuilderIndex: (state, action: PayloadAction<number>) => {
      state.builderIndex = action.payload;
    },
    /** @ts-ignore */
    getGraphBuilderIndex: (state) => {
      return state.builderIndex;
    },
    /** @ts-ignore */
    getGraphNodes: (state) => {
      return state.nodes;
    },
    /** @ts-ignore */
    getGraphEdges: (state) => {
      return state.edges;
    },
  },
});

export const selectGraph = (state: RootState) => {
  return {
    nodes: state.graph.nodes,
    edges: state.graph.edges,
    builderIndex: state.graph.builderIndex,
    options: state.graph.options,
  };
};

export const {
  setGraphNodes,
  setGraphEdges,
  setGraphOptions,
  setGraphBuilderIndex,
  getGraphBuilderIndex,
  getGraphNodes,
  getGraphEdges,
} = graphSlice.actions;

export default graphSlice.reducer;
