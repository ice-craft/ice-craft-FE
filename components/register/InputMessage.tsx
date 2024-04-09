import React from "react";
import S from "@/style/register/register.module.css";

export const InputMessage = ({ text }: { text: string }) => {
  let color = "error";

  switch (text) {
    case "사용 가능한 이메일입니다.":
    case "사용 가능한 닉네임입니다.":
      color = "success";
      break;
  }

  return <p className={S[color]}>{text}</p>;
};
