import { getRooms } from "@/utils/supabase/roomAPI";
import { useQuery } from "@tanstack/react-query";

export const useGetRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const data = await getRooms(0, 20);
      return data;
    }
  });
};
