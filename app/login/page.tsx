"use client";

import { useState } from "react";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInHandler = () => {};
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
      <button onClick={logInHandler} className="px-4 py-2 mb-2 bg-green-700 rounded-md text-foreground">
        로그인
      </button>
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
