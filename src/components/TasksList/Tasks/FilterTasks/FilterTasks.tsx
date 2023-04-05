const FilterTasks = ({
  options,
  setShowOption,
  showOption,
}: {
  options: any;
  setShowOption: Function;
  showOption: string;
}) => {
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
          onClick={() => setShowOption(options[opt])}
        >
          {options[opt]}
        </button>
      ))}
    </div>
  );
};

export default FilterTasks;
