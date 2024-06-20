"use client";

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import S from "@/style/ranking/ranking.module.css";
import Image from "next/image";
import ArrowLeft from "@/assets/images/ranking_arrow_left.svg";
import ArrowRight from "@/assets/images/ranking_arrow_right.svg";

interface PageNateProps {
  data: any;
}

export default function Pagination({ data }: PageNateProps) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const dataList = data;
    setItems(dataList);
  }, []);
  console.log(data);
  // const test = data.find((item: any) => item.nickname === "해피");
  // console.log(test);
  // [{}] => find {}
  // filter => [{}]
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
