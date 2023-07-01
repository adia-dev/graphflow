import { FormEvent } from "react";
import GitHubButton from "react-github-btn";
import { BiSearch, BiSync } from "react-icons/bi";
import { BsGithub, BsKeyboard, BsPlayFill, BsStarFill } from "react-icons/bs";
import { CgSupport } from "react-icons/cg";
import { MdOutlineContactSupport } from "react-icons/md";
import { TbBinaryTree } from "react-icons/tb";
import Modal from "../Modal";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeHelp } from "./helpSlice";

type Props = {};
type Topic = {
  icon?: JSX.Element;
  img?: string;
  title: string;
  description: string;
};

type GettingStartedStep = {
  icon?: JSX.Element;
  name: JSX.Element | string;
  done: boolean;
};

const Help = (_props: Props) => {
  const opened = useAppSelector((state) => state.help.opened);
  const dispatch = useAppDispatch();

  const popularTopics: Topic[] = [
    {
      icon: <TbBinaryTree className="text-4xl" />,
      title: "GraphFlow 101",
      description:
        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    },
    {
      img: "https://64.media.tumblr.com/c3b27bbcc97b7b4aaf9bc8a893140044/9db7feef995090bd-48/s1280x1920/ad45db5ceef2f98d93c474ceca78ceab300f8fc2.jpg",
      title: "Building amazing graphs !",
      description:
        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    },
    {
      img: "https://64.media.tumblr.com/c3b27bbcc97b7b4aaf9bc8a893140044/9db7feef995090bd-48/s1280x1920/ad45db5ceef2f98d93c474ceca78ceab300f8fc2.jpg",
      title: "Importing your data",
      description:
        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    },
  ];

  const gettingStartedSteps: GettingStartedStep[] = [
    {
      icon: <BsPlayFill />,
      name: "Played the Demo",
      done: true,
    },
    {
      icon: <BiSync />,
      name: (
        <p>
          Sync'd with a&nbsp;
          <span className="text-primary-500 cursor-pointer hover:underline">
            GraphFlow
          </span>
          &nbsp;account
        </p>
      ),
      done: false,
    },
    {
      icon: <BiSearch />,
      name: "Used the Quick-Action",
      done: false,
    },
    {
      icon: <TbBinaryTree />,
      name: "Explored advanced features",
      done: false,
    },
    {
      icon: <BsGithub />,
      name: (
        <div className="flex items-center space-x-1">
          <p>Give a</p>
          <BsStarFill className="text-yellow-500" />
          <p>the project on Github</p>
          <GitHubButton
            href="https://github.com/adia-dev/GraphFlow"
            data-color-scheme="no-preference: dark; light: light; dark: dark_dimmed;"
            data-show-count="true"
            aria-label="Star adia-dev/GraphFlow on GitHub"
          >
            Star
          </GitHubButton>
        </div>
      ),
      done: false,
    },
  ];

  function onSearchForHelp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const { query } = Object.fromEntries(formData.entries());
    console.log(`Searching for: ${query}`);
  }

  return (
    <Modal opened={opened} onClose={() => dispatch(closeHelp())}>
      <div className="">
        <h2 className="text-2xl">Help</h2>
        <form className="mt-3" onSubmit={onSearchForHelp}>
          <div className="flex items-center relative">
            <BiSearch className="absolute left-5" />
            <input
              type="search"
              name="query"
              placeholder="Search for help..."
              className="w-full p-2 bg-transparent pl-12 rounded-xl dark:border-dark-tertiary outline-none"
              autoFocus
            />
          </div>
        </form>
        <div className="my-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg">Popular Topics</h3>
            <p className="font-semibold text-primary-400 text-sm cursor-pointer hover:underline">
              Show all
            </p>
          </div>
          <ul>
            {popularTopics.map((topic, i) => (
              <li key={i} className="group">
                <div className="dark:border-dark-tertiary dark:bg-dark-secondary shadow-xl rounded-lg hover:bg-dark-secondary transition-all duration-200 hover:scale-95 cursor-pointer p-2 border mt-2 flex items-center space-x-4">
                  <div className="w-16 h-16 aspect-square rounded-lg border dark:border-dark-tertiary dark:bg-dark-tertiary flex items-center justify-center">
                    {topic.icon && topic.icon}
                    {topic.img && (
                      <img
                        src={topic.img}
                        alt={topic.title}
                        className="bg-cover w-full h-full rounded-lg"
                      />
                    )}
                  </div>
                  <div>
                    <h4>{topic.title}</h4>
                    <p className="dark:text-gray-500 text-xs">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="my-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg">Getting Started</h3>
            <div className="font-semibold bg-primary-800 text-primary-200 px-2 py-1 text-xs rounded-full">
              <span>
                {(
                  (gettingStartedSteps.filter((step) => step.done).length /
                    gettingStartedSteps.length) *
                  100
                ).toFixed(0)}
                % completed
              </span>
            </div>
          </div>
          <ul className="dark:bg-dark-secondary dark:border-dark-tertiary border rounded-2xl p-2 mt-2">
            {gettingStartedSteps.map((step, i) => (
              <li key={i} className="group m-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-6 w-6 p-1 aspect-square rounded-full border dark:border-dark-tertiary dark:bg-dark-tertiary flex items-center justify-center ${
                      step.done
                        ? "dark:bg-dark-tertiary bg-gray-300 text-gray-500"
                        : "dark:bg-primary-500 bg-primary-500"
                    }`}
                  >
                    {step.icon && step.icon}
                  </div>
                  <div
                    className={`text-sm ${
                      step.done && "line-through text-gray-600"
                    }`}
                  >
                    {step.name}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-px dark:bg-dark-tertiary" />
        <div className="mt-5 text-gray-500 flex flex-col space-y-2">
          <div className="flex items-center w-fit space-x-2 transition-all duration-200 hover:text-gray-800 hover:dark:text-white cursor-pointer">
            <CgSupport />
            <p>Help Center</p>
          </div>
          <div className="flex items-center w-fit space-x-2 transition-all duration-200 hover:text-gray-800 hover:dark:text-white cursor-pointer">
            <MdOutlineContactSupport />
            <p>Support Chat</p>
          </div>
          <div className="flex items-center w-fit space-x-2 transition-all duration-200 hover:text-gray-800 hover:dark:text-white cursor-pointer">
            <BsKeyboard />
            <p>Keyboard Shortcuts</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Help;
