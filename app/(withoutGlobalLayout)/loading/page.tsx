"use client";

import S from "@/style/mainpage/main.module.css";
import { registerAccount } from "@/utils/supabase/accountAPI";
import { getUserInfo } from "@/utils/supabase/authAPI";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CommonsLoading = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    const init = async (status: string | null) => {
      if (status === "register") {
        try {
          const userInfo = await getUserInfo();
          const email = userInfo.email;
          const nickname = userInfo.user_metadata.name;

          await registerAccount(email!, nickname);
        } catch (error) {
          console.log((error as Error).message);
        }
      }
    };

    init(status);
  }, []);

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
};

export default CommonsLoading;
