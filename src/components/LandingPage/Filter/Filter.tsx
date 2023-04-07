import React from "react";

const Filter = ({
  handleFilter,
  optionSelected,
}: {
  handleFilter: any;
  optionSelected: string;
}) => {
  const OPTIONS = ["All", "productivity"];
  return (
    <div>
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          className={opt === optionSelected ? "this-filter" : ""}
          onClick={handleFilter}
          value={opt}
        >
          {opt}
        </button>
      ))}
      <style jsx>{`
        div {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-top: 1rem;
          margin: 1rem auto;
          border-bottom: 1px solid gray;
          padding: 0.5rem;
        }
        button {
          padding: 0.4rem 1rem;
          border-radius: 5px;
          font-weight: 500;
          cursor: pointer;
          color: gray;
          transition: 0.3s;
          background: none;
          border: 1px solid transparent;
          margin: auto;
          text-transform: capitalize;
        }

        button:hover {
          color: var(--textColor);
          border: 1px solid var(--text-color);
        }

        .this-filter {
          color: var(--textColor);
          box-shadow: 0 0 10px 1px var(--box-shadow);
          border: 1px solid var(--text-color);
        }
      `}</style>
    </div>
  );
};

export default Filter;
