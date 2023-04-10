import { useEffect } from "react";
import { options } from "./options";
import { IGraphBuilder } from "./IGraphBuilderOption";


type Props = {
  close: () => void;
  setGraphBuilder: (graphBuilder: IGraphBuilder) => void;
};


const GraphBuilderOptions = (props: Props) => {


  useEffect(() => {
    const graphModal = document.getElementById("graph-modal");

    const handleClickOutside = (e: MouseEvent) => {
      if (graphModal && !graphModal.contains(e.target as Node)) props.close();
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.close();
    };


    window.addEventListener("keydown", handleKeydown);

    window.addEventListener("mouseup", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeydown);

      window.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  const GraphBuilderOption = ({ option }: { option: IGraphBuilder }) => {
    return (
      <li className=""
        onClick={() => {
          // option.callback && option.callback();
          props.setGraphBuilder(option);
          // console.log(option);
          props.close();
        }}
      >
        <input
          type="checkbox"
          id="react-option"
          value={option.label}
          className="hidden peer"
          required={true}
        />
        <label
          htmlFor={option.label}
          className="inline-flex items-center justify-between w-full p-5 h-[200px] text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-dark-tertiary peer-checked:border-primbg-primary-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-dark-secondary dark:hover:bg-dark-tertiary"
        >
          <div className="flex flex-col items-center text-center">
            {option.icon}
            <div className="w-full text-lg font-semibold">
              {option.label}
            </div>
            <div className="w-full text-xs text-gray-500">
              {option.shortDescription}
            </div>
          </div>
        </label>
      </li>
    )
  }

  return (
    <div className="w-scren h-screen absolute z-20 inset-0 text-gray-600 dark:text-gray-500 ">
      <div className="w-full h-full flex items-center justify-center bg-dark-primary bg-opacity-60 backdrop-blur-sm transition-all duration-300 ease-in-out">
        <div
          id="graph-modal"
          className="w-[650px] bg-gray-300 border border-gray-400
          dark:bg-[#121212] dark:border-dark-secondary
          rounded-3xl
          overflow-hidden
          text-lg
          shadow-xl
          "
        >
          <div className="p-5">
            <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
              Choose the best way to represent your graph
            </h3>
            <p className="text-sm text-gray-500">
              There are many ways to build a graph, please select the method
              that best fits your needs.
            </p>
            <ul className="grid w-full gap-6 my-3 md:grid-cols-3 max-h-[350px] overflow-y-auto">
              {options.map((option, i) => (
                <GraphBuilderOption option={option} key={i} />
              ))}
            </ul>

            <div className="flex justify-end mt-5">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-900 transition-colors duration-200 transform bg-white rounded-md dark:bg-dark-secondary dark:text-white hover:bg-gray-200 dark:hover:bg-dark-tertiary focus:outline-none focus:bg-gray-200 dark:focus:bg-dark-tertiary"
                onClick={() => {
                  props.close()
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 ml-3 text-sm font-medium text-white transition-colors duration-200 transform bg-primary-600 rounded-md hover:bg-primary-500 focus:outline-none focus:bg-primary-500"
                onClick={() => {
                  props.close()
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphBuilderOptions;
