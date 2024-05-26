import React, { useEffect, useState } from "react";
import S from "@/style/modal/modal.module.css";
import { useCountDown } from "@/hooks/useCountDown";
import { socket } from "@/utils/socket/socket";
import useConnectStore from "@/store/connect-store";
import { VoteData } from "@/types";
import useSocketOn from "@/hooks/useSocketOn";
import useSocketOff from "@/hooks/useSocketOff";

const CheckModal = () => {
  // const { timer } = useShowModalStore();
  // const initialSecond = timer;
  const initialSecond = 5;

  // 한가지의 기능만 하는 socket일 경우에는 커스텀 훅을 만들지 않고 해당 component에서 생성하기
  const sockets = [
    {
      eventName: "showLastVote",
      handler: (userIdList: any, isCamera: any, isMike: any) => {
        //처리 로직
      }
    },

    {
      eventName: "r0TurnAllUserCameraMikeOff",
      handler: () => {
        // r0TurnAllUserCameraMikeOffHandler(tracks, userId);
      }
    }
    // 추가 소켓 리스트
  ];

  const count = useCountDown(initialSecond, 10, 100);
  const { userId } = useConnectStore();
  //NOTE - 찬반 투표 대상이 되는 다른 사용자의 ID와 닉네임을 저장하는 state
  const [chooseUser, setChooseUser] = useState<{ id: string; nickname: string } | null>(null);

  useEffect(() => {
    //NOTE - voteYesOrNo 이벤트 핸들러 함수(익명함수로 하면 같은 함수를 참조하지 않기 때문에 리스너가 제대로 제거되지 않을 수 있음)
    const voteHandler = (data: VoteData) => {
      if (data.userId === userId) {
        setChooseUser({ id: data.userId, nickname: data.nickname });
      }
    };
    socket.on("voteYesOrNo", voteHandler);
    return () => {
      socket.off("voteYesOrNo", voteHandler);
    };
  }, [userId]);

  //NOTE - 투표 결과를 서버에게 보내는 함수
  const chooseVoteHandler = (vote: boolean) => {
    if (chooseUser) {
      ///NOTE - 서버에게 투표 결과를 보냄, null이 아닐때 실행함
      socket.emit("voteYesOrNo", { userId: chooseUser.id, vote });
    } else {
      console.log("투표할 사용자가 선택되지 않았습니다.");
    }
  };

  if (!chooseUser) {
    return null;
  }

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>찬반 투표</h1>
            <div className={S.userCheckNickName}>
              <p>
                <span>{chooseUser.nickname}</span> 님을
                <br /> 최종적으로 지목하시겠습니까?
              </p>
            </div>
            <div className={S.checkButton}>
              <button onClick={() => chooseVoteHandler(true)}>찬성</button>
              <button onClick={() => chooseVoteHandler(false)}>반대</button>
            </div>
            <progress
              className={S.progress}
              value={(initialSecond * 10 - count) * (100 / (initialSecond * 10))}
              max={100}
            ></progress>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckModal;
