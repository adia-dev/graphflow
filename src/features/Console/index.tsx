import { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import {
  BsFillInfoCircleFill,
  BsLayoutSidebarInsetReverse,
  BsPlayFill,
  BsThreeDots,
} from "react-icons/bs";
import { CiStreamOff, CiStreamOn } from "react-icons/ci";
import {
  MdCheckCircleOutline,
  MdErrorOutline,
  MdFormatAlignLeft,
} from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import builders from "../Graph/builders";
import { selectGraph, setGraphEdges, setGraphNodes } from "../Graph/graphSlice";
import { closeConsole, openConsole, toggleOpenConsole } from "./consoleSlice";
import { formatMatrix, generateFromEdgeList, generateFromMatrix } from "./generators";

type Props = {
};

type History = {
  input: string;
  valid: boolean;
  timestamp: number;
};

const Console = (props: Props) => {
  const [valid, setValid] = useState<boolean | null>(null);
  const [liveInput, setLiveInput] = useState(true);
  const [history, setHistory] = useState(new Map<string, History>());
  const [showExamples, setShowExamples] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const isOpened = useAppSelector((state) => state.console.opened);
  const { nodes, edges } = useAppSelector(selectGraph);
  const builderIndex = useAppSelector((state) => state.graph.builderIndex);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (ref.current) {
      isOpened && ref.current.focus();
    }

    // handle the Shift key to show examples
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.shiftKey) {
        setShowExamples(true);
        if (e.key === "Enter") {
          if (ref.current) {
            e.preventDefault();
            ref.current.innerText = builders[builderIndex].exampleValue;
            formatInput();
            generate();
          }
        }
      }
    };

    const handleKeyup = (e: KeyboardEvent) => {
      if (!isOpened) return;

      if (e.key === "Shift") {
        setShowExamples(false);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
      setShowExamples(false);
    };
  }, [builderIndex]);

  function onInput() {
    if (!liveInput) {
      // TODO: move the setValid(null) to where liveInput is toggled to false
      setValid(null);
      return;
    }


    if (!ref.current) return;

    generate();
  }

  function generate() {

    if (!ref.current) return;

    let datasets = null;

    switch (builders[builderIndex].value) {
      case "matrix":
        datasets = generateFromMatrix(ref.current.innerText);
        if (datasets) {
          dispatch(setGraphNodes(datasets.nodes));
          dispatch(setGraphEdges(datasets.edges));
          setValid(true);
          if (datasets.formattedInput) {
            history.set(datasets.formattedInput, {
              input: ref.current.innerText,
              valid: true,
              timestamp: Date.now(),
            });
          }

        } else {
          setValid(false);
        }
        break;
      case "edge-list":
        datasets = generateFromEdgeList(ref.current.innerText);
        if (datasets) {
          dispatch(setGraphNodes(datasets.nodes));
          dispatch(setGraphEdges(datasets.edges));
          setValid(true);
          if (datasets.formattedInput) {
            history.set(datasets.formattedInput, {
              input: ref.current.innerText,
              valid: true,
              timestamp: Date.now(),
            });
          }
        } else {
          setValid(false);
        }
        break;
      default:
        console.log("Invalid graph builder or not implemented yet (eheh)");
        break;
    }
  }

  function formatInput() {
    if (!ref.current) return;

    const input = ref.current.innerText;
    ref.current.innerHTML = formatMatrix(input);
  }

  function openTheConsole() {
    dispatch(openConsole());
  }

  function closeTheConsole() {
    dispatch(closeConsole());
  }

  function toggleOpen() {
    dispatch(toggleOpenConsole());
  }

  return (
    <div
      className="w-full
        border-2
        bg-white
        dark:bg-dark-primary dark:border-dark-secondary
        dark:bg-opacity-60 backdrop-blur
        z-10
        dark:text-gray-200
        transition-all duration-300 ease-in-out
        flex flex-col
      "
      style={{
        height: `${isOpened ? "250px" : "50px"}`,
      }}
    >
      <div className="w-full">
        <div
          onClick={() => toggleOpen()}
          className="text-gray-500 hover:bg-primary-500 hover:text-white transition-all duration-500 ease-in-out w-full h-2 bg-gray-300 dark:bg-dark-tertiary cursor-row-resize flex items-center justify-center"
        >
          <BsThreeDots />
        </div>
        <div className="w-full p-3 flex items-center justify-between">
          <h3 className="">Console</h3>
          <div className="flex items-center space-x-3">
            <BiChevronDown
              onClick={() => toggleOpen()}
              className={`${!isOpened && "rotate-180"} transition-all duration-500 ease-in-out delay-100 cursor-pointer`}
            />
            <BsLayoutSidebarInsetReverse />
          </div>
        </div>
      </div>
      <div className="w-full flex-1 p-5 flex flex-col">
        <div className="flex items-center space-x-2 dark:text-gray-400 text-xs">
          <span>
            {builders[builderIndex].label} =
          </span>
          <div className="relative group cursor-help">
            <BsFillInfoCircleFill />
            {/* group hover popup with the information of the graphBuilder */}
            <div className="absolute bottom-full z-50 left-0 w-64 bg-white dark:bg-dark-tertiary dark:text-gray-200 rounded-md shadow-md p-3 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {builders[builderIndex].label}
                </h3>
                <BsFillInfoCircleFill />
              </div>
              <p className="text-sm">
                {builders[builderIndex].description}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                (Press Shift to see the examples and Enter to use it as input)
              </p>
              {showExamples && (
                <div className="mt-2">
                  <h4 className="text-sm font-semibold">
                    Examples
                  </h4>
                  <div className="flex flex-col space-y-2 white">
                    {builders[builderIndex].example}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full relative mt-2">
          <div
            className={`w-full rounded-md p-2 max-h-[75px] overflow-y-auto bg-gray-200 focus:ring-0 focus:outline-none outline-none dark:bg-dark-tertiary border border-gray-300 ${valid !== null &&
              (valid
                ? "text-green-500 border-green-500 bg-green-500 bg-opacity-10"
                : "text-red-500 border-red-500 bg-red-500 bg-opacity-10")
              }`}
            ref={ref}
            onInput={onInput}
            contentEditable={true}
            autoFocus={true}
          />
          <div className="absolute h-full flex items-center right-3 top-0">
            {valid !== null &&
              (valid ? (
                <MdCheckCircleOutline className="text-green-500" />
              ) : (
                <MdErrorOutline className="text-red-500" />
              ))}
          </div>
        </div>
        <div
          className="w-fit flex items-center space-x-1 mt-2 brightness-75 hover:brightness-100 cursor-pointer"
          onClick={() => setLiveInput(!liveInput)}
        >
          <span className="text-xs text-gray-500">Live input:</span>
          {liveInput ? (
            <CiStreamOn className="text-green-500 animate-pulse" />
          ) : (
            <CiStreamOff className="text-red-500" />
          )}
        </div>
        <div className="w-full flex-1 flex items-end justify-between">
          <button
            type="button"
            onClick={() => closeTheConsole()}
            className="dark:bg-dark-secondary hover:bg-dark-tertiary px-3 py-2 rounded-lg border dark:border-dark-tertiary"
          >
            Close
          </button>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="bg-primary-500 text-white hover:bg-primary-700 px-3 py-2 flex items-center space-x-3 rounded-lg"
              onClick={formatInput}
            >
              <span>Format</span>
              <MdFormatAlignLeft />
            </button>
            <button
              type="button"
              className="bg-secondary-500 text-white hover:bg-secondary-700 px-3 py-2 flex items-center space-x-3 rounded-lg"
              onClick={generate}
            >
              <span>Generate</span>
              <BsPlayFill />
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Console;
