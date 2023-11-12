import React, { useEffect, useState } from "react";
import { BiRightArrowAlt, BiSearch } from "react-icons/bi";
import { GiPathDistance } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import {
  TbArrowBounce,
  TbArrowMoveRight,
  TbBinaryTree,
  TbBinaryTree2,
  TbCircuitChangeover,
} from "react-icons/tb";
import { TfiLayoutGrid4 } from "react-icons/tfi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import GraphBuilderOptions from "../Graph/components/GraphBuilderOptions";
import { setGraphOptions } from "../Graph/graphSlice";

type Props = {
  close: () => void;
};

type Action = {
  name: string;
  category: string;
  icon?: JSX.Element;
  goTo?: string;
  shortcut?: string[];
  callback?: () => void | Promise<void>;
};

const QuickActions = (props: Props) => {
  const dispatch = useAppDispatch();
  const options = useAppSelector((state) => state.graph.options);
  const [graphBuilderOptionsOpened, setGraphBuilderOptionsOpened] =
    useState(false);
  const [filteredCategory, setFilteredCategory] = useState<string>("all");

  const actions: Action[] = [
    {
      name: "New Tree",
      icon: <TbBinaryTree />,
      category: "trees",
      shortcut: ["⌘", "⌃", "N"],
    },
    {
      name: "New Graph",
      icon: <TbCircuitChangeover />,
      category: "graphs",
      // shortcut: ["⌘", "⌃", "N"],
      goTo: "Graph Builder",
      callback: () => {
        setGraphBuilderOptionsOpened(true);
      },
    },
    {
      name: "Binary Tree",
      icon: <TbBinaryTree />,
      category: "trees",
      shortcut: ["⌘", "⌃", "T"],
    },
    {
      name: "N-Ary Tree",
      icon: <TbBinaryTree2 />,
      category: "trees",
      shortcut: ["⌘", "⌃", "T"],
    },
    {
      name: "Matrix | Grid",
      icon: <TfiLayoutGrid4 />,
      category: "matrices",
      shortcut: ["⌘", "⌃", "M"],
    },
    {
      name: "Toggle Physics",
      icon: <TbArrowBounce />,
      category: "config",
      shortcut: ["⌘", "⌃", "P"],
      callback: () => {
        const updatedOptions = {
          ...options,
          physics: { ...options.physics, enabled: !options.physics.enabled },
        };
        dispatch(setGraphOptions(updatedOptions));
        props.close();
      },
    },
    {
      name: "Toggle Edge Arrows",
      icon: <TbArrowMoveRight />,
      category: "config",
      shortcut: ["⌘", "⌃", "D"],
      callback: () => {
        if (
          !options.edges ||
          !options.edges.arrows ||
          typeof options.edges.arrows === "string" ||
          !options.edges.arrows.to
        )
          return;
        const updatedOptions = {
          ...options,
          edges: {
            ...options.edges,
            arrows: {
              ...options.edges.arrows,
              to:
                typeof options.edges.arrows.to === "boolean"
                  ? !options.edges.arrows.to
                  : !options.edges.arrows.to.enabled,
            },
          },
        };
        dispatch(setGraphOptions(updatedOptions));

        props.close();
      },
    },
    {
      name: "Preferences",
      icon: <IoSettingsSharp />,
      category: "settings",
      shortcut: ["⌘", ","],
      callback: () => {},
    },
    // builders
    {
      name: "Matrix Builder",
      icon: <TfiLayoutGrid4 />,
      category: "builders",
      shortcut: ["⌘", "⌃", "M"],
      callback() {
        // dispatch(setGraphBuilderID("matrix"));
      },
    },
    {
      name: "Depth First Search",
      icon: <GiPathDistance />,
      category: "algorithms",
      callback() {
        // dispatch(setGraphBuilderID("matrix"));
      },
    },
    {
      name: "Breadth First Search",
      icon: <GiPathDistance />,
      category: "algorithms",
      callback() {
        // dispatch(setGraphBuilderID("matrix"));
      },
    },
    {
      name: "Trie",
      icon: <TbBinaryTree2 />,
      category: "trees",
      callback() {
        // dispatch(setGraphBuilderID("matrix"));
      },
    },
  ].sort((lhs, rhs) => lhs.category.localeCompare(rhs.category));

  const categories = new Map([
    ["trees", { color: "#FFC107AA" }],
    ["graphs", { color: "#3F51B5AA" }],
    ["matrices", { color: "#4CAF50AA" }],
    ["config", { color: "#F44336AA" }],
    ["settings", { color: "#9E9E9EAA" }],
    ["builders", { color: "#9C27B0AA" }],
    ["algorithms", { color: "#2196F3AA" }],
    ["default", { color: "#9E9E9EAA" }],
  ]);

  // unique filters of actions categories
  const filters: Set<string> = new Set(
    actions
      .map((item) => item.category)
      .sort((lhs, rhs) => lhs.localeCompare(rhs))
  );
  const [filteredActions, setFilteredActions] = useState<Action[]>(actions);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  async function searchAction(e: React.FormEvent<HTMLInputElement>) {
    const { value } = e.target as HTMLInputElement;

    if (!value || value == "") {
      setFilteredActions(actions);
      return;
    }

    setFilteredActions(
      filteredActions.filter((item) =>
        item.name.toLowerCase().startsWith(value.toLowerCase())
      )
    );

    setSelectedItemIndex(0);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  }

  useEffect(() => {
    const quickAction = document.getElementById("quick-actions");

    const handleClickOutside = (e: MouseEvent) => {
      if (quickAction && !quickAction.contains(e.target as Node)) {
        props.close();
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.close();

      if (e.key === "Enter") {
        console.log(selectedItemIndex);
        console.log(filteredActions.length);
        if (
          selectedItemIndex < 0 ||
          selectedItemIndex >= filteredActions.length
        )
          return;

        console.log("Pressed enter");

        console.log(filteredActions[selectedItemIndex]);

        filteredActions[selectedItemIndex].callback?.();
      }
    };

    const handleKeyup = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        if (selectedItemIndex - 1 < 0)
          setSelectedItemIndex((_item) => filteredActions.length - 1);
        else setSelectedItemIndex((item) => item - 1);
      }

      if (e.key === "ArrowUp") {
        if (selectedItemIndex >= filteredActions.length)
          setSelectedItemIndex((_item) => 0);
        else setSelectedItemIndex((item) => item + 1);
        console.log(selectedItemIndex);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    window.addEventListener("mouseup", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);

      window.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-scren h-screen absolute z-10 inset-0 text-gray-600 dark:text-gray-500 ">
      <div className="w-full h-full flex items-center justify-center bg-dark-primary bg-opacity-60 backdrop-blur-sm transition-all duration-300 ease-in-out">
        <div
          id="quick-actions"
          style={{
            boxShadow: `0 0 9999px 10px ${
              categories.get(
                filteredActions[selectedItemIndex]?.category || "default"
              )?.color
            }`,
          }}
          className="w-[750px] h-[400px] bg-gray-300 border border-gray-400
          dark:bg-[#000000cc] dark:border-dark-secondary rounded-3xl overflow-hidden text-lg shadow-xl
          transition-all duration-300 ease-in-out
          "
        >
          {graphBuilderOptionsOpened && (
            <GraphBuilderOptions
              close={() => {
                setGraphBuilderOptionsOpened(false);
              }}
              closeAll={() => {
                setGraphBuilderOptionsOpened(false);
                props.close();
              }}
            />
          )}
          <form className="" onSubmit={onSubmit}>
            <div className="flex items-center relative">
              <div className="flex items-center space-x-2 absolute left-5">
                <BiSearch className="" />
              </div>
              <div className="flex items-center pl-12 w-fit">
                {filteredCategory !== "all" && (
                  <div
                    className="py-1 px-2 rounded-full text-white text-xs uppercase transition-all duration-200 ease-in-out w-auto"
                    style={{
                      backgroundColor: categories.get(
                        filteredActions.at(selectedItemIndex)?.category ?? "null"
                      )?.color,
                    }}
                  >
                    {filteredActions[selectedItemIndex].category}
                  </div>
                )}
                <input
                  type="text"
                  name="query"
                  onChange={searchAction}
                  placeholder="Search or type a command..."
                  className="w-full p-4 bg-transparent border-none outline-none focus:border-transparent focus:outline-none focus:ring-0 transition-all duration-300 ease-in-out"
                  style={{
                    caretColor: categories.get(
                      filteredActions[selectedItemIndex]?.category || "default"
                    )?.color,
                  }}
                  autoFocus
                />
              </div>
            </div>
          </form>
          <ul className="px-5 text-xs flex items-center space-x-3 py-2">
            <li
              onClick={() => {
                setFilteredActions(actions);
                setFilteredCategory("all");
              }}
              className={`cursor-pointer uppercase dark:bg-dark-secondary px-2 py-1 rounded dark:hover:bg-dark-tertiary ${
                filteredCategory == "all" &&
                "dark:bg-secondary-500 text-gray-300  dark:hover:bg-secondary-600"
              } transition-all duration-300 ease-in-out`}
            >
              All
            </li>
            {Array.from(filters.values()).map((filter, i) => (
              <li
                key={i}
                onClick={() => {
                  if (filteredCategory == filter) {
                    setFilteredActions(actions);
                    setFilteredCategory("all");
                  } else {
                    setFilteredActions(
                      actions.filter((item) => item.category === filter)
                    );
                    setFilteredCategory(filter);
                  }
                }}
                className={`cursor-pointer uppercase dark:bg-dark-secondary px-2 py-1 rounded dark:hover:bg-dark-tertiary ${
                  filteredCategory == filter &&
                  "dark:bg-primary-500 text-gray-300  dark:hover:bg-primary-600"
                } transition-all duration-300 ease-in-out`}
                style={{
                  backgroundColor:
                    filteredCategory == filter
                      ? categories.get(filter)?.color
                      : "",
                }}
              >
                {filter}
              </li>
            ))}
          </ul>
          <div className="p-3 max-h-[80%] overflow-y-scroll rounded-3xl no-scrollbar">
            {filteredActions.map((item, i) => (
              <div
                key={i}
                className={`mt-1 cursor-pointer group ${
                  selectedItemIndex === i && "bg-dark-secondary"
                } hover:bg-dark-secondary rounded-xl p-2 hover:text-gray-400 flex items-center justify-between`}
                onClick={() => item.callback && item.callback()}
              >
                <div className="flex items-center space-x-2">
                  {item.icon && item.icon}
                  <span className="">{item.name}</span>
                  <span className="text-xs text-gray-600 uppercase">
                    {item.category}
                  </span>
                </div>
                {item.shortcut && (
                  <ul className="flex text-xs items-center space-x-2">
                    {item.shortcut.map((key, i) => (
                      <li
                        key={i}
                        className="px-2 py-1 dark:bg-dark-tertiary rounded-md"
                      >
                        {key}
                      </li>
                    ))}
                  </ul>
                )}
                {item.goTo && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-600 uppercase">
                      OPEN: {item.goTo}
                    </span>
                    <BiRightArrowAlt className="text-xl h-full group-hover:bg-black p-1 rounded-md" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
