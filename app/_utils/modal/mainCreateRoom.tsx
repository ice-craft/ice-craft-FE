import React from "react";

const mainCreateRoom = () => {
  return (
    <div className="mainCreateRoom">
      <div className="mainCreateRoom-content">
        <h2>게임을 선택해주세요</h2>
        <br />
        <p>게임 고르기</p>
        <br />
        <button>마피아</button>
        <button>노래 맞추기</button>
        <br />
        <p>방제목</p>
        <br />
        <input>방제목을 입력하세요</input>
        <br />
        <p>인원수</p>
        <br />
        {/* 인원수 선택 드랍다운 */}
        <button>인원수를 선택하세요</button>
        <br />
        <button>닫기</button>
        <button>확인</button>
      </div>
    </div>
  );
};

export default mainCreateRoom;
