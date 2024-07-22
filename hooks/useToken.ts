import { useQuery } from "@tanstack/react-query";
import { getToken } from "../api/liveKitApi";

// export const useGetToken = (room: string, userId: string, nickname: string) => {
//   return useQuery({
//     queryKey: [`room`, room],
//     queryFn: () => getToken(room, userId, nickname),
//     enabled: !!room
//   });
// };
