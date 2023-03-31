import { ReactNode } from "react";
import { selectUser } from "store/slices/authSlice";
import { useSelector } from "react-redux";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import Goals from "../Goals/Goals";
import AddGoal from "../Goals/AddGoal/AddGoal";

const GoalsLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useSelector(selectUser);
  return (
    <PremiumLayout>
      <div className="container">
        {user && (
          <>
            <div className="my-5 w-full">
              <Goals />
            </div>
            <AddGoal />
          </>
        )}
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
          padding: calc(var(--premium-nav-height)) 0 1rem 0;
        }
      `}</style>
    </PremiumLayout>
  );
};

export default GoalsLayout;
