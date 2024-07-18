import React, { useRef, useState } from "react";
import PeopleIcon from "@/assets/images/icon_person.svg";
import MafiaItem from "@/assets/images/mafia_item.png";
import S from "@/style/mainpage/main.module.css";
import Image from "next/image";
import { RoomListItemProps } from "@/types";
import useSocketOn from "@/hooks/useSocketOn";
import { Tables } from "@/types/supabase";
import useJoinRoom from "@/hooks/useJoinRoom";

const RoomListItem = ({ item }: RoomListItemProps) => {
  const [currentItem, setCurrentItem] = useState(item);
  const isGoInClick = useRef(false);
  const isRoomFull = currentItem.current_user_count >= currentItem.total_user_count;
  const { joinRoomHandler } = useJoinRoom();

  const updateSocket = {
    updateRoomInfo: (roomInfo: Tables<"room_table">) => {
      if (roomInfo.room_id === item.room_id) {
        setCurrentItem(roomInfo);
      }
    }
  };
  useSocketOn(updateSocket);

  return (
    <li key={currentItem.room_id}>
      <Image src={MafiaItem} alt="room image" />
      <div className={S.roomTitle}>
        <h3>{currentItem.title}</h3>
        <div className={S.gameName}>
          <p className={S.mafiaHashtag}>#&nbsp;{currentItem.game_category}</p>
          <p className={S.currentPeople}>
            <Image src={PeopleIcon} alt="people icon" />
            <span>
              {currentItem.current_user_count}/{currentItem.total_user_count}
            </span>
          </p>
        </div>
      </div>
      {isRoomFull ? (
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
