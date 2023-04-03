import { filterUndefinedTasks } from "@/hooks/helpers";
import { useSelector } from "react-redux";
import { selectTasks } from "store/slices/tasksSlice";
import Tasks from "../Tasks";

const UndefinedTasks = () => {
  const { tasks } = useSelector(selectTasks);
  const undefinedTasks = filterUndefinedTasks(tasks);
  console.log({ undefinedTasks });

  return (
    <div className="overflow-auto">
      {/* <Tasks tasksState={undefinedTasks} /> */}
    </div>
  );
};

export default UndefinedTasks;
