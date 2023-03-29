import { formatTime, hhmmToSeconds } from "@/utils/formatDate";
import { Task } from "@/global/types";
import { useState } from "react";
import IconButton from "@/components/Layout/Icon/IconButton";
import { TIMES_OPTIONS } from "@/utils/constants";

const TimeTrackingButton = ({
  handleSeconds,
  task,
  inTaskCompnent,
  sumOfPlanned,
  sumOfSpent,
}: {
  handleSeconds: Function;
  task: Task;
  inTaskCompnent: boolean;
  sumOfPlanned: number;
  sumOfSpent: number;
}) => {
  const [openPlanned, setOpenPlanned] = useState(false);
  const [openSpent, setOpenSpent] = useState(false);

  if (sumOfPlanned > 0 || sumOfSpent > 0) {
    return (
      <div className="flex w-14 min-w-min items-center gap-0.5 rounded-md bg-gray-800  px-0.5 py-0 text-[8px] text-gray-400">
        <div className="flex min-w-fit">
          {sumOfSpent > 0 ? formatTime(sumOfSpent) : "--:--"}
        </div>
        <span className="">/</span>
        {sumOfPlanned > 0 && (
          <div className="flex min-w-fit">
            {sumOfPlanned > 0 ? formatTime(sumOfPlanned) : "--:--"}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className={`relative ${inTaskCompnent && "pointer-events-none"}`}>
        {openSpent && (
          <TimeModal
            handleSeconds={handleSeconds}
            name={"seconds_spent"}
            task={task}
            setOpen={setOpenSpent}
          />
        )}
        {openPlanned && (
          <TimeModal
            handleSeconds={handleSeconds}
            name={"seconds_planned"}
            task={task}
            setOpen={setOpenPlanned}
          />
        )}
        {Number(task.seconds_planned) < 1 &&
        Number(task.seconds_spent) < 1 &&
        !inTaskCompnent ? (
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              setOpenPlanned(!openPlanned);
            }}
            alt="clock"
            src={"/icons/clock2.png"}
            width={14}
            height={14}
            props={{}}
          />
        ) : (
          (Number(task.seconds_planned) > 0 ||
            Number(task.seconds_spent) > 0) && (
            <div className="flex w-fit min-w-fit items-center gap-0.5 rounded-md border border-gray-800 px-0.5 text-[8px] text-gray-400">
              <div
                className="flex min-w-fit cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenSpent(!openSpent);
                }}
              >
                {task.seconds_spent > 0
                  ? formatTime(task.seconds_spent)
                  : "--:--"}
              </div>
              <span className="">/</span>
              <div
                className="flex min-w-fit cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenPlanned(!openPlanned);
                }}
              >
                {task.seconds_planned > 0
                  ? formatTime(task.seconds_planned)
                  : "--:--"}
              </div>
            </div>
          )
        )}
      </div>
    );
  }
};

export default TimeTrackingButton;

const TimeModal = ({
  task,
  name,
  handleSeconds,
  setOpen,
}: {
  task: Task;
  name: string;
  handleSeconds: Function;
  setOpen: Function;
}) => {
  const displayName = name === "seconds_planned" ? "Planned" : "Spent";
  const [timeState, setTimeState] = useState(task[name]);
  const inputFormatted = formatTime(Number(timeState)) || "00:00";
  const [showOptions, setShowOptions] = useState(true);

  console.log({ timeState });

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const value = (event.target as HTMLButtonElement).value;
    const seconds: number = Number(hhmmToSeconds(value));
    setTimeState(seconds);
    setShowOptions(false);
  };

  const handleSave = () => {
    handleSeconds(name, timeState);
    setOpen(false);
  };

  return (
    <>
      <div
        className="pointer-events-auto fixed inset-0 h-screen w-screen"
        onClick={handleSave}
      ></div>
      <div className="h-fit absolute -top-32 right-1 flex max-h-40 w-full min-w-max flex-row rounded-md bg-gray-800 px-0 py-0.5 text-sm opacity-100">
        <div className=" flex w-full min-w-fit flex-col items-center">
          <span>{displayName}</span>
          <input
            type="time"
            className="h-fit flex min-h-6 w-full border-y border-stone-600 bg-transparent px-2"
            value={inputFormatted}
            onChange={handleChange}
          />
          {showOptions && (
            <div className="flex w-full flex-col overflow-auto py-1 px-2">
              {TIMES_OPTIONS.map((opt) => (
                <button
                  key={opt.seconds}
                  className={`flex w-full ${
                    Number(timeState) === opt.seconds && "text-red-500"
                  }`}
                  name={name}
                  onClick={(e: any) => {
                    setTimeState(e.target.value);
                  }}
                  value={opt.seconds}
                >
                  {opt.display}
                </button>
              ))}
            </div>
          )}
          <div className="flex border-t border-t-stone-500">
            {timeState > 0 && (
              <button
                className="flex justify-center p-1"
                name={name}
                onClick={(e: any) => {
                  setTimeState(e.target.value);
                }}
                value={0}
              >
                clear
              </button>
            )}
            <button className="flex justify-center p-1" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
