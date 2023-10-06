import React from "react";
import Footer from "../LandingPage/Footer/Footer";
import Nav from "../Nav/Nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full min-h-screen flex-col pt-[var(--nav-height)] ">
      <Nav />
      <div className="mx-auto flex h-screen min-h-screen w-full max-w-5xl justify-center px-5 py-10">
        {children}
      </div>
      <Footer />
    </section>
  );
}
