import React, { useState, FormEvent } from "react";
import S from "@/style/modal/modal.module.css";
import { useModalStore } from "@/store/toggle-store";
import { useRouter } from "next/navigation";
import MafiaGameChoice from "@/assets/images/game_choice_mafia.png";
import MafiaGameChoiceActive from "@/assets/images/game_choice_mafia_active.png";
import MafiaGameSong from "@/assets/images/game_choice_song.png";
import MafiaGameSongActive from "@/assets/images/game_choice_mafia_song_active.png";
import Image from "next/image";
import { createRoom, joinRoom } from "@/utils/supabase/roomAPI";

const MainCreateRoom = () => {
  const { setIsModal } = useModalStore();
  const [selectedGame, setSelectedGame] = useState<string>("마피아");
  const [roomTitle, setRoomTitle] = useState<string>("");
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(5);

  const router = useRouter();

  const closeModalHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setIsModal(false);
    }
  };

  const createRoomSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 유효성검사필요
    // if (!selectedGame || !roomTitle || !numberOfPlayers) {
    // }
    // const userId = crypto.randomUUID(); //NOTE - 테스트용 코드
    // const { room_id } = await createRoom(roomTitle, selectedGame, numberOfPlayers);
    // await joinRoom(room_id, userId, "default nickName");
    router.push(`/room/${roomTitle}`);
    setIsModal(false);
  };

  const test = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/room/${roomTitle}`);
    setIsModal(false);
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
            <button type="submit">확인</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainCreateRoom;
