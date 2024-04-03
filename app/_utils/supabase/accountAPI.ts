import { createClient } from "./client";

const supabase = createClient();

export const duplicateCheckUserNickname = async () => {
  let { data, error } = await supabase.from("account_table").select("nickname");
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const registerAccount = async () => {
  const { data, error } = await supabase
    .from("account_table")
    .insert([{ some_column: "someValue", other_column: "otherValue" }])
    .select();
};
