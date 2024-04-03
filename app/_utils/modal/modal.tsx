import React from "react";

// 공용 모달창
const Modal = () => {
  return (
    <div className="w-full h-screen bg-black bg-opacity-60 fixed z-1 top-0 left-0 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-white p-5 border border-solid border-gray-300 rounded-lg">
        <div className="w-96 h-96 block">
          <p className="text-6xl text-black"> 테스트를 입력해주세요</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
