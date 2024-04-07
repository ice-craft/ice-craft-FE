import { useCountDown } from "@/app/_hooks/useCountDown";

//FIXME - 추후 Zustand로 관리
const MafiaModal = () => {
  const count = 1;
  const content = "밤이 시작되었습니다.";
  const nickname = "";

  const testTime = 5;
  const timer = useCountDown(testTime);

  const agreeClickHandler = () => {};

  const oppositionClickHandler = () => {};
  return (
    <>
      //NOTE - 아침, 밤, 투표 모달창
      <div className="w-full h-screen bg-black bg-opacity-60 fixed z-1 top-0 left-0 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-white p-5 border border-solid border-gray-300 rounded-lg">
          <div className="w-96 h-96 p-5 block">
            <p className="text-6xl text-black">{count}번째 턴</p>
            <p className="text-6xl text-black"> {content}</p>
            <p className="text-6xl text-black"> {timer}</p>
          </div>
        </div>
      </div>
      //NOTE - 최후의 반론 모달창
      <div className="w-full h-screen bg-black bg-opacity-60 fixed z-1 top-0 left-0 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-white p-5 border border-solid border-gray-300 rounded-lg">
          <div className="w-96 h-96 p-5 block">
            <p className="text-6xl text-black">최후의 반론</p>
            <p className="p-10  text-6xl text-black"> {nickname}</p>
            <p className="text-6xl text-black"> {timer}</p>
          </div>
        </div>
      </div>
      //NOTE - 찬반 투표 모달창
      <div className="w-full h-screen bg-black bg-opacity-60 fixed z-1 top-0 left-0 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-white p-5 border border-solid border-gray-300 rounded-lg">
          <div className="w-96 h-96 p-5 block">
            <p className="text-6xl text-black">찬반 투표</p>
            <p className="text-6xl text-black"> {nickname}님을 최종적으로 지목하시겠습니까?</p>
            <div>
              <button onClick={agreeClickHandler}>찬성</button>
              <button onClick={oppositionClickHandler}>반대</button>
            </div>
            <p className="text-6xl text-black"> {timer}</p>
          </div>
        </div>
      </div>
      //NOTE - 생사 여부 모달창
      <div className="w-full h-screen bg-black bg-opacity-60 fixed z-1 top-0 left-0 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-white p-5 border border-solid border-gray-300 rounded-lg">
          <div className="w-96 h-96 p-5 block">
            <p className="text-6xl text-black"> {nickname}님이 살았습니다.</p>
            <p className="text-6xl text-black"> {timer}</p>
          </div>
        </div>
      </div>
      //NOTE - 승리 모달창
      <div className="w-full h-screen bg-black bg-opacity-60 fixed z-1 top-0 left-0 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-white p-5 border border-solid border-gray-300 rounded-lg">
          <div className="w-96 h-96 p-5 block">
            <p className="text-6xl text-black"> 시민 승리</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MafiaModal;
