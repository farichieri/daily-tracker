import { filterObjectIncludes } from "@/hooks/helpers";
import { selectLabels } from "store/slices/labelsSlice";
import { selectTasks } from "store/slices/tasksSlice";
import { TaskGroup, TasksArray } from "@/global/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import LabelsLayout from "@/components/Layout/LabelsLayout";
import Link from "next/link";
import Modal from "@/components/Modal/Modal";
import TaskComponent from "@/components/TasksList/Tasks/Task/TaskComponent";

const LabelID = () => {
  const router = useRouter();
  const linkID = `/app/labels`;
  const { tasks } = useSelector(selectTasks);
  const { labelID } = router.query;
  const { labels } = useSelector(selectLabels);
  const tasksFiltered: TaskGroup = filterObjectIncludes(
    tasks,
    "labels",
    String(labelID)
  );

  const [arrayOfTasksNoTime, setArrayOfTasksNoTime] = useState<TasksArray>([]);
  const [arrayOfTasksWithTime, setArrayOfTasksWithTime] = useState<TasksArray>(
    []
  );

  useEffect(() => {
    const sortedArray = Object.values(tasksFiltered).sort((a, b) =>
      a.date_set.date_iso?.localeCompare(b.date_set.date_iso)
    );
    const arrayWithTime = sortedArray
      .filter((task) => task.date_set.time_from)
      .sort((a, b) => a.date_set.date_iso?.localeCompare(b.date_set.date_iso));
    const arrayNoTime = sortedArray.filter((task) => !task.date_set.time_from);
    setArrayOfTasksWithTime(arrayWithTime);
    setArrayOfTasksNoTime(arrayNoTime);
  }, [tasks]);

  const closeModalOnClick = () => {
    router.push("/app/labels");
  };

  const getLabelsByTask = (taskID: string) => {
    const task = { ...tasks[String(taskID)] };
    const labelsSelected = task.labels;
    const labelsFiltered = labelsSelected?.map((label) => labels[label]);
    return labelsFiltered;
  };

  return (
    <LabelsLayout>
      <Modal closeModalOnClick={closeModalOnClick} onCloseRedirect={linkID}>
        <div className="tasks">
          {arrayOfTasksWithTime?.map((task, index) => (
            <Link
              href={`/app/labels/${labelID}/task/${task.task_id}`}
              key={task.task_id}
            >
              <TaskComponent
                taskID={task.task_id}
                task={task}
                getLabelsByTask={getLabelsByTask}
                index={index}
                lastIndex={arrayOfTasksWithTime.length - 1}
              />
            </Link>
          ))}
          <div className="tasks-no-time">
            {arrayOfTasksNoTime?.map((task, index) => (
              <Link
                href={`/app/labels/${labelID}/task/${task.task_id}`}
                key={task.task_id}
              >
                <TaskComponent
                  taskID={task.task_id}
                  task={task}
                  getLabelsByTask={getLabelsByTask}
                  index={index}
                  lastIndex={arrayOfTasksNoTime.length - 1}
                />
              </Link>
            ))}
          </div>
        </div>
      </Modal>
      <style jsx>{`
        .tasks {
          padding: 2.5rem 0.5rem 0 0.5rem;
          width: 95vw;
          height: 90vh;
          max-width: var(--max-width-task);
          text-align: left;
          display: flex;
          flex-direction: column;
          color: var(--text-secondary-color);
          overflow: auto;
          pointer-events: initial;
          gap: 0.5rem;
        }
        .tasks-no-time {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1rem;
        }
      `}</style>
    </LabelsLayout>
  );
};

export default LabelID;
