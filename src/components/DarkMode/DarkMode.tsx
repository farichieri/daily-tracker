"use client";
import Image from "next/image";
import { useState } from "react";

export default function DarkMode({}) {
  const [theme, setTheme] = useState("");

  const switchTheme = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setTheme("dark");
    }
  };

  return (
    <span
      className="flex cursor-pointer items-center justify-center"
      onClick={(event) => {
        event.preventDefault();
        switchTheme();
      }}
    >
      {theme === "dark" ? (
        <Image alt="dark" src={"/images/dark.png"} width={20} height={20} />
      ) : (
        <Image alt="light" src={"/images/light.png"} width={20} height={20} />
      )}
    </span>
  );
}
