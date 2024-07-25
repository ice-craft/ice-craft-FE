import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import S from "@/style/mainpage/main.module.css";

const MainSkeleton = () => {
  return (
    <main className={S.mainSkeleton}>
      <div className={S.loadingTextWrapper}>
        <h1 className={S.loading}>
          Loading
          <span className={S.dot1}>.</span>
          <span className={S.dot2}>.</span>
          <span className={S.dot3}>.</span>
        </h1>
        <div className={S.spinner}>
          <div className={S.curvedTopLeft}></div>
          <div className={S.curvedBottomRight}></div>
          <div className={S.curvedTopRight}></div>
          <div className={S.curvedBottomLeft}></div>
          <p className={S.centerCircle}></p>
        </div>
      </div>
      <SkeletonTheme baseColor="#c1c1c1" highlightColor="#d0d0d0">
        <section className={`${S.visualSection} ${S.loadingWrapper}`}>
          <p className={S.loadingPager}>
            <Skeleton width={75} height={30} />
          </p>
          <div className={S.visualTitleLoading}>
            <Skeleton width={250} height={70} />
            <div className={S.loadingButton}>
              <Skeleton width={135} height={50} />
              <Skeleton width={135} height={50} />
            </div>
          </div>
        </section>
        <div className={S.roomSectionWrap}>
          <section className={S.roomSection}>
            <div className={S.MainGnb}>
              <p>
                <Skeleton width={200} height={40} />
              </p>
              <div className={S.roomSearchAndButton}>
                <Skeleton width={350} height={40} />
                <div className={S.gameGoButton}>
                  <Skeleton width={100} height={40} />
                  <div className={S.makeRoomButton}>
                    <Skeleton width={100} height={40} />
                  </div>
                </div>
              </div>
            </div>
            <ul className={S.roomList}>
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <li key={index} className={S.roomListLoading}>
                    <Skeleton height={350} />
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </SkeletonTheme>
    </main>
  );
};

export default MainSkeleton;
