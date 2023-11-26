import {
  selectTrackerView,
  selectWeekSelected,
} from "store/slices/trackerSlice";
import { selectTasks } from "store/slices/tasksSlice";
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

  return (
    <section
      className={`flex h-full w-full flex-col gap-2  ${
        trackerView === "day" && ""
      } ${trackerView === "week" && ""}`}
    >
      <FilterSelect />
      <div className="flex-start mx-auto flex h-full w-full justify-start  gap-1 overflow-x-auto overflow-y-auto ">
        {trackerView === "day" ? (
          <div className="mx-auto w-full max-w-5xl">
            <DayTasks
              tasks={tasks}
              date={String(date)}
              index={0}
              lastIndex={0}
            />
          </div>
        ) : (
          weekSelected.map((day, index) => (
            <DayTasks
              tasks={tasks}
              key={day.date}
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
