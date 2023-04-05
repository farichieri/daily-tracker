import TrackerLayout from "@/components/Layout/TrackerLayout";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setDaySelected } from "store/slices/trackerSlice";
import { useEffect } from "react";

const Date = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { date } = router.query;

  useEffect(() => {
    date && dispatch(setDaySelected(String(date)));
  }, [date]);

  return <TrackerLayout>{}</TrackerLayout>;
};

export default Date;
