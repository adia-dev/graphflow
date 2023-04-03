import { useEffect, useState } from "react";
import { DataSet } from "vis-data";
import "./App.css";
import Graph from "./components/Graph";
import QuickSearch from "./components/QuickSearch";
import { BsSearch } from "react-icons/bs";
import Console from "./components/Console";
import { AiOutlineLoading, AiOutlineLoading3Quarters } from "react-icons/ai";

function App() {
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [loadingPct, setLoadingPct] = useState(0);
  const [currentFact, setCurrentFact] = useState(0);

  const randomFacts = [
    "Graphflow helps you visualize your data !",
    "It is as easy as copy-pasting your data into the console !",
    "Graphflow is a work in progress, so please be patient with me !",
    "Graphflow is open source, so feel free to contribute !",
    "The console supports live input, so you can see your graph update as you type !",
    "Graphflow is built with React, Typescript, and Vis.js",
    "Checkout my other projects on my Github page ! (@adia-dev)",
    "I am a student at the school ESGI in Paris, France",
    "You can use the keyboard shortcuts Ctrl/Cmd + K to open the quick search, and Ctrl/Cmd + I to open the console",
    "You can use the keyboard shortcut Escape to close the quick search and the console",
  ];

  useEffect(() => {
    // increase the loading percentage by a random amount to emulate a loading bar
    const interval = setInterval(() => {
      setLoadingPct((pct) => Math.min(pct + Math.random() * 75, 101));
      setCurrentFact((fact) => (fact + 1) % randomFacts.length);
    }, 2000);

    if (loadingPct >= 100) clearInterval(interval);


    return () => clearInterval(interval);
  }, [loadingPct]);


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

  useEffect(() => {
    function handleShortcut(e: KeyboardEvent) {
      // console.log(e.key);

      if (e.metaKey || e.ctrlKey) {
        if (e.key == "k") setQuickSearchOpen((state) => !state);
        if (e.key == "i") setConsoleOpen((state) => !state);
      }
      else if (e.key == "Escape") {
        setQuickSearchOpen(false);
        setConsoleOpen(false);
      }

      else if (e.key == "Enter") {
        // add a random node
        const id = Math.floor(Math.random() * 1000000);
        const randomRadius = Math.floor(Math.random() * 1000);
        const randomCOlor = Math.floor(Math.random() * 16777215).toString(16);
        const color = "#" + randomCOlor;
        const x = Math.floor(Math.random() * 1000);
        const y = Math.floor(Math.random() * 1000);
        nodes.add({ id, x, y, color, label: id.toString(), shape: "circle", size: randomRadius });
        console.log(nodes);
        // connect it to a random node that has at least one edge
        const connectedNodes = nodes.get({
          filter: (node) => edges.get({ filter: (edge) => edge.to == node.id || edge.from == node.id }).length > 0,
        });
        if (connectedNodes.length > 0) {
          const randomNode = connectedNodes[Math.floor(Math.random() * connectedNodes.length)];
          const dimmedColor = color + "55";
          edges.add({ id: Math.floor(Math.random() * 1000000), from: randomNode.id, to: id, color: dimmedColor });
        }

      }
    }

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, [nodes]);

  if (loadingPct <= 100) {
    return (
      <div className="w-screen h-screen dark:bg-dark-primary flex items-center justify-center flex-col">
        <div className="py-3 w-full flex items-center space-x-3 justify-center">
          <h1 className="text-2xl text-primary-500 font-bold">
            Graphflow is getting ready...
          </h1>
          <h1 className="text-2xl text-primary-500 font-bold">
            {loadingPct.toFixed(0)}%
          </h1>
          <AiOutlineLoading3Quarters className="text-primary-500 text-5xl animate-spin" />
        </div>
        <div className="w-1/2 h-1 bg-primary-900 rounded-full">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500"
            style={{ width: `${loadingPct}%` }}
          ></div>
          {/* quote block */}
          <div className="w-full flex items-center justify-center mt-5 text-gray-200">
            <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white
              p-3 dark:bg-dark-secondary rounded-md shadow-md hover:shadow-lg hover:bg-dark-tertiary
              transition-all duration-300
              cursor-pointer whitespace-nowrap
            "
              onClick={() => setCurrentFact((fact) => (fact + 1) % randomFacts.length)}
            >
              ❝&nbsp;{randomFacts[currentFact]}&nbsp;❞
            </blockquote>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-screen h-screen overflow-hidden
      bg-gray-200 dark:bg-dark-primary
      block 
      grid-background
      galaxy-background
      relative
      "
    >
      <Graph edges={edges} nodes={nodes} />
      {quickSearchOpen && (
        <QuickSearch close={() => setQuickSearchOpen(false)} />
      )}
      <div className="absolute bottom-0 w-full">
        <div className="w-full flex items-center justify-end">
          <div
            onClick={() => setQuickSearchOpen(true)}
            className="cursor-pointer w-14 aspect-square flex items-center text-xs uppercase justify-center text-gray-200 rounded-full bg-dark-primary border border-dark-secondary"
          >
            <BsSearch />
          </div>
        </div>
        <Console
          open={consoleOpen}
          setOpen={setConsoleOpen}
          setNodes={setNodes}
          setEdges={setEdges}
        />
      </div>
    </div>
  );
}

export default App;
