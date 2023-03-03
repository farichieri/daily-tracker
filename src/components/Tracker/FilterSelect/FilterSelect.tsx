const FilterSelect = ({
  options,
  handleSelectFilterOption,
}: {
  options: any;
  handleSelectFilterOption: any;
}) => {
  return (
    <div>
      {options.map((opt: string) => (
        <button onClick={handleSelectFilterOption} value={opt}>
          {opt}
        </button>
      ))}
      <style jsx>{`
        div {
          display: flex;
        }
      `}</style>
    </div>
  );
};

export default FilterSelect;
