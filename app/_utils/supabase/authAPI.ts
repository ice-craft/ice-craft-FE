import { createClient } from "./client";

const supabase = createClient();

export const checkUserLogin = async () => {
  const { data: user } = await supabase.auth.getUser();
  if (user) {
    return true;
  } else {
    return false;
  }
};

export const logIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  return data;
};
