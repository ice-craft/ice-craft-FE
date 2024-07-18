import { createClient } from "./client";

const supabase = createClient();

export const checkUserEmailRegistered = async (email: string) => {
  let { data, error } = await supabase.from("account_table").select("email").eq("email", email);
  if (error) {
    throw new Error("이메일 중복 검사에 실패했습니다.");
  }

  if (data) {
    return data.length > 0;
  }

  return false;
};

export const registerAccount = async (email: string, nickname: string) => {
  const { error } = await supabase.from("account_table").insert([{ email, nickname }]).select();

  if (error) {
    throw new Error("일반 회원가입에 실패했습니다.");
  }
};
