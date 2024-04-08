import React from "react";
import S from "@/style/register/register.module.css";

export const InputMessage = ({ text }: { text: string }) => {
  let error = "#e72424";

  switch (text) {
    case "사용 가능한 이메일입니다.":
    case "사용 가능한 닉네임입니다.":
      error = "#5c5bad";
      break;
  }

  return <p className={S.error}>{text}</p>;
};
