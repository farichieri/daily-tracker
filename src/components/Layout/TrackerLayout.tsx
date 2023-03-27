import { ReactNode } from "react";
import { selectUser } from "store/slices/authSlice";
import { useSelector } from "react-redux";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import Tracker from "../Tracker/Tracker";

const TrackerLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useSelector(selectUser);
  return (
    <PremiumLayout withPadding={false}>
      <div className="flex h-full w-full max-w-[var(--max-width-content)] flex-col items-center justify-center ">
        {user && <Tracker />}
        {children}
      </div>
    </PremiumLayout>
  );
};

export default TrackerLayout;
