import React from "react";
import Clock from "../Clock/Clock";
import FilterSelect from "./FilterSelect/FilterSelect";

const Header = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <FilterSelect />
      <Clock />
    </div>
  );
};

export default Header;
