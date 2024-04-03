import { createClient } from "./client";

const supabase = createClient();

export const duplicateCheckUserNickname = async () => {
  let { data, error } = await supabase.from("account_table").select("nickname");
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const registerAccount = async (uid: string, email: string, nickname: string) => {
  const { data, error } = await supabase
    .from("account_table")
    .insert([{ user_id: uid, email, nickname }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
