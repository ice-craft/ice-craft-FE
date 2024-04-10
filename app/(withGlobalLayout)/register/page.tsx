"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  checkUserEmailRegistered,
  checkUserNicknameRegistered,
  registerAccount
} from "../../../utils/supabase/accountAPI";
import { InputMessage } from "../../../components/register/InputMessage";
import { oAuthLogIn, oAuthRegister } from "../../../utils/supabase/authAPI";
import KakaoLoginIcon from "@/app/assets/images/join_kakaotalk.svg";
import GoogleLoginIcon from "@/app/assets/images/join_google.svg";
import GithubLoginIcon from "@/app/assets/images/join_github.svg";
import FacebookLoginIcon from "@/app/assets/images/join_facebook.svg";
import Logo from "@/app/assets/images/logo.svg";
import Image from "next/image";
import S from "@/style/register/register.module.css";
import Link from "next/link";
import { RegisterButton } from "@/components/register/RegisterButton";

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
    password: false,
    checkPassword: false
  });

  const [canRegister, setCanRegister] = useState(false);

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
      isPassed.current = { ...isPassed.current, password: false };
      return setPasswordMessage("비밀번호을 입력해주세요.");
    }

    if (inputPassword.length < 6 || 12 < inputPassword.length) {
      isPassed.current = { ...isPassed.current, password: false };
      return setPasswordMessage("비밀번호의 길이가 올바르지 않습니다.");
    }

    let passwordPattern = new RegExp(/(?=.*[a-z])(?=.*[A-Z])/);
    const isContained = passwordPattern.test(inputPassword);

    if (!isContained) {
      isPassed.current = { ...isPassed.current, password: false };
      return setPasswordMessage("비밀번호에 대문자와 소문자가 포함되어 있지 않습니다.");
    }

    isPassed.current = { ...isPassed.current, password: true };
    setPasswordMessage("");
  };

  const checkPasswordChangeHandler = (inputCheckPassword: string) => {
    setCheckPassword(inputCheckPassword);
    isPassed.current = { ...isPassed.current, checkPassword: false };

    if (inputCheckPassword.length === 0) {
      isPassed.current = { ...isPassed.current, checkPassword: false };
      return setCheckPasswordMessage("비밀번호 확인을 입력해주세요.");
    }

    if (inputCheckPassword !== password) {
      isPassed.current = { ...isPassed.current, checkPassword: false };
      return setCheckPasswordMessage("비밀번호와 비밀번호 확인이 다릅니다.");
    }

    isPassed.current = { ...isPassed.current, checkPassword: true };
    setCheckPasswordMessage("");
  };

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailPassed = isPassed.current.email;
    const isNicknamePassed = isPassed.current.nickname;
    const isPasswordPassed = isPassed.current.password;
    const isCheckPasswordPassed = isPassed.current.checkPassword;

    setCanRegister(isEmailPassed && isNicknamePassed && isPasswordPassed && isCheckPasswordPassed);

    if (!canRegister) {
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

  useEffect(() => {
    const isEmailPassed = isPassed.current.email;
    const isNicknamePassed = isPassed.current.nickname;
    const isPasswordPassed = isPassed.current.password;
    const isCheckPasswordPassed = isPassed.current.checkPassword;

    setCanRegister(isEmailPassed && isNicknamePassed && isPasswordPassed && isCheckPasswordPassed);
    console.log(canRegister); //NOTE - 테스트 코드, 출력 안됨, 렌더링이 꼬여서 그럼, 리액트 폼 훅으로 리펙토링해야 함
  }, [isPassed.current]);

  return (
    <div className={S.wrapper}>
      <header>
        <Link href="/">
          <Image src={Logo} alt="logo" />
        </Link>
      </header>
      <main className={S.mainWrapper}>
        <form onSubmit={(e) => register(e)}>
          <h2>회원가입</h2>
          <div className={S.userForm}>
            <div className={S.userEmail}>
              <label htmlFor="email">이메일</label>
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="이메일을 입력해주세요."
                  value={email}
                  onChange={(e) => emailChangeHandler(e.target.value)}
                  required
                />
                <button onClick={(e) => checkEmailExistedHandler(e)}>중복확인</button>
              </div>
              {<InputMessage text={emailMessage} />}
            </div>
            <div className={S.userNickname}>
              <label htmlFor="nickname">닉네임</label>
              <div>
                <input
                  type="text"
                  name="nickname"
                  maxLength={6}
                  placeholder="닉네임을 입력해주세요."
                  value={nickname}
                  onChange={(e) => nicknameChangeHandler(e.target.value)}
                  required
                />
                <button type="button" onClick={(e) => checkNicknameExistedHandler(e)}>
                  중복확인
                </button>
              </div>
              {<InputMessage text={nicknameMessage} />}
            </div>
            <div>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                name="password"
                maxLength={12}
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => passwordChangeHandler(e.target.value)}
                required
              />
              <InputMessage text={passwordMessage} />
            </div>
            <div>
              <label htmlFor="check-password">비밀번호 확인</label>
              <input
                type="password"
                name="password"
                placeholder="비밀번호를 한번 더입력해주세요."
                value={checkPassword}
                onChange={(e) => checkPasswordChangeHandler(e.target.value)}
                required
              />
              {<InputMessage text={checkPasswordMessage} />}
            </div>
          </div>
          <div>
            {/* <button className={S.registerButton} type="submit">
              회원가입
            </button> */}
            <RegisterButton active={canRegister} />
            {<InputMessage text={registerMessage} />}
          </div>
          <div className={S.simpleLogin}>
            <h3>간편 가입하기</h3>
            <ul>
              <li>
                <button type="button" onClick={kakaoLogIn}>
                  <Image src={KakaoLoginIcon} alt="카카오톡 로그인" />
                </button>
              </li>
              <li>
                <button type="button" onClick={googleLogIn}>
                  <Image src={GoogleLoginIcon} alt="구글 로그인" />
                </button>
              </li>
              <li>
                <button type="button" onClick={githubLogIn}>
                  <Image src={GithubLoginIcon} alt="깃허브 로그인" />
                </button>
              </li>
              <li>
                <button type="button" onClick={facebookLogIn}>
                  <Image src={FacebookLoginIcon} alt="페이스북 로그인" />
                </button>
              </li>
            </ul>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Register;
