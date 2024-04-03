"use client";
import React, { useEffect } from "react";
import {
  getUserEmail,
  getUserInfo,
  getUserNickname,
  getUserUid,
  logOut,
  updateUserNickname
} from "../_utils/supabase/authAPI";
import { checkUserRegistered, duplicateCheckUserNickname } from "../_utils/supabase/accountAPI";

const Test = () => {
  useEffect(() => {
    const test = async () => {
      const data = await checkUserRegistered("test4@test.com");
      console.log(data);
    };
    test();
  }, []);
  return <div>Test</div>;
};

export default Test;
