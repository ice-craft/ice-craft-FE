import React from "react";
import Nav from "./Nav";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <h1>
        <Link href="/">LOGO</Link>
      </h1>
      <Nav />
    </header>
  );
};

export default Header;
