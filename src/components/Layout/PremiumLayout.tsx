import React, { useEffect } from 'react';
import PremiumNav from '../Nav/PremiumNav';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, setTheme } from 'store/slices/themeSlice';
import PremiumSidebar from '../Nav/PremiumSidebar';
import { selectUser } from 'store/slices/authSlice';
import Modal from '../Modal/Modal';
import { selectIsCreatingProject } from 'store/slices/layoutSlice';
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

  useEffect(() => {
    let localTheme = window.localStorage.getItem('theme');
    if (!localTheme) {
      window.localStorage.setItem('theme', 'dark');
    }
    dispatch(setTheme(String(localTheme)));
  }, [theme]);

  return (
    <section>
      {isCreatingProject && <ProjectCreate />}
      <PremiumNav />
      <PremiumSidebar />
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

          @media and only screen (max-width: 500px) {
            section {
              padding: ${Number(padding) / 1}rem;
            }
          }
          @media and only screen (max-width: 400px) {
            section {
              padding: ${Number(padding) / 1.5}rem;
            }
          }
        `}
      </style>
    </section>
  );
}
