import PremiumLayout from "@/components/Layout/PremiumLayout";
import { ReactNode } from "react";
import Labels from "../Labels/Labels";
import RecurringTasks from "../TasksList/Tasks/RecurringTasks/RecurringTasks";
import UndefinedTasks from "../TasksList/Tasks/UndefinedTasks/UndefinedTasks";

const LabelsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <PremiumLayout>
      <Labels />
      <RecurringTasks />
      <UndefinedTasks />
      {children}
    </PremiumLayout>
  );
};

export default LabelsLayout;
