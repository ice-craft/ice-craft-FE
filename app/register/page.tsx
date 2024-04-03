"use client";
import React, { useRef, useState } from "react";
import { checkUserEmailRegistered, checkUserNicknameRegistered } from "../_utils/supabase/accountAPI";
import { InputMessage } from "../_components/register/InputMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const isPassed = useRef({
    inputEmail: false,
    email: false,
    inputNickname: false,
    nickname: false,
    password: false,
    checkPassword: false
  });

  const emailChangeHandler = (inputEmail: string) => {
    setEmail(inputEmail);

    if (inputEmail.length === 0) {
      isPassed.current = { ...isPassed.current, inputEmail: false };
      return setEmailMessage("이메일을 입력해주세요.");
    }

    let emailPattern = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    const isEmail = emailPattern.test(inputEmail);

    if (!isEmail) {
      isPassed.current = { ...isPassed.current, inputEmail: false };
      return setEmailMessage("이메일 형식이 아닙니다.");
    }
    isPassed.current = { ...isPassed.current, inputEmail: true };
    setEmailMessage("");
  };

  const checkEmailExistedHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const isEmailRegistered = await checkUserEmailRegistered(email);
    if (isEmailRegistered || !isPassed.current.inputEmail) {
      return setEmailMessage("사용할 수 없는 이메일입니다.");
    }
    isPassed.current = { ...isPassed.current, email: true };
    setEmailMessage("사용 가능한 이메일입니다.");
  };

  const nicknameChangeHandler = (inputNickname: string) => {
    setNickname(inputNickname);

    if (inputNickname.length === 0) {
      isPassed.current = { ...isPassed.current, inputNickname: false };
      return setNicknameMessage("닉네임을 입력해주세요.");
    }

    if (inputNickname.length < 2 || 6 < inputNickname.length) {
      isPassed.current = { ...isPassed.current, inputNickname: false };
      return setNicknameMessage("닉네임의 길이가 올바르지 않습니다.");
    }
    isPassed.current = { ...isPassed.current, inputNickname: true };
    setNicknameMessage("");
  };

  const checkNicknameExistedHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const isNicknameRegistered = await checkUserNicknameRegistered(nickname);
    if (isNicknameRegistered || !isPassed.current.inputNickname) {
      return setNicknameMessage("사용할 수 없는 닉네임입니다.");
    }
    isPassed.current = { ...isPassed.current, nickname: true };
    setNicknameMessage("사용 가능한 닉네임입니다.");
  };
  return (
    <form className="flex flex-col justify-center flex-1 w-2/3 gap-2 p-4 m-4">
      <h1 className="text-center">회원가입</h1>
      <label className="text-md" htmlFor="email">
        이메일
      </label>
      <div>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => emailChangeHandler(e.target.value)}
          required
        />
        <button onClick={(e) => checkEmailExistedHandler(e)} className="bg-slate-300">
          중복확인
        </button>
        {<InputMessage text={emailMessage} />}
      </div>

      <label className="text-md" htmlFor="nickname">
        닉네임
      </label>
      <div>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="nickname"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={(e) => nicknameChangeHandler(e.target.value)}
          required
        />
        <button onClick={(e) => checkNicknameExistedHandler(e)} className="bg-slate-300">
          중복확인
        </button>
        {<InputMessage text={nicknameMessage} />}
      </div>
      <label className="text-md" htmlFor="password">
        비밀번호
      </label>
      <input
        className="px-4 py-2 mb-6 border rounded-md bg-inherit"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        required
      />
      <p className="text-red-500">비밀번호 에러</p>
      <label className="text-md" htmlFor="check-password">
        비밀번호 확인
      </label>
      <input
        className="px-4 py-2 mb-6 border rounded-md bg-inherit"
        name="password"
        placeholder="비밀번호를 한번 더입력해주세요."
        required
      />
      <p className="text-red-500">비밀번호 확인 에러</p>
      <button className="bg-slate-300">회원가입</button>
      <div className="flex flex-col gap-2">
        <p className="text-center">간편 가입하기</p>
        <button className="bg-slate-300">카카오톡으로 회원가입</button>
        <button className="bg-slate-300">구글로 회원가입</button>
        <button className="bg-slate-300">깃헙으로 회원가입</button>
        <button className="bg-slate-300">페이스북으로 회원가입</button>
      </div>
    </form>
  );
};

export default Register;
