import usePopStateHandler from "@/hooks/usePopStateHandler";
import { designer } from "@/public/fonts/fonts";
import { useIsBack, useRoomAction } from "@/store/room-store";
import S from "@/style/commons/commons.module.css";
import { useEffect } from "react";

const Loading = () => {
  const { setIsBack, setIsEntry } = useRoomAction();
  const isBack = useIsBack();

  useEffect(() => {
    const timer = setTimeout(() => {
      //뒤로가기
      if (isBack) {
        const back = (history.length - 2) * -1;
        history.go(back);
      }
      // 방나가기
      const back = (history.length - 1) * -1;
      history.go(back);
    }, 3000);

    return () => {
      // 초기화
      setIsBack(false);
      setIsEntry(false);
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
