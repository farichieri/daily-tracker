import React, { useEffect } from 'react';
import PremiumNav from '../Nav/PremiumNav';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, setTheme } from 'store/slices/themeSlice';
import PremiumSidebar from '../Nav/PremiumSidebar';
import {
  selectIsCreatingProject,
  selectIsCreatingTodo,
  selectIsEditingProject,
  selectIsEditingTodo,
  selectIsProfileOpen,
  selectSidebarState,
  setIsLoading,
  toggleSidebar,
} from 'store/slices/layoutSlice';
import ProjectCreate from '../ProjectCreate/ProjectCreate';
import ProjectEdit from '../ProjectEdit/ProjectEdit';
import { selectUser } from 'store/slices/authSlice';
import Settings from '../Settings/Settings';
import {
  selectDayData,
  selectIsLoadingData,
  selectProjects,
  selectProjectSelected,
  selectToday,
  selectWeekSelected,
  setDayData,
  setDaySelected,
  setIsLoadingData,
  setProjects,
} from 'store/slices/trackerSlice';
import {
  selectTodos,
  selectTodoSelected,
  setTodos,
} from 'store/slices/todosSlice';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';
import { getProjects, getTodos } from '@/hooks/firebase';
import { dbFormatDate } from '@/utils/formatDate';
import TodoCreate from '../TodoCreate/TodoCreate';
import TodoEdit from '../TodoEdit/TodoEdit';

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
  const isCreatingProject = useSelector(selectIsCreatingProject);
  const isEditingProject = useSelector(selectIsEditingProject);
  const isCreatingTodo = useSelector(selectIsCreatingTodo);
  const isEditingTodo = useSelector(selectIsEditingTodo);
  const sidebarOpen = useSelector(selectSidebarState);
  const isProfileOpen = useSelector(selectIsProfileOpen);
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

  useEffect(() => {
    user && dispatch(setIsLoading(false));
  }, [user]);

  const projectSelected = useSelector(selectProjectSelected);
  const todoSelected = useSelector(selectTodoSelected);
  const projects = useSelector(selectProjects);
  const todos = useSelector(selectTodos);
  const today = useSelector(selectToday);
  const isLoadingData = useSelector(selectIsLoadingData);

  const getUserData = async (date: string) => {
    if (user && date && projectSelected?.id) {
      console.log('Fetching Data');
      const docRef = doc(
        db,
        'users',
        user.uid,
        'projects',
        projectSelected.id,
        'dates',
        date
      );
      const querySnapshot = await getDoc(docRef);
      let data: any = querySnapshot.data();
      dispatch(setDayData(data));
    }
  };

  useEffect(() => {
    const getData = async () => {
      dispatch(setIsLoadingData(true));
      await getUserData(dbFormatDate(new Date()));
    };
    const getProjectsData = async () => {
      if (!user) return;
      dispatch(setIsLoadingData(true));
      const projects = await getProjects(user);
      dispatch(setProjects(projects));
    };

    if (user && projectSelected?.id) {
      getData();
    }
    if (projects.length < 1 && user) {
      getProjectsData();
    }
  }, [projectSelected, projects, user]);

  useEffect(() => {
    const getTodosData = async () => {
      if (!user) return;
      const todos = await getTodos(user);
      dispatch(setTodos(todos));
    };
    if (todos.length < 1 && user) {
      getTodosData();
    }
  }, [todoSelected, user]);

  useEffect(() => {
    dispatch(setDaySelected(today));
  }, [today]);

  return (
    <section>
      {user && userSettings.displayName && !isVerifyingUser && (
        <>
          {isProfileOpen && <Settings />}
          {isCreatingProject && <ProjectCreate />}
          {isEditingProject && <ProjectEdit />}
          {isCreatingTodo && <TodoCreate />}
          {isEditingTodo && <TodoEdit />}
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
