import { setTheme } from "store/slices/themeSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PremiumNav from "../Nav/PremiumNav";
import PremiumSidebar from "../Nav/PremiumSidebar";
import {
  selectSidebarState,
  toggleIsCreatingProject,
  toggleSidebar,
} from "store/slices/layoutSlice";
import { selectUser } from "store/slices/authSlice";
import {
  selectToday,
  setDaySelected,
  setProjects,
} from "store/slices/trackerSlice";
import {
  getProjects,
  getLists,
  getLabels,
  getTasks,
  getGoals,
} from "@/hooks/firebase";
import { LabelGroup, TaskGroup, ListGroup, GoalGroup } from "@/global/types";
import { selectGlobalState, setIsDataFetched } from "store/slices/globalSlice";
import { setLabels } from "store/slices/labelsSlice";
import { setLists } from "store/slices/listsSlice";
import { setTasks } from "store/slices/tasksSlice";
import { useRouter } from "next/router";
import Loader from "./Loader/Loader";
import Login from "../Auth/Login";
import { setGoals } from "store/slices/goalsSlice";

export default function PremiumLayout({
  children,
  withPadding,
}: {
  children: React.ReactNode;
  withPadding: boolean;
}) {
  const dispatch = useDispatch();
  const padding = withPadding ? 1.5 : 0;
  const router = useRouter();
  const { isDataFetched } = useSelector(selectGlobalState);
  const { user, userSettings, isVerifyingUser } = useSelector(selectUser);
  const sidebarOpen = useSelector(selectSidebarState);
  const today = useSelector(selectToday);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const fetchAllData = async () => {
    let localTheme = window.localStorage.getItem("theme");
    if (!localTheme) {
      window.localStorage.setItem("theme", "dark");
    }
    dispatch(setTheme(String(localTheme)));
    if (!user) return;
    const labelsData: LabelGroup = await getLabels(user);
    const listsData: ListGroup = await getLists(user);
    const tasksData: TaskGroup = await getTasks(user);
    const goalsData: GoalGroup = await getGoals(user);
    const projects = await getProjects(user);
    if (projects.length < 1) {
      dispatch(toggleIsCreatingProject());
    }
    dispatch(setDaySelected(today));
    dispatch(setLabels(labelsData));
    dispatch(setLists(listsData));
    dispatch(setTasks(tasksData));
    dispatch(setGoals(goalsData));
    dispatch(setProjects(projects));
    dispatch(setIsDataFetched(true));
  };

  useEffect(() => {
    if (!isDataFetched) {
      fetchAllData();
    }
  }, [user]);

  useEffect(() => {
    if (!user && !isVerifyingUser) {
      router.push("/user");
    }
  }, [user, isVerifyingUser]);

  return (
    <section className="flex items-center justify-center ">
      {isVerifyingUser ? (
        <Loader fullScreen={false} text={""} />
      ) : !user ? (
        <div className="login-container">
          <Login />
        </div>
      ) : isDataFetched === false ? (
        <Loader text="" fullScreen={true} />
      ) : (
        user &&
        userSettings.display_name &&
        !isVerifyingUser && (
          <>
            <PremiumNav />
            <PremiumSidebar />
            {sidebarOpen && (
              <span className="modal" onClick={handleToggleSidebar}></span>
            )}
          </>
        )
      )}
      <div
        className={`flex-colr flex w-full justify-center px-2 ${
          sidebarOpen && "sm:pl-48 "
        } xl:pl-0`}
      >
        {children}
      </div>
      <style jsx>
        {`
          section {
            align-items: flex-start;
            display: flex;
            height: 100%;
            margin: auto;
            max-height: 100vh;
            padding: ${padding}rem;
            width: 100vw;
            overflow: hidden;
          }
          .login-container {
            display: flex;
            min-height: 100vh;
            align-items: center;
            margin: auto;
            justify-content: center;
            min-width: 100vw;
          }
          .container {
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 0 0.5rem;
          }
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 0;
            right: 0;
            bottom: 0;
            z-index: 7;
          }
          @media (min-width: 640px) {
            .modal {
              display: none;
            }
          }
          @media (min-width: 640px) and (max-width: 1300px) {
            .container {
              padding-left: ${sidebarOpen ? "210px" : "initial"};
            }
          }
        `}
      </style>
    </section>
  );
}
