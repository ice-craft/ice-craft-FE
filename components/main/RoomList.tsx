import VisitEmptyImage from "@/assets/images/visit_empty.svg";
import useGetRoomsSocket from "@/hooks/useGetRoomsSocket";
import S from "@/style/mainpage/main.module.css";
import { Tables } from "@/types/supabase";
import Image from "next/image";
import MainSkeleton from "./MainSkeleton";
import RoomListItem from "./RoomListItem";

const RoomList = () => {
  const { rooms } = useGetRoomsSocket();

  if (!rooms) return <MainSkeleton />;

  return (
    <>
      {rooms.length > 0 ? (
        <ul className={S.roomList}>
          {rooms.map((item: Tables<"room_table">) => (
            <RoomListItem key={item.room_id} item={item} />
          ))}
        </ul>
      ) : (
        <div className={S.roomVisitEmpty}>
          <Image src={VisitEmptyImage} alt="Room list empty" />
        </div>
      )}
    </>
  );
};

export default RoomList;
