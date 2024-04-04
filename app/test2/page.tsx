"use client";

import React, { useEffect } from "react";
import { createRoom, getRooms, getRoomsWithKeyword } from "../_utils/supabase/roomAPI";

const Test2 = () => {
  useEffect(() => {
    const test = async () => {
      try {
        const result = await createRoom("마피아 게임 좋아요", "마피아 게임", 10);
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    };
    test();
  }, []);
  return <div>Test2</div>;
};

export default Test2;
