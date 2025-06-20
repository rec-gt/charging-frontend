import React from "react";
import { Footer, Header } from "../Header";

type PageLayoutProps = {
  children: React.ReactNode;
};

export const PageLayout: React.FC<PageLayoutProps> = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <div className="px-4 sm:px-16 w-full">{children}</div>
      <Footer />
    </>
  );
};
