"use client";

import Link from "next/link";
import React, { use } from "react";
import S from "@/style/commons/commons.module.css";
import { logOut } from "@/utils/supabase/authAPI";
import { toast } from "react-toastify";
import { useConnectActions, useNickname, useUserId } from "@/store/connect-store";

const Nav = () => {
  const { setUserId, setUserNickname } = useConnectActions();
  const nickname = useNickname();
  const userId = useUserId();

  console.log(nickname, userId);
  const logoutHandler = async () => {
    try {
      await logOut();
      setUserId("");
      setUserNickname("");
      sessionStorage.clear();
      toast("로그아웃이 완료되었습니다.");
    } catch (error) {
      toast.error("로그아웃이 실패했습니다.");
    }
  };

  return (
    <nav>
      <ul className={S.ul}>
        <li>
          <Link href="/ranking">랭킹</Link>
        </li>
        {userId ? (
          <>
            <li>{userId}님 환영합니다.</li>
            <li>
              <button onClick={logoutHandler}>로그아웃</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/register">회원가입</Link>
            </li>
            <li>
              <Link href="/login">로그인</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
