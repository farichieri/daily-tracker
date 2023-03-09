import React, { useEffect, useRef } from 'react';
import PremiumNav from '../Nav/PremiumNav';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, setTheme } from 'store/slices/themeSlice';
import PremiumSidebar from '../Nav/PremiumSidebar';
import { selectUser } from 'store/slices/authSlice';
import Modal from '../Modal/Modal';
import {
  selectIsCreatingProject,
  selectSidebarState,
  toggleSidebar,
} from 'store/slices/layoutSlice';
import ProjectCreate from '../ProjectCreate/ProjectCreate';

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
  const { user } = useSelector(selectUser);
  const isCreatingProject = useSelector(selectIsCreatingProject);
  const sidebarOpen = useSelector(selectSidebarState);

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

  return (
    <section>
      {isCreatingProject && <ProjectCreate />}
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
