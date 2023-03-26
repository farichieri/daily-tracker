import React, { useEffect } from "react";
import Footer from "../LandingPage/Footer/Footer";
import Nav from "../Nav/Nav";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme, setTheme } from "store/slices/themeSlice";
import { selectIsLoading } from "store/slices/layoutSlice";
import Loader from "./Loader/Loader";
import { selectUser } from "store/slices/authSlice";
import { useRouter } from "next/router";

export default function MainLayout({
  children,
  withPadding,
}: {
  children: React.ReactNode;
  withPadding: boolean;
}) {
  const padding = withPadding ? 1.5 : 0;
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const router = useRouter();

  const theme = useSelector(selectTheme);

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <section>
      <Nav />
      <div className="container">{children}</div>
      <Footer />
      <style jsx>
        {`
          section {
            align-items: center;
            display: flex;
            flex-direction: column;
            height: 100%;
            margin: auto;
            min-height: calc(100vh);
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
