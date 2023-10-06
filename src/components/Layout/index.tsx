import {
  verifyUser,
  userVerified,
  setUserSettings,
} from "store/slices/authSlice";
import { auth } from "@/utils/firebase.config";
import { getUserSettings } from "@/hooks/firebase";
import { Inter } from "next/font/google";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import effects from "@/styles/effects";
import Head from "next/head";
import React, { useEffect } from "react";
import reset from "@/styles/reset";

const font = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyUser());
    onAuthStateChanged(auth, async (user) => {
      dispatch(userVerified(user));
      if (user) {
        const settings = await getUserSettings(user);
        settings && dispatch(setUserSettings(settings));
      }
    });
  }, [dispatch]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Improve.me</title>
      </Head>
      <div
        className={`${font.className} flex flex-col dark:bg-black dark:text-white`}
      >
        <div className="fixed inset-0 z-0 rounded-lg bg-gradient-to-tr from-blue-400/40 via-blue-900/50 to-black opacity-50 "></div>
        <main className="z-50">{children}</main>
      </div>
      <style jsx global>
        {reset}
      </style>
      <style jsx global>
        {effects}
      </style>
    </>
  );
}
