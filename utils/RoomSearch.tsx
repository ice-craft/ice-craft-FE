import React from "react";

const RoomSearch = () => {
  return (
    <form onSubmit={searchHandler}>
      <div className={S.roomSearch}>
        <label htmlFor="RoomSearch">방 검색하기</label>
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
