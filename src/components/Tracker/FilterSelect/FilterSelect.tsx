import { dbFormatDate } from "@/utils/formatDate";
import { format } from "date-fns";
import {
  selectTrackerSlice,
  selectTrackerView,
  setTrackerView,
} from "store/slices/trackerSlice";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DayPickerC from "@/components/DayPickerC/DayPickerC";
import Link from "next/link";
import PlannerDropDown from "@/components/Layout/DropDown/PlannerDropDown/PlannerDropDown";

const FilterSelect = () => {
  const router = useRouter();
  const { date } = router.query;
  const { today } = useSelector(selectTrackerSlice);
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const dispatch = useDispatch();
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

  const dateToShow = date ? format(new Date(String(date)), "LLLL u") : today; // April 2023
  const [openDateSelector, setOpenDateSelector] = useState(false);

  const buttonClass =
    "flex h-6 sm:h-8 sm:text-lg sm:w-20 w-12 items-center justify-center border-b border-transparent pl-4 pr-2 duration-300 hover:bg-[var(--bg-color-tertiary-light)] sm:w-16";

  return (
    <div className="h-fit z-20 m-auto flex max-h-max w-fit min-w-fit flex-col items-center gap-2 ">
      <div className="flex select-none items-start overflow-auto rounded-b-xl text-xs shadow-md shadow-gray-500/50 dark:bg-[var(--cool)] dark:shadow-gray-400/20">
        <button
          onClick={() => setNewTrackerView("day")}
          className={`${
            dayView ? "text-[var(--text-color)]" : "text-neutral-500"
          } ${buttonClass}`}
        >
          Day
        </button>
        <Link href={`/app/tracker/${today}`} className="flex h-full">
          <button
            onClick={() => setNewTrackerView("day")}
            className={`${
              date === today && dayView ? "text-red-400" : "text-neutral-500"
            } ${buttonClass}`}
          >
            Today
          </button>
        </Link>
        <button
          onClick={() => setNewTrackerView("week")}
          className={`${
            weekView ? "text-[var(--text-color)]" : "text-neutral-500"
          } ${buttonClass}`}
        >
          Week
        </button>
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        <div className="ml-12">
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
        </div>
        <div className="flex items-center justify-center">
          <PlannerDropDown />
        </div>
      </div>
    </div>
  );
};

export default FilterSelect;
