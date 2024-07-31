"use client";

import ArrowLeft from "@/assets/images/ranking_arrow_left.svg";
import ArrowRight from "@/assets/images/ranking_arrow_right.svg";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import S from "@/style/ranking/ranking.module.css";
import Image from "next/image";
import { CurrentItemsProps, PageNationProps, PaginatedItemsProps, Ranking } from "@/types";

export default function Pagination({ rankingList }: PageNationProps) {
  const items = rankingList;

  function Items({ currentItems }: CurrentItemsProps) {
    return (
      <>
        {currentItems && (
          <ul className={S.userRankingList}>
            {currentItems.map((item: Ranking) => {
              let rankClass = "";
              if (item.ranking === 1) rankClass = S.firstPlace;
              else if (item.ranking === 2) rankClass = S.secondPlace;
              else if (item.ranking === 3) rankClass = S.thirdPlace;
              return (
                <li key={item.user_id}>
                  <div>
                    <h2 className={rankClass}>{item.ranking}</h2>
                    <h3 className={S.userNickname}>
                      {item.nickname}
                      <span className={S.userEmail}>{item.email}</span>
                    </h3>
                    <p className={S.mafiaUserRanking}>{item.mafia_score}</p>
                    <p className={S.songUserRanking}>{item.music_score}</p>
                    <p className={S.totalRanking}>{item.total_score}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }: PaginatedItemsProps) {
    const [currentItems, setCurrentItems] = useState<Ranking[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState<number>(0);

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event: { selected: number }) => {
      const newOffset = event.selected * itemsPerPage;
      setItemOffset(newOffset);

      window.scrollTo({
        top: 0
      });
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          previousLabel={<Image src={ArrowLeft} alt="prev button" />}
          nextLabel={<Image src={ArrowRight} alt="next button" />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          containerClassName={S.pagerWrapper}
          activeClassName={S.active}
        />
      </>
    );
  }

  return (
    <div>
      <PaginatedItems items={items} itemsPerPage={10} />
    </div>
  );
}
