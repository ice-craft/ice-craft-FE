import React from "react";
import RoomButton from "../_components/mainpageComponents/Roombutton";
import Link from "next/link";
import Image from "next/image";
import MafiaVisual from "@/public/images/mafia_visual.png";
import MafiaItem from "@/public/images/mafia_item.png";
import S from "@/app/_style/mainPage/main.module.css";
import mainCreateRoom from "../_utils/modal/mainCreateRoom";

const Mainpage = () => {
  return (
    <main className={S.main}>
      <section className={S.visualSection}>
        <div className={S.visual}>
          <ul>
            <li>
              <Image src={MafiaVisual} alt="mafia_visual" />
            </li>
          </ul>
        </div>
        <div className={S.gameTitle}>
          <h2>Mafia Game</h2>
          <div className={S.gameButton}>
            <button>Game Start</button>
            <button>More Info</button>
          </div>
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
                  <Link href="/">방 만들기</Link>
                </div>
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
        <RoomButton />
      </div>
    </main>
  );
};

export default Mainpage;
