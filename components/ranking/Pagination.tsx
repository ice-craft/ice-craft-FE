"use client";

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import S from "@/style/ranking/ranking.module.css";

interface PageNateProps {
  data: any;
}

export default function Pagination({ data }: PageNateProps) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const dataList = data;
    setItems(dataList);
  }, []);

  function Items({ currentItems }: any) {
    return (
      <>
        {currentItems && (
          <ul className={S.userRankingList}>
            {currentItems &&
              currentItems.map((item: any, index: number) => (
                <li key={index}>
                  <div>
                    <h2>{index + 1}</h2>
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

    const handlePageClick = (event: any) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
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
    </div>
  );
}
