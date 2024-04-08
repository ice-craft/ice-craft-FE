import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

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
