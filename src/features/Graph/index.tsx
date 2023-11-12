import React, { useEffect, useRef, useState } from "react";
import { Network } from "vis-network";
import { useAppSelector } from "../../app/hooks";
import ConnectedUsers from "../../components/ConnectedUsers";
// import Cursor from "../Cursor";
import { selectGraph } from "./graphSlice";

const Graph = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const { nodes, edges, options } = useAppSelector(selectGraph);

  useEffect(() => {
    const clonedOptions = structuredClone(options);
    const network = ref.current
      ? new Network(ref.current, { nodes, edges }, clonedOptions)
      : null;

    if (network) {
      network.on("oncontext", function (params) {
        params.event.preventDefault();
        if (params.nodes.length > 0) {
          setSelectedNode(params.nodes[0]);
          setContextMenuPosition({ x: params.pointer.DOM.x, y: params.pointer.DOM.y });
          setShowContextMenu(true);
        } else {
          setShowContextMenu(false);
        }
      });
    }
  }, [nodes, edges, options]);

  const handleContextMenuAction = (action) => {
    switch (action) {
      case "delete":
        // Code to delete the node
        console.log("Deleting node:", selectedNode);
        break;
      case "add":
        // Code to add a node
        console.log("Adding a new node");
        break;
      default:
        console.log("Action selected:", action);
    }
    setShowContextMenu(false);
  };

  return (
    <div className="w-full h-full relative">
      <div ref={ref} className="w-full h-full dark:text-white"></div>
      {showContextMenu && (
        <div
          className="absolute z-20 bg-white shadow-lg rounded-md overflow-hidden"
          style={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
        >
          <ul className="text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleContextMenuAction('delete')}>Delete Node</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleContextMenuAction('add')}>Add Node</li>
            {/* Add more menu items here */}
          </ul>
        </div>
      )}
      <div className="absolute z-10 left-2 top-2">
        <ConnectedUsers />
      </div>
      {/* <Cursor /> */}
    </div>
  );
};

export default Graph;

