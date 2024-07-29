import { Provider } from "@supabase/supabase-js";
import { createClient } from "./client";

const supabase = createClient();

export const checkUserLogIn = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error();
  }

  if (data.user) {
    return data.user;
  }
};

export const checkUserLoginInfo = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error("로그인 확인에 실패했습니다.");
  }

  if (data.user) {
    return data.user;
  }
};

export const checkUserLoginInfo = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (data.user) {
    return data.user;
  }

  if (error) {
    throw new Error("로그인 확인에 실패했습니다.");
  }
};

export const emailLogIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw new Error("일반 로그인에 실패했습니다.");
  }

  return data;
};

export const oAuthRegister = async (email: string, password: string, nickname: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname
      }
    }
  });
  if (error) {
    throw new Error("oAuth 회원가입에 실패했습니다.");
  }

  return true;
};

export const oAuthLogIn = async (provider: Provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: "http://localhost:3000/sns-login"
    }
  });

  if (error) {
    throw new Error("SNS 계정 로그인에 실패했습니다.");
  }

  return data;
};

export const logOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error("로그아웃에 실패했습니다.");
  }
};

export const setUserNickname = async (nickname: string) => {
  const { data, error } = await supabase.auth.updateUser({
    data: { nickname }
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getUserInfo = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error("유저 정보 가져오기에 실패했습니다.");
  }

  return data.user;
};
