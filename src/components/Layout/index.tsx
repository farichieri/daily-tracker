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
import React, { useEffect, useState } from "react";
import reset from "@/styles/reset";
import typography, { fonts } from "@/styles/typography";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("");

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

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      localStorage.theme === "dark";
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme === "light";
      setTheme("light");
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Improve.me</title>
      </Head>
      <div
        className={`${fonts.raleWay.className} flex flex-col bg-[#53d3f728] text-black dark:bg-[#061418] dark:text-white`}
      >
        {theme && <main>{children}</main>}
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
