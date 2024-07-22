"use client";

import SearchIcon from "@/assets/images/icon_search.svg";
import useDebounce from "@/hooks/useSearchDebounce";
import { useConnectActions } from "@/store/connect-store";
import S from "@/style/mainpage/main.module.css";
import { FormSearchProps } from "@/types";
import { getRooms, getRoomsWithKeyword } from "@/utils/supabase/roomAPI";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const FormSearch = ({ placeholder }: FormSearchProps) => {
  const { setRooms } = useConnectActions();
  const [search, setSearch] = useState<string>("");
  const { debouncedValue, isSearch } = useDebounce(search, 500);

  //NOTE - 메인페이지 방 목록 검색
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        if (!isSearch) {
          // console.log("초기화");
          return;
        }

        if (!debouncedValue.trim()) {
          console.log("debounce 작동");
          const allRooms = await getRooms(0, 20);
          setRooms(allRooms);
          return;
        }

        const roomKeyword = await getRoomsWithKeyword(debouncedValue);
        console.log("debounce 키워드 작동");
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
        <input type="text" id="search" value={search} onChange={searchHandler} placeholder={placeholder} />
        <button type="button">
          <Image src={SearchIcon} alt="search Icon" />
        </button>
      </div>
    </>
  );
};

export default FormSearch;
