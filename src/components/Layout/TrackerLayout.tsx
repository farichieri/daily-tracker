import { ReactNode } from "react";
import { selectUser } from "store/slices/authSlice";
import { useSelector } from "react-redux";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import Tracker from "../Tracker/Tracker";

const TrackerLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useSelector(selectUser);
  return (
    <PremiumLayout>
      <div className=" flex h-full w-full flex-col items-center overflow-x-auto">
        {user && <Tracker />}
        {children}
      </div>
    </PremiumLayout>
  );
};

export default TrackerLayout;
