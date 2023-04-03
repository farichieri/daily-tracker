import { dbFormatDate } from "@/utils/formatDate";
import { format, parseISO } from "date-fns";
import {
  selectShowNoTimeTasks,
  selectTrackerSlice,
  selectTrackerView,
  setShowNoTimeTasks,
  setTrackerView,
} from "store/slices/trackerSlice";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DayPickerC from "@/components/DayPickerC/DayPickerC";
import Link from "next/link";

const FilterSelect = () => {
  const router = useRouter();
  const { date } = router.query;
  const { today } = useSelector(selectTrackerSlice);
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const dispatch = useDispatch();
  const showNoTimeTasks = useSelector(selectShowNoTimeTasks);
  const viewSelected = useSelector(selectTrackerView);
  const dayView = viewSelected === "day";
  const weekView = viewSelected === "week";

  const setNewTrackerView = (option: string) => {
    dispatch(setTrackerView(option));
  };

  const handleDateSelected = (day: Date | undefined) => {
    if (day) {
      setDateSelected(day);
      router.push(`/app/tracker/${dbFormatDate(day)}`);
    }
  };

  const dateToShow = date ? format(parseISO(String(date)), "LLLL u") : today; // April 2023
  const [openDateSelector, setOpenDateSelector] = useState(false);

  return (
    <div
      className="z-20 m-auto flex h-[var(--premium-nav-height)] w-fit min-w-fit items-start 
   "
    >
      {/* <div className="min-w-fit">
        <DayPickerC
          setWantToAddDate={() => {}}
          removeDate={() => {}}
          open={openDateSelector}
          setOpen={setOpenDateSelector}
          withModal={true}
          dateSelected={dateSelected}
          handleDateSelected={handleDateSelected}
          dateToShow={dateToShow}
          addTask={false}
        />
      </div> */}
      <div
        className="flex overflow-auto rounded-b-3xl shadow-md shadow-gray-500/50 dark:shadow-gray-400/20
"
      >
        <button
          onClick={() => setNewTrackerView("day")}
          className={`${
            dayView ? "text-[var(--text-color)]" : "text-neutral-500"
          } min-h-max ho5er:bg-[var(--bg-color-tertiary-light)] flex h-full min-h-full w-16 items-center justify-center border-b  border-transparent py-0.5 pl-4  pr-2 dark:bg-black `}
        >
          Day
        </button>
        <Link href={`/app/tracker/${today}`} className="flex h-full">
          <button
            onClick={() => setNewTrackerView("day")}
            className={`${
              date === today && dayView ? "text-red-500" : "text-neutral-500"
            } min-h-max flex h-full min-h-full w-16 items-center justify-center border-b border-transparent py-0.5  px-2 hover:bg-[var(--bg-color-tertiary-light)] dark:bg-black `}
          >
            Today
          </button>
        </Link>
        <button
          onClick={() => setNewTrackerView("week")}
          className={`${
            weekView ? "text-[var(--text-color)]" : "text-neutral-500"
          } min-h-max flex h-full min-h-full w-16 items-center justify-center rounded-br-3xl border border-transparent py-0.5  pl-2 pr-4 hover:bg-[var(--bg-color-tertiary-light)]  dark:bg-black `}
        >
          Week
        </button>
      </div>
      {/* <button onClick={() => dispatch(setShowNoTimeTasks(!showNoTimeTasks))}>
        Toggle
      </button> */}
    </div>
  );
};

export default FilterSelect;
