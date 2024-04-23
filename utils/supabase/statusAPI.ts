import { createClient } from "./client";

const supabase = createClient();

//FIXME - 타입 고쳐야함
export const setStatus = async (user_id: string, status: any) => {
  const { data, error } = await supabase.from("room_user_match_table").update(status).eq("user_id", user_id).select();

  if (error) {
    console.log(error);
    throw new Error();
  }
  return data;
};
