import { BsCursorFill } from "react-icons/bs";
import { useAppSelector } from "../../app/hooks";

type Props = {};

const Cursor = (props: Props) => {
  const cursor = useAppSelector((store) => store.cursor);

  return (
    <div
      className="absolute z-0 w-4 h-4 pointer-events-none"
      style={{
        left: `${cursor.position.x}px`,
        top: `${cursor.position.y}px`,
        color: `${cursor.color || "#fff"}`,
      }}
    >
      <div className="whitespace-nowrap text-xs absolute top-6 left-4">
        {cursor.label}
      </div>
      <BsCursorFill className="-rotate-90 absolute top-full left-0" />
    </div>
  );
};

export default Cursor;
