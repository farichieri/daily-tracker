import Image from 'next/image';

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
          margin: auto;
        }
        .img {
          pointer-events: none;
        }
        button {
          border-radius: 999px;
          padding: 0.25rem 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: var(--box-shadow-light);
          color: var(--text-color);
          border: 1px solid var(--box-shadow-light);
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
