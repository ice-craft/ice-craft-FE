"use client";
import React, { useEffect } from "react";
import { getUserInfo, getUserNickname, updateUserNickname } from "../_utils/supabase/authAPI";

const Test = () => {
  useEffect(() => {
    const test = async () => {
      const nickname = window.prompt("닉네임을 입력하세요.", "닉네임");
      if (nickname) {
        await updateUserNickname(nickname);
        console.log("닉네임", await getUserNickname());
        console.log("유저", await getUserInfo());
      }
    };

    test();
  }, []);
  return <div>Test</div>;
};

export default Test;
