"use client";

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import S from "@/style/ranking/ranking.module.css";
import Image from "next/image";
import ArrowLeft from "@/assets/images/ranking_arrow_left.svg";
import ArrowRight from "@/assets/images/ranking_arrow_right.svg";

export default function Pagination({ data }: any) {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  console.log(data);
  function Items({ currentItems }: any) {
    return (
      <>
        {currentItems && (
          <ul className={S.userRankingList}>
            {currentItems.map((item: any, index: number) => (
              <li key={index}>
                <div>
                  <h2>{index + 1}</h2>
                  <h3>{item.nickname}</h3>
                  <p className={S.mafiaUserRanking}>{item.game_category}</p>
                  <p className={S.songUserRanking}>-</p>
                  <p className={S.totalRanking}>{item.total_score}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }

  function PaginatedItems({ items, itemsPerPage }: any) {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event: any) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }
  return (
    <div>
      <PaginatedItems items={items} itemsPerPage={10} />

      {/* <div className={S.pagerWrapper}>
        <button>
          <Image src={ArrowLeft} alt="left button" />
        </button>
        <ol className={S.pager}>
          <li className={S.active}>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ol>
        <button>
          <Image src={ArrowRight} alt="right button" />
        </button>
      </div> */}
    </div>
  );
}
