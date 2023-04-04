import { useRouter } from "next/router";
import { useState } from "react";
import DropDown from "../DropDown";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShowNoTimeTasks,
  setShowNoTimeTasks,
} from "store/slices/trackerSlice";

const PlannerDropDown = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const showNoTimeTasks = useSelector(selectShowNoTimeTasks);
  const [closeDrop, setCloseDrop] = useState(false);

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
      <div className="flex w-48 min-w-max gap-2 px-2 py-1">
        <button onClick={() => dispatch(setShowNoTimeTasks(!showNoTimeTasks))}>
          {showNoTimeTasks
            ? "Hide Tasks without time set"
            : "Show Tasks without time set"}
        </button>
      </div>
    </DropDown>
  );
};

export default PlannerDropDown;
