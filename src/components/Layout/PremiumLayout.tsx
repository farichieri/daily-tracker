import { useEffect } from 'react';
import PremiumNav from '../Nav/PremiumNav';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from 'store/slices/themeSlice';
import PremiumSidebar from '../Nav/PremiumSidebar';
import {
  selectSidebarState,
  toggleIsCreatingProject,
  toggleSidebar,
} from 'store/slices/layoutSlice';
import { selectUser } from 'store/slices/authSlice';
import {
  selectToday,
  setDaySelected,
  setProjects,
} from 'store/slices/trackerSlice';
import { setTasks, setLists } from 'store/slices/listsSlice';
import { getProjects, getLists, getLabels, getTasks } from '@/hooks/firebase';
import { LabelGroup, TaskGroup, ListGroup } from '@/global/types';
import { setLabels } from 'store/slices/labelsSlice';
import { selectGlobalState, setIsDataFetched } from 'store/slices/globalSlice';
import Loader from './Loader/Loader';
import { useRouter } from 'next/router';
import Login from '../Auth/Login';

export default function PremiumLayout({
  children,
  withPadding,
}: {
  children: React.ReactNode;
  withPadding: boolean;
}) {
  const padding = withPadding ? 1.5 : 0;
  const router = useRouter();
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(selectSidebarState);
  const { user, userSettings, isVerifyingUser } = useSelector(selectUser);
  const today = useSelector(selectToday);
  const { isDataFetched } = useSelector(selectGlobalState);
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const fetchAllData = async () => {
    let localTheme = window.localStorage.getItem('theme');
    if (!localTheme) {
      window.localStorage.setItem('theme', 'dark');
    }
    dispatch(setTheme(String(localTheme)));
    if (!user) return;
    const labelsData: LabelGroup = await getLabels(user);
    const listsData: ListGroup = await getLists(user);
    const tasksData: TaskGroup = await getTasks(user);
    const projects = await getProjects(user);
    if (projects.length < 1) {
      dispatch(toggleIsCreatingProject());
    }
    dispatch(setDaySelected(today));
    dispatch(setLabels(labelsData));
    dispatch(setLists(listsData));
    dispatch(setTasks(tasksData));
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
      router.push('/user');
    }
  }, [user, isVerifyingUser]);

  return (
    <section>
      {isVerifyingUser ? (
        <Loader fullScreen={false} text={''} />
      ) : !user ? (
        <div className='login-container'>
          <Login />
        </div>
      ) : isDataFetched === false ? (
        <Loader text='' fullScreen={true} />
      ) : (
        user &&
        userSettings.display_name &&
        !isVerifyingUser && (
          <>
            <PremiumNav />
            <PremiumSidebar />
            {sidebarOpen && (
              <span className='modal' onClick={handleToggleSidebar}></span>
            )}
          </>
        )
      )}
      <div className='container'>{children}</div>
      <style jsx>
        {`
          section {
            align-items: flex-start;
            display: flex;
            height: 100%;
            margin: auto;
            min-height: calc(100vh - var(--premium-nav-height));
            padding: ${padding}rem;
            width: 100vw;
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
          @media screen and (min-width: 900px) {
            .modal {
              display: none;
            }
          }
        `}
      </style>
    </section>
  );
}
