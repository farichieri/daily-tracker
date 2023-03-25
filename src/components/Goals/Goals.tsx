import { GoalGroup, GoalsArray } from "@/global/types";
import { filterTasksDone, filterTasksPending } from "@/hooks/helpers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectGoals } from "store/slices/goalsSlice";
import Link from "next/link";
import Goal from "./Goal/Goal";

const Goals = () => {
  const { goals } = useSelector(selectGoals);
  const [pendingGoals, setPendingGoals] = useState<GoalsArray>([]);
  const [doneGoals, setDoneGoals] = useState<GoalsArray>([]);
  const [showDoneGoals, setShowDoneGoals] = useState(true);

  useEffect(() => {
    const pendingGoals: GoalGroup = filterTasksPending(goals);
    const doneTasks: GoalGroup = filterTasksDone(goals);
    // Working_on on top
    const sortedPendingTasks = Object.values(pendingGoals)
      .sort(
        (a, b) => Number(b.working_on || false) - Number(a.working_on || false)
      )
      .sort((a, b) => b.date_set.date_iso?.localeCompare(a.date_set.date_iso));
    const sortedDoneTasks = Object.values(doneTasks).sort((a, b) =>
      b.date_set.date_iso?.localeCompare(a.date_set.date_iso)
    );
    setPendingGoals(sortedPendingTasks);
    setDoneGoals(sortedDoneTasks);
  }, [goals]);

  return (
    <div className="flex flex-col text-left">
      <div id="accordionExample5" className="flex flex-col">
        <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
          <h2 className="mb-0 mt-0 " id="headingOne5">
            <button
              className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
              type="button"
              data-te-collapse-init
              data-te-target="#collapseOne5"
              aria-expanded="true"
              aria-controls="collapseOne5"
            >
              Week
              <span className="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
          </h2>
          <div
            id="collapseOne5"
            className="!visible"
            data-te-collapse-item
            data-te-collapse-show
            aria-labelledby="headingOne5"
          >
            <div className="py-4 px-5">
              {pendingGoals?.map((goal) => (
                <Link href={`/app/goals/${goal.goal_id}`} key={goal.goal_id}>
                  <Goal goal={goal} />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
          <h2 className="mb-0 mt-0" id="headingTwo5">
            <button
              className="group relative flex w-full items-center rounded-none border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
              type="button"
              data-te-collapse-init
              data-te-collapse-collapsed
              data-te-target="#collapseTwo5"
              aria-expanded="false"
              aria-controls="collapseTwo5"
            >
              Month
              <span className="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
          </h2>
          <div
            id="collapseTwo5"
            className="!visible hidden"
            data-te-collapse-item
            aria-labelledby="headingTwo5"
          >
            <div className="py-4 px-5"></div>
          </div>
        </div>
        <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
          <h2 className="mb-0 mt-0" id="headingThree5">
            <button
              className="group relative flex w-full items-center border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
              type="button"
              data-te-collapse-init
              data-te-collapse-collapsed
              data-te-target="#collapseThree5"
              aria-expanded="false"
              aria-controls="collapseThree5"
            >
              Year
              <span className="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
          </h2>
          <div
            id="collapseThree5"
            className="!visible hidden"
            data-te-collapse-item
            aria-labelledby="headingThree5"
          >
            <div className="py-4 px-5"></div>
          </div>
        </div>
      </div>

      <div className="flex-col gap-1">
        {showDoneGoals &&
          doneGoals?.map((goal) => (
            <Link href={`/app/goals/${goal.goal_id}`} key={goal.goal_id}>
              <Goal goal={goal} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Goals;
