import { useEffect } from 'react';
import PremiumNav from '../Nav/PremiumNav';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, setTheme } from 'store/slices/themeSlice';
import PremiumSidebar from '../Nav/PremiumSidebar';
import {
  selectSidebarState,
  toggleIsCreatingProject,
  toggleSidebar,
} from 'store/slices/layoutSlice';
import { selectUser } from 'store/slices/authSlice';
import {
  selectProjects,
  selectProjectSelected,
  selectToday,
  setDaySelected,
  setIsLoadingData,
  setProjects,
} from 'store/slices/trackerSlice';
import {
  selectTodos,
  selectTodoSelected,
  setTodos,
} from 'store/slices/todosSlice';
import { getProjects, getTodos } from '@/hooks/firebase';
import { LabelGroup, TodoGroup } from '@/global/types';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';
import { setLabels } from 'store/slices/labelsSlice';

export default function PremiumLayout({
  children,
  withPadding,
}: {
  children: React.ReactNode;
  withPadding: boolean;
}) {
  const padding = withPadding ? 1.5 : 0;
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const sidebarOpen = useSelector(selectSidebarState);
  const { user, userSettings, isVerifyingUser } = useSelector(selectUser);

  useEffect(() => {
    let localTheme = window.localStorage.getItem('theme');
    if (!localTheme) {
      window.localStorage.setItem('theme', 'dark');
    }
    dispatch(setTheme(String(localTheme)));
  }, [theme]);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const projectSelected = useSelector(selectProjectSelected);
  const todoSelected = useSelector(selectTodoSelected);
  const projects = useSelector(selectProjects);
  const todos = useSelector(selectTodos);
  const today = useSelector(selectToday);

  useEffect(() => {
    const getProjectsData = async () => {
      if (!user) return;
      dispatch(setIsLoadingData(true));
      const projects = await getProjects(user);
      if (projects.length < 1) {
        dispatch(toggleIsCreatingProject());
        dispatch(setIsLoadingData(false));
      }
      dispatch(setProjects(projects));
    };
    if (projects.length < 1 && user) {
      getProjectsData();
    }
  }, [projectSelected, user]);

  useEffect(() => {
    const getTodosData = async () => {
      if (!user) return;
      const todos: TodoGroup = await getTodos(user);
      dispatch(setTodos(todos));
    };
    if (Object.keys(todos).length < 1 && user) {
      getTodosData();
    }
  }, [todoSelected, user]);

  useEffect(() => {
    dispatch(setDaySelected(today));
  }, [today]);

  const getLabels = async () => {
    if (user) {
      console.log('Fetching Labels');
      let data: LabelGroup = {};
      const docRef = collection(db, 'users', user.uid, 'labels');
      const querySnapshot = await getDocs(docRef);
      querySnapshot.forEach((label: any) => {
        data[label.id] = label.data();
      });
      dispatch(setLabels(data));
    }
  };

  useEffect(() => {
    getLabels();
  }, [user]);

  return (
    <section>
      {user && userSettings.display_name && !isVerifyingUser && (
        <>
          <PremiumNav />
          <PremiumSidebar />
          {sidebarOpen && (
            <span className='modal' onClick={handleToggleSidebar}></span>
          )}
        </>
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
            width: 100%;
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
