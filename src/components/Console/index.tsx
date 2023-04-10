import { useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import {
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
import { formatMatrix, generateFromAdjacencyList, generateFromMatrix } from "./generators";

type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
  setNodes: (nodes: any) => void;
  setEdges: (edges: any) => void;
  graphType: string;
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
  const ref = useRef<HTMLDivElement | null>(null);


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

    switch (props.graphType) {
      case "matrix":
        datasets = generateFromMatrix(ref.current.innerText);
        if (datasets) {
          props.setNodes(datasets.nodes);
          props.setEdges(datasets.edges);
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
      case "adjacencyList":
        datasets = generateFromAdjacencyList(ref.current.innerText);
        if (datasets) {
          props.setNodes(datasets.nodes);
          props.setEdges(datasets.edges);
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
        break;
    }
  }

  function formatInput() {
    if (!ref.current) return;

    const input = ref.current.innerText;
    ref.current.innerHTML = formatMatrix(input);
  }

  return (
    <div
      className="w-full
        border-2
        dark:bg-dark-primary dark:border-dark-secondary
        dark:bg-opacity-60 backdrop-blur
        z-10
        dark:text-gray-200
        transition-all duration-300 ease-in-out
        overflow-y-hidden
        flex flex-col
      "
      style={{
        height: `${props.open ? "250px" : "50px"}`,
      }}
    >
      <div className="w-full">
        <div
          onClick={() => props.setOpen(!props.open)}
          className="text-gray-500 hover:bg-primary-500 hover:text-white transition-all duration-500 ease-in-out w-full h-2 dark:bg-dark-tertiary cursor-row-resize flex items-center justify-center"
        >
          <BsThreeDots />
        </div>
        <div className="w-full p-3 flex items-center justify-between">
          <h3 className="">Console</h3>
          <div className="flex items-center space-x-3">
            <BiChevronDown
              onClick={() => props.setOpen(!props.open)}
              className={`${!props.open && "rotate-180"} transition-all duration-500 ease-in-out delay-100 cursor-pointer`}
            />
            <BsLayoutSidebarInsetReverse />
          </div>
        </div>
      </div>
      <div className="w-full flex-1 p-5 flex flex-col">
        <span className="dark:text-gray-400 text-xs">{props.graphType} =</span>
        <div className="w-full relative mt-2">
          <div
            className={`w-full rounded-md p-2 max-h-[75px] overflow-y-auto dark:bg-dark-tertiary border ${valid !== null &&
              (valid
                ? "text-green-500 dark:border-green-500 dark:bg-green-500 dark:bg-opacity-10"
                : "text-red-500 dark:border-red-500 dark:bg-red-500 dark:bg-opacity-10")
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
            onClick={() => props.setOpen(false)}
            className="dark:bg-dark-secondary hover:bg-dark-tertiary px-3 py-2 rounded-lg border dark:border-dark-tertiary"
          >
            Close
          </button>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="dark:bg-primary-500 hover:bg-primary-700 px-3 py-2 flex items-center space-x-3 rounded-lg"
              onClick={formatInput}
            >
              <span>Format</span>
              <MdFormatAlignLeft />
            </button>
            <button
              type="button"
              className="dark:bg-secondary-500 hover:bg-secondary-700 px-3 py-2 flex items-center space-x-3 rounded-lg"
              onClick={generate}
            >
              <span>Generate</span>
              <BsPlayFill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Console;
