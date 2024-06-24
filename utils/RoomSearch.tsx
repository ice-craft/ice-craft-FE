import React, { useState } from "react";
import { getRoomsWithKeyword } from "@/utils/supabase/roomAPI";
import SearchIcon from "@/assets/images/icon_search.svg";
import S from "@/style/mainpage/main.module.css";
import Image from "next/image";
import { toast } from "react-toastify";
import useGetRoomsSocket from "@/hooks/useGetRoomsSocket";
import useDebounce from "@/hooks/useSearchDebounce";
import CommonsLoading from "./CommonsLoading";

const RoomSearch = () => {
  const { setRooms } = useGetRoomsSocket();
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("방 이름을 입력해 주세요.");
  const debouncedValue = useDebounce(value, 500);

  //NOTE - 메인페이지 방 목록 검색
  const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!debouncedValue.trim()) return;

    try {
      setLoading(true);
      const roomKeyword = await getRoomsWithKeyword(debouncedValue);
      setRooms(roomKeyword);
    } catch (error) {
      toast.error("검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={searchHandler}>
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
        {loading && <CommonsLoading />}
      </form>
    </>
  );
};

export default RoomSearch;
