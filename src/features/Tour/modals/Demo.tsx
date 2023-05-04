import { useEffect, useRef, useState } from "react";
import { AiFillBulb, AiOutlineFullscreen } from "react-icons/ai";
import { BsFillMouseFill, BsImage } from "react-icons/bs";
import { CgScrollV, CgZoomIn, CgZoomOut } from "react-icons/cg";
import { FaShare } from "react-icons/fa";
import { DataSet, Edge, Network, Node } from "vis-network";
import { useAppSelector } from "../../../app/hooks";
import { selectGraph } from "../../Graph/graphSlice";
import { BiUndo } from "react-icons/bi";

type Props = {};
type TipProps = {
  label: string;
  icon: JSX.Element;
};

const Demo = (props: Props) => {
  const demoRef = useRef<HTMLDivElement | null>(null);

  const { options } = useAppSelector(selectGraph);
  const [firstRender, setFirstRender] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  // stack of deleted nodes
  const [deletedNodes, setDeletedNodes] = useState<Node[]>([]);
  // stack of Nodes for DFS
  const [dfsNodes, setDfsNodes] = useState<Node[]>([]);
  // queue of Nodes for BFS
  const [bfsNodes, setBfsNodes] = useState<Node[]>([]);
  // set of visited Nodes
  const [visitedNodes, setVisitedNodes] = useState<Node[]>([]);
  // traversal interval
  const [traversalIntervalId, setTraversalIntervalId] = useState<number>(0);

  const [nodes, setNodes] = useState<Node[] | DataSet<Node>>([
    { id: 1, label: "1 - Voici", title: "Voici" },
    { id: 2, label: "2 - un", title: "un" },
    { id: 3, label: "3 - exemple", title: "exemple" },
    { id: 4, label: "4 - de", title: "de" },
    { id: 5, label: "5 - graphe", title: "graphe" },
    { id: 6, label: "6 - plutôt", title: "plutôt" },
    { id: 7, label: "7 - cool", title: "cool" },
    { id: 8, label: "8 - non ?", title: "non ?" },
  ]);
  const [edges, setEdges] = useState<Edge[] | DataSet<Edge>>([
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 6 },
    { from: 6, to: 7 },
    { from: 7, to: 8 },
    { from: 8, to: 1 },
  ]);

  useEffect(() => {
    const clonedOptions = structuredClone(options);

    const network =
      demoRef.current &&
      new Network(
        demoRef.current,
        {
          nodes: nodes,
          edges: edges,
        },
        clonedOptions
      );

    if (network) {

      // on click, random color on node
      network.on("click", (params) => {
        if (params.nodes.length === 1) {
          const nodeId = params.nodes[0];
          const node = nodes.find((n) => n.id === nodeId);
          if (node) {
            const newNodes = nodes.map((n) => {
              if (n.id === node.id) {
                return {
                  ...n,
                  color: '#' + Math.floor(Math.random() * 16777215).toString(16),
                };
              }
              return n;
            });
            setNodes(newNodes);
          }
        }
      });

      // right click do destroy a node
      network.on("doubleClick", (params) => {
        if (params.nodes.length === 1) {
          const nodeId = params.nodes[0];
          const node = nodes.find((n) => n.id === nodeId);
          if (node) {
            setNodes(nodes.filter((n) => n.id !== node.id));
            setDeletedNodes([...deletedNodes, node]);
          }
        }
      });

      if (network && firstRender) {
        network.fit(
          {
            minZoomLevel: 0.1,
            maxZoomLevel: 0.75,
            animation: {
              duration: 5000,
              easingFunction: "easeOutQuint",
            },
          }
        );
        setFirstRender(false);
      }

    }
  }, [demoRef, nodes, edges, options]);

  const Tip = ({ label, icon }: TipProps) => (
    <div className="relative w-fit inline font-semibold text-primary-500 group-hover:text-primary-400 underline decoration-dotted cursor-help group/zoom">
      <label className="whitespace-nowrap cursor-help">{label}</label>
      <div
        className="absolute scale-0 opacity-100
                  group-hover/zoom:opacity-100 group-hover/zoom:scale-100
                  bottom-full left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl
                  border border-gray-400
                  bg-gray-200 dark:bg-dark-secondary dark:border-dark-tertiary dark:bg-opacity-60
                  backdrop-blur-sm
                  flex items-center justify-center
                  transition-all duration-300 ease-in-out
                  shadow
                  "
      >
        {icon}
      </div>
    </div>
  );

  return (
    <div className="flex-1 w-full h-full overflow-hidden">
      <div className="w-full h-80 galaxy-background relative">
        <div ref={demoRef} className="w-full h-full"></div>
        <div className="absolute top-2 right-2 flex flex-col rounded-xl  cursor-pointer border dark:border-dark-tertiary">
          <div className="w-9 h-9 p-2 flex items-center justify-center dark:bg-dark-secondary brightness-90 hover:brightness-100
           transition-all duration-300 border-b dark:border-b-dark-tertiary relative group/zoom">
            <CgZoomIn className="text xs text-gray-500 dark:text-gray-400" />
          </div>
          <div className="w-9 h-9 p-2 flex items-center justify-center dark:bg-dark-secondary brightness-90 hover:brightness-100
           transition-all duration-300 border-b dark:border-b-dark-tertiary relative group/zoom">
            <CgZoomOut className="text xs text-gray-500 dark:text-gray-400" />
          </div>
          <div
            onClick={() => {
              if (deletedNodes.length === 0) return;
              setNodes([...nodes, deletedNodes[deletedNodes.length - 1]]);
              setDeletedNodes(deletedNodes.slice(0, deletedNodes.length - 1));
            }}
            className="w-9 h-9 p-2 flex items-center justify-center dark:bg-dark-secondary brightness-90 hover:brightness-100
           transition-all duration-300 border-b dark:border-b-dark-tertiary relative group/zoom">
            <BiUndo className="text xs text-gray-500 dark:text-gray-400" />
          </div>
          <div
            onClick={() => {
              setFullscreen(!fullscreen);
            }}
            className="w-9 h-9 p-2 flex items-center justify-center dark:bg-dark-secondary brightness-90 hover:brightness-100
           transition-all duration-300 border-b dark:border-b-dark-tertiary relative group/zoom">
            <AiOutlineFullscreen className="text xs text-gray-500 dark:text-gray-400" />
          </div>
        </div>
        <div className="absolute right-2 bottom-2 flex flex-col rounded-xl  cursor-pointer border dark:border-dark-tertiary">
          <div className="w-9 h-9 p-2 flex items-center justify-center dark:bg-dark-secondary brightness-90 hover:brightness-100
           transition-all duration-300 border-b dark:border-b-dark-tertiary relative group/share">
            <FaShare className="text-xs text-gray-500 dark:text-gray-400" />
            <div
              className="absolute scale-0 opacity-100
                  group-hover/share:opacity-100 group-hover/share:scale-100
                  top=0 right-10 p-3 rounded-xl
                  border border-gray-400
                  bg-gray-200 dark:bg-dark-secondary dark:border-dark-tertiary dark:bg-opacity-60
                  backdrop-blur-sm
                  flex items-center justify-center
                  transition-all duration-300 ease-in-out
                  shadow
                  "
            >
              <label className="whitespace-nowrap text-xs">
                Share your first graph !
              </label>
            </div>
          </div>
          <div className="w-9 h-9 p-2 flex items-center justify-center dark:bg-dark-secondary brightness-90 hover:brightness-100
           transition-all duration-300 border-b dark:border-b-dark-tertiary relative group/share">
            <BsImage className="text-xs text-gray-500 dark:text-gray-400" />
            <div
              className="absolute scale-0 opacity-100
                  group-hover/share:opacity-100 group-hover/share:scale-100
                  top=0 right-10 p-3 rounded-xl
                  border border-gray-400
                  bg-gray-200 dark:bg-dark-secondary dark:border-dark-tertiary dark:bg-opacity-60
                  backdrop-blur-sm
                  flex items-center justify-center
                  transition-all duration-300 ease-in-out
                  shadow
                  "
            >
              <label className="whitespace-nowrap text-xs">
                Take a screenshot !
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="font-bold text-xl">
          Here is a quick demo of the things you can do !
        </h1>
        <p className="text-sm text-gray-500 my-2">
          Try playing around with the nodes present in the graph
        </p>
        <div
          className="
            group
            cursor-pointer
            flex items-center justify-between
            mt-2
            p-2
            rounded-lg
            bg-gray-100
            dark:bg-dark-tertiary
            hover:scale-[0.98]
            hover:bg-gray-100 hover:text-black
            dark:hover:bg-dark-quaternary dark:hover:text-gray-400
            transition duration-300 ease-in-out
            text-gray-500
            "
        >
          <div className="flex items-center space-x-2">
            <AiFillBulb className="text-2xl text-yellow-300 dark:text-yellow-500 group-hover:text-yellow-300 mr-2" />
            <p className="text-sm">
              You can{" "}
              <Tip label="Zoom In" icon={<CgZoomIn className="text-xl" />} />
              &nbsp;and&nbsp;
              <Tip label="Zoom Out" icon={<CgZoomOut className="text-xl" />} />
              &nbsp;by&nbsp;
              <Tip
                label="Scrolling"
                icon={
                  <CgScrollV className="text-xl animate-pulse animate-bounce" />
                }
              />
              <br />
              as well as moving around the canvas by{" "}
              <Tip
                label="Holding"
                icon={
                  <CgScrollV className="text-xl animate-pulse animate-bounce" />
                }
              />
              &nbsp;the{" "}
              <Tip
                label="Left Mouse Button"
                icon={<BsFillMouseFill className="text-xl" />}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
