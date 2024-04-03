import React from "react";

const Register = () => {
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
          required
        />
        <button>중복확인</button>
        <p className="">이메일 에러</p>
      </div>

      <label className="text-md" htmlFor="nickname">
        닉네임
      </label>
      <div>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="nickname"
          placeholder="닉네임을 입력해주세요."
          required
        />
        <button>중복확인</button>
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
      <label className="text-md" htmlFor="check-password">
        비밀번호 확인
      </label>
      <input
        className="px-4 py-2 mb-6 border rounded-md bg-inherit"
        name="password"
        placeholder="비밀번호를 한번 더입력해주세요."
        required
      />
      <button>회원가입</button>
      <div className="flex flex-col gap-2">
        <p className="text-center">간편 가입하기</p>
        <button>카카오톡으로 회원가입</button>
        <button>구글로 회원가입</button>
        <button>깃헙으로 회원가입</button>
        <button>페이스북으로 회원가입</button>
      </div>
    </form>
  );
};

export default Register;
