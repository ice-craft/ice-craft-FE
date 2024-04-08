"use client";
import { useState, useEffect, FunctionComponent } from "react";
import S from "@/style/Intropage/intro.module.css";
import { designer } from "@/public/fonts/fonts";

const TextTyping: FunctionComponent<{}> = () => {
  const typingName = "INTO STUNNING SPACE";
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < typingName.length) {
      const interval = setInterval(() => {
        setText((prevText) => prevText + typingName[count]); // 이전 set한 문자 + 다음 문자
        setCount((prevCount) => prevCount + 1); // 개수 만큼 체크
      }, 100);

      return () => clearInterval(interval);
    }
  }, [count, typingName]);

  return <h1 className={`${S.h1} ${designer.className}`}>{text}</h1>;
};

export default TextTyping;
