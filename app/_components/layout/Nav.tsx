import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/ranking">랭킹</Link>
        </li>
        <li>
          <Link href="/register">회원가입</Link>
        </li>
        <li>
          <Link href="/login">로그인</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
