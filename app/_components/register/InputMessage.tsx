import React from "react";

export const InputMessage = ({ text }: { text: string }) => {
  let textColor = "text-red-500";

  switch (text) {
    case "사용 가능한 이메일입니다.":
    case "사용 가능한 닉네임입니다.":
      textColor = "text-blue-500";
      break;
  }

  return <p className={textColor}>{text}</p>;
};
