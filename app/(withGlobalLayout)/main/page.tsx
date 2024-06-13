"use client";
import PeopleIcon from "@/assets/images/icon_person.svg";
import SearchIcon from "@/assets/images/icon_search.svg";
import MafiaGameTitle from "@/assets/images/mafia_game_title.svg";
import SongGameTitle from "@/assets/images/song_game_title.svg";
import MafiaItem from "@/assets/images/mafia_item.png";
import VisitEmptyImage from "@/assets/images/visit_empty.svg";
import useConnectStore from "@/store/connect-store";
import S from "@/style/mainPage/main.module.css";
import { Tables } from "@/types/supabase";
import GoTopButton from "@/utils/GoTopButton";
import { socket } from "@/utils/socket/socket";
import { checkUserLogIn, getUserInfo } from "@/utils/supabase/authAPI";
import { getRoomsWithKeyword } from "@/utils/supabase/roomAPI";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import MainCreateRoom from "@/components/modal/CreateRoomModal";
import { useCreateStore } from "../../../store/toggle-store";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Parallax, Autoplay, Pagination, Navigation } from "swiper/modules";
import SwiperType from "swiper";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/style/mainpage/swiper.css";

const Mainpage = () => {
  const { isCreate, setIsCreate } = useCreateStore();
  const { userId, nickname, setRoomId, setUserId, setUserNickname } = useConnectStore();
  const [rooms, setRooms] = useState([] as Tables<"room_table">[]);
  const [search, setSearch] = useState("");
  const isGoInClick = useRef(false);
  const roomId = useRef("");
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    //NOTE -  서버와 연결
    socket.connect();

    socket.emit("enterMafia", 0, 20);

    socket.on("enterMafia", (rooms) => {
      setRooms(rooms);
    });
    socket.on("enterMafiaError", (message) => {
      toast.error(message);
    });

    socket.on("joinRoom", () => {
      if (roomId.current) {
        router.push(`/room/${roomId.current}/`);
      }
    });

    socket.on("joinRoomError", (message) => {
      isGoInClick.current = false;
      toast.error(message);
      // router.refresh();
    });

    socket.on("fastJoinRoom", (room_id) => {
      router.push(`/room/${room_id}/`);
      setRoomId(room_id);
    });

    socket.on("fastJoinRoomError", (message) => {
      isGoInClick.current = false;
      toast.error(message);
    });

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

    return () => {
      socket.off("joinRoom");
      socket.off("joinRoomError");
      socket.off("fastJoinRoom");
      socket.off("fastJoinRoomError");
      socket.off("enterMafia");
      socket.off("enterMafiaError");
    };
  }, []);

  //NOTE - 입장하기
  const joinRoomHandler = async (item: Tables<"room_table">) => {
    try {
      const isLogin = await checkUserLogIn();

      if (!isLogin) {
        toast.info("로그인 후 입장가능합니다.");
        return;
      }

      if (!isGoInClick.current) {
        roomId.current = item.room_id;
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
        toast.info("로그인 후 입장가능합니다.");
        return;
      }
      if (!isGoInClick.current) {
        isGoInClick.current = true;
        socket.emit("fastJoinRoom", userId, nickname);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  //NOTE - Game Start
  const gameStartHandler = async () => {
    try {
      const isLogin = await checkUserLogIn();

      if (!isLogin) {
        toast.info("로그인 후 입장가능합니다.");
        return;
      }
      if (!isGoInClick.current) {
        isGoInClick.current = true;
        socket.emit("fastJoinRoom", userId, nickname);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const rooms: Tables<"room_table">[] = await getRoomsWithKeyword(search);
      setRooms(rooms);
    } catch (error) {
      toast.error("검색 중 오류가 발생했습니다.");
    }
  };

  const mouseEnterHandler = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const mouseLeaveHandler = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  };

  //NOTE - 노래맞추기 버튼
  const songHandler = () => {
    toast("서비스 준비 중 입니다.");
  };

  return (
    <main className={S.main}>
      <section className={S.visualSection}>
        <Swiper
          className={S.gameList}
          pagination={{
            type: "fraction"
          }}
          rewind={true}
          effect={"fade"}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          navigation={true}
          speed={800}
          parallax={true}
          modules={[EffectFade, Parallax, Autoplay, Pagination, Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          <SwiperSlide className={S.gameImage}>
            <div
              className={S.gameTitle}
              data-swiper-parallax="-100%"
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              <h2>
                <Image src={MafiaGameTitle} alt="mafia game title" priority />
              </h2>
              <div className={S.gameButton}>
                <button onClick={gameStartHandler}>Game Start</button>
                <Link href="/mafiainfo" className={S.gameInfo}>
                  More Info
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={S.gameImage}>
            <div
              className={S.gameTitle}
              data-swiper-parallax="200%"
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              <h2>
                <Image src={SongGameTitle} alt="song game title" priority />
              </h2>
              <div className={S.gameButton}>
                <button onClick={songHandler}>Game Start</button>
                <button onClick={songHandler} className={S.gameInfo}>
                  More Info
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      <div className={S.roomSectionWrap}>
        <section className={S.roomSection}>
          <div className={S.MainGnb}>
            <p>현재 활성화 되어있는 방</p>
            <div className={S.roomSearchAndButton}>
              <form onSubmit={searchHandler}>
                <div className={S.roomSearch}>
                  <label htmlFor="RoomSearch">방 검색하기</label>
                  <input
                    type="text"
                    id="RoomSearch"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="방 이름을 입력해 주세요."
                  />
                  <button>
                    <Image src={SearchIcon} alt="search Icon" />
                  </button>
                </div>
              </form>
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
          ) : (
            <div className={S.roomVisitEmpty}>
              <Image src={VisitEmptyImage} alt="visit empty" />
            </div>
          )}
        </section>
      </div>
      <GoTopButton />
    </main>
  );
};

export default Mainpage;
