import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import S from "@/style/mainpage/main.module.css";
import MafiaGameTitle from "@/assets/images/mafia_game_title.svg";
import SongGameTitle from "@/assets/images/song_game_title.svg";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Parallax, Autoplay, Pagination, Navigation } from "swiper/modules";
import SwiperType from "swiper";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/style/mainpage/swiper.css";
import useJoinRoom from "@/hooks/useJoinRoom";

const MainVisual = () => {
  const { gameStartHandler } = useJoinRoom();
  const swiperRef = useRef<SwiperType | null>(null);

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

  //NOTE - 노래맞추기 버튼 클릭 이벤트
  const songHandler = () => {
    toast("서비스 준비 중 입니다.");
  };

  return (
    <Swiper
      className={S.gameList}
      pagination={{
        type: "fraction"
      }}
      rewind={true}
      effect={"fade"}
      // autoplay={{
      //   delay: 5000,
      //   disableOnInteraction: false
      // }}
      navigation={true}
      speed={800}
      parallax={true}
      modules={[EffectFade, Parallax, Pagination, Navigation]}
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
          <h2 className={S.songTitle}>
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
  );
};

export default MainVisual;
