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
      {options.map((opt: string, i: number) => {
        return opt === 'reset' ? (
          <button onClick={handleSelectFilterOption} key={i} value={opt}>
            <Image
              src={'/icons/reset.png'}
              alt={'Reset Icon'}
              width={36}
              height={36}
              style={{ pointerEvents: 'none' }}
            />
          </button>
        ) : (
          <button
            key={i}
            className={`${optionSelected === opt ? 'selected' : ''}`}
            onClick={handleSelectFilterOption}
            value={opt}
          >
            {opt}
          </button>
        );
      })}
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
          width: 36px;
          height: 36px;
          border: none;
          background: var(--box-shadow-light);
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
