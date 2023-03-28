import { Task } from "@/global/types";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectToday } from "store/slices/trackerSlice";

const Timeline = ({
  index,
  lastIndex,
  task,
}: {
  index: number;
  lastIndex: number;
  task: Task;
}) => {
  const time_from = task.date_set.time_from;
  const time_to = task.date_set.time_to;
  const date = task.date_set.date_iso.slice(0, 10);
  const today = useSelector(selectToday);
  const currentTime = format(new Date(), "HH:MM");

  const getColor = (item: string) => {
    switch (item) {
      case "top":
        if (index === 0) {
          return "bg-transparent";
        } else if (date < today) {
          return "bg-black";
        } else if (date > today) {
          return "bg-stone-500";
        } else if (currentTime > time_from) {
          return "bg-black";
        } else {
          return "bg-stone-500";
        }
      case "bottom":
        if (index === lastIndex) {
          return "bg-transparent";
        } else if (date < today) {
          return "bg-black";
        } else if (date > today) {
          return "bg-stone-500";
        } else if (currentTime > time_from && currentTime > time_to) {
          return "bg-black";
        } else {
          return "bg-stone-500";
        }
      default:
        break;
    }
  };

  const getCircle = () => {
    if (date < today) {
      return <div className="h-full w-full rounded-full bg-black"></div>;
    } else if (date > today) {
      return <div className="h-full w-full rounded-full bg-stone-500"></div>;
    } else if (currentTime > time_from && currentTime > time_to) {
      return <div className="h-full w-full rounded-full bg-black"></div>;
    } else if (currentTime > time_from && currentTime < time_to) {
      return (
        <>
          <div className="h-[50%] w-full rounded-tl-full rounded-tr-full bg-black"></div>
          <div className="h-[50%] w-full rounded-bl-full rounded-br-full bg-stone-500"></div>
        </>
      );
    } else {
      return <div className="h-full w-full rounded-full bg-stone-500"></div>;
    }
  };
  return (
    <>
      {(time_from || time_to) && (
        <div className="mr-4 flex w-16 gap-1 text-[8px] sm:text-[10px]">
          <div className="flex w-[2rem] min-w-[2rem] max-w-[2rem] flex-col items-center justify-center gap-0 leading-[0.7]">
            {time_from && <div className="time_from">{time_from}</div>}
            {time_to && (
              <>
                -<div className="time_to">{time_to}</div>
              </>
            )}
          </div>
          <div className="ml-1 flex h-full w-full flex-col items-center justify-center">
            <div className={`flex h-full w-0.5 ${getColor("top")}`}></div>
            <div
              className={`flex h-3 min-h-3 w-3 flex-col rounded-full bg-transparent`}
            >
              {getCircle()}
            </div>
            <div
              className={`flex h-full w-0.5 justify-center ${getColor(
                "bottom"
              )}`}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Timeline;
