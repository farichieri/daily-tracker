import PremiumLayout from "@/components/Layout/PremiumLayout";
import { ReactNode } from "react";
import Labels from "../Labels/Labels";
import RecurringTasks from "../TasksList/Tasks/RecurringTasks/RecurringTasks";

const LabelsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <PremiumLayout>
      <Labels />
      <RecurringTasks />
      {children}
    </PremiumLayout>
  );
};

export default LabelsLayout;
