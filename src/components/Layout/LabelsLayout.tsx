import { ReactNode } from "react";
import Labels from "../Labels/Labels";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import RecurringTasks from "../TasksList/Tasks/RecurringTasks/RecurringTasks";
import UndefinedTasks from "../TasksList/Tasks/UndefinedTasks/UndefinedTasks";

const LabelsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <PremiumLayout>
      <div className="flex h-screen max-h-screen flex-col items-center gap-4 py-2  ">
        <Labels />
        <RecurringTasks />
        <UndefinedTasks />
      </div>
      {children}
    </PremiumLayout>
  );
};

export default LabelsLayout;
