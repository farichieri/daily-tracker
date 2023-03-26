import React from "react";
import Clock from "../Clock/Clock";
import FilterSelect from "./FilterSelect/FilterSelect";

const Header = () => {
  return (
    <div className="header">
      <FilterSelect />
      <Clock />
      <style jsx>{`
        .header {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default Header;
