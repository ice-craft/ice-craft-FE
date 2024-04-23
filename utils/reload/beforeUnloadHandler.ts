import { useEffect } from "react";

const BeforeUnloadHandler = () => {
  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; //크로스 브라우징 체크 추가
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, []);
  return null;
};

export default BeforeUnloadHandler;
