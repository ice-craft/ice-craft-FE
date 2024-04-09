import React, { useState, FormEvent } from "react";
import S from "@/style/modal/modal.module.css";
import { useModalStore } from "@/store/toggle-store";
import { useRouter } from "next/navigation";
import MafiaGameChoice from "@/public/images/game_choice_mafia.png";
import MafiaGameChoiceActive from "@/public/images/game_choice_mafia_active.png";
import MafiaGameSong from "@/public/images/game_choice_song.png";
import MafiaGameSongActive from "@/public/images/game_choice_mafia_song_active.png";
import Image from "next/image";
import { createRoom } from "@/utils/supabase/roomAPI";

const MainCreateRoom = () => {
  const { setIsModal } = useModalStore();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [roomTitle, setRoomTitle] = useState<string>("");
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(0);

  const router = useRouter();

  const closeModalHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setIsModal(false);
    }
  };
  const createRoomSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 유효성검사필요
    // if (!selectedGame || !roomTitle || !numberOfPlayers) {
    // }
    createRoom(roomTitle, selectedGame!, numberOfPlayers);
    router.push(`/room/${roomTitle}`);
    setIsModal(false);
  };

  return (
    <div className={S.modalWrap} onClick={closeModalHandler}>
      <div className={S.modal}>
        <div className="MainCreateRoom">
          <div className="MainCreateRoom-content">
            <form onSubmit={createRoomSubmitHandler}>
              <h2>게임을 선택해주세요</h2>
              <p>게임 고르기</p>
              <button onClick={() => setSelectedGame("마피아")}>마피아</button>
              <button onClick={() => setSelectedGame("노래 맞추기")}>노래 맞추기</button>
              <p>방제목</p>
              <input type="text" value={roomTitle} onChange={(e) => setRoomTitle(e.target.value)} />
              <p>인원수</p>
              <select value={numberOfPlayers || ""} onChange={(e) => setNumberOfPlayers(Number(e.target.value))}>
                <option value="5">5명</option>
                <option value="6">6명</option>
                <option value="7">7명</option>
                <option value="8">8명</option>
                <option value="9">9명</option>
                <option value="10">10명</option>
              </select>
              <div>
                <button onClick={() => setIsModal(false)}>닫기</button>
                <button type="submit">확인</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCreateRoom;
