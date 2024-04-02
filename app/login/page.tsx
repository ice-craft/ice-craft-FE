"use client";

import { MouseEvent, useEffect, useState } from "react";
import { createClient } from "../_utils/supabase/client";
import { useRouter } from "next/navigation";
import { checkUserLogin, logIn } from "../_utils/supabase/authAPI";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const logInHandler = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    try {
      await logIn(email, password);
    } catch (error) {
      console.log("로그인 에러", error);
    }
    console.log("로그인 성공"); //NOTE - 테스트 코드
    router.push("/"); //NOTE - 이동할 페이지
  };
  const registerHandler = async (e: MouseEvent<HTMLParagraphElement, globalThis.MouseEvent>) => {
    e.preventDefault();
  };

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
        required
      />
      <button onClick={(e) => logInHandler(e)} className="px-4 py-2 mb-2 bg-green-700 rounded-md text-foreground">
        로그인
      </button>
      <div>
        <input type="checkbox" name="saveEmail" />
        <label htmlFor="scales"> 이메일 저장</label>
      </div>
      <div>
        <p>비밀번호 찾기</p>
        <p onClick={(e) => registerHandler(e)}>회원가입</p>
      </div>
      <div>
        <p>카카오톡으로 로그인</p>
        <p>구글로 로그인</p>
        <p>깃헙으로 로그인</p>
        <p>페이스북으로 로그인</p>
      </div>
    </form>
  );
};
export default LogIn;
