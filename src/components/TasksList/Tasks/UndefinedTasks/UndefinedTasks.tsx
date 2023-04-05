import { filterUndefinedTasks } from "@/hooks/helpers";
import { useSelector } from "react-redux";
import { selectTasks } from "store/slices/tasksSlice";
import Tasks from "../Tasks";

const UndefinedTasks = () => {
  const { tasks } = useSelector(selectTasks);
  const undefinedTasks = filterUndefinedTasks(tasks);
  console.log({ undefinedTasks });

  return (
    <div className="w-full py-2">
      <span>Undefined Tasks</span>
      <div className="span">
        These are the tasks that do not have a date or list assigned
      </div>
      <div className="overflow-auto">
        <Tasks tasksState={undefinedTasks} />
      </div>
    </div>
  );
};

export default UndefinedTasks;
