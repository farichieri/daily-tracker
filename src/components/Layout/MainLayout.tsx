import React, { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, setTheme } from 'store/slices/themeSlice';

export default function MainLayout({
  children,
  withPadding,
}: {
  children: React.ReactNode;
  withPadding: boolean;
}) {
  const padding = withPadding ? 1.5 : 0;
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);

  useEffect(() => {
    let localTheme = window.localStorage.getItem('theme');
    if (!localTheme) {
      window.localStorage.setItem('theme', 'dark');
    }
    dispatch(setTheme(String(localTheme)));
  }, [theme]);

  return (
    <section>
      <Nav />
      <div className='container'>{children}</div>
      <Footer />
      <style jsx>
        {`
          section {
            align-items: center;
            display: flex;
            flex-direction: column;
            height: 100%;
            margin: auto;
            min-height: calc(100vh - var(--footer-height));
            padding: ${padding}rem;
            padding-top: calc(var(--nav-height));
            width: 100%;
          }
          .container {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: start;
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
