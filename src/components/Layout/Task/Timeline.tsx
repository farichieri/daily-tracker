import { Task } from "@/global/types";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
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
  const completed = "bg-black";
  const incompleted = "bg-stone-300";
  const date = task.date_set.date_iso.slice(0, 10);
  const today = useSelector(selectToday);
  const [time, setTime] = useState(new Date());

  const refreshClock = () => {
    setTime(new Date());
  };
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const currentTime = format(time, "HH:mm");

  const getColor = (item: string) => {
    switch (item) {
      case "top":
        if (index === 0) {
          return "bg-transparent";
        } else if (date < today) {
          return completed;
        } else if (date > today) {
          return incompleted;
        } else if (currentTime > time_from) {
          return completed;
        } else {
          return incompleted;
        }
      case "bottom":
        if (index === lastIndex) {
          return "bg-transparent";
        } else if (date < today) {
          return completed;
        } else if (date > today) {
          return incompleted;
        } else if (currentTime > time_from && currentTime > time_to) {
          return completed;
        } else {
          return incompleted;
        }
      default:
        break;
    }
  };

  const getCircle = () => {
    if (date < today) {
      return <div className="h-full w-full rounded-full bg-black"></div>;
    } else if (date > today) {
      return <div className="h-full w-full rounded-full bg-stone-300"></div>;
    } else if (currentTime > time_from && currentTime > time_to) {
      return <div className="h-full w-full rounded-full bg-black"></div>;
    } else if (currentTime > time_from && currentTime < time_to) {
      return (
        <>
          <div className="h-full w-full rounded-full bg-gradient-to-b from-black via-black to-stone-300"></div>
        </>
      );
    } else {
      return <div className="h-full w-full rounded-full bg-stone-300"></div>;
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
              className={`flex h-3.5 min-h-3.5 w-3.5 flex-col rounded-full bg-transparent`}
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
