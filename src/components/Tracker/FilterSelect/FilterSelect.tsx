import { dbFormatDate } from "@/utils/formatDate";
import { format, parseISO } from "date-fns";
import { selectTrackerSlice } from "store/slices/trackerSlice";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import { useState } from "react";
import DayPickerC from "@/components/DayPickerC/DayPickerC";
import Link from "next/link";

const FilterSelect = () => {
  const router = useRouter();
  const { date } = router.query;
  const { today } = useSelector(selectTrackerSlice);
  const [dateSelected, setDateSelected] = useState<Date>(new Date());

  const handleDateSelected = (day: Date | undefined) => {
    if (day) {
      setDateSelected(day);
      router.push(`/app/tracker/${dbFormatDate(day)}`);
    }
  };

  const dateToShow = date ? format(parseISO(String(date)), "LLLL u") : today; // April 2023
  const [openDateSelector, setOpenDateSelector] = useState(false);

  return (
    <div className="z-20 flex items-center gap-2">
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
      <Link href={`/app/tracker/${today}`}>
        <span className="flex items-center justify-center rounded-md border border-[var(--box-shadow-light)] px-1 py-0.5 hover:bg-[var(--bg-color-tertiary-light)] active:shadow-sm active:shadow-gray-500/25">
          Today
        </span>
      </Link>
    </div>
  );
};

export default FilterSelect;
