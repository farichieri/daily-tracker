import DayPickerC from '@/components/DayPickerC/DayPickerC';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectTrackerSlice } from 'store/slices/trackerSlice';

const FilterSelect = () => {
  const { today } = useSelector(selectTrackerSlice);
  return (
    <div>
      <DayPickerC />
      <Link href={`/app/tracker/${today}`}>
        <span>Today</span>
      </Link>
      <style jsx>{`
        div {
          display: flex;
          gap: 0.5rem;
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
