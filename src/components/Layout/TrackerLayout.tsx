import PremiumLayout from "@/components/Layout/PremiumLayout";
import { ReactNode } from "react";
import Tracker from "../Tracker/Tracker";
import { useSelector } from "react-redux";
import { selectUser } from "store/slices/authSlice";

const TrackerLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useSelector(selectUser);
  return (
    <PremiumLayout withPadding={false}>
      <div className="container">
        {user && <Tracker />}
        {children}
      </div>
      <style jsx>{`
        .container {
          max-width: var(--max-width-content);
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          align-items: center;
          padding-top: calc(var(--premium-nav-height));
        }
      `}</style>
    </PremiumLayout>
  );
};

export default TrackerLayout;
