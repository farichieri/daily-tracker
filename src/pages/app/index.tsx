import { selectTrackerSlice } from "store/slices/trackerSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { selectUser } from "store/slices/authSlice";
import PremiumLayout from "@/components/Layout/PremiumLayout";

const TrackerPage = () => {
  const router = useRouter();
  const { today } = useSelector(selectTrackerSlice);
  const { user } = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      router.push(`/app/tracker/${today}`);
    } else {
      router.push(`/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <PremiumLayout>{}</PremiumLayout>;
};

export default TrackerPage;
