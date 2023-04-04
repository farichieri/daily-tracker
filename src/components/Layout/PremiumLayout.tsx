import { selectTrackerView, setProjects } from "store/slices/trackerSlice";
import { selectUser } from "store/slices/authSlice";
import {
  selectLayoutState,
  setIsSidebarOpen,
  toggleIsCreatingProject,
} from "store/slices/layoutSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PremiumNav from "../Nav/PremiumNav";
import PremiumSidebar from "../Nav/PremiumSidebar";
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
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isDataFetched } = useSelector(selectGlobalState);
  const { user, userSettings, isVerifyingUser } = useSelector(selectUser);
  const trackerView = useSelector(selectTrackerView);
  const { isSidebarOpen } = useSelector(selectLayoutState);

  const handleToggleSidebar = () => {
    if (
      localStorage.sidebarState === "true" ||
      !("sidebarState" in localStorage)
    ) {
      localStorage.sidebarState = false;
      dispatch(setIsSidebarOpen(false));
    } else {
      localStorage.sidebarState = true;
      dispatch(setIsSidebarOpen(true));
    }
  };

  const fetchAllData = async () => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    if (!user) return;
    const labelsData: LabelGroup = await getLabels(user);
    const listsData: ListGroup = await getLists(user);
    const tasksData: TaskGroup = await getTasks(user);
    const goalsData: GoalGroup = await getGoals(user);
    const projects = await getProjects(user);
    if (projects.length < 1) {
      dispatch(toggleIsCreatingProject());
    }
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
      handleToggleSidebar();
    }
  }, [user]);

  useEffect(() => {
    if (!user && !isVerifyingUser) {
      router.push("/user");
    }
  }, [user, isVerifyingUser]);

  return (
    <section className="flex h-screen max-h-screen min-h-screen items-start justify-center overflow-hidden">
      {isVerifyingUser ? (
        <Loader fullScreen={false} text={""} />
      ) : !user ? (
        <div className="min-w-screen m-auto flex min-h-screen items-center justify-center">
          <Login />
        </div>
      ) : isDataFetched === false ? (
        <Loader text="" fullScreen={true} />
      ) : (
        user &&
        userSettings.display_name &&
        !isVerifyingUser && (
          <>
            <PremiumNav
              sidebarState={isSidebarOpen}
              handleToggleSidebar={handleToggleSidebar}
            />
            <PremiumSidebar sidebarState={isSidebarOpen} />
            {isSidebarOpen && (
              <span
                className="fixed inset-0 z-10 bg-[var(--bg-modal)] sm:hidden"
                onClick={handleToggleSidebar}
              ></span>
            )}
          </>
        )
      )}
      <div
        className={`duratin-300 flex h-full w-full flex-col items-center px-2 transition-all ease-linear ${
          isSidebarOpen && "sm:pl-[10.5rem] "
        } ${
          router.pathname.includes("tracker") && trackerView === "week"
            ? "3xl:pl-0"
            : "xl:pl-0"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
