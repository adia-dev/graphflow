import React, { useRef } from "react";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { BsLayoutSidebarInsetReverse } from "react-icons/bs";

type Props = {};

const Console = (props: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

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
        height: `${open ? "250px" : "50px"}`,
      }}
    >
      <div className="w-full p-3 border-b-2 dark:border-dark-secondary flex items-center justify-between">
        <h3 className="">Console</h3>
        <div className="flex items-center space-x-3">
          <BiChevronDown
            onClick={() => setOpen(!open)}
            className={`${
              !open && "rotate-180"
            } transition-all duration-500 ease-in-out delay-100 cursor-pointer`}
          />
          <BsLayoutSidebarInsetReverse />
        </div>
      </div>
      <div className="w-full flex-1 p-5 flex flex-col">
        <span className="dark:text-gray-400 text-xs">grid =</span>
        <div
          className="w-full rounded-md mt-2 p-2 max-h-[75px] overflow-y-auto dark:bg-dark-tertiary"
          ref={ref}
          contentEditable={true}
        >
          [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]
          <span className="text-red-500">]</span>
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
              className="dark:bg-dark-tertiary hover:bg-dark-secondary px-3 py-2 rounded-lg"
            >
              Clear
            </button>
            <button
              type="button"
              className="dark:bg-primary-500 hover:bg-primary-700 px-3 py-2 rounded-lg"
            >
              Run
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Console;
