import { useQuery } from "@tanstack/react-query";
import { getToken } from "../_api/liveKitApi";
import { MafiaRoom } from "../_types";

export const useGetToken = ({ room, name }: MafiaRoom) => {
  return useQuery({
    queryKey: [`room`, name],
    queryFn: () => getToken({ room, name })
  });
};
