import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { TbArrowBounce, TbBinaryTree, TbBinaryTree2 } from "react-icons/tb";
import { TfiLayoutGrid4 } from "react-icons/tfi";
import { Options } from "vis-network";

type Props = {
  close: () => void;
  setOptions: (options: any) => void;
  options: Options;
};

type SearchItem = {
  name: string;
  category: string;
  icon?: JSX.Element;
  shortcut?: string[];
  callback?: (self?: SearchItem) => void | Promise<void>;
};

const QuickActions = (props: Props) => {
  const filters: string[] = ["Graphs", "Trees", "Algorithms", "Commands"];
  const searchItems: SearchItem[] = [
    {
      name: "New Tree",
      icon: <TbBinaryTree />,
      category: "trees",
      shortcut: ["⌘", "⌃", "N"],
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
        props.setOptions((options: any) => {
          return {
            ...options,
            physics: {
              ...options.physics,
              enabled: false,
            },
          };
        });

        console.log(props.options);
        console.log(`physics enabled: ${props.options.physics.enabled}`);
        props.close();
      },
    },
  ];

  const [filteredSearchItems, setFilteredSearchItems] =
    useState<SearchItem[]>(searchItems);

  const [selectedItem, setSelectedItem] = useState(0);

  async function searchQuickAction(e: React.FormEvent<HTMLInputElement>) {
    const { value } = e.target as HTMLInputElement;

    if (!value || value == "") {
      setFilteredSearchItems(searchItems);
      return;
    }

    setFilteredSearchItems(
      filteredSearchItems.filter((item) =>
        item.name.toLowerCase().startsWith(value.toLowerCase())
      )
    );

    setSelectedItem(0);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  }

  useEffect(() => {
    const quickSearch = document.getElementById("quick-search");

    const handleClickOutside = (e: MouseEvent) => {
      if (quickSearch && !quickSearch.contains(e.target as Node)) {
        props.close();
      }
    };

    const handleKeydown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") props.close();

      if (e.key === "Enter") {
        console.log(selectedItem);
        console.log(filteredSearchItems.length);
        if (selectedItem < 0 || selectedItem >= filteredSearchItems.length)
          return;

        console.log("Pressed enter");

        console.log(filteredSearchItems[selectedItem]);

        filteredSearchItems[selectedItem].callback &&
          filteredSearchItems[selectedItem].callback();
      }
    };

    const handleKeyup = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        if (selectedItem - 1 < 0)
          setSelectedItem((_item) => filteredSearchItems.length - 1);
        else setSelectedItem((item) => item - 1);
      }

      if (e.key === "ArrowUp") {
        if (selectedItem >= filteredSearchItems.length)
          setSelectedItem((_item) => 0);
        else setSelectedItem((item) => item + 1);
        console.log(selectedItem);
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
          id="quick-search"
          className="w-[750px] h-[400px] bg-gray-300 border border-gray-400
          dark:bg-[#121212] dark:border-dark-secondary
          rounded-3xl
          overflow-hidden
          text-lg
          shadow-xl
          "
        >
          <form className="" onSubmit={onSubmit}>
            <div className="flex items-center relative">
              <BiSearch className="absolute left-5" />
              <input
                type="text"
                name="query"
                onChange={searchQuickAction}
                placeholder="Search or type a command..."
                className="w-full p-4 bg-transparent pl-12 border-none outline-none focus:border-transparent focus:outline-none focus:ring-0"
                autoFocus
              />
            </div>
          </form>
          <ul className="px-5 text-xs flex items-center space-x-3">
            {filters.map((filter, i) => (
              <li
                key={i}
                className="cursor-pointer uppercase dark:bg-dark-secondary px-2 py-1 rounded dark:hover:bg-dark-tertiary"
              >
                {filter}
              </li>
            ))}
          </ul>
          <div className="p-3">
            {filteredSearchItems.map((item, i) => (
              <div
                key={i}
                className={`cursor-pointer ${
                  selectedItem === i && "bg-dark-secondary"
                } hover:bg-dark-secondary rounded-xl p-2 hover:text-gray-400 flex items-center justify-between`}
                onClick={() => item.callback && item.callback(item)}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
