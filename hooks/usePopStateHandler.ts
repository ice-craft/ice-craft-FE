import React, { useEffect, useState } from "react";

const usePopStateHandler = () => {
  const [isBack, setIsBack] = useState(false);

  useEffect(() => {
    //Room history 추가
    history.pushState(null, "", "");

    const handlePopstate = (e: PopStateEvent) => {
      setIsBack(true);
    };

    // 이벤트 리스너 등록
    window.addEventListener("popstate", handlePopstate);
    // 이벤트 리스너 제거
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);

  return isBack;
};

export default usePopStateHandler;
