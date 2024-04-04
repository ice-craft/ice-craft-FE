"use client";

import React, { useEffect } from "react";
import {
  createRoom,
  exitRoom,
  getRooms,
  getRoomsWithKeyword,
  getUsersInRoom,
  joinRoom
} from "../_utils/supabase/roomAPI";

const Test2 = () => {
  useEffect(() => {
    const test = async () => {
      try {
        const data = await exitRoom("ccbb58f7-a6f2-4a90-a3a5-74119847056a", "fcdb1cd9-2dec-4f19-9399-b4e28e777428");
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
