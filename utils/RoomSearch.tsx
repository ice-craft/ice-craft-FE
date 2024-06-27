import React, { useEffect, useState } from "react";
import { getRoomsWithKeyword } from "@/utils/supabase/roomAPI";
import SearchIcon from "@/assets/images/icon_search.svg";
import S from "@/style/mainpage/main.module.css";
import Image from "next/image";
import { toast } from "react-toastify";
import useGetRoomsSocket from "@/hooks/useGetRoomsSocket";
import useDebounce from "@/hooks/useSearchDebounce";

const RoomSearch = () => {
  const { setRooms } = useGetRoomsSocket();
  const [search, setSearch] = useState<string>("");
  const [name, setName] = useState("방 이름을 입력해 주세요.");
  const debouncedValue = useDebounce(search, 500);

  //NOTE - 메인페이지 방 목록 검색
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        if (!debouncedValue.trim()) return;

        const roomKeyword = await getRoomsWithKeyword(debouncedValue);
        setRooms(roomKeyword);
      } catch (error) {
        toast.error("검색 중 오류가 발생했습니다.");
      }
    };

    fetchRooms();
  }, [debouncedValue]);

  return (
    <>
      <div className={S.roomSearch}>
        <label htmlFor="search">검색하기</label>
        <input type="text" id="search" value={search} onChange={searchHandler} placeholder={name} />
        <button type="button">
          <Image src={SearchIcon} alt="search Icon" />
        </button>
      </div>
    </>
  );
};

export default RoomSearch;
