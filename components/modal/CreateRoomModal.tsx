import MafiaGameChoiceActive from "@/assets/images/game_choice_mafia_active.svg";
import MafiaGameChoice from "@/assets/images/game_choice_mafia.svg";
import MafiaGameSong from "@/assets/images/game_choice_song.svg";
import MafiaGameSongActive from "@/assets/images/game_choice_song_active.png.svg";
import useConnectStore from "@/store/connect-store";
import { useCreateStore } from "@/store/toggle-store";
import S from "@/style/modal/modal.module.css";
import { socket } from "@/utils/socket/socket";
import { checkUserLogIn } from "@/utils/supabase/authAPI";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const MainCreateRoom = () => {
  const [roomTitle, setRoomTitle] = useState("");
  const [selectedGame, setSelectedGame] = useState("마피아");
  const [numberOfPlayers, setNumberOfPlayers] = useState(5);
  const isGoInClick = useRef(false);
  const roomId = useRef("");
  const { setIsCreate } = useCreateStore();
  const { userId, nickname, setRoomId } = useConnectStore();
  const router = useRouter();

  useEffect(() => {
    socket.on("createRoom", ({ room_id }) => {
      roomId.current = room_id;
      socket.emit("joinRoom", userId, room_id, nickname);
    });

    socket.on("createRoomError", (message) => {
      toast.error(message);
      isGoInClick.current = false;
    });

    socket.on("joinRoom", () => {
      if (roomId.current) {
        setRoomId(roomId.current);
        setIsCreate(false);
        router.push(`/room/${roomId.current}/`);
      }
    });

    socket.on("joinRoomError", (message) => {
      toast.error(message);
      isGoInClick.current = false;
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
      setIsCreate(false);
    }
  };

  const createRoomSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const isLogin = await checkUserLogIn();

      if (!isLogin) {
        toast.info("로그인 후 입장가능합니다.");
        return;
      }

      // 유효성검사필요
      // if (!selectedGame || !roomTitle || !numberOfPlayers) {
      // }

      if (!isGoInClick.current) {
        isGoInClick.current = true;
        socket.emit("createRoom", roomTitle, selectedGame, numberOfPlayers);
        //NOTE - 게임 카테고리, 방 제목, 인원수 초기화
        setSelectedGame("");
        setRoomTitle("");
        setNumberOfPlayers(5);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className={S.modalWrap} onClick={closeModalHandler}>
      <div className={S.mainModal}>
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
            <button className={S.closedButton} type="button" onClick={() => setIsCreate(false)}>
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
