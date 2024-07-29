import React from "react";
import S from "@/style/mainpage/main.module.css";
import { useLoading } from "@/store/loading-store";

const CommonsLoading = () => {
  const loading = useLoading();

  if (loading) {
    return (
      <div className={`${S.loadingTextWrapper} ${S.loadingCommonWrapper}`}>
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
    );
  }
};

export default CommonsLoading;
