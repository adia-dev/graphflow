import { useState } from "react";
import { DataSet } from "vis-data";
import "./App.css";
import Graph from "./components/Graph";

function App() {
  const options = {};

  const [nodes, setNodes] = useState(
    new DataSet(
      [
        { id: 1, label: "Node 1", x: 0, y: 0 },
        { id: 2, label: "Node 2", x: 100, y: 0 },
        { id: 3, label: "Node 3", x: 0, y: 100 },
        { id: 4, label: "Node 4", x: 100, y: 100 },
      ],
      options
    )
  );
  const [edges, setEdges] = useState(
    new DataSet(
      [
        { id: 1, from: 1, to: 2 },
        { id: 2, from: 1, to: 3 },
        { id: 3, from: 2, to: 4 },
        { id: 4, from: 3, to: 4 },
      ],
      options
    )
  );

  return (
    <div
      className="w-screen h-screen overflow-hidden
      bg-gray-200 dark:bg-dark-primary
      block grid-background
      "
    >
      <Graph edges={edges} nodes={nodes} />
    </div>
  );
}

export default App;
