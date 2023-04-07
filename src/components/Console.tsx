import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import {
  BsLayoutSidebarInsetReverse,
  BsPlayFill,
  BsThreeDots,
} from "react-icons/bs";
import {
  MdCheckCircleOutline,
  MdErrorOutline,
  MdFormatAlignLeft,
} from "react-icons/md";
import { CiStreamOff, CiStreamOn } from "react-icons/ci";
import { DataSet } from "vis-data";

type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
  setNodes: (nodes: any) => void;
  setEdges: (edges: any) => void;
};

const Console = (props: Props) => {
  const [valid, setValid] = useState<boolean | null>(null);
  const [liveInput, setLiveInput] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const RE = /^\s*\[(\s*\[\s*(\d+\s*,\s*)*\d+\s*\]\s*,?\s*)*\]\s*$/;

  function onInput() {
    if (!liveInput) {
      // TODO: move the setValid(null) to where liveInput is toggled to false
      setValid(null);
      return;
    }

    generate();
  }

  function formatInput() {
    if (ref.current) {
      const content = ref.current.innerText.replace(/\s*/g, "");
      ref.current.innerHTML = content;
    }
  }

  function generate() {
    if (validateInput()) {
      if (ref.current) {
        const content = ref.current.innerText.replace(/\s*/g, "");
        let matrix: (number | string)[][] = JSON.parse(content);
        let width = 0;
        matrix.forEach((row) => (width = Math.max(width, row.length)));

        matrix = matrix.map((row) =>
          row.length < width
            ? [...row, ...Array(width - row.length).fill(null)]
            : row
        );

        const nodes = matrix
          .map((row, i) =>
            row.map((val, j) => {
              return {
                id: i * 10 + j,
                x: j * 100,
                y: i * 100,
                label: val ? val.toString() : "-",
                color: val ? "#6366f1" : "#ffffff25",
              };
            })
          )
          .flat();

        props.setNodes(new DataSet(nodes, {}));

        const edges = [];
        const edgeSet = new Set<string>();

        for (let i = 0; i < matrix.length; ++i) {
          for (let j = 0; j < width; ++j) {
            const key = `${i}${j}${j}${i}`;

            if (edgeSet.has(key)) continue;

            if (j - 1 >= 0) {
              edges.push({
                from: i * 10 + j,
                to: i * 10 + j - 1,
                color:
                  matrix[i][j] && matrix[i][j - 1] ? "#6366f1" : "#ffffff25",
              });
              edgeSet.add(key);
            }

            if (i - 1 >= 0) {
              edges.push({
                from: i * 10 + j,
                to: (i - 1) * 10 + j,
                color:
                  matrix[i][j] && matrix[i - 1][j] ? "#6366f1" : "#ffffff25",
              });
              edgeSet.add(key);
            }
          }
        }

        props.setEdges(new DataSet(edges, {}));
      }
    }
  }

  function validateInput(_format?: string): boolean {
    if (ref.current) {
      const content = ref.current.innerText.replace(/\s*/g, "");
      const isValid = RE.test(content);

      setValid(isValid);
      return isValid;
    }
    return false;
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
              className={`${
                !props.open && "rotate-180"
              } transition-all duration-500 ease-in-out delay-100 cursor-pointer`}
            />
            <BsLayoutSidebarInsetReverse />
          </div>
        </div>
      </div>
      <div className="w-full flex-1 p-5 flex flex-col">
        <span className="dark:text-gray-400 text-xs">grid =</span>
        <div className="w-full relative mt-2">
          <div
            className={`w-full rounded-md p-2 max-h-[75px] overflow-y-auto dark:bg-dark-tertiary border 
                      ${
                        valid !== null &&
                        (valid
                          ? "text-green-500 dark:border-green-500 dark:bg-green-500 dark:bg-opacity-10"
                          : "text-red-500 dark:border-red-500 dark:bg-red-500 dark:bg-opacity-10")
                      }`}
            ref={ref}
            onInput={onInput}
            contentEditable={true}
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
            className="dark:bg-red-500 hover:bg-red-700 px-3 py-2 rounded-lg"
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
