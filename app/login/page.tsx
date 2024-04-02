"use client";

import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkUserLogIn, logIn } from "../_utils/supabase/authAPI";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstErrorMessage, setFirstErrorMessage] = useState("");
  const [secondErrorMessage, setSecondErrorMessage] = useState("");
  const router = useRouter();

  const logInHandler = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    try {
      await logIn(email, password);
    } catch (error) {
      console.log(error); //NOTE - 테스트 코드
      setFirstErrorMessage("이메일또는 비밀번호를 잘못 입력했습니다.");
      setSecondErrorMessage("입력하신 내용을 다시 확인해주세요.");
    }
    console.log("로그인 성공"); //NOTE - 테스트 코드

    router.push("/"); //NOTE - 메인 페이지로 이동
  };
  const registerHandler = async (e: MouseEvent<HTMLParagraphElement, globalThis.MouseEvent>) => {
    e.preventDefault();
  };

  const emailFocusHandler = () => {
    setFirstErrorMessage("");
    setSecondErrorMessage("");
  };

  const passwordFocusHandler = () => {
    setFirstErrorMessage("");
    setSecondErrorMessage("");
  };

  useEffect(() => {
    const checkUser = async () => {
      const isUserLogIn = await checkUserLogIn();
      if (isUserLogIn) {
        router.push("/"); //TODO - 이 방식은 로그인 페이지가 살짝 보임, URL 접근을 막는 방식 생각하기(ui상 로그인 버튼은 안 보여서 접근 불가능)
      }
    };
    checkUser();
  });

  return (
    <form className="flex flex-col justify-center flex-1 w-2/3 gap-2 p-4 m-4">
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        className="px-4 py-2 mb-6 border rounded-md bg-inherit"
        name="email"
        placeholder="이메일을 입력하세요."
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        onFocus={emailFocusHandler}
        required
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        className="px-4 py-2 mb-6 border rounded-md bg-inherit"
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요."
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onFocus={passwordFocusHandler}
        required
      />
      <button onClick={(e) => logInHandler(e)} className="px-4 py-2 mb-2 bg-green-700 rounded-md text-foreground">
        로그인
      </button>
      <div>
        <input type="checkbox" id="saveEmail" />
        <label htmlFor="saveEmail"> 이메일 저장</label>
      </div>
      <div>
        <p className="text-red-500 ">{firstErrorMessage}</p>
        <p className="text-red-500 ">{secondErrorMessage}</p>
      </div>
      <p className="cursor-pointer" onClick={(e) => registerHandler(e)}>
        회원가입
      </p>

      <div>
        <p className="cursor-pointer">카카오톡으로 로그인</p>
        <p className="cursor-pointer">구글로 로그인</p>
        <p className="cursor-pointer">깃헙으로 로그인</p>
        <p className="cursor-pointer">페이스북으로 로그인</p>
      </div>
    </form>
  );
};
export default LogIn;
