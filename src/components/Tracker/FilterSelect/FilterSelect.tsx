import { dbFormatDate } from "@/utils/formatDate";
import { format, parseISO } from "date-fns";
import {
  selectShowNoTimeTasks,
  selectTrackerSlice,
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
    <div className="z-20 m-auto flex w-fit min-w-fit items-center  gap-2">
      <div className="min-w-fit">
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
      <Link href={`/app/tracker/${today}`}>
        <button
          onClick={() => setNewTrackerView("day")}
          className="flex items-center justify-center rounded-md border border-[var(--box-shadow-light)] px-1 py-0.5 hover:bg-[var(--bg-color-tertiary-light)] active:shadow-sm active:shadow-gray-500/25"
        >
          Today
        </button>
      </Link>
      <button
        onClick={() => setNewTrackerView("week")}
        className="flex w-full items-center justify-center rounded-md border border-[var(--box-shadow-light)] px-1 py-0.5 hover:bg-[var(--bg-color-tertiary-light)] active:shadow-sm active:shadow-gray-500/25"
      >
        Week
      </button>
      <button onClick={() => dispatch(setShowNoTimeTasks(!showNoTimeTasks))}>
        Toggle
      </button>
    </div>
  );
};

export default FilterSelect;
