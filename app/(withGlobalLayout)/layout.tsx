import React from "react";
import Header from "../_components/layout/Header";
import Footer from "../_components/layout/Footer";

const WithGlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default WithGlobalLayout;
