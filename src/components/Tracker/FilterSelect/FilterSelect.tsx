const FilterSelect = ({
  options,
  handleSelectFilterOption,
  optionSelected,
}: {
  options: any;
  handleSelectFilterOption: any;
  optionSelected: string;
}) => {
  return (
    <div>
      {options.map((opt: string, i: number) => (
        <button
          key={i}
          className={`${optionSelected === opt ? 'selected' : ''}`}
          onClick={handleSelectFilterOption}
          value={opt}
        >
          {opt}
        </button>
      ))}
      <style jsx>{`
        div {
          display: flex;
          gap: 0.5rem;
        }
        button {
          border-radius: 999px;
          background: transparent;
          border: 1px solid var(--text-color);
          color: var(--text-color);
          padding: 0.25rem 0.5rem;
          cursor: pointer;
          width: 7rem;
        }
        .selected {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default FilterSelect;
