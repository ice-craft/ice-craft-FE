import { createClient } from "./client";

const supabase = createClient();

export const getRooms = async (rowStart: number, rowEnd: number) => {
  const { data, error } = await supabase
    .from("room_table")
    .select("*, users:room_user_match_table(user_id)")
    .range(rowStart, rowEnd)
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

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

export const createRoom = async (title: string, game_category: string, total_user_count: number) => {
  const { data, error } = await supabase
    .from("room_table")
    .insert([{ title, game_category, current_user_count: 0, total_user_count }])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

export const joinRoom = async (room_id: string, user_id: string, user_nickname: string) => {
  const { total_user_count, current_user_count } = await getUserCountInRoom(room_id);
  const usersInRoom = await getUsersInRoom(room_id);

  if (total_user_count - current_user_count > 0 && usersInRoom.indexOf(user_id) === -1) {
    await changeUserCountInRoom(room_id, 1);
    const { data, error } = await supabase
      .from("room_user_match_table")
      .insert([{ room_id, user_id, user_nickname }])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  throw new Error("방에 입장할 수 없습니다.");
};

export const exitRoom = async (room_id: string, user_id: string) => {
  const { current_user_count } = await getUserCountInRoom(room_id);
  const usersInRoom = await getUsersInRoom(room_id);

  if (current_user_count > 1 && usersInRoom.indexOf(user_id) !== -1) {
    await changeUserCountInRoom(room_id, -1);

    const { data, error } = await supabase
      .from("room_user_match_table")
      .delete()
      .eq("room_id", room_id)
      .eq("user_id", user_id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } else if (current_user_count === 1 && usersInRoom.indexOf(user_id) !== -1) {
    const data = deleteRoom(room_id, user_id);
    return data;
  }
  throw new Error("방에서 나갈 수 없습니다.");
};

export const deleteRoom = async (room_id: string, user_id: string) => {
  const { current_user_count } = await getUserCountInRoom(room_id);
  const usersInRoom = await getUsersInRoom(room_id);

  if (current_user_count === 1 && usersInRoom.indexOf(room_id) !== -1) {
    const { data, error } = await supabase.from("room_table").delete().eq("room_id", room_id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  throw new Error("방을 삭제할 수 없습니다.");
};

export const fastJoinRoom = async (user_id: string, user_nickname: string) => {
  const { data, error } = await supabase
    .from("room_table")
    .select("*")
    .order("total_user_count", { ascending: true })
    .order("current_user_count", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  try {
    const rows = data.filter((row) => row.current_user_count !== row.total_user_count);
    const room_id = rows[0].room_id;
    const result = await joinRoom(room_id, user_id, user_nickname);
    return result;
  } catch (e) {
    throw new Error("빠른 방 입장에 실패했습니다.");
  }
};

export const changeUserCountInRoom = async (room_id: string, change: number) => {
  const { current_user_count } = await getUserCountInRoom(room_id);
  const { data, error } = await supabase
    .from("room_table")
    .update({ current_user_count: current_user_count + change })
    .eq("room_id", room_id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getUserCountInRoom = async (room_id: string) => {
  const { data, error } = await supabase
    .from("room_table")
    .select("current_user_count, total_user_count")
    .eq("room_id", room_id);
  if (error) {
    throw new Error(error.message);
  }
  return { total_user_count: data[0].total_user_count, current_user_count: data[0].current_user_count };
};

export const getRoomsCount = async () => {
  const { count, error } = await supabase.from("room_table").select("*", { count: "exact", head: true });
  if (error) {
    throw new Error(error.message);
  }
  return count;
};

export const getUsersInRoom = async (roomId: string) => {
  const { data, error } = await supabase.from("room_user_match_table").select("user_id").eq("room_id", roomId);

  if (error) {
    throw new Error(error.message);
  }
  return data.map((row) => row.user_id);
};
