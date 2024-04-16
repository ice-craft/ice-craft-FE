import { getUserInfo } from "@/utils/supabase/authAPI";
import { useQuery } from "@tanstack/react-query";

export const useUserInfo = () => {
  return useQuery({
    queryKey: [`userInfo`],
    queryFn: () => getUserInfo()
  });
};
