import React, { useState, FormEvent } from "react";
import S from "@/style/modal/modal.module.css";
import { useModalStore } from "@/store/toggle-store";
import { useRouter } from "next/navigation";
import MafiaGameChoice from "@/public/images/game_choice_mafia.png";
import MafiaGameChoiceActive from "@/public/images/game_choice_mafia_active.png";
import MafiaGameSong from "@/public/images/game_choice_song.png";
import MafiaGameSongActive from "@/public/images/game_choice_mafia_song_active.png";
import Image from "next/image";

const MainCreateRoom = () => {
  const { setIsModal } = useModalStore();
  // const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [roomTitle, setRoomTitle] = useState<string>("");
  const [numberOfPlayers, setNumberOfPlayers] = useState<number | null>(null);

  const router = useRouter();

  const closeModalHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setIsModal(false);
    }
  };

  const createRoomSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/room/${roomTitle}`);
    setIsModal(false);

    // if (selectedGame && roomTitle && numberOfPlayers) {

    // }
  };

  return (
    <div className={S.modalWrap} onClick={closeModalHandler}>
      <div className={S.modal}>
        <form onSubmit={createRoomSubmitHandler} className={S.gameForm}>
          <h2 className={S.gameChoice}>게임을 선택해 주세요</h2>
          <div>
            <h3 className={S.gameTitle}>게임 고르기</h3>
            {/* <div>
            <button onClick={() => setSelectedGame("마피아")}>마피아</button>
            <button onClick={() => setSelectedGame("노래 맞추기")}>노래 맞추기</button>
          </div> */}
            <ul className={S.gameChoiceList}>
              <li>
                <Image src={MafiaGameChoiceActive} alt="마피아 게임" />
              </li>
              <li>
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
