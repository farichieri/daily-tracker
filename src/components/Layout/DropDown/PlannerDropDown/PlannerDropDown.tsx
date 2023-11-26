import { useState } from "react";
import DropDown from "../DropDown";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShowNoTimeTasks,
  setShowNoTimeTasks,
} from "store/slices/trackerSlice";
import ReplaceDay from "./ReplaceDay";

const PlannerDropDown = () => {
  const dispatch = useDispatch();
  const showNoTimeTasks = useSelector(selectShowNoTimeTasks);
  const [closeDrop, setCloseDrop] = useState(false);

  const optClass =
    "flex items-center gap-2 p-1.5 cursor-pointer hover:bg-gray-200/20";

  return (
    <DropDown
      closeDrop={closeDrop}
      setCloseDrop={setCloseDrop}
      btnText={
        <Image
          src={"/icons/more.png"}
          alt="More Icon"
          width={12}
          height={12}
          style={{ pointerEvents: "none" }}
        />
      }
    >
      <div className="flex w-40 min-w-max flex-col overflow-auto rounded-md">
        <div
          className={optClass}
          onClick={() => dispatch(setShowNoTimeTasks(!showNoTimeTasks))}
        >
          <Image
            src={showNoTimeTasks ? "/icons/hide.png" : "/icons/show.png"}
            alt="More Icon"
            width={12}
            height={12}
          />
          <span>
            {showNoTimeTasks ? "Hide No time Tasks" : "Show No time Tasks"}
          </span>
        </div>
        <div className={optClass}>
          <ReplaceDay />
        </div>
      </div>
    </DropDown>
  );
};

export default PlannerDropDown;
