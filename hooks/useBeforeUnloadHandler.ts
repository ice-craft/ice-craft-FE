import { useEffect, useState } from "react";

const useBeforeUnloadHandler = () => {
  const [isReLoad, setIsReLoad] = useState(false);

  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (!isReLoad) {
        e.preventDefault();
        e.returnValue = "";
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
