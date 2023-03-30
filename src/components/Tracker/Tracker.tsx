import { filterTasksByDateSet } from "@/hooks/helpers";
import { selectTasks } from "store/slices/tasksSlice";
import {
  selectTrackerView,
  selectWeekSelected,
} from "store/slices/trackerSlice";
import { TaskGroup } from "@/global/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import AddTask from "../TasksList/Tasks/AddTask";
import DaysSelector from "./DaysSelector";
import DayTasks from "./DayTasks/DayTasks";
import FilterSelect from "./FilterSelect/FilterSelect";

const Tracker = () => {
  const router = useRouter();
  const { date } = router.query;
  const { tasks } = useSelector(selectTasks);
  const trackerView = useSelector(selectTrackerView);
  const weekSelected = useSelector(selectWeekSelected);
  const [tasksFiltered, setTasksFiltered] = useState<TaskGroup>(
    filterTasksByDateSet(tasks, String(date))
  );

  useEffect(() => {
    const filtered = filterTasksByDateSet(tasks, String(date));
    setTasksFiltered(filtered);
  }, [tasks, date]);

  return (
    <section
      className={`flex h-full w-full max-w-[var(--max-width-content)] flex-col gap-2 py-2 ${
        trackerView === "day" && "max-w-[var(--max-width-content)]"
      } ${trackerView === "week" && "m-x-auto min-w-full"}`}
    >
      <FilterSelect />
      <DaysSelector />
      <div className="mx-auto flex h-full w-full overflow-y-auto">
        {trackerView === "day" ? (
          <DayTasks tasksFiltered={tasksFiltered} />
        ) : (
          weekSelected.map((day) => (
            <DayTasks
              key={day.date}
              tasksFiltered={filterTasksByDateSet(tasks, day.date)}
            />
          ))
        )}
      </div>

      {/* <AddTask /> */}
    </section>
  );
};

export default Tracker;
