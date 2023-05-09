import React from "react";
import { Footer, Header } from "..";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
