"use client";

import ArrowLeft from "@/assets/images/ranking_arrow_left.svg";
import ArrowRight from "@/assets/images/ranking_arrow_right.svg";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import S from "@/style/ranking/ranking.module.css";
import Image from "next/image";

//FIXME - 타입 찾아서 수정해주시구 타입 폴더 index.ts에 넣어주세요~!
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
  }, [data]);

  function Items({ currentItems }: any) {
    return (
      <>
        {currentItems && (
          <ul className={S.userRankingList}>
            {currentItems.map((item: any) => {
              //왜 let을 썻는지
              let rankClass = "";
              if (item.ranking === 1) rankClass = S.firstPlace;
              else if (item.ranking === 2) rankClass = S.secondPlace;
              else if (item.ranking === 3) rankClass = S.thirdPlace;

              return (
                <li key={item.ranking}>
                  <div>
                    <h2 className={rankClass}>{item.ranking}</h2>
                    <h3>{item.nickname}</h3>
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

  function PaginatedItems({ itemsPerPage }: any) {
    const [currentItems, setCurrentItems] = useState<any[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState<any>(0);

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event: { selected: number }) => {
      const newOffset = event.selected * itemsPerPage;
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
