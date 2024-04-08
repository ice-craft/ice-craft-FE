"use client";
import { useState, useEffect, FunctionComponent } from "react";
import S from "@/style/introPage/intro.module.css";

const TextTyping: FunctionComponent = () => {
  const typingName = "INTO STUNNING SPACE";
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prevText) => prevText + typingName[count]); // 이전 set한 문자 + 다음 문자
      setCount((prevCount) => prevCount + 1); // 개수 만큼 체크
    }, 100);

    if (count === typingName.length) {
      clearInterval(interval); // 문자열 체크로 setInterval을 해제
    }

    return () => clearInterval(interval);
  }, [count, typingName]);

  return <h1 className={S.tegName}>{text}</h1>;
};

export default TextTyping;
