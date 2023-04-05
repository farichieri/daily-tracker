import { ReactNode } from "react";
import { selectUser } from "store/slices/authSlice";
import { useSelector } from "react-redux";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import TasksList from "@/components/TasksList/TasksList";

const TasksLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useSelector(selectUser);

  return (
    <PremiumLayout>
      <div className="flex h-screen max-h-screen w-full max-w-[var(--max-width-content)] flex-col items-start pt-6 pb-4">
        {user && <TasksList />}
      </div>
      {children}
    </PremiumLayout>
  );
};

export default TasksLayout;
