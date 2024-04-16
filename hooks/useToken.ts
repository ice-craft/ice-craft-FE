import { useQuery } from "@tanstack/react-query";
import { getToken } from "../api/liveKitApi";

export const useGetToken = (room: string) => {
  return useQuery({
    queryKey: [`room`, room],
    queryFn: () => getToken(room)
  });
};
