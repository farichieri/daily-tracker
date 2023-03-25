import { ReactNode } from "react";
import { selectUser } from "store/slices/authSlice";
import { useSelector } from "react-redux";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import TasksList from "@/components/TasksList/TasksList";

const TasksLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useSelector(selectUser);

  return (
    <PremiumLayout withPadding={false}>
      <div className="list">{user && <TasksList />}</div>
      {children}
      <style jsx>{`
        .list {
          max-width: var(--max-width-content);
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          align-items: center;
          padding-top: calc(var(--premium-nav-height) + 1rem);
        }
      `}</style>
    </PremiumLayout>
  );
};

export default TasksLayout;
