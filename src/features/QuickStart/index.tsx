import { AiFillFolderOpen } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { FaBook, FaSignature } from "react-icons/fa";
import { GiBackwardTime } from "react-icons/gi";
import { MdForum } from "react-icons/md";
import { TbBinaryTree, TbNewSection } from "react-icons/tb";
import { useAppDispatch } from "../../app/hooks";
import { openHelp } from "../Help/helpSlice";
import { closeQuickStart } from "./quickStartSlice";

type Props = {
  movable?: boolean;
  width?: number;
  height?: number;
  onClose?: () => void;
  glassmorphism?: boolean;
};

type Action = {
  label: string;
  icon: JSX.Element;
  callback?: () => void | Promise<void>;
};

const QuickStart = (props: Props) => {
  const dispatch = useAppDispatch();

  const newGraphActions: Action[] = [
    {
      label: "General",
      icon: <TbNewSection />,
    },
    {
      label: "Binary Tree",
      icon: <TbBinaryTree />,
    },
  ];

  const gettingStartedActions: Action[] = [
    {
      label: "Help",
      icon: <BiHelpCircle />,
      callback: () => {
        // onClose();
        dispatch(openHelp());
      },
    },
    {
      label: "Manual",
      icon: <FaBook />,
    },
    {
      label: "GraphFlow Forums",
      icon: <MdForum />,
    },
    {
      label: "Credits",
      icon: <FaSignature />,
    },
  ];

  const onClose = () => {
    dispatch(closeQuickStart());
    props.onClose && props.onClose();
  };

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-30 z-50 backdrop-blur-sm flex items-center justify-center">
      <div
        className="bg-white rounded-xl
                    dark:bg-dark-secondary dark:text-white
                    flex flex-col
                    shadow-lg
                    z-10
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
        <div className="min-h-[550px] flex flex-col">
          <div className="h-64 w-full overflow-hidden brightness-75 hover:brightness-100 transition-all duration-300 relative">
            <div className="absolute w-full h-full z-10 flex p-3 justify-between space-x-2">
              <h3 className="text-white font-bold text-xl">GraphFlow</h3>
              <h5 className="text-xs text-gray-500">v0.1.0 Beta</h5>
            </div>
            <img
              className="w-full h-full object-cover"
              src="https://cdna.artstation.com/p/media_assets/images/images/000/738/242/large/ellie_sprite_cover11.jpg?1612953078"
              alt="QuickStart Cover"
            />
            <div className="absolute bottom-0 w-full z-10 flex p-1 items-center space-x-2 justify-end">
              <h5
                className="text-xs text-gray-500 hover:text-primary-500 cursor-pointer"
                onClick={() => onClose()}
              >
                (Press escape to close)
              </h5>
            </div>
          </div>
          <div className="w-full p-5 flex items-start justify-between text-lg text-gray-500 flex-1">
            <div className=" w-full">
              <p className="pb-2">New Graph</p>
              <ul className="text-sm space-y-2">
                {newGraphActions.map((action, i) => (
                  <li
                    key={i}
                    className="flex w-fit transition-all duration-75 delay-100 hover:scale-105 items-center space-x-2 cursor-pointer hover:dark:text-white"
                    onClick={action.callback}
                  >
                    {action.icon}
                    <p>{action.label}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full ">
              <p className="pb-2">Getting Started</p>
              <ul className="text-sm space-y-2">
                {gettingStartedActions.map((action, i) => (
                  <li
                    key={i}
                    className="flex w-fit transition-all duration-75 delay-100 hover:scale-105 items-center space-x-2 cursor-pointer hover:dark:text-white"
                    onClick={action.callback}
                  >
                    {action.icon}
                    <p>{action.label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full p-5 flex items-start justify-between text-lg text-gray-500 flex-1">
            <div className="w-full">
              <ul className="text-sm space-y-2">
                <li className="flex transition-all duration-75 delay-100 hover:scale-105 w-fit items-center space-x-2 cursor-pointer hover:dark:text-white">
                  <AiFillFolderOpen />
                  <p>Open...</p>
                </li>
                <li className="flex transition-all duration-75 delay-100 hover:scale-105 w-fit items-center space-x-2 cursor-pointer hover:dark:text-white">
                  <GiBackwardTime />
                  <p>Recover Last Session...</p>
                </li>
              </ul>
            </div>
            <div className="w-full">
              <ul className="text-sm space-y-2">
                <li className="flex transition-all duration-75 delay-100 hover:scale-105 w-fit items-center space-x-2 cursor-pointer hover:dark:text-white">
                  <TbNewSection />
                  <p>Release Notes</p>
                </li>
                <li className="flex transition-all duration-75 delay-100 hover:scale-105 w-fit items-center space-x-2 cursor-pointer hover:dark:text-white">
                  <BsFillStarFill className="text-yellow-400" />
                  <p>Support Me on GitHub !</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="px-5 py-2 relative">
            <div className="flex items-center space-x-2 absolute bottom-2 right-2 text-blue-500 text-xs">
              <input
                checked
                id="do-not-show-this-on-startup"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="do-not-show-this-on-startup-checkbox"
                className="ml-2 font-medium text-gray-900 dark:text-gray-500"
              >
                Do not show this on startup
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStart;
