import { ReactNode } from "react";
import { selectUser } from "store/slices/authSlice";
import { useSelector } from "react-redux";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import TasksList from "@/components/TasksList/TasksList";

const TasksLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useSelector(selectUser);

  return (
    <PremiumLayout withPadding={false}>
      <div className="mt-4 flex w-full max-w-[var(--max-width-content)] flex-col pt-[var(--premium-nav-height)]">
        {user && <TasksList />}
      </div>
      {children}
    </PremiumLayout>
  );
};

export default TasksLayout;
