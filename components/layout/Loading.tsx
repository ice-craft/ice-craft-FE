import { designer } from "@/public/fonts/fonts";
import { useExitStore } from "@/store/exit-store";
import S from "@/style/commons/commons.module.css";
import { useEffect } from "react";

const Loading = () => {
  const { setIsExit } = useExitStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      const back = (history.length - 2) * -1;
      history.go(back);
    }, 3000);

    return () => {
      setIsExit(false);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className={`${S.loadingWrapper} ${designer.className}`}>
      <div>IceCraft</div>
      <div>Loading...</div>
      <div>메인페이지로 이동중 입니다.</div>
    </section>
  );
};

export default Loading;
