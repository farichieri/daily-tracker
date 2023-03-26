import { auth } from "@/utils/firebase.config";
import { getUserSettings } from "@/hooks/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { selectTheme } from "store/slices/themeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  verifyUser,
  userVerified,
  setUserSettings,
} from "store/slices/authSlice";
import colors from "@/styles/colors";
import effects from "@/styles/effects";
import general from "@/styles/general";
import Head from "next/head";
import React, { useEffect } from "react";
import reset from "@/styles/reset";
import typography, { fonts } from "@/styles/typography";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    dispatch(verifyUser());
    console.log("Verifying User");
    onAuthStateChanged(auth, async (user) => {
      console.log({ user });

      dispatch(userVerified(user));
      if (user) {
        const settings = await getUserSettings(user);
        settings && dispatch(setUserSettings(settings));
      }
    });
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Improve.me</title>
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
      <style jsx global>
        {effects}
      </style>
    </>
  );
}
