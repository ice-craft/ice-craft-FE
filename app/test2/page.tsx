"use client";

import React, { useEffect } from "react";
import { fastJoinRoom } from "../_utils/supabase/roomAPI";

const Test2 = () => {
  useEffect(() => {
    const test = async () => {
      try {
        const data = await fastJoinRoom("91ebbc96-766c-4868-b24f-a9ed9a9f4995");
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    test();
  }, []);
  return <div>Test2</div>;
};

export default Test2;
