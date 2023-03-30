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
    <div className="list">
      <div className="tasks-container">
        <Tasks tasksState={tasksState} />
        <AddTask date={""} />
      </div>
      <style jsx>{`
        .list {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          height: 100%;
        }
        .tasks-container {
          justify-content: space-between;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 10rem;
        }
        .header {
          display: flex;
          margin-left: auto;
        }
      `}</style>
    </div>
  );
};

export default TasksList;
