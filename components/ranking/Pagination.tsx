"use client";

import ArrowLeft from "@/assets/images/ranking_arrow_left.svg";
import ArrowRight from "@/assets/images/ranking_arrow_right.svg";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import S from "@/style/ranking/ranking.module.css";
import Image from "next/image";

interface PageNateProps {
  data: any;
}

export default function Pagination({ data }: PageNateProps) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(data);
    data.forEach((item: any, index: any) => {
      item["ranking"] = index + 1;
    });
    console.log(data);
  }, [data]); // data가 변경될 때마다 실행

  function Items({ currentItems }: any) {
    return (
      <>
        {currentItems && (
          <ul className={S.userRankingList}>
            {currentItems.map((item: any) => (
              <li key={item.ranking}>
                <div>
                  <h2>{item.ranking}</h2>
                  <h3>{item.nickname}</h3>
                  <p className={S.mafiaUserRanking}>{item.mafia_score}</p>
                  <p className={S.songUserRanking}>{item.music_score}</p>
                  <p className={S.totalRanking}>{item.total_score}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }: any) {
    const [currentItems, setCurrentItems] = useState<any[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState<any>(0);

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event: { selected: number }) => {
      const newOffset = event.selected * itemsPerPage;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
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
