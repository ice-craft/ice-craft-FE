import { createClient } from "./client";

const supabase = createClient();

export const getUsersRanking = async () => {
  const { data, error } = await supabase.from("account_table").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
