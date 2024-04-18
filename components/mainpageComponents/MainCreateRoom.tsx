import MafiaGameChoiceActive from "@/assets/images/game_choice_mafia_active.svg";
import MafiaGameSong from "@/assets/images/game_choice_song.svg";
import useConnectStore from "@/store/connect-store";
import { useModalStore } from "@/store/toggle-store";
import S from "@/style/modal/modal.module.css";
import { socket } from "@/utils/socket/socket";
import { checkUserLogIn, getUserInfo } from "@/utils/supabase/authAPI";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";

const MainCreateRoom = () => {
  const { setIsModal } = useModalStore();
  const { setRoomId, setUserId, setUserNickname } = useConnectStore();
  const [selectedGame, setSelectedGame] = useState<string>("마피아");
  const [roomTitle, setRoomTitle] = useState<string>("");
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(5);
  const isGoInClick = useRef(false);
  const roomId = useRef("");
  const userId = useRef("");
  const userNickname = useRef("");
  const router = useRouter();

  useEffect(() => {
    socket.on("createRoom", ({ room_id }) => {
      setRoomId(room_id);
      roomId.current = room_id;
      socket.emit("joinRoom", userId.current, room_id, userNickname.current);
    });
    socket.on("createRoomError", (message) => {
      console.log(message);
    });
    socket.on("joinRoom", () => {
      router.push(`/room/${roomId.current}`);
      setIsModal(false);
    });

    socket.on("joinRoomError", (message) => {
      alert(message);
    });

    return () => {
      socket.off("createRoom");
      socket.off("createRoomError");
      socket.off("joinRoom");
      socket.off("joinRoomError");
    };
  }, []);

  const closeModalHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setIsModal(false);
    }
  };

  const createRoomSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const isLogin = await checkUserLogIn();
      const userInfo = await getUserInfo();

      if (!isLogin || !userInfo) {
        alert("로그인 후 입장 가능합니다.");
        router.push("/login");
        return;
      }

      // 유효성검사필요
      // if (!selectedGame || !roomTitle || !numberOfPlayers) {
      // }

      if (!isGoInClick.current) {
        isGoInClick.current = true;
        userId.current = userInfo.id;
        userNickname.current = userInfo.user_metadata.nickname;
        setUserId(userInfo.id);
        setUserNickname(userInfo.user_metadata.nickname);
        socket.emit("createRoom", roomTitle, selectedGame, numberOfPlayers);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className={S.modalWrap} onClick={closeModalHandler}>
      <div className={S.modal}>
        <form onSubmit={createRoomSubmitHandler} className={S.gameForm}>
          <h2 className={S.gameChoice}>게임을 선택해 주세요</h2>
          <div>
            <h3 className={S.gameTitle}>게임 고르기</h3>
            <ul className={S.gameChoiceList}>
              <li onClick={() => setSelectedGame("마피아")}>
                <Image src={MafiaGameChoiceActive} alt="마피아 게임" />
              </li>
              <li onClick={() => setSelectedGame("노래 맞추기")}>
                <Image src={MafiaGameSong} alt="노래 맞추기 게임" />
              </li>
            </ul>
          </div>
          <div className={S.gameNameText}>
            <h3 className={S.gameTitle}>방 제목</h3>
            <input
              type="text"
              id="RoomName"
              value={roomTitle}
              placeholder="방 제목을 입력해 주세요."
              onChange={(e) => setRoomTitle(e.target.value)}
            />
          </div>
          <div className={S.playerPeopleChoice}>
            <h3 className={S.gameTitle}>인원수</h3>
            <select value={numberOfPlayers || ""} onChange={(e) => setNumberOfPlayers(Number(e.target.value))}>
              <option value="5">5명</option>
              <option value="6">6명</option>
              <option value="7">7명</option>
              <option value="8">8명</option>
              <option value="9">9명</option>
              <option value="10">10명</option>
            </select>
          </div>
          <div className={S.gameChoiceButton}>
            <button className={S.closedButton} onClick={() => setIsModal(false)}>
              닫기
            </button>
            <button disabled={isGoInClick.current} type="submit">
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainCreateRoom;
