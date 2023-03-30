import {
  selectTrackerSlice,
  selectTrackerView,
} from "store/slices/trackerSlice";
import { Day, Week } from "@/global/types";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";

const DaysSelector = ({ daysToDisplay }: { daysToDisplay: Week }) => {
  const router = useRouter();
  const { date } = router.query;
  const { today } = useSelector(selectTrackerSlice);
  const trackerview = useSelector(selectTrackerView);
  const weekView = trackerview === "week";

  return (
    <div className="flex w-full select-none flex-col gap-2">
      <div className="flex w-full gap-1">
        <div className="dates-container">
          {daysToDisplay.map((day: any) => (
            <Link href={`/app/tracker/${day.date}`} key={day.date}>
              <div
                className={`flex flex-col items-center justify-center rounded-md border border-transparent px-1 py-0.5 text-[var(--text-color)] duration-300 hover:bg-[var(--bg-color-tertiary-light)] ${
                  day.date === date && !weekView
                    ? "bg-[var(--bg-color-tertiary-light)]"
                    : ""
                } ${day.date === today ? "today" : ""}`}
              >
                <span className="text-[0.5rem] text-gray-500">
                  {day.weekDay}
                </span>
                <span
                  className={`text-xs ${
                    day.date === today ? "text-red-500" : ""
                  }`}
                >
                  {day.numberOfMonth}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style jsx>{`
        .dates-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(2rem, 1fr));
          width: 100%;
          gap: 5px;
        }
      `}</style>
    </div>
  );
};

export default DaysSelector;
