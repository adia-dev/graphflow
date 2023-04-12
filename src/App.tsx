import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { DataSet } from "vis-data";
import { Options } from "vis-network";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Graph from "./features/Graph";
import GraphBuilderOptions from "./components/GraphBuiler/GraphBuilderOptions";
import { options as graphBuilderOptions } from "./components/GraphBuiler/options";
import Loading from "./components/Loading";
import facts from "./data/facts.json";
import Console from "./features/Console";
import { closeConsole, toggleOpenConsole } from "./features/Console/consoleSlice";
import QuickActions from "./features/QuickActions";
import { closeQuickActions, toggleOpenQuickActions } from "./features/QuickActions/quickActionsSlice";





function App() {
  const [loadingPct, setLoadingPct] = useState(999);
  const [currentFact, setCurrentFact] = useState(0);
  const [options, setOptions] = useState<Options>({
    nodes: {
      shape: "dot",
      size: 16,
      font: {
        size: 12,
        color: "inherit",
      },
      borderWidth: 2,
    },
    edges: {
      width: 2,
      smooth: false,
      arrows: {
        to: { enabled: true, scaleFactor: 0.5 },
      },
    },
    interaction: {
      hover: true,
      hoverConnectedEdges: true,
      selectable: true,
      selectConnectedEdges: true,
      // navigationButtons: true,
      // keyboard: {
      //   enabled: true,
      //   speed: { x: 10, y: 10, zoom: 0.03 },
      //   bindToWindow: true,
      // },
    },
    // layout: {
    //   randomSeed: 1,
    //   improvedLayout: true,
    //   hierarchical: {
    //     enabled: true,
    //     levelSeparation: 100,
    //     nodeSpacing: 300,
    //     treeSpacing: 100,
    //     blockShifting: false,
    //     edgeMinimization: false,
    //     parentCentralization: true,
    //     direction: "LR", // UD, DU, LR, RL
    //     sortMethod: "directed", // hubsize, directed
    //     shakeTowards: "roots", // roots, leaves
    //   },
    // },
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
        updateInterval: 100000,
        onlyDynamicEdges: false,
        fit: true,
      },
      adaptiveTimestep: true,
    },
  });
  const [nodes, setNodes] = useState(new DataSet([]));
  const [edges, setEdges] = useState(new DataSet([]));
  const [openedModal, setOpenedModal] = useState<string | null>(null);
  const [graphBuilder, setGraphBuilder] = useState(graphBuilderOptions[0]);

  const dispatch = useAppDispatch();
  const quickActionOpened = useAppSelector(state => state.quickActions.opened);


  // useEffect(() => {
  //   // increase the loading percentage by a random amount to emulate a loading bar
  //   const interval = setInterval(() => {
  //     setLoadingPct((pct) => Math.min(pct + Math.random() * 75, 101));
  //     setCurrentFact((fact) => (fact + 1) % facts.length);
  //   }, 2000);

  //   if (loadingPct >= 100) clearInterval(interval);

  //   return () => clearInterval(interval);
  // }, [loadingPct]);

  useEffect(() => {
    function handleShortcut(e: KeyboardEvent) {
      // console.log(e.key);

      if (e.metaKey || e.ctrlKey) {
        if (e.key == "k") dispatch(toggleOpenQuickActions());
        if (e.key == "i") dispatch(toggleOpenConsole());
      } else if (e.key == "Escape") {
        dispatch(closeQuickActions());
        dispatch(closeConsole());
      } else if (e.key == "Enter") {
      }
    }

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, [nodes]);

  if (loadingPct <= 100) {
    return (
      <Loading
        loadingPct={loadingPct}
        quote={facts[currentFact]}
        nextQuote={() => setCurrentFact((fact) => (fact + 1) % facts.length)}
      />
    );
  }

  return (
    <div
      className="w-screen h-screen overflow-hidden
      bg-gray-50 dark:bg-dark-primary
      block 
      galaxy-background
      "
    >
      <Graph edges={edges} nodes={nodes} options={options} />
      {quickActionOpened && (
        <QuickActions
          close={() => dispatch(closeQuickActions())}
          options={options}
          setOptions={setOptions}
          setOpenedModal={setOpenedModal}
        />
      )}
      {openedModal &&
        <GraphBuilderOptions
          close={() => setOpenedModal(null)}
          setGraphBuilder={setGraphBuilder}
        />}
      <div className="absolute bottom-0 w-full">
        <div className="w-full flex items-center justify-end">
          <div
            onClick={() => dispatch(toggleOpenQuickActions())}
            className="cursor-pointer w-14 aspect-square flex items-center text-xs uppercase justify-center text-gray-200 rounded-full bg-dark-primary border border-dark-secondary"
          >
            <BsSearch />
          </div>
        </div>
        <Console
          setNodes={setNodes}
          setEdges={setEdges}
          graphBuilder={graphBuilder}
        />
      </div>
    </div>
  );
}

export default App;
