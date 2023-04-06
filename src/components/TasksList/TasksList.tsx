import { filterObject } from "@/hooks/helpers";
import { selectTasks } from "store/slices/tasksSlice";
import { TaskGroup } from "@/global/types";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import AddTask from "./Tasks/AddTask";
import Tasks from "./Tasks/Tasks";

const TasksList = () => {
  const router = useRouter();
  const { listID } = router.query;
  const { tasks } = useSelector(selectTasks);
  const tasksByListID = useMemo(
    () => filterObject(tasks, "project_id", String(listID)),
    [String(listID), tasks]
  );
  const [tasksState, setTasksState] = useState<TaskGroup>(tasksByListID);

  useEffect(() => {
    setTasksState(tasksByListID);
  }, [tasks, listID]);

  return (
    <div className="flex h-full w-full flex-col justify-start">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Tasks tasksState={tasksState} />
        <AddTask date={""} />
      </div>
    </div>
  );
};

export default TasksList;
