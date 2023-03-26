import { filterTasksDone, filterTasksPending } from "@/hooks/helpers";
import { selectLabels } from "store/slices/labelsSlice";
import { selectTasks } from "store/slices/tasksSlice";
import { TaskGroup, TasksArray } from "@/global/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";
import TaskComponent from "./Task/TaskComponent";

const Tasks = ({ tasksState }: { tasksState: TaskGroup }) => {
  const router = useRouter();
  const { listID } = router.query;
  const { tasks } = useSelector(selectTasks);
  const { labels } = useSelector(selectLabels);

  const getLabelsByTask = (taskID: string) => {
    const task = { ...tasks[String(taskID)] };
    const labelsSelected = task.labels;
    const labelsFiltered = labelsSelected?.map((label) => labels[label]);
    return labelsFiltered;
  };

  const [pendingTasks, setPendingTasks] = useState<TasksArray>([]);
  const [doneTasks, setDoneTasks] = useState<TasksArray>([]);
  const [showDoneTasks, setShowDoneTasks] = useState(true);

  useEffect(() => {
    console.log("executing");

    const pendingTasks: TaskGroup = filterTasksPending(tasksState);
    const doneTasks: TaskGroup = filterTasksDone(tasksState);
    // Working_on on top
    const sortedPendingTasks = Object.values(pendingTasks)
      .sort(
        (a, b) => Number(b.working_on || false) - Number(a.working_on || false)
      )
      .sort((a, b) => b.date_set.date_iso?.localeCompare(a.date_set.date_iso));
    const sortedDoneTasks = Object.values(doneTasks).sort((a, b) =>
      b.date_set.date_iso?.localeCompare(a.date_set.date_iso)
    );
    setPendingTasks(sortedPendingTasks);
    setDoneTasks(sortedDoneTasks);
  }, [tasksState]);

  return (
    <div className="flex flex-col text-left">
      <div id="accordionExample5" className="flex flex-col overflow-auto">
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
              Pending tasks
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
            <div className="flex flex-col gap-2 py-2 px-2">
              {pendingTasks?.map((task) => (
                <Link
                  href={`/app/lists/${listID}/task/${task.task_id}`}
                  key={task.task_id}
                >
                  <TaskComponent
                    taskID={task.task_id}
                    task={task}
                    getLabelsByTask={getLabelsByTask}
                  />
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
              Tasks Done
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
            <div className="flex flex-col gap-2 py-2 px-2">
              {showDoneTasks &&
                doneTasks?.map((task) => (
                  <Link
                    href={`/app/lists/${listID}/task/${task.task_id}`}
                    key={task.task_id}
                  >
                    <TaskComponent
                      taskID={task.task_id}
                      task={task}
                      getLabelsByTask={getLabelsByTask}
                    />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .tasks-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default Tasks;
