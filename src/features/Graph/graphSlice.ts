import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { DataSet, Edge, Node, Options } from "vis-network";
import options from "./options";

// Define a type for the slice state
interface GraphState {
  nodes: Node[] | DataSet<Node>;
  edges: Edge[] | DataSet<Edge>;
  options?: Options;
}

// Define the initial state using that type
const initialState: GraphState = {
  nodes: [],
  edges: [],
  options,
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
    /** @ts-ignore */
    getNodes: (state) => {
      return state.nodes;
    },
    /** @ts-ignore */
    getEdges: (state) => {
      return state.edges;
    },
  },
});

export const selectGraph = (state: RootState) => {
  return {
    nodes: state.graph.nodes,
    edges: state.graph.edges,
    options: state.graph.options,
  };
};

export const {
  setGraphNodes,
  setGraphEdges,
  setGraphOptions,
  getNodes,
  getEdges,
} = graphSlice.actions;

export default graphSlice.reducer;
