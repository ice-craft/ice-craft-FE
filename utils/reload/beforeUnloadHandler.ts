import { useEffect } from "react";

const BeforeUnloadHandler = () => {
  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      const message = "정말 이 페이지를 나가겠습니까?";
      e.returnValue = message;
      return message;
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, []);
};

export default BeforeUnloadHandler;
