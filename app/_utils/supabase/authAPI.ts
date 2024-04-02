import { createClient } from "./client";

const supabase = createClient();

export const checkUserLogIn = async () => {
  const { data: user } = await supabase.auth.getUser();
  if (user.user) {
    return true;
  } else {
    return false;
  }
};

export const emailLogIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const oAuthKakaoLogIn = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao"
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const logOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export const updateNickname = async (nickname: string) => {
  const { data, error } = await supabase.auth.updateUser({
    data: { nickname }
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getUserNickname = async () => {
  const { data: user } = await supabase.auth.getUser();

  return user;
};
