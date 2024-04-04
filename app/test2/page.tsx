"use client";

import React, { useEffect } from "react";
import { getRooms, getRoomsWithKeyword } from "../_utils/supabase/roomAPI";

const Test2 = () => {
  useEffect(() => {
    const test = async () => {
      try {
        const result = await getRoomsWithKeyword("m1");
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
