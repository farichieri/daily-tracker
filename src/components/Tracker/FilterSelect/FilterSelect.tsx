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
    <div className="z-20 m-auto flex h-[var(--premium-nav-height)] w-fit min-w-fit items-start ">
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
      <div className="flex">
        <Link href={`/app/tracker/${today}`} className="flex h-full">
          <button
            onClick={() => setNewTrackerView("day")}
            className="min-h-max flex h-full min-h-full items-center justify-center rounded-bl-3xl bg-black py-0.5 pr-2 pl-4 shadow-md shadow-gray-300/20 hover:bg-[var(--bg-color-tertiary-light)] active:shadow-sm active:shadow-gray-500/25"
          >
            Today
          </button>
        </Link>
        <button
          onClick={() => setNewTrackerView("week")}
          className="min-h-max flex h-full min-h-full items-center justify-center rounded-br-3xl bg-black py-0.5 pl-2 pr-4 shadow-md shadow-gray-300/20 hover:bg-[var(--bg-color-tertiary-light)] active:shadow-sm active:shadow-gray-500/25"
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
