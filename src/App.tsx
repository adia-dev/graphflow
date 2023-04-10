import { useEffect, useState } from "react";
import { DataSet } from "vis-data";
import "./App.css";
import Graph from "./components/Graph";
import QuickActions from "./components/QuickActions";
import { BsSearch } from "react-icons/bs";
import Console from "./components/Console";
import { Options } from "vis-network";
import facts from "./data/facts.json";
import Loading from "./components/Loading";
import graphOptions from "./components/Graph/graphOptions";

function App() {
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [loadingPct, setLoadingPct] = useState(999);
  const [currentFact, setCurrentFact] = useState(0);
  const [options, setOptions] = useState<Options>(graphOptions);
  const [nodes, setNodes] = useState(new DataSet([]));
  const [edges, setEdges] = useState(new DataSet([]));

  useEffect(() => {
    // increase the loading percentage by a random amount to emulate a loading bar
    const interval = setInterval(() => {
      setLoadingPct((pct) => Math.min(pct + Math.random() * 75, 101));
      setCurrentFact((fact) => (fact + 1) % facts.length);
    }, 2000);

    if (loadingPct >= 100) clearInterval(interval);

    return () => clearInterval(interval);
  }, [loadingPct]);

  useEffect(() => {
    function handleShortcut(e: KeyboardEvent) {
      // console.log(e.key);

      if (e.metaKey || e.ctrlKey) {
        if (e.key == "k") setQuickSearchOpen((state) => !state);
        if (e.key == "i") setConsoleOpen((state) => !state);
      } else if (e.key == "Escape") {
        setQuickSearchOpen(false);
        setConsoleOpen(false);
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
      bg-gray-200 dark:bg-dark-primary
      block 
      grid-background
      galaxy-background
      relative
      "
    >
      <Graph edges={edges} nodes={nodes} options={options} />
      {quickSearchOpen && (
        <QuickActions
          close={() => setQuickSearchOpen(false)}
          options={options}
          setOptions={setOptions}
        />
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
