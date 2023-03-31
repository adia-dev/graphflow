import React, { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { TbBinaryTree } from "react-icons/tb";

type Props = {
  close: () => void;
};

type SearchItem = {
  name: string;
  category: string;
  icon?: JSX.Element;
  shortcut?: string[];
};

const QuickSearch = (props: Props) => {
  const filters: string[] = ["Graphs", "Trees", "Algorithms", "Commands"];
  const searchItems: SearchItem[] = [
    {
      name: "Binary Tree",
      icon: <TbBinaryTree />,
      category: "trees",
      shortcut: ["⌘", "⌃", "T"],
    },
  ];

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
        console.log("clicked outside of the quick search !");
        // props.close();
      }
    };

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") props.close();
    });

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="
      w-scren h-screen absolute z-10
      inset-0
      text-gray-600 dark:text-gray-500
      "
    >
      <div className="w-full h-full flex items-center justify-center bg-dark-primary bg-opacity-10 backdrop-blur transition-all duration-300 ease-in-out">
        <div
          id="quick-search"
          className="w-[600px] h-[400px] bg-gray-300 border border-gray-400
          dark:bg-dark-primary dark:border-dark-secondary
          rounded-3xl
          overflow-hidden
          text-lg
          "
        >
          <form className="" onSubmit={onSubmit}>
            <div className="flex items-center relative">
              <BiSearch className="absolute left-5" />
              <input
                type="text"
                name="query"
                placeholder="Search or type a command..."
                className="w-full p-4 bg-transparent pl-12 border-none outline-none focus:border-transparent focus:outline-none focus:ring-0"
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
            {searchItems.map((item, i) => (
              <div
                key={i}
                className="cursor-pointer hover:bg-dark-secondary rounded-xl p-2 hover:text-gray-400 flex items-center justify-between"
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

export default QuickSearch;