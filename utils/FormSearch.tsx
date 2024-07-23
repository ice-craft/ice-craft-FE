"use client";

import React, { useEffect, useState } from "react";
import { getRoomsWithKeyword } from "@/utils/supabase/roomAPI";
import SearchIcon from "@/assets/images/icon_search.svg";
import S from "@/style/mainpage/main.module.css";
import Image from "next/image";
import { toast } from "react-toastify";
import useDebounce from "@/hooks/useSearchDebounce";
import { FormSearchProps } from "@/types";
import { useConnectActions } from "@/store/connect-store";
import { socket } from "./socket/socket";

const FormSearch = ({ placeholder }: FormSearchProps) => {
  const { setRooms } = useConnectActions();
  const [search, setSearch] = useState<string>("");
  const { debouncedValue, keyword } = useDebounce(search, 500);

  //NOTE - 메인페이지 방 목록 검색 - 코드 파악 후 무엇을 넣을지(설명)
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        if (!keyword) {
          return;
        }
        if (!debouncedValue.trim()) {
          socket.emit("enterMafia");
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
  }, [debouncedValue, setRooms]);

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
