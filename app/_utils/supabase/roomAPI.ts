import { createClient } from "./client";

const supabase = createClient();

//NOTE - 해당 범위의 방들을  가져옴(인덱스는 0부터 시작, rowStart 인덱스와 rowEnd 인덱스는 포함), 날짜 내림차순
export const getRooms = async (rowStart: number, rowEnd: number) => {
  const { data: room_table, error } = await supabase
    .from("room_table")
    .select("*, users:room_user_match_table(user_id)")
    .range(rowStart, rowEnd)
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return room_table;
};

export const getRoomsWithKeyword = async (keyword: string) => {
  const { data: room_table, error } = await supabase
    .from("room_table")
    .select("*, users:room_user_match_table(user_id)")
    .like("title", `%${keyword}%`)
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return room_table;
};

//NOTE - 방의 총 갯수 반환
export const getRoomsCount = async () => {
  const { count, error } = await supabase.from("room_table").select("*", { count: "exact", head: true });
  if (error) {
    throw new Error(error.message);
  }
  return count;
};

//NOTE - roomId의 방에 입장한 유저들 id 목록
export const getUsersInRoom = async (roomId: string) => {
  const { data: room_user_match_table, error } = await supabase
    .from("room_user_match_table")
    .select("user_id")
    .eq("room_id", roomId);

  if (error) {
    throw new Error(error.message);
  }
  return room_user_match_table;
};
