import { filterObject } from "@/hooks/helpers";
import { selectTasks } from "store/slices/tasksSlice";
import { TaskGroup } from "@/global/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import AddTask from "./Tasks/AddTask";
import Tasks from "./Tasks/Tasks";

const TasksList = () => {
  const router = useRouter();
  const { listID } = router.query;
  const { tasks } = useSelector(selectTasks);
  const tasksByListID = filterObject(tasks, "project_id", String(listID));
  const [tasksState, setTasksState] = useState<TaskGroup>(tasksByListID);

  useEffect(() => {
    setTasksState(tasksByListID);
  }, [tasks, listID]);

  return (
    <div className="flex h-full w-full flex-col justify-start gap-2 overflow-auto py-4 ">
      <div className="mb-10 flex w-full flex-col items-center justify-center gap-2 py-10 ">
        <Tasks tasksState={tasksState} />
        <AddTask date={""} />
      </div>
    </div>
  );
};

export default TasksList;
