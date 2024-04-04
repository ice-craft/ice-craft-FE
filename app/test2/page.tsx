"use client";

import React, { useEffect } from "react";
import {
  createRoom,
  getRooms,
  getRoomsWithKeyword,
  getUserCountAvailable,
  getUsersInRoom
} from "../_utils/supabase/roomAPI";

const Test2 = () => {
  useEffect(() => {
    const test = async () => {
      try {
        const result = await getUsersInRoom("26ee12bc-96c4-4cce-9085-89f9be3f5d19");
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
