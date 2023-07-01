import { BsCursorFill } from "react-icons/bs";
import { useAppSelector } from "../../app/hooks";

type Props = {};

const Cursor = (props: Props) => {
  const cursor = useAppSelector((store) => store.cursor);

  return (
    <div
      className="absolute z-0 w-4 h-4 pointer-events-none dark:text-white"
      style={{
        left: `${cursor.position.x}px`,
        top: `${cursor.position.y}px`,
      }}
    >
      <div
        className="whitespace-nowrap text-xs absolute top-6 left-4 px-2 py-1 rounded-full"
        style={{
          backgroundColor: `${cursor.color || "#fff"}`,
        }}
      >
        {cursor.label}
      </div>
      <BsCursorFill
        className="-rotate-90 absolute top-full left-0"
        style={{
          color: `${cursor.color || "#fff"}`,
        }}
      />
    </div>
  );
};

export default Cursor;
