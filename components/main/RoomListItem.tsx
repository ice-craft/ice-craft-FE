import PeopleIcon from "@/assets/images/icon_person.svg";
import MafiaItem from "@/assets/images/mafia_item.png";
import useJoinRoom from "@/hooks/useJoinRoom";
import S from "@/style/mainpage/main.module.css";
import { RoomListItemProps } from "@/types";
import { Tables } from "@/types/supabase";
import Image from "next/image";
import { useRef } from "react";

const RoomListItem = ({ item }: RoomListItemProps) => {
  const isGoInClick = useRef(false);
  const { joinRoomHandler } = useJoinRoom();

  const updateIsPlaying = (room: Tables<"room_table">): boolean => {
    return item.current_user_count >= item.total_user_count || room.is_playing;
  };

  const isPlaying = updateIsPlaying(item);

  return (
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
      {isPlaying ? (
        <div className={S.gamePlaying}>
          <p>
            playing
            <span className={S.dot1}>.</span>
            <span className={S.dot2}>.</span>
            <span className={S.dot3}>.</span>
          </p>
        </div>
      ) : (
        <div className={S.roomListWrap}>
          <button disabled={isGoInClick.current} onClick={() => joinRoomHandler(item)} className={S.gotoButton}>
            입장하기
          </button>
        </div>
      )}
    </li>
  );
};

export default RoomListItem;
