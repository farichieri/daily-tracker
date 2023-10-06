import {
  getProjects,
  getLists,
  getLabels,
  getTasks,
  getGoals,
} from "@/hooks/firebase";
import {
  selectLayoutState,
  setIsSidebarOpen,
  toggleIsCreatingProject,
} from "store/slices/layoutSlice";
import { selectGlobalState, setIsDataFetched } from "store/slices/globalSlice";
import { selectTrackerView, setProjects } from "store/slices/trackerSlice";
import { selectUser } from "store/slices/authSlice";
import { setGoals } from "store/slices/goalsSlice";
import { setLabels } from "store/slices/labelsSlice";
import { setLists } from "store/slices/listsSlice";
import { setTasks } from "store/slices/tasksSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader/Loader";
import PremiumNav from "../Nav/PremiumNav";
import PremiumSidebar from "../Nav/PremiumSidebar";

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isDataFetched } = useSelector(selectGlobalState);
  const { isSidebarOpen } = useSelector(selectLayoutState);
  const { user, userSettings, isVerifyingUser } = useSelector(selectUser);
  const trackerView = useSelector(selectTrackerView);

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
    if (!user) return;
    const [labelsData, listsData, tasksData, goalsData, projects] =
      await Promise.all([
        getLabels(user),
        getLists(user),
        getTasks(user),
        getGoals(user),
        getProjects(user),
      ]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!user && !isVerifyingUser) {
      router.push("/");
    }
  }, [user, isVerifyingUser, router]);

  return (
    <section className="flex h-screen min-h-screen items-start justify-center overflow-hidden">
      {isVerifyingUser ? (
        <Loader fullScreen={false} text={""} />
      ) : !user ? (
        <></>
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
        className={`mx-auto flex h-full w-full max-w-[1500px] flex-col items-center px-2 transition-all duration-300 ease-linear ${
          isSidebarOpen && "sm:pl-[10.5rem] "
        } ${
          router.pathname.includes("tracker") && trackerView === "week"
            ? "2xl:pl-0"
            : "2xl:pl-0"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
