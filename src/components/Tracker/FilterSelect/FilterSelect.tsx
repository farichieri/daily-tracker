import DayPickerC from '@/components/DayPickerC/DayPickerC';

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
      <DayPickerC />
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
          margin: auto;
        }
        .img {
          pointer-events: none;
        }
        button {
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
        button:hover {
          background: var(--bg-color-tertiary-light);
        }
        button:active {
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
