import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Loading from "./components/Loading";
import facts from "./data/facts.json";
import Console from "./features/Console";
import {
  closeConsole,
  toggleOpenConsole,
} from "./features/Console/consoleSlice";
import Graph from "./features/Graph";
import QuickActions from "./features/QuickActions";
import {
  closeQuickActions,
  toggleOpenQuickActions,
} from "./features/QuickActions/quickActionsSlice";

function App() {


  const dispatch = useAppDispatch();
  const quickActionOpened = useAppSelector(
    (state) => state.quickActions.opened
  );

  useEffect(() => {

    function handleShortcut(e: KeyboardEvent) {
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
        />
      )}
      <div className="absolute bottom-0 w-full">
        <div className="w-full flex items-center justify-end">
          <div
            onClick={() => dispatch(toggleOpenQuickActions())}
            className="cursor-pointer w-14 aspect-square flex items-center text-xs uppercase justify-center text-gray-200 rounded-full bg-dark-primary border border-dark-secondary"
          >
            <BsSearch />
          </div>
        </div>
        <Console />
      </div>
    </div>
  );
}

export default App;
