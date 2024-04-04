import { createClient } from "./client";

const supabase = createClient();

//NOTE - 해당 범위의 방들을  반환(인덱스는 0부터 시작, rowStart 인덱스와 rowEnd 인덱스는 포함), 날짜 내림차순
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

//NOTE - 제목에 키워드가 포함된 방 목록 반환
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

//NOTE - 방 만들기 (현재 인원은 방만든 사람 1명, 만든 시간은 현재)
export const createRoom = async (title: string, game_category: string, total_user_count: number, user_id: string) => {
  const { data, error } = await supabase
    .from("room_table")
    .insert([{ title, game_category, current_user_count: 1, total_user_count }])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

//NOTE - 방에 들어가기
export const joinRoom = async (room_id: string, user_id: string) => {
  const userCountAvailable = await getUserCountAvailable(room_id);
  const usersInRoom = await getUsersInRoom(room_id);

  if (userCountAvailable > 0 && usersInRoom.indexOf(user_id) === -1) {
    const { data, error } = await supabase.from("room_user_match_table").insert([{ room_id, user_id }]).select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
  throw new Error("방에 입장할 수 없습니다.");
};

//NOTE - 방에 들어갈 수 있는 유저 수 반환
export const getUserCountAvailable = async (room_id: string) => {
  const { data: room_table, error } = await supabase
    .from("room_table")
    .select("current_user_count, total_user_count")
    .eq("room_id", room_id);
  if (error) {
    throw new Error(error.message);
  }
  return room_table[0].total_user_count - room_table[0].current_user_count;
};

//NOTE - 방의 총 갯수 반환
export const getRoomsCount = async () => {
  const { count, error } = await supabase.from("room_table").select("*", { count: "exact", head: true });
  if (error) {
    throw new Error(error.message);
  }
  return count;
};

//NOTE - roomId의 방에 입장한 유저들 id 목록 반환
export const getUsersInRoom = async (roomId: string) => {
  const { data: room_user_match_table, error } = await supabase
    .from("room_user_match_table")
    .select("user_id")
    .eq("room_id", roomId);

  if (error) {
    throw new Error(error.message);
  }
  return room_user_match_table.map((row) => row.user_id);
};
