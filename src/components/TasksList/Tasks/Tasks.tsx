import { filterTasksDone, filterTasksPending } from "@/hooks/helpers";
import { selectLabels } from "store/slices/labelsSlice";
import { selectTasks } from "store/slices/tasksSlice";
import { TaskGroup, TasksArray } from "@/global/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import FilterTasks from "./FilterTasks/FilterTasks";
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

  const SHOW_OPTIONS = {
    ALL: "all",
    PENDINGS: "pendings",
    DONE: "done",
  };

  const [pendingTasks, setPendingTasks] = useState<TasksArray>([]);
  const [doneTasks, setDoneTasks] = useState<TasksArray>([]);
  const [showOption, setShowOption] = useState(SHOW_OPTIONS.ALL);

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

  const TasksSelected = (tasks: TasksArray) => {
    return (
      <>
        {tasks.length > 0 && (
          <div className="overflow-hidden rounded-2xl">
            <div className="flex h-full flex-col gap-0.5 overflow-auto rounded-2xl px-1 py-1">
              {tasks?.map((task, index) => (
                <Link
                  href={`/app/lists/${listID}/task/${task.task_id}`}
                  key={task.task_id}
                >
                  <TaskComponent
                    taskID={task.task_id}
                    task={task}
                    getLabelsByTask={getLabelsByTask}
                    index={index}
                    lastIndex={tasks.length - 1}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-auto py-2 text-left">
      <FilterTasks
        options={SHOW_OPTIONS}
        setShowOption={setShowOption}
        showOption={showOption}
      />
      {showOption === SHOW_OPTIONS.ALL ? (
        <>
          {TasksSelected(pendingTasks)}
          {TasksSelected(doneTasks)}
        </>
      ) : showOption === SHOW_OPTIONS.PENDINGS ? (
        TasksSelected(pendingTasks)
      ) : (
        TasksSelected(doneTasks)
      )}
    </div>
  );
};

export default Tasks;
