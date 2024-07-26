"use client";

import { useConnectActions, useNickname, useUserId } from "@/store/connect-store";
import S from "@/style/commons/commons.module.css";
import { checkUserLogIn, logOut } from "@/utils/supabase/authAPI";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Nav = () => {
  const userNickname = useNickname();
  const userId = useUserId();
  const { setUserId, setUserNickname } = useConnectActions();

  //NOTE - 사용자 로그인 여부
  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const userInfo = await checkUserLogIn();
        if (userInfo) {
          setUserId(userInfo.id);
          setUserNickname(userInfo.user_metadata.nickname);
        }
      } catch (error) {
        toast.error("로그인 여부를 확인해 주세요.");
      }
    };
    checkUserInfo();
  }, []);

  const logoutHandler = async () => {
    try {
      await logOut();
      setUserId("");
      setUserNickname("");
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
            <li>{userNickname}님 환영합니다.</li>
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
