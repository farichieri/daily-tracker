import DaysSelector from "./DaysSelector";
import DayTasks from "./DayTasks/DayTasks";
import { useSelector } from "react-redux";
import { filterTasksByDateSet } from "@/hooks/helpers";
import { selectTasks } from "store/slices/tasksSlice";
import { TaskGroup } from "@/global/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Header from "./Header";

const Tracker = () => {
  const router = useRouter();
  const { date } = router.query;
  const { tasks } = useSelector(selectTasks);
  const [tasksFiltered, setTasksFiltered] = useState<TaskGroup>(
    filterTasksByDateSet(tasks, String(date))
  );

  useEffect(() => {
    const filtered = filterTasksByDateSet(tasks, String(date));
    setTasksFiltered(filtered);
  }, [tasks, date]);

  return (
    <section className="flex h-full w-full flex-col gap-2 py-2">
      <Header />
      <DaysSelector />
      <DayTasks tasksFiltered={tasksFiltered} />
    </section>
  );
};

export default Tracker;
