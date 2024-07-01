"use client";

import React, { useEffect, useState } from "react";
import { getRoomsWithKeyword, getRooms } from "@/utils/supabase/roomAPI";
import SearchIcon from "@/assets/images/icon_search.svg";
import S from "@/style/mainpage/main.module.css";
import Image from "next/image";
import { toast } from "react-toastify";
import useGetRoomsSocket from "@/hooks/useGetRoomsSocket";
import useDebounce from "@/hooks/useSearchDebounce";
import { FormSearchProps } from "@/types";

const FormSearch = ({ placeholder }: FormSearchProps) => {
  const { setRooms } = useGetRoomsSocket();
  //소켓에 있는 마피아 룸을 가져와서
  const [search, setSearch] = useState<string>("");
  //셋서치 부분을 유즈스테이트로 계속 변경을 해준다
  const debouncedValue = useDebounce(search, 500);
  //이건 뭐 500초 마다 랜더링해주는 거고

  //NOTE - 메인페이지 방 목록 검색 - 코드 파악 후 무엇을 넣을지(설명)
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        if (!debouncedValue.trim()) {
          const allRooms = await getRooms(0, 20);
          setRooms(allRooms);
          return;
        }

        const roomKeyword = await getRoomsWithKeyword(debouncedValue);
        setRooms(roomKeyword);
      } catch (error) {
        toast.error("검색 중 오류가 발생했습니다.");
      }
    };

    fetchRooms();
  }, [debouncedValue]);
  // 이건 검색했을 때 오류 토스트 굽는거
  return (
    <>
      <div className={S.roomSearch}>
        <label htmlFor="search">검색하기</label>
        <input type="text" id="search" value={search} onChange={searchHandler} placeholder={placeholder} />
        <button type="button">
          <Image src={SearchIcon} alt="search Icon" />
        </button>
      </div>
    </>
  );
};

export default FormSearch;
