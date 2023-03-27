import { formatTime } from "@/utils/formatDate";
import { Task } from "@/global/types";
import { useState } from "react";
import IconButton from "@/components/Layout/Icon/IconButton";

const PlannedSpentButton = ({
  handleSeconds,
  task,
}: {
  handleSeconds: React.MouseEventHandler;
  task: Task;
}) => {
  const timePlanned = formatTime(task.seconds_planned);
  const timeSpent = formatTime(task.seconds_spent);
  const [openPlanned, setOpenPlanned] = useState(false);
  const [openSpent, setOpenSpent] = useState(false);

  return (
    <div className="relative">
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
      {task.seconds_planned < 1 && task.seconds_spent < 1 ? (
        <IconButton
          onClick={() => setOpenPlanned(!openPlanned)}
          alt="clock"
          src={"/icons/clock2.png"}
          width={20}
          height={20}
          props={{}}
        />
      ) : (
        <div className="flex w-fit min-w-fit items-center gap-0.5 rounded-md border border-gray-500 px-1 py-[0.05rem] text-[10px] text-gray-400">
          <div
            className="flex min-w-fit cursor-pointer"
            onClick={() => setOpenSpent(!openSpent)}
          >
            {task.seconds_spent > 0 ? timeSpent : "--:--"}
          </div>
          <span className="">/</span>
          <div
            className="flex min-w-fit cursor-pointer"
            onClick={() => setOpenPlanned(!openPlanned)}
          >
            {task.seconds_planned > 0 ? timePlanned : "--:--"}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlannedSpentButton;

const TimeModal = ({
  task,
  name,
  handleSeconds,
  setOpen,
}: {
  task: Task;
  name: string;
  handleSeconds: React.MouseEventHandler;
  setOpen: Function;
}) => {
  const displayName = name === "seconds_planned" ? "Planned" : "Spent";

  const OPTIONS = [
    { seconds: 300, display: "5 min" },
    { seconds: 600, display: "10 min" },
    { seconds: 1800, display: "30 min" },
    { seconds: 2700, display: "45 min" },
    { seconds: 3600, display: "1 hour" },
    { seconds: 5400, display: "1.5 hour" },
    { seconds: 9000, display: "2.5 hour" },
    { seconds: 10800, display: "3 hour" },
    { seconds: 14400, display: "4 hour" },
    { seconds: 18000, display: "5 hour" },
    { seconds: 21600, display: "6 hour" },
    { seconds: 25200, display: "7 hour" },
    { seconds: 28800, display: "8 hour" },
  ];
  return (
    <>
      <div
        className="pointer-events-auto fixed inset-0 h-screen w-screen"
        onClick={() => setOpen(false)}
      ></div>
      <div className="absolute -top-32 flex h-32 w-full min-w-max flex-row rounded-md bg-gray-800 px-0 py-0.5 text-sm opacity-100">
        <div className=" flex w-full min-w-fit flex-col items-center">
          <span>{displayName}</span>
          <div className="flex w-full flex-col overflow-auto py-1 px-2">
            {OPTIONS.map((opt) => (
              <button
                key={opt.seconds}
                className={`flex w-full ${
                  Number(task[name]) === opt.seconds && "text-red-500"
                }`}
                name={name}
                onClick={(e) => {
                  handleSeconds(e);
                  setOpen(false);
                }}
                value={opt.seconds}
              >
                {opt.display}
              </button>
            ))}
          </div>
          {task[name] > 0 && (
            <button
              className="flex justify-center p-1"
              name={name}
              onClick={(e) => {
                handleSeconds(e);
                setOpen(false);
              }}
              value={0}
            >
              clear
            </button>
          )}
        </div>
      </div>
    </>
  );
};
