import React, { useEffect, useRef } from "react";
import { DataSet, Edge, Network, Node } from "vis-network";

type Props = {
  nodes: Node[] | DataSet<Node>;
  edges: Edge[] | DataSet<Edge>;
};

const Graph = ({ nodes, edges }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const network =
      ref.current &&
      new Network(
        ref.current,
        {
          nodes: nodes,
          edges: edges,
        },
        {
          nodes: {
            shape: "dot",
            size: 16,
            font: {
              size: 12,
              color: "#ffffff",
            },
            borderWidth: 2,
          },
          edges: {
            width: 2,
          },
          interaction: {
            hover: true,
          },
          physics: {
            enabled: true,
            barnesHut: {
              gravitationalConstant: -80000,
              centralGravity: 0.3,
              springLength: 95,
              springConstant: 0.04,
              damping: 0.09,
              avoidOverlap: 0,
            },
            maxVelocity: 146,
            solver: "barnesHut",
            timestep: 0.5,
            stabilization: {
              enabled: true,
              iterations: 1000,
              updateInterval: 100,
              onlyDynamicEdges: false,
              fit: true,
            },
            adaptiveTimestep: true,
          },
        }
      );

    if (network) {
    }
  }, []);

  return <div ref={ref} className="w-full h-full"></div>;
};

export default Graph;
