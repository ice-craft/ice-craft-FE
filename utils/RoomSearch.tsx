import React, { useState } from "react";
import SearchIcon from "@/assets/images/icon_search.svg";
import S from "@/style/mainpage/main.module.css";
import Image from "next/image";
import { RoomSearchProps } from "@/types";

const RoomSearch: React.FC<RoomSearchProps> = ({ searchHandler }) => {
  const [search, setSearch] = useState("");

  return (
    <form onSubmit={searchHandler}>
      <div className={S.roomSearch}>
        <label htmlFor="RoomSearch">검색하기</label>
        <input
          type="text"
          id="RoomSearch"
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
