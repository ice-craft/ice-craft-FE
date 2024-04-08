import { createClient } from "./client";

const supabase = createClient();

export const checkUserNicknameRegistered = async (nickname: string) => {
  let { data: account_table, error } = await supabase.from("account_table").select("nickname").eq("nickname", nickname);
  if (error) {
    throw new Error(error.message);
  }

  if (account_table) {
    return account_table.length > 0;
  }

  return false;
};

export const checkUserEmailRegistered = async (email: string) => {
  let { data: account_table, error } = await supabase.from("account_table").select("email").eq("email", email);
  if (error) {
    throw new Error(error.message);
  }

  if (account_table) {
    return account_table.length > 0;
  }

  return false;
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
