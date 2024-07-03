import MafiaGameChoiceActive from "@/assets/images/game_choice_mafia_active.svg";
import MafiaGameChoice from "@/assets/images/game_choice_mafia.svg";
import MafiaGameSong from "@/assets/images/game_choice_song.svg";
import MafiaGameSongActive from "@/assets/images/game_choice_song_active.png.svg";
import { useCreateStore } from "@/store/toggle-store";
import S from "@/style/modal/modal.module.css";
import { socket } from "@/utils/socket/socket";
import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useConnectActions, useNickname, useUserId } from "@/store/connect-store";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import useSocketOn from "@/hooks/useSocketOn";
import { CreateRooms } from "@/types";
=======
import { useRoomAction } from "@/store/room-store";
>>>>>>> dc1d3a925cd64844345df35a242a5de6648c55d1

const MainCreateRoom = () => {
  const [roomTitle, setRoomTitle] = useState("");
  const [selectedGame, setSelectedGame] = useState("마피아");
  const { setIsEntry } = useRoomAction();
  const [numberOfPlayers, setNumberOfPlayers] = useState(5);
  const isGoInClick = useRef(false);
  const { setIsCreate } = useCreateStore();
  const userId = useUserId();
  const nickname = useNickname();
  const { setRoomId } = useConnectActions();
  const router = useRouter();
  const roomIdRef = useRef<string>("");

  const createSocket = {
    createRoom: ({ room_id }: CreateRooms) => {
      roomIdRef.current = room_id;
      socket.emit("joinRoom", userId, roomIdRef.current, nickname);
    },
    createRoomError: (message: string) => {
      toast.error(message);
      isGoInClick.current = false;
    },
    joinRoom: () => {
      if (roomIdRef.current) {
        setRoomId(roomIdRef.current);
        setIsCreate(false);
<<<<<<< HEAD
        router.push(`/room/${roomIdRef.current}/`);
=======
        if (selectedGame === "마피아") {
          setIsEntry(true);
          router.push(`/room/${roomId.current}/`);
        }
        return null;
>>>>>>> dc1d3a925cd64844345df35a242a5de6648c55d1
      }
    },
    joinRoomError: (message: string) => {
      toast.error(message);
      isGoInClick.current = false;
    }
  };
  useSocketOn(createSocket);

  const gameSelectHandler = (game: string) => {
    setSelectedGame(game);
    setRoomTitle("");
  };

  const closeModalHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setIsCreate(false);
    }
  };

  //NOTE - 방 만들기 핸들러
  const createRoomSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!roomTitle.trim()) {
        toast.error("방 제목을 입력해 주세요.");
        return;
      }
      if (!isGoInClick.current && selectedGame === "마피아") {
        isGoInClick.current = true;
        socket.emit("createRoom", roomTitle, selectedGame, numberOfPlayers);
        setSelectedGame("마피아");
        setRoomTitle("");
        setNumberOfPlayers(5);
        return;
      } else if (!isGoInClick.current && selectedGame === "노래맞추기") {
        toast("노래 맞추기 게임은 준비중입니다.");
        return;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const playerOptions = Array.from({ length: 6 }, (_, i) => i + 5);

  return (
    <div className={S.modalWrap} onClick={closeModalHandler}>
      <div className={S.mainModal}>
        <form onSubmit={createRoomSubmitHandler} className={S.gameForm}>
          <h2 className={S.gameChoice}>게임을 선택해 주세요</h2>
          <div>
            <h3 className={S.gameTitle}>게임 고르기</h3>
            <ul className={S.gameChoiceList}>
              <li onClick={() => gameSelectHandler("마피아")}>
                <Image src={selectedGame === "마피아" ? MafiaGameChoiceActive : MafiaGameChoice} alt="마피아 게임" />
              </li>
              <li onClick={() => gameSelectHandler("노래맞추기")}>
                <Image
                  src={selectedGame === "노래맞추기" ? MafiaGameSongActive : MafiaGameSong}
                  alt="노래 맞추기 게임"
                />
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
              maxLength={16}
            />
          </div>
          {selectedGame === "마피아" ? (
            <div className={S.playerPeopleChoice}>
              <h3 className={S.gameTitle}>인원수</h3>
              <select value={numberOfPlayers || ""} onChange={(e) => setNumberOfPlayers(Number(e.target.value))}>
                {playerOptions.map((number) => (
                  <option key={number} value={number}>
                    {number}명
                  </option>
                ))}
              </select>
            </div>
          ) : null}
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
