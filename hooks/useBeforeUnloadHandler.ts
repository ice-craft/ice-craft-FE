import { useEffect, useState } from "react";

const useBeforeUnloadHandler = () => {
  const [isReLoad, setIsReLoad] = useState(false);

  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (!isReLoad) {
        e.preventDefault();
        e.returnValue = ""; //크로스 브라우징 체크 추가
      }
    };

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [isReLoad]);

  return { setIsReLoad };
};

export default useBeforeUnloadHandler;
