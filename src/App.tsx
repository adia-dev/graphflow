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
  const [openedModal, setOpenedModal] = useState<string | null>(null);
  const [graphBuilder, setGraphBuilder] = useState(graphBuilderOptions[0]);

  const dispatch = useAppDispatch();
  const quickActionOpened = useAppSelector(state => state.quickActions.opened);


  //? This is for the loading screen
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
  }, []);

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
      <Graph />
      {quickActionOpened && (
        <QuickActions
          close={() => dispatch(closeQuickActions())}
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
          graphBuilder={graphBuilder}
        />
      </div>
    </div>
  );
}

export default App;
