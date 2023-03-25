import DaysSelector from "./DaysSelector";
import DayTasks from "./DayTasks/DayTasks";
import { dbFormatDate } from "@/utils/formatDate";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDaySelected,
  selectWeekSelected,
  setDaySelected,
} from "store/slices/trackerSlice";
import Header from "./Header";
import { parseISO } from "date-fns";
import { useRouter } from "next/dist/client/router";
import { selectTasks } from "store/slices/tasksSlice";
import { filterTasksByDateSet } from "@/hooks/helpers";

const Tracker = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { date } = router.query;
  const { tasks } = useSelector(selectTasks);
  const daySelected = useSelector(selectDaySelected);
  const weekSelected = useSelector(selectWeekSelected);
  const tasksFiltered = filterTasksByDateSet(tasks, String(date));

  const handleDatesSelected = (e: Event) => {
    e.preventDefault();
    const action = (e.target as HTMLButtonElement).id;
    const modifyDateDays = (date: Date, action: string, days: number) => {
      if (action === "prev") {
        date.setDate(date.getDate() - days);
      } else if (action === "next") {
        date.setDate(date.getDate() + days);
      }
      return date;
    };
    const newSelectedDay = dbFormatDate(
      modifyDateDays(parseISO(daySelected), action, 7)
    );
    router.push(newSelectedDay);
    dispatch(setDaySelected(newSelectedDay));
  };

  return (
    <section>
      <Header />
      <DaysSelector
        week={weekSelected}
        handleDatesSelected={handleDatesSelected}
      />
      <div className="tasks-goals-container">
        <DayTasks tasksFiltered={tasksFiltered} />
        {/* <Goals /> */}
      </div>
      <style jsx>{`
        section {
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: 1rem;
          min-height: calc(100vh - var(--premium-nav-height));
        }
        .tasks-goals-container {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: start;
        }
      `}</style>
    </section>
  );
};

export default Tracker;
