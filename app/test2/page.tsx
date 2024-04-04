"use client";

import React, { useEffect } from "react";
import { fastJoinRoom } from "../_utils/supabase/roomAPI";

const Test2 = () => {
  useEffect(() => {
    const test = async () => {
      try {
        const data = await fastJoinRoom("82e28071-e88b-4c91-ab58-718691c6f494");
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    // test();
  }, []);
  return <div>Test2</div>;
};

export default Test2;
