import React from "react";
import Footer from "../LandingPage/Footer/Footer";
import Nav from "../Nav/Nav";

export default function MainLayout({
  children,
  withPadding,
}: {
  children: React.ReactNode;
  withPadding: boolean;
}) {
  const padding = withPadding ? 1.5 : 0;

  return (
    <section className="flex h-full min-h-screen flex-col pt-[var(--nav-height)] ">
      <Nav />
      <div className="flex h-full w-full items-center justify-center py-2 px-4">
        {children}
      </div>
      <Footer />
    </section>
  );
}
