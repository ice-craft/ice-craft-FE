"use client";
import PeopleIcon from "@/assets/images/icon_person.svg";
import MafiaGameTitle from "@/assets/images/mafia_game_title.svg";
import MafiaItem from "@/assets/images/mafia_item.png";
import { useGetRooms } from "@/hooks/useGetRooms";
import useConnectStore from "@/store/connect-store";
import S from "@/style/mainPage/main.module.css";
import { Tables } from "@/types/supabase";
import { socket } from "@/utils/socket/socket";
import { checkUserLogIn, getUserInfo, logOut } from "@/utils/supabase/authAPI";
import { fastJoinRoom } from "@/utils/supabase/roomAPI";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MainCreateRoom from "../../../components/mainpageComponents/MainCreateRoom";
import { useModalStore } from "../../../store/toggle-store";

const Mainpage = () => {
  const { isModal, setIsModal } = useModalStore();
  const { userId, nickname, setRoomId, setUserId, setUserNickname } = useConnectStore();
  const isGoInClick = useRef(false);
  const room = useRef("");
  const router = useRouter();

  useEffect(() => {
    //NOTE -  서버와 연결
    socket.connect();

    socket.on("joinRoom", () => {
      router.push(`/room/${room.current}`);
    });

    socket.on("joinRoomError", (message) => {
      alert(message);
      isGoInClick.current = false;
      router.refresh();
    });

    socket.on("fastJoinRoom", (room_id, userInfo) => {
      router.push(`/room/${room_id}`);
      setRoomId(room_id);
    });

    socket.on("fastJoinRoomError", (message) => {
      console.log(message);
    });

    const checkUserInfo = async () => {
      const userInfo = await getUserInfo();

      if (userInfo) {
        setUserId(userInfo.id);
        setUserNickname(userInfo.user_metadata.nickname);
      }
    };

    checkUserInfo();

    return () => {
      socket.off("joinRoom");
      socket.off("joinRoomError");
    };
  }, []);

  const { data: rooms, isPending, isError } = useGetRooms();

  if (isPending) {
    console.log("방 리스트 가져오는 중");
  }

  if (isError) {
    console.log("방 리스트 가져오는 과정에서 error 발생");
  }

  //NOTE - 입장하기
  const joinRoomHandler = async (item: Tables<"room_table">) => {
    try {
      const isLogin = await checkUserLogIn();

      if (!isLogin) {
        alert("로그인 후 입장 가능합니다.");
        router.push("/login");
        return;
      }

      if (!isGoInClick.current) {
        console.log("일반 입장하기 정상 작동");
        room.current = item.room_id;
        isGoInClick.current = true;
        setRoomId(item.room_id);
        socket.emit("joinRoom", userId, item.room_id, nickname);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  //NOTE - 빠른 입장
  const fastJoinRoomHandler = async () => {
    try {
      const isLogin = await checkUserLogIn();

      if (!isLogin) {
        alert("로그인 후 입장 가능합니다.");
        router.push("/login");
        return;
      }
      if (!isGoInClick.current) {
        console.log("빠른 입장 정상작동");
        isGoInClick.current = true;
        socket.emit("fastJoinRoom", userId, nickname);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

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
                <button disabled={isGoInClick.current} onClick={fastJoinRoomHandler}>
                  빠른입장
                </button>
                <div className={S.makeRoomButton}>
                  <button onClick={() => setIsModal(true)} className={S.makeRoom}>
                    방 만들기
                  </button>
                </div>
                {isModal ? <MainCreateRoom /> : null}
              </div>
            </div>
          </div>
          <ul className={S.roomList}>
            {rooms?.map((item) => (
              <li key={item.room_id}>
                <Image src={MafiaItem} alt="room image" />
                <div className={S.roomTitle}>
                  <h3>{item.title}</h3>
                  <div className={S.gameName}>
                    <p className={S.mafiaHashtag}>#&nbsp;{item.game_category}</p>
                    <p className={S.currentPeople}>
                      <Image src={PeopleIcon} alt="people icon" />
                      <span>
                        {item.current_user_count}/{item.total_user_count}
                      </span>
                    </p>
                  </div>
                </div>

                <button disabled={isGoInClick.current} onClick={() => joinRoomHandler(item)} className={S.gotoButton}>
                  입장하기
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Mainpage;
