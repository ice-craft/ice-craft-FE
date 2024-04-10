"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import S from "@/style/mainPage/main.module.css";
import MainCreateRoom from "../../../components/mainpageComponents/MainCreateRoom";
import { useModalStore } from "../../../store/toggle-store";
import MafiaGameTitle from "@/app/assets/images/mafia_game_title.svg";
import PeopleIcon from "@/app/assets/images/icon_person.png";
import MafiaItem from "@/app/assets/images/mafia_item.png";
import { createRoom } from "@/utils/supabase/roomAPI";

const Mainpage = () => {
  const { isModal, setIsModal } = useModalStore();
  return (
    <main className={S.main}>
      <section className={S.visualSection}>
        <div>
          <ul className={S.gameList}>
            <li className={S.mafiaImage}>
              <div className={S.gameTitle}>
                <h2>
                  <Image src={MafiaGameTitle} alt="mafia game title" />
                </h2>
                <div className={S.gameButton}>
                  <button>Game Start</button>
                  <button className={S.mafiaInfo}>More Info</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <div className={S.roomSectionWrap}>
        <section className={S.roomSection}>
          <div className={S.MainGnb}>
            <p>현재 활성화 되어있는 방</p>
            <div className={S.roomSearchAndButton}>
              <div className={S.roomSearch}>
                <label htmlFor="RoomSearch">방 검색하기</label>
                <input type="text" id="RoomSearch" placeholder="방 이름을 입력해 주세요." />
              </div>
              <div className={S.gameGoButton}>
                <button>빠른입장</button>
                <div>
                  <button onClick={() => setIsModal(true)} className={S.makeRoom}>
                    방 만들기
                  </button>
                </div>
                {isModal ? <MainCreateRoom /> : null}
              </div>
            </div>
          </div>
          <ul className={S.roomList}>
            <li>createRoom</li>
            <li>
              <Image src={MafiaItem} alt="room image" />
              <div className={S.roomTitle}>
                <h3>방 제목</h3>
                <div className={S.gameName}>
                  <p className={S.mafiaHashtag}># 마피아</p>
                  <p className={S.currentPeople}>
                    <Image src={PeopleIcon} alt="people icon" />
                    <span>1/10</span>
                  </p>
                </div>
              </div>
              <button className={S.gotoButton}>입장하기</button>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Mainpage;
