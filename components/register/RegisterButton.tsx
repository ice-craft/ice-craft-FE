import React from "react";
import S from "@/style/register/register.module.css";

export const RegisterButton = ({ active }: { active: boolean }) => {
  let className;

  if (active) {
    className = "registerButtonActive";
  } else {
    className = "registerButtonInactive";
  }

  return (
    <button className={S[className]} type="submit" disabled={!active}>
      회원가입
    </button>
  );
};
