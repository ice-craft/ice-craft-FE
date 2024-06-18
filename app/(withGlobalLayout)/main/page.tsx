"use client";
import VisitEmptyImage from "@/assets/images/visit_empty.svg";
import useConnectStore from "@/store/connect-store";
import Image from "next/image";
import S from "@/style/mainpage/main.module.css";
import { Tables } from "@/types/supabase";
import GoTopButton from "@/utils/GoTopButton";
import { socket } from "@/utils/socket/socket";
import { checkUserLogIn, getUserInfo } from "@/utils/supabase/authAPI";
import { getRoomsWithKeyword } from "@/utils/supabase/roomAPI";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import MainCreateRoom from "@/components/modal/CreateRoomModal";
import { useCreateStore } from "../../../store/toggle-store";
import useSocketOn from "@/hooks/useSocketOn";
import MainVisual from "@/components/main/MainVisual";
import RoomSearch from "@/utils/RoomSearch";
import RoomListItem from "@/components/main/RoomListItem";

const Mainpage = () => {
  const { isCreate, setIsCreate } = useCreateStore();
  const { userId, nickname, setRoomId, setUserId, setUserNickname } = useConnectStore();
  const [rooms, setRooms] = useState([] as Tables<"room_table">[]);
  const [search, setSearch] = useState("");
  const isGoInClick = useRef(false);
  const roomId = useRef("");
  const router = useRouter();

  useEffect(() => {
    socket.connect();

    const checkUserInfo = async () => {
      const userInfo = await getUserInfo();

      // 세션 스토리지에 저장
      if (userInfo) {
        setUserId(crypto.randomUUID());
        setUserNickname(crypto.randomUUID());
        // setUserId(userInfo.id);
        // setUserNickname(userInfo.user_metadata.nickname);
      }
    };

    checkUserInfo();
  }, []);

  const sockets = {
    enterMafia: (rooms: Tables<"room_table">[]) => {
      setRooms(rooms);
    },
    joinRoom: () => {
      if (roomId.current) {
        router.push(`/room/${roomId.current}/`);
      }
    },
    joinRoomError: (message: string) => {
      isGoInClick.current = false;
      toast.error(message);
      // router.refresh();
    },
    fastJoinRoom: (room_id: string) => {
      router.push(`/room/${room_id}/`);
      setRoomId(room_id);
    },
    fastJoinRoomError: (message: string) => {
      isGoInClick.current = false;
      toast.error(message);
    }
  };

  useSocketOn(sockets);

  // useEffect(() => {
  //   //NOTE -  서버와 연결
  //   socket.connect();

  //   socket.emit("enterMafia", 0, 20);

  //   socket.on("enterMafia", (rooms) => {
  //     setRooms(rooms);
  //   });
  //   socket.on("enterMafiaError", (message) => {
  //     toast.error(message);
  //   });

  //   socket.on("joinRoom", () => {
  //     if (roomId.current) {
  //       router.push(`/room/${roomId.current}/`);
  //     }
  //   });

  //   socket.on("joinRoomError", (message) => {
  //     isGoInClick.current = false;
  //     toast.error(message);
  //     // router.refresh();
  //   });

  //   socket.on("fastJoinRoom", (room_id) => {
  //     router.push(`/room/${room_id}/`);
  //     setRoomId(room_id);
  //   });

  //   socket.on("fastJoinRoomError", (message) => {
  //     isGoInClick.current = false;
  //     toast.error(message);
  //   });

  //   const checkUserInfo = async () => {
  //     const userInfo = await getUserInfo();

  //     // 세션 스토리지에 저장
  //     if (userInfo) {
  //       setUserId(crypto.randomUUID());
  //       setUserNickname(crypto.randomUUID());
  //       // setUserId(userInfo.id);
  //       // setUserNickname(userInfo.user_metadata.nickname);
  //     }
  //   };

  //   checkUserInfo();

  //   return () => {
  //     socket.off("joinRoom");
  //     socket.off("joinRoomError");
  //     socket.off("fastJoinRoom");
  //     socket.off("fastJoinRoomError");
  //     socket.off("enterMafia");
  //     socket.off("enterMafiaError");
  //   };
  // }, []);

  //NOTE - 로그인 체크, 공통 로직 함수 정의
  const loginErrorHandler = async (emitCallback: () => void) => {
    try {
      const isLogin = await checkUserLogIn();

      if (!isLogin) {
        toast.info("로그인 후 입장가능합니다.");
        return;
      }
      if (!isGoInClick.current) {
        isGoInClick.current = true;
        emitCallback();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  //NOTE - 방 리스트 입장하기
  const joinRoomHandler = async (item: Tables<"room_table">) => {
    await loginErrorHandler(() => {
      setRoomId(item.room_id);
      socket.emit("joinRoom", userId, item.room_id, nickname);
    });
  };

  //NOTE - 빠른 입장 (랜덤 방 입장)
  const fastJoinRoomHandler = async () => {
    await loginErrorHandler(() => {
      socket.emit("fastJoinRoom", userId, nickname);
    });
  };

  //NOTE - 메인페이지 visual에서 게임시작 버튼 클릭시(추후 마피아 & 노래맞추기 조건 추가)
  const gameStartHandler = async () => {
    await loginErrorHandler(() => {
      socket.emit("fasJoinRoom", userId, nickname);
    });
  };

  //NOTE - 방 목록 검색
  const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const rooms = await getRoomsWithKeyword(search);
      setRooms(rooms);
    } catch (error) {
      toast.error("검색 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className={S.main}>
      <section className={S.visualSection}>
        <MainVisual gameStartHandler={gameStartHandler} />
      </section>
      <div className={S.roomSectionWrap}>
        <section className={S.roomSection}>
          <div className={S.MainGnb}>
            <p>현재 활성화 되어있는 방</p>
            <div className={S.roomSearchAndButton}>
              <RoomSearch searchHandler={searchHandler} search={search} setSearch={setSearch} />
              <div className={S.gameGoButton}>
                <button disabled={isGoInClick.current} onClick={fastJoinRoomHandler}>
                  빠른입장
                </button>
                <div className={S.makeRoomButton}>
                  <button onClick={() => setIsCreate(true)} className={S.makeRoom}>
                    방 만들기
                  </button>
                </div>
                {isCreate ? <MainCreateRoom /> : null}
              </div>
            </div>
          </div>
          {rooms.length > 0 ? (
            <ul className={S.roomList}>
              {rooms.map((item) => (
                <RoomListItem item={item} joinRoomHandler={joinRoomHandler} />
              ))}
            </ul>
          ) : (
            <div className={S.roomVisitEmpty}>
              <Image src={VisitEmptyImage} alt="Room list empty" />
            </div>
          )}
        </section>
      </div>
      <GoTopButton />
    </main>
  );
};

export default Mainpage;
