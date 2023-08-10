import { useEffect, useRef } from "react";
import { Network } from "vis-network";
import { useAppSelector } from "../../app/hooks";
import ConnectedUsers from "../../components/ConnectedUsers";
import Cursor from "../Cursor";
import { selectGraph } from "./graphSlice";
export * from "./options";

type Props = {};

const Graph = (_props: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const cursor = useAppSelector((state) => state.cursor);
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
      // settimeout 2000
      setTimeout(() => {
        network.fit({
          minZoomLevel: 0.1,
          maxZoomLevel: 0.75,
          animation: {
            duration: 5000,
            easingFunction: "easeOutQuint",
          },
        });
      }, 1000);
    }
  }, [ref, nodes, edges, options]);

  return (
    <div className="w-full h-full relative">
      <div
        ref={ref}
        className="w-full h-full dark:text-white"
        style={{
          cursor: `${cursor.visible ? "auto" : "none"}`,
        }}
      ></div>
      <div className="absolute z-10 left-2 top-2">
        <ConnectedUsers />
      </div>
      { /* <Cursor /> */ }
    </div>
  );
};

export default Graph;
