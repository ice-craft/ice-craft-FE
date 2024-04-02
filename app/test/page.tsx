"use client";
import React, { useEffect } from "react";
import { getUserInfo, getUserNickname, oAuthKakaoLogIn, updateNickname } from "../_utils/supabase/authAPI";

const Test = () => {
  useEffect(() => {
    const test = async () => {
      const nickname = window.prompt("닉네임을 입력하세요.", "닉네임");
      if (nickname) {
        await updateNickname(nickname);
      }
    };

    test();
  }, []);
  return <div>Test</div>;
};

export default Test;
