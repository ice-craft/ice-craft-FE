import { useQuery } from "@tanstack/react-query";
import { getToken } from "../api/liveKitApi";
import { MafiaRoom } from "../types";

export const useGetToken = ({ room, name }: MafiaRoom) => {
  return useQuery({
    queryKey: [`room`, name],
    queryFn: () => getToken({ room, name })
  });
};
