import React, { useState } from "react";
import { getRoomsWithKeyword } from "@/utils/supabase/roomAPI";
import SearchIcon from "@/assets/images/icon_search.svg";
import S from "@/style/mainpage/main.module.css";
import Image from "next/image";
import { toast } from "react-toastify";
import useGetRoomsSocket from "@/hooks/useGetRoomsSocket";
import useDebounce from "@/hooks/useSearchDebounce";

const RoomSearch = () => {
  const { rooms, setRooms } = useGetRoomsSocket();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("방 이름을 입력해 주세요.");
  const debouncedValue = useDebounce(search, 1000);

  //NOTE - 방 목록 검색
  const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("search검색어", search);
    if (!debouncedValue.trim()) return;

    try {
      setLoading(true);
      const roomKeyword = await getRoomsWithKeyword(debouncedValue);
      setRooms(roomKeyword);
      console.log("룸결과", roomKeyword);
    } catch (error) {
      toast.error("검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className={S.searchForm} onSubmit={searchHandler}>
        <div className={S.roomSearch}>
          <label htmlFor="search">검색하기</label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={name}
          />
          <button type="submit" disabled={loading}>
            <Image src={SearchIcon} alt="search Icon" />
          </button>
        </div>
        <div className={S.searchWrap}>
          {loading && <div>검색중</div>}
          {rooms && rooms.length === 0 && <div>검색결과가 없음</div>}
        </div>
      </form>
    </>
  );
};

export default RoomSearch;
