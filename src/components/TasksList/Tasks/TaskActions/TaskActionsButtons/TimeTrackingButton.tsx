import { formatTime, hhmmToSeconds } from "@/utils/formatDate";
import { Task } from "@/global/types";
import { TIMES_OPTIONS } from "@/utils/constants";
import { useState } from "react";
import IconButton from "@/components/Layout/Icon/IconButton";
import TimeField from "react-simple-timefield";

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
      <div className="flex w-12 min-w-min items-center justify-center gap-0.5 rounded-md bg-gray-800 px-1 py-0 text-[8px] text-gray-400">
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
      <div className={`relative  ${inTaskCompnent && "pointer-events-none"}`}>
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
            onClick={(e: any) => {
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
            <div className="flex w-12 min-w-min items-center justify-center gap-0.5 rounded-md bg-gray-700 px-1 py-0 text-[8px] text-gray-400">
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
      <div className="h-fit absolute -top-36 right-1 flex max-h-36 w-full min-w-max flex-row rounded-md bg-gray-800 px-0 py-0.5 text-sm opacity-100">
        <div className=" flex w-full min-w-fit flex-col items-center">
          <span className="">{displayName}</span>
          <TimeField
            value={inputFormatted}
            onChange={handleChange}
            style={{
              fontSize: 12,
              padding: "2px 4px",
              background: "transparent",
              borderTop: "1px solid var(--box-shadow)",
              borderBottom: "1px solid var(--box-shadow)",
              minWidth: "-webkit-fill-available",
              margin: "5px 0",
              justifyContent: "center",
              dispaly: "flex",
              textAlign: "center",
            }}
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
          <div className="flex w-full justify-center border-t border-t-stone-500">
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
