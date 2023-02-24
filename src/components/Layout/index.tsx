import Head from 'next/head';
import reset from '@/styles/reset';
import colors from '@/styles/colors';
import Nav from '../Nav/Nav';
import React, { useEffect, useState } from 'react';
import general from '@/styles/general';
import typography, { fonts } from '@/styles/typography';
import Footer from '../Footer/Footer';

export default function Layout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const [theme, setTheme] = useState<string>('');

  useEffect(() => {
    let localTheme = window.localStorage.getItem('theme');
    if (!localTheme) {
      window.localStorage.setItem('theme', 'dark');
    }
    setTheme(String(localTheme));
  }, [theme]);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>habits-tracker</title>
      </Head>
      {theme && (
        <div className={`${fonts.raleWay.className} ${theme}`}>
          <Nav theme={theme} setTheme={setTheme} user={user} />
          <main>{children}</main>
          <Footer />
        </div>
      )}
      <style jsx>{`
        div {
          align-content: center;
          align-items: center;
          display: flex;
          flex-direction: column;
          margin: auto;
          min-height: 100vh;
          text-align: center;
          color: var(--text-color);
          background: var(--bg-color);
        }
      `}</style>
      <style jsx global>
        {`
          main {
            background: var(--bg-color);
            color: var(--text-color);
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
      <style jsx global>
        {reset}
      </style>
      <style jsx global>
        {general}
      </style>
      <style jsx global>
        {typography}
      </style>
      <style jsx global>
        {colors}
      </style>
    </>
  );
}
