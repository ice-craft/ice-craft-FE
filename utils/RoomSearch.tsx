import React, { useState } from "react";
import { getRoomsWithKeyword } from "@/utils/supabase/roomAPI";
import SearchIcon from "@/assets/images/icon_search.svg";
import S from "@/style/mainpage/main.module.css";
import Image from "next/image";
import { toast } from "react-toastify";
import useGetRoomsSocket from "@/hooks/useGetRoomsSocket";

const RoomSearch = () => {
  const { setRooms } = useGetRoomsSocket();
  const [search, setSearch] = useState("");

  //NOTE - 방 목록 검색
  const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const rooms = await getRoomsWithKeyword(search);
      console.log("룸결과", rooms);
      setRooms(rooms);
    } catch (error) {
      toast.error("검색 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <div className={S.roomSearch}>
        <label htmlFor="search">검색하기</label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="방 이름을 입력해 주세요."
        />
        <button>
          <Image src={SearchIcon} alt="search Icon" />
        </button>
      </div>
    </form>
  );
};

export default RoomSearch;
