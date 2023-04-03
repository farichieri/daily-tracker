import { db } from "@/utils/firebase.config";
import { deleteDoc, doc } from "firebase/firestore";
import {
  filterRecurringTasks,
  filterTasksPerRecurringGroup,
} from "@/hooks/helpers";
import { selectTasks, setDeleteTask } from "store/slices/tasksSlice";
import { selectUser } from "store/slices/authSlice";
import { TaskGroup } from "@/global/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const RecurringTasks = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(selectTasks);
  const { user } = useSelector(selectUser);
  const [recurringTasks, setRecurringTasks] = useState<TaskGroup>(
    filterRecurringTasks(tasks)
  );
  const [recurringGroups, setRecurringGroups] = useState<TaskGroup>({});
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const recurrings = filterRecurringTasks(tasks);
    setRecurringTasks(recurrings);
  }, [tasks]);

  useEffect(() => {
    const groups = separateSameRecurring(recurringTasks);
    setRecurringGroups(groups);
  }, [recurringTasks]);

  const separateSameRecurring = (recurringTasks: TaskGroup) => {
    const recurringGroups: TaskGroup = {};
    for (let task in recurringTasks) {
      const id = recurringTasks[task]?.recurring?.recurring_id;
      if (!recurringGroups[id]) {
        recurringGroups[id] = recurringTasks[task];
      }
    }
    return recurringGroups;
  };

  const deleteAll = async (recurring_id: string) => {
    if (!user) return;
    if (isDeleting) return;
    const executeDel = async () => {
      setIsDeleting(true);
      for (let task in recurringTasks) {
        if (recurringTasks[task].recurring.recurring_id === recurring_id) {
          const task_id = recurringTasks[task].task_id;
          const docRef = doc(db, "users", user.uid, "tasks", task_id);
          dispatch(setDeleteTask(task_id));
          await deleteDoc(docRef);
          console.log("deleted: ", task_id);
        }
      }
      setIsDeleting(false);
    };
    await executeDel();
  };

  const allGroupTasks = (recurring_id: string) => {
    const tasks = filterTasksPerRecurringGroup(recurringTasks, recurring_id);
    return tasks;
  };

  return (
    <div className="flex w-full max-w-[var(--max-width-content)] flex-col gap-2">
      <p>Recurring tasks</p>
      <div className="flex w-full flex-col gap-2">
        {recurringGroups &&
          Object.keys(recurringGroups).map((task) => (
            <div key={task} className="flex items-center rounded-md border p-2">
              <div className="flex flex-col">
                <span>{recurringGroups[task].content}</span>
                <div className="flex gap-2 text-xs text-gray-400">
                  <span> # of tasks:</span>
                  <span>
                    {
                      Object.keys(
                        allGroupTasks(
                          recurringGroups[task].recurring.recurring_id
                        )
                      ).length
                    }
                  </span>
                </div>
              </div>
              <button
                className="ml-auto rounded-md border p-1"
                onClick={() => deleteAll(task)}
              >
                Delete ALL
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecurringTasks;
