import React from "react";
import { IoClose } from "react-icons/io5";
import { TbBinaryTree, TbNewSection } from "react-icons/tb";

type Props = {
  movable?: boolean;
  width?: number;
  height?: number;
  onClose?: () => void;
  glassmorphism?: boolean;
};

const QuickStart = (props: Props) => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-30 z-50 backdrop-blur-sm flex items-center justify-center">
      <div
        className="bg-white rounded-xl
                dark:bg-dark-secondary dark:text-white
                flex flex-col
                shadow-lg
                z-20
                dark:bg-opacity-70
                backdrop-blur-lg
                relative
                overflow-hidden
            "
        style={{
          width: props.width ? props.width : 500,
          minHeight: props.height ? props.height : 300,
        }}
      >
        <div className="min-h-[550px]">
          <div className="h-64 w-full overflow-hidden brightness-50 hover:brightness-75 transition-all duration-300 relative">
            <div className="absolute w-full h-full z-10 flex p-3 justify-between space-x-2">
              <h3 className="text-primary-500 font-bold">GraphFlow</h3>
              <h5 className="text-xs">v0.1.0 Beta</h5>
            </div>
            <img
              className="bg-contain"
              src="https://e1.pxfuel.com/desktop-wallpaper/884/599/desktop-wallpaper-toji-fushiguro-from-jujutsu-kaisen-icons-fushiguro-toji.jpg"
              alt="QuickStart Cover"
            />
          </div>
          <div className="w-full p-5 flex items-start justify-between text-lg text-gray-500">
            <div className="">
              <p className="pb-2">New Graph</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center space-x-2 cursor-pointer hover:dark:text-white">
                  <TbNewSection />
                  <p>General</p>
                </li>
                <li className="flex items-center space-x-2">
                  <TbBinaryTree />
                  <p>Binary Tree</p>
                </li>
              </ul>
            </div>
            <div className="">
              <p className="pb-2">Getting Started</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center space-x-2 cursor-pointer hover:dark:text-white">
                  <TbNewSection />
                  <p>Manual</p>
                </li>
                <li className="flex items-center space-x-2">
                  <TbBinaryTree />
                  <p>Release Notes</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStart;
