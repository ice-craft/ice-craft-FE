import React, { useEffect, useState } from "react";

const usePopStateHandler = () => {
  const [isBack, setIsBack] = useState(false);

  useEffect(() => {
    //Room history 추가
    history.pushState(null, "", "");

    const handlePopstate = (e: PopStateEvent) => {
      setIsBack(true);
    };

    window.addEventListener("popstate", handlePopstate);

    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);

  return isBack;
};

export default usePopStateHandler;
