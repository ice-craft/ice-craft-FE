import { Provider } from "@supabase/supabase-js";
import { createClient } from "./client";

const supabase = createClient();

//삭제예정코드(임시)
export const checkUserLogIn = async () => {
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    return data.user;
  } else {
    return null;
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

//NOTE - 배포 시 각 사이트에서 배포 사이트 작성할 것 (구글은 테스트버전에서 배포버전으로 변경할 것)
export const oAuthLogIn = async (provider: Provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: "http://localhost:3000/loading?status=sns-login" //FIXME - 회원가입인 겨우와 로그인인 경우 구별
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
    throw new Error(error.message);
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

export const getUserNickname = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user?.user_metadata.nickname;
};

export const getUserUid = async () => {
  const { data } = await supabase.auth.getUser();

  return data.user?.id;
};

export const getUserEmail = async () => {
  const { data } = await supabase.auth.getUser();

  return data.user?.email;
};
