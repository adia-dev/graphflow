import { useEffect } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { useAppDispatch } from "../../../app/hooks";
import { IGraphBuilder } from "../IGraphBuilder";
import builders from "../builders";
import { setGraphBuilderIndex } from "../graphSlice";


type Props = {
  close: () => void;
  closeAll: () => void;
};


const GraphBuilderOptions = (props: Props) => {
  useEffect(() => {
    const graphModal = document.getElementById("graph-modal");

    const handleClickOutside = (e: MouseEvent) => {
      if (graphModal && !graphModal.contains(e.target as Node)) {
        props.close();
      }
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

  const dispatch = useAppDispatch();

  const GraphBuilderOption = ({ builder }: { builder: IGraphBuilder }) => {
    return (
      <li className="relative"
        onClick={() => {
          if (builder.notimplemented) return;

          dispatch(setGraphBuilderIndex(builder.index))
          props.closeAll();
        }}
      >
        {builder.notimplemented && (
          <div className="absolute top-2 right-2">
            <RiErrorWarningFill />
          </div>
        )
        }
        <input
          type="checkbox"
          id="react-option"
          value={builder.label}
          className="hidden peer"
          required={true}
        />
        <label
          htmlFor={builder.label}
          className="inline-flex items-center justify-between w-full p-5 h-[200px] text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-dark-tertiary peer-checked:border-primbg-primary-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-dark-secondary dark:hover:bg-dark-tertiary
            transition duration-200 ease-in-out
            group relative
          "
          style={{
            cursor: builder.notimplemented ? "not-allowed" : "pointer",
            filter: builder.notimplemented ? "brightness(0.5)" : "none",
          }}

        >
          <div className="flex flex-col items-center text-center">
            {builder.icon}
            <div className="w-full text-lg font-semibold">
              {builder.label}
            </div>
            <div className="w-full text-xs text-gray-500">
              {builder.shortDescription}
            </div>
          </div>
          {
            builder.notimplemented && <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center group-hover:translate-y-0 translate-y-3 trnaistion-all duration-300 ease-in-out">
              <div className="w-3/4 p-3 rounded-2xl bg-black flex flex-col items-center text-red-500">
                <RiErrorWarningFill />
                <div className="text-xs text-red-500 text-center">
                  Not implemented yet
                </div>
              </div>
            </div>
          }
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
              {builders.map((builder, i) => (
                <GraphBuilderOption builder={builder} key={i} />
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
