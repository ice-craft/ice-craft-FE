"use client";
import React, { useRef, useState } from "react";
import { checkUserEmailRegistered, checkUserNicknameRegistered, registerAccount } from "../_utils/supabase/accountAPI";
import { InputMessage } from "../_components/register/InputMessage";
import { oAuthLogIn, oAuthRegister } from "../_utils/supabase/authAPI";

const Register = () => {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [checkPasswordMessage, setCheckPasswordMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  const isPassed = useRef({
    inputEmail: false,
    email: false,
    inputNickname: false,
    nickname: false,
    inputPassword: false,
    password: false,
    inputCheckPassword: false,
    checkPassword: false
  });

  const emailChangeHandler = (inputEmail: string) => {
    setEmail(inputEmail);
    isPassed.current = { ...isPassed.current, email: false };

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
      return setEmailMessage("이미 존재하는 이메일입니다.");
    }
    isPassed.current = { ...isPassed.current, email: true };
    setEmailMessage("사용 가능한 이메일입니다.");
  };

  const nicknameChangeHandler = (inputNickname: string) => {
    setNickname(inputNickname);
    isPassed.current = { ...isPassed.current, nickname: false };

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
      return setNicknameMessage("이미 존재하는 닉네임입니다.");
    }
    isPassed.current = { ...isPassed.current, nickname: true };
    setNicknameMessage("사용 가능한 닉네임입니다.");
  };

  const passwordChangeHandler = (inputPassword: string) => {
    setPassword(inputPassword);
    isPassed.current = { ...isPassed.current, password: false };

    if (inputPassword.length === 0) {
      isPassed.current = { ...isPassed.current, inputPassword: false };
      return setPasswordMessage("비밀번호을 입력해주세요.");
    }

    if (inputPassword.length < 6 || 12 < inputPassword.length) {
      isPassed.current = { ...isPassed.current, inputPassword: false };
      return setPasswordMessage("비밀번호의 길이가 올바르지 않습니다.");
    }

    let passwordPattern = new RegExp(/(?=.*[a-z])(?=.*[A-Z])/);
    const isContained = passwordPattern.test(inputPassword);

    if (!isContained) {
      isPassed.current = { ...isPassed.current, inputPassword: false };
      return setPasswordMessage("비밀번호에 대문자와 소문자가 포함되어있지 않습니다.");
    }

    isPassed.current = { ...isPassed.current, inputPassword: true };
    isPassed.current = { ...isPassed.current, password: true };
    setPasswordMessage("");
  };

  const checkPasswordChangeHandler = (inputCheckPassword: string) => {
    setCheckPassword(inputCheckPassword);
    isPassed.current = { ...isPassed.current, checkPassword: false };

    if (inputCheckPassword.length === 0) {
      isPassed.current = { ...isPassed.current, inputPassword: false };
      return setCheckPasswordMessage("비밀번호 확인을 입력해주세요.");
    }

    if (inputCheckPassword !== password) {
      isPassed.current = { ...isPassed.current, inputCheckPassword: false };
      return setCheckPasswordMessage("비밀번호와 비밀번호 확인이 다릅니다.");
    }

    isPassed.current = { ...isPassed.current, inputCheckPassword: true };
    isPassed.current = { ...isPassed.current, checkPassword: true };
    setCheckPasswordMessage("");
  };

  const register = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const isEmailPassed = isPassed.current.email;
    const isNicknamePassed = isPassed.current.nickname;
    const isPasswordPassed = isPassed.current.password;
    const isCheckPasswordPassed = isPassed.current.checkPassword;

    if (!isEmailPassed || !isNicknamePassed || !isPasswordPassed || !isCheckPasswordPassed) {
      return setRegisterMessage("모든 항목을 올바르게 작성하고 중복확인을 해주세요.");
    }

    setRegisterMessage("");

    try {
      const uid = await oAuthRegister(email, password, nickname);
      if (uid) {
        await registerAccount(uid, email, nickname);
      } else {
        throw new Error("회원 가입 실패");
      }
    } catch (e) {
      console.log(e); //NOTE - 테스트 코드
      setRegisterMessage("회원가입에 실패했습니다.");
    }
  };

  const kakaoLogIn = async () => {
    try {
      await oAuthLogIn("kakao");
    } catch (error) {
      return;
    }
  };

  const googleLogIn = async () => {
    try {
      await oAuthLogIn("google");
    } catch (error) {
      return;
    }
  };

  const githubLogIn = async () => {
    try {
      await oAuthLogIn("github");
    } catch (error) {
      return;
    }
  };

  const facebookLogIn = async () => {
    try {
      await oAuthLogIn("facebook");
    } catch (error) {
      return;
    }
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
          type="text"
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
          type="text"
          name="nickname"
          maxLength={6}
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
        type="password"
        name="password"
        maxLength={12}
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => passwordChangeHandler(e.target.value)}
        required
      />
      <InputMessage text={passwordMessage} />
      <label className="text-md" htmlFor="check-password">
        비밀번호 확인
      </label>
      <input
        className="px-4 py-2 mb-6 border rounded-md bg-inherit"
        type="password"
        name="password"
        placeholder="비밀번호를 한번 더입력해주세요."
        value={checkPassword}
        onChange={(e) => checkPasswordChangeHandler(e.target.value)}
        required
      />
      {<InputMessage text={checkPasswordMessage} />}
      <button onClick={(e) => register(e)} type="submit" className="bg-slate-300">
        회원가입
      </button>
      {<InputMessage text={registerMessage} />}
      <div className="flex flex-col gap-2">
        <p className="text-center">간편 가입하기</p>
        <button onClick={kakaoLogIn} className="bg-slate-300">
          카카오톡으로 회원가입
        </button>
        <button onClick={googleLogIn} className="bg-slate-300">
          구글로 회원가입
        </button>
        <button onClick={githubLogIn} className="bg-slate-300">
          깃헙으로 회원가입
        </button>
        <button onClick={facebookLogIn} className="bg-slate-300">
          페이스북으로 회원가입
        </button>
      </div>
    </form>
  );
};

export default Register;
