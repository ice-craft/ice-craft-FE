import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getRoomsWithKeyword = async (keyword: string) => {
  const { data, error } = await supabase
    .from("room_table")
    .select("*, users:room_user_match_table(user_id)")
    .like("title", `%${keyword}%`)
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error("키워드로 방 찾기에 실패했습니다.");
  }
  return data;
};
