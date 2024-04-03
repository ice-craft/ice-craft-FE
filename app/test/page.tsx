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
import { duplicateCheckUserNickname } from "../_utils/supabase/accountAPI";

const Test = () => {
  useEffect(() => {
    const test = async () => {
      const data = await duplicateCheckUserNickname();
      console.log(data);
    };

    test();
  }, []);
  return <div>Test</div>;
};

export default Test;
