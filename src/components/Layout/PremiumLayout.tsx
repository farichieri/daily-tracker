import React, { useEffect } from 'react';
import PremiumNav from '../Nav/PremiumNav';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, setTheme } from 'store/slices/themeSlice';
import PremiumSidebar from '../Nav/PremiumSidebar';
import {
  selectIsCreatingProject,
  selectIsEditingProject,
  selectSidebarState,
  setIsLoading,
  toggleSidebar,
} from 'store/slices/layoutSlice';
import ProjectCreate from '../ProjectCreate/ProjectCreate';
import ProjectEdit from '../ProjectEdit/ProjectEdit';
import { selectUser } from 'store/slices/authSlice';

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
  const sidebarOpen = useSelector(selectSidebarState);
  const { user } = useSelector(selectUser);

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

  return (
    <section>
      {isCreatingProject && <ProjectCreate />}
      {isEditingProject && <ProjectEdit />}
      <PremiumNav />
      <PremiumSidebar />
      {sidebarOpen && (
        <span className='modal' onClick={handleToggleSidebar}></span>
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
            padding-top: calc(var(--premium-nav-height));
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
