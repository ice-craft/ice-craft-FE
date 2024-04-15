import { useQuery } from "@tanstack/react-query";
import { getToken } from "../api/liveKitApi";
import { MafiaRoom } from "../types";

export const useGetToken = ({ room, userId }: MafiaRoom) => {
  return useQuery({
    queryKey: [`room`, userId],
    queryFn: () => getToken({ room, userId })
  });
};
