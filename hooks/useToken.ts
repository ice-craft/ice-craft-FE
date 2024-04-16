import { getUserInfo } from "@/utils/supabase/authAPI";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getToken } from "../api/liveKitApi";

export const useGetToken = (room: string) => {
  const [userInfo, setUserInfo] = useState<User | null>();

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
    };
    getUser();
  }, []);

  return useQuery({
    queryKey: [`room`, userInfo],
    queryFn: () => getToken({ room, userInfo })
  });
};
