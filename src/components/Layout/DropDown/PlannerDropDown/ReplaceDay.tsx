import DayPickerC from "@/components/DayPickerC/DayPickerC";
import { deleteTask, getTasks, postTask } from "@/services";
import { dbFormatDate } from "@/utils/formatDate";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/slices/authSlice";
import { useRouter } from "next/router";
import { setAddNewTask, setDeleteTask } from "store/slices/tasksSlice";

interface Props {}

const ReplaceDay: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector(selectUser);
  const router = useRouter();
  const queryDate = router.query.date as string;
  const dispatch = useDispatch();

  const handleSelect = async (day: Date) => {
    if (!user) return;
    setOpen(false);
    const dateToReplace = day || new Date();
    window.confirm(
      `Confirm replacement of ALL day with ${dateToReplace.toDateString()}`
    );
    const date = dbFormatDate(day);
    const newTasks = await getTasks(user, date);
    const oldTasks = await getTasks(user, queryDate);
    const newTasksArray = Object.values(newTasks);

    // delete old tasks
    await Promise.all(
      Object.keys(oldTasks).map(async (task_id: string) => {
        await deleteTask({ user, task_id });
        dispatch(setDeleteTask(task_id));
      })
    );

    // join parentIds to array
    const parentIds: string[] = [];
    newTasksArray.forEach((t) => {
      if (!parentIds.includes(t.parent_id)) {
        parentIds.push(t.parent_id);
      }
    });

    // add new tasks
    parentIds.forEach(async (parent_id: string) => {
      const parentTask = newTasksArray.find((t) => t.task_id === parent_id);
      if (!parentTask) return;
      const newTask = {
        ...parentTask,
        date_set: {
          ...parentTask.date_set,
          date_only: queryDate,
        },
      };
      const taskAdded = await postTask({ user, task: newTask });
      dispatch(setAddNewTask(taskAdded));

      const childrenTasks = newTasksArray.filter(
        (t) => t.parent_id === parent_id
      );
      childrenTasks.forEach(async (t) => {
        const newTask = {
          ...t,
          parent_id: taskAdded.task_id,
          date_set: {
            ...parentTask.date_set,
            date_only: queryDate,
          },
        };
        const subtaskADded = await postTask({ user, task: newTask });
        dispatch(setAddNewTask(subtaskADded));
      });
    });

    // add tasks without parent
    newTasksArray.forEach(async (task) => {
      if (!parentIds.includes(task.task_id)) {
        const newTask = {
          ...task,
          date_set: {
            ...task.date_set,
            date_only: queryDate,
          },
        };
        const taskAdded = await postTask({ user, task: newTask });
        dispatch(setAddNewTask(taskAdded));
      }
    });
  };

  return (
    <div>
      <DayPickerC
        addTask={false}
        dateSelected={new Date(queryDate)}
        dateToShow={"Replace with day"}
        handleDateSelected={handleSelect}
        open={open}
        removeDate={() => {}}
        setOpen={setOpen}
        setWantToAddDate={() => {}}
        withModal={true}
      />
    </div>
  );
};

export default ReplaceDay;
