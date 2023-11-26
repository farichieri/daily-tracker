import TrackerLayout from "@/components/Layout/TrackerLayout";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setDaySelected } from "store/slices/trackerSlice";
import { useEffect } from "react";
import { getTasks } from "@/services";
import { selectUser } from "store/slices/authSlice";
import { setTasks } from "store/slices/tasksSlice";

const Date = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { date } = router.query;
  const { user } = useSelector(selectUser);

  useEffect(() => {
    date && dispatch(setDaySelected(String(date)));
    const fetchTasks = async () => {
      if (!user) return;
      const tasks = await getTasks(user, String(date));
      dispatch(setTasks(tasks));
    };
    fetchTasks();
  }, [date, dispatch, user]);

  return <TrackerLayout>{}</TrackerLayout>;
};

export default Date;
