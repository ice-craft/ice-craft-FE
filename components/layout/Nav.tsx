"use client";

import S from "@/style/commons/commons.module.css";
import { checkUserLogIn, logOut } from "@/utils/supabase/authAPI";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useConnectActions, useNickname, useUserId } from "@/store/connect-store";
import Link from "next/link";

const Nav = () => {
  const userNickname = useNickname();
  const userId = useUserId();
  const { setUserId, setUserNickname } = useConnectActions();
  const [isActive, setIsActive] = useState(false);

  //NOTE - 사용자 로그인 여부
  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const userInfo = await checkUserLogIn();
        if (userInfo) {
          setUserId(userInfo.id);
          const nickname = userInfo.user_metadata.nickname || userInfo.user_metadata.name;
          setUserNickname(nickname);
        }
      } catch (e) {}
    };
    checkUserInfo();
  }, []);

  const logoutHandler = async () => {
    try {
      await logOut();
      setUserId("");
      setUserNickname("");
      location.reload();
      toast("로그아웃이 완료되었습니다.");
    } catch (error) {
      toast.error("로그아웃이 실패했습니다.");
    }
  };

  const isToggleHandler = () => {
    setIsActive((prev) => !prev);
    document.body.classList.toggle(S.active, !isActive);
  };

  return (
    <nav className={S.nav}>
      <div className={`${S.asideButton} ${isActive ? S.active : ""}`} onClick={isToggleHandler}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={S.gnb}>
        <ul className={S.ul}>
          <li>
            <Link href="/ranking" onClick={isToggleHandler}>
              랭킹
            </Link>
          </li>
          {userId ? (
            <>
              <li className={S.nickname}>{userNickname}님 환영합니다.</li>
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
      </div>
    </nav>
  );
};

export default Nav;
