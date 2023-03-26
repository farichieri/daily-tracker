import { Label } from "@/global/types";
import { selectLabels } from "store/slices/labelsSlice";
import { selectTasks } from "store/slices/tasksSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import AssignLabel from "./TaskActionsModals/AssignLabel";
import AssignList from "./TaskActionsModals/AssignList";
import AssignReminder from "./TaskActionsModals/AssignReminder";
import LabelsButton from "@/components/TasksList/Tasks/TaskActions/TaskActionsButtons/LabelsButton";
import ListButton from "./TaskActionsButtons/ListButton";
import ReminderButton from "@/components/TasksList/Tasks/TaskActions/TaskActionsButtons/ReminderButton";
import ToggleDoneTask from "./TaskActionsButtons/ToggleDoneTask";
import WorkingOnButton from "./TaskActionsButtons/WorkingOnButton";

const TaskActions = () => {
  const router = useRouter();
  const [openAssignLabel, setOpenAssignLabel] = useState(false);
  const [openAssignReminder, setOpenAssignReminder] = useState(false);
  const [openAssignList, setOpenAssignList] = useState(false);
  const { tasks } = useSelector(selectTasks);
  const { taskID } = router.query;
  const task = { ...tasks[String(taskID)] };
  const labelsSelected = task?.labels;
  const { labels } = useSelector(selectLabels);
  const labelsFiltered = labelsSelected?.map((label) => labels[label]);
  const [labelsInTask, setLabelsInTask] = useState<Label[]>(labelsFiltered);

  useEffect(() => {
    setLabelsInTask(labelsFiltered);
  }, [labelsSelected]);

  const closeModalOnClick = () => {
    setOpenAssignLabel(false);
    setOpenAssignReminder(false);
    setOpenAssignList(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full min-w-full items-center justify-between gap-2">
        {openAssignLabel && (
          <AssignLabel
            closeModalOnClick={closeModalOnClick}
            isNewTask={false}
            task={task}
            handleChangeLabels={() => null}
          />
        )}
        {openAssignList && (
          <AssignList
            closeModalOnClick={closeModalOnClick}
            isNewTask={false}
            task={task}
            handleChangeList={() => null}
          />
        )}
        {openAssignReminder && (
          <AssignReminder closeModalOnClick={closeModalOnClick} />
        )}
        <div className="labels">
          <LabelsButton onClick={() => setOpenAssignLabel(true)} />
        </div>
        <div className="reminder">
          <ReminderButton onClick={() => setOpenAssignReminder(true)} />
        </div>
        <div className="lists">
          <ListButton onClick={() => setOpenAssignList(true)} task={task} />
        </div>
        {!task.done && (
          <div className="working-on">
            <WorkingOnButton task={task} />
          </div>
        )}
        <ToggleDoneTask task={task} />
      </div>
      <div className="flex gap-2">
        {labelsInTask.map(
          (label) =>
            label && (
              <span
                className="cursor-pointer rounded-md py-1 px-2"
                key={label.label_id}
                style={{ background: `${label.label_color}` }}
                onClick={() => setOpenAssignLabel(true)}
              >
                {label.label_name}
              </span>
            )
        )}
      </div>
    </div>
  );
};

export default TaskActions;
