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
      <div className="mx-auto flex h-full w-full gap-1 overflow-x-auto overflow-y-auto">
        {trackerView === "day" ? (
          <DayTasks
            tasksFiltered={tasksFiltered}
            date={String(date)}
            index={0}
            lastIndex={0}
          />
        ) : (
          weekSelected.map((day, index) => (
            <DayTasks
              key={day.date}
              tasksFiltered={filterTasksByDateSet(tasks, day.date)}
              date={day.date}
              index={index}
              lastIndex={weekSelected.length - 1}
            />
          ))
        )}
      </div>
      <style jsx>{`
        @media screen and (max-width: 640px) {
          div::-webkit-scrollbar {
            display: none;
          }

          div {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Tracker;
