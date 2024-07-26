import { createClient } from "./client";

const supabase = createClient();

export const getRoomsWithKeyword = async (keyword: string) => {
  const { data, error } = await supabase
    .from("room_table")
    .select("*, users:room_user_match_table(user_id)")
    .like("title", `%${keyword}%`)
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
