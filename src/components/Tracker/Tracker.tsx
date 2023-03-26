import DaysSelector from "./DaysSelector";
import DayTasks from "./DayTasks/DayTasks";
import { dbFormatDate } from "@/utils/formatDate";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDaySelected,
  selectWeekSelected,
  setDaySelected,
} from "store/slices/trackerSlice";
import { filterTasksByDateSet } from "@/hooks/helpers";
import { parseISO } from "date-fns";
import { selectTasks } from "store/slices/tasksSlice";
import { TaskGroup } from "@/global/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Header from "./Header";

const Tracker = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { date } = router.query;
  const { tasks } = useSelector(selectTasks);
  const daySelected = useSelector(selectDaySelected);
  const weekSelected = useSelector(selectWeekSelected);
  const [tasksFiltered, setTasksFiltered] = useState<TaskGroup>(
    filterTasksByDateSet(tasks, String(date))
  );

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

  useEffect(() => {
    const filtered = filterTasksByDateSet(tasks, String(date));
    setTasksFiltered(filtered);
  }, [tasks, date]);

  return (
    <section className="flex min-h-screen w-full flex-col gap-2 py-2">
      <Header />
      <DaysSelector
        week={weekSelected}
        handleDatesSelected={handleDatesSelected}
      />
      <DayTasks tasksFiltered={tasksFiltered} />
    </section>
  );
};

export default Tracker;
