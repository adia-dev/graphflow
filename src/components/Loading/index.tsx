import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  loadingPct: number;
  quote: string;
  nextQuote: () => void;
};

const Loading = ({ loadingPct, quote, nextQuote }: Props) => {
  return (
    <div className="w-screen h-screen dark:bg-dark-primary flex items-center justify-center flex-col">
      <div className="py-3 w-full flex items-center space-x-3 justify-center">
        <h1 className="text-2xl text-primary-500 font-bold">
          Graphflow is getting ready...
        </h1>
        <h1 className="text-2xl text-primary-500 font-bold">
          {loadingPct.toFixed(0)}%
        </h1>
        <AiOutlineLoading3Quarters className="text-primary-500 text-5xl animate-spin" />
      </div>
      <div className="w-1/2 h-1 bg-primary-900 rounded-full">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-500"
          style={{ width: `${loadingPct}%` }}
        ></div>
        {/* quote block */}
        <div className="w-full flex items-center justify-center mt-5 text-gray-200">
          <blockquote
            className="text-xl italic font-semibold text-gray-900 dark:text-white
              p-3 dark:bg-dark-secondary rounded-md shadow-md hover:shadow-lg hover:bg-dark-tertiary
              transition-all duration-300
              cursor-pointer whitespace-nowrap
            "
            onClick={() => nextQuote()}
          >
            ❝&nbsp;{quote}&nbsp;❞
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Loading;
