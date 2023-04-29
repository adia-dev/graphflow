import { useEffect } from "react";
import { BsQuestion, BsSearch } from "react-icons/bs";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
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
import Welcome from "./components/Welcome";
import Tour from "./features/Tour";
import { openTour } from "./features/Tour/tourSlice";



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
      relative
      "
    >
      <Tour />
      <Graph />
      {quickActionOpened && (
        <QuickActions
          close={() => dispatch(closeQuickActions())}
        />
      )}
      <div className="absolute bottom-0 w-full">
        <div className="w-full flex flex-col items-end justify-center space-y-2 my-2">
          <div
            onClick={() => dispatch(toggleOpenQuickActions())}
            className="cursor-pointer w-14 aspect-square flex items-center text-xs uppercase justify-center text-gray-200 rounded-full bg-dark-primary border border-dark-secondary"
          >
            <BsSearch />
          </div>
          <div
            onClick={() => dispatch(openTour())}
            className="cursor-pointer w-14 aspect-square flex items-center text-xs uppercase justify-center text-gray-200 rounded-full bg-dark-primary border border-dark-secondary"
          >
            <BsQuestion className="text-xl" />
          </div>
        </div>
        <Console />
      </div>
    </div>
  );
}

export default App;
