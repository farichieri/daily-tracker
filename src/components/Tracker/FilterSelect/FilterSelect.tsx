import { dbFormatDate } from "@/utils/formatDate";
import { format, formatISO, parse, parseISO } from "date-fns";
import { selectTrackerSlice } from "store/slices/trackerSlice";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import { useState } from "react";
import DayPickerC from "@/components/DayPickerC/DayPickerC";
import Link from "next/link";

const FilterSelect = () => {
  const { today } = useSelector(selectTrackerSlice);
  const router = useRouter();
  const { date } = router.query;

  const [dateSelected, setDateSelected] = useState<Date>(new Date());

  const handleDateSelected = (day: Date | undefined) => {
    if (day) {
      setDateSelected(day);
      router.push(`/app/tracker/${dbFormatDate(day)}`);
    }
  };

  const dateToShow = format(parseISO(String(date)), "LLLL u"); // April 2023
  const [openDateSelector, setOpenDateSelector] = useState(false);

  return (
    <div>
      <DayPickerC
        setWantToAddDate={() => {}}
        removeDate={() => {}}
        open={openDateSelector}
        setOpen={setOpenDateSelector}
        withModal={false}
        dateSelected={dateSelected}
        handleDateSelected={handleDateSelected}
        dateToShow={dateToShow}
      />
      <Link href={`/app/tracker/${today}`}>
        <span>Today</span>
      </Link>
      <style jsx>{`
        div {
          display: flex;
          gap: 0.5rem;
          z-index: 50;
        }
        .img {
          pointer-events: none;
        }
        span {
          padding: 0.25rem 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          color: var(--text-color);
          background: transparent;
          border: 1px solid var(--box-shadow-light);
          border-radius: 5px;
        }
        span:hover {
          background: var(--bg-color-tertiary-light);
        }
        span:active {
          box-shadow: 0 0 10px 1px var(--box-shadow);
        }
        .selected {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default FilterSelect;
