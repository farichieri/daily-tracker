import { Goal } from "@/global/types";
import { format, parseISO } from "date-fns";
import ToggleDoneGoal from "../GoalActions/GoalActionsButtons/ToggleDoneGoal";

const GoalComponent = ({ goal }: { goal: Goal }) => {
  const iso = goal.date_set.date_iso;
  const isoDisplay = iso && format(parseISO(iso), "MM-dd-yyyy");
  const todayDisplay = format(new Date(), "MM-dd-yyyy"); // US Format
  const dateDisplayed = isoDisplay === todayDisplay ? "Today" : isoDisplay;

  return (
    <div className="my-2 flex w-full items-start gap-2 border-b border-gray-500 p-2 text-white">
      <div className="min-w-fit flex-col gap-2">
        {dateDisplayed && (
          <div className="rounded-xl border border-gray-600 p-1">
            {dateDisplayed}
          </div>
        )}
      </div>
      <div className="my-auto flex-col">
        <div className="flex">
          <span className="">{goal.content}</span>
        </div>
        <div className="flex ">
          <span className="text-gray-400">{goal.description}</span>
        </div>
      </div>
      <div className="my-auto ml-auto flex">
        <ToggleDoneGoal goal={goal} />
      </div>
    </div>
  );
};

export default GoalComponent;
