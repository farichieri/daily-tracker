import Head from 'next/head';
import reset from '@/styles/reset';
import colors from '@/styles/colors';
import Nav from '../Nav/Nav';
import React, { useEffect, useState } from 'react';
import general from '@/styles/general';
import typography, { fonts } from '@/styles/typography';
import Footer from '../Footer/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/firebase.config';
import { useDispatch } from 'react-redux';
import { verifyUser } from 'store/slices/authSlice';
import { selectTheme } from 'store/slices/themeSlice';
import { useSelector } from 'react-redux';

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [userVerified, setUserVerified] = useState<boolean>(false);
  const theme = useSelector(selectTheme);

  useEffect(() => {
    if (userVerified === false) {
      onAuthStateChanged(auth, (user) => {
        setUserVerified(true);
        dispatch(verifyUser(user));
      });
    }
  }, []);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Daily Tracker</title>
      </Head>
      <div className={`${fonts.raleWay.className} ${theme}`}>
        <main>{children}</main>
      </div>
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
