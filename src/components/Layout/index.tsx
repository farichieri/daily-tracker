import { auth } from "@/utils/firebase.config";
import { getUserSettings } from "@/hooks/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  verifyUser,
  userVerified,
  setUserSettings,
} from "store/slices/authSlice";
import effects from "@/styles/effects";
import Head from "next/head";
import React, { useEffect } from "react";
import reset from "@/styles/reset";
import typography, { fonts } from "@/styles/typography";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

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
      <div
        className={`${fonts.raleWay.className} flex flex-col bg-white text-black dark:bg-[#091d23] dark:text-white`}
      >
        <main className="">{children}</main>
      </div>
      <style jsx global>
        {reset}
      </style>
      <style jsx global>
        {typography}
      </style>
      <style jsx global>
        {effects}
      </style>
    </>
  );
}
