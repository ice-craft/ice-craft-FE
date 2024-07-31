import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getUsersRanking = async () => {
  const { data, error } = await supabase.from("account_table").select("*").order("total_score", { ascending: false });

  if (error) {
    throw new Error("유저들의 랭킹 정보를 불러오는데 실패했습니다.");
  }

  return data;
};

export const getRankingScore = async (user_id: string) => {
  const { data, error } = await supabase
    .from("account_table")
    .select("mafia_score,music_score,total_score")
    .eq("user_id", user_id)
    .single();

  if (error) {
    throw new Error("랭킹 점수를 조회하는데 실패했습니다.");
  }

  return data;
};

export const setRankingScore = async (
  user_id: string,
  mafia_score: number,
  music_score: number,
  total_score: number
) => {
  const { error } = await supabase
    .from("account_table")
    .update({ mafia_score, music_score, total_score })
    .eq("user_id", user_id);

  if (error) {
    throw new Error("랭킹 점수를 수정하는데 실패했습니다.");
  }
};
