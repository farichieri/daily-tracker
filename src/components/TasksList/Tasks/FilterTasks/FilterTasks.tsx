import { useDispatch } from "react-redux";
import { setTasksFilter } from "store/slices/listsSlice";

const FilterTasks = ({
  options,
  showOption,
}: {
  options: any;
  showOption: string;
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex w-full items-center justify-center gap-4">
      {Object.keys(options).map((opt: string) => (
        <button
          key={opt}
          className={`w-24 rounded-lg border border-slate-700 p-1 capitalize shadow-md shadow-neutral-400/50 duration-300 hover:bg-[var(--bg-color-tertiary-light)] ${
            showOption === options[opt]
              ? "bg-[var(--bg-color-tertiary-light)]"
              : "bg-transparent"
          }`}
          onClick={() => dispatch(setTasksFilter(options[opt]))}
        >
          {options[opt]}
        </button>
      ))}
    </div>
  );
};

export default FilterTasks;
