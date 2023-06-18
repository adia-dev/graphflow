import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

type Props = {
  opened: boolean;
  children?: React.ReactNode;
  components?: React.ReactNode[];
  movable?: boolean;
  width?: number;
  height?: number;
  onClose?: () => void;
  glassmorphism?: boolean;
};

const Modal = (props: Props) => {
  const [index, setIndex] = useState(0);

  const onClose = () => {
    setIndex(0);
    props.onClose && props.onClose();
  };

  if (!props.opened) return <></>;

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-30 z-50 backdrop-blur-sm flex items-center justify-center">
      {props.components && index < props.components.length - 1 && (
        <div
          className="
        absolute
        bg-white rounded-xl p-3
        dark:bg-dark-primary dark:text-white
        flex flex-col
        shadow-lg
        z-10
        bg-opacity-50 backdrop-filter backdrop-blur-[1px]
        "
          style={{
            width: props.width ? props.width : 515,
            minHeight: props.height ? props.height : 490,
          }}
        >
          {/* {props.components[index + 1]} */}
        </div>
      )}
      <div
        className="bg-white rounded-xl p-5
                dark:bg-dark-secondary dark:text-white
                flex flex-col
                shadow-lg
                z-20
                dark:bg-opacity-70
                backdrop-blur-lg
                relative
            "
        style={{
          width: props.width ? props.width : 500,
          minHeight: props.height ? props.height : 300,
        }}
      >
        <div
          onClick={() => {
            onClose();
          }}
          className="absolute brightness-75 hover:brightness-100 cursor-pointer top-2 right-2"
        >
          <IoClose />
        </div>
        <div className="min-h-[450px]">
          <div className="">{props.children}</div>
          {props.components &&
            props.components.length > 0 &&
            index < props.components.length && (
              <div className="">{props.components[index]}</div>
            )}
        </div>
        {props.components && props.components.length > 0 && (
          <div>
            <hr
              className="w-full my-4
            dark:border-dark-tertiary
            "
            />
            <div className="w-full flex items-center justify-between">
              {props.components && index > 0 ? (
                <div className="min-w-[60px]">
                  <button
                    className="border text-gray-800
                  dark:text-white dark:border-dark-tertiary
                  hover:bg-gray-100 dark:hover:bg-dark-tertiary
                  px-4 py-2 rounded-lg"
                    onClick={() => {
                      setIndex(Math.max(index - 1, 0));
                    }}
                  >
                    Previous
                  </button>
                </div>
              ) : (
                <div className="min-w-[95px] py-[21px]"></div>
              )}
              <div className="flex-1 flex items-center justify-center">
                {props.components &&
                  props.components?.length > 1 &&
                  props.components.map((_component, index) => (
                    <div
                      className="w-2 h-2 bg-gray-300 
                    dark:bg-dark-tertiary
                    hover:bg-gray-400
                    cursor-pointer
                    hover:scale-105
                    transition duration-300 ease-in-out
                    rounded-full mx-1"
                      key={index}
                    ></div>
                  ))}
              </div>
              {props.components && index < props.components.length - 1 && (
                <button
                  onClick={() => {
                    setIndex(index + 1);
                  }}
                  className="bg-primary-500 
                hover:bg-primary-600
                text-white px-4 py-2 rounded-lg"
                >
                  Next
                </button>
              )}
              {props.components && index === props.components.length - 1 && (
                <button
                  onClick={() => {
                    onClose();
                  }}
                  className="bg-primary-500 
                hover:bg-primary-600
                text-white px-4 py-2 rounded-lg"
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
