"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import MafiaItem from "@/public/images/mafia_item.png";
import S from "@/style/mainPage/main.module.css";
import { useModalStore } from "../../../store/modal-store";
import MainCreateRoom from "../../../components/mainpageComponents/MainCreateRoom";

const Mainpage = () => {
  const { isModal, setIsModal } = useModalStore();
  return (
    <main className={S.main}>
      <section className={S.visualSection}>
        <div>
          <ul className={S.gameList}>
            <li className={S.mafiaImage}>
              <div className={S.gameTitle}>
                <h2>Mafia Game</h2>
                <div className={S.gameButton}>
                  <button>Game Start</button>
                  <button>More Info</button>
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
                <input type="text" id="RoomSearch" />
              </div>
              <div className={S.gameGoButton}>
                <Link href="/">빠른입장</Link>
                <div>
                  <button onClick={() => setIsModal(true)}>방 만들기</button>
                </div>
                {isModal ? <MainCreateRoom /> : null}
              </div>
            </div>
          </div>
          <ul className={S.roomList}>
            <li>
              <Image src={MafiaItem} alt="room image" />
              <div className={S.roomTitle}>
                <h3>방 제목</h3>
                <div className={S.gameName}>
                  <p>#마피아</p>
                  <p>1/5</p>
                </div>
              </div>
              <button className={S.gotoButton}>입장하기</button>
            </li>
            <li>
              <Image src={MafiaItem} alt="room image" />
              <div className={S.roomTitle}>
                <h3>방 제목</h3>
                <div className={S.gameName}>
                  <p>#마피아</p>
                  <p>1/5</p>
                </div>
              </div>
              <button className={S.gotoButton}>입장하기</button>
            </li>
            <li>
              <Image src={MafiaItem} alt="room image" />
              <div className={S.roomTitle}>
                <h3>방 제목</h3>
                <div className={S.gameName}>
                  <p>#마피아</p>
                  <p>1/5</p>
                </div>
              </div>
              <button className={S.gotoButton}>입장하기</button>
            </li>
            <li>
              <Image src={MafiaItem} alt="room image" />
              <div className={S.roomTitle}>
                <h3>방 제목</h3>
                <div className={S.gameName}>
                  <p>#마피아</p>
                  <p>1/5</p>
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
