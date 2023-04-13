import { useEffect, useRef } from "react";
import { Network } from "vis-network";
import { useAppSelector } from "../../app/hooks";
import { selectGraph } from "./graphSlice";
export * from "./options";

type Props = {

};

const Graph = (props: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { nodes, edges, options } = useAppSelector(selectGraph);

  useEffect(() => {

    const clonedOptions = structuredClone(options);

    const network =
      ref.current &&
      new Network(
        ref.current,
        {
          nodes: nodes,
          edges: edges,
        },
        clonedOptions
      );

    if (network) {
      var radius = 150;
    }
  }, [ref, nodes, edges, options]);

  return <div ref={ref} className="w-full h-full dark:text-white"></div>;
};

export default Graph;
