import React, { useEffect, useRef } from "react";
import { DataSet, Edge, Network, Node, Options } from "vis-network";
export * from "./graphOptions";

type Props = {
  nodes: Node[] | DataSet<Node>;
  edges: Edge[] | DataSet<Edge>;
  options?: Options;
};

const Graph = ({ nodes, edges, options }: Props) => {
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
        options
      );

    if (network) {
      var radius = 150;
    }
  }, [ref, nodes, edges, options]);

  return <div ref={ref} className="w-full h-full"></div>;
};

export default Graph;
