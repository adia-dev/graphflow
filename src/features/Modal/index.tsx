import React from "react";

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
  if (!props.opened) return <></>;

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-30 z-50 backdrop-blur-sm flex items-center justify-center">
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
      ></div>
      <div
        className="bg-white rounded-xl p-3
                dark:bg-dark-secondary dark:text-white
                flex flex-col
                shadow-lg
                z-20
                dark:bg-opacity-60
            "
        style={{
          width: props.width ? props.width : 500,
          minHeight: props.height ? props.height : 300,
        }}
      >
        <div className="flex-1">{props.children}</div>
        <hr
          className="w-full my-4
                    dark:border-dark-tertiary
                "
        />
        <div className="w-full flex items-center justify-between">
          <button
            className="border text-gray-800
                        dark:text-white dark:border-dark-tertiary
                        hover:bg-gray-100 dark:hover:bg-dark-tertiary
                        px-4 py-2 rounded-lg"
            onClick={() => {
              if (props.onClose) {
                props.onClose();
              }
            }}
          >
            Close
          </button>
          <div className="flex items-center">
            {props.components &&
              props.components?.length > 0 &&
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
          <button
            onClick={() => {
              if (props.onClose) {
                props.onClose();
              }
            }}
            className="bg-primary-500 
                        hover:bg-primary-600
                    text-white px-4 py-2 rounded-lg"
          >
            Guided Tour !
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
