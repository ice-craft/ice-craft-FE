"use client";

import { MouseEvent, useState } from "react";
import { createClient } from "../_utils/supabase/client";
import { useRouter } from "next/navigation";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const logInHandler = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return console.log(error); //NOTE - 테스트 코드
    }
    console.log("로그인 성공"); //NOTE - 테스트 코드
    console.log(data); //NOTE - 테스트 코드
    //router.push("/mypage"); //NOTE - 이동할 페이지
  };
  const registerHandler = () => {};

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
        <p>회원가입</p>
      </div>
      <div>
        <p>카카오톡으로 로그인</p>
        <p>구글로 로그인</p>
        <p>깃헙으로 로그인</p>
        <p>페이스북으로 로그인</p>
      </div>

      <button
        onClick={registerHandler}
        className="px-4 py-2 mb-2 border rounded-md border-foreground/20 text-foreground"
      >
        회원가입
      </button>
    </form>
  );
};
export default LogIn;
